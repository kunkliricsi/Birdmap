using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Birdmap.DAL.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Uri = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: false),
                    PasswordSalt = table.Column<byte[]>(nullable: false),
                    Role = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Service",
                columns: new[] { "Id", "Name", "Uri" },
                values: new object[,]
                {
                    { 1, "KMLabz services", "https://birb.k8s.kmlabz.com/devices" },
                    { 2, "Local Database", "/health" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name", "PasswordHash", "PasswordSalt", "Role" },
                values: new object[,]
                {
                    { 1, "admin", new byte[] { 182, 156, 97, 101, 71, 25, 1, 147, 227, 96, 95, 0, 109, 186, 93, 70, 175, 182, 11, 77, 231, 91, 77, 46, 38, 241, 58, 9, 217, 227, 116, 97, 153, 200, 188, 237, 136, 224, 209, 148, 211, 183, 193, 59, 248, 219, 7, 64, 215, 234, 35, 102, 226, 124, 253, 113, 109, 120, 48, 158, 62, 75, 49, 25 }, new byte[] { 113, 114, 194, 22, 187, 116, 36, 33, 217, 100, 136, 225, 215, 1, 130, 131, 192, 198, 22, 50, 117, 244, 84, 85, 171, 4, 191, 0, 110, 145, 128, 150, 48, 226, 10, 149, 26, 111, 235, 125, 150, 120, 1, 168, 228, 110, 171, 2, 202, 54, 48, 214, 65, 75, 62, 245, 108, 82, 23, 226, 118, 218, 182, 177, 223, 124, 238, 67, 191, 103, 17, 159, 139, 44, 33, 62, 183, 22, 8, 193, 222, 60, 119, 240, 85, 179, 3, 35, 125, 23, 123, 232, 214, 193, 190, 13, 53, 131, 126, 124, 15, 238, 179, 202, 98, 173, 58, 29, 118, 253, 35, 34, 80, 79, 61, 185, 226, 99, 123, 195, 50, 46, 101, 45, 246, 1, 152, 61 }, 1 },
                    { 2, "user", new byte[] { 182, 156, 97, 101, 71, 25, 1, 147, 227, 96, 95, 0, 109, 186, 93, 70, 175, 182, 11, 77, 231, 91, 77, 46, 38, 241, 58, 9, 217, 227, 116, 97, 153, 200, 188, 237, 136, 224, 209, 148, 211, 183, 193, 59, 248, 219, 7, 64, 215, 234, 35, 102, 226, 124, 253, 113, 109, 120, 48, 158, 62, 75, 49, 25 }, new byte[] { 113, 114, 194, 22, 187, 116, 36, 33, 217, 100, 136, 225, 215, 1, 130, 131, 192, 198, 22, 50, 117, 244, 84, 85, 171, 4, 191, 0, 110, 145, 128, 150, 48, 226, 10, 149, 26, 111, 235, 125, 150, 120, 1, 168, 228, 110, 171, 2, 202, 54, 48, 214, 65, 75, 62, 245, 108, 82, 23, 226, 118, 218, 182, 177, 223, 124, 238, 67, 191, 103, 17, 159, 139, 44, 33, 62, 183, 22, 8, 193, 222, 60, 119, 240, 85, 179, 3, 35, 125, 23, 123, 232, 214, 193, 190, 13, 53, 131, 126, 124, 15, 238, 179, 202, 98, 173, 58, 29, 118, 253, 35, 34, 80, 79, 61, 185, 226, 99, 123, 195, 50, 46, 101, 45, 246, 1, 152, 61 }, 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
