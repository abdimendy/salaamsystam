$ErrorActionPreference = 'Stop'
$apiPath = Join-Path $PSScriptRoot '..\backend\YellowBook.API' | Resolve-Path

Write-Host 'Stopping Yellow Book API on port 5261...'
Get-Process -Name 'YellowBook.API' -ErrorAction SilentlyContinue | Stop-Process -Force
Get-NetTCPConnection -LocalPort 5261 -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
taskkill /F /IM YellowBook.API.exe 2>$null | Out-Null
Start-Sleep -Seconds 3

Set-Location $apiPath
Write-Host 'Building API...'
dotnet build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host 'Starting API at http://localhost:5261 ...'
dotnet run --launch-profile http
