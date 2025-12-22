-- Drop RLS policies first (before dropping tables)

-- Drop policies on project_messages
DROP POLICY IF EXISTS "Admins can manage all messages" ON public.project_messages;
DROP POLICY IF EXISTS "Clients can send messages to their projects" ON public.project_messages;
DROP POLICY IF EXISTS "Users can send messages to their projects" ON public.project_messages;
DROP POLICY IF EXISTS "Users can view messages for their projects" ON public.project_messages;

-- Drop policies on project_milestones
DROP POLICY IF EXISTS "Admins can manage milestones" ON public.project_milestones;
DROP POLICY IF EXISTS "Admins can view all milestones" ON public.project_milestones;
DROP POLICY IF EXISTS "Clients can view their project milestones" ON public.project_milestones;

-- Drop policies on project_invoices
DROP POLICY IF EXISTS "Admins can manage invoices" ON public.project_invoices;
DROP POLICY IF EXISTS "Admins can view all invoices" ON public.project_invoices;
DROP POLICY IF EXISTS "Clients can view their project invoices" ON public.project_invoices;

-- Drop policies on project_files
DROP POLICY IF EXISTS "Admins can manage all files" ON public.project_files;
DROP POLICY IF EXISTS "Admins can view all files" ON public.project_files;
DROP POLICY IF EXISTS "Authenticated users can upload files to their projects" ON public.project_files;
DROP POLICY IF EXISTS "Clients can view their project files" ON public.project_files;

-- Drop policies on client_projects
DROP POLICY IF EXISTS "Admins can delete projects" ON public.client_projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.client_projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.client_projects;
DROP POLICY IF EXISTS "Admins can view all projects" ON public.client_projects;
DROP POLICY IF EXISTS "Clients can view their own projects" ON public.client_projects;

-- Drop tables (order matters due to foreign keys)
DROP TABLE IF EXISTS public.project_messages;
DROP TABLE IF EXISTS public.project_milestones;
DROP TABLE IF EXISTS public.project_invoices;
DROP TABLE IF EXISTS public.project_files;
DROP TABLE IF EXISTS public.client_projects;

-- Drop the is_client function
DROP FUNCTION IF EXISTS public.is_client(uuid);

-- Drop the enum types (if they exist and are no longer used)
DROP TYPE IF EXISTS public.milestone_status;
DROP TYPE IF EXISTS public.invoice_status;
DROP TYPE IF EXISTS public.project_status;