# Database Documentation

This document details the Supabase database schema, tables, relationships, policies, and edge functions for the DigiSpark application.

---

## 📊 Database Overview

DigiSpark uses Supabase as its backend, providing:
- PostgreSQL database
- Row Level Security (RLS)
- Real-time subscriptions
- Edge Functions
- Storage buckets
- Authentication

---

## 📁 Tables

### blog_posts

Stores blog articles and their metadata.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `title` | text | NO | | Post title |
| `slug` | text | NO | | URL-friendly slug |
| `content` | text | NO | | HTML content |
| `excerpt` | text | NO | | Short preview |
| `image` | text | NO | | Featured image URL |
| `category` | text | NO | | Post category |
| `author` | text | NO | | Author name |
| `author_avatar` | text | YES | | Author avatar URL |
| `tags` | text[] | YES | | Array of tags |
| `read_time` | text | YES | | Estimated read time |
| `word_count` | integer | YES | | Total word count |
| `featured` | boolean | YES | false | Is featured post |
| `is_published` | boolean | YES | false | Publication status |
| `published_at` | timestamptz | YES | | Publication date |
| `created_at` | timestamptz | NO | now() | Creation timestamp |
| `updated_at` | timestamptz | NO | now() | Last update timestamp |

#### Usage

```typescript
// Fetch published posts
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('is_published', true)
  .order('published_at', { ascending: false });

// Fetch single post by slug
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('slug', slug)
  .single();
```

---

### blog_suggestions

User-submitted blog topic suggestions.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `email` | text | NO | | Submitter email |
| `topic` | text | YES | | Suggested topic |
| `details` | text | NO | | Topic details |
| `is_reviewed` | boolean | YES | false | Review status |
| `created_at` | timestamptz | NO | now() | Submission timestamp |

---

### contact_submissions

Contact form submissions.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `name` | text | NO | | Contact name |
| `email` | text | NO | | Contact email |
| `phone` | text | YES | | Phone number |
| `company` | text | YES | | Company name |
| `service` | text | NO | | Selected service |
| `message` | text | NO | | Message content |
| `is_read` | boolean | YES | false | Read status |
| `created_at` | timestamptz | NO | now() | Submission timestamp |

---

### newsletter_subscriptions

Email newsletter subscribers.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `email` | text | NO | | Subscriber email |
| `is_active` | boolean | YES | true | Subscription status |
| `subscribed_at` | timestamptz | NO | now() | Subscription timestamp |

---

### project_inquiries

Quick project inquiry submissions.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `name` | text | NO | | Inquirer name |
| `email` | text | NO | | Inquirer email |
| `details` | text | NO | | Project details |
| `created_at` | timestamptz | NO | now() | Submission timestamp |

---

### project_quotes

Detailed project quote requests.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `name` | text | NO | | Requester name |
| `email` | text | NO | | Requester email |
| `phone` | text | YES | | Phone number |
| `company_name` | text | YES | | Company name |
| `selected_category` | text | NO | | Service category |
| `selected_features` | text[] | YES | | Selected features |
| `other_features` | text | YES | | Custom features |
| `pages` | integer | YES | | Number of pages |
| `timeline` | text | YES | | Project timeline |
| `budget` | integer | YES | | Budget amount |
| `estimated_budget` | integer | YES | | Calculated estimate |
| `comments` | text | YES | | Additional comments |
| `status` | text | YES | 'pending' | Quote status |
| `created_at` | timestamptz | NO | now() | Submission timestamp |

---

### resources

Downloadable resources library.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `title` | text | NO | | Resource title |
| `description` | text | NO | | Resource description |
| `category` | text | NO | | Resource category |
| `type` | text | NO | | Resource type (ebook, template, etc.) |
| `file_url` | text | NO | | Download URL |
| `thumbnail_url` | text | YES | | Preview image |
| `download_count` | integer | YES | 0 | Download counter |
| `is_featured` | boolean | YES | false | Featured status |
| `is_active` | boolean | YES | true | Active status |
| `created_at` | timestamptz | NO | now() | Creation timestamp |
| `updated_at` | timestamptz | NO | now() | Update timestamp |

---

### profiles

User profile information.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | | Primary key (matches auth.users.id) |
| `email` | text | YES | | User email |
| `full_name` | text | YES | | Full name |
| `avatar_url` | text | YES | | Avatar image URL |
| `created_at` | timestamptz | NO | now() | Creation timestamp |
| `updated_at` | timestamptz | NO | now() | Update timestamp |

