# DigiSpark Project Architecture

This document provides an overview of the project structure and architecture for the DigiSpark digital agency website.

## 📁 Folder Structure

```
src/
├── assets/                    # Static assets (images, animations)
│   ├── lottie/               # Lottie animation JSON files
│   └── projects/             # Project portfolio images
│
├── components/               # Reusable UI components
│   ├── ui/                   # Base UI components (shadcn/ui)
│   ├── blog/                 # Blog-related components
│   ├── infographics/         # Data visualization components
│   ├── newsletter/           # Newsletter form components
│   ├── portfolio/            # Portfolio modals and details
│   ├── services/             # Services page sections
│   ├── success-stories/      # Case study components
│   ├── testimonials/         # Testimonial illustrations
│   └── tools/                # Tool page generators
│
├── contexts/                 # React context providers
│   └── AuthContext.tsx       # Authentication state management
│
├── data/                     # Static data files
│   └── successStoriesData.tsx # Success stories content
│
├── hooks/                    # Custom React hooks
│   ├── use-mobile.tsx        # Mobile detection hook
│   ├── use-toast.ts          # Toast notification hook
│   └── useTypingAnimation.ts # Text typing effect hook
│
├── integrations/             # Third-party integrations
│   └── supabase/             # Supabase client and types
│
├── lib/                      # Utility libraries
│   └── utils.ts              # Common utilities (cn function)
│
├── pages/                    # Route page components
│   ├── Index.tsx             # Home page
│   ├── About.tsx             # About us page
│   ├── Services.tsx          # Services listing
│   ├── Portfolio.tsx         # Project portfolio
│   ├── Blog.tsx              # Blog listing
│   ├── BlogPost.tsx          # Individual blog post
│   ├── Contact.tsx           # Contact page
│   ├── Faq.tsx               # FAQ page
│   ├── Tools.tsx             # Digital tools page
│   ├── Resources.tsx         # Resources directory
│   ├── SuccessStories.tsx    # Case studies
│   ├── TestimonialsPage.tsx  # Testimonials
│   ├── Auth.tsx              # Authentication
│   ├── Admin.tsx             # Admin dashboard
│   └── ...                   # Other pages
│
├── types/                    # TypeScript type definitions
│   ├── successStory.ts       # Success story types
│   └── supabase.ts           # Supabase related types
│
├── utils/                    # Utility functions
│   ├── animationUtils.ts     # Animation helpers
│   ├── confetti.ts           # Confetti effects
│   └── hapticFeedback.ts     # Mobile haptic feedback
│
├── App.tsx                   # Main application component
├── App.css                   # Global styles
├── index.css                 # Tailwind base styles
└── main.tsx                  # Application entry point
```

## 🏗️ Component Categories

### Layout Components
- `Navbar` - Main navigation with dropdowns
- `FooterSection` - Site footer with links
- `PageHeader` - Reusable page hero headers
- `PageTransition` - Page transition animations
- `ScrollToTop` - Scroll to top button

### Section Components
- `HeroSection` - Home page hero with 3D effects
- `CoreServicesSection` - Key services grid
- `ServicesSection` - Detailed services
- `PortfolioSection` - Featured projects
- `TestimonialsSection` - Client reviews
- `ContactSection` - Contact form
- `NewsletterSection` - Email subscription
- `GlobalPresenceSection` - World map with locations
- `ProcessTimelineSection` - Step-by-step process

### Interactive Components
- `WhatsAppChat` - Floating WhatsApp button
- `ProjectInquiryPopup` - Project inquiry modal
- `MusicPlayer` - Background music player
- `PreloaderNew` - Initial loading animation

### UI Base Components (shadcn/ui)
Located in `components/ui/`:
- Form elements (Button, Input, Textarea, etc.)
- Layout (Card, Dialog, Sheet, etc.)
- Navigation (Tabs, Accordion, etc.)
- Feedback (Toast, Alert, etc.)

## 🔧 Key Technologies

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | Backend & Auth |
| shadcn/ui | UI components |
| React Router | Routing |
| React Query | Data fetching |
| Zod | Schema validation |

## 📄 Page Documentation

Each page component should include:
1. JSDoc header with description and features
2. SEO meta tags via React Helmet
3. Structured data (JSON-LD) where applicable
4. Proper accessibility attributes

## 🎨 Design System

The design system is defined in:
- `index.css` - CSS variables and base styles
- `tailwind.config.ts` - Tailwind configuration

Key design tokens:
- Primary: Yellow (#FACC15)
- Background: Black (#000)
- Text: White/Gray gradients
- Accent: Various per section

## 🔐 Authentication Flow

1. User signs up/in via `Auth.tsx`
2. `AuthContext` manages session state
3. Protected routes check `useAuth()` hook
4. Supabase handles JWT tokens automatically

## 📊 Database Tables

| Table | Purpose |
|-------|---------|
| `blog_posts` | Blog content |
| `blog_suggestions` | User content suggestions |
| `contact_submissions` | Contact form entries |
| `newsletter_subscriptions` | Email subscribers |
| `project_inquiries` | Project inquiry forms |
| `project_quotes` | Quote requests |
| `resources` | Downloadable resources |
| `user_roles` | User role assignments |

## 🚀 Best Practices

1. **Components**: Keep components focused and reusable
2. **State**: Use context for global state, hooks for local
3. **Styling**: Use Tailwind utilities, avoid inline styles
4. **Types**: Define interfaces for all data structures
5. **SEO**: Add meta tags to all public pages
6. **A11y**: Include ARIA labels and semantic HTML

## 📝 Adding New Features

1. Create component in appropriate folder
2. Add TypeScript interfaces if needed
3. Include JSDoc documentation
4. Add route in `App.tsx` if it's a page
5. Update navigation links as needed
6. Test responsive behavior
