using Birdmap.DAL.Entities;
using System.Threading.Tasks;

namespace Birdmap.BLL.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserAsync(int userId);
        Task<User> GetUserAsync(string username);
        Task<User> CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int userId);
        Task DeleteUserAsync(string username);
    }
}
