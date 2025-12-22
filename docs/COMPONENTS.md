# Components Documentation

This document details all reusable components in the DigiSpark application, organized by category.

---

## 📁 Component Structure

```
src/components/
├── ui/                    # Base UI components (shadcn/ui)
├── admin/                 # Admin panel components
├── auth/                  # Authentication components
├── blog/                  # Blog-related components
├── infographics/          # Data visualization
├── newsletter/            # Newsletter components
├── portfolio/             # Portfolio components
├── resources/             # Resource library
├── services/              # Services page components
├── success-stories/       # Case study components
├── testimonials/          # Testimonial components
├── tools/                 # Tool generators
└── [root components]      # Global/layout components
```

---

## 🧩 Layout Components

### Navbar

**File:** `src/components/Navbar.tsx`

Primary navigation component with responsive mobile menu and dropdown links.

```tsx
<Navbar />
```

#### Features
- Sticky header on scroll
- Transparent to solid background transition
- Mobile hamburger menu
- Dropdown navigation links
- Auth-aware (shows login/profile)

#### Dependencies
- `NavDropdownLink` - Dropdown menu items
- `useAuth` - Authentication state

---

### FooterSection

**File:** `src/components/FooterSection.tsx`

Site footer with navigation, social links, and copyright.

```tsx
<FooterSection />
```

#### Sections
- Quick Links
- Services
- Resources
- Contact Info
- Social Media Links
- Newsletter Signup
- Copyright

---

### PageHeader

**File:** `src/components/PageHeader.tsx`

Reusable page hero header with title and breadcrumb.

```tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  backgroundImage?: string;
}

<PageHeader 
  title="Our Services" 
  subtitle="What we offer"
  breadcrumbs={[{ label: "Home", href: "/" }]}
/>
```

---

### PageTransition

**File:** `src/components/PageTransition.tsx`

Wrapper component for page enter/exit animations.

```tsx
<PageTransition>
  <PageContent />
</PageTransition>
```

---

### ScrollToTop

**File:** `src/components/ScrollToTop.tsx`

Floating button to scroll back to top of page.

```tsx
<ScrollToTop />
```

#### Features
- Shows after scrolling down
- Smooth scroll animation
- Fixed position bottom-right

---

## 🎨 Section Components

### HeroSection

**File:** `src/components/HeroSection.tsx`

Main hero section for home page with animated 3D background.

```tsx
<HeroSection />
```

#### Features
- Animated text typing effect
- 3D background elements
- Call-to-action buttons
- Scroll indicator

---

### CoreServicesSection

**File:** `src/components/CoreServicesSection.tsx`

Grid display of main service categories.

```tsx
<CoreServicesSection />
```

---

### ServicesSection

**File:** `src/components/ServicesSection.tsx`

Detailed services with icons and descriptions.

```tsx
<ServicesSection />
```

---

### PortfolioSection

**File:** `src/components/PortfolioSection.tsx`

Featured projects showcase for home page.

```tsx
<PortfolioSection />
```

---

### TestimonialsSection

**File:** `src/components/TestimonialsSection.tsx`

Client testimonials carousel/grid.

```tsx
<TestimonialsSection />
```

---

### ContactSection

**File:** `src/components/ContactSection.tsx`

Contact form section for home page.

```tsx
<ContactSection />
```

---

### GlobalPresenceSection

**File:** `src/components/GlobalPresenceSection.tsx`

World map showing global office locations.

```tsx
<GlobalPresenceSection />
```

---

### ProcessTimelineSection

**File:** `src/components/ProcessTimelineSection.tsx`

Step-by-step process visualization.

```tsx
<ProcessTimelineSection />
```

---

### BrandShowcaseSection

**File:** `src/components/BrandShowcaseSection.tsx`

Client logo marquee/carousel.

```tsx
<BrandShowcaseSection />
```

---

### TechStackMarquee

**File:** `src/components/TechStackMarquee.tsx`

Technology icons scrolling marquee.

```tsx
<TechStackMarquee />
```

---

### ToolsCarousel

**File:** `src/components/ToolsCarousel.tsx`

Tools and technologies carousel.

```tsx
<ToolsCarousel />
```

---

### ToolsTechSection

**File:** `src/components/ToolsTechSection.tsx`

Technology stack grid display.

```tsx
<ToolsTechSection />
```

---

### MeetTheTeamSection

**File:** `src/components/MeetTheTeamSection.tsx`

Team member cards with photos and roles.

```tsx
<MeetTheTeamSection />
```

---

