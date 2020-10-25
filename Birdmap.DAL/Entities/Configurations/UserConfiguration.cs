using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using static Birdmap.Common.PasswordHelper;

namespace Birdmap.DAL.Entities.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(u => u.Name)
                .IsUnique();

            builder.Property(u => u.Name)
                .IsRequired();

            builder.Property(u => u.PasswordHash)
                .IsRequired();

            builder.Property(u => u.PasswordSalt)
                .IsRequired();

            builder.Property(u => u.Role)
                .IsRequired();

            CreatePasswordHash("pass", out var hash, out var salt);

            builder.HasData(
                new User
                {
                    Id = 1,
                    Name = "admin",
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    Role = Roles.Admin,
                },
                new User
                {
                    Id = 2,
                    Name = "user",
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    Role = Roles.User,
                });
        }
    }
}
