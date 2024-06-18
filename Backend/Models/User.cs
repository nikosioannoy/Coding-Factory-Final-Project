namespace CF_Final_Project.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }
        public string? userRole  { get; set; }

        public override string ToString()
        {
            return $"{this.Id}, {this.email}, {this.username}, {this.userRole}";
        }

    }
}
