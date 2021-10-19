 using System;
 using System.Collections.Generic;
 namespace bugloos.API.Dtos
{
    public class OrderDto
    {
      public string BuyerEmail { get; set; }
      public IReadOnlyList<OrderItemDto> OrderItems{get;set;}    
    }
    
    }