-- =====================================================
-- Collins Project Setup
-- =====================================================
-- PREREQUISITE: Create Collins' account first in Supabase Auth
-- 
-- 1. Go to: https://supabase.com/dashboard/project/pkbmflosqanfarwghzjp/auth/users
-- 2. Click "Add User"
-- 3. Email: collinsmucheru@gmail.com
-- 4. Password: UrbanT2026! (or your choice)
-- 5. Check "Auto Confirm User"
-- 6. Click "Create User"
-- 7. Copy the User ID that appears
-- 8. Replace 'YOUR_COLLINS_USER_ID' below with that ID
-- 9. Run this entire file
--
-- =====================================================

-- =====================================================
-- CONFIGURATION: SET COLLINS' USER ID HERE
-- =====================================================
-- Replace this with the actual UUID from Step 1
-- Example: '550e8400-e29b-41d4-a716-446655440000'

DO $$
DECLARE
  collins_uid uuid := 'YOUR_COLLINS_USER_ID'::uuid;  -- ⚠️ REPLACE THIS!
  collins_project_id uuid;
BEGIN

-- =====================================================
-- Create Project
-- =====================================================

INSERT INTO client_projects (
  client_user_id,
  title,
  project_type,
  location,
  status,
  current_stage,
  progress,
  start_date,
  target_date,
  manager_name,
  manager_phone
) VALUES (
  collins_uid,
  'Collins First Home - Ground Floor & Boundary Wall',
  'residential',
  'LR No. MAKUYU/KIMORORI BLK. III/8090, Murang''a',
  'in_progress',
  'Site Preparation',
  0,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days',
  'Urban T Project Manager',
  '+254 111 770 039'
)
RETURNING id INTO collins_project_id;

RAISE NOTICE 'Project created with ID: %', collins_project_id;

-- =====================================================
-- Create 10 Milestones
-- =====================================================

INSERT INTO project_milestones (project_id, name, notes, planned_date, status, weight, position) VALUES
(collins_project_id, 'Site Preparation & Setting Out', 'Site establishment, temporary works, and accurate setting out of foundation grid', CURRENT_DATE + INTERVAL '2 days', 'in_progress', 5, 1),
(collins_project_id, 'Foundation Works Complete', 'Excavation, foundation trenches, reinforcement, and concrete foundation complete', CURRENT_DATE + INTERVAL '7 days', 'pending', 15, 2),
(collins_project_id, 'Ground Floor Slab Casting', 'Foundation floor slab with DPM, BRC mesh, and concrete casting complete (108 sq.m)', CURRENT_DATE + INTERVAL '14 days', 'pending', 15, 3),
(collins_project_id, 'Wall Panels & Structural Columns', 'Installation of 124 wall panel units and reinforced concrete columns', CURRENT_DATE + INTERVAL '21 days', 'pending', 20, 4),
(collins_project_id, 'Roof Slab & Waterproofing', 'Precast slab installation (108 sq.m), casting, and waterproofing treatment', CURRENT_DATE + INTERVAL '28 days', 'pending', 15, 5),
(collins_project_id, 'Doors & Metalwork Installation', 'Installation of main iron doors (3 units) and internal wooden doors (7 units)', CURRENT_DATE + INTERVAL '35 days', 'pending', 10, 6),
(collins_project_id, 'MEP First & Second Fix', 'Complete plumbing (sanitary, water supply, drainage) and electrical (wiring, fittings, distribution board)', CURRENT_DATE + INTERVAL '45 days', 'pending', 10, 7),
(collins_project_id, 'Interior & Exterior Finishes', 'Floor finishes, plastering, painting (internal & external), kitchen worktops, wardrobes', CURRENT_DATE + INTERVAL '60 days', 'pending', 10, 8),
(collins_project_id, 'External Works & Perimeter Wall', 'Veranda, steps, drainage, paving, perimeter wall around plots 8089 & 8090, sliding gate', CURRENT_DATE + INTERVAL '75 days', 'pending', 5, 9),
(collins_project_id, 'Snagging & Handover', 'Final cleaning, defect rectification, project handover with warranty documentation', CURRENT_DATE + INTERVAL '90 days', 'pending', 5, 10);

RAISE NOTICE '10 milestones created';

-- =====================================================
-- Create 14 Daily Work Updates
-- =====================================================

