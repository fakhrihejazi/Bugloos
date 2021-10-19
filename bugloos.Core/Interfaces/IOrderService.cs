using System.Collections.Generic;
using System.Threading.Tasks;
using bugloos.Core.Entities;

namespace bugloos.Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, Order order);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string byerEmail);    

    }
}