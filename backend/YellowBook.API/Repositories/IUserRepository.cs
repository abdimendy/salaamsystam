using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public interface IUserRepository
{
    Task<AppUser?> GetByUsernameAsync(string username);
    Task<bool> AnyAsync();
    Task<AppUser> AddAsync(AppUser user);
}
