# Utilities, Hooks & Contexts Documentation

This document details all utility functions, custom hooks, and React contexts in the DigiSpark application.

---

## 📁 File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx       # Authentication state management
├── hooks/
│   ├── use-mobile.tsx        # Mobile detection hook
│   ├── use-toast.ts          # Toast notification hook
│   └── useTypingPlaceholder.ts # Typing placeholder effect
├── lib/
│   ├── utils.ts              # Common utilities
│   └── validation.ts         # Form validation schemas
└── utils/
    ├── animationUtils.ts     # Animation helpers
    ├── confetti.ts           # Confetti effects
    └── hapticFeedback.ts     # Mobile haptic feedback
```

---

## 🔐 Contexts

### AuthContext

**File:** `src/contexts/AuthContext.tsx`

Provides authentication state and methods throughout the application.

#### Usage

```tsx
import { useAuth } from "@/contexts/AuthContext";

const MyComponent = () => {
  const { 
    user,           // Current user object
    loading,        // Auth loading state
    isAdmin,        // Boolean: is user admin?
    userRole,       // 'admin' | 'moderator' | 'user' | null
    signIn,         // Sign in function
    signUp,         // Sign up function
    signOut,        // Sign out function
  } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <LoginPrompt />;
  
  return <ProtectedContent />;
};
```

#### Provider Setup

The provider is set up in `App.tsx`:

```tsx
import { AuthProvider } from "@/contexts/AuthContext";

<AuthProvider>
  <App />
</AuthProvider>
```

#### Type Definitions

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  userRole: 'admin' | 'moderator' | 'user' | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}
```

#### Features
- Supabase auth integration
- Session persistence
- Role-based access control
- Auto-refresh token handling
- Profile management

---

## 🪝 Custom Hooks

### useMobile

**File:** `src/hooks/use-mobile.tsx`

Detects if the current viewport is mobile-sized.

```tsx
import { useMobile } from "@/hooks/use-mobile";

const MyComponent = () => {
  const isMobile = useMobile();

  return (
    <div>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
};
```

#### Implementation

```typescript
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};
```

---

### useToast

**File:** `src/hooks/use-toast.ts`

Hook for displaying toast notifications.

```tsx
import { useToast } from "@/hooks/use-toast";
// OR
import { toast } from "@/components/ui/use-toast";

const MyComponent = () => {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Success!",
      description: "Your action was completed.",
    });
  };

  const handleError = () => {
    toast({
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive",
    });
  };
};
```

#### Toast Options

```typescript
interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;  // ms, default 5000
  action?: ToastActionElement;
}
```

---

### useTypingPlaceholder

**File:** `src/hooks/useTypingPlaceholder.ts`

Creates a typing animation effect for placeholder text.

```tsx
import { useTypingPlaceholder } from "@/hooks/useTypingPlaceholder";

const SearchInput = () => {
  const placeholder = useTypingPlaceholder([
    "Search for services...",
    "Find a project...",
    "Explore resources...",
  ]);

  return (
    <input 
      type="text" 
      placeholder={placeholder} 
    />
  );
};
```

#### Parameters

```typescript
useTypingPlaceholder(
  phrases: string[],     // Array of phrases to cycle through
  typingSpeed?: number,  // ms per character (default: 100)
  deletingSpeed?: number, // ms per character when deleting (default: 50)
  pauseDuration?: number  // ms to pause at end of phrase (default: 2000)
): string
```

---

## 🔧 Utility Functions

### lib/utils.ts

**File:** `src/lib/utils.ts`

Common utility functions used throughout the app.

#### cn (className merge)

Merges Tailwind CSS classes with proper precedence.

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  className  // props className
)} />
```

#### Implementation

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### lib/validation.ts

**File:** `src/lib/validation.ts`

Zod validation schemas for forms.

```tsx
import { contactFormSchema, newsletterSchema } from "@/lib/validation";
import { z } from "zod";

// Use with react-hook-form
const form = useForm<z.infer<typeof contactFormSchema>>({
  resolver: zodResolver(contactFormSchema),
});
```

#### Schemas

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const projectQuoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  category: z.string(),
  features: z.array(z.string()),
  pages: z.number().min(1).max(100),
  timeline: z.string(),
  budget: z.number().optional(),
  comments: z.string().optional(),
});
```

