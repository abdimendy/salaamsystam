using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YellowBook.API.Data;

namespace YellowBook.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController(YellowBookDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var canConnect = await db.Database.CanConnectAsync();
            return Ok(new
            {
                status = canConnect ? "healthy" : "degraded",
                database = canConnect,
                provider = db.Database.ProviderName,
            });
        }
        catch (Exception ex)
        {
            return Ok(new
            {
                status = "degraded",
                database = false,
                message = ex.Message,
            });
        }
    }
}
