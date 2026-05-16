using System.ComponentModel.DataAnnotations;

namespace YellowBook.API.DTOs;

public class PaymentDto
{
    public int Id { get; set; }
    public int BusinessId { get; set; }
    public string BusinessName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string TransactionNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreatePaymentDto
{
    [Required]
    public int BusinessId { get; set; }

    [Range(0.01, 1000000)]
    public decimal Amount { get; set; }

    [Required, StringLength(50)]
    public string PaymentMethod { get; set; } = string.Empty;

    [Required, StringLength(100)]
    public string TransactionNumber { get; set; } = string.Empty;
}

public class UpdatePaymentDto
{
    [Range(0.01, 1000000)]
    public decimal Amount { get; set; }

    [Required, StringLength(50)]
    public string PaymentMethod { get; set; } = string.Empty;

    [Required, StringLength(100)]
    public string TransactionNumber { get; set; } = string.Empty;
}
