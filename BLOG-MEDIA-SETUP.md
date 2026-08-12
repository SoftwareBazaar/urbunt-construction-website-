# Blog & Media Management Setup Guide

## ✅ What's Been Built

You now have a fully functional:
1. **Blog Management System** - Create, edit, publish blog posts
2. **Media Library** - Upload, organize, and manage files

---

## 🚀 Setup Instructions

### Step 1: Run Database Setup

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp
2. Click **SQL Editor**
3. Open `admin-cms-setup.sql` from your project
4. Copy and paste the entire SQL
5. Click **Run**
6. You should see: "✅ Admin CMS tables created successfully!"

### Step 2: Create Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click **"New bucket"**
3. Name: `media`
4. Public bucket: ✅ **YES** (check this!)
5. Click **"Create bucket"**

### Step 3: Set Storage Policies

In SQL Editor, run this:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to update their uploads
CREATE POLICY "Users can update media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

-- Allow authenticated users to delete
CREATE POLICY "Users can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- Allow public read access
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');
```

---

## 📝 Blog Management Features

### Access:
Go to `/admin` → Click **"Blog"** in sidebar

### Features:
✅ **Create Posts** - Rich content with Markdown support  
✅ **Edit Posts** - Update existing posts  
✅ **Publish/Unpublish** - Toggle post visibility  
✅ **Categories** - Organize posts (5 default categories)  
✅ **Featured Images** - Add cover images  
✅ **Drafts** - Save without publishing  
✅ **SEO** - Custom slugs and excerpts  
✅ **Read Time** - Estimated reading minutes  

### How to Create a Blog Post:

1. Click **"New Post"** button
2. Fill in:
   - **Title** - Post headline
   - **Slug** - URL (auto-generated from title)
   - **Excerpt** - Brief summary
   - **Content** - Full post (Markdown supported)
   - **Category** - Select from dropdown
   - **Featured Image** - URL from Media Library
   - **Read Time** - Estimated minutes
   - **Status** - Draft or Published
3. Click **"Create Post"**

### Available Categories:
- Cost Guides
- How-To
- Project Stories
- Industry News
- Design Ideas

---

## 🖼️ Media Library Features

### Access:
Go to `/admin` → Click **"Media"** in sidebar

### Features:
✅ **Drag & Drop Upload** - Drop files anywhere  
✅ **Multi-file Upload** - Upload multiple files at once  
✅ **Grid & List View** - Two viewing modes  
✅ **File Types** - Images, Videos, Documents  
✅ **Copy URL** - One-click URL copy  
✅ **File Preview** - View file details  
✅ **Search & Filter** - By type and folder  
✅ **Delete Files** - Remove unwanted files  

### How to Upload Files:

**Method 1: Button**
1. Click **"Upload Files"** button
2. Select files from your computer
3. Wait for upload to complete

**Method 2: Drag & Drop**
1. Drag files from your computer
2. Drop them into the drop zone
3. Files upload automatically

### Supported File Types:
- **Images**: JPG, PNG, GIF, WebP
- **Videos**: MP4, WebM
- **Documents**: PDF, DOC, DOCX

### How to Use in Blog Posts:

1. Upload image to Media Library
2. Click on the image
3. Click **Copy URL** button
4. Paste URL in blog post "Featured Image" field

---

## 🎯 Typical Workflow

### Creating a Blog Post with Images:

1. **Upload Images First**:
   - Go to `/admin/media`
   - Upload cover image
   - Copy the URL

2. **Create Blog Post**:
   - Go to `/admin/blog`
   - Click "New Post"
   - Fill in title and content
   - Paste image URL in "Featured Image"
   - Select category
   - Choose status (Draft or Published)
   - Click "Create Post"

3. **View on Website**:
   - Post appears on `/blog` page (if published)
   - Clients can read the post
   - Drafts are hidden from public

---

## 📊 Data Structure

### Blog Posts Table (`blog_posts`):
- id, slug, title, excerpt, content
- category, featured_image
- author_id, author_name, read_minutes
- status (draft/published/archived)
- published_at, created_at, updated_at

### Media Library Table (`media_library`):
- id, file_name, file_url
- file_type, file_size, mime_type
- alt_text, caption
- folder, uploaded_by, created_at

---

## 🔐 Permissions

### Who Can Access:

**Admins:**
- ✅ Create/edit/delete blog posts
- ✅ Upload/delete media files
- ✅ Publish/unpublish posts
- ✅ Full access

**Staff:**
- ✅ Create/edit blog posts
- ✅ Upload media files
- ✅ Publish posts
- ✅ Full access

**Clients:**
- ✅ Read published blog posts (public)
- ❌ Cannot access admin dashboard
- ❌ Cannot create/edit content

---

## 💡 Tips & Best Practices

### For Blog Posts:
1. **Write Clear Titles** - Descriptive and SEO-friendly
2. **Add Excerpts** - Brief summaries for preview cards
3. **Use Categories** - Helps readers find related content
4. **Set Read Time** - Helps readers plan their time
5. **Add Featured Images** - Makes posts more engaging
6. **Save as Draft** - Review before publishing
7. **Use Markdown** - Format text with `**bold**`, `## Headings`, etc.

### For Media Library:
1. **Name Files Clearly** - Use descriptive names
2. **Optimize Images** - Compress before uploading
3. **Organize by Folder** - Keep projects separate (future feature)
4. **Delete Unused Files** - Keep library clean
5. **Check File Sizes** - Large files slow down site

---

## 🐛 Troubleshooting

### "Error loading posts"
- Check you're logged in as admin
- Verify admin role in Supabase
- Check RLS policies are enabled

### "Error loading media"
- Verify storage bucket "media" exists
- Check storage policies are set
- Confirm bucket is public

### "Upload failed"
- Check file size (max 50MB)
- Verify file type is supported
- Check storage quota in Supabase

### "Cannot publish post"
- Save as draft first
- Fill all required fields
- Check you have admin role

---

## 📈 Future Enhancements

Want to add these features? Let me know:

- [ ] Rich text WYSIWYG editor (TipTap)
- [ ] Image editing (crop, resize)
- [ ] Bulk operations (delete multiple)
- [ ] Advanced search
- [ ] Draft preview
- [ ] Schedule publishing
- [ ] Post analytics
- [ ] Comments system
- [ ] Tags/keywords
- [ ] Related posts

---

## 🎉 You're Ready!

Your blog and media management system is fully functional!

**Test it:**
1. Go to `/admin/media` - Upload a test image
2. Copy the image URL
3. Go to `/admin/blog` - Create a test post
4. Paste image URL as featured image
5. Publish the post
6. View it on your public blog page!

---

**Need help?** Check:
- COMPREHENSIVE-ADMIN-CMS-PLAN.md for full roadmap
- Supabase Dashboard for data and storage
- Browser console for error messages
