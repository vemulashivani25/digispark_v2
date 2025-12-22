/**
 * ============================================================================
 * App.tsx - Main Application Component
 * ============================================================================
 *
 * This is the root component that handles:
 * - Route configuration and lazy loading for performance optimization
 * - Global providers (Auth, Helmet for SEO)
 * - Preloader animation on initial load
 * - Global components like WhatsApp chat and Toast notifications
 *
 * Architecture:
 * - Uses React.lazy() for code splitting to reduce initial bundle size
 * - Suspense provides loading fallback while chunks are loaded
 * - LazyMotion from framer-motion reduces animation bundle size
 *
 * @author DigiSpark Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import PreloaderNew from "./components/PreloaderNew";
import WhatsAppChat from "./components/WhatsAppChat";
import ReadingProgressBar from "./components/ReadingProgressBar";
import { Toaster } from "@/components/ui/toaster";

// ============================================================================
// DIRECT PAGE IMPORTS - For seamless page transitions
// ============================================================================

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import SuccessStories from "./pages/SuccessStories";
import Portfolio from "./pages/Portfolio";
import TestimonialsPage from "./pages/TestimonialsPage";
import ProjectQuote from "./pages/ProjectQuote";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import NewsletterPreview from "./pages/NewsletterPreview";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Faq from "./pages/Faq";
import Tools from "./pages/Tools";
import ProjectDetail from "./pages/ProjectDetail";
import Documentation from "./pages/Documentation";
import ClientDashboard from "./pages/ClientDashboard";

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
/**
 * Main application component
 * Handles initial loading state, routing, and global providers
 */
const App = () => {
  // Controls the preloader visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show preloader for 3 seconds on initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <HelmetProvider>
        {/* Default SEO meta tags - Override in individual pages */}
        <Helmet>
          <title>DigiSpark | Expert Digital Solutions</title>
          <meta
            name="description"
            content="DigiSpark - Comprehensive digital services including web development, digital marketing, SEO, design, and more."
          />
        </Helmet>

        {/* Show preloader on initial load */}
        {loading ? (
          <PreloaderNew onLoadComplete={() => setLoading(false)} />
        ) : (
          // LazyMotion reduces framer-motion bundle by loading only DOM animations
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <Routes>
                {/* ========== PUBLIC ROUTES ========== */}

                {/* Main pages */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />

                {/* Work & Portfolio */}
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/projectsdata/:projectId" element={<ProjectDetail />} />
                <Route path="/project-details" element={<ProjectDetail />} />

                {/* Blog */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Resources & Tools */}
                <Route path="/resources" element={<Resources />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/project-quote" element={<ProjectQuote />} />
                <Route path="/newsletter-preview" element={<NewsletterPreview />} />

                {/* ========== AUTH ROUTES ========== */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<ClientDashboard />} />

                {/* ========== FALLBACK ========== */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </LazyMotion>
        )}

        {/* Global reading progress bar - visible after preloader */}
        {!loading && <ReadingProgressBar />}

        {/* Global WhatsApp floating button - visible after preloader */}
        {!loading && <WhatsAppChat phoneNumber="+1234567890" />}

        {/* Global toast notification container */}
        <Toaster />
      </HelmetProvider>
    </AuthProvider>
  );
};

export default App;
