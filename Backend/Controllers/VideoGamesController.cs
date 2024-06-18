using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CF_Final_Project.Models;

namespace CF_Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoGamesController : ControllerBase
    {
        private readonly DBContext _context;

        public VideoGamesController(DBContext context)
        {
            _context = context;
        }

        // GET: api/VideoGames
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoGame>>> GetVideoGames()
        {
            return await _context.VideoGames.ToListAsync();
        }

        // GET: api/VideoGames/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VideoGame>> GetVideoGame(int id)
        {
            var videoGame = await _context.VideoGames.FindAsync(id);

            if (videoGame == null)
            {
                return NotFound();
            }

            return videoGame;
        }

        // PUT: api/VideoGames/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVideoGame(int id, VideoGame videoGame)
        {
            // Λόγω λάθους κατά το πέρασμα τα ID στην βάση με τα mediaID ειναι διαφορετικά
            //if (id != videoGame.mediaID)
            //{
            //    return BadRequest();
            //}

            _context.Entry(videoGame).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoGameExists(id))
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

        // POST: api/VideoGames
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VideoGame>> PostVideoGame(VideoGame videoGame)
        {
            _context.VideoGames.Add(videoGame);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVideoGame", new { id = videoGame.mediaID }, videoGame);
        }

        // DELETE: api/VideoGames/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideoGame(int id)
        {
            var videoGame = await _context.VideoGames.FindAsync(id);
            if (videoGame == null)
            {
                return NotFound();
            }

            _context.VideoGames.Remove(videoGame);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VideoGameExists(int id)
        {
            return _context.VideoGames.Any(e => e.mediaID == id);
        }
    }
}
