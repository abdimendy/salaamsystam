# POST — Create business
# Run: .\post-business.ps1
#      .\post-business.ps1 -CategoryId 2 -Name "My Hotel"

param(
    [string]$BaseUrl = "http://localhost:5261",
    [string]$Name = "City Tech Solutions",
    [string]$Phone = "+1-555-9999",
    [string]$Email = "info@citytech.com",
    [string]$Address = "99 Innovation Drive, Suite 200",
    [string]$Description = "IT consulting and support.",
    [int]$CategoryId = 1
)

$body = @{
    name        = $Name
    phone       = $Phone
    email       = $Email
    address     = $Address
    description = $Description
    categoryId  = $CategoryId
} | ConvertTo-Json

Invoke-RestMethod -Uri "$BaseUrl/api/businesses" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
