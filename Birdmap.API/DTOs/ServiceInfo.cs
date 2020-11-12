using System.Net;

namespace Birdmap.API.DTOs
{
    public record ServiceInfo
    {
        public ServiceRequest Service { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Response { get; set; }
    }
}
