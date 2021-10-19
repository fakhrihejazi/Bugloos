using System.Linq;
using System.Threading.Tasks;
using bugloos.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace bugloos.Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager){
            
            if( !userManager.Users.Any())
            {
              
                var user = new AppUser{
                    DisplayName = "admin",
                    Email="admin@test.com",
                    UserName="admin@test.com",                    
                };

                await userManager.CreateAsync(user,"Pa$$w0rd");
            }
            
        }
    }
}