using System;
using System.Linq.Expressions;
using bugloos.Core.Entities;

namespace bugloos.Core.Specifications
{
    public class OrdersSpecification : BaseSpecification<Order>
    {
        public OrdersSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);  
        }
        
}
}