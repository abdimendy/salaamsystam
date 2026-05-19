using Microsoft.EntityFrameworkCore;
using YellowBook.API.Data;
using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly YellowBookDbContext _context;

    public PaymentRepository(YellowBookDbContext context) => _context = context;

    public async Task<IEnumerable<Payment>> GetAllAsync()
        => await _context.Payments
            .Include(p => p.Business)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

    public async Task<Payment?> GetByIdAsync(int id)
        => await _context.Payments.Include(p => p.Business).FirstOrDefaultAsync(p => p.Id == id);

    public async Task<Payment> AddAsync(Payment payment)
    {
        payment.CreatedAt = DateTime.UtcNow;
        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();
        await _context.Entry(payment).Reference(p => p.Business).LoadAsync();
        return payment;
    }

    public async Task<Payment?> UpdateAsync(Payment payment)
    {
        var existing = await _context.Payments.FindAsync(payment.Id);
        if (existing is null) return null;
        existing.Amount = payment.Amount;
        existing.PaymentMethod = payment.PaymentMethod;
        existing.TransactionNumber = payment.TransactionNumber;
        await _context.SaveChangesAsync();
        await _context.Entry(existing).Reference(p => p.Business).LoadAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var payment = await _context.Payments.FindAsync(id);
        if (payment is null) return false;
        _context.Payments.Remove(payment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<int> CountAsync() => await _context.Payments.CountAsync();
}
