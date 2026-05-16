using YellowBook.API.DTOs;

namespace YellowBook.API.Services;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllAsync();
    Task<CategoryDto?> GetByIdAsync(int id);
    Task<(CategoryDto? Result, string? Error)> CreateAsync(CreateCategoryDto dto);
    Task<(CategoryDto? Result, string? Error)> UpdateAsync(int id, UpdateCategoryDto dto);
    Task<(bool Success, string? Error)> DeleteAsync(int id);
}
