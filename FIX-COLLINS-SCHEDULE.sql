-- =====================================================
-- Fix Collins Project Schedule - Add Saturday Tasks
-- =====================================================
-- Run this to update existing tasks with correct dates and Saturdays

-- First, delete all existing tasks for Collins project
DELETE FROM project_updates 
WHERE project_id = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';

-- Now insert the correct schedule with Saturdays included
INSERT INTO project_updates (project_id, title, body, posted_at, status, published) VALUES

-- Friday Sept 11
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Site mobilisation, clearance and preparation', 
 'Site establishment and accurate setting out of foundation grid using white wash marking.', 
 '2026-09-11'::date, 'completed', true),

-- Saturday Sept 12
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Setting out of the building — grid lines and reference points', 
 'Setting out reinforced concrete column positions with precision. Grid line establishment.', 
 '2026-09-12'::date, 'scheduled', true),

-- Monday Sept 14
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Excavation works; commencement of column and beam layout', 
 'Excavation of foundation trenches to specified depth. Installation of reinforcement bars.', 
 '2026-09-14'::date, 'scheduled', true),

-- Tuesday Sept 15
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Column setting-out and fabrication of formwork', 
 'Creation and installation of column formwork using Grevillea timber.', 
 '2026-09-15'::date, 'scheduled', true),

-- Wednesday Sept 16
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Foundation formwork installation begins', 
 'Foundation formwork assembly and installation begins. Placement of BRC mesh and DPM.', 
 '2026-09-16'::date, 'scheduled', true),

-- Thursday Sept 17
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Casting of foundation columns and ground beams; formwork finishing', 
 'Casting of foundation columns and concrete beams. Formwork finishing work.', 
 '2026-09-17'::date, 'hold', true),

-- Friday Sept 18
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Continued casting of foundation columns and beams', 
 'Continuation and completion of foundation column and beam casting.', 
 '2026-09-18'::date, 'scheduled', true),

-- Saturday Sept 19
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Delivery and laying of precast slab panels', 
 'Positioning and laying of precast slabs over foundation structure.', 
 '2026-09-19'::date, 'scheduled', true),

-- Monday Sept 21
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Casting of the ground floor slab', 
 'Casting of ground floor slab covering full 108 sq.m area with DPM protection.', 
 '2026-09-21'::date, 'scheduled', true),

-- Tuesday Sept 22
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Raising of superstructure columns; formwork erection begins', 
 'Raising of ground floor columns to support roof structure. Formwork assembly begins.', 
 '2026-09-22'::date, 'scheduled', true),

-- Wednesday Sept 23
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Continuation of superstructure formwork', 
 'Continuation of column formwork installation with precision carpentry.', 
 '2026-09-23'::date, 'scheduled', true),

-- Thursday Sept 24
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Completion of superstructure formwork', 
 'Completion of all structural column and beam formwork. Final inspection ready.', 
 '2026-09-24'::date, 'scheduled', true),

-- Friday Sept 25
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Casting of superstructure columns and beams', 
 'Casting of raised columns and structural beams with quality control.', 
 '2026-09-25'::date, 'hold', true),

-- Saturday Sept 26
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'First-floor formwork preparation; precast slab delivery to site', 
 'Formwork preparation for roof slab level. Precast slab positioning and quality checks.', 
 '2026-09-26'::date, 'scheduled', true),

-- Monday Sept 28
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Installation of precast slab panels; casting of first-floor slab', 
 'Installation of final precast slab units. Roof slab casting over 108 sq.m with waterproofing.', 
 '2026-09-28'::date, 'scheduled', true);

-- Show results
SELECT 
  to_char(posted_at, 'Day') as day_name,
  to_char(posted_at, 'DD Mon') as date,
  title,
  status
FROM project_updates 
WHERE project_id = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'
ORDER BY posted_at;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Collins schedule updated!';
  RAISE NOTICE '✅ Saturday tasks now included (Sept 12, 19, 26)';
  RAISE NOTICE '✅ Total tasks: 15 (including 3 Saturdays)';
  RAISE NOTICE '✅ Check admin and client portal to verify';
END $$;
