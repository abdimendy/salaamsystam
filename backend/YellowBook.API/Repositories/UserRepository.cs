using Microsoft.EntityFrameworkCore;
using YellowBook.API.Data;
using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly YellowBookDbContext _context;

    public UserRepository(YellowBookDbContext context)
    {
        _context = context;
    }

    public async Task<AppUser?> GetByUsernameAsync(string username)
    {
        var normalized = username.Trim().ToLower();
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Username.ToLower() == normalized);
    }

    public async Task<bool> AnyAsync() => await _context.Users.AnyAsync();

    public async Task<AppUser> AddAsync(AppUser user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
}
