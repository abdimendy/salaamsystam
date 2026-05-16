using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public interface IReviewRepository
{
    Task<IEnumerable<Review>> GetAllAsync();
    Task<IEnumerable<Review>> GetByBusinessIdAsync(int businessId);
    Task<Review?> GetByIdAsync(int id);
    Task<Review> AddAsync(Review review);
    Task<Review?> UpdateAsync(Review review);
    Task<bool> DeleteAsync(int id);
    Task<int> CountAsync();
}
