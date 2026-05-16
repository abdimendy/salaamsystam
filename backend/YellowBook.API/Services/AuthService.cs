using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using YellowBook.API.DTOs;
using YellowBook.API.Models;
using YellowBook.API.Repositories;

namespace YellowBook.API.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<(LoginResponseDto? Result, string? Error)> LoginAsync(LoginRequestDto dto)
    {
        AppUser? user = null;
        try
        {
            user = await _userRepository.GetByUsernameAsync(dto.Username);
        }
        catch
        {
            // Database unavailable — allow configured admin fallback below.
        }

        var passwordValid = user is not null && BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

        if (!passwordValid)
        {
            var adminUser = _configuration["AdminUser:Username"] ?? "admin";
            var adminPass = _configuration["AdminUser:Password"] ?? "Admin@123";
            if (!string.Equals(dto.Username, adminUser, StringComparison.OrdinalIgnoreCase)
                || dto.Password != adminPass)
            {
                return (null, "Invalid username or password.");
            }
        }

        var username = user?.Username ?? dto.Username.Trim();
        var expiresMinutes = _configuration.GetValue<int>("Jwt:ExpiresMinutes", 480);
        var expiresAt = DateTime.UtcNow.AddMinutes(expiresMinutes);
        var token = GenerateToken(username, expiresAt);

        return (new LoginResponseDto
        {
            Token = token,
            Username = username,
            ExpiresAt = expiresAt
        }, null);
    }

    private string GenerateToken(string username, DateTime expiresAt)
    {
        var key = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is not configured.");

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
