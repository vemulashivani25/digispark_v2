-- Assign roles to existing users
-- User 1 (test@gmail.com) will be admin
-- User 2 (1test@gmail.com) will be client

DELETE FROM public.user_roles WHERE user_id IN ('b3ec0417-7dce-42d1-99b5-a398406e96fa', '162c3288-c9a6-4019-ae36-734a739261af');

INSERT INTO public.user_roles (user_id, role) VALUES
  ('b3ec0417-7dce-42d1-99b5-a398406e96fa', 'admin'),
  ('162c3288-c9a6-4019-ae36-734a739261af', 'client');

-- Create sample projects for the client user
INSERT INTO public.client_projects (client_id, title, description, status, category, start_date, end_date, budget, progress) VALUES
  ('162c3288-c9a6-4019-ae36-734a739261af', 'E-Commerce Website Redesign', 'Complete overhaul of the existing e-commerce platform with modern UI/UX, improved checkout flow, and mobile-first design approach.', 'in_progress', 'Web Development', '2025-01-15', '2025-04-15', 15000.00, 65),
  ('162c3288-c9a6-4019-ae36-734a739261af', 'Digital Marketing Campaign', 'Q1 2025 comprehensive digital marketing strategy including SEO optimization, social media management, and PPC campaigns.', 'in_progress', 'Digital Marketing', '2025-01-01', '2025-03-31', 8500.00, 40),
  ('162c3288-c9a6-4019-ae36-734a739261af', 'Brand Identity Package', 'Complete brand identity design including logo, color palette, typography, and brand guidelines document.', 'completed', 'Branding', '2024-11-01', '2024-12-15', 5000.00, 100);