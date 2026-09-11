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