## 💬 Interactive Components

### WhatsAppChat

**File:** `src/components/WhatsAppChat.tsx`

Floating WhatsApp chat button.

```tsx
interface WhatsAppChatProps {
  phoneNumber: string;
  message?: string;
}

<WhatsAppChat phoneNumber="+1234567890" />
```

#### Features
- Floating action button
- Expandable chat preview
- Direct WhatsApp link

---

### ProjectInquiryPopup

**File:** `src/components/ProjectInquiryPopup.tsx`

Modal popup for quick project inquiries.

```tsx
interface ProjectInquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
}

<ProjectInquiryPopup 
  isOpen={showPopup} 
  onClose={() => setShowPopup(false)} 
/>
```

---

### MusicPlayer

**File:** `src/components/MusicPlayer.tsx`

Background music player with controls.

```tsx
<MusicPlayer />
```

#### Features
- Play/pause toggle
- Volume control
- Minimized/expanded states

---

### PreloaderNew

**File:** `src/components/PreloaderNew.tsx`

Initial loading animation on site visit.

```tsx
interface PreloaderNewProps {
  onLoadComplete: () => void;
}

<PreloaderNew onLoadComplete={() => setLoading(false)} />
```

---

### AnimatedCounter

**File:** `src/components/AnimatedCounter.tsx`

Animated number counter for statistics.

```tsx
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

<AnimatedCounter end={500} suffix="+" />
```

---

### AmbientParticles

**File:** `src/components/AmbientParticles.tsx`

Ambient particle animation background.

```tsx
<AmbientParticles />
```

---

### ContactForm

**File:** `src/components/ContactForm.tsx`

Reusable contact form with validation.

```tsx
interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

<ContactForm onSuccess={handleSuccess} />
```

---

## 📝 Blog Components

### BlogCard

**File:** `src/components/blog/BlogCard.tsx`

Blog post preview card.

```tsx
interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

<BlogCard post={post} />
```

---

### BlogSection

**File:** `src/components/blog/BlogSection.tsx`

Blog posts grid section.

```tsx
<BlogSection posts={posts} />
```

---

### BlogBreadcrumb

**File:** `src/components/blog/BlogBreadcrumb.tsx`

Breadcrumb navigation for blog posts.

```tsx
<BlogBreadcrumb category={post.category} title={post.title} />
```

---

### BlogReadingInfo

**File:** `src/components/blog/BlogReadingInfo.tsx`

Post metadata (author, date, reading time).

```tsx
<BlogReadingInfo 
  author={post.author}
  date={post.created_at}
  readTime={post.read_time}
/>
```

---

### BlogTableOfContents

**File:** `src/components/blog/BlogTableOfContents.tsx`

Sidebar table of contents with scroll tracking.

```tsx
<BlogTableOfContents content={post.content} />
```

---

### BlogSuggestionPopup

**File:** `src/components/blog/BlogSuggestionPopup.tsx`

Popup form for blog topic suggestions.

```tsx
<BlogSuggestionPopup 
  isOpen={showSuggestion} 
  onClose={() => setShowSuggestion(false)} 
/>
```

---

### CategoryFilter

**File:** `src/components/blog/CategoryFilter.tsx`

Blog category filter buttons.

```tsx
<CategoryFilter 
  categories={categories}
  selected={selectedCategory}
  onSelect={setSelectedCategory}
/>
```

---

### RelatedPosts

**File:** `src/components/blog/RelatedPosts.tsx`

Related posts recommendations.

```tsx
<RelatedPosts currentPost={post} posts={allPosts} />
```

---

### SocialShareButtons

**File:** `src/components/blog/SocialShareButtons.tsx`

Social media share buttons.

```tsx
<SocialShareButtons url={postUrl} title={post.title} />
```

---

### BlogPostModal

**File:** `src/components/blog/BlogPostModal.tsx`

Modal for quick blog post preview.

```tsx
<BlogPostModal 
  post={selectedPost}
  onClose={() => setSelectedPost(null)}
/>
```

---

## 📂 Portfolio Components

### ProjectDetailsModal

**File:** `src/components/portfolio/ProjectDetailsModal.tsx`

Detailed project case study modal.

```tsx
interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  date: string;
  technologies: string[];
  features: string[];
  challenge: string;
  solution: string;
  results: string[];
  imageUrl: string;
  galleryImages: string[];
  link?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

<ProjectDetailsModal 
  project={projectDetails}
  isOpen={isOpen}
  onClose={handleClose}
/>
```

