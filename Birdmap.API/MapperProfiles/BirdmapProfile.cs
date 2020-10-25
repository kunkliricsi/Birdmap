using AutoMapper;
using Birdmap.DAL.Entities;

namespace Birdmap.API.MapperProfiles
{
    public class BirdmapProfile : Profile
    {
        public BirdmapProfile()
        {
            CreateMap<User, DTOs.AuthenticateResponse>()
                .ForMember(m => m.Username, opt => opt.MapFrom(m => m.Name))
                .ForMember(m => m.UserRole, opt => opt.MapFrom(m => m.Role))
                .ReverseMap();
        }
    }
}
