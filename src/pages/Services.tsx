import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Search, Code, Palette, Rocket, Target, Zap } from "lucide-react";

// Components
import ScrollToTop from "@/components/ScrollToTop";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import ServicesHeroSection from "@/components/services/ServicesHeroSection";
import ServicesTabbedSection from "@/components/services/ServicesTabbedSection";
import ServicesFeaturedSection from "@/components/services/ServicesFeaturedSection";
import ServicesPathSection from "@/components/services/ServicesPathSection";

import ServicesCtaSection from "@/components/services/ServicesCtaSection";
import AgencyStatsInfoGraphic from "@/components/infographics/AgencyStatsInfoGraphic";
import ServicesListSection from "@/components/services/ServicesListSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import AdditionalServicesSection from "@/components/services/AdditionalServicesSection";
import EnhancedServicesSection from "@/components/services/EnhancedServicesSection";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import ProcessTimelineSection from "@/components/ProcessTimelineSection";
import ProjectInquiryPopup from "@/components/ProjectInquiryPopup";

const processSteps = [
  {
    number: 1,
    icon: <Search className="w-8 h-8 text-yellow-400" />,
    title: "Discovery",
    description: "We analyze your business needs and goals to create a tailored strategy."
  },
  {
    number: 2,
    icon: <Palette className="w-8 h-8 text-yellow-400" />,
    title: "Design",
    description: "Our creative team designs stunning visuals that align with your brand."
  },
  {
    number: 3,
    icon: <Code className="w-8 h-8 text-yellow-400" />,
    title: "Development",
    description: "We build robust, scalable solutions using cutting-edge technologies."
  },
  {
    number: 4,
    icon: <Target className="w-8 h-8 text-yellow-400" />,
    title: "Testing",
    description: "Rigorous quality assurance ensures everything works flawlessly."
  },
  {
    number: 5,
    icon: <Rocket className="w-8 h-8 text-yellow-400" />,
    title: "Launch",
    description: "We deploy your solution and ensure a smooth go-live experience."
  },
  {
    number: 6,
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Growth",
    description: "Ongoing optimization and support to scale your success."
  }
];

const Services = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // JSON-LD structured data for services
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Services",
    "provider": {
      "@type": "Organization",
      "name": "DigiSpark",
      "url": "https://yourdomain.com"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Custom web development solutions using modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing",
            "description": "Comprehensive digital marketing strategies for growth"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services",
            "description": "Search engine optimization to improve online visibility"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "HubSpot CRM",
            "description": "HubSpot CRM implementation and optimization"
          }
        }
      ]
    }
  };

  return (
    <div className="bg-black transition-all duration-500 ease-in-out relative">
      <Helmet>
        <title>Our Services | DigiSpark</title>
        <meta name="description" content="Comprehensive digital services including HubSpot CRM, Web Development, SEO, Virtual Assistance, Digital Marketing, and Video Production, tailored to transform your business." />
        <meta name="keywords" content="HubSpot CRM, web development, SEO services, virtual assistance, digital marketing, video production, UI/UX design, e-commerce solutions, content marketing, PPC campaigns" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta property="og:title" content="Our Services | DigiSpark" />
        <meta property="og:description" content="Transform your business with our comprehensive digital services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/services" />
        <meta property="og:image" content="https://yourdomain.com/images/services-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services | DigiSpark" />
        <meta name="twitter:description" content="Transform your business with our comprehensive digital services." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DigiSpark Team" />
        <link rel="canonical" href="https://yourdomain.com/services" />
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>
      
      <Navbar />
      <ServicesHeroSection />
      
      {/* Interactive services exploration section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ServicesTabbedSection />
      </motion.div>
      
      {/* Visual process explanation - Using ProcessSection from home page */}
      <ProcessSection />
      
      {/* Interactive Timeline Section */}
      <ProcessTimelineSection 
        title="Our"
        titleHighlight="Process"
        subtitle="Follow our proven methodology for delivering exceptional results"
        processes={processSteps}
        darkMode={true}
      />
      
      {/* New Enhanced Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <EnhancedServicesSection />
      </motion.div>
      
      {/* Complete services list */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ServicesListSection />
      </motion.div>
      
      {/* Feature spotlight with rotating showcase */}
      <ServicesFeaturedSection />
      
      {/* Additional services section */}
      <AdditionalServicesSection />
      
      {/* Technology Stack Section - Added TechStackMarquee component */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <TechStackMarquee />
      </motion.div>
      
      {/* Agency stats visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <AgencyStatsInfoGraphic />
      </motion.div>
      
      {/* Newsletter section */}
      <NewsletterSection />
      
      {/* Client path selection */}
      <ServicesPathSection />
      
      {/* Final call-to-action */}
      <ServicesCtaSection />
      
      {/* Contact section for immediate inquiries */}
      <ContactSection />
      
      {/* Project Inquiry Popup */}
      <ProjectInquiryPopup />
      
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Services;
