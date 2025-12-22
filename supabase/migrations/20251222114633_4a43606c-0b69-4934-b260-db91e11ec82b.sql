-- Additional tables for DigiSpark

-- 1. Create project_inquiries table (for popup inquiries)
CREATE TABLE public.project_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry (public popup)
CREATE POLICY "Anyone can submit project inquiry"
ON public.project_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can read/manage
CREATE POLICY "Admins can view all project inquiries"
ON public.project_inquiries
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project inquiries"
ON public.project_inquiries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Create blog_suggestions table
CREATE TABLE public.blog_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    topic TEXT,
    details TEXT NOT NULL,
    is_reviewed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_suggestions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a suggestion
CREATE POLICY "Anyone can submit blog suggestion"
ON public.blog_suggestions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can read/manage
CREATE POLICY "Admins can view all blog suggestions"
ON public.blog_suggestions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog suggestions"
ON public.blog_suggestions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog suggestions"
ON public.blog_suggestions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add indexes
CREATE INDEX idx_project_inquiries_created_at ON public.project_inquiries(created_at DESC);
CREATE INDEX idx_blog_suggestions_created_at ON public.blog_suggestions(created_at DESC);