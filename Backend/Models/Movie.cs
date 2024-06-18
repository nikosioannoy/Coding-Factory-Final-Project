using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CF_Final_Project.Models
{
    public class Movie
    {
        [Key]
        public int mediaID {  get; set; }
        [Column(TypeName ="nvarchar(100)")]
        public string movieName { get; set; } = "";
        [Column(TypeName = "nvarchar(100)")]
        public string releaseDate { get; set; } = "";
        [Column(TypeName = "nvarchar(MAX)")]   
        public string description { get; set; } = "";
        [Column(TypeName = "nvarchar(100)")]
        public string runtime { get; set; } = "";
        [Column(TypeName = "nvarchar(MAX)")]
        public string coverImg { get; set; } = "";
        [Column(TypeName = "nvarchar(100)")]
        public string genre { get; set; } = "";
        [Column(TypeName = "nvarchar(MAX)")]
        public string review { get; set; } = "";
        [Column(TypeName = "nvarchar(100)")]
        public string director { get; set; } = "";
        public string[]? cast { get; set; }
    }
}
