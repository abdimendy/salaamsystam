using Microsoft.EntityFrameworkCore;
using YellowBook.API.Data;
using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly YellowBookDbContext _context;

    public CategoryRepository(YellowBookDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories
            .Include(c => c.Businesses)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _context.Categories
            .Include(c => c.Businesses)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Category?> GetByNameAsync(string name)
    {
        return await _context.Categories
            .FirstOrDefaultAsync(c => c.Name.ToLower() == name.Trim().ToLower());
    }

    public async Task<Category> AddAsync(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<Category?> UpdateAsync(Category category)
    {
        var existing = await _context.Categories.FindAsync(category.Id);
        if (existing is null)
            return null;

        existing.Name = category.Name;
        existing.Description = category.Description;
        existing.Icon = category.Icon;
        await _context.SaveChangesAsync();
        await _context.Entry(existing).Collection(c => c.Businesses).LoadAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var category = await _context.Categories
            .Include(c => c.Businesses)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category is null)
            return false;

        if (category.Businesses.Count > 0)
            return false;

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<int> CountAsync() => await _context.Categories.CountAsync();
}
