using System.ComponentModel.DataAnnotations;

namespace Birdmap.API.DTOs
{
    public record RegisterRequest
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Username is required.")]
        public string Username { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Password is required."), DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please confirm password.")]
        [DataType(DataType.Password), Compare(nameof(Password), ErrorMessage = "Passwords did not match.")]
        public string ConfirmPassword { get; set; }
    }
}
