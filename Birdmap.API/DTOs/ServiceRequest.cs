namespace Birdmap.API.DTOs
{
    public record ServiceRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Uri { get; set; }
    }
}
