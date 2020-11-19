using Birdmap.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Birdmap.BLL.Interfaces
{
    public interface IServiceService
    {
        Task<int> GetServiceCountAsync();
        Task<List<Service>> GetAllServicesAsync();
        Task<Service> GetServiceAsync(int id);
        Task<Service> CreateServiceAsync(Service service);
        Task DeleteServiceAsync(int id);
        Task UpdateServiceAsync(Service service);
    }
}
