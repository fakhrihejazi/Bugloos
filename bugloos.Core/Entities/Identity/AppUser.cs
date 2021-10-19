using Microsoft.AspNetCore.Identity;

namespace bugloos.Core.Entities.Identity
{
    public class AppUser: IdentityUser
    {
        public string DisplayName { get; set; }
       
    }
}