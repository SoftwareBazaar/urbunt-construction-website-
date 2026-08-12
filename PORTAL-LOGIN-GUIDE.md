# Portal Login System Guide

## Overview
Your Urban T Construction website has a **fully functional client portal login system** with role-based access control. Clients can track their projects, while staff can access the leads dashboard.

---

## 🔐 System Architecture

### Authentication Provider
- **Supabase Auth** - Secure email/password authentication
- **Project ID**: `pkbmflosqanfarwghzjp`
- **URL**: https://pkbmflosqanfarwghzjp.supabase.co

### Access Levels
1. **Client (user role)** → `/portal` - Track their projects with live updates
2. **Staff** → `/leads` - Access the lead dashboard
3. **Admin** → `/leads` - Full dashboard access

---

## 🚀 How to Access

### Client Portal
1. Navigate to: **`/auth`** or **`https://yourwebsite.com/auth`**
2. Click **"Sign in"** tab
3. Enter email and password
4. Access your project dashboard at `/portal`

### Creating New Accounts
1. Navigate to: **`/auth`**
2. Click **"Create account"** tab
3. Enter email and password (minimum 8 characters)
4. Verify email (Supabase sends verification email)
5. Sign in after verification

---

## 📊 Client Portal Features

### What Clients Can See:
✅ **Project Progress** - Real-time completion percentage  
✅ **Milestones** - Timeline with planned and actual dates  
✅ **Site Updates** - Weekly progress photos and notes  
✅ **Documents** - Contracts, BOQs, permits, and drawings  
✅ **Project Manager Contact** - Direct WhatsApp messaging  
✅ **Project Details** - Location, timeline, current stage  

### Project Data Structure:
Each client project includes:
- Title and location
- Project type (Residential/Commercial/Civil)
- Current stage and status
- Progress percentage
- Start and target completion dates
- Project manager details
- Contract value (optional)

---

## 🔧 Setting Up Test/Demo Accounts

### Step 1: Create User Accounts in Supabase

1. **Go to Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp
   - Navigate to **Authentication** → **Users**

2. **Add Test Users**:
   Click "Add user" and create:
   
   **Test Client Account:**
   - Email: `client@urbant.test` (or any email)
   - Password: `TestClient123!`
   - Auto Confirm User: ✅ (check this)

   **Test Staff Account:**
   - Email: `staff@urbant.test`
   - Password: `TestStaff123!`
   - Auto Confirm User: ✅

   **Test Admin Account:**
   - Email: `admin@urbant.test`
   - Password: `TestAdmin123!`
   - Auto Confirm User: ✅

### Step 2: Assign User Roles

1. **Go to SQL Editor** in Supabase Dashboard
2. Run this SQL to assign roles:

```sql
-- Get the user IDs (run this first to see the IDs)
SELECT id, email FROM auth.users;

-- Then assign roles (replace 'USER_ID_HERE' with actual UUIDs from above)
-- For staff account
INSERT INTO user_roles (user_id, role)
VALUES ('STAFF_USER_ID_HERE', 'staff');

-- For admin account
INSERT INTO user_roles (user_id, role)
VALUES ('ADMIN_USER_ID_HERE', 'admin');

-- Client accounts don't need a role entry (they default to 'user')
```

### Step 3: Create Sample Project for Test Client

Run this SQL in Supabase:

```sql
-- Get the client user ID first
SELECT id, email FROM auth.users WHERE email = 'client@urbant.test';

-- Create a sample project (replace USER_ID with the actual UUID)
INSERT INTO client_projects (
  client_user_id,
  title,
  project_type,
  location,
  status,
  current_stage,
  progress,
  contract_value,
  start_date,
  target_date,
  manager_name,
  manager_phone
) VALUES (
  'USER_ID_HERE',
  'Nairobi Residential Villa',
  'residential',
  'Karen, Nairobi',
  'in_progress',
  'Foundation & Structure',
  35,
  4200000,
  '2025-01-15',
  '2025-10-15',
  'John Kamau',
  '+254 111 770 039'
);

-- Get the project ID
SELECT id FROM client_projects WHERE title = 'Nairobi Residential Villa';

-- Add some milestones (replace PROJECT_ID with actual UUID)
INSERT INTO project_milestones (project_id, name, position, status, planned_date, actual_date, weight) VALUES
('PROJECT_ID', 'Design & Approvals', 1, 'complete', '2025-01-15', '2025-01-20', 10),
('PROJECT_ID', 'Foundation', 2, 'complete', '2025-02-01', '2025-02-05', 15),
('PROJECT_ID', 'Structural Work', 3, 'in_progress', '2025-03-01', NULL, 30),
('PROJECT_ID', 'Roofing', 4, 'pending', '2025-05-01', NULL, 15),
('PROJECT_ID', 'MEP Installation', 5, 'pending', '2025-06-15', NULL, 15),
('PROJECT_ID', 'Finishes', 6, 'pending', '2025-08-01', NULL, 10),
('PROJECT_ID', 'Handover', 7, 'pending', '2025-10-15', NULL, 5);

-- Add site updates
INSERT INTO project_updates (project_id, title, body, posted_at) VALUES
('PROJECT_ID', 'Foundation Complete', 'All foundation work completed ahead of schedule. Structural work begins next week.', '2025-02-05'),
('PROJECT_ID', 'Walls Going Up', 'Ground floor walls are 70% complete. Weather has been favorable.', '2025-03-10');

-- Add documents
INSERT INTO project_documents (project_id, name, doc_type, file_url) VALUES
('PROJECT_ID', 'Signed Contract', 'contract', 'https://example.com/contract.pdf'),
('PROJECT_ID', 'Approved Building Plans', 'plan', 'https://example.com/plans.pdf'),
('PROJECT_ID', 'Bill of Quantities', 'boq', 'https://example.com/boq.pdf');
```

