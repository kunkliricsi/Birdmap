using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Birdmap.DAL.Entities.Configurations
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.Property(s => s.Name)
                .IsRequired();

            builder.Property(s => s.Uri)
                .HasConversion(u => u.ToString(), u => new Uri(u))
                .IsRequired();

            builder.Property(s => s.IsFromConfig)
                .HasDefaultValue(false)
                .IsRequired();
        }
    }
}
