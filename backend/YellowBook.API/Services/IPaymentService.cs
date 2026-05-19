using YellowBook.API.DTOs;

namespace YellowBook.API.Services;

public interface IPaymentService
{
    Task<IEnumerable<PaymentDto>> GetAllAsync();
    Task<PaymentDto?> GetByIdAsync(int id);
    Task<(PaymentDto? Result, string? Error)> CreateAsync(CreatePaymentDto dto);
    Task<(PaymentDto? Result, string? Error)> UpdateAsync(int id, UpdatePaymentDto dto);
    Task<(bool Success, string? Error)> DeleteAsync(int id);
}
