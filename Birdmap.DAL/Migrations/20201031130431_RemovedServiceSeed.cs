﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Birdmap.DAL.Migrations
{
    public partial class RemovedServiceSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AddColumn<bool>(
                name: "IsFromConfig",
                table: "Services",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 199, 171, 130, 140, 205, 64, 247, 225, 175, 173, 122, 115, 103, 75, 199, 52, 110, 6, 250, 217, 154, 54, 240, 42, 3, 235, 36, 247, 213, 195, 209, 45, 161, 149, 109, 240, 191, 73, 6, 222, 92, 173, 78, 160, 236, 108, 81, 151, 221, 151, 118, 74, 147, 210, 52, 93, 30, 121, 64, 45, 183, 14, 197, 48 }, new byte[] { 42, 203, 231, 146, 232, 253, 34, 97, 157, 190, 210, 214, 228, 134, 176, 104, 226, 45, 199, 167, 8, 244, 230, 73, 222, 203, 152, 158, 65, 237, 80, 34, 88, 138, 227, 34, 136, 218, 137, 164, 16, 10, 3, 67, 104, 199, 27, 100, 116, 169, 57, 12, 17, 2, 204, 87, 20, 218, 204, 228, 148, 219, 150, 34, 165, 57, 51, 245, 13, 208, 206, 131, 226, 200, 212, 147, 223, 97, 227, 152, 136, 131, 98, 72, 143, 9, 130, 214, 187, 102, 164, 92, 147, 34, 171, 149, 52, 12, 140, 213, 223, 85, 199, 63, 43, 70, 100, 240, 13, 150, 199, 7, 56, 14, 11, 38, 151, 115, 129, 20, 31, 193, 54, 69, 79, 244, 189, 211 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 199, 171, 130, 140, 205, 64, 247, 225, 175, 173, 122, 115, 103, 75, 199, 52, 110, 6, 250, 217, 154, 54, 240, 42, 3, 235, 36, 247, 213, 195, 209, 45, 161, 149, 109, 240, 191, 73, 6, 222, 92, 173, 78, 160, 236, 108, 81, 151, 221, 151, 118, 74, 147, 210, 52, 93, 30, 121, 64, 45, 183, 14, 197, 48 }, new byte[] { 42, 203, 231, 146, 232, 253, 34, 97, 157, 190, 210, 214, 228, 134, 176, 104, 226, 45, 199, 167, 8, 244, 230, 73, 222, 203, 152, 158, 65, 237, 80, 34, 88, 138, 227, 34, 136, 218, 137, 164, 16, 10, 3, 67, 104, 199, 27, 100, 116, 169, 57, 12, 17, 2, 204, 87, 20, 218, 204, 228, 148, 219, 150, 34, 165, 57, 51, 245, 13, 208, 206, 131, 226, 200, 212, 147, 223, 97, 227, 152, 136, 131, 98, 72, 143, 9, 130, 214, 187, 102, 164, 92, 147, 34, 171, 149, 52, 12, 140, 213, 223, 85, 199, 63, 43, 70, 100, 240, 13, 150, 199, 7, 56, 14, 11, 38, 151, 115, 129, 20, 31, 193, 54, 69, 79, 244, 189, 211 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFromConfig",
                table: "Services");

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Name", "Uri" },
                values: new object[,]
                {
                    { 1, "KMLabz services", "https://birb.k8s.kmlabz.com/devices" },
                    { 2, "Local Database", "/health" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 39, 245, 218, 244, 76, 67, 218, 179, 59, 162, 232, 131, 226, 248, 3, 230, 80, 103, 100, 117, 82, 39, 78, 32, 162, 199, 30, 48, 27, 225, 221, 175, 254, 114, 202, 98, 247, 169, 246, 12, 56, 123, 114, 8, 116, 175, 184, 175, 208, 224, 115, 86, 214, 98, 150, 229, 198, 135, 60, 30, 201, 174, 64, 231 }, new byte[] { 218, 221, 155, 56, 172, 243, 205, 43, 182, 187, 43, 213, 186, 95, 254, 120, 72, 235, 231, 42, 232, 132, 40, 167, 249, 103, 233, 155, 17, 14, 239, 87, 115, 252, 135, 54, 61, 97, 201, 109, 158, 134, 102, 122, 63, 166, 29, 59, 139, 221, 196, 54, 133, 146, 78, 228, 134, 75, 115, 20, 31, 239, 15, 110, 228, 114, 208, 240, 25, 222, 17, 180, 13, 181, 148, 45, 143, 79, 26, 198, 151, 129, 52, 152, 36, 56, 45, 21, 83, 40, 234, 107, 70, 119, 66, 122, 92, 240, 85, 167, 101, 69, 233, 125, 29, 104, 69, 39, 253, 221, 19, 13, 66, 114, 17, 252, 0, 202, 161, 170, 115, 99, 246, 49, 237, 6, 211, 76 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 39, 245, 218, 244, 76, 67, 218, 179, 59, 162, 232, 131, 226, 248, 3, 230, 80, 103, 100, 117, 82, 39, 78, 32, 162, 199, 30, 48, 27, 225, 221, 175, 254, 114, 202, 98, 247, 169, 246, 12, 56, 123, 114, 8, 116, 175, 184, 175, 208, 224, 115, 86, 214, 98, 150, 229, 198, 135, 60, 30, 201, 174, 64, 231 }, new byte[] { 218, 221, 155, 56, 172, 243, 205, 43, 182, 187, 43, 213, 186, 95, 254, 120, 72, 235, 231, 42, 232, 132, 40, 167, 249, 103, 233, 155, 17, 14, 239, 87, 115, 252, 135, 54, 61, 97, 201, 109, 158, 134, 102, 122, 63, 166, 29, 59, 139, 221, 196, 54, 133, 146, 78, 228, 134, 75, 115, 20, 31, 239, 15, 110, 228, 114, 208, 240, 25, 222, 17, 180, 13, 181, 148, 45, 143, 79, 26, 198, 151, 129, 52, 152, 36, 56, 45, 21, 83, 40, 234, 107, 70, 119, 66, 122, 92, 240, 85, 167, 101, 69, 233, 125, 29, 104, 69, 39, 253, 221, 19, 13, 66, 114, 17, 252, 0, 202, 161, 170, 115, 99, 246, 49, 237, 6, 211, 76 } });
        }
    }
}
