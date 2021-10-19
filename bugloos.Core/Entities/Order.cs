using System;
using System.Collections.Generic;

namespace bugloos.Core.Entities
{
  public class Order:BaseEntity{
      public Order()
        {
        }

        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, decimal subtotal)
        {
            BuyerEmail = buyerEmail;    
            OrderItems = orderItems;  
            Subtotal = subtotal;     
        }

          public string BuyerEmail { get; set; } 
          public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
          public IReadOnlyList<OrderItem> OrderItems { get; set; } 
          public decimal Subtotal { get; set; }
          public decimal GetTotal()
          {
            return Subtotal ;
          }

  }

}