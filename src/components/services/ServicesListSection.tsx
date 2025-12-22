import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { services, Service } from "./servicesData";
import { useNavigate } from "react-router-dom";

/** Type guard to check if service has a slug property */
const hasSlug = (service: Service): boolean => {
  return 'slug' in service && typeof service.slug === 'string';
};

const ServicesListSection: React.FC = () => {
  const navigate = useNavigate();

  const handleLearnMore = (serviceSlug: string) => {
    navigate(`/services#${serviceSlug}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/80 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute w-[800px] h-[800px] bg-yellow-100/30 rounded-full blur-3xl -top-96 -right-96"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -bottom-32 -left-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-yellow-500">Services</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive digital solutions tailored to drive your business growth and transform your online presence.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => {
            const ServiceIcon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                className="service-card group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full overflow-hidden bg-gradient-to-tr from-white to-gray-50/90 border-0 shadow-xl">
                  <CardContent className="p-0">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 -m-8 rounded-full bg-yellow-400/10 blur-2xl 
                      transform rotate-45 group-hover:bg-yellow-400/20 transition-all duration-700"></div>
                    
                    <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br 
                      from-yellow-200/20 to-transparent transform -rotate-12 group-hover:scale-110 transition-all duration-700"></div>
                    
                    <div className="relative p-8">
                      {/* Top Content */}
                      <div className="flex justify-between items-start mb-6">
                        <motion.div 
                          className={`p-4 rounded-xl bg-${service.highlight}-500/20 
                            group-hover:bg-${service.highlight}-500/30 transition-colors duration-300`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <ServiceIcon className={`h-8 w-8 text-${service.highlight}-600`} />
                        </motion.div>
                        
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div 
                              key={i}
                              className="w-1 h-6 rounded-full bg-yellow-400/30"
                              animate={{ height: [6, 24, 6] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-yellow-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors">
                        {service.description}
                      </p>
                      
                      {/* Features Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1 text-xs bg-yellow-400/20 text-yellow-900 rounded-full
                              hover:bg-yellow-400/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Button and Number */}
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="ghost"
                          className="group-hover:bg-yellow-500/10 group-hover:text-yellow-700 transition-colors p-0"
                          onClick={() => {
                            // Generate a slug from the title if one doesn't exist
                            const serviceSlug = hasSlug(service) 
                              ? service.slug 
                              : service.title.toLowerCase().replace(/\s+/g, '-');
                            handleLearnMore(serviceSlug);
                          }}
                        >
                          Learn more 
                          <motion.span
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut",
                              repeatDelay: 1
                            }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.span>
                        </Button>
                        
                        {/* Decorative number */}
                        <div className="text-5xl font-bold text-gray-900/5 group-hover:text-gray-900/10 transition-colors">
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom decorative bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-yellow-300/80 via-yellow-500/80 to-amber-500/80"></div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesListSection;
