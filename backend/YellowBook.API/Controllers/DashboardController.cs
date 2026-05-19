using Microsoft.AspNetCore.Mvc;
using YellowBook.API.DTOs;
using YellowBook.API.Services;

namespace YellowBook.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Microsoft.AspNetCore.Authorization.AllowAnonymous]
public class DashboardController : ControllerBase
{
    private readonly IBusinessService _businessService;

    public DashboardController(IBusinessService businessService)
    {
        _businessService = businessService;
    }

    [HttpGet("stats")]
    public async Task<ActionResult<DashboardStatsDto>> GetStats()
    {
        var stats = await _businessService.GetDashboardStatsAsync();
        return Ok(stats);
    }
}
