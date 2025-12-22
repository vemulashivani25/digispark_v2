# DigiSpark Project Architecture

This document provides an overview of the project structure and architecture for the DigiSpark digital agency website.

## 📁 Folder Structure

```
digispark/
├── docs/                         # Documentation files
│   ├── README.md                 # Documentation index
│   ├── PAGES.md                  # All page components documentation
│   ├── COMPONENTS.md             # All reusable components documentation
│   ├── UTILITIES.md              # Hooks, contexts, utility functions
│   ├── STYLING.md                # Design system and theming
│   └── DATABASE.md               # Supabase tables and edge functions
│
├── public/                       # Static assets (served as-is)
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── assets/                   # Bundled static assets
│   │   ├── lottie/               # Lottie animation JSON files
│   │   └── projects/             # Project portfolio images
│   │
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Base UI components (shadcn/ui)
│   │   ├── layout/               # Layout barrel exports (index.ts)
│   │   ├── sections/             # Section barrel exports (index.ts)
│   │   ├── interactive/          # Interactive barrel exports (index.ts)
│   │   ├── admin/                # Admin panel components
│   │   ├── auth/                 # Authentication components
│   │   ├── blog/                 # Blog-related components
│   │   ├── infographics/         # Data visualization components
│   │   ├── newsletter/           # Newsletter form components
│   │   ├── portfolio/            # Portfolio modals and details
│   │   ├── resources/            # Resource library components
│   │   ├── services/             # Services page sections
│   │   ├── success-stories/      # Case study components
│   │   ├── testimonials/         # Testimonial illustrations
│   │   ├── tools/                # Tool page generators
│   │   └── [root components]     # Global/layout components
│   │
│   ├── contexts/                 # React context providers
│   │   └── AuthContext.tsx       # Authentication state management
│   │
│   ├── data/                     # Static data files
│   │   └── successStoriesData.tsx
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-mobile.tsx        # Mobile detection hook
│   │   ├── use-toast.ts          # Toast notification hook
│   │   └── useTypingPlaceholder.ts
│   │
│   ├── integrations/             # Third-party integrations
│   │   └── supabase/             # Supabase client and types
│   │
│   ├── lib/                      # Utility libraries
│   │   ├── utils.ts              # Common utilities (cn function)
│   │   └── validation.ts         # Zod validation schemas
│   │
│   ├── pages/                    # Route page components
│   │   ├── Index.tsx             # Home page (/)
│   │   ├── About.tsx             # About us (/about)
│   │   ├── Services.tsx          # Services listing (/services)
│   │   ├── Portfolio.tsx         # Project portfolio (/portfolio)
│   │   ├── Blog.tsx              # Blog listing (/blog)
│   │   ├── BlogPost.tsx          # Individual post (/blog/:slug)
│   │   ├── Contact.tsx           # Contact page (/contact)
│   │   ├── Faq.tsx               # FAQ page (/faq)
│   │   ├── Tools.tsx             # Digital tools (/tools)
│   │   ├── Resources.tsx         # Resources directory (/resources)
│   │   ├── SuccessStories.tsx    # Case studies (/success-stories)
│   │   ├── TestimonialsPage.tsx  # Testimonials (/testimonials)
│   │   ├── Documentation.tsx     # Docs browser (/docs)
│   │   ├── Auth.tsx              # Authentication (/auth)
│   │   ├── Admin.tsx             # Admin dashboard (/admin)
│   │   └── NotFound.tsx          # 404 page (*)
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── successStory.ts
│   │   └── supabase.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── animationUtils.ts     # Animation helpers
│   │   ├── confetti.ts           # Confetti effects
│   │   └── hapticFeedback.ts     # Mobile haptic feedback
│   │
│   ├── App.tsx                   # Main application + routing
│   ├── index.css                 # Tailwind base + design system
│   └── main.tsx                  # Application entry point
│
├── supabase/
│   ├── functions/                # Edge functions
│   │   ├── notify-admin/
│   │   ├── send-quote-email/
│   │   ├── submit-contact/
│   │   └── triggers/
│   └── migrations/               # Database migrations
│
└── Configuration files
    ├── index.html                # HTML template
    ├── tailwind.config.ts        # Tailwind configuration
    ├── vite.config.ts            # Vite configuration
    ├── tsconfig.json             # TypeScript configuration
    └── eslint.config.js          # ESLint configuration
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
- Feedback (Toast, Alert, AlertDialog, etc.)

## 🔧 Key Technologies

| Technology      | Version  | Purpose           |
| --------------- | -------- | ----------------- |
| React           | 18.3.1   | UI framework      |
| TypeScript      | Latest   | Type safety       |
| Vite            | Latest   | Build tool        |
| Tailwind CSS    | 3.x      | Styling           |
| Framer Motion   | 10.18.0  | Animations        |
| Supabase        | 2.49.4   | Backend & Auth    |
| shadcn/ui       | Latest   | UI components     |
| React Router    | 6.26.2   | Routing           |
| TanStack Query  | 5.56.2   | Data fetching     |
| Zod             | 3.24.3   | Schema validation |
| React Hook Form | 7.56.1   | Form management   |

## 📄 Page Documentation

Each page component should include:

1. JSDoc header with description and features
2. SEO meta tags via React Helmet
3. Structured data (JSON-LD) where applicable
4. Proper accessibility attributes

## 🎨 Design System

The design system is defined in:

- `src/index.css` - CSS variables and base styles
- `tailwind.config.ts` - Tailwind configuration with animations

### Key Design Tokens (defined as CSS variables)

```css
--background      /* Page background */
--foreground      /* Main text color */
--primary         /* Brand color */
--secondary       /* Secondary UI elements */
--muted           /* Muted backgrounds */
--accent          /* Accent color */
--destructive     /* Error/danger states */
--border          /* Border colors */
--ring            /* Focus ring color */
```

### Animation Classes

```
animate-fade-in       /* Fade in with slide up */
animate-scale-in      /* Scale in from 0.95 */
animate-slide-in-up   /* Slide in from bottom */
animate-bounce-in     /* Bounce effect */
animate-shimmer       /* Loading shimmer */
hover-scale           /* Scale on hover */
hover-lift            /* Lift on hover with shadow */
```

## 🔐 Authentication Flow

1. User signs up/in via `Auth.tsx`
2. `AuthContext` manages session state
3. Protected routes check `useAuth()` hook
4. Supabase handles JWT tokens automatically

```tsx
import { useAuth } from "@/contexts/AuthContext";

