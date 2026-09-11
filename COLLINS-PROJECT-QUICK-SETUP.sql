-- =====================================================
-- Collins Njoroge Project - Quick Setup (No Client Account Needed Yet)
-- =====================================================
-- Run this in Supabase SQL Editor to create the project immediately
-- Client can be assigned later when they create their account

-- =====================================================
-- 1. CREATE PROJECT (Unassigned for now)
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
  start_date,
  target_date,
  manager_name,
  manager_phone
) VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', -- Fixed project ID for easy reference
  NULL, -- No client assigned yet - will assign later
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
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  location = EXCLUDED.location;

-- =====================================================
-- 2. PROJECT MILESTONES
-- =====================================================

INSERT INTO project_milestones (project_id, name, notes, planned_date, status, weight, position) VALUES

-- Milestone 1: Site Preparation & Setting Out (5%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Site Preparation & Setting Out', 
 'Site establishment, temporary works, and accurate setting out of foundation grid', 
 CURRENT_DATE + INTERVAL '2 days', 
 'in_progress', 5, 1),

-- Milestone 2: Foundation Works (15%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Foundation Works Complete', 
 'Excavation, foundation trenches, reinforcement, and concrete foundation complete', 
 CURRENT_DATE + INTERVAL '7 days', 
 'pending', 15, 2),

-- Milestone 3: Ground Floor Slab (15%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Ground Floor Slab Casting', 
 'Foundation floor slab with DPM, BRC mesh, and concrete casting complete (108 sq.m)', 
 CURRENT_DATE + INTERVAL '14 days', 
 'pending', 15, 3),

-- Milestone 4: Wall Panels & Columns (20%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Wall Panels & Structural Columns', 
 'Installation of 124 wall panel units and reinforced concrete columns', 
 CURRENT_DATE + INTERVAL '21 days', 
 'pending', 20, 4),

-- Milestone 5: Roof Slab (15%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Roof Slab & Waterproofing', 
 'Precast slab installation (108 sq.m), casting, and waterproofing treatment', 
 CURRENT_DATE + INTERVAL '28 days', 
 'pending', 15, 5),

-- Milestone 6: Doors & Windows (10%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Doors & Metalwork Installation', 
 'Installation of main iron doors (3 units) and internal wooden doors (7 units)', 
 CURRENT_DATE + INTERVAL '35 days', 
 'pending', 10, 6),

-- Milestone 7: Plumbing & Electrical (10%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'MEP First & Second Fix', 
 'Complete plumbing (sanitary, water supply, drainage) and electrical (wiring, fittings, distribution board)', 
 CURRENT_DATE + INTERVAL '45 days', 
 'pending', 10, 7),

-- Milestone 8: Finishes (10%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Interior & Exterior Finishes', 
 'Floor finishes, plastering, painting (internal & external), kitchen worktops, wardrobes', 
 CURRENT_DATE + INTERVAL '60 days', 
 'pending', 10, 8),

-- Milestone 9: External Works & Boundary Wall (5%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'External Works & Perimeter Wall', 
 'Veranda, steps, drainage, paving, perimeter wall around plots 8089 & 8090, sliding gate', 
 CURRENT_DATE + INTERVAL '75 days', 
 'pending', 5, 9),

-- Milestone 10: Final Inspection & Handover (5%)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Snagging & Handover', 
 'Final cleaning, defect rectification, project handover with warranty documentation', 
 CURRENT_DATE + INTERVAL '90 days', 
 'pending', 5, 10)

ON CONFLICT DO NOTHING;

-- =====================================================
-- 3. DETAILED WORK SCHEDULE (Daily Progress Updates)
-- =====================================================

INSERT INTO project_updates (project_id, title, body, posted_at) VALUES

-- Week 1: Foundation Works

-- Saturday (Tomorrow)
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 1: Site Setting Out', 
 'Site establishment and accurate setting out of foundation grid using white wash marking. Verification of plot boundaries (LR No. MAKUYU/KIMORORI BLK. III/8090) and structural grid alignment. Site office setup with tools and equipment.', 
 CURRENT_DATE),

-- Monday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 2: Excavation & Foundation Preparation', 
 'Excavation of foundation trenches to specified depth. Installation of reinforcement bars (D12, D8, D10) for foundation beams and columns. Preparation of formwork timber (Grevillea). Quality check of excavation levels and alignment.', 
 CURRENT_DATE + INTERVAL '2 days'),

-- Tuesday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 3: Column Setting & Formwork Creation', 
 'Setting out reinforced concrete column positions with precision. Creation and installation of column formwork using Grevillea timber. Quality inspection of reinforcement placement and spacing. Preparation for foundation concrete works.', 
 CURRENT_DATE + INTERVAL '3 days'),

-- Wednesday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 4: Foundation Formwork Installation', 
 'Foundation formwork assembly and installation begins. Placement of BRC mesh and DPM (damp-proof membrane)/polythene sheeting. Final inspection and verification before concrete pour. Concrete mixer mobilization on site.', 
 CURRENT_DATE + INTERVAL '4 days'),

