# ⚠️ URGENT: Run This SQL First!

## The schedule table is empty because database fields are missing.

### Run This Now (1 minute):

1. **Go to Supabase SQL Editor:**
   https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/sql

2. **Copy and paste this:**

```sql
-- Add schedule manager fields to existing table
ALTER TABLE project_updates 
ADD COLUMN IF NOT EXISTS published boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'scheduled';

-- Update existing tasks to be published by default
UPDATE project_updates 
SET published = true 
WHERE published IS NULL;

UPDATE project_updates 
SET status = 'scheduled' 
WHERE status IS NULL;

-- Success message
SELECT 'Schedule fields added successfully!' as result;
```

3. **Click "Run"**

4. **Refresh the client portal** - tasks should appear!

---

## What This Does:

- Adds `published` field (controls client visibility)
- Adds `status` field (Scheduled, In Progress, Completed, etc.)
- Sets all existing tasks to published = true
- Sets all existing tasks to status = 'scheduled'

---

## After Running:

✅ Refresh `/portal` - Collins will see his 14 tasks in table format  
✅ Admin can toggle published on/off  
✅ Admin can change status  

**Run this SQL now and the schedule will work!** 🚀

