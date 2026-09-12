# Karen Villa Photo Copy Script
# This script helps you copy your Karen Villa photos to the assets folder

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Karen Villa Photo Copy Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$assetsFolder = ".\src\assets"

# Check if assets folder exists
if (-not (Test-Path $assetsFolder)) {
    Write-Host "❌ Assets folder not found at: $assetsFolder" -ForegroundColor Red
    Write-Host "Make sure you're running this script from the buildcraftandco-main folder" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Assets folder found!" -ForegroundColor Green
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "1. Place your 8 Karen Villa photos in a folder (e.g., Desktop)" -ForegroundColor White
Write-Host "2. When prompted, enter the FULL PATH to each photo" -ForegroundColor White
Write-Host "3. The script will copy and rename them automatically" -ForegroundColor White
Write-Host ""
Write-Host "Press ENTER to start, or CTRL+C to cancel..." -ForegroundColor Yellow
Read-Host

# Photo mappings
$photos = @(
    @{Name="karen-staircase-interior.jpg"; Description="Curved staircase interior"},
    @{Name="karen-exterior-columns.jpg"; Description="Exterior with white columns"},
    @{Name="karen-courtyard.jpg"; Description="Courtyard with decorative railings"},
    @{Name="karen-staircase-view.jpg"; Description="Staircase from different angle"},
    @{Name="karen-exterior-scaffolding.jpg"; Description="Exterior with scaffolding"},
    @{Name="karen-columns-detail.jpg"; Description="Close-up of columns"},
    @{Name="karen-pool-area.jpg"; Description="Pool/water feature area"},
    @{Name="karen-exterior-full.jpg"; Description="Full exterior view"}
)

$copiedCount = 0

foreach ($photo in $photos) {
    Write-Host ""
    Write-Host "📸 Photo $($copiedCount + 1) of $($photos.Count)" -ForegroundColor Cyan
    Write-Host "   $($photo.Description)" -ForegroundColor White
    Write-Host ""
    
    $sourcePath = Read-Host "   Enter full path to this photo (or 'skip' to skip)"
    
    if ($sourcePath -eq "skip") {
        Write-Host "   ⏭️  Skipped" -ForegroundColor Yellow
        continue
    }
    
    # Remove quotes if user pasted path with quotes
    $sourcePath = $sourcePath.Trim('"')
    
    if (-not (Test-Path $sourcePath)) {
        Write-Host "   ❌ File not found: $sourcePath" -ForegroundColor Red
        Write-Host "   Skipping this photo..." -ForegroundColor Yellow
        continue
    }
    
    $destPath = Join-Path $assetsFolder $photo.Name
    
    try {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "   ✅ Copied successfully!" -ForegroundColor Green
        $copiedCount++
    }
    catch {
        Write-Host "   ❌ Error copying file: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Copied $copiedCount of $($photos.Count) photos" -ForegroundColor Green
Write-Host ""

if ($copiedCount -gt 0) {
    Write-Host "🎉 Photos saved to: $assetsFolder" -ForegroundColor Green
    Write-Host ""
    Write-Host "NEXT STEPS:" -ForegroundColor Yellow
    Write-Host "1. Tell Kiro: 'Photos are saved, update the Karen Villa project code'" -ForegroundColor White
    Write-Host "2. I will update the website code automatically" -ForegroundColor White
    Write-Host "3. Commit and push changes to deploy!" -ForegroundColor White
} else {
    Write-Host "⚠️  No photos were copied. Try again or copy manually." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press ENTER to exit..." -ForegroundColor Gray
Read-Host
