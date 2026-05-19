# One-time: push Yellow Book to GitHub (fixes Vercel "branch not found" / empty repo)
# Run: .\scripts\setup-github-and-push.ps1

$ErrorActionPreference = 'Stop'
$root = (Join-Path $PSScriptRoot '..') | Resolve-Path
Set-Location $root

# Repo that exists on your GitHub (matches Vercel project fullsystem-7med)
$defaultUser = 'abdimendy'
$repoName = 'fullsystem'
$user = Read-Host "GitHub username [$defaultUser]"
if ([string]::IsNullOrWhiteSpace($user)) { $user = $defaultUser }

$remoteUrl = "https://github.com/$user/$repoName.git"

Write-Host ''
Write-Host "Target: $remoteUrl" -ForegroundColor Cyan
Write-Host 'If the repo does not exist yet:' -ForegroundColor Yellow
Write-Host '  1. Open https://github.com/new' -ForegroundColor White
Write-Host "  2. Name: $repoName  |  Public  |  NO README / NO .gitignore" -ForegroundColor White
Write-Host '  3. Create repository, then press Enter...' -ForegroundColor White
Read-Host

git remote remove origin 2>$null
git remote add origin $remoteUrl
git branch -M main

Write-Host 'Building frontend (required before push)...' -ForegroundColor Cyan
npm install --prefix frontend
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }

Write-Host 'Committing project...' -ForegroundColor Cyan
git add -A
# Never commit junk / secrets
git reset HEAD -w 2>$null
git reset HEAD .env .env.vercel 2>$null
$null = git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m 'Yellow Book — Vercel build fix, full project on main'
}

Write-Host "Pushing to $remoteUrl (main)..." -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host 'Normal push failed (remote may have only a README). Trying --force-with-lease...' -ForegroundColor Yellow
    git push -u origin main --force-with-lease
}
if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host 'Push failed. Sign in to GitHub, then run:' -ForegroundColor Red
    Write-Host '  git push -u origin main --force-with-lease' -ForegroundColor DarkYellow
    exit 1
}

Write-Host ''
Write-Host 'SUCCESS. In Vercel dashboard:' -ForegroundColor Green
Write-Host "  Settings → Git → Connect → $user/$repoName → branch: main" -ForegroundColor White
Write-Host '  Root Directory: (empty)' -ForegroundColor White
Write-Host '  Then Redeploy.' -ForegroundColor White
