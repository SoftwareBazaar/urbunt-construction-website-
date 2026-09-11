# 📋 Collins Njoroge Project Setup Guide

## Client Information
- **Name:** Collins Njoroge (Mucheru)
- **Project:** Collins First Home - Ground Floor & Boundary Wall
- **Plot:** LR No. MAKUYU/KIMORORI BLK. III/8090
- **Location:** Murang'a, Kenya
- **Project Type:** Residential - 108 sq.m ground floor with future upper floor capacity

---

## 🎯 Setup Steps (Follow in Order)

### Step 1: Client Creates Account (5 minutes)

1. **Share this link with Collins:**
   ```
   https://urbantconstruction.com/auth
   ```

2. **Collins should:**
   - Click "Sign Up"
   - Enter his email address
   - Create a password
   - Click "Create Account"

3. **Get Collins' email address** (e.g., `collins.njoroge@gmail.com`)

---

### Step 2: Get Client User ID (2 minutes)

1. **Login to admin:**
   - Go to: `https://urbantconstruction.com/admin/users`

2. **Find Collins in the user list:**
   - Look for his email address
   - Note down his **User ID** (looks like: `550e8400-e29b-41d4-a716-446655440000`)

3. **Keep this ID** - you'll need it for Step 3

---

### Step 3: Run Project Setup SQL (5 minutes)

1. **Open the SQL file:**
   - Open `COLLINS-PROJECT-SETUP.sql` in your editor

2. **Replace placeholders:**
   - Find: `COLLINS_USER_ID_HERE`
   - Replace with: Collins' actual user ID from Step 2
   - Do this in **2 places** (user_roles and client_projects sections)

3. **Go to Supabase SQL Editor:**
   - https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/sql

4. **Copy and paste the EDITED SQL file**

5. **Click "Run"**

6. **Copy the project ID** from the results

7. **Go back to SQL file and:**
   - Find all instances of: `PROJECT_ID_HERE`
   - Replace with: the actual project ID
   - Run the SQL again

---

### Step 4: Verify Setup (2 minutes)

1. **Check admin panel:**
   - Go to: `https://urbantconstruction.com/admin/projects`
   - You should see "Collins First Home" project

2. **Ask Collins to login:**
   - Go to: `https://urbantconstruction.com/portal`
   - Login with his credentials
   - He should see his project with:
     * Project details
     * 10 milestones
     * Work schedule
     * Progress updates

---

## 📅 Project Schedule Overview

### **Phase 1: Foundation Works (Week 1)**

| Day | Date | Task |
|-----|------|------|
| **Saturday** | Tomorrow | Site setting out and marking |
| **Monday** | +2 days | Excavation, beam & column reinforcement |
| **Tuesday** | +3 days | Column setting & formwork creation |
| **Wednesday** | +4 days | Foundation formwork installation |
| **Thursday** | +5 days | Casting of foundation columns & beams |
| **Friday** | +6 days | Foundation casting completion |
| **Saturday** | +7 days | Precast slab preparation & laying |

### **Phase 2: Ground Floor Slab (Week 2)**

| Day | Date | Task |
|-----|------|------|
| **Monday** | +9 days | Ground floor slab casting |
| **Tuesday** | +10 days | Column raising & formwork start |
| **Wednesday** | +11 days | Formwork continuation |
| **Thursday** | +12 days | Structural formwork completion |
| **Friday** | +13 days | Column & beam casting |
| **Saturday** | +14 days | First floor formwork & precast |

### **Phase 3: Roof Slab (Week 3)**

| Day | Date | Task |
|-----|------|------|
| **Monday** | +16 days | Precast installation & slab casting |

---

## 🎯 Project Milestones (10 Total)

| # | Milestone | Weight | Target Date |
|---|-----------|--------|-------------|
| 1 | Site Preparation & Setting Out | 5% | +2 days |
| 2 | Foundation Works Complete | 15% | +7 days |
| 3 | Ground Floor Slab Casting | 15% | +14 days |
| 4 | Wall Panels & Structural Columns | 20% | +21 days |
| 5 | Roof Slab & Waterproofing | 15% | +28 days |
| 6 | Doors & Metalwork Installation | 10% | +35 days |
| 7 | MEP First & Second Fix | 10% | +45 days |
| 8 | Interior & Exterior Finishes | 10% | +60 days |
| 9 | External Works & Perimeter Wall | 5% | +75 days |
| 10 | Snagging & Handover | 5% | +90 days |

