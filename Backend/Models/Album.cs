using System.ComponentModel.DataAnnotations;

namespace CF_Final_Project.Models
{
    public class Album
    {
        [Key]
        public int mediaID { get; set; }
        public string albumName { get; set; }
        public string releaseDate { get; set; }
        public string description { get; set; }
        public string runtime { get; set; }
        public int numberOfTracks { get; set; }
        public string coverImg { get; set; }
        public string[] genre { get; set; }
        public string review { get; set; }
        public string artist { get; set; }
        public string spotifyLink { get; set; }
        public string[] trackList { get; set; }
    }
}
