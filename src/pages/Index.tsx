/**
 * ============================================================================
 * Index.tsx - Home Page / Landing Page
 * ============================================================================
 * 
 * Main landing page showcasing all key sections of the DigiSpark agency.
 * This page serves as the primary entry point for visitors and includes:
 * 
 * SECTIONS (in order):
 * 1. Navbar - Main navigation with dropdowns
 * 2. HeroSection - Main hero with tagline and CTAs
 * 3. CoreServicesSection - Key service offerings grid
 * 4. ServicesSection - Detailed services overview
 * 5. AgencyStatsInfoGraphic - Statistics and metrics
 * 6. ProcessTimelineSection - How we work process
 * 7. ToolsTechSection - Technologies we use
 * 8. TechStackMarquee - Animated tech logos
 * 9. PortfolioSection - Featured projects
 * 10. TestimonialsSection - Client reviews
 * 11. BrandShowcaseSection - Client logos
 * 12. BlogSection - Latest blog posts
 * 13. GlobalPresenceSection - World map with locations
 * 14. NewsletterSection - Email subscription
 * 15. ContactSection - Contact form
 * 16. FooterSection - Site footer with links
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 */

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { 
  Lightbulb, 
  Search, 
  PenTool, 
  Code, 
  TestTube, 
  Rocket 
} from "lucide-react";

// ============================================================================
// COMPONENT IMPORTS
// ============================================================================

/** Navigation bar with dropdown menus */
import Navbar from "@/components/Navbar";

/** Hero section with main headline and CTAs */
import HeroSection from "@/components/HeroSection";

/** Grid of core service offerings */
import CoreServicesSection from "@/components/CoreServicesSection";

/** Detailed services overview with icons */
import ServicesSection from "@/components/ServicesSection";

/** Animated statistics and metrics display */
import AgencyStatsInfoGraphic from "@/components/infographics/AgencyStatsInfoGraphic";

/** Step-by-step process timeline */
import ProcessTimelineSection from "@/components/ProcessTimelineSection";

/** Technology stack with icons */
import EnhancedToolsTechSection from "@/components/ToolsTechSection";

/** Scrolling tech logo marquee */
import TechStackMarquee from "@/components/TechStackMarquee";

/** Portfolio project showcase grid */
import PortfolioSection from "@/components/PortfolioSection";

/** Client testimonials carousel */
import TestimonialsSection from "@/components/TestimonialsSection";

/** Client brand logos showcase */
import BrandShowcaseSection from "@/components/BrandShowcaseSection";

/** Latest blog posts preview */
import BlogSection from "@/components/blog/BlogSection";

/** Interactive world map with office locations */
import GlobalPresenceSection from "@/components/GlobalPresenceSection";

/** Newsletter email subscription form */
import NewsletterSection from "@/components/newsletter/NewsletterSection";

/** Contact form section */
import ContactSection from "@/components/ContactSection";

/** Site footer with links and social */
import FooterSection from "@/components/FooterSection";

/** Floating scroll-to-top button */
import ScrollToTop from "@/components/ScrollToTop";

/** Popup for project inquiry */
import ProjectInquiryPopup from "@/components/ProjectInquiryPopup";

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/** Reusable fade-in animation props for sections */
const fadeInAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

// ============================================================================
// PROCESS STEPS DATA
// ============================================================================

/** Process steps for the timeline section */
const processSteps = [
  {
    number: 1,
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Discovery",
    description: "We start by understanding your goals, target audience, and business requirements."
  },
  {
    number: 2,
    icon: <Search className="w-8 h-8 text-yellow-500" />,
    title: "Research",
    description: "Deep dive into market analysis, competitor research, and user behavior patterns."
  },
  {
    number: 3,
    icon: <PenTool className="w-8 h-8 text-yellow-500" />,
    title: "Design",
    description: "Create stunning visuals and intuitive user experiences that captivate your audience."
  },
  {
    number: 4,
    icon: <Code className="w-8 h-8 text-yellow-500" />,
    title: "Development",
    description: "Build robust, scalable solutions using cutting-edge technologies and best practices."
  },
  {
    number: 5,
    icon: <TestTube className="w-8 h-8 text-yellow-500" />,
    title: "Testing",
    description: "Rigorous quality assurance to ensure flawless performance across all devices."
  },
  {
    number: 6,
    icon: <Rocket className="w-8 h-8 text-yellow-500" />,
    title: "Launch",
    description: "Deploy your project with ongoing support and optimization for continued success."
  }
];

// ============================================================================
// INDEX PAGE COMPONENT
// ============================================================================

const Index = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="bg-black">
      {/* ========== SEO META TAGS ========== */}
      <Helmet>
        <title>DigiSpark | Creative Solutions for Modern Businesses</title>
        <meta
          name="description"
          content="DigiSpark - We're a full-service digital agency specializing in web development, digital marketing, SEO, and creative solutions for businesses of all sizes."
        />
        <meta
          name="keywords"
          content="digital agency, web development, digital marketing, SEO, creative agency, HubSpot CRM, user experience, UI/UX design"
        />
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="DigiSpark | Creative Solutions for Modern Businesses" />
        <meta property="og:description" content="Transform your brand with our innovative digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/images/home-og.jpg" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DigiSpark | Creative Solutions for Modern Businesses" />
        <meta name="twitter:description" content="Transform your brand with our innovative digital solutions." />
        {/* SEO directives */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DigiSpark Team" />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

      {/* ========== NAVIGATION ========== */}
      <Navbar />
      
      {/* ========== HERO SECTION ========== */}
      <HeroSection />

      {/* ========== CORE SERVICES ========== */}
      <motion.div {...fadeInAnimation}>
        <CoreServicesSection />
      </motion.div>

      {/* ========== DETAILED SERVICES ========== */}
      <motion.div {...fadeInAnimation}>
        <ServicesSection />
      </motion.div>

      {/* ========== AGENCY STATISTICS ========== */}
      <AgencyStatsInfoGraphic />

      {/* ========== PROCESS TIMELINE ========== */}
      <motion.div {...fadeInAnimation}>
        <ProcessTimelineSection 
          title="Our"
          titleHighlight="Process"
          subtitle="A proven methodology that delivers results every time"
          processes={processSteps}
          darkMode={true}
        />
      </motion.div>

      {/* ========== TECHNOLOGY STACK ========== */}
      <motion.div {...fadeInAnimation}>
        <EnhancedToolsTechSection />
      </motion.div>

      {/* ========== TECH MARQUEE ========== */}
      <motion.div {...fadeInAnimation}>
        <TechStackMarquee />
      </motion.div>

      {/* ========== PORTFOLIO ========== */}
      <motion.div {...fadeInAnimation}>
        <PortfolioSection />
      </motion.div>

      {/* ========== TESTIMONIALS ========== */}
      <TestimonialsSection />

      {/* ========== BRAND SHOWCASE ========== */}
      <BrandShowcaseSection />

      {/* ========== BLOG PREVIEW ========== */}
      <BlogSection />

      {/* ========== GLOBAL PRESENCE ========== */}
      <GlobalPresenceSection />

      {/* ========== NEWSLETTER ========== */}
      <NewsletterSection />

      {/* ========== CONTACT FORM ========== */}
      <ContactSection />

      {/* ========== FOOTER ========== */}
      <FooterSection />
      
      {/* ========== FLOATING COMPONENTS ========== */}
      <ScrollToTop />
      <ProjectInquiryPopup />
    </div>
  );
};

export default Index;
