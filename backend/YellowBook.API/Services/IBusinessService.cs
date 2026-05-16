using YellowBook.API.DTOs;

namespace YellowBook.API.Services;

public interface IBusinessService
{
    Task<IEnumerable<BusinessDto>> GetAllAsync();
    Task<BusinessDto?> GetByIdAsync(int id);
    Task<BusinessSearchResultDto> SearchAsync(string? name, int? categoryId, string? city, int page, int pageSize);
    Task<IEnumerable<BusinessDto>> GetFeaturedAsync(int count);
    Task<(BusinessDto? Result, string? Error)> CreateAsync(CreateBusinessDto dto);
    Task<(BusinessDto? Result, string? Error)> UpdateAsync(int id, UpdateBusinessDto dto);
    Task<(bool Success, string? Error)> DeleteAsync(int id);
    Task<DashboardStatsDto> GetDashboardStatsAsync();
}
