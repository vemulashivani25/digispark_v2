export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  details: string;
  created_at: string;
}

export interface ProjectQuote {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  selected_category: string;
  selected_features: string[];
  other_features?: string | null;
  pages?: number | null;
  timeline?: string | null;
  budget?: number | null;
  comments?: string | null;
  estimated_budget?: number | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}