INSERT INTO project_updates (project_id, title, body, posted_at) VALUES
(collins_project_id, 'Day 1: Site Setting Out', 'Site establishment and accurate setting out of foundation grid using white wash marking. Verification of plot boundaries (LR No. MAKUYU/KIMORORI BLK. III/8090) and structural grid alignment. Site office setup with tools and equipment.', CURRENT_DATE),
(collins_project_id, 'Day 2: Excavation & Foundation Preparation', 'Excavation of foundation trenches to specified depth. Installation of reinforcement bars (D12, D8, D10) for foundation beams and columns. Preparation of formwork timber (Grevillea). Quality check of excavation levels and alignment.', CURRENT_DATE + INTERVAL '2 days'),
(collins_project_id, 'Day 3: Column Setting & Formwork Creation', 'Setting out reinforced concrete column positions with precision. Creation and installation of column formwork using Grevillea timber. Quality inspection of reinforcement placement and spacing. Preparation for foundation concrete works.', CURRENT_DATE + INTERVAL '3 days'),
(collins_project_id, 'Day 4: Foundation Formwork Installation', 'Foundation formwork assembly and installation begins. Placement of BRC mesh and DPM (damp-proof membrane)/polythene sheeting. Final inspection and verification before concrete pour. Concrete mixer mobilization on site.', CURRENT_DATE + INTERVAL '4 days'),
(collins_project_id, 'Day 5: Foundation Casting (Columns & Beams)', 'Casting of foundation columns and concrete beams. Finishing of formwork to ensure smooth surfaces. Concrete mixer operation with quality control of mix ratios. Proper compaction and vibration of concrete. Curing process initiated.', CURRENT_DATE + INTERVAL '5 days'),
(collins_project_id, 'Day 6: Foundation Casting Completion', 'Continuation and completion of foundation column and beam casting. Ensuring proper concrete consolidation and quality. Regular water curing to achieve design strength. Quality inspection by site engineer. Progress documentation.', CURRENT_DATE + INTERVAL '6 days'),
(collins_project_id, 'Day 7: Precast Slab Preparation & Laying', 'Positioning and laying of precast slabs over foundation structure. Installation of timber props (probes + Grevillea 3x2) for adequate support. Alignment verification and leveling. Preparation for ground floor slab works.', CURRENT_DATE + INTERVAL '7 days'),
(collins_project_id, 'Day 8: Ground Floor Slab Casting', 'Casting of ground floor slab covering full 108 sq.m area. Concrete pouring, spreading, and professional leveling. Installation of DPM under slab for moisture protection. Proper screeding and finishing. Curing preparations with water spray.', CURRENT_DATE + INTERVAL '9 days'),
(collins_project_id, 'Day 9: Column Raising & Formwork Commencement', 'Raising of ground floor columns to support roof structure. Installation of column reinforcement bars (D12, D10). Formwork assembly for elevated columns begins. Quality checks on reinforcement placement and column alignment.', CURRENT_DATE + INTERVAL '10 days'),
(collins_project_id, 'Day 10: Column Formwork Continuation', 'Continuation of column formwork installation with precision carpentry. Quality inspections on reinforcement positioning and spacing. Preparation for structural beam formwork. Ensuring vertical alignment of all columns.', CURRENT_DATE + INTERVAL '11 days'),
(collins_project_id, 'Day 11: Structural Formwork Completion', 'Completion of all structural column and beam formwork. Final inspection before concrete casting operations. Beam formwork installation complete with proper support. Quality assurance checks by site engineer.', CURRENT_DATE + INTERVAL '12 days'),
(collins_project_id, 'Day 12: Structural Column & Beam Casting', 'Casting of raised columns and structural beams. Concrete quality control with proper mix ratios. Adequate vibration and compaction for structural integrity. Curing process initiated. Safety measures in place during casting.', CURRENT_DATE + INTERVAL '13 days'),
(collins_project_id, 'Day 13: Roof Level Formwork & Precast Preparation', 'Formwork preparation for roof slab level (with provisions for future first floor expansion). Positioning and laying of precast slabs for roof structure. Quality checks on precast slab alignment. Preparation for roof slab casting.', CURRENT_DATE + INTERVAL '14 days'),
(collins_project_id, 'Day 14: Roof Slab Casting & Installation', 'Installation of final precast slab units for complete roof coverage. Casting of roof slab over 108 sq.m area. Waterproofing preparation and membrane application. Quality control of concrete mix and finish. Curing regime established for optimal strength gain.', CURRENT_DATE + INTERVAL '16 days');

RAISE NOTICE '14 daily updates created';

-- =====================================================
-- Success Message
-- =====================================================

RAISE NOTICE '';
RAISE NOTICE '════════════════════════════════════════════════';
RAISE NOTICE '✅  Collins Project Setup Complete!';
RAISE NOTICE '════════════════════════════════════════════════';
RAISE NOTICE '';
RAISE NOTICE 'Project ID: %', collins_project_id;
RAISE NOTICE 'User ID: %', collins_uid;
RAISE NOTICE '';
RAISE NOTICE '✅ Created:';
RAISE NOTICE '   • 1 Project (Collins First Home)';
RAISE NOTICE '   • 10 Milestones (weighted 5-20%%)';
RAISE NOTICE '   • 14 Daily work updates';
RAISE NOTICE '';
RAISE NOTICE '📧 Send to Collins (collinsmucheru@gmail.com):';
RAISE NOTICE '   Login: https://urbantconstruction.com/auth';
RAISE NOTICE '   Email: collinsmucheru@gmail.com';
RAISE NOTICE '   Password: [whatever you set in Step 1]';
RAISE NOTICE '';
RAISE NOTICE '🎯 View in admin:';
RAISE NOTICE '   https://urbantconstruction.com/admin/projects';
RAISE NOTICE '';
RAISE NOTICE '🚀 Ready to track 90-day construction!';
RAISE NOTICE '';

END $$;
