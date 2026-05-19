using YellowBook.API.DTOs;

namespace YellowBook.API.Services;

public interface IAuthService
{
    Task<(LoginResponseDto? Result, string? Error)> LoginAsync(LoginRequestDto dto);
}
