using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YellowBook.API.DTOs;
using YellowBook.API.Services;

namespace YellowBook.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessesController : ControllerBase
{
    private readonly IBusinessService _businessService;

    public BusinessesController(IBusinessService businessService)
    {
        _businessService = businessService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<BusinessDto>>> GetAll()
        => Ok(await _businessService.GetAllAsync());

    [HttpGet("featured")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<BusinessDto>>> GetFeatured([FromQuery] int count = 6)
        => Ok(await _businessService.GetFeaturedAsync(count));

    [HttpGet("search")]
    [AllowAnonymous]
    public async Task<ActionResult<BusinessSearchResultDto>> Search(
        [FromQuery] string? name,
        [FromQuery] int? categoryId,
        [FromQuery] string? city,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12)
        => Ok(await _businessService.SearchAsync(name, categoryId, city, page, pageSize));

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<ActionResult<BusinessDto>> GetById(int id)
    {
        var business = await _businessService.GetByIdAsync(id);
        return business is null ? NotFound(new { message = "Business not found." }) : Ok(business);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BusinessDto>> Create([FromBody] CreateBusinessDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var (result, error) = await _businessService.CreateAsync(dto);
        if (result is null) return BadRequest(new { message = error });
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<BusinessDto>> Update(int id, [FromBody] UpdateBusinessDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var (result, error) = await _businessService.UpdateAsync(id, dto);
        if (result is null)
            return error == "Business not found." ? NotFound(new { message = error }) : BadRequest(new { message = error });
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var (success, error) = await _businessService.DeleteAsync(id);
        return success ? NoContent() : NotFound(new { message = error });
    }
}
