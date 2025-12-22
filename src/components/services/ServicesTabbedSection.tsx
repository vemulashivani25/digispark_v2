import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "./servicesData";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Plus,
  ArrowRight,
  Settings,
  Bot,
  MessageCircle,
  Zap,
  Code,
  Globe,
  Palette,
  LineChart,
  Search,
  Presentation,
  Music,
} from "lucide-react";
import ServicePopup from "./ServicePopup";

// Add new services for the categories with explicit icon imports
const additionalServices = [
  {
    title: "HubSpot",
    description:
      "Streamline your customer relationship management with our HubSpot implementation and integration services.",
    features: [
      "Contact Management",
      "Marketing Automation",
      "Sales Pipeline",
      "Analytics Dashboard",
      "Email Integration",
      "Custom Workflows",
    ],
    category: "Automation & CRM",
    icon: Settings,
    highlight: "blue",
    slug: "hubspot",
  },
  {
    title: "Zapier Automations",
    description:
      "Connect your favorite apps and automate workflows to save time and reduce manual tasks with customized Zapier solutions.",
    features: [
      "App Integration",
      "Workflow Automation",
      "Custom Zaps",
      "Error Handling",
      "Webhook Support",
      "Scheduled Triggers",
    ],
    category: "Automation & CRM",
    icon: Zap,
    highlight: "green",
    slug: "zapier-automations",
  },
  {
    title: "Discord Server Management",
    description:
      "Professional setup and management of Discord servers for communities, businesses, and educational organizations.",
    features: [
      "Server Setup",
      "Bot Integration",
      "Channel Organization",
      "Moderation Systems",
      "Role Management",
      "Community Building",
    ],
    category: "Support",
    icon: Bot,
    highlight: "purple",
    slug: "discord-server-management",
  },
  {
    title: "Social Media Management",
    description:
      "Comprehensive social media management services to improve your brand presence and audience engagement.",
    features: [
      "Content Strategy",
      "Post Scheduling",
      "Community Management",
      "Analytics Reporting",
      "Paid Campaigns",
      "Brand Monitoring",
    ],
    category: "Support",
    icon: MessageCircle,
    highlight: "pink",
    slug: "social-media-management-support",
  },
  {
    title: "Audio Editing",
    description: "Professional audio editing services for podcasts, music, commercials, and other audio content.",
    features: [
      "Podcast Editing",
      "Music Production",
      "Voice-over Enhancement",
      "Sound Design",
      "Audio Restoration",
      "Mixing & Mastering",
    ],
    category: "Content",
    icon: Music,
    highlight: "indigo",
    slug: "audio-editing",
  },
];

// Map additional icons to services
const serviceIcons: Record<string, any> = {
  "Web Development": Globe,
  "App Development": Code,
  "UI/UX Design": Palette,
  "Digital Marketing": LineChart,
  SEO: Search,
  "Content Creation": Presentation,
};

// Create categories by unique values
const getCategories = (): string[] => {
  const categorySet = new Set<string>();

  services.forEach((service) => {
    if (service.category) {
      categorySet.add(service.category);
    }
  });

  additionalServices.forEach((service) => {
    if (service.category) {
      categorySet.add(service.category);
    }
  });

  // Remove "CRM & Automation" if it exists
  categorySet.delete("CRM & Automation");

  return Array.from(categorySet);
};

