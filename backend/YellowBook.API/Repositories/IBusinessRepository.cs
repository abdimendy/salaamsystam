using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public interface IBusinessRepository
{
    Task<IEnumerable<Business>> GetAllAsync();
    Task<Business?> GetByIdAsync(int id);
    Task<(IEnumerable<Business> Items, int Total)> SearchAsync(
        string? name, int? categoryId, string? city, int page = 1, int pageSize = 12);
    Task<IEnumerable<Business>> GetFeaturedAsync(int count);
    Task<Business> AddAsync(Business business);
    Task<Business?> UpdateAsync(Business business);
    Task<bool> DeleteAsync(int id);
    Task<int> CountAsync();
    Task<IEnumerable<Business>> GetRecentAsync(int count);
    Task<bool> CategoryExistsAsync(int categoryId);
}
