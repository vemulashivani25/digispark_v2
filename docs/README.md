# DigiSpark Documentation

Welcome to the comprehensive documentation for the DigiSpark digital agency website. This documentation is designed to help developers understand, maintain, and expand the codebase.

## 📚 Documentation Index

| Document | Description |
|----------|-------------|
| [PAGES.md](./PAGES.md) | All page components with routes, features, and props |
| [COMPONENTS.md](./COMPONENTS.md) | All reusable components organized by category |
| [UTILITIES.md](./UTILITIES.md) | Hooks, contexts, and utility functions |
| [STYLING.md](./STYLING.md) | Design system, theming, and CSS guidelines |
| [DATABASE.md](./DATABASE.md) | Supabase tables, RLS policies, and edge functions |
| [DEPLOYMENT.md](../DEPLOYMENT.md) | Deployment and hosting instructions |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
digispark/
├── docs/                      # Documentation files
├── public/                    # Static assets served as-is
├── src/
│   ├── assets/               # Images, animations, media
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── blog/            # Blog-related components
│   │   ├── newsletter/      # Newsletter components
│   │   ├── portfolio/       # Portfolio components
│   │   ├── services/        # Services components
│   │   ├── success-stories/ # Case study components
│   │   ├── testimonials/    # Testimonial components
│   │   ├── tools/           # Tool generator components
│   │   ├── admin/           # Admin panel components
│   │   └── auth/            # Authentication components
│   ├── contexts/            # React context providers
│   ├── data/                # Static data files
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # Third-party integrations
│   ├── lib/                 # Utility libraries
│   ├── pages/               # Route page components
│   ├── types/               # TypeScript definitions
│   └── utils/               # Utility functions
├── supabase/
│   ├── functions/           # Edge functions
│   └── migrations/          # Database migrations
└── configuration files
```

## 🔧 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | Latest | Type Safety |
| Vite | Latest | Build Tool & Dev Server |
| Tailwind CSS | 3.x | Utility-first Styling |
| Framer Motion | 10.18.0 | Animations |
| Supabase | 2.49.4 | Backend, Auth, Database |
| React Router | 6.26.2 | Client-side Routing |
| TanStack Query | 5.56.2 | Server State Management |
| shadcn/ui | Latest | UI Component Library |
| Zod | 3.24.3 | Schema Validation |
| React Hook Form | 7.56.1 | Form Management |

## 📝 Coding Standards

### File Naming
- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useTypingPlaceholder.ts`)
- Utilities: `camelCase.ts` (e.g., `animationUtils.ts`)
- Pages: `PascalCase.tsx` (e.g., `Portfolio.tsx`)

### Component Structure
```tsx
/**
 * ComponentName - Brief description
 * 
 * @description Detailed description of what this component does
 * @example
 * <ComponentName prop1="value" prop2={true} />
 */

// Imports grouped by:
// 1. React/libraries
// 2. Components
// 3. Hooks/Contexts
// 4. Utils/Types
// 5. Assets

interface ComponentNameProps {
  prop1: string;
  prop2?: boolean;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 = false }) => {
  // Hook calls
  // State declarations
  // Effects
  // Event handlers
  // Render helpers
  
  return (
    // JSX
  );
};

export default ComponentName;
```

### Import Aliases
```typescript
// Use @ alias for src directory
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
```

## 🎨 Design Tokens

The design system uses CSS custom properties defined in `src/index.css`:

```css
--background      /* Page background */
--foreground      /* Main text color */
--primary         /* Brand color (Yellow) */
--secondary       /* Secondary UI elements */
--muted           /* Muted backgrounds */
--accent          /* Accent color */
--destructive     /* Error/danger states */
--border          /* Border colors */
--ring            /* Focus ring color */
```

## 🔐 Authentication

Authentication is handled by Supabase Auth via `AuthContext`:

```tsx
import { useAuth } from "@/contexts/AuthContext";

const MyComponent = () => {
  const { user, isAdmin, loading, signIn, signOut } = useAuth();
  
  if (!user) return <LoginPrompt />;
  
  return <ProtectedContent />;
};
```

### User Roles
- `user` - Default role for all registered users
- `moderator` - Can manage content
- `admin` - Full access to admin dashboard

## 📊 Database Overview

| Table | Records | Purpose |
|-------|---------|---------|
| `blog_posts` | Blog articles with content, metadata |
| `contact_submissions` | Contact form entries |
| `newsletter_subscriptions` | Email subscribers |
| `project_quotes` | Quote request forms |
| `project_inquiries` | Project inquiry submissions |
| `resources` | Downloadable resources |
| `profiles` | User profile data |
| `user_roles` | Role assignments |

## 🚀 Adding New Features

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `Navbar.tsx`
4. Include SEO meta tags with Helmet
5. Add to sitemap if public

### Adding a New Component

1. Create in appropriate `src/components/` subfolder
2. Add TypeScript interfaces
3. Include JSDoc documentation
4. Export from component file
5. Use design system tokens for styling

### Adding a Database Table

1. Create migration in Supabase dashboard or CLI
2. Enable RLS and create policies
3. Add types to `src/integrations/supabase/types.ts`
4. Create hook or service for data fetching

## 🧪 Testing Checklist

- [ ] Component renders without errors
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible (keyboard nav, screen readers)
- [ ] SEO meta tags present
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Authentication checked where needed

## 📞 Support

For questions about this codebase:
1. Check this documentation first
2. Review existing component implementations
3. Search codebase for similar patterns

---

*Last updated: December 2024*
