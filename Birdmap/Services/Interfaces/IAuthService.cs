using Birdmap.Models;
using System.Threading.Tasks;

namespace Birdmap.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> AuthenticateUserAsync(string username, string password);
    }
}
