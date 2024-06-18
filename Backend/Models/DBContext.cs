using Microsoft.EntityFrameworkCore;
using CF_Final_Project.Models;

namespace CF_Final_Project.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<VideoGame> VideoGames { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
