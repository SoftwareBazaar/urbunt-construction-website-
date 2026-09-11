-- =====================================================
-- Collins Njoroge Project - Using Real Email
-- =====================================================
-- Email: collinsmucheru@gmail.com
-- This creates Collins' account and project in one go
-- He'll receive an email to set his password and access the portal

-- =====================================================
-- STEP 1: Create Collins' User Account
-- =====================================================

DO $$
DECLARE
  collins_user_id uuid;
BEGIN
  -- Check if Collins already has an account
  SELECT id INTO collins_user_id
  FROM auth.users
  WHERE email = 'collinsmucheru@gmail.com';

  -- If not exists, create it
  IF collins_user_id IS NULL THEN
    -- Generate a unique ID for Collins
    collins_user_id := 'a1b2c3d4-0000-0000-0000-collins00001'::uuid;
    
    -- Insert into auth.users (Supabase auth system)
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      email_confirm_token,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      confirmation_token,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      collins_user_id,
      'authenticated',
      'authenticated',
      'collinsmucheru@gmail.com',
      crypt('UrbanT-Collins-2026!', gen_salt('bf')), -- Temporary password
      NULL, -- Email not confirmed yet - Collins will confirm
      encode(gen_random_bytes(32), 'base64'),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Collins Njoroge"}',
      false,
      encode(gen_random_bytes(32), 'base64'),
      ''
    )
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE '✅ Created account for Collins Njoroge';
    RAISE NOTICE '   Email: collinsmucheru@gmail.com';
  ELSE
    RAISE NOTICE '✅ Collins already has an account (ID: %)', collins_user_id;
  END IF;
END $$;

-- =====================================================
-- STEP 2: Create Collins' Project
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
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'a1b2c3d4-0000-0000-0000-collins00001'::uuid, -- Collins' user ID
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
  location = EXCLUDED.location,
  client_user_id = EXCLUDED.client_user_id;

-- =====================================================
-- STEP 3: Project Milestones (10 Total)
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
-- STEP 4: Daily Work Schedule (14 Updates)
-- =====================================================

INSERT INTO project_updates (project_id, title, body, posted_at) VALUES

-- Week 1: Foundation Works

-- Saturday (Tomorrow) - Day 1
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 1: Site Setting Out', 
 'Site establishment and accurate setting out of foundation grid using white wash marking. Verification of plot boundaries (LR No. MAKUYU/KIMORORI BLK. III/8090) and structural grid alignment. Site office setup with tools and equipment.', 
 CURRENT_DATE),

-- Monday - Day 2
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 2: Excavation & Foundation Preparation', 
 'Excavation of foundation trenches to specified depth. Installation of reinforcement bars (D12, D8, D10) for foundation beams and columns. Preparation of formwork timber (Grevillea). Quality check of excavation levels and alignment.', 
 CURRENT_DATE + INTERVAL '2 days'),

-- Tuesday - Day 3
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 3: Column Setting & Formwork Creation', 
 'Setting out reinforced concrete column positions with precision. Creation and installation of column formwork using Grevillea timber. Quality inspection of reinforcement placement and spacing. Preparation for foundation concrete works.', 
 CURRENT_DATE + INTERVAL '3 days'),

-- Wednesday - Day 4
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 4: Foundation Formwork Installation', 
 'Foundation formwork assembly and installation begins. Placement of BRC mesh and DPM (damp-proof membrane)/polythene sheeting. Final inspection and verification before concrete pour. Concrete mixer mobilization on site.', 
 CURRENT_DATE + INTERVAL '4 days'),

-- Thursday - Day 5
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 5: Foundation Casting (Columns & Beams)', 
 'Casting of foundation columns and concrete beams. Finishing of formwork to ensure smooth surfaces. Concrete mixer operation with quality control of mix ratios. Proper compaction and vibration of concrete. Curing process initiated.', 
 CURRENT_DATE + INTERVAL '5 days'),

-- Friday - Day 6
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 6: Foundation Casting Completion', 
 'Continuation and completion of foundation column and beam casting. Ensuring proper concrete consolidation and quality. Regular water curing to achieve design strength. Quality inspection by site engineer. Progress documentation.', 
 CURRENT_DATE + INTERVAL '6 days'),

-- Saturday - Day 7
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 7: Precast Slab Preparation & Laying', 
 'Positioning and laying of precast slabs over foundation structure. Installation of timber props (probes + Grevillea 3x2) for adequate support. Alignment verification and leveling. Preparation for ground floor slab works.', 
 CURRENT_DATE + INTERVAL '7 days'),

-- Week 2: Ground Floor Slab & Column Raising

-- Monday - Day 8
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 8: Ground Floor Slab Casting', 
 'Casting of ground floor slab covering full 108 sq.m area. Concrete pouring, spreading, and professional leveling. Installation of DPM under slab for moisture protection. Proper screeding and finishing. Curing preparations with water spray.', 
 CURRENT_DATE + INTERVAL '9 days'),

-- Tuesday - Day 9
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 9: Column Raising & Formwork Commencement', 
 'Raising of ground floor columns to support roof structure. Installation of column reinforcement bars (D12, D10). Formwork assembly for elevated columns begins. Quality checks on reinforcement placement and column alignment.', 
 CURRENT_DATE + INTERVAL '10 days'),

