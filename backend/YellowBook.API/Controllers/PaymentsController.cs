using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YellowBook.API.DTOs;
using YellowBook.API.Services;

namespace YellowBook.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService) => _paymentService = paymentService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PaymentDto>>> GetAll()
        => Ok(await _paymentService.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PaymentDto>> GetById(int id)
    {
        var payment = await _paymentService.GetByIdAsync(id);
        return payment is null ? NotFound(new { message = "Payment not found." }) : Ok(payment);
    }

    [HttpPost]
    public async Task<ActionResult<PaymentDto>> Create([FromBody] CreatePaymentDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var (result, error) = await _paymentService.CreateAsync(dto);
        if (result is null) return BadRequest(new { message = error });
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<PaymentDto>> Update(int id, [FromBody] UpdatePaymentDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var (result, error) = await _paymentService.UpdateAsync(id, dto);
        if (result is null)
            return error == "Payment not found." ? NotFound(new { message = error }) : BadRequest(new { message = error });
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var (success, error) = await _paymentService.DeleteAsync(id);
        return success ? NoContent() : NotFound(new { message = error });
    }
}
