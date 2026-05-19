# YellowBook — online link with working login
# Run from project root: .\scripts\start-online.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$apiDir = Join-Path $root "backend\YellowBook.API"
$feDir = Join-Path $root "frontend"

Write-Host "Building frontend..." -ForegroundColor Cyan
Push-Location $feDir
npm run build | Out-Null
Pop-Location

Write-Host "Starting API (port 5261)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$apiDir'; dotnet run" -WindowStyle Minimized

Start-Sleep -Seconds 12

Write-Host "Starting API tunnel (cloudflared)..." -ForegroundColor Cyan
$apiLog = Join-Path $env:TEMP "yb-api-tunnel.log"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx --yes cloudflared tunnel --url http://127.0.0.1:5261 2>&1 | Tee-Object '$apiLog'" -WindowStyle Minimized

Write-Host "Waiting for API tunnel URL..." -ForegroundColor Yellow
$apiUrl = $null
for ($i = 0; $i -lt 45; $i++) {
  Start-Sleep -Seconds 2
  if (Test-Path $apiLog) {
    $m = Select-String -Path $apiLog -Pattern "https://[a-z0-9-]+\.trycloudflare\.com" | Select-Object -Last 1
    if ($m) {
      $apiUrl = $m.Matches[0].Value
      break
    }
  }
}

if (-not $apiUrl) {
  Write-Host "Could not detect API tunnel. Use local: http://localhost:5175" -ForegroundColor Red
  exit 1
}

$apiBase = "$apiUrl/api"
Write-Host "API: $apiBase" -ForegroundColor Green

$config = @{ apiUrl = $apiBase } | ConvertTo-Json
$config | Set-Content (Join-Path $feDir "public\config.json") -Encoding UTF8
$config | Set-Content (Join-Path $feDir "dist\config.json") -Encoding UTF8

Write-Host "Serving frontend (port 4173)..." -ForegroundColor Cyan
Get-NetTCPConnection -LocalPort 4173 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$feDir'; npx --yes serve -s dist -l 4173" -WindowStyle Minimized

Start-Sleep -Seconds 4

Write-Host "Starting website tunnel (cloudflared)..." -ForegroundColor Cyan
$feLog = Join-Path $env:TEMP "yb-fe-tunnel.log"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx --yes cloudflared tunnel --url http://127.0.0.1:4173 2>&1 | Tee-Object '$feLog'" -WindowStyle Minimized

Write-Host "Waiting for website tunnel URL..." -ForegroundColor Yellow
$siteUrl = $null
for ($i = 0; $i -lt 45; $i++) {
  Start-Sleep -Seconds 2
  if (Test-Path $feLog) {
    $m = Select-String -Path $feLog -Pattern "https://[a-z0-9-]+\.trycloudflare\.com" | Select-Object -Last 1
    if ($m) {
      $siteUrl = $m.Matches[0].Value
      break
    }
  }
}

if ($siteUrl) {
  Write-Host ""
  Write-Host "========================================" -ForegroundColor Green
  Write-Host "  WEBSITE: $siteUrl" -ForegroundColor Green
  Write-Host "  LOGIN:   $siteUrl/login" -ForegroundColor Green
  Write-Host "  API:     $apiBase" -ForegroundColor Green
  Write-Host "========================================" -ForegroundColor Green
  Write-Host "Default admin: admin / Admin@123" -ForegroundColor Yellow
  Write-Host "Keep all PowerShell windows open." -ForegroundColor Yellow
} else {
  Write-Host "Website tunnel not ready. Check $feLog" -ForegroundColor Red
}
