# POST — Create category
# Run: .\post-category.ps1
#      .\post-category.ps1 -Name "Automotive"

param(
    [string]$BaseUrl = "http://localhost:5261",
    [string]$Name = "Technology"
)

$body = @{ name = $Name } | ConvertTo-Json

Invoke-RestMethod -Uri "$BaseUrl/api/categories" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