---

### user_roles

User role assignments for access control.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | NO | gen_random_uuid() | Primary key |
| `user_id` | uuid | NO | | Reference to auth.users |
| `role` | app_role | NO | 'user' | User role |
| `created_at` | timestamptz | NO | now() | Assignment timestamp |

#### Enum: app_role

```sql
CREATE TYPE app_role AS ENUM ('admin', 'moderator', 'user');
```

---

## 🔐 Row Level Security (RLS)

All tables have RLS enabled. Common policy patterns:

### Public Read

```sql
CREATE POLICY "Public can read published content"
ON blog_posts FOR SELECT
USING (is_published = true);
```

### Authenticated Insert

```sql
CREATE POLICY "Authenticated users can submit"
ON contact_submissions FOR INSERT
TO authenticated
WITH CHECK (true);
```

### Owner-Only Access

```sql
CREATE POLICY "Users can view own data"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

### Admin-Only Access

```sql
CREATE POLICY "Admins can manage all"
ON blog_posts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```

---

## 🔧 Database Functions

### has_role

Checks if a user has a specific role.

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
```

#### Usage

```typescript
// In application code
const { data: isAdmin } = await supabase
  .rpc('has_role', { _user_id: userId, _role: 'admin' });
```

---

### handle_new_user

Trigger function to create profile on user signup.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;
```

---

### update_updated_at_column

Automatically updates `updated_at` timestamp.

```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
```

#### Trigger Usage

```sql
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

## 📦 Storage Buckets

### resources

Public bucket for downloadable resources.

| Setting | Value |
|---------|-------|
| Name | resources |
| Public | Yes |
| File Size Limit | 50MB |
| Allowed Types | PDF, ZIP, DOCX |

#### Usage

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('resources')
  .upload(`${userId}/${fileName}`, file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('resources')
  .getPublicUrl(filePath);
```

---

## ⚡ Edge Functions

### submit-contact

Handles contact form submission with email notification.

**Path:** `supabase/functions/submit-contact/index.ts`

```typescript
// Request body
interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

// Response
interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}
```

---

### send-quote-email

Sends quote confirmation emails.

**Path:** `supabase/functions/send-quote-email/index.ts`

---

### notify-admin

Sends admin notifications for new submissions.

**Path:** `supabase/functions/notify-admin/index.ts`

---

## 🔑 Environment Variables

### Required Secrets

| Secret | Purpose |
|--------|---------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin operations |
| `RESEND_API_KEY` | Email sending |

---

## 📝 TypeScript Types

Types are auto-generated in `src/integrations/supabase/types.ts`.

### Using Database Types

```typescript
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

// Row type (for SELECT)
type BlogPost = Tables<"blog_posts">;

// Insert type (for INSERT)
type NewBlogPost = TablesInsert<"blog_posts">;

// Update type (for UPDATE)
type UpdateBlogPost = TablesUpdate<"blog_posts">;

// Usage
const post: BlogPost = data;
const newPost: NewBlogPost = {
  title: "My Post",
  slug: "my-post",
  content: "...",
  excerpt: "...",
  image: "...",
  category: "Tech",
  author: "John Doe"
};
```

---

## 🔄 Common Queries

### Fetch with Pagination

```typescript
const PAGE_SIZE = 10;

const { data, count } = await supabase
  .from('blog_posts')
  .select('*', { count: 'exact' })
  .eq('is_published', true)
  .order('published_at', { ascending: false })
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
```

### Search

```typescript
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  .eq('is_published', true);
```

### Filter by Array Contains

```typescript
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .contains('tags', [selectedTag]);
```

### Increment Counter

```typescript
const { error } = await supabase.rpc('increment_download_count', {
  resource_id: resourceId
});
```

---

## 🚀 Migration Best Practices

### Creating New Tables

```sql
-- Always include these columns
CREATE TABLE public.new_table (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.new_table ENABLE ROW LEVEL SECURITY;

-- Add update trigger
CREATE TRIGGER update_new_table_updated_at
BEFORE UPDATE ON public.new_table
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### Adding Columns

```sql
ALTER TABLE public.existing_table
ADD COLUMN new_column TEXT;

-- Add index if needed
CREATE INDEX idx_existing_table_new_column 
ON public.existing_table(new_column);
```

---

*Last updated: December 2024*
