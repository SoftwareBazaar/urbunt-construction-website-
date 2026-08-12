# Admin Dashboard Guide

## 🎉 Your Admin Dashboard is Ready!

You now have a **complete project management system** where you can manage all client projects without writing any SQL.

---

## 🚀 How to Access

### Step 1: Create an Admin Account

1. **Go to Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp
   - Navigate to **Authentication** → **Users**

2. **Add Your Admin Account**:
   - Click "Add user"
   - Email: `your-email@urbant.com` (use your real email)
   - Password: Create a strong password
   - Check **"Auto Confirm User"** ✅
   - Click "Create user"

3. **Get Your User ID**:
   - After creating, click on the user
   - Copy the **User ID** (UUID like: a1b2c3d4-e5f6...)

4. **Grant Admin Role**:
   - Go to **SQL Editor**
   - Run this (replace with your actual User ID):
   
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('YOUR_USER_ID_HERE', 'admin');
   ```

### Step 2: Login

1. Go to: `/auth` on your website
2. Sign in with your admin email and password
3. You'll be redirected to `/admin` (Admin Dashboard)

---

## 📊 Admin Dashboard Features

### Main Dashboard
When you log in, you'll see:
- ✅ **All Client Projects** - List of every active project
- ✅ **Project Cards** - Each showing progress, status, and details
- ✅ **Quick Actions** - Add projects, milestones, updates

### Navigation
- **Project Management** (current page) - Manage all projects
- **Leads** - View quote requests and applications
- **View Site** - Go to public website
- **Sign Out** - Logout

---

## 🏗️ Managing Projects

### Creating a New Project

1. Click **"Add Project"** button
2. Fill in the form:

   **Required:**
   - **Client Email** - Select from dropdown (client must have account first)
   - **Project Title** - e.g., "Karen Family Home"
   
   **Project Details:**
   - **Project Type** - Residential / Commercial / Civil
   - **Location** - e.g., "Karen, Nairobi"
   - **Status** - Planning / In Progress / Completed / On Hold
   - **Current Stage** - e.g., "Foundation", "Roofing"
   - **Progress (%)** - 0-100%
   
   **Timeline:**
   - **Start Date** - When project began
   - **Target Completion** - Expected handover date
   
   **Project Manager:**
   - **Manager Name** - e.g., "James Mwangi"
   - **Manager Phone** - e.g., "+254 111 770 039"

3. Click **"Create Project"**

✅ **Project created! Client can now see it in their portal.**

### Editing a Project

1. Click the **Edit icon** (pencil) on any project card
2. Update any fields
3. Click **"Update Project"**

### Deleting a Project

1. Click the **Delete icon** (trash can) on project card
2. Confirm deletion
3. **Warning:** This deletes the project and all milestones, updates, and documents

---

## 📍 Adding Milestones

Milestones show clients the project timeline and progress checkpoints.

### How to Add:

1. On any project card, click **"+ Add Milestone"**
2. Fill in:
   - **Milestone Name** - e.g., "Foundation Complete"
   - **Planned Date** - When you expect to reach this milestone
   - **Status** - Pending / In Progress / Complete
   - **Weight (%)** - How much of the contract this represents (e.g., 15%)
   - **Notes** - Optional details

3. Click **"Add Milestone"**

### Example Milestones for a House:

```
1. Design & Approvals - 10% - Complete
2. Foundation - 15% - Complete  
3. Structural Work - 30% - In Progress
4. Roofing - 15% - Pending
5. MEP Installation - 15% - Pending
6. Finishes - 10% - Pending
7. Handover - 5% - Pending
```

✅ **Clients see these in their portal with dates and status!**

---

## 📸 Adding Progress Updates

Progress updates let clients see what's happening on-site with photos and notes.

### How to Add:

1. On any project card, click **"+ Add Progress Update"**
2. Fill in:
   - **Update Title** - e.g., "Walls Complete"
   - **Description** - Progress details, what was done
   - **Photo URL** - (Optional) Link to progress photo

3. Click **"Add Update"**

### About Photos:

For now, you need to:
1. Upload photo to Supabase Storage first:
   - Go to Supabase Dashboard → **Storage**
   - Create a bucket called `project-photos`
   - Upload image
   - Copy the public URL

2. Paste URL in the "Photo URL" field

**Future Enhancement:** We can add direct file upload later!

✅ **Client sees update with photo in their portal timeline**

---

## 📄 Managing Documents

Documents aren't directly managed in this interface yet. To add documents:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run this query:

```sql
-- Get the project ID first
SELECT id, title FROM client_projects WHERE title = 'Your Project Name';

