# Build and deploy script for CareerCompass

# Build the application
Write-Host "Building the application..." -ForegroundColor Green
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    
    # Check if Vercel CLI is installed
    $vercelInstalled = npm list -g vercel
    if ($vercelInstalled -match "vercel") {
        Write-Host "Vercel CLI is installed. Proceeding with deployment..." -ForegroundColor Green
        
        # Deploy to Vercel
        Write-Host "Deploying to Vercel..." -ForegroundColor Green
        vercel --prod
    } else {
        Write-Host "Vercel CLI is not installed. Installing now..." -ForegroundColor Yellow
        npm install -g vercel
        
        # Deploy to Vercel
        Write-Host "Deploying to Vercel..." -ForegroundColor Green
        vercel --prod
    }
} else {
    Write-Host "Build failed. Please fix the errors and try again." -ForegroundColor Red
}