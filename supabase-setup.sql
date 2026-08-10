-- =====================================================
-- Urban T Construction Website - Database Setup
-- =====================================================
-- Run this script in your Supabase SQL Editor to create all necessary tables
-- Project ID: pkbmflosqanfarwghzjp

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE app_role AS ENUM ('admin', 'staff', 'user');

-- =====================================================
-- TABLES
-- =====================================================

-- Leads table - stores quote requests and inquiries
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT,
  kind TEXT DEFAULT 'lead',
  service_slugs TEXT[] DEFAULT '{}',
  package_slug TEXT,
  size TEXT,
  notes TEXT,
  estimate_low DECIMAL,
  estimate_high DECIMAL,
  bundle_discount DECIMAL DEFAULT 0,
  track TEXT,
  stage TEXT,
  status TEXT DEFAULT 'new',
  source_channel TEXT DEFAULT 'website',
  source_page TEXT,
  referrer TEXT,
  utm JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT,
  role_title TEXT,
  applicant_type TEXT DEFAULT 'direct',
  experience TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client projects table - for customer portal
CREATE TABLE IF NOT EXISTS client_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  project_type TEXT DEFAULT 'residential',
  location TEXT,
  status TEXT DEFAULT 'planning',
  current_stage TEXT DEFAULT 'Design & Permits',
  progress DECIMAL DEFAULT 0,
  contract_value DECIMAL,
  start_date DATE,
  target_date DATE,
  manager_name TEXT,
  manager_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project milestones table
CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  planned_date DATE,
  actual_date DATE,
  notes TEXT,
  weight DECIMAL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project updates table - for photo/progress updates
CREATE TABLE IF NOT EXISTS project_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  photo_url TEXT,
  posted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project documents table - for contracts, plans, etc.
CREATE TABLE IF NOT EXISTS project_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  doc_type TEXT DEFAULT 'other',
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles table - for role-based access control
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

CREATE INDEX IF NOT EXISTS idx_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications(status);

CREATE INDEX IF NOT EXISTS idx_projects_client_user ON client_projects(client_user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON client_projects(status);

CREATE INDEX IF NOT EXISTS idx_milestones_project ON project_milestones(project_id, position);

CREATE INDEX IF NOT EXISTS idx_updates_project ON project_updates(project_id, posted_at DESC);

CREATE INDEX IF NOT EXISTS idx_documents_project ON project_documents(project_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Leads policies - allow inserts from anyone, read/update for admins only
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can do everything on leads" ON leads FOR ALL USING (auth.role() = 'service_role');

-- Newsletter policies - allow inserts from anyone
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can do everything on newsletter" ON newsletter_subscribers FOR ALL USING (auth.role() = 'service_role');

-- Job applications policies - allow inserts from anyone
CREATE POLICY "Anyone can submit job application" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can do everything on applications" ON job_applications FOR ALL USING (auth.role() = 'service_role');

-- Client projects policies - users can see their own projects
CREATE POLICY "Users can view their own projects" ON client_projects FOR SELECT USING (
  auth.uid()::text = client_user_id OR
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff'))
);
CREATE POLICY "Service role can do everything on projects" ON client_projects FOR ALL USING (auth.role() = 'service_role');

-- Project milestones policies
CREATE POLICY "Users can view milestones for their projects" ON project_milestones FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM client_projects 
    WHERE id = project_milestones.project_id 
    AND (client_user_id = auth.uid()::text OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff')))
  )
);
CREATE POLICY "Service role can do everything on milestones" ON project_milestones FOR ALL USING (auth.role() = 'service_role');

-- Project updates policies
CREATE POLICY "Users can view updates for their projects" ON project_updates FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM client_projects 
    WHERE id = project_updates.project_id 
    AND (client_user_id = auth.uid()::text OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff')))
  )
);
CREATE POLICY "Service role can do everything on updates" ON project_updates FOR ALL USING (auth.role() = 'service_role');

-- Project documents policies
CREATE POLICY "Users can view documents for their projects" ON project_documents FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM client_projects 
    WHERE id = project_documents.project_id 
    AND (client_user_id = auth.uid()::text OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff')))
  )
);
CREATE POLICY "Service role can do everything on documents" ON project_documents FOR ALL USING (auth.role() = 'service_role');

-- User roles policies
CREATE POLICY "Users can view their own roles" ON user_roles FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY "Service role can do everything on user_roles" ON user_roles FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to tables with updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_projects_updated_at BEFORE UPDATE ON client_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert a sample lead
INSERT INTO leads (name, phone, email, location, service_slugs, notes, status)
VALUES 
  ('John Doe', '+1234567890', 'john@example.com', 'New York, NY', ARRAY['residential-construction', 'renovation'], 'Looking for home renovation', 'new')
ON CONFLICT DO NOTHING;

-- Insert a sample newsletter subscriber
INSERT INTO newsletter_subscribers (email, source_page)
VALUES ('subscriber@example.com', '/services')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- GRANTS
-- =====================================================

-- Grant necessary permissions to authenticated and anon roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database setup completed successfully!';
  RAISE NOTICE '📊 Tables created: leads, newsletter_subscribers, job_applications, client_projects, project_milestones, project_updates, project_documents, user_roles';
  RAISE NOTICE '🔒 Row Level Security enabled on all tables';
  RAISE NOTICE '🚀 Your Urban T Construction website is ready to go!';
END $$;
