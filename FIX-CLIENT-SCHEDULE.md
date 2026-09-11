# 🔧 Fix Client Schedule - Run This SQL

## Problem:
Client portal shows "No published tasks yet" even though tasks exist in admin.

## Solution:
The database needs the `published` and `status` fields added to existing tasks.

---

## ⚡ Quick Fix (1 minute):

### 1. Open Supabase SQL Editor:
https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/sql

### 2. Copy & Run This SQL:

```sql
-- Add schedule manager fields
ALTER TABLE project_updates 
ADD COLUMN IF NOT EXISTS published boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'scheduled';

-- Make all existing tasks visible to clients
UPDATE project_updates 
SET published = true 
WHERE published IS NULL OR published = false;

-- Set default status for existing tasks
UPDATE project_updates 
SET status = 'scheduled' 
WHERE status IS NULL;

-- Verify it worked
SELECT 
  COUNT(*) as total_tasks,
  COUNT(*) FILTER (WHERE published = true) as published_tasks
FROM project_updates;
```

### 3. Refresh Client Portal:
- Go to: https://urbantconstruction.com/portal
- Login as Collins
- **Should now see the schedule table!**

---

## ✅ What This Does:

1. **Adds `published` field** - Controls which tasks clients can see
2. **Adds `status` field** - Scheduled, In Progress, Completed, etc.
3. **Makes all tasks published** - So Collins can see them immediately
4. **Sets default status** - All tasks start as "Scheduled"

---

## 🎯 After Running SQL:

### Client View Will Show:
```
DAY        DATE      ACTIVITY                                          STATUS
Friday     11 Sept   Day 1: Site Setting Out                          Scheduled
Saturday   12 Sept   Day 2: Excavation & Foundation Preparation       Scheduled
Monday     14 Sept   Day 3: Column Setting & Formwork Creation        Scheduled
...
```

### Admin Can:
- ✅ Toggle published on/off per task
- ✅ Change status with dropdown
- ✅ Delete tasks
- ✅ See count: "14 of 14 tasks published to client view"

---

## 🔄 Status:

**Current:** Database missing fields → Client sees nothing  
**After SQL:** Database has fields → Client sees beautiful schedule table!

---

**Run the SQL now and refresh the portal!** 🚀

