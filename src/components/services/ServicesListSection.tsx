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
    <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-white to-gray-50/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-yellow-100/30 rounded-full blur-3xl -top-48 sm:-top-96 -right-48 sm:-right-96"></div>
      <div className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-100/30 rounded-full blur-3xl -bottom-16 sm:-bottom-32 -left-16 sm:-left-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-yellow-500">Services</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive digital solutions tailored to drive your business growth.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
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
                <Card className="h-full overflow-hidden bg-gradient-to-tr from-white to-gray-50/90 border-0 shadow-lg sm:shadow-xl">
                  <CardContent className="p-0">
                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 -m-6 sm:-m-8 rounded-full bg-yellow-400/10 blur-2xl 
                      transform rotate-45 group-hover:bg-yellow-400/20 transition-all duration-700"></div>
                    
                    <div className="relative p-4 sm:p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <motion.div 
                          className={`p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-${service.highlight}-500/20`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <ServiceIcon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-${service.highlight}-600`} />
                        </motion.div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-yellow-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 md:mb-6 group-hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-3">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <span 
                            key={i} 
                            className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-yellow-400/20 text-yellow-900 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="ghost"
                          size="sm"
                          className="group-hover:bg-yellow-500/10 group-hover:text-yellow-700 transition-colors p-0 text-xs sm:text-sm"
                          onClick={() => {
                            const serviceSlug = hasSlug(service) 
                              ? service.slug 
                              : service.title.toLowerCase().replace(/\s+/g, '-');
                            handleLearnMore(serviceSlug);
                          }}
                        >
                          Learn more 
                          <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900/5">
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-yellow-300/80 via-yellow-500/80 to-amber-500/80"></div>
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
