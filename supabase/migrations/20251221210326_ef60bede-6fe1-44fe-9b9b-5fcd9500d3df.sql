-- Create table to store blog content suggestions from popup
CREATE TABLE public.blog_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  topic_interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_suggestions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit blog suggestions (public form)
CREATE POLICY "Anyone can submit blog suggestions"
ON public.blog_suggestions
FOR INSERT
WITH CHECK (true);

-- Add index for querying by email
CREATE INDEX idx_blog_suggestions_email ON public.blog_suggestions(email);

-- Add comment to table
COMMENT ON TABLE public.blog_suggestions IS 'Stores blog content suggestions submitted by visitors through the blog page popup';