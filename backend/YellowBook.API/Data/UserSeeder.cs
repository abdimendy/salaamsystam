using YellowBook.API.Models;
using YellowBook.API.Repositories;

namespace YellowBook.API.Data;

public static class UserSeeder
{
    public static async Task SeedAdminAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

        if (await userRepository.AnyAsync())
            return;

        var username = configuration["AdminUser:Username"] ?? "admin";
        var password = configuration["AdminUser:Password"] ?? "Admin@123";

        await userRepository.AddAsync(new AppUser
        {
            Username = username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            CreatedAt = DateTime.UtcNow
        });
    }
}
