using Birdmap.DAL.Entities;
using Newtonsoft.Json;

namespace Birdmap.API.DTOs
{
    public record AuthenticateResponse
    {
        [JsonProperty("user_name")]
        public string Username { get; set; }
        [JsonProperty("user_role")]
        public Roles UserRole { get; set; }
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        [JsonProperty("token_type")]
        public string TokenType { get; set; }
        [JsonProperty("expires_in")]
        public double ExpiresIn { get; set; }
    }
}
