# Styling & Design System Documentation

This document details the design system, theming, and styling guidelines for the DigiSpark application.

---

## 🎨 Design Overview

DigiSpark uses a dark-mode-first design with a bold yellow accent color, creating a modern, professional, and energetic aesthetic.

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Yellow | `#FACC15` | CTAs, accents, highlights |
| Background Black | `#000000` | Page backgrounds |
| Surface Dark | `#111111` | Cards, modals |
| Text White | `#FFFFFF` | Headings, primary text |
| Text Gray | `#9CA3AF` | Secondary text |
| Success Green | `#22C55E` | Success states |
| Error Red | `#EF4444` | Error states |
| Info Blue | `#60A5FA` | Info states |

---

## 📁 Styling Files

```
src/
├── index.css           # CSS variables, base styles, utilities
├── App.css             # Global app styles
└── tailwind.config.ts  # Tailwind configuration
```

---

## 🎯 CSS Custom Properties

**File:** `src/index.css`

### Light Mode (Default)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}
```

### Dark Mode

```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}
```

---

## 🛠️ Using Design Tokens

### In Tailwind Classes

```tsx
// Background colors
<div className="bg-background" />
<div className="bg-card" />
<div className="bg-popover" />
<div className="bg-muted" />
<div className="bg-primary" />
<div className="bg-secondary" />
<div className="bg-accent" />
<div className="bg-destructive" />

// Text colors
<p className="text-foreground" />
<p className="text-muted-foreground" />
<p className="text-primary" />
<p className="text-primary-foreground" />

// Borders
<div className="border-border" />
<input className="border-input" />

// Focus rings
<button className="ring-ring" />
```

### In Custom CSS

```css
.custom-element {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
}
```

---

## 📐 Typography

### Font Family

```css
body {
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
}
```

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.8125rem | 1.4 | Captions, labels |
| `text-sm` | 0.9375rem | 1.5 | Small text |
| `text-base` | 1rem | 1.7 | Body text |
| `text-lg` | 1.125rem | 1.6 | Large body |
| `text-xl` | 1.25rem | 1.5 | Subheadings |
| `text-2xl` | 1.5rem | 1.4 | Section headings |
| `text-3xl` | 1.875rem | 1.3 | Page headings |
| `text-4xl` | 2.25rem | 1.2 | Hero subheadings |
| `text-5xl` | 3rem | 1.1 | Hero headings |
| `text-6xl` | 3.75rem | 1.1 | Display text |

### Heading Styles

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

### Usage Examples

```tsx
// Hero heading
<h1 className="text-5xl md:text-6xl font-bold text-white">
  Welcome to <span className="text-yellow-400">DigiSpark</span>
</h1>

// Section heading
<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
  Our Services
</h2>

// Body text
<p className="text-gray-300 text-lg leading-relaxed">
  Description text here...
</p>
```

---

## 🎭 Component Styling Patterns

### Card Pattern

```tsx
<div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 
                border border-yellow-400/10 rounded-xl 
                shadow-lg shadow-yellow-400/5 
                hover:shadow-yellow-400/20 
                transition-all duration-500">
  {/* Card content */}
</div>
```

### Button Variants

```tsx
// Primary CTA
<Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
  Get Started
</Button>

// Secondary
<Button className="bg-gray-800 hover:bg-gray-700 text-white">
  Learn More
</Button>

// Outline
<Button className="border border-yellow-400/30 text-yellow-400 
                   hover:bg-yellow-400/10">
  View Details
</Button>

// Ghost
<Button variant="ghost" className="text-gray-400 hover:text-white">
  Cancel
</Button>
```

### Badge Styles

```tsx
// Yellow accent badge
<Badge className="bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30">
  Featured
</Badge>

// Outline badge
<Badge variant="outline" className="border-gray-700 text-gray-300">
  Technology
</Badge>

// Status badges
<span className="px-2.5 py-0.5 rounded-full text-xs font-medium 
                 bg-green-100 text-green-800">
  Published
</span>
```

### Input Fields

```tsx
<Input 
  className="bg-gray-800/50 border-gray-700 text-white 
             placeholder:text-gray-500 
             focus:border-yellow-400 focus:ring-yellow-400/20"
  placeholder="Enter your email"
/>
```

---

## 🌊 Gradient Patterns

### Background Gradients

```tsx
// Page background
<div className="bg-gradient-to-b from-black via-black/90 to-black" />

// Card gradient
<div className="bg-gradient-to-br from-gray-900 via-black to-gray-900" />

// Overlay gradient
<div className="bg-gradient-to-t from-black via-transparent to-transparent" />

// Yellow glow orb
<div className="w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
```

### Text Gradients

```tsx
<span className="bg-gradient-to-r from-yellow-400 to-yellow-200 
                 bg-clip-text text-transparent">
  Gradient Text
</span>
```

---

## ✨ Animation Utilities

### Custom CSS Utilities

```css
@layer utilities {
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}
```

### Framer Motion Patterns

```tsx
// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Hover scale
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  Interactive element
</motion.div>

// Stagger children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 📱 Responsive Design

### Breakpoints

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Common Patterns

```tsx
// Responsive text
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Heading
</h1>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>

// Responsive spacing
<section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
  {/* Content */}
</section>

// Responsive visibility
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>

// Responsive flex direction
<div className="flex flex-col md:flex-row gap-4">
  {/* Items */}
</div>
```

---

## 🎯 Common Component Classes

### Section Container

```tsx
<section className="py-20 bg-black relative overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    {/* Section content */}
  </div>
</section>
```

### Page Layout

```tsx
<div className="min-h-screen bg-black">
  <Navbar />
  <main className="pt-24">
    {/* Page content */}
  </main>
  <FooterSection />
</div>
```

### Modal/Dialog

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center 
                p-4 bg-black/80 backdrop-blur-sm">
  <div className="bg-gray-900 max-w-4xl w-full max-h-[90vh] 
                  overflow-y-auto rounded-xl shadow-2xl">
    {/* Modal content */}
  </div>
</div>
```

---

## 🔧 Tailwind Configuration

**File:** `tailwind.config.ts`

### Key Extensions

```typescript
export default {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 📝 Styling Best Practices

### DO ✅

```tsx
// Use semantic color tokens
<div className="bg-background text-foreground border-border" />

// Use design system spacing
<div className="p-4 md:p-6 lg:p-8" />

// Use component variants
<Button variant="outline" size="lg" />

// Use cn() for conditional classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

### DON'T ❌

```tsx
// Don't use arbitrary values when tokens exist
<div className="bg-[#000000]" /> // Use bg-black

// Don't use inline styles
<div style={{ padding: '20px' }} /> // Use className

// Don't override component internals
<Button className="!bg-red-500" /> // Use variant

// Don't use magic numbers
<div className="mt-[47px]" /> // Use mt-12 or similar
```

---

## 🎨 Color Usage Guidelines

### Text on Dark Backgrounds

| Use Case | Class |
|----------|-------|
| Primary heading | `text-white` |
| Secondary heading | `text-gray-100` |
| Body text | `text-gray-300` |
| Muted text | `text-gray-400` |
| Placeholder | `text-gray-500` |
| Accent text | `text-yellow-400` |

### Interactive States

```tsx
// Hover states
className="text-gray-300 hover:text-white"
className="bg-gray-800 hover:bg-gray-700"
className="border-yellow-400/30 hover:border-yellow-400/60"

// Focus states
className="focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"

// Active/selected states
className="bg-yellow-400 text-black"
```

---

*Last updated: December 2024*