**Total Duration:** ~90 days (3 months)

---

## 📝 How to Update Progress (Admin)

### Option A: Mark Milestone Complete

1. Go to: `/admin/projects`
2. Find Collins' project
3. Click "Add Milestone" if needed
4. Update milestone status to "Complete"
5. Collins sees it instantly on his portal

### Option B: Add Daily Progress Update

1. Go to: `/admin/projects`
2. Find Collins' project
3. Click "Add Progress Update"
4. Enter:
   - **Title:** "Day 1: Site Setting Out Complete"
   - **Description:** "Foundation grid marked, boundaries verified, ready for excavation"
   - **Photo URL:** (optional - upload to `/admin/media` first)
5. Click "Save"
6. Collins sees it on his portal

---

## 🖼️ Adding Progress Photos

1. **Upload photo:**
   - Go to: `/admin/media`
   - Select folder: "Projects"
   - Upload construction photo
   - Copy the public URL

2. **Add to progress update:**
   - Use the URL in "Photo URL" field
   - Photo appears on client portal

---

## 👁️ What Collins Will See on His Portal

### Project Dashboard
```
Collins First Home - Ground Floor & Boundary Wall
Location: Murang'a, Kenya
Status: In Progress
Current Stage: Substructure Works
Progress: 5% Complete
Target Completion: [90 days from start]
```

### Milestones Section
```
✓ Milestone 1: Site Preparation & Setting Out (5%) - Complete
⏳ Milestone 2: Foundation Works Complete (15%) - In Progress
⏸️ Milestone 3: Ground Floor Slab Casting (15%) - Pending
...
```

### Progress Updates (Timeline)
```
📅 Day 1: Site Setting Out Complete
   Foundation grid marked, boundaries verified, ready for excavation
   [Photo if added]

📅 Day 2: Excavation & Foundation Prep
   Excavation of foundation trenches...
   [Photo if added]
```

---

## 🔔 Client Portal Features

Collins can:
- ✅ View project details and location
- ✅ See overall progress percentage
- ✅ Track milestones (completed, in progress, pending)
- ✅ View daily work schedule
- ✅ See progress photos
- ✅ Read detailed task descriptions
- ✅ Monitor target completion date
- ✅ Access project anytime from phone/computer

---

## 🛠️ Admin Features

You can:
- ✅ Create and assign projects to clients
- ✅ Add/edit milestones with weights
- ✅ Post daily progress updates with photos
- ✅ Update project status and current stage
- ✅ Track overall completion percentage
- ✅ Set target dates for milestones
- ✅ Upload construction photos to media library

---

## 📧 Sample Message to Send Collins

```
Hi Collins,

Your project "Collins First Home" is now set up on our client portal!

You can track your project progress 24/7 at:
https://urbantconstruction.com/portal

Login Details:
- Email: [Your email address]
- Password: [Password you created]

On the portal you'll see:
✓ Overall project progress
✓ Milestone tracking
✓ Daily work schedule
✓ Progress photos
✓ Target completion dates

We'll update your project daily as work progresses. You'll see photos and detailed descriptions of each day's work.

Site work begins tomorrow (Saturday) with setting out!

Best regards,
Urban T Construction Co.
+254 111 770 039
```

---

## 🚨 Troubleshooting

**Collins can't see his project?**
- Check he's logged in with the correct email
- Verify project is assigned to his user ID
- Check project status is not "archived"

**Milestones not showing?**
- Verify PROJECT_ID_HERE was replaced correctly in SQL
- Check project_milestones table has entries

**Photos not displaying?**
- Ensure media bucket "media" is public
- Check photo URL is correct and accessible

---

## ✅ Checklist

- [ ] Collins creates account at /auth
- [ ] Get Collins' user ID from /admin/users
- [ ] Edit COLLINS-PROJECT-SETUP.sql with user ID
- [ ] Run SQL in Supabase SQL Editor
- [ ] Get project ID from results
- [ ] Replace PROJECT_ID_HERE in SQL
- [ ] Run SQL again for milestones
- [ ] Verify project shows in /admin/projects
- [ ] Test: Collins logs in at /portal
- [ ] Confirm Collins can see project details
- [ ] Add first progress update with photo
- [ ] Send Collins welcome message

---

## 🎉 You're Done!

Collins can now track his project in real-time. Update his portal daily with progress photos and task completions to build trust and transparency! 🏗️
