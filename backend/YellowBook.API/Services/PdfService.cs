using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using YellowBook.API.Repositories;

namespace YellowBook.API.Services;

public interface IPdfService
{
    Task<byte[]?> GenerateBusinessPdfAsync(int businessId);
    Task<byte[]> GenerateReportPdfAsync();
}

public class PdfService : IPdfService
{
    private readonly IBusinessRepository _businessRepository;

    public PdfService(IBusinessRepository businessRepository)
    {
        _businessRepository = businessRepository;
        QuestPDF.Settings.License = LicenseType.Community;
    }

    public async Task<byte[]?> GenerateBusinessPdfAsync(int businessId)
    {
        var business = await _businessRepository.GetByIdAsync(businessId);
        if (business is null) return null;

        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(40);
                page.Header().Text("YellowBook Directory").FontSize(22).Bold().FontColor(Colors.Amber.Darken2);
                page.Content().Column(col =>
                {
                    col.Item().Text(business.Name).FontSize(18).Bold();
                    col.Item().PaddingTop(8).Text($"Category: {business.Category?.Name}");
                    col.Item().Text($"Rating: {business.Rating:F1} / 5");
                    col.Item().PaddingTop(12).Text("Contact").Bold();
                    col.Item().Text($"Phone: {business.Phone}");
                    col.Item().Text($"Email: {business.Email}");
                    col.Item().Text($"Address: {business.Address}, {business.City}");
                    if (!string.IsNullOrWhiteSpace(business.Website))
                        col.Item().Text($"Website: {business.Website}");
                    col.Item().PaddingTop(12).Text("Description").Bold();
                    col.Item().Text(business.Description ?? "No description provided.");
                });
                page.Footer().AlignCenter().Text($"Generated {DateTime.UtcNow:yyyy-MM-dd HH:mm} UTC");
            });
        });

        return document.GeneratePdf();
    }

    public async Task<byte[]> GenerateReportPdfAsync()
    {
        var businesses = (await _businessRepository.GetAllAsync()).ToList();

        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(40);
                page.Header().Text("YellowBook — Business Report").FontSize(20).Bold();
                page.Content().Table(table =>
                {
                    table.ColumnsDefinition(c =>
                    {
                        c.RelativeColumn(3);
                        c.RelativeColumn(2);
                        c.RelativeColumn(2);
                    });
                    table.Header(h =>
                    {
                        h.Cell().Text("Name").Bold();
                        h.Cell().Text("Category").Bold();
                        h.Cell().Text("City").Bold();
                    });
                    foreach (var b in businesses)
                    {
                        table.Cell().Text(b.Name);
                        table.Cell().Text(b.Category?.Name ?? "-");
                        table.Cell().Text(b.City);
                    }
                });
            });
        });

        return document.GeneratePdf();
    }
}
