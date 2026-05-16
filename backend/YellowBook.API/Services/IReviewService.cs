using YellowBook.API.DTOs;

namespace YellowBook.API.Services;

public interface IReviewService
{
    Task<IEnumerable<ReviewDto>> GetAllAsync();
    Task<IEnumerable<ReviewDto>> GetByBusinessIdAsync(int businessId);
    Task<ReviewDto?> GetByIdAsync(int id);
    Task<(ReviewDto? Result, string? Error)> CreateAsync(CreateReviewDto dto);
    Task<(ReviewDto? Result, string? Error)> UpdateAsync(int id, UpdateReviewDto dto);
    Task<(bool Success, string? Error)> DeleteAsync(int id);
}
