using Microsoft.EntityFrameworkCore;
using YellowBook.API.Data;
using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public class BusinessRepository : IBusinessRepository
{
    private readonly YellowBookDbContext _context;

    public BusinessRepository(YellowBookDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Business>> GetAllAsync()
    {
        return await _context.Businesses
            .Include(b => b.Category)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<Business?> GetByIdAsync(int id)
    {
        return await _context.Businesses
            .Include(b => b.Category)
            .Include(b => b.Reviews)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<(IEnumerable<Business> Items, int Total)> SearchAsync(
        string? name, int? categoryId, string? city, int page = 1, int pageSize = 12)
    {
        var query = _context.Businesses.Include(b => b.Category).AsQueryable();

        if (!string.IsNullOrWhiteSpace(name))
        {
            var term = name.Trim().ToLower();
            query = query.Where(b =>
                b.Name.ToLower().Contains(term) ||
                b.Phone.ToLower().Contains(term) ||
                b.Email.ToLower().Contains(term) ||
                b.Address.ToLower().Contains(term) ||
                b.City.ToLower().Contains(term) ||
                (b.Description != null && b.Description.ToLower().Contains(term)) ||
                (b.Category != null && b.Category.Name.ToLower().Contains(term)));
        }

        if (categoryId is > 0)
            query = query.Where(b => b.CategoryId == categoryId);

        if (!string.IsNullOrWhiteSpace(city))
        {
            var c = city.Trim().ToLower();
            query = query.Where(b => b.City.ToLower().Contains(c));
        }

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(b => b.Rating)
            .ThenBy(b => b.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    public async Task<IEnumerable<Business>> GetFeaturedAsync(int count)
    {
        return await _context.Businesses
            .Include(b => b.Category)
            .OrderByDescending(b => b.Rating)
            .ThenByDescending(b => b.CreatedAt)
            .Take(count)
            .ToListAsync();
    }

    public async Task<Business> AddAsync(Business business)
    {
        business.CreatedAt = DateTime.UtcNow;
        _context.Businesses.Add(business);
        await _context.SaveChangesAsync();
        await _context.Entry(business).Reference(b => b.Category).LoadAsync();
        return business;
    }

    public async Task<Business?> UpdateAsync(Business business)
    {
        var existing = await _context.Businesses.FindAsync(business.Id);
        if (existing is null) return null;

        existing.Name = business.Name;
        existing.Phone = business.Phone;
        existing.Email = business.Email;
        existing.Address = business.Address;
        existing.Description = business.Description;
        existing.CategoryId = business.CategoryId;
        existing.LogoUrl = business.LogoUrl;
        existing.Website = business.Website;
        existing.City = business.City;
        existing.Rating = business.Rating;

        await _context.SaveChangesAsync();
        await _context.Entry(existing).Reference(b => b.Category).LoadAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var business = await _context.Businesses.FindAsync(id);
        if (business is null) return false;

        _context.Businesses.Remove(business);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<int> CountAsync() => await _context.Businesses.CountAsync();

    public async Task<IEnumerable<Business>> GetRecentAsync(int count)
    {
        return await _context.Businesses
            .Include(b => b.Category)
            .OrderByDescending(b => b.CreatedAt)
            .Take(count)
            .ToListAsync();
    }

    public async Task<bool> CategoryExistsAsync(int categoryId)
    {
        return await _context.Categories.AnyAsync(c => c.Id == categoryId);
    }
}
