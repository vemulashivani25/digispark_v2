
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Layers, 
  PenTool, 
  Image, 
  Smartphone, 
  Database, 
  Share2, 
  Search, 
  TrendingUp, 
  BarChart,
  Video,
  Users,
  Globe
} from "lucide-react";

const additionalServices = [
  {
    icon: Layers,
    title: "Content Creation",
    description: "Engaging, SEO-optimized content that tells your story and drives organic traffic.",
    color: "#ec4899"
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description: "Eye-catching visual assets that strengthen your brand and engage your audience.",
    color: "#8b5cf6"
  },
  {
    icon: Video,
    title: "Video Production",
    description: "Professional videos that capture attention and communicate your message effectively.",
    color: "#f97316"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications with intuitive interfaces and powerful functionality.",
    color: "#06b6d4"
  },
  {
    icon: Database,
    title: "CMS Development",
    description: "Custom content management systems that make website updates easy and efficient.",
    color: "#14b8a6"
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic social media presence that builds community and drives engagement.",
    color: "#3b82f6"
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Data-driven search engine optimization that improves rankings and drives organic traffic.",
    color: "#10b981"
  },
  {
    icon: Globe,
    title: "HubSpot Integration",
    description: "Seamless HubSpot implementation, customization, and optimization for marketing automation.",
    color: "#F97316"
  },
  {
    icon: Users,
    title: "Virtual Assistance",
    description: "Skilled virtual assistants to handle administrative tasks, customer support, and more.",
    color: "#6366f1"
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Scalable marketing strategies focused on rapid business growth and ROI.",
    color: "#f59e0b"
  },
  {
    icon: Image,
    title: "UI/UX Design",
    description: "User-centered design that enhances user experience and increases conversions.",
    color: "#A855F7"
  },
  {
    icon: BarChart,
    title: "Analytics & Reporting",
    description: "Comprehensive data analysis and insights to inform business decisions.",
    color: "#6366f1"
  }
];

const AdditionalServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden" id="additional-services">
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black pointer-events-none"></div>
      
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400/5"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Additional <span className="text-yellow-400">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Specialized solutions to complement our core offerings and meet your specific needs
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {additionalServices.map((service, idx) => {
            const LucideIcon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <Card className="bg-gray-900/50 border-gray-800 h-full overflow-hidden hover:shadow-lg hover:border-yellow-400/30 transition-all duration-300 relative">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Tech circuit background pattern */}
                    {hoveredService === idx && (
                      <motion.div 
                        className="absolute inset-0 overflow-hidden opacity-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg width="100%" height="100%">
                          <pattern id={`circuit-pattern-${idx}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect width="20" height="20" fill="none" />
                            <path d="M10,0 L10,20 M0,10 L20,10" stroke={service.color} strokeWidth="0.5" />
                            <circle cx="10" cy="10" r="1.5" fill={service.color} />
                          </pattern>
                          <rect x="0" y="0" width="100%" height="100%" fill={`url(#circuit-pattern-${idx})`} />
                        </svg>
                      </motion.div>
                    )}
                    
                    <div className="flex items-start gap-4 mb-4">
                      {/* New icon animation - tech particles */}
                      <motion.div 
                        className="relative p-3 rounded-lg flex items-center justify-center"
                        style={{ background: `${service.color}20` }}
                      >
                        {/* Particle effects instead of rotation */}
                        {hoveredService === idx && (
                          <>
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute rounded-full w-1 h-1"
                                style={{ background: service.color }}
                                initial={{ 
                                  x: 0, 
                                  y: 0, 
                                  opacity: 0.8 
                                }}
                                animate={{ 
                                  x: (Math.random() - 0.5) * 40, 
                                  y: (Math.random() - 0.5) * 40,
                                  opacity: 0
                                }}
                                transition={{ 
                                  duration: 0.8 + Math.random() * 0.5,
                                  repeat: Infinity,
                                  repeatDelay: Math.random() * 0.2
                                }}
                              />
                            ))}
                          </>
                        )}
                        
                        {/* Digital glitch effect on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          animate={hoveredService === idx ? {
                            background: [
                              `${service.color}00`,
                              `${service.color}30`,
                              `${service.color}00`
                            ],
                            x: [0, 1, -1, 0],
                            y: [0, -1, 1, 0]
                          } : {}}
                          transition={{
                            duration: 0.3,
                            repeat: hoveredService === idx ? Infinity : 0,
                            repeatType: "reverse"
                          }}
                        />
                        
                        <LucideIcon
                          className="w-6 h-6 relative z-10"
                          style={{ color: service.color }}
                        />
                      </motion.div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-300">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4">
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-yellow-400 hover:text-yellow-300 hover:bg-transparent group/btn"
                        asChild
                      >
                        <Link to="/project-quote">
                          Learn More 
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                    
                    {/* Animated tech scanning line instead of gradient */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 overflow-hidden">
                      <motion.div 
                        className="h-full"
                        style={{ background: service.color }}
                        animate={hoveredService === idx ? { 
                          x: ["-100%", "100%"],
                        } : { x: "-100%" }}
                        transition={{ 
                          duration: 1.5, 
                          ease: "linear",
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button 
            className="bg-yellow-400 hover:bg-yellow-300 text-black"
            asChild
          >
            <Link to="/project-quote">
              Request a Custom Service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AdditionalServicesSection;
