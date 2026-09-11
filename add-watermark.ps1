# =====================================================
# Urban T Construction - Image Watermarking Script
# =====================================================
# This script adds "Urban T Construction" watermark to project photos
# using ImageMagick (free tool)

Write-Host "🎨 Urban T Construction - Image Watermarking Tool" -ForegroundColor Cyan
Write-Host ""

# Check if ImageMagick is installed
$magickInstalled = Get-Command magick -ErrorAction SilentlyContinue

if (-not $magickInstalled) {
    Write-Host "❌ ImageMagick not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 Install ImageMagick:" -ForegroundColor Yellow
    Write-Host "   1. Download from: https://imagemagick.org/script/download.php#windows"
    Write-Host "   2. Or use Chocolatey: choco install imagemagick"
    Write-Host ""
    
    # Alternative: Use online tool
    Write-Host "🌐 Or use FREE online watermarking:" -ForegroundColor Green
    Write-Host "   1. Go to: https://watermarkly.com/add-watermark/"
    Write-Host "   2. Upload your photos"
    Write-Host "   3. Add text: 'Urban T Construction'"
    Write-Host "   4. Position: Bottom right corner"
    Write-Host "   5. Style: White text with black shadow"
    Write-Host "   6. Download watermarked images"
    Write-Host ""
    exit 1
}

# Create folders
$sourceFolder = "naivasha-photos"
$outputFolder = "naivasha-watermarked"

if (-not (Test-Path $sourceFolder)) {
    New-Item -ItemType Directory -Path $sourceFolder | Out-Null
    Write-Host "📁 Created folder: $sourceFolder" -ForegroundColor Green
    Write-Host "   → Place your Naivasha photos here"
    Write-Host ""
}

if (-not (Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
}

# Get all images
$images = Get-ChildItem -Path $sourceFolder -Include *.jpg,*.jpeg,*.png,*.webp -Recurse

if ($images.Count -eq 0) {
    Write-Host "⚠️  No images found in $sourceFolder" -ForegroundColor Yellow
    Write-Host "   → Add your photos to: $sourceFolder"
    exit 0
}

Write-Host "📸 Found $($images.Count) images to watermark" -ForegroundColor Green
Write-Host ""

# Watermark settings
$watermarkText = "Urban T Construction"
$fontSize = 40
$fontColor = "white"
$shadowColor = "rgba(0,0,0,0.7)"

# Process each image
$count = 0
foreach ($image in $images) {
    $count++
    $outputPath = Join-Path $outputFolder $image.Name
    
    Write-Host "[$count/$($images.Count)] Processing: $($image.Name)" -ForegroundColor Cyan
    
    # Add watermark with shadow effect
    & magick $image.FullName `
        -gravity SouthEast `
        -pointsize $fontSize `
        -fill $shadowColor `
        -annotate +32+32 $watermarkText `
        -fill $fontColor `
        -annotate +30+30 $watermarkText `
        $outputPath
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Saved: $outputPath" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Failed to process $($image.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Watermarking complete!" -ForegroundColor Green
Write-Host "📁 Watermarked images saved to: $outputFolder" -ForegroundColor Cyan
Write-Host ""
Write-Host "📤 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Open admin panel: urbantconstruction.com/admin"
Write-Host "   2. Go to Media → Upload"
Write-Host "   3. Upload watermarked images from: $outputFolder"
Write-Host "   4. Create Naivasha project in Projects section"
Write-Host ""
