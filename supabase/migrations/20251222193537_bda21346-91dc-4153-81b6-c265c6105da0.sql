-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('pending', 'in_progress', 'review', 'completed', 'on_hold', 'cancelled');

-- Create enum for invoice status
CREATE TYPE public.invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');

-- Create enum for milestone status
CREATE TYPE public.milestone_status AS ENUM ('pending', 'in_progress', 'completed', 'delayed');

-- Client Projects table
CREATE TABLE public.client_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status project_status NOT NULL DEFAULT 'pending',
  category TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  budget NUMERIC(10, 2),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project Invoices table
CREATE TABLE public.project_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC(10, 2) NOT NULL,
  status invoice_status NOT NULL DEFAULT 'draft',
  due_date DATE NOT NULL,
  paid_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project Files table
CREATE TABLE public.project_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project Milestones table
CREATE TABLE public.project_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status milestone_status NOT NULL DEFAULT 'pending',
  due_date DATE,
  completed_date DATE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project Messages table for client-admin communication
CREATE TABLE public.project_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_projects
CREATE POLICY "Clients can view their own projects"
  ON public.client_projects FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Admins can view all projects"
  ON public.client_projects FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert projects"
  ON public.client_projects FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
  ON public.client_projects FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
  ON public.client_projects FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for project_invoices
CREATE POLICY "Clients can view their project invoices"
  ON public.project_invoices FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.client_projects 
    WHERE id = project_invoices.project_id 
    AND client_id = auth.uid()
  ));

CREATE POLICY "Admins can view all invoices"
  ON public.project_invoices FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage invoices"
  ON public.project_invoices FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for project_files
CREATE POLICY "Clients can view their project files"
  ON public.project_files FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.client_projects 
    WHERE id = project_files.project_id 
    AND client_id = auth.uid()
  ));

CREATE POLICY "Admins can view all files"
  ON public.project_files FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can upload files to their projects"
  ON public.project_files FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by AND (
      EXISTS (
        SELECT 1 FROM public.client_projects 
        WHERE id = project_files.project_id 
        AND client_id = auth.uid()
      ) OR public.has_role(auth.uid(), 'admin')
    )
  );

CREATE POLICY "Admins can manage all files"
  ON public.project_files FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for project_milestones
CREATE POLICY "Clients can view their project milestones"
  ON public.project_milestones FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.client_projects 
    WHERE id = project_milestones.project_id 
    AND client_id = auth.uid()
  ));

CREATE POLICY "Admins can view all milestones"
  ON public.project_milestones FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage milestones"
  ON public.project_milestones FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for project_messages
CREATE POLICY "Users can view messages for their projects"
  ON public.project_messages FOR SELECT
  USING (
    auth.uid() = sender_id OR
    EXISTS (
      SELECT 1 FROM public.client_projects 
      WHERE id = project_messages.project_id 
      AND client_id = auth.uid()
    ) OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can send messages to their projects"
  ON public.project_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND (
      EXISTS (
        SELECT 1 FROM public.client_projects 
        WHERE id = project_messages.project_id 
        AND client_id = auth.uid()
      ) OR public.has_role(auth.uid(), 'admin')
    )
  );

CREATE POLICY "Admins can manage all messages"
  ON public.project_messages FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at triggers
CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON public.client_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_invoices_updated_at
  BEFORE UPDATE ON public.project_invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_milestones_updated_at
  BEFORE UPDATE ON public.project_milestones
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_client_projects_client_id ON public.client_projects(client_id);
CREATE INDEX idx_client_projects_status ON public.client_projects(status);
CREATE INDEX idx_project_invoices_project_id ON public.project_invoices(project_id);
CREATE INDEX idx_project_invoices_status ON public.project_invoices(status);
CREATE INDEX idx_project_files_project_id ON public.project_files(project_id);
CREATE INDEX idx_project_milestones_project_id ON public.project_milestones(project_id);
CREATE INDEX idx_project_messages_project_id ON public.project_messages(project_id);