using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YellowBook.API.DTOs;
using YellowBook.API.Services;

namespace YellowBook.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService) => _reviewService = reviewService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReviewDto>>> GetAll()
        => Ok(await _reviewService.GetAllAsync());

    [HttpGet("business/{businessId:int}")]
    public async Task<ActionResult<IEnumerable<ReviewDto>>> GetByBusiness(int businessId)
        => Ok(await _reviewService.GetByBusinessIdAsync(businessId));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ReviewDto>> GetById(int id)
    {
        var review = await _reviewService.GetByIdAsync(id);
        return review is null ? NotFound(new { message = "Review not found." }) : Ok(review);
    }

    [HttpPost]
    public async Task<ActionResult<ReviewDto>> Create([FromBody] CreateReviewDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var (result, error) = await _reviewService.CreateAsync(dto);
        if (result is null) return BadRequest(new { message = error });
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ReviewDto>> Update(int id, [FromBody] UpdateReviewDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var (result, error) = await _reviewService.UpdateAsync(id, dto);
        if (result is null)
            return error == "Review not found." ? NotFound(new { message = error }) : BadRequest(new { message = error });
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var (success, error) = await _reviewService.DeleteAsync(id);
        return success ? NoContent() : NotFound(new { message = error });
    }
}
