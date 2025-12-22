# Pages Documentation

This document details all page components in the DigiSpark application, including their routes, features, and key functionality.

---

## 📍 Route Map

| Route | Page Component | Description | Auth Required |
|-------|----------------|-------------|---------------|
| `/` | Index | Home page | No |
| `/about` | About | About us page | No |
| `/services` | Services | Services listing | No |
| `/contact` | Contact | Contact form | No |
| `/faq` | Faq | FAQ accordion | No |
| `/portfolio` | Portfolio | Project showcase | No |
| `/success-stories` | SuccessStories | Case studies | No |
| `/testimonials` | TestimonialsPage | Client reviews | No |
| `/blog` | Blog | Blog listing | No |
| `/blog/:slug` | BlogPost | Individual post | No |
| `/resources` | Resources | Resource library | No |
| `/tools` | Tools | Digital tools | No |
| `/project-quote` | ProjectQuote | Quote calculator | No |
| `/auth` | Auth | Login/Register | No |
| `/admin` | Admin | Admin dashboard | Yes (Admin) |
| `*` | NotFound | 404 page | No |

---

## 🏠 Index (Home Page)

**File:** `src/pages/Index.tsx`  
**Route:** `/`

### Description
The main landing page featuring hero section, services overview, portfolio highlights, testimonials, and call-to-action sections.

### Key Sections
| Section | Component | Purpose |
|---------|-----------|---------|
| Hero | `HeroSection` | Main banner with 3D animation |
| Brand Showcase | `BrandShowcaseSection` | Client logos marquee |
| Core Services | `CoreServicesSection` | Service categories grid |
| Services | `ServicesSection` | Detailed service cards |
| Process | `ProcessTimelineSection` | Step-by-step workflow |
| Tools Carousel | `ToolsCarousel` | Tool icons animation |
| Portfolio | `PortfolioSection` | Featured projects |
| Testimonials | `TestimonialsSection` | Client reviews |
| Global Presence | `GlobalPresenceSection` | World map locations |
| Statistics | `AgencyStatsInfoGraphic` | Animated counters |
| Contact | `ContactSection` | Contact form |
| Newsletter | `NewsletterSection` | Email subscription |

### SEO
```tsx
<Helmet>
  <title>DigiSpark | Expert Digital Solutions</title>
  <meta name="description" content="Comprehensive digital services..." />
</Helmet>
```

### Features
- Animated preloader on first visit
- Parallax scroll effects
- Interactive 3D elements
- Ambient particle background
- Music player option

---

## 📋 About

**File:** `src/pages/About.tsx`  
**Route:** `/about`

### Description
Company information page featuring team members, company history, mission/vision, and core values.

### Key Sections
- Company Overview
- Mission & Vision statements
- Team member profiles
- Company timeline/history
- Core values grid

### Features
- Team member cards with hover effects
- Animated statistics
- Timeline visualization
- Social proof elements

---

## 🛠️ Services

**File:** `src/pages/Services.tsx`  
**Route:** `/services`

### Description
Comprehensive services listing with detailed descriptions, pricing tiers, and service comparison.

### Key Components
| Component | Purpose |
|-----------|---------|
| `ServicesHeroSection` | Page header with background |
| `ServicesTabbedSection` | Tabbed service categories |
| `ServicesFeaturedSection` | Highlighted services |
| `ServicesListSection` | Full service listing |
| `ServicesPathSection` | Service selection guide |
| `ServicesCtaSection` | Call to action |
| `AdditionalServicesSection` | Extra services |
| `EnhancedServicesSection` | Premium offerings |
| `ServicePopup` | Service detail modal |

### Service Categories
1. **Web Development** - Custom websites, web apps
2. **Digital Marketing** - SEO, PPC, social media
3. **Design** - UI/UX, branding, graphics
4. **Virtual Assistance** - Admin, customer support
5. **CRM Solutions** - HubSpot, Zoho implementation
6. **Video Production** - Editing, animation

### Features
- Interactive service cards
- Service popup modals
- Category filtering
- Pricing tables
- Comparison charts

---

## 💼 Portfolio

**File:** `src/pages/Portfolio.tsx`  
**Route:** `/portfolio`

### Description
Showcases completed projects with filtering by category and detailed case study modals.

### Data Structure
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  client: string;
  industry: string;
  tags: string[];
  icon: React.ElementType;
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  stats: { value: string; label: string; }[];
}
```

### Features
- Tag-based filtering
- Animated project cards
- `ProjectDetailsModal` for case studies
- Image gallery in modal
- Technology badges
- Client testimonials
- Results statistics

### Modal Integration
```tsx
import ProjectDetailsModal, { ProjectDetails } from "@/components/portfolio/ProjectDetailsModal";

// Convert Project to ProjectDetails for modal
const convertToProjectDetails = (project: Project): ProjectDetails => ({
  id: project.id,
  title: project.title,
  category: project.industry,
  // ... mapping
});
```

---

## 📰 Blog

**File:** `src/pages/Blog.tsx`  
**Route:** `/blog`

### Description
Blog listing page with category filtering, search, and featured posts.

### Features
- Category filter tabs
- Search functionality
- Featured post highlight
- Pagination/Load more
- Blog suggestion popup
- Reading time display

### Data Source
Blog posts are fetched from `blog_posts` Supabase table.

---

## 📖 BlogPost

**File:** `src/pages/BlogPost.tsx`  
**Route:** `/blog/:slug`

### Description
Individual blog post page with full content, table of contents, and related posts.

### Features
- Dynamic content from slug
- Table of contents sidebar
- Social share buttons
- Related posts section
- Author info
- Reading progress indicator
- Breadcrumb navigation

### SEO
Dynamic meta tags based on post content:
```tsx
<Helmet>
  <title>{post.title} | DigiSpark Blog</title>
  <meta name="description" content={post.excerpt} />
  <meta property="og:image" content={post.image} />
