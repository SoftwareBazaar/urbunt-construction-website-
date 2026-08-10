# PowerShell Script to Push Code to GitHub
# Urban T Construction Website

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Urban T Construction - GitHub Push Script" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Repository name (CHANGE THIS to your preferred name)
$REPO_NAME = "urbunt-construction-website"
$GITHUB_USERNAME = "SoftwareBazaar"

Write-Host "Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANT: Create the repository on GitHub first!" -ForegroundColor Red
Write-Host "   Go to: https://github.com/new" -ForegroundColor Red
Write-Host "   Repository name: $REPO_NAME" -ForegroundColor Red
Write-Host "   DON'T initialize with README/gitignore" -ForegroundColor Red
Write-Host ""

# Prompt user to continue
$continue = Read-Host "Have you created the repository on GitHub? (y/n)"

if ($continue -ne "y") {
    Write-Host ""
    Write-Host "Please create the repository first, then run this script again." -ForegroundColor Yellow
    Write-Host ""
    exit
}

Write-Host ""
Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Green
Write-Host ""

# Check if remote already exists
$remoteExists = git remote get-url origin 2>&1

if ($remoteExists -match "https://github.com") {
    Write-Host "ℹ️  Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $changeRemote = Read-Host "Do you want to change it? (y/n)"
    
    if ($changeRemote -eq "y") {
        git remote remove origin
        git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        Write-Host "✅ Remote updated" -ForegroundColor Green
    }
} else {
    # Add remote
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    Write-Host "✅ Remote added" -ForegroundColor Green
}

Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan

# Push to GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Green
    Write-Host "  ✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Repository URL:" -ForegroundColor Cyan
    Write-Host "   https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to Vercel: https://vercel.com" -ForegroundColor White
    Write-Host "   2. Import your GitHub repository" -ForegroundColor White
    Write-Host "   3. Add environment variables from .env file" -ForegroundColor White
    Write-Host "   4. Deploy! 🎉" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "  1. Repository doesn't exist on GitHub" -ForegroundColor White
    Write-Host "  2. You don't have push permissions" -ForegroundColor White
    Write-Host "  3. You need to authenticate with GitHub" -ForegroundColor White
    Write-Host ""
    Write-Host "Try:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
