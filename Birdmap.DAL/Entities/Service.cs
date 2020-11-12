using System;

namespace Birdmap.DAL.Entities
{
    public record Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Uri Uri { get; set; }

        public bool IsFromConfig { get; set; }
    }
}
