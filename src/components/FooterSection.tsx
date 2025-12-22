/**
 * ============================================================================
 * FooterSection.tsx - Site Footer Component
 * ============================================================================
 * 
 * Full-width footer containing:
 * - Company information and logo
 * - Navigation links organized by category (Quick Links, Services, Resources)
 * - Social media links (Facebook, Twitter, Instagram, LinkedIn)
 * - Newsletter signup form
 * - Contact information (email, phone, address)
 * - Copyright and legal links
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 */

import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { toast } from "./ui/use-toast";
import { mediumTap, successFeedback } from "@/utils/hapticFeedback";
import { triggerSuccessConfetti } from "@/utils/confetti";
import { supabase } from "@/integrations/supabase/client";

// Lazy load 3D model for performance
const Newsletter3DModel = lazy(() => import("./newsletter/Newsletter3DModel"));

const FooterSection = () => {
  const [emailValue, setEmailValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    mediumTap();
    setIsSubmitting(true);
    
    try {
      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from('newsletter_subscriptions')
        .select('id, is_active')
        .eq('email', emailValue.toLowerCase().trim())
        .maybeSingle();
      
      if (existingEmail) {
        if (existingEmail.is_active) {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter!",
          });
        } else {
          // Reactivate subscription
          await supabase
            .from('newsletter_subscriptions')
            .update({ is_active: true })
            .eq('id', existingEmail.id);
          
          toast({
            title: "Welcome back!",
            description: "Your subscription has been reactivated!",
          });
          triggerSuccessConfetti();
          successFeedback();
        }
      } else {
        // Insert new subscription
        const { error } = await supabase
          .from('newsletter_subscriptions')
          .insert({ 
            email: emailValue.toLowerCase().trim(),
            is_active: true 
          });
        
        if (error) throw error;
        
        toast({
          title: "Success! 🎉",
          description: "You've successfully subscribed to our newsletter!",
        });
        triggerSuccessConfetti();
        successFeedback();
      }
      
      setEmailValue("");
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Our Services",
      links: [
        { name: "Web Development", href: "/services#web-development" },
        { name: "HubSpot CRM", href: "/services#hubspot-crm" },
        { name: "SEO Optimization", href: "/services#seo" },
        { name: "Digital Marketing", href: "/services#marketing" },
        { name: "UI/UX Design", href: "/services#design" },
        { name: "Content Creation", href: "/services#content" },
      ]
    },
    {
      title: "Recent Posts",
      posts: [
        { title: "10 SEO Strategies for 2025", date: "April 18, 2025", href: "/blog/seo-strategies-2025" },
        { title: "The Future of Web Development", date: "April 12, 2025", href: "/blog/future-web-development" },
        { title: "Why CRM is Essential for Growth", date: "April 5, 2025", href: "/blog/crm-essential-growth" },
      ]
    }
  ];
  
  return (
    <footer className="bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-black/70 backdrop-blur-sm pointer-events-none"></div>
      <div className="absolute w-[40rem] h-[40rem] bg-yellow-400/3 rounded-full blur-3xl top-0 right-0 animate-pulse-slow"></div>
      <div className="absolute w-[30rem] h-[30rem] bg-blue-400/3 rounded-full blur-3xl -bottom-10 -left-10 animate-pulse-slow"></div>
      
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 relative">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl backdrop-blur-sm p-6 sm:p-8 md:p-10 border border-gray-700/50 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
              {/* 3D Model - Left Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block"
              >
                <Suspense fallback={
                  <div className="w-full h-64 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                  </div>
                }>
                  <Newsletter3DModel />
                </Suspense>
              </motion.div>

              {/* Text Content - Center */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Stay updated with our latest insights, trends, and announcements in digital marketing and technology.
                </p>
              </motion.div>

              {/* Form - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[48px] text-base"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    required
                    aria-label="Email for newsletter"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-6 py-3 rounded-lg transition-colors min-h-[48px] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>
                <p className="mt-3 text-gray-400 text-xs sm:text-sm text-center lg:text-left">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 border-b border-gray-800 pb-3">About Us</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              We're a full-service digital agency helping businesses transform their online presence through innovative solutions and strategic thinking.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0" />
                <a href="mailto:hello@digitalagency.com" className="hover:text-yellow-400 transition-colors text-sm sm:text-base break-all">
                  hello@digitalagency.com
                </a>
              </div>
              <div className="flex items-start text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-yellow-400 transition-colors text-sm sm:text-base">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base">
                  123 Digital Avenue, Creative District<br />
                  San Francisco, CA 94103
                </span>
              </div>
            </div>
          </div>
          
          {footerLinks.map((column, idx) => (
            <div key={column.title}>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 border-b border-gray-800 pb-3">
                {column.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {column.links && column.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group text-sm sm:text-base py-1"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 text-yellow-400/50 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      {link.name}
                    </a>
                  </li>
                ))}
                
                {column.posts && column.posts.map((post) => (
                  <li key={post.title}>
                    <a href={post.href} className="group block py-1">
                      <h4 className="font-medium text-gray-300 group-hover:text-yellow-400 transition-colors text-sm sm:text-base">
                        {post.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">{post.date}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          <a href="#" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://discord.gg/lovable-dev" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300" title="Discord">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300" title="Fiverr">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61V11.79h1.61v.74a1.47 1.47 0 0 1 1.376-.74c.735 0 1.297.357 1.418 1.01h.02c.222-.577.764-1.01 1.506-1.01h.504v1.093zm-7.34 0h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61V11.79h1.61v.74a1.47 1.47 0 0 1 1.376-.74c.735 0 1.297.357 1.418 1.01h.02c.222-.577.764-1.01 1.506-1.01h.504v1.093zm-7.831.84c0-.453-.358-.81-.81-.81-.453 0-.81.357-.81.81v2.16H3.607v-3.558h1.61v.567h.02c.268-.397.684-.653 1.227-.653 1.01 0 1.735.853 1.735 1.96v1.684h-1.61v-2.16h-.752zm-4.53-2.809a.983.983 0 0 1-.984-.983c0-.544.44-.984.984-.984.543 0 .983.44.983.984s-.44.983-.983.983zm-.805 2.809v-2.809h1.61v2.809h-1.61z"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Copyright Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Digital Agency. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-gray-500 text-sm hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-500 text-sm hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="/sitemap" className="text-gray-500 text-sm hover:text-yellow-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
