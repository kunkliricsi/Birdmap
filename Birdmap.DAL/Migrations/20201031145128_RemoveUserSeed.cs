using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Birdmap.DAL.Migrations
{
    public partial class RemoveUserSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AddColumn<bool>(
                name: "IsFromConfig",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFromConfig",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name", "PasswordHash", "PasswordSalt", "Role" },
                values: new object[] { 1, "admin", new byte[] { 199, 171, 130, 140, 205, 64, 247, 225, 175, 173, 122, 115, 103, 75, 199, 52, 110, 6, 250, 217, 154, 54, 240, 42, 3, 235, 36, 247, 213, 195, 209, 45, 161, 149, 109, 240, 191, 73, 6, 222, 92, 173, 78, 160, 236, 108, 81, 151, 221, 151, 118, 74, 147, 210, 52, 93, 30, 121, 64, 45, 183, 14, 197, 48 }, new byte[] { 42, 203, 231, 146, 232, 253, 34, 97, 157, 190, 210, 214, 228, 134, 176, 104, 226, 45, 199, 167, 8, 244, 230, 73, 222, 203, 152, 158, 65, 237, 80, 34, 88, 138, 227, 34, 136, 218, 137, 164, 16, 10, 3, 67, 104, 199, 27, 100, 116, 169, 57, 12, 17, 2, 204, 87, 20, 218, 204, 228, 148, 219, 150, 34, 165, 57, 51, 245, 13, 208, 206, 131, 226, 200, 212, 147, 223, 97, 227, 152, 136, 131, 98, 72, 143, 9, 130, 214, 187, 102, 164, 92, 147, 34, 171, 149, 52, 12, 140, 213, 223, 85, 199, 63, 43, 70, 100, 240, 13, 150, 199, 7, 56, 14, 11, 38, 151, 115, 129, 20, 31, 193, 54, 69, 79, 244, 189, 211 }, 1 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name", "PasswordHash", "PasswordSalt", "Role" },
                values: new object[] { 2, "user", new byte[] { 199, 171, 130, 140, 205, 64, 247, 225, 175, 173, 122, 115, 103, 75, 199, 52, 110, 6, 250, 217, 154, 54, 240, 42, 3, 235, 36, 247, 213, 195, 209, 45, 161, 149, 109, 240, 191, 73, 6, 222, 92, 173, 78, 160, 236, 108, 81, 151, 221, 151, 118, 74, 147, 210, 52, 93, 30, 121, 64, 45, 183, 14, 197, 48 }, new byte[] { 42, 203, 231, 146, 232, 253, 34, 97, 157, 190, 210, 214, 228, 134, 176, 104, 226, 45, 199, 167, 8, 244, 230, 73, 222, 203, 152, 158, 65, 237, 80, 34, 88, 138, 227, 34, 136, 218, 137, 164, 16, 10, 3, 67, 104, 199, 27, 100, 116, 169, 57, 12, 17, 2, 204, 87, 20, 218, 204, 228, 148, 219, 150, 34, 165, 57, 51, 245, 13, 208, 206, 131, 226, 200, 212, 147, 223, 97, 227, 152, 136, 131, 98, 72, 143, 9, 130, 214, 187, 102, 164, 92, 147, 34, 171, 149, 52, 12, 140, 213, 223, 85, 199, 63, 43, 70, 100, 240, 13, 150, 199, 7, 56, 14, 11, 38, 151, 115, 129, 20, 31, 193, 54, 69, 79, 244, 189, 211 }, 0 });
        }
    }
}
