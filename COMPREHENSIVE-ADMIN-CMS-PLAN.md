# Comprehensive Admin CMS - Implementation Plan

## 🎯 Overview

Building a complete Content Management System for Urban T Construction with these sections:

1. ✅ **Project Management** - DONE
2. 🔨 **Blog Management** - IN PROGRESS  
3. 🔨 **Media Library** - IN PROGRESS
4. 🔨 **User Management** - IN PROGRESS
5. 🔨 **Content Management** - IN PROGRESS
6. ✅ **Leads Dashboard** - DONE

---

## 📊 Current Status

### ✅ Completed:
- Admin dashboard layout with sidebar navigation
- Project Management (create, edit, delete projects)
- Milestone management
- Progress updates
- Client portal (read-only for clients)
- Leads dashboard
- Role-based access control
- Database schema for projects

### 🔨 In Progress:
- Blog Management
- Media Library
- User Management  
- Content Management System
- Database tables for CMS features

---

## 🗄️ Database Schema

### New Tables Created (`admin-cms-setup.sql`):

1. **blog_posts** - Blog content management
   - id, slug, title, excerpt, content
   - category, featured_image
   - author_id, author_name
   - status (draft/published/archived)
   - published_at, created_at, updated_at

2. **blog_categories** - Blog categorization
   - id, name, slug, description

3. **media_library** - File/photo management
   - id, file_name, file_url, file_type
   - file_size, mime_type
   - alt_text, caption
   - project_id (optional link to projects)
   - folder, uploaded_by

4. **website_content** - CMS for website pages
   - id, page, section, content_key
   - content_value, content_type
   - updated_by

---

## 📁 File Structure

```
src/routes/_authenticated/admin/
├── index.tsx           ✅ Layout with sidebar navigation
├── projects.tsx        ✅ Project management (moved from admin.tsx)
├── blog.tsx            🔨 Blog post management
├── media.tsx           🔨 Media library & uploads
├── users.tsx           🔨 User management
└── content.tsx         🔨 Website content editor
```

---

## 🎨 Admin Dashboard Navigation

### Sidebar Menu:
- 📊 **Projects** - `/admin/projects`
- 📝 **Blog** - `/admin/blog`
- 🖼️ **Media** - `/admin/media`
- 👥 **Users** - `/admin/users`
- ⚙️ **Content** - `/admin/content`
- 📬 **Leads** - `/leads`

---

## 🚀 Next Steps

### 1. Blog Management (`/admin/blog`)

**Features:**
- List all blog posts with filters (published/draft/archived)
- Create new blog post with rich text editor
- Edit existing posts
- Delete posts
- Publish/unpublish
- Set featured image
- Add to category
- SEO fields (meta description, slug)
- Preview before publishing

**UI Components:**
- Post list with search and filters
- Rich text editor (TipTap or similar)
- Image picker from media library
- Category selector
- Status toggle (Draft/Published)

---

### 2. Media Library (`/admin/media`)

**Features:**
- Upload images/videos/documents
- Organize in folders
- View all media in grid/list view
- Search and filter by type
- Delete media
- Copy URL to clipboard
- Link media to projects
- Image preview and details
- Bulk operations

**UI Components:**
- Drag & drop upload area
- Grid view with thumbnails
- File details sidebar
- Folder tree navigation
- Search bar

---

### 3. User Management (`/admin/users`)

**Features:**
- List all users (clients, staff, admins)
- View user details
- Assign roles (user/staff/admin)
- Delete users
- Reset passwords
- See user's projects (for clients)
- Filter by role
- Create new users manually

**UI Components:**
- User table with role badges
- Role selector dropdown
- Confirmation dialogs
- User detail modal

---

### 4. Content Management (`/admin/content`)

**Features:**
- Edit homepage sections
- Update services content
- Manage testimonials
- Edit about page
- Update company information
- Change pricing
- Edit footer content
- Preview changes

**UI Components:**
- Page selector
- Section editor
- Rich text fields for long content
- Text inputs for short content
- Image uploads for media
- Save button with success feedback

---

## 🔐 Security & Permissions

### Role-Based Access:

**Admin:**
- ✅ Full access to all sections
- ✅ Create/edit/delete everything
- ✅ Manage users and roles
- ✅ Access all projects

**Staff:**
- ✅ Access to projects and leads
- ✅ Create/edit blog posts
- ✅ Upload media
- ❌ Cannot manage users
- ❌ Cannot delete projects

**Client:**
- ✅ View their own projects only
- ❌ No access to admin dashboard
- ❌ Cannot edit anything

---

## 💾 Data Flow

### Project Updates (Admin → Client):
1. Admin logs into `/admin/projects`
2. Selects a project
3. Clicks "Add Milestone" or "Add Progress Update"
4. Fills form and saves
5. Client sees update in their `/portal` instantly

### Blog Publishing:
1. Admin goes to `/admin/blog`
2. Creates new post or edits existing
3. Adds content with rich text editor
4. Selects category and featured image
5. Clicks "Publish"
6. Post appears on public `/blog` page

### Media Management:
1. Admin uploads photo to `/admin/media`
2. Photo stored in Supabase Storage
3. URL generated and saved to `media_library` table
4. Can be used in blog posts or project updates
5. Linked to specific projects if needed

---

## 🎯 Implementation Priority

### Phase 1 (Current):
1. ✅ Admin layout with sidebar
2. ✅ Project management
3. ✅ Route structure

### Phase 2 (Next):
1. 🔨 Blog management
2. 🔨 Media library with uploads

### Phase 3 (After):
1. User management
2. Content management

### Phase 4 (Polish):
1. Rich text editor
2. Image optimization
3. Bulk operations
4. Advanced filters
5. Analytics dashboard

---

## 📝 To Do List

- [ ] Run `admin-cms-setup.sql` in Supabase
- [ ] Create Supabase Storage bucket named "media"
- [ ] Build blog management UI
- [ ] Build media library UI
- [ ] Build user management UI
- [ ] Build content management UI
- [ ] Add rich text editor for blog
- [ ] Implement file upload to Supabase Storage
- [ ] Add image optimization
- [ ] Create preview functionality
- [ ] Add search and filters
- [ ] Test all CRUD operations
- [ ] Add loading states
- [ ] Add error handling
- [ ] Write admin user guide

---

## 🐛 Known Issues

1. **Leads dashboard error** - "Could not load leads: Your account needs a staff or admin role"
   - RLS policy might be too restrictive
   - Need to verify admin role check

2. **Media upload** - Not yet implemented
   - Need to set up Supabase Storage
   - Create upload handler

3. **Auth redirect** - Fixed, but test thoroughly
   - Admin should go to `/admin/projects`
   - Clients should go to `/portal`

---

## 📚 Resources

### Supabase:
- Dashboard: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp
- Storage docs: https://supabase.com/docs/guides/storage
- Auth docs: https://supabase.com/docs/guides/auth

### Libraries to Consider:
- **Rich Text Editor**: TipTap, Lexical, or Quill
- **File Upload**: react-dropzone
- **Image Optimization**: sharp or Supabase Image Transform
- **Forms**: React Hook Form
- **Notifications**: Sonner or react-hot-toast

---

**This is a comprehensive plan. Let's build it step by step!** 🚀
