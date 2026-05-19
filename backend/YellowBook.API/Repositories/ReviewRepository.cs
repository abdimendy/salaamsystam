using Microsoft.EntityFrameworkCore;
using YellowBook.API.Data;
using YellowBook.API.Models;

namespace YellowBook.API.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly YellowBookDbContext _context;

    public ReviewRepository(YellowBookDbContext context) => _context = context;

    public async Task<IEnumerable<Review>> GetAllAsync()
        => await _context.Reviews.OrderByDescending(r => r.CreatedAt).ToListAsync();

    public async Task<IEnumerable<Review>> GetByBusinessIdAsync(int businessId)
        => await _context.Reviews
            .Where(r => r.BusinessId == businessId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

    public async Task<Review?> GetByIdAsync(int id)
        => await _context.Reviews.FindAsync(id);

    public async Task<Review> AddAsync(Review review)
    {
        review.CreatedAt = DateTime.UtcNow;
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
        return review;
    }

    public async Task<Review?> UpdateAsync(Review review)
    {
        var existing = await _context.Reviews.FindAsync(review.Id);
        if (existing is null) return null;
        existing.UserName = review.UserName;
        existing.Comment = review.Comment;
        existing.Rating = review.Rating;
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var review = await _context.Reviews.FindAsync(id);
        if (review is null) return false;
        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<int> CountAsync() => await _context.Reviews.CountAsync();
}
