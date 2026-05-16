using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YellowBook.API.DTOs;
using YellowBook.API.Services;

namespace YellowBook.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var (result, error) = await _authService.LoginAsync(dto);
        if (result is null)
            return Unauthorized(new { message = error });

        return Ok(result);
    }

    [HttpGet("me")]
    [Authorize]
    public ActionResult<UserProfileDto> Me()
    {
        var username = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name ?? string.Empty;
        return Ok(new UserProfileDto { Username = username });
    }
}
