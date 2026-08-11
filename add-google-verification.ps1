# Google Search Console Verification Script

Write-Host "Installing Vercel CLI..." -ForegroundColor Green
npm install -g vercel

Write-Host "`nLogging into Vercel..." -ForegroundColor Green
vercel login

Write-Host "`nAdding DNS TXT record..." -ForegroundColor Green
vercel dns add urbantconstruction.com '@' TXT "google-site-verification=pGio_jTaB1WhlJ93dRJ5gnxxeOHpagpY8Rs"

Write-Host "`nDone! Wait 5-10 minutes, then verify in Google Search Console." -ForegroundColor Green
