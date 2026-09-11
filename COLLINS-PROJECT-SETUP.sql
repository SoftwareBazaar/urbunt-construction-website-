-- =====================================================
-- Collins Njoroge Project Setup
-- =====================================================
-- Run this in Supabase SQL Editor to create the project

-- =====================================================
-- 1. CREATE CLIENT ACCOUNT (if not exists)
-- =====================================================
-- Client must first create account at /auth with email
-- Then run this to assign them client role:

-- INSERT INTO user_roles (user_id, role)
-- VALUES ('COLLINS_USER_ID_HERE', 'client');

-- =====================================================
-- 2. CREATE PROJECT
-- =====================================================

INSERT INTO client_projects (
  id,
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
  manager_phone,
  description
) VALUES (
  gen_random_uuid(),
  'COLLINS_USER_ID_HERE', -- Replace with actual user ID after client creates account
  'Collins First Home - Ground Floor & Boundary Wall',
  'residential',
  'LR No. MAKUYU/KIMORORI BLK. III/8090, Murang''a',
  'in_progress',
  'Substructure Works',
  5,
  NULL, -- Contract value removed per your request
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days', -- 3 months estimated
  'Urban T Project Manager',
  '+254 111 770 039',
  'Ground-floor family home with 2 bedrooms, study, lounge/dining, kitchen, pantry, bathroom, and lobby. 108 sq.m structural plate with foundations designed for future upper floor. Includes perimeter wall around both plots 8089 & 8090 and sliding driveway gate.'
);

