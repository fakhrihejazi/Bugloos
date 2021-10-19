using bugloos.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace bugloos.Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    { public void Configure(EntityTypeBuilder<Order> builder)
        {                
           builder.HasMany(o=>o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}