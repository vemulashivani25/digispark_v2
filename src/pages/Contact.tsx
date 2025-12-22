/**
 * ============================================================================
 * Contact Page
 * ============================================================================
 * 
 * Contact page with contact information cards, embedded Google Map,
 * contact form, and newsletter subscription.
 * 
 * Features:
 * - Animated contact info cards (Email, Phone, Address, Hours)
 * - Embedded Google Maps iframe
 * - Contact form section
 * - Newsletter subscription
 * - SEO optimized with Helmet meta tags
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 * ============================================================================
 */

import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import PageHeader from "@/components/PageHeader";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Contact information cards with illustrations
  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll get back to you within 24 hours.",
      content: "hello@digispark.com",
      color: "from-blue-600/20 to-blue-800/10"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our friendly support team.",
      content: "+1 (555) 123-4567",
      color: "from-green-600/20 to-green-800/10"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our headquarters.",
      content: "123 Innovation Way, San Francisco, CA 94107",
      color: "from-purple-600/20 to-purple-800/10"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're available when you need us.",
      content: "Monday - Friday: 9am - 6pm PST",
      color: "from-yellow-600/20 to-yellow-800/10"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Contact DigiSpark | HubSpot CRM & Digital Agency Experts</title>
        <meta name="description" content="Contact DigiSpark for HubSpot CRM implementation, cold email marketing, Zoom support, video editing, and web development services. Get a free consultation and quote for your project." />
        <meta name="keywords" content="contact DigiSpark, HubSpot CRM consultation, cold email marketing agency, digital agency contact, web development quote, video editing services contact, marketing automation help" />
        
        <meta property="og:title" content="Contact DigiSpark | Get Your Free Consultation" />
        <meta property="og:description" content="Reach out to discuss HubSpot CRM, cold email campaigns, video editing, or web development for your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        <meta property="og:image" content="https://yourdomain.com/images/contact-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DigiSpark Team" />
        <link rel="canonical" href="https://yourdomain.com/contact" />
      </Helmet>

      <Navbar />
      
      <PageHeader 
        title="Contact Us"
        description="We're here to help you transform your digital presence. Let's start a conversation about your project."
        bgImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1200"
      />

      <div className="py-16 relative bg-black">
        <div className="container mx-auto px-4 relative z-10">

          {/* Get in touch section with illustrations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-xl p-6 h-full relative overflow-hidden">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/5 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    
                    <div className="flex items-start gap-5">
                      <motion.div 
                        className="p-3 rounded-lg bg-gray-800/70 border border-gray-700/50 relative z-10"
                        whileHover={{ scale: 1.05 }}
                        animate={{ 
                          boxShadow: ["0 0 0 rgba(234, 179, 8, 0.1)", "0 0 20px rgba(234, 179, 8, 0.2)", "0 0 0 rgba(234, 179, 8, 0.1)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <card.icon className="h-8 w-8 text-yellow-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-gray-400 mb-3">{card.description}</p>
                        <div className="font-medium text-yellow-400">{card.content}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-gray-900/30 backdrop-blur-sm p-6 md:p-10 rounded-xl border border-gray-800/50 mb-16 relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
                <div className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
                <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              </div>
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0376546235167!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085d2d3c5c1%3A0x317bd43e0e17d5f4!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1587567456640!5m2!1sen!2sus"
                className="w-full h-[400px] rounded-lg border-0 relative z-10"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DigiSpark Location Map"
                aria-label="Map showing the location of our agency"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      <ContactSection />
      
      {/* Add Newsletter Section */}
      <NewsletterSection />
      
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