-- Thursday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 5: Foundation Casting (Columns & Beams)', 
 'Casting of foundation columns and concrete beams. Finishing of formwork to ensure smooth surfaces. Concrete mixer operation with quality control of mix ratios. Proper compaction and vibration of concrete. Curing process initiated.', 
 CURRENT_DATE + INTERVAL '5 days'),

-- Friday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 6: Foundation Casting Completion', 
 'Continuation and completion of foundation column and beam casting. Ensuring proper concrete consolidation and quality. Regular water curing to achieve design strength. Quality inspection by site engineer. Progress documentation.', 
 CURRENT_DATE + INTERVAL '6 days'),

-- Saturday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 7: Precast Slab Preparation & Laying', 
 'Positioning and laying of precast slabs over foundation structure. Installation of timber props (probes + Grevillea 3x2) for adequate support. Alignment verification and leveling. Preparation for ground floor slab works.', 
 CURRENT_DATE + INTERVAL '7 days'),

-- Week 2: Ground Floor Slab & Column Raising

-- Monday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 8: Ground Floor Slab Casting', 
 'Casting of ground floor slab covering full 108 sq.m area. Concrete pouring, spreading, and professional leveling. Installation of DPM under slab for moisture protection. Proper screeding and finishing. Curing preparations with water spray.', 
 CURRENT_DATE + INTERVAL '9 days'),

-- Tuesday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 9: Column Raising & Formwork Commencement', 
 'Raising of ground floor columns to support roof structure. Installation of column reinforcement bars (D12, D10). Formwork assembly for elevated columns begins. Quality checks on reinforcement placement and column alignment.', 
 CURRENT_DATE + INTERVAL '10 days'),

-- Wednesday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 10: Column Formwork Continuation', 
 'Continuation of column formwork installation with precision carpentry. Quality inspections on reinforcement positioning and spacing. Preparation for structural beam formwork. Ensuring vertical alignment of all columns.', 
 CURRENT_DATE + INTERVAL '11 days'),

-- Thursday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 11: Structural Formwork Completion', 
 'Completion of all structural column and beam formwork. Final inspection before concrete casting operations. Beam formwork installation complete with proper support. Quality assurance checks by site engineer.', 
 CURRENT_DATE + INTERVAL '12 days'),

-- Friday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 12: Structural Column & Beam Casting', 
 'Casting of raised columns and structural beams. Concrete quality control with proper mix ratios. Adequate vibration and compaction for structural integrity. Curing process initiated. Safety measures in place during casting.', 
 CURRENT_DATE + INTERVAL '13 days'),

-- Saturday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 13: Roof Level Formwork & Precast Preparation', 
 'Formwork preparation for roof slab level (with provisions for future first floor expansion). Positioning and laying of precast slabs for roof structure. Quality checks on precast slab alignment. Preparation for roof slab casting.', 
 CURRENT_DATE + INTERVAL '14 days'),

-- Week 3: Roof Slab Completion

-- Monday
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 14: Roof Slab Casting & Installation', 
 'Installation of final precast slab units for complete roof coverage. Casting of roof slab over 108 sq.m area. Waterproofing preparation and membrane application. Quality control of concrete mix and finish. Curing regime established for optimal strength gain.', 
 CURRENT_DATE + INTERVAL '16 days')

ON CONFLICT DO NOTHING;

-- =====================================================
-- 4. INITIAL PROGRESS PHOTO PLACEHOLDER
-- =====================================================

-- After you take photos, update with actual photo URLs from /admin/media
-- Example:
-- UPDATE project_updates 
-- SET photo_url = 'https://your-supabase-storage-url/media/project-photo.jpg'
-- WHERE project_id = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' AND title LIKE '%Day 1%';

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ✅ ✅ Collins Project Created Successfully! ✅ ✅ ✅';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Project Details:';
  RAISE NOTICE '   Name: Collins First Home';
  RAISE NOTICE '   Location: Murang''a, Kenya';
  RAISE NOTICE '   Duration: 90 days (3 months)';
  RAISE NOTICE '   Size: 108 sq.m ground floor';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Created: 10 Milestones';
  RAISE NOTICE '✅ Created: 14 Daily Task Updates';
  RAISE NOTICE '✅ Status: Ready for work!';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next Steps:';
  RAISE NOTICE '   1. Go to /admin/projects - you''ll see Collins project';
  RAISE NOTICE '   2. Add progress photos at /admin/media';
  RAISE NOTICE '   3. Update milestones as work progresses';
  RAISE NOTICE '   4. When Collins creates account, assign project to him';
  RAISE NOTICE '';
  RAISE NOTICE '📸 To assign to Collins later:';
  RAISE NOTICE '   UPDATE client_projects ';
  RAISE NOTICE '   SET client_user_id = ''COLLINS_USER_ID'' ';
  RAISE NOTICE '   WHERE id = ''a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'';';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Project is live in admin panel now!';
  RAISE NOTICE '';
END $$;
