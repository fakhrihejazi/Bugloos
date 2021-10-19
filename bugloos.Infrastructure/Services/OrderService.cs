using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bugloos.Core.Entities;
using bugloos.Core.Interfaces;
using bugloos.Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
       
        private readonly IUnitOfWork _unitOfWork;
        public OrderService( IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, Order _order)
        {            

            //calc subtotal
            var subtotal = _order.OrderItems.Sum(item => item.Price * item.Quantity);

            //create order
            var order = new Order( _order.OrderItems, buyerEmail, subtotal);
            _unitOfWork.Repository<Order>().Add(order);

            //save to db
            var result = await _unitOfWork.Complete();

           
            //return db
            return order;
        }

       
        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string byerEmail)
        {
            var spec = new OrdersSpecification(byerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}