-- Wednesday - Day 10
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 10: Column Formwork Continuation', 
 'Continuation of column formwork installation with precision carpentry. Quality inspections on reinforcement positioning and spacing. Preparation for structural beam formwork. Ensuring vertical alignment of all columns.', 
 CURRENT_DATE + INTERVAL '11 days'),

-- Thursday - Day 11
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 11: Structural Formwork Completion', 
 'Completion of all structural column and beam formwork. Final inspection before concrete casting operations. Beam formwork installation complete with proper support. Quality assurance checks by site engineer.', 
 CURRENT_DATE + INTERVAL '12 days'),

-- Friday - Day 12
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 12: Structural Column & Beam Casting', 
 'Casting of raised columns and structural beams. Concrete quality control with proper mix ratios. Adequate vibration and compaction for structural integrity. Curing process initiated. Safety measures in place during casting.', 
 CURRENT_DATE + INTERVAL '13 days'),

-- Saturday - Day 13
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 13: Roof Level Formwork & Precast Preparation', 
 'Formwork preparation for roof slab level (with provisions for future first floor expansion). Positioning and laying of precast slabs for roof structure. Quality checks on precast slab alignment. Preparation for roof slab casting.', 
 CURRENT_DATE + INTERVAL '14 days'),

-- Week 3: Roof Slab Completion

-- Monday - Day 14
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 
 'Day 14: Roof Slab Casting & Installation', 
 'Installation of final precast slab units for complete roof coverage. Casting of roof slab over 108 sq.m area. Waterproofing preparation and membrane application. Quality control of concrete mix and finish. Curing regime established for optimal strength gain.', 
 CURRENT_DATE + INTERVAL '16 days')

ON CONFLICT DO NOTHING;

-- =====================================================
-- SUCCESS MESSAGE & NEXT STEPS
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════';
  RAISE NOTICE '✅  Collins Project Created Successfully!  ✅';
  RAISE NOTICE '════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '👤 CLIENT DETAILS:';
  RAISE NOTICE '   Name: Collins Njoroge (Mucheru)';
  RAISE NOTICE '   Email: collinsmucheru@gmail.com';
  RAISE NOTICE '   Temporary Password: UrbanT-Collins-2026!';
  RAISE NOTICE '';
  RAISE NOTICE '🏗️  PROJECT DETAILS:';
  RAISE NOTICE '   Title: Collins First Home';
  RAISE NOTICE '   Location: Murang''a, Kenya';
  RAISE NOTICE '   Plot: LR No. MAKUYU/KIMORORI BLK. III/8090';
  RAISE NOTICE '   Size: 108 sq.m ground floor';
  RAISE NOTICE '   Duration: 90 days';
  RAISE NOTICE '   Start: % (Today)', CURRENT_DATE;
  RAISE NOTICE '   Completion: %', CURRENT_DATE + INTERVAL '90 days';
  RAISE NOTICE '';
  RAISE NOTICE '✅ CREATED:';
  RAISE NOTICE '   • Collins user account';
  RAISE NOTICE '   • Project record';
  RAISE NOTICE '   • 10 Milestones (with 5-20%% weights)';
  RAISE NOTICE '   • 14 Daily work updates';
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════';
  RAISE NOTICE '📧  SEND THIS TO COLLINS:';
  RAISE NOTICE '════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE 'Hi Collins,';
  RAISE NOTICE '';
  RAISE NOTICE 'Your project portal is ready! You can now track';
  RAISE NOTICE 'your construction progress in real-time.';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 LOGIN DETAILS:';
  RAISE NOTICE '   Website: https://urbantconstruction.com/auth';
  RAISE NOTICE '   Email: collinsmucheru@gmail.com';
  RAISE NOTICE '   Temporary Password: UrbanT-Collins-2026!';
  RAISE NOTICE '';
  RAISE NOTICE '📋 WHAT YOU CAN SEE:';
  RAISE NOTICE '   • Project timeline (90 days)';
  RAISE NOTICE '   • Daily work schedule (14 updates)';
  RAISE NOTICE '   • 10 milestones with progress tracking';
  RAISE NOTICE '   • Photos as work progresses';
  RAISE NOTICE '   • Direct contact with project manager';
  RAISE NOTICE '';
  RAISE NOTICE '⚡ FIRST STEPS:';
  RAISE NOTICE '   1. Go to: https://urbantconstruction.com/auth';
  RAISE NOTICE '   2. Login with your email';
  RAISE NOTICE '   3. Change your password';
  RAISE NOTICE '   4. View your project at /portal';
  RAISE NOTICE '';
  RAISE NOTICE 'Work starts Saturday (Site Setting Out)!';
  RAISE NOTICE '';
  RAISE NOTICE 'Urban T Construction Team';
  RAISE NOTICE '+254 111 770 039';
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 ADMIN NEXT STEPS:';
  RAISE NOTICE '   1. Copy the message above';
  RAISE NOTICE '   2. Send to: collinsmucheru@gmail.com';
  RAISE NOTICE '   3. Go to /admin/projects to manage';
  RAISE NOTICE '   4. Add progress photos at /admin/media';
  RAISE NOTICE '   5. Update milestones as work progresses';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Project is live in both admin & client portal!';
  RAISE NOTICE '';
END $$;
