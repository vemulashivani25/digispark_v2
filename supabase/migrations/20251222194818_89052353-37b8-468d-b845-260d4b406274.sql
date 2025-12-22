-- Update RLS policies to allow clients to view their own data
-- First, create a helper function to check if user is a client

CREATE OR REPLACE FUNCTION public.is_client(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'client'
  )
$$;

-- Add policy for clients to view all projects (they see their own due to existing policy)
-- Clients should also be able to send messages
CREATE POLICY "Clients can send messages to their projects"
  ON public.project_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.client_projects 
      WHERE id = project_messages.project_id 
      AND client_id = auth.uid()
    )
  );