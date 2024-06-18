using System.ComponentModel.DataAnnotations;

namespace CF_Final_Project.Models
{
    public class Comment
    {
        [Key]
        public int id { get; set; }
        public string ?username { get; set; }
        public string ?comment { get; set; }
        public string ?date { get; set; }
        public string ?mediaType { get; set; }
        public int ?mediaID { get; set; }

    }
}