#### Features
- Image gallery with navigation
- Project metadata cards
- Technology badges
- Challenge/Solution sections
- Results checklist
- Client testimonial
- CTA buttons

---

### CaseStudyModal

**File:** `src/components/portfolio/CaseStudyModal.tsx`

Alternative case study modal component.

---

## 📰 Newsletter Components

### NewsletterSection

**File:** `src/components/newsletter/NewsletterSection.tsx`

Newsletter subscription section with animation.

```tsx
<NewsletterSection />
```

---

### NewsletterForm

**File:** `src/components/newsletter/NewsletterForm.tsx`

Newsletter email subscription form.

```tsx
<NewsletterForm onSuccess={handleSubscribed} />
```

---

### NewsletterModel

**File:** `src/components/newsletter/NewsletterModel.tsx`

3D animated email model (Three.js).

```tsx
<NewsletterModel />
```

---

## 🛠️ Services Components

### ServicesHeroSection

**File:** `src/components/services/ServicesHeroSection.tsx`

Services page hero header.

---

### ServicesTabbedSection

**File:** `src/components/services/ServicesTabbedSection.tsx`

Tabbed service categories interface.

---

### ServicesFeaturedSection

**File:** `src/components/services/ServicesFeaturedSection.tsx`

Highlighted/featured services.

---

### ServicesListSection

**File:** `src/components/services/ServicesListSection.tsx`

Complete services listing.

---

### ServicesPathSection

**File:** `src/components/services/ServicesPathSection.tsx`

Service selection decision tree.

---

### ServicesCtaSection

**File:** `src/components/services/ServicesCtaSection.tsx`

Services call-to-action section.

---

### AdditionalServicesSection

**File:** `src/components/services/AdditionalServicesSection.tsx`

Additional/supplementary services.

---

### EnhancedServicesSection

**File:** `src/components/services/EnhancedServicesSection.tsx`

Premium service offerings.

---

### ServicePopup

**File:** `src/components/services/ServicePopup.tsx`

Service detail popup modal.

```tsx
<ServicePopup 
  service={selectedService}
  isOpen={isOpen}
  onClose={handleClose}
/>
```

---

## 🏆 Success Stories Components

### SuccessStoryCard

**File:** `src/components/success-stories/SuccessStoryCard.tsx`

Case study preview card.

```tsx
<SuccessStoryCard story={story} onClick={handleClick} />
```

---

### EnhancedCaseStudyModal

**File:** `src/components/success-stories/EnhancedCaseStudyModal.tsx`

Detailed case study modal with gallery.

```tsx
<EnhancedCaseStudyModal 
  story={story}
  onClose={handleClose}
/>
```

---

### IndustryFilter

**File:** `src/components/success-stories/IndustryFilter.tsx`

Industry category filter for browsing success stories by industry.

> ⚠️ **NOTE:** This component is currently **commented out** in the Success Stories page (`src/pages/SuccessStories.tsx`). 
> To re-enable the "Browse by Industry" feature, uncomment the `<IndustryFilter>` section in the page file.

```tsx
// Currently commented out in SuccessStories.tsx:
<IndustryFilter
  industries={industries}
  activeIndustry={activeIndustry}
  onIndustryChange={setActiveIndustry}
/>
```

---

### ServiceFilter

**File:** `src/components/success-stories/ServiceFilter.tsx`

Service type filter for browsing success stories by service category.

> ⚠️ **NOTE:** This component is currently **commented out** in the Success Stories page (`src/pages/SuccessStories.tsx`). 
> To re-enable the "Filter by Service" feature, uncomment the `<ServiceFilter>` section in the page file.

```tsx
// Currently commented out in SuccessStories.tsx:
<ServiceFilter 
  services={services} 
  activeFilter={filter} 
  onFilterChange={setFilter} 
/>
```

---

### IndustrySuccessMetrics

**File:** `src/components/success-stories/IndustrySuccessMetrics.tsx`

Industry-specific success statistics.

---

## 🔧 Tool Components

### MetaTagGenerator

**File:** `src/components/tools/MetaTagGenerator.tsx`

SEO meta tag generator tool.

---

### SchemaMarkupGenerator

**File:** `src/components/tools/SchemaMarkupGenerator.tsx`

JSON-LD schema markup generator.

---

### QRCodeGenerator

**File:** `src/components/tools/QRCodeGenerator.tsx`

QR code generator with customization.

---

### SitemapGenerator

**File:** `src/components/tools/SitemapGenerator.tsx`

XML sitemap generator.

---

### RobotsTxtGenerator

