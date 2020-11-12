using System.ComponentModel.DataAnnotations;

namespace Birdmap.Models
{
    public record AuthenticateRequest
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Username is required.")]
        public string Username { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Password is required.")]
        public string Password { get; set; }
    }
}
