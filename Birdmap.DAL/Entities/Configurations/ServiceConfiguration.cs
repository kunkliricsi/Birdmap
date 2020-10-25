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

            builder.HasData(
                new Service
                {
                    Id = 1,
                    Name = "KMLabz services",
                    Uri = new Uri("https://birb.k8s.kmlabz.com/devices")
                },
                new Service
                {
                    Id = 2,
                    Name = "Local Database",
                    Uri = new Uri("/health", UriKind.Relative)
                });
        }
    }
}