-- Get the project ID (you'll need this for milestones)
-- SELECT id FROM client_projects WHERE title LIKE 'Collins First Home%';

-- =====================================================
-- 3. PROJECT MILESTONES
-- =====================================================

-- Replace 'PROJECT_ID_HERE' with the actual project ID from step 2

INSERT INTO project_milestones (project_id, name, description, planned_date, status, weight, display_order) VALUES

-- Milestone 1: Site Preparation & Setting Out (5%)
('PROJECT_ID_HERE', 'Site Preparation & Setting Out', 'Site establishment, temporary works, and accurate setting out of foundation grid', CURRENT_DATE + INTERVAL '2 days', 'in_progress', 5, 1),

-- Milestone 2: Foundation Works (15%)
('PROJECT_ID_HERE', 'Foundation Works Complete', 'Excavation, foundation trenches, reinforcement, and concrete foundation complete', CURRENT_DATE + INTERVAL '7 days', 'pending', 15, 2),

-- Milestone 3: Ground Floor Slab (15%)
('PROJECT_ID_HERE', 'Ground Floor Slab Casting', 'Foundation floor slab with DPM, BRC mesh, and concrete casting complete (108 sq.m)', CURRENT_DATE + INTERVAL '14 days', 'pending', 15, 3),

-- Milestone 4: Wall Panels & Columns (20%)
('PROJECT_ID_HERE', 'Wall Panels & Structural Columns', 'Installation of 124 wall panel units and reinforced concrete columns', CURRENT_DATE + INTERVAL '21 days', 'pending', 20, 4),

-- Milestone 5: Roof Slab (15%)
('PROJECT_ID_HERE', 'Roof Slab & Waterproofing', 'Precast slab installation (108 sq.m), casting, and waterproofing treatment', CURRENT_DATE + INTERVAL '28 days', 'pending', 15, 5),

-- Milestone 6: Doors & Windows (10%)
('PROJECT_ID_HERE', 'Doors & Metalwork Installation', 'Installation of main iron doors (3 units) and internal wooden doors (7 units)', CURRENT_DATE + INTERVAL '35 days', 'pending', 10, 6),

-- Milestone 7: Plumbing & Electrical (10%)
('PROJECT_ID_HERE', 'MEP First & Second Fix', 'Complete plumbing (sanitary, water supply, drainage) and electrical (wiring, fittings, distribution board)', CURRENT_DATE + INTERVAL '45 days', 'pending', 10, 7),

-- Milestone 8: Finishes (10%)
('PROJECT_ID_HERE', 'Interior & Exterior Finishes', 'Floor finishes, plastering, painting (internal & external), kitchen worktops, wardrobes', CURRENT_DATE + INTERVAL '60 days', 'pending', 10, 8),

-- Milestone 9: External Works & Boundary Wall (5%)
('PROJECT_ID_HERE', 'External Works & Perimeter Wall', 'Veranda, steps, drainage, paving, perimeter wall around plots 8089 & 8090, sliding gate', CURRENT_DATE + INTERVAL '75 days', 'pending', 5, 9),

-- Milestone 10: Final Inspection & Handover (5%)
('PROJECT_ID_HERE', 'Snagging & Handover', 'Final cleaning, defect rectification, project handover with warranty documentation', CURRENT_DATE + INTERVAL '90 days', 'pending', 5, 10);

-- =====================================================
-- 4. DETAILED WORK SCHEDULE (Daily Tasks)
-- =====================================================

-- Week 1: Foundation Works

INSERT INTO project_updates (project_id, title, body, created_at) VALUES

-- Saturday (Tomorrow)
('PROJECT_ID_HERE', 'Day 1: Site Setting Out', 
'Site establishment and accurate setting out of foundation grid using white wash marking. Verification of plot boundaries and structural grid alignment.', 
CURRENT_DATE),

-- Monday
('PROJECT_ID_HERE', 'Day 2: Excavation & Foundation Prep', 
'Excavation of foundation trenches. Installation of reinforcement bars (D12, D8, D10) for beams and columns. Preparation of formwork timber.', 
CURRENT_DATE + INTERVAL '2 days'),

-- Tuesday
('PROJECT_ID_HERE', 'Day 3: Column Setting & Formwork', 
'Setting out reinforced concrete column positions. Creation and installation of column formwork using Grevillea timber. Quality check of reinforcement placement.', 
CURRENT_DATE + INTERVAL '3 days'),

-- Wednesday
('PROJECT_ID_HERE', 'Day 4: Foundation Formwork Installation', 
'Foundation formwork assembly begins. Installation of BRC mesh and DPM/polythene sheeting. Final checks before concrete pour.', 
CURRENT_DATE + INTERVAL '4 days'),

-- Thursday
('PROJECT_ID_HERE', 'Day 5: Foundation Casting (Columns & Beams)', 
'Casting of foundation columns and concrete beams. Finishing of formwork. Concrete mixer operation and quality control. Curing process begins.', 
CURRENT_DATE + INTERVAL '5 days'),

-- Friday
('PROJECT_ID_HERE', 'Day 6: Foundation Beam Casting Complete', 
'Continuation of foundation column and beam casting. Ensuring proper concrete consolidation and curing. Quality inspection by site engineer.', 
CURRENT_DATE + INTERVAL '6 days'),

-- Saturday
('PROJECT_ID_HERE', 'Day 7: Precast Slab Preparation & Laying', 
'Positioning of precast slabs over foundation. Installation of timber props (probes + Grevillea 3x2) for support. Alignment verification.', 
CURRENT_DATE + INTERVAL '7 days'),

-- Week 2: Ground Floor Slab & Column Raising

-- Monday
('PROJECT_ID_HERE', 'Day 8: Ground Floor Slab Casting', 
'Casting of ground floor slab (108 sq.m). Concrete pouring and leveling. Installation of DPM under slab. Curing preparations.', 
CURRENT_DATE + INTERVAL '9 days'),

-- Tuesday
('PROJECT_ID_HERE', 'Day 9: Column Raising & Formwork Start', 
'Raising of ground floor columns. Installation of column reinforcement bars. Formwork assembly for elevated columns begins.', 
CURRENT_DATE + INTERVAL '10 days'),

-- Wednesday
('PROJECT_ID_HERE', 'Day 10: Column Formwork Continuation', 
'Continuation of column formwork installation. Quality checks on reinforcement placement. Preparation for beam formwork.', 
CURRENT_DATE + INTERVAL '11 days'),

-- Thursday
('PROJECT_ID_HERE', 'Day 11: Structural Formwork Completion', 
'Completion of all structural column formwork. Final inspection before concrete casting. Beam formwork installation complete.', 
CURRENT_DATE + INTERVAL '12 days'),

-- Friday
('PROJECT_ID_HERE', 'Day 12: Column & Beam Casting', 
'Casting of raised columns and structural beams. Concrete quality control and proper vibration. Curing process initiated.', 
CURRENT_DATE + INTERVAL '13 days'),

-- Saturday
('PROJECT_ID_HERE', 'Day 13: First Floor Formwork & Precast', 
'Formwork preparation for first floor level (future expansion). Positioning and laying of precast slabs for roof structure.', 
CURRENT_DATE + INTERVAL '14 days'),

-- Week 3: Roof Slab Completion

-- Monday
('PROJECT_ID_HERE', 'Day 14: Precast Installation & Slab Casting', 
'Installation of final precast slab units. Casting of roof slab (108 sq.m). Waterproofing preparation.', 
CURRENT_DATE + INTERVAL '16 days');

-- =====================================================
-- 5. INITIAL PROGRESS UPDATES
-- =====================================================

-- Add these after work actually starts
-- INSERT INTO project_updates (project_id, title, body, photo_url, created_at) VALUES
-- ('PROJECT_ID_HERE', 'Site Mobilization Complete', 'Site office established, tools procured, and setting out equipment delivered. Ready to commence foundation works.', NULL, NOW());

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Collins Project Setup Complete!';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Next Steps:';
  RAISE NOTICE '1. Client creates account at urbantconstruction.com/auth';
  RAISE NOTICE '2. Get client user ID from /admin/users';
  RAISE NOTICE '3. Replace COLLINS_USER_ID_HERE in this SQL';
  RAISE NOTICE '4. Replace PROJECT_ID_HERE in milestones section';
  RAISE NOTICE '5. Run this SQL file';
  RAISE NOTICE '6. Client can now login and view project at /portal';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Admin can add daily task completions at /admin/projects';
END $$;
