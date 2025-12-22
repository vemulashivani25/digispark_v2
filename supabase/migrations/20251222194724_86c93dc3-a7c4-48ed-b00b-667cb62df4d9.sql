-- Create sample invoices
INSERT INTO public.project_invoices (project_id, invoice_number, amount, status, due_date, paid_date, description)
SELECT id, 'INV-2025-001', 5000.00, 'paid', '2025-02-01', '2025-01-28', 'Initial deposit - 33%'
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_invoices (project_id, invoice_number, amount, status, due_date, description)
SELECT id, 'INV-2025-002', 5000.00, 'sent', '2025-03-01', 'Progress payment - Design phase complete'
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_invoices (project_id, invoice_number, amount, status, due_date, description)
SELECT id, 'INV-2025-003', 5000.00, 'draft', '2025-04-15', 'Final payment - Project completion'
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_invoices (project_id, invoice_number, amount, status, due_date, paid_date, description)
SELECT id, 'INV-2025-004', 4250.00, 'paid', '2025-01-15', '2025-01-14', 'Q1 Marketing - 50% upfront'
FROM public.client_projects WHERE title = 'Digital Marketing Campaign' LIMIT 1;

INSERT INTO public.project_invoices (project_id, invoice_number, amount, status, due_date, paid_date, description)
SELECT id, 'INV-2024-015', 5000.00, 'paid', '2024-12-15', '2024-12-10', 'Brand Identity - Full payment'
FROM public.client_projects WHERE title = 'Brand Identity Package' LIMIT 1;

-- Create sample milestones for E-Commerce project
INSERT INTO public.project_milestones (project_id, title, description, status, due_date, completed_date, order_index)
SELECT id, 'Discovery & Requirements', 'Gather requirements, analyze competitors, define project scope', 'completed', '2025-01-22', '2025-01-20', 1
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_milestones (project_id, title, description, status, due_date, completed_date, order_index)
SELECT id, 'Wireframes & Prototypes', 'Create low-fidelity wireframes and interactive prototypes', 'completed', '2025-02-05', '2025-02-03', 2
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_milestones (project_id, title, description, status, due_date, order_index)
SELECT id, 'UI Design', 'High-fidelity designs for all pages and components', 'in_progress', '2025-02-20', 3
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_milestones (project_id, title, description, status, due_date, order_index)
SELECT id, 'Frontend Development', 'Build responsive frontend with React and animations', 'pending', '2025-03-15', 4
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_milestones (project_id, title, description, status, due_date, order_index)
SELECT id, 'Backend Integration', 'Connect to payment systems, inventory, and CMS', 'pending', '2025-04-01', 5
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_milestones (project_id, title, description, status, due_date, order_index)
SELECT id, 'Testing & Launch', 'QA testing, bug fixes, and production deployment', 'pending', '2025-04-15', 6
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

-- Create sample files
INSERT INTO public.project_files (project_id, name, file_url, file_type, file_size, uploaded_by)
SELECT id, 'Project-Requirements.pdf', 'https://example.com/files/requirements.pdf', 'application/pdf', 245000, 'b3ec0417-7dce-42d1-99b5-a398406e96fa'
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_files (project_id, name, file_url, file_type, file_size, uploaded_by)
SELECT id, 'Wireframes-v2.fig', 'https://example.com/files/wireframes.fig', 'application/figma', 1250000, 'b3ec0417-7dce-42d1-99b5-a398406e96fa'
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_files (project_id, name, file_url, file_type, file_size, uploaded_by)
SELECT id, 'Homepage-Design.png', 'https://example.com/files/homepage.png', 'image/png', 850000, 'b3ec0417-7dce-42d1-99b5-a398406e96fa'
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_files (project_id, name, file_url, file_type, file_size, uploaded_by)
SELECT id, 'Brand-Guidelines.pdf', 'https://example.com/files/brand-guidelines.pdf', 'application/pdf', 3500000, 'b3ec0417-7dce-42d1-99b5-a398406e96fa'
FROM public.client_projects WHERE title = 'Brand Identity Package' LIMIT 1;

-- Create sample messages
INSERT INTO public.project_messages (project_id, sender_id, message, is_read)
SELECT id, 'b3ec0417-7dce-42d1-99b5-a398406e96fa', 'Hi! Welcome to your project dashboard. I have uploaded the initial requirements document for your review.', true
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_messages (project_id, sender_id, message, is_read)
SELECT id, '162c3288-c9a6-4019-ae36-734a739261af', 'Thanks! I have reviewed the requirements. The scope looks great. One question - can we prioritize mobile checkout?', true
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_messages (project_id, sender_id, message, is_read)
SELECT id, 'b3ec0417-7dce-42d1-99b5-a398406e96fa', 'Absolutely! Mobile-first checkout is our priority. I will update the wireframes to reflect this and share them by Friday.', true
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;

INSERT INTO public.project_messages (project_id, sender_id, message, is_read)
SELECT id, 'b3ec0417-7dce-42d1-99b5-a398406e96fa', 'Wireframes are ready! Please check the files section and let me know your feedback.', false
FROM public.client_projects WHERE title = 'E-Commerce Website Redesign' LIMIT 1;