**File:** `src/components/tools/RobotsTxtGenerator.tsx`

Robots.txt file generator.

---

### LoremIpsumGenerator

**File:** `src/components/tools/LoremIpsumGenerator.tsx`

Placeholder text generator.

---

### GradientGenerator

**File:** `src/components/tools/GradientGenerator.tsx`

CSS gradient generator with preview.

---

### KeywordDensityChecker

**File:** `src/components/tools/KeywordDensityChecker.tsx`

Keyword density analysis tool.

---

## 👤 Admin Components

### BlogPostEditor

**File:** `src/components/admin/BlogPostEditor.tsx`

Rich text blog post editor.

```tsx
<BlogPostEditor 
  post={existingPost}  // null for new post
  onSave={handleSave}
  onCancel={handleCancel}
/>
```

---

### ResourceManager

**File:** `src/components/admin/ResourceManager.tsx`

Resource upload and management form.

```tsx
<ResourceManager 
  resource={existingResource}
  onSave={handleSave}
  onClose={handleClose}
/>
```

---

## 🔐 Auth Components

### AnimatedAuthIcon

**File:** `src/components/auth/AnimatedAuthIcon.tsx`

Animated lock/key icon for auth pages.

---

### AuthBackground

**File:** `src/components/auth/AuthBackground.tsx`

Animated background for authentication pages.

---

## 📊 Infographic Components

### AgencyStatsInfoGraphic

**File:** `src/components/infographics/AgencyStatsInfoGraphic.tsx`

Animated agency statistics display.

```tsx
<AgencyStatsInfoGraphic />
```

---

## 💬 Testimonial Components

### ChatStyleTestimonial

**File:** `src/components/ChatStyleTestimonial.tsx`

Chat bubble style testimonial display.

---

### AnimatedTestimonialIllustration

**File:** `src/components/testimonials/AnimatedTestimonialIllustration.tsx`

Animated illustration for testimonials section.

---

## 📚 Resource Components

### ResourceLibrary

**File:** `src/components/resources/ResourceLibrary.tsx`

Resource browsing and download library.

---

## 🎨 UI Base Components (shadcn/ui)

Located in `src/components/ui/`, these are base components from shadcn/ui:

| Component | File | Purpose |
|-----------|------|---------|
| Button | `button.tsx` | Action buttons with variants |
| Input | `input.tsx` | Text input fields |
| Textarea | `textarea.tsx` | Multi-line text input |
| Select | `select.tsx` | Dropdown selection |
| Checkbox | `checkbox.tsx` | Boolean checkbox |
| Switch | `switch.tsx` | Toggle switch |
| Card | `card.tsx` | Content container cards |
| Dialog | `dialog.tsx` | Modal dialogs |
| Sheet | `sheet.tsx` | Slide-out panels |
| Tabs | `tabs.tsx` | Tabbed content |
| Accordion | `accordion.tsx` | Expandable sections |
| Badge | `badge.tsx` | Status/label badges |
| Alert | `alert.tsx` | Alert messages |
| AlertDialog | `alert-dialog.tsx` | Confirmation dialogs |
| Toast | `toast.tsx` | Notifications |
| Popover | `popover.tsx` | Floating content |
| Tooltip | `tooltip.tsx` | Hover tooltips |
| Form | `form.tsx` | Form wrapper with validation |
| Table | `table.tsx` | Data tables |
| Avatar | `avatar.tsx` | User avatars |
| Progress | `progress.tsx` | Progress bars |
| Skeleton | `skeleton.tsx` | Loading placeholders |
| Separator | `separator.tsx` | Visual dividers |

### Button Variants

```tsx
<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

---

## 📝 Component Template

When creating a new component:

```tsx
/**
 * ComponentName - Brief description
 * 
 * @description Detailed description of the component's purpose and usage
 * @example
 * <ComponentName 
 *   requiredProp="value"
 *   optionalProp={true}
 * />
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ComponentNameProps {
  /** Description of required prop */
  requiredProp: string;
  /** Description of optional prop */
  optionalProp?: boolean;
  /** Callback when action occurs */
  onAction?: () => void;
}

const ComponentName: React.FC<ComponentNameProps> = ({
  requiredProp,
  optionalProp = false,
  onAction,
}) => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(true);
    onAction?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-class"
    >
      <h2>{requiredProp}</h2>
      {optionalProp && <p>Optional content</p>}
      <Button onClick={handleClick}>Action</Button>
    </motion.div>
  );
};

export default ComponentName;
```

---

*Last updated: December 2024*
