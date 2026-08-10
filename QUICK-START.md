# 🚀 Quick Start - Urban T Construction Website

## ✅ What's Complete

- ✅ **Supabase Connected**: Environment variables configured (Project ID: pkbmflosqanfarwghzjp)
- ✅ **Code Committed**: All files staged and committed to Git
- ✅ **Ready to Push**: Main branch initialized and ready for GitHub

---

## 🎯 Next 3 Simple Steps

### 1️⃣ Create GitHub Repository (2 minutes)

1. Go to: **https://github.com/new**
2. Settings:
   - Owner: `SoftwareBazaar`
   - Name: `urbunt-construction-website` (or your choice)
   - Description: "Urban T Construction Website"
   - Visibility: Public or Private
   - ⚠️ **DON'T check** "Add README" or "Add .gitignore"
3. Click **"Create repository"**

### 2️⃣ Push to GitHub (1 minute)

**Option A: Use the script I created**
```powershell
cd "c:\Users\Algos\Desktop\DesktopBackup\SMART ALGOS INVESTMENT SOLUTION\Construction work\UrbunTWebsite\buildcraftandco-main"
.\push-to-github.ps1
```

**Option B: Manual commands**
```powershell
cd "c:\Users\Algos\Desktop\DesktopBackup\SMART ALGOS INVESTMENT SOLUTION\Construction work\UrbunTWebsite\buildcraftandco-main"

# Add remote (replace with your actual repo name)
git remote add origin https://github.com/SoftwareBazaar/urbunt-construction-website.git

# Push
git push -u origin main
```

### 3️⃣ Deploy to Vercel (5 minutes)

1. Go to: **https://vercel.com/new**
2. Import your GitHub repository
3. Add these environment variables:

```env
VITE_SUPABASE_URL=https://pkbmflosqanfarwghzjp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_FXAzo7QWObcSpNaakA-vHA_QzCvZTZo
VITE_SUPABASE_PROJECT_ID=pkbmflosqanfarwghzjp
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYm1mbG9zcWFuZmFyd2doempwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDk5ODYsImV4cCI6MjEwMTU4NTk4Nn0.PzggODgZ189bn8ZKzsaiKknfyqHXoRUY239vjvGd7ls
SUPABASE_URL=https://pkbmflosqanfarwghzjp.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_FXAzo7QWObcSpNaakA-vHA_QzCvZTZo
SUPABASE_PROJECT_ID=pkbmflosqanfarwghzjp
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYm1mbG9zcWFuZmFyd2doempwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAwOTk4NiwiZXhwIjoyMTAxNTg1OTg2fQ.u4K4-PYMZjZtMLWKlttLpTJXktSehDP1sKAHM5aXhhY
```

4. Click **"Deploy"**
5. Wait 2-3 minutes
6. Your site is LIVE! 🎉

---

## 🗄️ Bonus: Set Up Database (5 minutes)

Before users can submit forms, set up the database:

1. Go to: **https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/editor**
2. Click **"SQL Editor"** in left sidebar
3. Copy contents of `supabase-setup.sql`
4. Paste and click **"Run"**

This creates all tables for:
- Lead capture
- Newsletter subscriptions
- Job applications
- Client projects
- Documents and updates

---

## 📋 Files Created

1. **`DEPLOYMENT.md`** - Detailed deployment instructions
2. **`push-to-github.ps1`** - Automated script to push to GitHub
3. **`QUICK-START.md`** - This file (quick reference)
4. **`supabase-setup.sql`** - Database setup script
5. **`.env`** - Updated with your Supabase credentials

---

## 🎯 Summary

**Total Time to Live Site: ~10 minutes**

1. Create GitHub repo (2 min)
2. Push code (1 min)
3. Deploy to Vercel (5 min)
4. Set up database (5 min)

**You're ready to go! 🚀**

---

## 📞 Need Help?

Check these files for detailed instructions:
- **Full guide**: `DEPLOYMENT.md`
- **Database setup**: `supabase-setup.sql`
- **Push script**: `push-to-github.ps1`