-- Add document (replace PROJECT_ID)
INSERT INTO project_documents (project_id, name, doc_type, file_url) VALUES
('PROJECT_ID', 'Signed Contract', 'contract', 'https://your-file-url.pdf');
```

**Document Types:**
- `contract` - Signed contracts
- `plan` - Building plans and drawings
- `boq` - Bill of Quantities
- `permit` - Approvals and permits
- `other` - Other documents

**Future Enhancement:** We can add document upload interface!

---

## 👥 Managing Clients

### How Clients Get Access:

1. **Client Creates Account**:
   - Client goes to `/auth`
   - Clicks "Create account"
   - Enters email and password
   - Verifies email

2. **You Assign Project**:
   - Login to admin dashboard
   - Click "Add Project"
   - Select client's email from dropdown
   - Fill in project details
   - Save

3. **Client Can Now Track**:
   - Client logs in
   - Sees their project
   - Views progress, milestones, updates

### If Client Email Not in Dropdown:

The client needs to create an account first at `/auth`. Once they verify their email, they'll appear in the dropdown.

---

## 🔐 Access Levels

### Admin (You)
- ✅ Create, edit, delete projects
- ✅ Add milestones and updates
- ✅ View all client projects
- ✅ Access leads dashboard
- ✅ Full system access

### Staff
- ✅ Same as admin
- Can be assigned to specific project managers

### Client (User)
- ✅ View their own projects only
- ✅ See progress and milestones
- ✅ View updates and photos
- ✅ Access documents
- ❌ Cannot edit anything
- ❌ Cannot see other clients' projects

---

## 💡 Typical Workflow

### When You Sign a New Client:

**Day 1: Contract Signed**
1. Ask client to create account at `yourwebsite.com/auth`
2. Client creates account and verifies email
3. You log into admin dashboard
4. Click "Add Project"
5. Select client email, fill in details
6. Set status to "Planning"
7. Add initial milestones (Design, Foundation, Structure, etc.)

**Week 1: Project Starts**
1. Update project status to "In Progress"
2. Update current stage to "Site Preparation"
3. Update progress to 5%

**Weekly Updates:**
1. Click "+ Add Progress Update"
2. Add title like "Week 3 Progress"
3. Describe what was accomplished
4. Add photo URL
5. Update progress percentage
6. Update milestone status if any completed

**Client Experience:**
- Client logs in anytime
- Sees real-time progress
- Views weekly photos
- Checks milestone dates
- Messages project manager via WhatsApp

---

## 🎯 Quick Reference

### URLs:
- **Admin Dashboard**: `/admin`
- **Leads Dashboard**: `/leads`
- **Client Portal**: `/portal`
- **Login Page**: `/auth`

### Keyboard Shortcuts:
- None yet (can add if needed)

### Common Tasks:
| Task | Steps |
|------|-------|
| Add new project | Admin → Add Project → Fill form → Save |
| Update progress | Admin → Edit project → Change progress % → Update |
| Add milestone | Admin → Project card → + Add Milestone → Fill → Save |
| Add photo update | Admin → Project card → + Add Progress Update → Save |
| View as client | Login as client → See in `/portal` |

---

## 🆘 Troubleshooting

### "Client email not in dropdown"
**Solution:** Client needs to create account at `/auth` first. Once verified, they'll appear.

### "Cannot access admin dashboard"
**Solution:** Check you have admin role:
```sql
SELECT * FROM user_roles WHERE user_id = 'YOUR_USER_ID';
```
Should show role = 'admin' or 'staff'

### "Project not showing for client"
**Solution:** 
1. Check `client_user_id` matches client's user ID
2. Check client is logged in
3. Check RLS policies are enabled

### "Cannot upload photos directly"
**Solution:** For now, upload to Supabase Storage first, then paste URL. We can add direct upload later!

### "Changes not saving"
**Solution:**
1. Check browser console for errors
2. Verify Supabase connection
3. Check you have admin privileges

---

## 🚀 Future Enhancements

Want to add these features? Let me know:

- [ ] Direct photo upload (no external URL needed)
- [ ] Document upload interface
- [ ] Email notifications to clients
- [ ] Export project reports
- [ ] Team member assignment
- [ ] Client messaging system
- [ ] Payment tracking
- [ ] Calendar view of milestones
- [ ] Mobile app
- [ ] Bulk operations

---

## 📧 Admin Support

**Supabase Dashboard**: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp

**Need Help?**
- Check browser console for errors
- Review Supabase logs
- Verify environment variables

---

**Your admin dashboard is live and ready to manage projects!** 🎉

**Next Steps:**
1. Create your admin account (instructions above)
2. Login and explore the dashboard
3. Create a test project
4. Try adding milestones and updates
5. View as a client to see their experience

