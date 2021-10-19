
using bugloos.API.Dtos;
using AutoMapper;
using bugloos.Core.Entities;
using bugloos.Core.Entities.Identity;
//using bugloos.Core.Entities.OrderAggregate;

namespace bugloos.API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
             CreateMap<Product, ProductToReturnDto>()
             .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name))
             .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>())
             .ForMember(d => d.TeacherPictureUrl, o => o.MapFrom<ProductUrlTeacherResolver>())
             ;

              CreateMap<OrderDto,Order>();
              CreateMap<Order, OrderToReturnDto>();
                CreateMap<OrderItem, OrderItemDto>()
                     .ForMember(d => d.ProductId,o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                     .ForMember(d => d.ProductName,o => o.MapFrom(s => s.ItemOrdered.ProductName))
                     .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                     ;
           

        }
    }
}