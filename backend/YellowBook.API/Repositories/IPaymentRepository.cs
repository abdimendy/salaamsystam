using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public interface IPaymentRepository
{
    Task<IEnumerable<Payment>> GetAllAsync();
    Task<Payment?> GetByIdAsync(int id);
    Task<Payment> AddAsync(Payment payment);
    Task<Payment?> UpdateAsync(Payment payment);
    Task<bool> DeleteAsync(int id);
    Task<int> CountAsync();
}
