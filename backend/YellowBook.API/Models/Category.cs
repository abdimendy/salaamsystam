namespace YellowBook.API.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public ICollection<Business> Businesses { get; set; } = new List<Business>();
}
