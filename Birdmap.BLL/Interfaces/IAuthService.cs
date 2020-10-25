using Birdmap.DAL.Entities;
using System.Threading.Tasks;

namespace Birdmap.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<User> AuthenticateUserAsync(string username, string password);
        Task<User> RegisterUserAsync(string username, string password);
    }
}
