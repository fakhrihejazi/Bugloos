using bugloos.Core.Entities.Identity;

namespace bugloos.Core.Interfaces
{
    public interface ITokenService
    {
         string CreateToken(AppUser user);
    }
}