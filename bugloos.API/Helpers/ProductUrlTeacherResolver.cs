using bugloos.API.Dtos;
using AutoMapper;
using bugloos.Core.Entities;
using Microsoft.Extensions.Configuration;

namespace bugloos.API.Helpers
{
    public class ProductUrlTeacherResolver 
    : IValueResolver<Product, ProductToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ProductUrlTeacherResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.TeacherPictureUrl))
            {
                return _config["ApiUrl"] + source.TeacherPictureUrl;
            }
            
            return null;
        }
    }
}