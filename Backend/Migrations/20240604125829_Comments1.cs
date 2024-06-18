using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CF_Final_Project.Migrations
{
    /// <inheritdoc />
    public partial class Comments1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "comments",
                table: "Movies");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "comments",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
