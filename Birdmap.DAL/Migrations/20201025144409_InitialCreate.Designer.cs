﻿// <auto-generated />
using System;
using Birdmap.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Birdmap.DAL.Migrations
{
    [DbContext(typeof(BirdmapContext))]
    [Migration("20201025144409_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Birdmap.DAL.Entities.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Uri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Service");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "KMLabz services",
                            Uri = "https://birb.k8s.kmlabz.com/devices"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Local Database",
                            Uri = "/health"
                        });
                });

            modelBuilder.Entity("Birdmap.DAL.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "admin",
                            PasswordHash = new byte[] { 182, 156, 97, 101, 71, 25, 1, 147, 227, 96, 95, 0, 109, 186, 93, 70, 175, 182, 11, 77, 231, 91, 77, 46, 38, 241, 58, 9, 217, 227, 116, 97, 153, 200, 188, 237, 136, 224, 209, 148, 211, 183, 193, 59, 248, 219, 7, 64, 215, 234, 35, 102, 226, 124, 253, 113, 109, 120, 48, 158, 62, 75, 49, 25 },
                            PasswordSalt = new byte[] { 113, 114, 194, 22, 187, 116, 36, 33, 217, 100, 136, 225, 215, 1, 130, 131, 192, 198, 22, 50, 117, 244, 84, 85, 171, 4, 191, 0, 110, 145, 128, 150, 48, 226, 10, 149, 26, 111, 235, 125, 150, 120, 1, 168, 228, 110, 171, 2, 202, 54, 48, 214, 65, 75, 62, 245, 108, 82, 23, 226, 118, 218, 182, 177, 223, 124, 238, 67, 191, 103, 17, 159, 139, 44, 33, 62, 183, 22, 8, 193, 222, 60, 119, 240, 85, 179, 3, 35, 125, 23, 123, 232, 214, 193, 190, 13, 53, 131, 126, 124, 15, 238, 179, 202, 98, 173, 58, 29, 118, 253, 35, 34, 80, 79, 61, 185, 226, 99, 123, 195, 50, 46, 101, 45, 246, 1, 152, 61 },
                            Role = 1
                        },
                        new
                        {
                            Id = 2,
                            Name = "user",
                            PasswordHash = new byte[] { 182, 156, 97, 101, 71, 25, 1, 147, 227, 96, 95, 0, 109, 186, 93, 70, 175, 182, 11, 77, 231, 91, 77, 46, 38, 241, 58, 9, 217, 227, 116, 97, 153, 200, 188, 237, 136, 224, 209, 148, 211, 183, 193, 59, 248, 219, 7, 64, 215, 234, 35, 102, 226, 124, 253, 113, 109, 120, 48, 158, 62, 75, 49, 25 },
                            PasswordSalt = new byte[] { 113, 114, 194, 22, 187, 116, 36, 33, 217, 100, 136, 225, 215, 1, 130, 131, 192, 198, 22, 50, 117, 244, 84, 85, 171, 4, 191, 0, 110, 145, 128, 150, 48, 226, 10, 149, 26, 111, 235, 125, 150, 120, 1, 168, 228, 110, 171, 2, 202, 54, 48, 214, 65, 75, 62, 245, 108, 82, 23, 226, 118, 218, 182, 177, 223, 124, 238, 67, 191, 103, 17, 159, 139, 44, 33, 62, 183, 22, 8, 193, 222, 60, 119, 240, 85, 179, 3, 35, 125, 23, 123, 232, 214, 193, 190, 13, 53, 131, 126, 124, 15, 238, 179, 202, 98, 173, 58, 29, 118, 253, 35, 34, 80, 79, 61, 185, 226, 99, 123, 195, 50, 46, 101, 45, 246, 1, 152, 61 },
                            Role = 0
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
