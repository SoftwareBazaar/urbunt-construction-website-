-- =====================================================
-- Admin CMS Extension - Additional Tables
-- =====================================================
-- Run this in Supabase SQL Editor after supabase-setup.sql

-- =====================================================
-- BLOG MANAGEMENT TABLES
-- =====================================================

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  featured_image TEXT,
  author_id TEXT,
  author_name TEXT,
  read_minutes INTEGER DEFAULT 5,
  status TEXT DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- MEDIA LIBRARY TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT, -- image, video, document
  file_size BIGINT,
  mime_type TEXT,
  alt_text TEXT,
  caption TEXT,
  project_id UUID REFERENCES client_projects(id) ON DELETE SET NULL,
  uploaded_by TEXT,
  folder TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- WEBSITE CONTENT TABLE (for CMS)
-- =====================================================

CREATE TABLE IF NOT EXISTS website_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL, -- homepage, about, services, etc.
  section TEXT NOT NULL, -- hero, features, testimonials, etc.
  content_key TEXT NOT NULL,
  content_value TEXT,
  content_type TEXT DEFAULT 'text', -- text, html, json, image_url
  updated_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page, section, content_key)
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

CREATE INDEX IF NOT EXISTS idx_media_library_type ON media_library(file_type);
CREATE INDEX IF NOT EXISTS idx_media_library_project ON media_library(project_id);
CREATE INDEX IF NOT EXISTS idx_media_library_folder ON media_library(folder);
CREATE INDEX IF NOT EXISTS idx_media_library_created ON media_library(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_website_content_page ON website_content(page, section);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can do everything on blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Service role can do everything on blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can view blog categories" ON blog_categories;
DROP POLICY IF EXISTS "Admins can manage blog categories" ON blog_categories;
DROP POLICY IF EXISTS "Admins can manage media" ON media_library;
DROP POLICY IF EXISTS "Service role can do everything on media" ON media_library;
DROP POLICY IF EXISTS "Anyone can view website content" ON website_content;
DROP POLICY IF EXISTS "Admins can manage website content" ON website_content;

-- Blog posts - public can read published, admins can do everything
CREATE POLICY "Anyone can view published blog posts" ON blog_posts 
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can do everything on blog posts" ON blog_posts 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Service role can do everything on blog posts" ON blog_posts 
  FOR ALL USING (auth.role() = 'service_role');

-- Blog categories - public can read, admins can manage
CREATE POLICY "Anyone can view blog categories" ON blog_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage blog categories" ON blog_categories 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff'))
  );

-- Media library - admins only
CREATE POLICY "Admins can manage media" ON media_library 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Service role can do everything on media" ON media_library 
  FOR ALL USING (auth.role() = 'service_role');

-- Website content - public can read, admins can edit
CREATE POLICY "Anyone can view website content" ON website_content FOR SELECT USING (true);

CREATE POLICY "Admins can manage website content" ON website_content 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()::text AND role IN ('admin', 'staff'))
  );

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Update blog_posts updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update website_content updated_at
CREATE TRIGGER update_website_content_updated_at BEFORE UPDATE ON website_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Create storage bucket for media (run this separately if needed)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('media', 'media', true)
-- ON CONFLICT DO NOTHING;

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert default blog categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Cost Guides', 'cost-guides', 'Pricing and budgeting guides for construction projects'),
  ('How-To', 'how-to', 'Step-by-step construction and renovation guides'),
  ('Project Stories', 'project-stories', 'Real project case studies and client stories'),
  ('Industry News', 'industry-news', 'Latest construction industry updates'),
  ('Design Ideas', 'design-ideas', 'Architectural and interior design inspiration')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- GRANTS
-- =====================================================

GRANT ALL ON blog_posts TO anon, authenticated;
GRANT ALL ON blog_categories TO anon, authenticated;
GRANT ALL ON media_library TO anon, authenticated;
GRANT ALL ON website_content TO anon, authenticated;

-- =====================================================
-- COMPLETION
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Admin CMS tables created successfully!';
  RAISE NOTICE '📝 Tables: blog_posts, blog_categories, media_library, website_content';
  RAISE NOTICE '🔒 RLS policies enabled';
  RAISE NOTICE '🎯 Ready to build the admin interface!';
END $$;
