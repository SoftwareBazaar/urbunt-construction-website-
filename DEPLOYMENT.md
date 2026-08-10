# 🚀 Deployment Guide - Urban T Construction Website

## ✅ What's Already Done

1. **Git Repository Initialized** - Your code is committed and ready to push
2. **Supabase Connected** - Environment variables configured with your database
3. **Code Ready** - All files are staged and committed

---

## 📦 Step 1: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Configure repository:
   - **Owner**: SoftwareBazaar
   - **Repository name**: `urbunt-construction-website`
   - **Description**: "Urban T Construction Company Website - React, TanStack Start, Supabase"
   - **Visibility**: Public (or Private if preferred)
   - ⚠️ **DON'T** check "Add a README" or "Add .gitignore" (we already have these)
3. Click **"Create repository"**

---

## 📤 Step 2: Push Code to GitHub

After creating the repository, run these commands in PowerShell:

```powershell
# Navigate to project directory
cd "c:\Users\Algos\Desktop\DesktopBackup\SMART ALGOS INVESTMENT SOLUTION\Construction work\UrbunTWebsite\buildcraftandco-main"

# Add remote (replace REPO-NAME with your actual repository name)
git remote add origin https://github.com/SoftwareBazaar/REPO-NAME.git

# Push to GitHub
git push -u origin main
```

**Note**: You may be prompted to log in to GitHub. Use your credentials or Personal Access Token.

---

## 🗄️ Step 3: Set Up Supabase Database

1. Go to: **https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp**
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**
4. Copy the entire contents of `supabase-setup.sql` file
5. Paste into the SQL editor
6. Click **"Run"** or press `Ctrl+Enter`
7. Wait for confirmation: "Success. No rows returned"

This will create all 8 tables:
- ✅ leads
- ✅ newsletter_subscribers
- ✅ job_applications
- ✅ client_projects
- ✅ project_milestones
- ✅ project_updates
- ✅ project_documents
- ✅ user_roles

---

## 🚀 Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to: **https://vercel.com**
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select **"Import Third-Party Git Repository"**
5. Enter your GitHub repository URL:
   ```
   https://github.com/SoftwareBazaar/REPO-NAME
   ```
6. Click **"Import"**
7. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `dist` (or leave default)
   - **Install Command**: `npm install`

8. **Add Environment Variables** (click "Environment Variables"):
   ```
   VITE_SUPABASE_URL=https://pkbmflosqanfarwghzjp.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_FXAzo7QWObcSpNaakA-vHA_QzCvZTZo
   VITE_SUPABASE_PROJECT_ID=pkbmflosqanfarwghzjp
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYm1mbG9zcWFuZmFyd2doempwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDk5ODYsImV4cCI6MjEwMTU4NTk4Nn0.PzggODgZ189bn8ZKzsaiKknfyqHXoRUY239vjvGd7ls
   SUPABASE_URL=https://pkbmflosqanfarwghzjp.supabase.co
   SUPABASE_PUBLISHABLE_KEY=sb_publishable_FXAzo7QWObcSpNaakA-vHA_QzCvZTZo
   SUPABASE_PROJECT_ID=pkbmflosqanfarwghzjp
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYm1mbG9zcWFuZmFyd2doempwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAwOTk4NiwiZXhwIjoyMTAxNTg1OTg2fQ.u4K4-PYMZjZtMLWKlttLpTJXktSehDP1sKAHM5aXhhY
   ```

9. Click **"Deploy"**
10. Wait 2-3 minutes for deployment to complete
11. Your site will be live at: `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd "c:\Users\Algos\Desktop\DesktopBackup\SMART ALGOS INVESTMENT SOLUTION\Construction work\UrbunTWebsite\buildcraftandco-main"

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? urbunt-construction-website
# - In which directory? ./ (current directory)
# - Override settings? No

# For production deployment
vercel --prod
```

---

## 🔒 Important Security Notes

⚠️ **BEFORE DEPLOYING TO PRODUCTION:**

1. **Remove sensitive keys from `.env` file** if pushing to a public repository
2. Set environment variables in Vercel dashboard instead
3. Add `.env` to `.gitignore` (it's already there, but verify)
4. Never commit API keys or secrets to public repositories

---

## ✅ Verification Checklist

After deployment, test these features:

- [ ] Homepage loads correctly
- [ ] Quote form submits successfully
- [ ] Newsletter signup works
- [ ] Contact forms send data to Supabase
- [ ] Images and assets load properly
- [ ] Mobile responsive design works
- [ ] Check Supabase dashboard for incoming data

---

## 📞 Support

If you encounter issues:

1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Check Supabase connection** in the SQL editor
4. **Review browser console** for JavaScript errors

---

## 🎉 You're All Set!

Your Urban T Construction website is ready for deployment. Follow the steps above to get it live on Vercel.

**Expected Timeline:**
- GitHub setup: 2 minutes
- Supabase database setup: 5 minutes
- Vercel deployment: 3-5 minutes
- **Total: ~10 minutes** to go live! 🚀