const ServicesTabbedSection: React.FC = () => {
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tabIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Combine original services with additional services
  const allServices = [...services, ...additionalServices].filter((service) => service.category !== "CRM & Automation");

  // Auto-switch categories at interval
  useEffect(() => {
    tabIntervalRef.current = setInterval(() => {
      setActiveCategory((prevCategory) => {
        const currentIndex = categories.indexOf(prevCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 5000); // Change every 5 seconds

    return () => {
      if (tabIntervalRef.current) clearInterval(tabIntervalRef.current);
    };
  }, [categories]);

  // Reset interval when user manually changes category
  const handleTabChange = (category: string) => {
    setActiveCategory(category);
    if (tabIntervalRef.current) {
      clearInterval(tabIntervalRef.current);
      tabIntervalRef.current = setInterval(() => {
        setActiveCategory((prevCategory) => {
          const currentIndex = categories.indexOf(prevCategory);
          const nextIndex = (currentIndex + 1) % categories.length;
          return categories[nextIndex];
        });
      }, 5000);
    }
  };

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  // Helper function to get icon for service
  const getIconForService = (service: any) => {
    // First check if service has its own icon property
    if (service.icon) {
      return service.icon;
    }
    // Otherwise check in our serviceIcons mapping
    else if (serviceIcons[service.title]) {
      return serviceIcons[service.title];
    }
    // Default fallback
    return Globe;
  };

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] pointer-events-none bg-[length:30px_30px]"></div>
      <div className="absolute w-full h-full">
        <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-yellow-400">Services</span> Categories
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Browse our comprehensive range of services designed to transform your digital presence and drive growth for
            your business.
          </motion.p>
        </div>

        <Tabs defaultValue={categories[0]} value={activeCategory} className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-5xl"
            >
              <TabsList className="w-full bg-transparent p-0 h-auto flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="relative group py-0 px-0 bg-transparent border-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <motion.div
                      className="relative px-8 py-4 rounded-2xl cursor-pointer overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        background:
                          activeCategory === category
                            ? "linear-gradient(135deg, rgba(250, 204, 21, 0.9) 0%, rgba(234, 179, 8, 0.85) 50%, rgba(245, 158, 11, 0.9) 100%)"
                            : "linear-gradient(135deg, rgba(31, 41, 55, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%)",
                        boxShadow:
                          activeCategory === category
                            ? "0 10px 40px -10px rgba(250, 204, 21, 0.5), 0 0 0 1px rgba(250, 204, 21, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                            : "0 4px 20px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(75, 85, 99, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Floating particles for active state */}
                      {activeCategory === category && (
                        <>
                          <motion.div
                            className="absolute top-2 right-3 w-1 h-1 rounded-full bg-white/60"
                            animate={{ y: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            className="absolute bottom-3 left-4 w-1.5 h-1.5 rounded-full bg-white/40"
                            animate={{ y: [2, -2, 2], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          />
                        </>
                      )}

                      {/* Category number badge 
                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        activeCategory === category 
                          ? "bg-gray-900 text-yellow-400 shadow-lg" 
                          : "bg-gray-700/50 text-gray-400"
                      }`}>
                        {allServices.filter(s => s.category === category).length}
                      </div> */}

                      {/* Text content */}
                      <span
                        className={`relative z-10 font-semibold text-sm tracking-wide transition-colors duration-300 ${
                          activeCategory === category ? "text-gray-900" : "text-gray-300 group-hover:text-white"
                        }`}
                      >
                        {category}
                      </span>
                    </motion.div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>
          </div>

          {categories.map((category) => (
            <TabsContent
              key={category}
              value={category}
              className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <AnimatePresence mode="wait">
                {activeCategory === category && (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allServices
                        .filter((service) => service.category === activeCategory)
                        .map((service, idx) => {
                          // Get the appropriate icon
                          const IconComponent = getIconForService(service);

                          return (
                            <motion.div
                              key={`${service.title}-${idx}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              whileHover={{
                                y: -5,
                                transition: { duration: 0.3 },
                              }}
                              className="group"
                            >
                              <Card
                                className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 p-6 h-full hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-yellow-500/5"
                                onClick={() => handleServiceClick(service)}
                              >
                                {/* Animated gradient background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-yellow-900/5 group-hover:via-transparent group-hover:to-yellow-500/5 transition-colors duration-500 opacity-0 group-hover:opacity-100"></div>

                                {/* Animated glow orb */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/5 rounded-full filter blur-[80px] group-hover:bg-yellow-400/10 transition-all duration-700"></div>

                                <div className="relative z-10">
                                  <motion.div
                                    className={`p-3 rounded-lg w-14 h-14 flex items-center justify-center bg-${service.highlight || "yellow"}-500/10 mb-4 group-hover:shadow-lg group-hover:shadow-${service.highlight || "yellow"}-500/20`}
                                    whileHover={{ scale: 1.05 }}
                                    animate={{
                                      boxShadow: [
                                        "0 0 0 rgba(234, 179, 8, 0.1)",
                                        "0 0 20px rgba(234, 179, 8, 0.3)",
                                        "0 0 0 rgba(234, 179, 8, 0.1)",
                                      ],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                  >
                                    <IconComponent className={`w-7 h-7 text-${service.highlight || "yellow"}-500`} />
                                  </motion.div>

                                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300">
                                    {service.title}
                                  </h3>

                                  <p className="text-gray-400 mb-4 line-clamp-3">{service.description}</p>

                                  <button className="flex items-center text-yellow-400 font-medium transition-all duration-300 group-hover:translate-x-1">
                                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                                  </button>

                                  {/* Animated corner accent */}
                                  <motion.div
                                    className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden"
                                    animate={{
                                      opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <div className="absolute top-0 left-0 w-16 h-16 -ml-8 -mt-8 transform rotate-45 bg-gradient-to-br from-transparent to-yellow-400/10 group-hover:to-yellow-400/20 transition-colors duration-300"></div>
                                  </motion.div>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        })}

                      {/* "More Services" card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay:
                            Math.min(allServices.filter((service) => service.category === activeCategory).length, 3) *
                            0.1,
                        }}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.3 },
                        }}
                        className="group"
                      >
                        <Card className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 border-dashed p-6 h-full flex items-center justify-center hover:border-yellow-500/30 transition-all duration-300">
                          <div className="text-center">
                            <motion.div
                              className="mx-auto w-14 h-14 rounded-full bg-gray-800/50 flex items-center justify-center mb-4"
                              animate={{
                                boxShadow: [
                                  "0 0 0 rgba(234, 179, 8, 0.1)",
                                  "0 0 15px rgba(234, 179, 8, 0.2)",
                                  "0 0 0 rgba(234, 179, 8, 0.1)",
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            >
                              <Plus className="w-8 h-8 text-yellow-400/80" />
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2 text-gray-300">More Services</h3>
                            <p className="text-gray-500 mb-4">
                              Discover additional customized solutions for your business needs
                            </p>
                            <button className="inline-flex items-center text-yellow-400 font-medium transition-all duration-300 hover:translate-x-1">
                              Contact Us <ArrowRight className="ml-1 w-4 h-4" />
                            </button>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-white bg-yellow-500/80 hover:bg-yellow-500 px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Animated indicator to show auto-rotation */}
          <div className="flex justify-center gap-2 mt-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat ? "bg-yellow-400 w-8" : "bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
          <div className="text-gray-500 text-xs mt-2">Categories auto-rotate every 5 seconds</div>
        </motion.div>
      </div>

      {/* Service Popup */}
      <ServicePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title=""
        description=""
        features={[]}
        benefits={[]}
        service={selectedService}
      />
    </section>
  );
};

export default ServicesTabbedSection;
