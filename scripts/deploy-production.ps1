# Yellow Book — Deploy joogto ah (Vercel + Render)
# Run: .\scripts\deploy-production.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Yellow Book — Online joogto ah" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# --- Git ---
if (-not (Test-Path ".git")) {
  Write-Host "[1/5] Git init..." -ForegroundColor Yellow
  git init
  git branch -M main
} else {
  Write-Host "[1/5] Git repo waa jira." -ForegroundColor Green
}

Write-Host "[2/5] Hubinta build frontend..." -ForegroundColor Yellow
Push-Location frontend
npm install --silent 2>$null
npm run build
if ($LASTEXITCODE -ne 0) { Pop-Location; exit 1 }
Pop-Location
Write-Host "      Build OK" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  TALLAABOOYINKA (15 daqiiqo)" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "A) GITHUB — code-ka kor u qaad" -ForegroundColor White
Write-Host "   1. https://github.com/new → repo cusub (tusaale: yellowbook-somalia)" -ForegroundColor Gray
Write-Host "   2. PowerShell:" -ForegroundColor Gray
Write-Host "      git add ." -ForegroundColor DarkYellow
Write-Host "      git commit -m `"Yellow Book — production ready`"" -ForegroundColor DarkYellow
Write-Host "      git remote add origin https://github.com/YOUR_USER/yellowbook-somalia.git" -ForegroundColor DarkYellow
Write-Host "      git push -u origin main" -ForegroundColor DarkYellow
Write-Host ""
Write-Host "B) RENDER — API + database (BILAAB halkan)" -ForegroundColor White
Write-Host "   1. https://dashboard.render.com → Sign up (free)" -ForegroundColor Gray
Write-Host "   2. New + → Blueprint" -ForegroundColor Gray
Write-Host "   3. Connect GitHub repo → Deploy Blueprint (render.yaml)" -ForegroundColor Gray
Write-Host "   4. Sug 5-10 daq → API URL: https://yellowbook-api.onrender.com" -ForegroundColor Gray
Write-Host "   5. Environment → yellowbook-api:" -ForegroundColor Gray
Write-Host "      AdminUser__Password = Admin@123" -ForegroundColor DarkYellow
Write-Host "      (FRONTEND_URL waxaad ku dari doontaa tallaabada C)" -ForegroundColor Gray
Write-Host "   6. Test API: https://YOUR-API.onrender.com/api/categories" -ForegroundColor Gray
Write-Host ""
Write-Host "C) VERCEL — website (frontend)" -ForegroundColor White
Write-Host "   1. https://vercel.com → Sign up → Add New Project" -ForegroundColor Gray
Write-Host "   2. Import GitHub repo (isku repo)" -ForegroundColor Gray
Write-Host "   3. Settings:" -ForegroundColor Gray
Write-Host "      Framework: Vite" -ForegroundColor DarkYellow
Write-Host "      Root Directory: (empty — isticmaal vercel.json root)" -ForegroundColor DarkYellow
Write-Host "   4. Environment Variables:" -ForegroundColor Gray
Write-Host "      VITE_API_URL = https://YOUR-API.onrender.com/api" -ForegroundColor DarkYellow
Write-Host "   5. Deploy → URL: https://yellowbook-xxxx.vercel.app" -ForegroundColor Gray
Write-Host ""
Write-Host "D) DIB U XIR — CORS + login" -ForegroundColor White
Write-Host "   1. Render → yellowbook-api → Environment" -ForegroundColor Gray
Write-Host "      FRONTEND_URL = https://YOUR-PROJECT.vercel.app" -ForegroundColor DarkYellow
Write-Host "   2. Manual Deploy → Redeploy" -ForegroundColor Gray
Write-Host "   3. Login: https://YOUR-PROJECT.vercel.app/login" -ForegroundColor Gray
Write-Host "      admin / Admin@123" -ForegroundColor DarkYellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  LINK JOOGTO AH (kadib deploy):" -ForegroundColor Green
Write-Host "  Website: https://YOUR-PROJECT.vercel.app" -ForegroundColor Green
Write-Host "  API:     https://YOUR-API.onrender.com/api" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Optional — Vercel CLI (haddii aad login tahay):" -ForegroundColor Cyan
Write-Host "  npx vercel login" -ForegroundColor Gray
Write-Host "  `$env:VITE_API_URL='https://YOUR-API.onrender.com/api'; npx vercel --prod" -ForegroundColor Gray
Write-Host ""

$open = Read-Host "Fur Render dashboard browser-ka? (y/n)"
if ($open -eq "y") { Start-Process "https://dashboard.render.com/blueprints" }
