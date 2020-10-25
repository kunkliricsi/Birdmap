using Birdmap.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Birdmap.DAL
{
    public class BirdmapContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }

        public BirdmapContext([NotNull] DbContextOptions<BirdmapContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BirdmapContext).Assembly);
        }
    }
}
