/**
 * ============================================================================
 * Pages Index - Barrel Export File
 * ============================================================================
 * 
 * Central export point for all page components.
 * Enables cleaner imports and better code organization.
 * 
 * Usage: import { Index, About, Services } from '@/pages';
 * 
 * ROUTE MAPPING:
 * ─────────────────────────────────────────────────────────────────────────────
 * Page Component      | Route              | Description
 * ─────────────────────────────────────────────────────────────────────────────
 * Index               | /                  | Home/Landing page
 * About               | /about             | Company information
 * Services            | /services          | Services offered
 * Portfolio           | /portfolio         | Project portfolio
 * ProjectDetail       | /project-details   | Detailed project view
 * Blog                | /blog              | Blog listing
 * BlogPost            | /blog/:slug        | Individual blog post
 * Contact             | /contact           | Contact page
 * Faq                 | /faq               | FAQ page
 * SuccessStories      | /success-stories   | Case studies
 * Resources           | /resources         | Resource library
 * Tools               | /tools             | SEO/Marketing tools
 * ProjectQuote        | /project-quote     | Quote request form
 * TestimonialsPage    | /testimonials      | Testimonials page
 * Auth                | /auth              | Authentication
 * Admin               | /admin             | Admin dashboard
 * NewsletterPreview   | /newsletter-preview| Newsletter preview
 * Documentation       | /documentation     | Project docs
 * NotFound            | *                  | 404 page
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 * ============================================================================
 */

// ============================================================================
// PUBLIC PAGES
// ============================================================================

/** Home/Landing page - Main entry point */
export { default as Index } from './Index';

/** About page - Company story, values, team */
export { default as About } from './About';

/** Services page - All service offerings */
export { default as Services } from './Services';

/** Portfolio page - Project showcase */
export { default as Portfolio } from './Portfolio';

/** Project Detail page - Individual project view */
export { default as ProjectDetail } from './ProjectDetail';

/** Blog listing page - All blog posts */
export { default as Blog } from './Blog';

/** Individual blog post page */
export { default as BlogPost } from './BlogPost';

/** Contact page - Contact form and info */
export { default as Contact } from './Contact';

/** FAQ page - Frequently asked questions */
export { default as Faq } from './Faq';

/** Success Stories page - Case studies */
export { default as SuccessStories } from './SuccessStories';

/** Resources page - Downloadable resources */
export { default as Resources } from './Resources';

/** Tools page - SEO and marketing tools */
export { default as Tools } from './Tools';

/** Project Quote page - Quote request form */
export { default as ProjectQuote } from './ProjectQuote';

/** Testimonials page - Client testimonials */
export { default as TestimonialsPage } from './TestimonialsPage';

// ============================================================================
// AUTH & ADMIN PAGES
// ============================================================================

/** Authentication page - Login/Register */
export { default as Auth } from './Auth';

/** Admin dashboard - Content management */
export { default as Admin } from './Admin';

// ============================================================================
// UTILITY PAGES
// ============================================================================

/** Newsletter preview page */
export { default as NewsletterPreview } from './NewsletterPreview';

/** Documentation page - Project documentation */
export { default as Documentation } from './Documentation';

/** 404 Not Found page */
export { default as NotFound } from './NotFound';