---

### utils/animationUtils.ts

**File:** `src/utils/animationUtils.ts`

Framer Motion animation presets and utilities.

```tsx
import { 
  fadeInUp, 
  staggerContainer, 
  scaleOnHover 
} from "@/utils/animationUtils";

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
</motion.div>
```

#### Animation Variants

```typescript
// Fade in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Fade in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Stagger children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Scale on hover
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};
```

---

### utils/confetti.ts

**File:** `src/utils/confetti.ts`

Confetti celebration effects using canvas-confetti.

```tsx
import { 
  triggerConfetti, 
  triggerSuccessConfetti, 
  triggerCtaConfetti 
} from "@/utils/confetti";

// Basic confetti burst
const handleSuccess = () => {
  triggerConfetti();
};

// Extended celebration
const handleBigWin = () => {
  triggerSuccessConfetti();
};

// Confetti from button position
const handleCtaClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  triggerCtaConfetti(event.currentTarget);
};
```

#### Functions

```typescript
// Basic confetti burst
export const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#facc15', '#ffffff', '#60a5fa']
  });
};

// Extended success celebration
export const triggerSuccessConfetti = () => {
  // Multiple bursts over 2 seconds
  const duration = 2000;
  // ... implementation
};

// CTA button confetti - triggers from button position
export const triggerCtaConfetti = (buttonElement?: HTMLElement) => {
  const rect = buttonElement?.getBoundingClientRect();
  // ... position-based confetti
};
```

---

### utils/hapticFeedback.ts

**File:** `src/utils/hapticFeedback.ts`

Mobile device haptic feedback utilities.

```tsx
import { 
  mediumTap, 
  successVibration, 
  successFeedback 
} from "@/utils/hapticFeedback";

// Button click feedback
const handleClick = () => {
  mediumTap();
  // ... action
};

// Success with sound
const handleSuccess = () => {
  successFeedback(); // Vibration + sound
};
```

#### Functions

```typescript
// Basic vibration
export const vibrate = (pattern: number | number[] = 50) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

// Medium tap for form submissions
export const mediumTap = () => vibrate(50);

// Success vibration pattern
export const successVibration = () => vibrate([50, 50, 100]);

// Play success tone (audio feedback)
export const playSuccessTone = () => {
  // Uses Web Audio API for pleasant chime
};

// Combined success feedback (vibration + sound)
export const successFeedback = () => {
  successVibration();
  playSuccessTone();
};
```

---

## 📦 Integration Utilities

### Supabase Client

**File:** `src/integrations/supabase/client.ts`

Configured Supabase client instance.

```tsx
import { supabase } from "@/integrations/supabase/client";

// Query data
const { data, error } = await supabase
  .from('blog_posts')
  .select('*')
  .order('created_at', { ascending: false });

// Insert data
const { error } = await supabase
  .from('contact_submissions')
  .insert({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  });

// Auth operations
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

---

## 📝 Creating Custom Hooks

Template for creating new hooks:

```typescript
/**
 * useCustomHook - Brief description
 * 
 * @description Detailed description of hook purpose
 * @param param1 - Description of parameter
 * @returns Description of return value
 * 
 * @example
 * const result = useCustomHook('value');
 */

import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookOptions {
  option1?: string;
  option2?: boolean;
}

interface UseCustomHookReturn {
  data: any;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCustomHook = (
  param1: string,
  options: UseCustomHookOptions = {}
): UseCustomHookReturn => {
  const { option1 = 'default', option2 = false } = options;
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // ... fetch logic
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [param1, option1]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useCustomHook;
```

---

## 📝 Creating Utility Functions

Template for utility functions:

```typescript
/**
 * utilityFunction - Brief description
 * 
 * @description Detailed description of what the function does
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of return value
 * 
 * @example
 * const result = utilityFunction('value1', { option: true });
 */

interface UtilityOptions {
  option?: boolean;
  callback?: () => void;
}

export const utilityFunction = (
  param1: string,
  options: UtilityOptions = {}
): string => {
  const { option = false, callback } = options;
  
  // Implementation
  let result = param1;
  
  if (option) {
    result = result.toUpperCase();
  }
  
  callback?.();
  
  return result;
};
```

---

*Last updated: December 2024*