---

## 🧪 Testing the Portal

### Test Client Login:
1. Go to `/auth`
2. Sign in with: `client@urbant.test` / `TestClient123!`
3. Should redirect to `/portal`
4. Should see the Nairobi Residential Villa project
5. Should see progress at 35%
6. Should see milestones, updates, and documents

### Test Staff Login:
1. Go to `/auth`
2. Sign in with: `staff@urbant.test` / `TestStaff123!`
3. Should redirect to `/leads` dashboard
4. Should see lead management interface

### Test Admin Login:
1. Go to `/auth`
2. Sign in with: `admin@urbant.test` / `TestAdmin123!`
3. Should redirect to `/leads` dashboard
4. Should have full access to all dashboard features

---

## 🔑 Production Setup

### For Real Clients:

1. **Create Account**:
   - Client visits `/auth`
   - Clicks "Create account"
   - Enters their email and password
   - Verifies email via Supabase

2. **Assign Project** (Admin Task):
   ```sql
   -- Get client's user ID
   SELECT id, email FROM auth.users WHERE email = 'client@email.com';
   
   -- Create their project
   INSERT INTO client_projects (
     client_user_id,
     title,
     project_type,
     location,
     ...
   ) VALUES (...);
   ```

3. **Client Can Now**:
   - Sign in at `/auth`
   - View their project(s)
   - Track progress in real-time
   - Message project manager via WhatsApp

---

## 📱 Email Configuration (Optional)

### Custom Email Templates:
In Supabase Dashboard → Authentication → Email Templates, you can customize:

- **Confirmation Email** - Sent when users sign up
- **Invitation Email** - For inviting clients directly
- **Password Reset** - When users forget password
- **Magic Link** - Alternative to password login

### Recommended Changes:
- Add your Urban T branding
- Include company contact information
- Customize the "From" name to "Urban T Construction"

---

## 🔒 Security Features

✅ **Row Level Security (RLS)** - Users can only see their own projects  
✅ **Email Verification** - Required before first login  
✅ **Password Requirements** - Minimum 8 characters  
✅ **Secure JWT Tokens** - Industry-standard authentication  
✅ **Role-Based Access** - Separate client and staff permissions  

---

## 🎯 Quick Reference URLs

- **Login Page**: `/auth`
- **Client Portal**: `/portal` (requires authentication)
- **Staff Dashboard**: `/leads` (requires staff/admin role)
- **Sign Out**: Available in portal header

---

## 💡 Adding Features

### Want to add more features? Here's what you can extend:

1. **File Uploads** - Let clients upload documents
2. **Comments** - Client-staff communication thread
3. **Payment Tracking** - Show payment schedules and receipts
4. **Change Orders** - Request and approve project changes
5. **Progress Photos** - Automated weekly photo uploads
6. **Mobile App** - Use Supabase with React Native

### Database Schema:
All tables are already created in `supabase-setup.sql`:
- `client_projects` - Main project data
- `project_milestones` - Timeline tracking
- `project_updates` - Progress posts
- `project_documents` - File references
- `user_roles` - Access control

---

## 🆘 Troubleshooting

### "Session not found" Error:
- Clear browser cookies
- Sign out and sign in again
- Check if user is verified in Supabase

### "No projects found":
- Ensure project's `client_user_id` matches the user's auth ID
- Check RLS policies are enabled
- Verify user is signed in

### Can't Access Leads Dashboard:
- Check user has `staff` or `admin` role in `user_roles` table
- Verify role was inserted correctly with user's UUID

### Email Not Sending:
- Check Supabase email configuration
- Verify project has email sending enabled
- Consider using custom SMTP in production

---

## 📧 Support

For technical issues:
- Check Supabase Dashboard logs
- Review browser console for errors
- Verify environment variables in `.env`

**Supabase Project**: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp

---

**Your portal login system is fully functional and ready to use!** 🎉
