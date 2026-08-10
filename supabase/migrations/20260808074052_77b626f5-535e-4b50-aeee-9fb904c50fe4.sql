CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION private.can_view_project(_project_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.client_projects p
    WHERE p.id = _project_id
      AND (p.client_user_id = auth.uid()
           OR private.has_role(auth.uid(), 'admin')
           OR private.has_role(auth.uid(), 'staff'))
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.can_view_project(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.can_view_project(uuid) TO authenticated, service_role;

DROP POLICY "Staff can view leads" ON public.leads;
DROP POLICY "Staff can update leads" ON public.leads;
CREATE POLICY "Staff can view leads" ON public.leads FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff can update leads" ON public.leads FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));

DROP POLICY "Staff can view subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Staff can view subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));

DROP POLICY "Staff can view applications" ON public.job_applications;
DROP POLICY "Staff can update applications" ON public.job_applications;
CREATE POLICY "Staff can view applications" ON public.job_applications FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff can update applications" ON public.job_applications FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));

DROP POLICY "Clients view own projects" ON public.client_projects;
DROP POLICY "Staff manage projects" ON public.client_projects;
CREATE POLICY "Clients view own projects" ON public.client_projects FOR SELECT TO authenticated
  USING (client_user_id = auth.uid() OR private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff manage projects" ON public.client_projects FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));

DROP POLICY "View milestones" ON public.project_milestones;
DROP POLICY "Staff manage milestones" ON public.project_milestones;
CREATE POLICY "View milestones" ON public.project_milestones FOR SELECT TO authenticated
  USING (private.can_view_project(project_id));
CREATE POLICY "Staff manage milestones" ON public.project_milestones FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));

DROP POLICY "View updates" ON public.project_updates;
DROP POLICY "Staff manage updates" ON public.project_updates;
CREATE POLICY "View updates" ON public.project_updates FOR SELECT TO authenticated
  USING (private.can_view_project(project_id));
CREATE POLICY "Staff manage updates" ON public.project_updates FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));

DROP POLICY "View documents" ON public.project_documents;
DROP POLICY "Staff manage documents" ON public.project_documents;
CREATE POLICY "View documents" ON public.project_documents FOR SELECT TO authenticated
  USING (private.can_view_project(project_id));
CREATE POLICY "Staff manage documents" ON public.project_documents FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'staff'));

DROP FUNCTION IF EXISTS public.can_view_project(uuid);
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);