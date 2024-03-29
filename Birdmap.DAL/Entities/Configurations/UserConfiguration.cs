﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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

            builder.Property(u => u.IsFromConfig)
                .HasDefaultValue(false)
                .IsRequired();
        }
    }
}
