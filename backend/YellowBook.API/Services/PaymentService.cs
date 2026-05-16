using YellowBook.API.DTOs;
using YellowBook.API.Models;
using YellowBook.API.Repositories;

namespace YellowBook.API.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _paymentRepository;
    private readonly IBusinessRepository _businessRepository;

    public PaymentService(IPaymentRepository paymentRepository, IBusinessRepository businessRepository)
    {
        _paymentRepository = paymentRepository;
        _businessRepository = businessRepository;
    }

    public async Task<IEnumerable<PaymentDto>> GetAllAsync()
        => (await _paymentRepository.GetAllAsync()).Select(MapToDto);

    public async Task<PaymentDto?> GetByIdAsync(int id)
    {
        var payment = await _paymentRepository.GetByIdAsync(id);
        return payment is null ? null : MapToDto(payment);
    }

    public async Task<(PaymentDto? Result, string? Error)> CreateAsync(CreatePaymentDto dto)
    {
        if (await _businessRepository.GetByIdAsync(dto.BusinessId) is null)
            return (null, "Business not found.");

        var payment = new Payment
        {
            BusinessId = dto.BusinessId,
            Amount = dto.Amount,
            PaymentMethod = dto.PaymentMethod.Trim(),
            TransactionNumber = dto.TransactionNumber.Trim()
        };

        var created = await _paymentRepository.AddAsync(payment);
        return (MapToDto(created), null);
    }

    public async Task<(PaymentDto? Result, string? Error)> UpdateAsync(int id, UpdatePaymentDto dto)
    {
        var existing = await _paymentRepository.GetByIdAsync(id);
        if (existing is null) return (null, "Payment not found.");

        existing.Amount = dto.Amount;
        existing.PaymentMethod = dto.PaymentMethod.Trim();
        existing.TransactionNumber = dto.TransactionNumber.Trim();

        var updated = await _paymentRepository.UpdateAsync(existing);
        return updated is null ? (null, "Failed to update payment.") : (MapToDto(updated), null);
    }

    public async Task<(bool Success, string? Error)> DeleteAsync(int id)
    {
        var deleted = await _paymentRepository.DeleteAsync(id);
        return deleted ? (true, null) : (false, "Payment not found.");
    }

    private static PaymentDto MapToDto(Payment payment) => new()
    {
        Id = payment.Id,
        BusinessId = payment.BusinessId,
        BusinessName = payment.Business?.Name ?? string.Empty,
        Amount = payment.Amount,
        PaymentMethod = payment.PaymentMethod,
        TransactionNumber = payment.TransactionNumber,
        CreatedAt = payment.CreatedAt
    };
}
