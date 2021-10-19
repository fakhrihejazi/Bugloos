using System.Collections.Generic;
using System.Threading.Tasks;
using bugloos.API.Dtos;
using bugloos.API.Errors;
using AutoMapper;
using bugloos.Core.Entities;
using bugloos.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using bugloos.API.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace bugloos.API.Controllers
{

    [Authorize]
  public class OrdersController : BaseApiController
  {

     private readonly IOrderService _orderService;
     private readonly IMapper _mapper;

     public OrdersController(IOrderService orderService,IMapper mapper){
      
      _orderService = orderService;
       _mapper = mapper;

     }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrdersForUser()
        {
           var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var orders = await _orderService.GetOrdersForUserAsync(email);
            return Ok(_mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderToReturnDto>>(orders));
            
        }

       [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
           var email = HttpContext.User.RetrieveEmailFromPrincipal();               
         
           var orderItems = new List<OrderItem>();
           var orderItem = new OrderItem();
           
          foreach(var item in orderDto.OrderItems)
          {
            orderItem = new OrderItem(){
            Price = item.Price,
            ItemOrdered=new ProductItemOrdered(){ProductItemId = item.ProductId,
                                     ProductName = item.ProductName,
                                    PictureUrl = item.PictureUrl},

            Quantity = item.Quantity,
            };
            orderItems.Add(orderItem);
          }

           var orderMapp = new Order{            
             BuyerEmail = email,
             OrderItems = orderItems
           };        

          var order = await _orderService.CreateOrderAsync(email,orderMapp);
            if(order == null) return BadRequest(new ApiResponse(400,"Problem creating order"));
            return Ok(order);
        }
  }

}