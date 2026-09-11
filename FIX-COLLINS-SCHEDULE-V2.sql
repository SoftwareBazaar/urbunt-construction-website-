-- =====================================================
-- Fix Collins Project Schedule - Add Saturday Tasks (V2)
-- =====================================================
-- This version finds the Collins project automatically

-- First, let's find the Collins project ID
DO $$
DECLARE
  collins_project_id UUID;
BEGIN
  -- Find Collins project (adjust the LIKE pattern if needed)
  SELECT id INTO collins_project_id
  FROM client_projects
  WHERE title ILIKE '%collins%'
  LIMIT 1;

  IF collins_project_id IS NULL THEN
    RAISE EXCEPTION 'Collins project not found! Please check project name in client_projects table.';
  END IF;

  RAISE NOTICE 'Found Collins project ID: %', collins_project_id;

  -- Delete all existing tasks for this project
  DELETE FROM project_updates WHERE project_id = collins_project_id;
  
  RAISE NOTICE 'Deleted old tasks. Now inserting new schedule...';

  -- Insert the correct schedule with Saturdays included
  INSERT INTO project_updates (project_id, title, body, posted_at, status, published) VALUES

  -- Friday Sept 11
  (collins_project_id, 
   'Site mobilisation, clearance and preparation', 
   'Site establishment and accurate setting out of foundation grid using white wash marking.', 
   '2026-09-11'::date, 'completed', true),

  -- Saturday Sept 12
  (collins_project_id, 
   'Setting out of the building — grid lines and reference points', 
   'Setting out reinforced concrete column positions with precision. Grid line establishment.', 
   '2026-09-12'::date, 'scheduled', true),

  -- Monday Sept 14
  (collins_project_id, 
   'Excavation works; commencement of column and beam layout', 
   'Excavation of foundation trenches to specified depth. Installation of reinforcement bars.', 
   '2026-09-14'::date, 'scheduled', true),

  -- Tuesday Sept 15
  (collins_project_id, 
   'Column setting-out and fabrication of formwork', 
   'Creation and installation of column formwork using Grevillea timber.', 
   '2026-09-15'::date, 'scheduled', true),

  -- Wednesday Sept 16
  (collins_project_id, 
   'Foundation formwork installation begins', 
   'Foundation formwork assembly and installation begins. Placement of BRC mesh and DPM.', 
   '2026-09-16'::date, 'scheduled', true),

  -- Thursday Sept 17
  (collins_project_id, 
   'Casting of foundation columns and ground beams; formwork finishing', 
   'Casting of foundation columns and concrete beams. Formwork finishing work.', 
   '2026-09-17'::date, 'hold', true),

  -- Friday Sept 18
  (collins_project_id, 
   'Continued casting of foundation columns and beams', 
   'Continuation and completion of foundation column and beam casting.', 
   '2026-09-18'::date, 'scheduled', true),

  -- Saturday Sept 19
  (collins_project_id, 
   'Delivery and laying of precast slab panels', 
   'Positioning and laying of precast slabs over foundation structure.', 
   '2026-09-19'::date, 'scheduled', true),

  -- Monday Sept 21
  (collins_project_id, 
   'Casting of the ground floor slab', 
   'Casting of ground floor slab covering full 108 sq.m area with DPM protection.', 
   '2026-09-21'::date, 'scheduled', true),

  -- Tuesday Sept 22
  (collins_project_id, 
   'Raising of superstructure columns; formwork erection begins', 
   'Raising of ground floor columns to support roof structure. Formwork assembly begins.', 
   '2026-09-22'::date, 'scheduled', true),

  -- Wednesday Sept 23
  (collins_project_id, 
   'Continuation of superstructure formwork', 
   'Continuation of column formwork installation with precision carpentry.', 
   '2026-09-23'::date, 'scheduled', true),

  -- Thursday Sept 24
  (collins_project_id, 
   'Completion of superstructure formwork', 
   'Completion of all structural column and beam formwork. Final inspection ready.', 
   '2026-09-24'::date, 'scheduled', true),

  -- Friday Sept 25
  (collins_project_id, 
   'Casting of superstructure columns and beams', 
   'Casting of raised columns and structural beams with quality control.', 
   '2026-09-25'::date, 'hold', true),

  -- Saturday Sept 26
  (collins_project_id, 
   'First-floor formwork preparation; precast slab delivery to site', 
   'Formwork preparation for roof slab level. Precast slab positioning and quality checks.', 
   '2026-09-26'::date, 'scheduled', true),

  -- Monday Sept 28
  (collins_project_id, 
   'Installation of precast slab panels; casting of first-floor slab', 
   'Installation of final precast slab units. Roof slab casting over 108 sq.m with waterproofing.', 
   '2026-09-28'::date, 'scheduled', true);

  RAISE NOTICE '✅ Collins schedule updated successfully!';
  RAISE NOTICE '✅ Saturday tasks now included (Sept 12, 19, 26)';
  RAISE NOTICE '✅ Total tasks: 15 (including 3 Saturdays)';
  RAISE NOTICE '✅ Check admin and client portal to verify';

END $$;

-- Show the updated schedule
SELECT 
  cp.title as project_name,
  to_char(pu.posted_at, 'Day') as day_name,
  to_char(pu.posted_at, 'DD Mon') as date,
  pu.title as activity,
  pu.status
FROM project_updates pu
JOIN client_projects cp ON pu.project_id = cp.id
WHERE cp.title ILIKE '%collins%'
ORDER BY pu.posted_at;