const { user, isAdmin, loading, signIn, signOut } = useAuth();
```

## 📊 Database Tables

| Table                      | Purpose                  |
| -------------------------- | ------------------------ |
| `blog_posts`               | Blog content             |
| `blog_suggestions`         | User content suggestions |
| `contact_submissions`      | Contact form entries     |
| `newsletter_subscriptions` | Email subscribers        |
| `project_inquiries`        | Project inquiry forms    |
| `project_quotes`           | Quote requests           |
| `resources`                | Downloadable resources   |
| `profiles`                 | User profile data        |
| `user_roles`               | User role assignments    |

## 🚀 Best Practices

1. **Components**: Keep components focused and reusable
2. **State**: Use context for global state, hooks for local
3. **Styling**: Use Tailwind design tokens, avoid direct colors
4. **Types**: Define interfaces for all data structures
5. **SEO**: Add meta tags to all public pages
6. **A11y**: Include ARIA labels and semantic HTML
7. **Performance**: Lazy load images, minimize bundle size

## 📝 Adding New Features

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `Navbar.tsx`
4. Include SEO meta tags with Helmet
5. Add to sitemap if public
6. Update documentation

### Adding a New Component

1. Create in appropriate `src/components/` subfolder
2. Add TypeScript interfaces
3. Include JSDoc documentation
4. Use design system tokens for styling
5. Test responsive behavior

### Adding a Database Table

1. Create migration via Supabase
2. Enable RLS and create policies
3. Types auto-generated in `integrations/supabase/types.ts`
4. Create hook or service for data fetching

---

_Last updated: December 2024_
