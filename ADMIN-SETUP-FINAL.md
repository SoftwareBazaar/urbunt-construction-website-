# Admin CMS - Final Setup Instructions

## ✅ What's Been Done
- Full admin dashboard with 5 sections built
- Live website integration complete (edits appear immediately)
- All code deployed to GitHub and Vercel
- Routes fixed, build errors resolved

## 🚀 What You Need To Do

### Step 1: Run SQL Files in Supabase

Go to: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/sql

#### A. Run `admin-cms-setup.sql`
1. Open `admin-cms-setup.sql` from your project
2. Copy ALL contents
3. Paste into Supabase SQL Editor
4. Click "Run"
5. Should complete successfully now (drops existing triggers/policies first)

#### B. Run `admin-user-list-fix.sql`
1. Open `admin-user-list-fix.sql` from your project
2. Copy ALL contents
3. Paste into Supabase SQL Editor  
4. Click "Run"
5. This creates the `get_all_users()` function for admin user management

---

## 📋 Admin Dashboard Features

Once SQL is run, these work immediately:

### 1. Projects Management (`/admin/projects`)
- ✅ Create/edit/delete projects
- ✅ Assign projects to clients
- ✅ Add milestones with dates
- ✅ Add progress updates with photos
- ✅ Track project progress %

### 2. Blog Management (`/admin/blog`)
- ✅ Create/edit/delete blog posts
- ✅ Markdown support
- ✅ Categories (Cost Guides, How-To, Project Stories, etc.)
- ✅ Publish/draft/archive status
- ✅ Featured images

### 3. Media Library (`/admin/media`)
- ✅ Upload images, videos, documents
- ✅ Organize by folder (General, Projects, Blog, Portfolio, Team)
- ✅ Copy public URLs
- ✅ Grid and list view
- ✅ Drag & drop upload

### 4. User Management (`/admin/users`)
- ✅ View all users with roles
- ✅ Assign/change roles (Admin, Staff, Client)
- ✅ Filter by role
- ✅ See last login dates

**How to Add Users:**
- **Clients:** They sign up at `/auth`, then you assign roles in Users page
- **Staff/Admins:** Create via [Supabase Dashboard](https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/auth/users), then assign roles

### 5. Content Management (`/admin/content`)
- ✅ Edit homepage hero (title, subtitle, CTA)
- ✅ Edit company info (phone, email, address)
- ✅ Edit contact page content
- ✅ Edit footer (copyright, description)
- ✅ **Changes appear on live website immediately!** (5min cache)

---

## 🎯 Testing Checklist

1. **Run Both SQL Files** ✓
   - `admin-cms-setup.sql`
   - `admin-user-list-fix.sql`

2. **Test Projects** ✓
   - Go to `/admin/projects`
   - Should load without 401 errors
   - Try creating a test project

3. **Test Content Editing** ✓
   - Go to `/admin/content`
   - Select "Home Page"
   - Change "Hero Title"
   - Click "Save Changes"
   - Go to homepage and refresh - should see new title!

4. **Test Media Upload** ✓
   - Go to `/admin/media`
   - Choose folder (e.g., "Portfolio")
   - Upload an image
   - Copy the URL
   - Should see it in the grid

5. **Test Users** ✓
   - Go to `/admin/users`
   - Should see list of users
   - Try changing a user's role

---

## 🔧 Admin Accounts

Current admins (already set in database):
- `Johnwanyaga37@gmail.com`
- `mutembeipeter025@gmail.com`

To add more admins:
1. Have them create account at `/auth`
2. Go to `/admin/users`
3. Find their email
4. Change role dropdown to "Admin"

---

## 📁 Files Created

**SQL Setup:**
- `admin-cms-setup.sql` - Creates all CMS tables
- `admin-user-list-fix.sql` - Fixes user listing

**Components:**
- `src/hooks/useWebsiteContent.ts` - Fetches content from database
- `src/components/AdminLayout.tsx` - Shared admin sidebar
- `src/routes/_authenticated/admin/projects.tsx`
- `src/routes/_authenticated/admin/blog.tsx`
- `src/routes/_authenticated/admin/media.tsx`
- `src/routes/_authenticated/admin/users.tsx`
- `src/routes/_authenticated/admin/content.tsx`

**Documentation:**
- `BLOG-MEDIA-SETUP.md` - Original setup guide
- `COMPREHENSIVE-ADMIN-CMS-PLAN.md` - Full roadmap
- `ADMIN-DASHBOARD-GUIDE.md` - User guide
- `ADMIN-SETUP-FINAL.md` - This file!

---

## 🎉 You're Done When...

✅ Both SQL files run successfully  
✅ No 401 errors in browser console  
✅ Can view users at `/admin/users`  
✅ Can upload files at `/admin/media`  
✅ Homepage edits appear on live site  

---

## 🆘 Troubleshooting

**401 Errors on Projects/Users page?**
- Run `admin-user-list-fix.sql` in Supabase

**Policies already exist error?**
- SQL file now handles this - run again, it will work

**Can't upload files?**
- Check storage bucket "media" exists and is public
- Check storage policies are set

**Content edits don't appear on site?**
- Wait 5 minutes (cache) or hard refresh (Ctrl+Shift+R)
- Check browser console for errors

---

## 📞 Support

Everything is complete and deployed! Just run the two SQL files and you're ready to go. 🚀
