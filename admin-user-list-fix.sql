-- =====================================================
-- Fix for Admin User Management
-- =====================================================
-- This creates a secure function to list users for admins
-- Run this in Supabase SQL Editor

-- Create a function that admins can call to list users
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id UUID,
  email TEXT,
  created_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if caller is admin
  IF NOT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid()::text 
    AND role IN ('admin', 'staff')
  ) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  -- Return users from auth.users
  RETURN QUERY
  SELECT 
    au.id,
    au.email::text,
    au.created_at,
    au.last_sign_in_at
  FROM auth.users au
  ORDER BY au.created_at DESC;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_all_users() TO authenticated;

-- =====================================================
-- Function to create a new user (admin only)
-- =====================================================

CREATE OR REPLACE FUNCTION create_new_user(
  user_email TEXT,
  user_password TEXT,
  user_role TEXT DEFAULT 'user'
)
RETURNS JSON
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_user_id UUID;
  result JSON;
BEGIN
  -- Check if caller is admin
  IF NOT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid()::text 
    AND role IN ('admin', 'staff')
  ) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  -- Create user in auth.users (requires service role, so we'll return error and handle in app)
  -- For now, return guidance to use Supabase dashboard
  result := json_build_object(
    'success', false,
    'message', 'User creation requires Supabase service role key. Please create users via Supabase Dashboard or use invite links.'
  );
  
  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION create_new_user(TEXT, TEXT, TEXT) TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Admin user list function created!';
  RAISE NOTICE '📝 Admins can now list users without service role key';
  RAISE NOTICE '⚠️  User creation still requires Supabase Dashboard (service role limitation)';
END $$;
