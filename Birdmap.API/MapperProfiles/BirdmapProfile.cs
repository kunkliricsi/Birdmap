using AutoMapper;
using Birdmap.API.DTOs;
using Birdmap.DAL.Entities;
using System;

namespace Birdmap.API.MapperProfiles
{
    public class BirdmapProfile : Profile
    {
        public BirdmapProfile()
        {
            CreateMap<Uri, string>().ConvertUsing<UriToStringConverter>();
            CreateMap<string, Uri>().ConvertUsing<UriToStringConverter>();

            CreateMap<User, AuthenticateResponse>()
                .ForMember(m => m.Username, opt => opt.MapFrom(m => m.Name))
                .ForMember(m => m.UserRole, opt => opt.MapFrom(m => m.Role))
                .ReverseMap();

            CreateMap<Service, ServiceRequest>()
                .ReverseMap();
        }

        private class UriToStringConverter : ITypeConverter<Uri, string>, ITypeConverter<string, Uri>
        {
            public string Convert(Uri source, string destination, ResolutionContext context)
            {
                destination = source.ToString();
                return destination;
            }

            public Uri Convert(string source, Uri destination, ResolutionContext context)
            {
                Uri.TryCreate(source, UriKind.Absolute, out destination);
                return destination;
            }
        }
    }
}