</Helmet>
```

---

## 📞 Contact

**File:** `src/pages/Contact.tsx`  
**Route:** `/contact`

### Description
Contact page with form, location map, and contact information.

### Form Fields
| Field | Type | Required |
|-------|------|----------|
| name | text | Yes |
| email | email | Yes |
| phone | tel | No |
| company | text | No |
| service | select | Yes |
| message | textarea | Yes |

### Features
- Form validation with Zod
- Supabase submission
- Email notification via edge function
- Success/error toasts
- Lottie animation

---

## ❓ FAQ

**File:** `src/pages/Faq.tsx`  
**Route:** `/faq`

### Description
Frequently asked questions with accordion-style answers organized by category.

### Categories
1. General Questions
2. Services & Pricing
3. Process & Timeline
4. Technical Support
5. Billing & Payments

### Features
- Accordion component
- Category tabs
- Search filtering
- Schema.org FAQ markup

---

## 🏆 Success Stories

**File:** `src/pages/SuccessStories.tsx`  
**Route:** `/success-stories`

### Description
Detailed case studies showcasing client success with industry and service filtering.

### Features
- Industry filter
- Service filter
- Enhanced case study modals
- Results metrics
- Client testimonials
- Before/after comparisons

### Key Components
- `IndustryFilter`
- `ServiceFilter`
- `SuccessStoryCard`
- `EnhancedCaseStudyModal`
- `IndustrySuccessMetrics`

---

## 📚 Resources

**File:** `src/pages/Resources.tsx`  
**Route:** `/resources`

### Description
Downloadable resources library including eBooks, templates, checklists, and guides.

### Resource Types
- eBooks
- Templates
- Checklists
- Guides
- Whitepapers

### Features
- Category filtering
- Search functionality
- Download counter
- Featured resources
- Resource library component

---

## 🔧 Tools

**File:** `src/pages/Tools.tsx`  
**Route:** `/tools`

### Description
Free digital tools for SEO, development, and marketing.

### Available Tools
| Tool | Component | Purpose |
|------|-----------|---------|
| Meta Tag Generator | `MetaTagGenerator` | Generate SEO meta tags |
| Schema Markup | `SchemaMarkupGenerator` | Create JSON-LD schema |
| QR Code Generator | `QRCodeGenerator` | Generate QR codes |
| Sitemap Generator | `SitemapGenerator` | Create XML sitemaps |
| Robots.txt Generator | `RobotsTxtGenerator` | Generate robots.txt |
| Lorem Ipsum | `LoremIpsumGenerator` | Placeholder text |
| Gradient Generator | `GradientGenerator` | CSS gradients |
| Keyword Density | `KeywordDensityChecker` | Analyze keyword usage |

### Features
- Tab-based tool selection
- Copy to clipboard
- Export options
- Tool previews

---

## 💰 Project Quote

**File:** `src/pages/ProjectQuote.tsx`  
**Route:** `/project-quote`

### Description
Interactive quote calculator for project estimation.

### Features
- Service category selection
- Feature checklist
- Page count slider
- Timeline selection
- Budget estimation
- Quote submission form

---

## 🔐 Auth

**File:** `src/pages/Auth.tsx`  
**Route:** `/auth`

### Description
Authentication page for login, registration, and password reset.

### Features
- Email/password authentication
- Google OAuth option
- Password reset flow
- Animated background
- Form validation
- Redirect after login

---

## ⚙️ Admin

**File:** `src/pages/Admin.tsx`  
**Route:** `/admin`

### Description
Admin dashboard for managing website content and user submissions.

### Tabs
| Tab | Manages |
|-----|---------|
| Contacts | Contact form submissions |
| Subscribers | Newsletter subscriptions |
| Blog Posts | Blog content |
| Resources | Downloadable resources |

### Features
- Role-based access (admin only)
- CRUD operations
- Data tables
- Search/filter
- AlertDialog confirmations
- BlogPostEditor component
- ResourceManager component

### Access Control
```tsx
const { user, isAdmin } = useAuth();

if (!isAdmin) {
  return <AccessDenied />;
}
```

---

## 🔗 Additional Pages

### TestimonialsPage
**Route:** `/testimonials`  
Full page of client testimonials with filtering and video testimonials.

### NewsletterPreview
**Route:** `/newsletter-preview`  
Preview page for email newsletter templates.

### ProjectDetail
**Route:** `/projectsdata/:projectId`  
Individual project detail page (alternative to modal).

### NotFound
**Route:** `*`  
404 error page with navigation back to home.

---

## 📝 Page Template

When creating a new page, use this template:

```tsx
/**
 * PageName - Brief description
 * 
 * @route /page-route
 * @description Detailed description
 */

import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";

const PageName = () => {
  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Page Title | DigiSpark</title>
        <meta name="description" content="Page description for SEO" />
        <link rel="canonical" href="https://domain.com/page-route" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24">
        {/* Page content */}
      </main>
      
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default PageName;
```

---

*Last updated: December 2024*
