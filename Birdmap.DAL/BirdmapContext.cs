using Birdmap.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Birdmap.DAL
{
    public class BirdmapContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public BirdmapContext([NotNull] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BirdmapContext).Assembly);

            SeedDatabase(modelBuilder);
        }

        private void SeedDatabase(ModelBuilder modelBuilder)
        {

        }
    }
}
