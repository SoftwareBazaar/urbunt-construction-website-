-- =====================================================
-- Add Schedule Manager Fields
-- =====================================================
-- Run this in Supabase SQL Editor to add fields for
-- the schedule manager functionality

-- Add 'published' and 'status' fields to project_updates
ALTER TABLE project_updates 
ADD COLUMN IF NOT EXISTS published boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'scheduled';

-- Add comment for status field values
COMMENT ON COLUMN project_updates.status IS 'Values: scheduled, progress, completed, hold, delayed';

-- Update existing tasks to be published by default
UPDATE project_updates SET published = true WHERE published IS NULL;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Schedule manager fields added successfully!';
  RAISE NOTICE '   - Added "published" field (boolean)';
  RAISE NOTICE '   - Added "status" field (text)';
  RAISE NOTICE '   - Existing tasks marked as published';
END $$;
