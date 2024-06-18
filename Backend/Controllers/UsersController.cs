using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CF_Final_Project.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CF_Final_Project.Security;


namespace CF_Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DBContext _context;

        public UsersController(DBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }  

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            user.password = EncryptionUtil.Encrypt(user.password!);

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        //CREATE USER
        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            //encrypt new user password
            user.password = EncryptionUtil.Encrypt(user.password!);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { msg = "User not found in Database" });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { msg = $"User {user.username} deleted successfully" });
        }

        [HttpGet("check_duplicate_email/{email}")]
        public IActionResult CheckDuplicateEmail(string email)
        {
            try
            {
                var userExists = _context.Users.Any(u => u.email == email);
                if (userExists)
                {
                    return BadRequest(new { msg = "Email already in use" });
                }
                return Ok(new { msg = "Email available" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new { msg = e.Message });
            }
        }

        [HttpGet("check_duplicate_username/{username}")]
        public IActionResult CheckDuplicateUsername(string username)
        {
            try
            {
                var userExists = _context.Users.Any(u => u.username == username);
                if (userExists)
                {
                    return BadRequest(new { msg = "Username already in use" });
                }
                return Ok(new { msg = "Username available" });
            }
            catch (Exception e)
            {
                return BadRequest(new { msg = e.Message });
            }
        }

        [HttpPut("turn_to_admin/{id}")]
        public async Task<IActionResult> TurnToAdminAsync(int id)
        {
            try
            {
                var user = _context.Users.Find(id);
                if (user == null)
                {
                    return BadRequest(new { msg = $"No user with id: {id} found." });
                }
                user.userRole = "Admin";
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(new { msg = $"User with id: {id} turned into admin!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new { msg = e.Message });
            }
        }

        //LOGIN
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoggedInUser loggedInUser)
        {
            //Finding user
            var user = _context.Users.Where(u => u.email == loggedInUser.Email)
                .FirstOrDefault();
            //If user is found and email equals
            if (user != null && Equals(user.email, loggedInUser.Email))
            {
                if (EncryptionUtil.IsValidPassword(loggedInUser.Password!, user.password!))
                {
                    //Creation of user token
                    var secretKey = _configuration["Authentication:SecretKey"];
                    var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey!));
                    var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    var claimsInfo = new List<Claim>
                    {
                        new Claim("Username", user.username!),
                        new Claim("User_ID", user.Id.ToString()),
                        new Claim("User_Email", user.email!),
                        new Claim("User_Role", user.userRole!)
                    };
                    var jwtSecurityToken = new JwtSecurityToken(null, null, claimsInfo, DateTime.UtcNow, DateTime.UtcNow.AddHours(3), signingCredentials);
                    var userToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                    //Token to JSON
                    JwtTokenDTO token = new()
                    {
                        Token = userToken
                    };
                    return Ok(token);
                }
                return BadRequest("Bad Credentials");
            }
            else
            {
                return BadRequest("Bad Credentials");
            }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
