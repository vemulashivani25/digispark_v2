
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code, 
  Database, 
  Search, 
  MessageCircle, 
  Mail, 
  Headphones, 
  Layout, 
  LineChart, 
  ShoppingCart, 
  MousePointer, 
  PenTool,
  Smile,
  Zap,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  color: string;
  benefits: string[];
  subservices: string[];
}

const services: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    tagline: "Stunning websites that convert",
    description: "Custom-built responsive websites and web applications optimized for performance, user experience, and business growth.",
    icon: Code,
    color: "blue",
    benefits: [
      "Responsive designs that work on all devices",
      "Optimized for performance and SEO",
      "Seamless user experience and intuitive navigation",
      "Custom integrations with your business systems"
    ],
    subservices: [
      "Frontend Development",
      "Backend Development",
      "E-commerce Solutions",
      "Web Applications"
    ]
  },
  {
    id: "hubspot",
    title: "HubSpot CRM",
    tagline: "Streamline your customer journey",
    description: "Comprehensive HubSpot CRM implementation, integration, and optimization to transform your marketing, sales and service operations.",
    icon: Database,
    color: "orange",
    benefits: [
      "Centralized customer data management",
      "Automated workflows and processes",
      "Enhanced lead scoring and qualification",
      "Improved customer communication"
    ],
    subservices: [
      "CRM Implementation",
      "Custom Integrations",
      "Workflow Automation",
      "Team Training"
    ]
  },
  {
    id: "seo",
    title: "SEO Services",
    tagline: "Climb the search rankings",
    description: "Data-driven SEO strategies to improve your visibility, drive relevant traffic, and increase organic search rankings.",
    icon: Search,
    color: "green",
    benefits: [
      "Higher rankings on Google and other search engines",
      "Increased organic traffic and qualified leads",
      "Comprehensive analytics and reporting",
      "Long-term sustainable growth"
    ],
    subservices: [
      "Technical SEO",
      "On-page Optimization",
      "Content Strategy",
      "Local SEO"
    ]
  },
  {
    id: "social",
    title: "Social Media",
    tagline: "Engage and grow your audience",
    description: "Strategic social media management and campaigns to build your brand presence and engage with your target audience effectively.",
    icon: MessageCircle,
    color: "purple",
    benefits: [
      "Consistent brand messaging across platforms",
      "Increased follower growth and engagement",
      "Content that resonates with your audience",
      "Community building and management"
    ],
    subservices: [
      "Social Strategy",
      "Content Creation",
      "Community Management",
      "Paid Campaigns"
    ]
  },
  {
    id: "email",
    title: "Email Marketing",
    tagline: "Convert subscribers into customers",
    description: "Targeted email marketing campaigns designed to nurture leads, build relationships and drive conversions.",
    icon: Mail,
    color: "red",
    benefits: [
      "Segmented and personalized messaging",
      "Automated nurture sequences",
      "A/B testing to optimize performance",
      "Detailed analytics and insights"
    ],
    subservices: [
      "Email Automation",
      "Newsletter Design",
      "Drip Campaigns",
      "Performance Analytics"
    ]
  },
  {
    id: "va",
    title: "Virtual Assistance",
    tagline: "Focus on what matters most",
    description: "Professional virtual assistants to handle administrative tasks, customer support, and operational needs so you can focus on growth.",
    icon: Headphones,
    color: "yellow",
    benefits: [
      "Administrative task management",
      "Customer support and communication",
      "Scheduling and calendar management",
      "Process documentation and optimization"
    ],
    subservices: [
      "Executive Support",
      "Customer Service",
      "Data Entry & Analysis",
      "Project Coordination"
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const EnhancedServicesSection = () => {
  const [activeService, setActiveService] = useState<Service | null>(null);
  
  // Color mapping for dynamic styles
  const colorMap: Record<string, Record<string, string>> = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
      hover: "hover:bg-blue-500/20",
      gradientFrom: "from-blue-400/20",
      gradientTo: "to-blue-600/10"
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
      hover: "hover:bg-green-500/20",
      gradientFrom: "from-green-400/20",
      gradientTo: "to-green-600/10"
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-400",
      hover: "hover:bg-orange-500/20",
      gradientFrom: "from-orange-400/20",
      gradientTo: "to-orange-600/10"
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-400",
      hover: "hover:bg-purple-500/20",
      gradientFrom: "from-purple-400/20",
      gradientTo: "to-purple-600/10"
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      hover: "hover:bg-red-500/20",
      gradientFrom: "from-red-400/20",
      gradientTo: "to-red-600/10"
    },
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
      hover: "hover:bg-yellow-500/20",
      gradientFrom: "from-yellow-400/20",
      gradientTo: "to-yellow-600/10"
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-400/10 opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-purple-400/10 opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Expert Digital Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions tailored to drive growth and transform your digital presence
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const ServiceIcon = service.icon;
            const colors = colorMap[service.color];
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <div 
                  className={`rounded-xl h-full bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} p-[1px] cursor-pointer group`}
                  onClick={() => setActiveService(activeService?.id === service.id ? null : service)}
                >
                  <div className="bg-gray-900 rounded-xl h-full p-6 flex flex-col relative overflow-hidden">
                    {/* Background glow effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo}`} />
                    
                    <div className="flex items-start mb-4 relative z-10">
                      <div className={`p-3 rounded-lg ${colors.bg} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <ServiceIcon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold text-white group-hover:${colors.text} transition-colors duration-300`}>
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-400">{service.tagline}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-6 relative z-10">{service.description}</p>
                    
                    <div className="mt-auto relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.subservices.slice(0, 2).map((subservice, idx) => (
                          <span 
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}
                          >
                            {subservice}
                          </span>
                        ))}
                        {service.subservices.length > 2 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                            +{service.subservices.length - 2} more
                          </span>
                        )}
                      </div>
                      
                      <div className={`flex items-center ${colors.text} text-sm font-medium`}>
                        {activeService?.id === service.id ? "Show less" : "Learn more"}
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeService?.id === service.id ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Expandable service details */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeService?.id === service.id ? "auto" : 0,
                        opacity: activeService?.id === service.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden relative z-10 mt-4"
                    >
                      {activeService?.id === service.id && (
                        <div className="pt-4 border-t border-gray-800 mt-2">
                          <h4 className="font-medium text-white mb-3">Key Benefits</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start">
                                <Check className={`h-5 w-5 ${colors.text} mr-2 flex-shrink-0`} />
                                <span className="text-sm text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 pt-4 border-t border-gray-800">
                            <h4 className="font-medium text-white mb-3">Services Include</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {service.subservices.map((subservice, idx) => (
                                <div 
                                  key={idx} 
                                  className={`text-sm px-3 py-2 rounded-lg ${colors.bg} ${colors.text}`}
                                >
                                  {subservice}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Button 
                            className={`mt-6 w-full ${colors.bg} border ${colors.border} ${colors.text} ${colors.hover}`}
                          >
                            Get Started with {service.title}
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 px-8 py-6 text-lg rounded-xl font-medium"
          >
            Schedule a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedServicesSection;
