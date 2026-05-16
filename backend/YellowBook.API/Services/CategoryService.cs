using YellowBook.API.DTOs;
using YellowBook.API.Models;
using YellowBook.API.Repositories;

namespace YellowBook.API.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return categories.Select(MapToDto);
    }

    public async Task<CategoryDto?> GetByIdAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category is null)
            return null;

        return MapToDto(category);
    }

    public async Task<(CategoryDto? Result, string? Error)> CreateAsync(CreateCategoryDto dto)
    {
        var existing = await _categoryRepository.GetByNameAsync(dto.Name);
        if (existing is not null)
            return (null, "A category with this name already exists.");

        var category = new Category
        {
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            Icon = dto.Icon?.Trim()
        };
        var created = await _categoryRepository.AddAsync(category);
        return (MapToDto(created), null);
    }

    public async Task<(CategoryDto? Result, string? Error)> UpdateAsync(int id, UpdateCategoryDto dto)
    {
        var existing = await _categoryRepository.GetByIdAsync(id);
        if (existing is null)
            return (null, "Category not found.");

        var duplicate = await _categoryRepository.GetByNameAsync(dto.Name);
        if (duplicate is not null && duplicate.Id != id)
            return (null, "A category with this name already exists.");

        existing.Name = dto.Name.Trim();
        existing.Description = dto.Description?.Trim();
        existing.Icon = dto.Icon?.Trim();
        var updated = await _categoryRepository.UpdateAsync(existing);

        if (updated is null)
            return (null, "Failed to update category.");

        return (MapToDto(updated), null);
    }

    public async Task<(bool Success, string? Error)> DeleteAsync(int id)
    {
        var existing = await _categoryRepository.GetByIdAsync(id);
        if (existing is null)
            return (false, "Category not found.");

        if (existing.Businesses.Count > 0)
            return (false, "Cannot delete a category that still has businesses.");

        var deleted = await _categoryRepository.DeleteAsync(id);
        return deleted ? (true, null) : (false, "Failed to delete category.");
    }

    private static CategoryDto MapToDto(Category c) => new()
    {
        Id = c.Id,
        Name = c.Name,
        Description = c.Description,
        Icon = c.Icon,
        BusinessCount = c.Businesses?.Count ?? 0
    };
}
