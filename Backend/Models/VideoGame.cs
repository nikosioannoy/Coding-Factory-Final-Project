using System.ComponentModel.DataAnnotations;

namespace CF_Final_Project.Models
{
    public class VideoGame
    {
        [Key]
        public int mediaID { get; set; }
        public string gameName { get; set; }
        public string releaseDate { get; set; }
        public string description { get; set; }
        public string coverImg { get; set; }
        public string genre { get; set; }
        public string review { get; set; }
        public string publisher { get; set; }
        public string[] platforms { get; set; }
    }
}
