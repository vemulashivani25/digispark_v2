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

  // JSON-LD structured data for services - Enhanced for target keywords
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Agency Services",
    "provider": {
      "@type": "Organization",
      "name": "DigiSpark",
      "url": "https://digispark.agency"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Professional Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "HubSpot CRM Implementation",
            "description": "Expert HubSpot CRM setup, customization, integration, and training. Optimize your sales pipeline, automate marketing workflows, and improve customer relationships with our certified HubSpot solutions."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Automation",
            "description": "Streamline your marketing with automated email sequences, lead nurturing workflows, CRM automation, and sales pipeline optimization. Increase conversions with data-driven automation strategies."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cold Email Marketing",
            "description": "Strategic B2B cold email outreach campaigns for lead generation. Includes prospect research, email copywriting, deliverability optimization, and campaign analytics for maximum response rates."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Zoom Virtual Support",
            "description": "Professional Zoom meeting management, virtual assistance, webinar support, and remote meeting coordination. Ensure flawless virtual events and meetings with expert technical support."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video & Audio Editing",
            "description": "Professional video editing, audio production, podcast editing, and multimedia content creation. Transform raw footage into polished, engaging content that captivates your audience."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "Custom responsive website design and development using React, Next.js, and modern technologies. Create fast, SEO-optimized websites that convert visitors into customers."
          }
        }
      ]
    }
  };

  return (
    <div className="bg-black transition-all duration-500 ease-in-out relative">
      <Helmet>
        <title>HubSpot CRM, Cold Email Marketing & Web Development Services | DigiSpark</title>
        <meta name="description" content="DigiSpark offers expert HubSpot CRM implementation, marketing automation, cold email campaigns, Zoom virtual support, professional video/audio editing, and custom website development. Get a free consultation for your project." />
        <meta name="keywords" content="HubSpot CRM implementation, HubSpot partner, marketing automation services, cold email marketing, cold outreach campaigns, B2B lead generation, Zoom support services, virtual assistance, video editing services, audio editing, podcast editing, website development, web design agency, custom web development, responsive websites, digital marketing services, CRM integration, sales automation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        <meta property="og:title" content="HubSpot CRM, Cold Email Marketing & Web Development | DigiSpark" />
        <meta property="og:description" content="Expert HubSpot CRM, cold email campaigns, Zoom support, video editing & custom web development. Transform your business today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digispark.agency/services" />
        <meta property="og:image" content="https://digispark.agency/og-services.jpg" />
        <meta property="og:site_name" content="DigiSpark Agency" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HubSpot CRM & Digital Services | DigiSpark" />
        <meta name="twitter:description" content="Expert HubSpot CRM, cold email marketing, Zoom support, video editing & web development." />
        <meta name="twitter:image" content="https://digispark.agency/og-services.jpg" />
        
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="DigiSpark Agency" />
        <link rel="canonical" href="https://digispark.agency/services" />
        
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
