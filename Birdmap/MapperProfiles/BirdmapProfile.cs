using AutoMapper;
using Birdmap.DAL.Entities;

namespace Birdmap.API.MapperProfiles
{
    public class BirdmapProfile : Profile
    {
        public BirdmapProfile()
        {
            CreateMap<User, DTOs.AuthenticateResponse>().ReverseMap();
        }
    }
}
