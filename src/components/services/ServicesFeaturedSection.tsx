
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckSquare, ArrowRight } from "lucide-react";
import { services } from "./servicesData";

const ServicesFeaturedSection: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] -top-64 left-1/3"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured <span className="text-yellow-400">Services</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our most popular services that drive exceptional results for our clients.
          </motion.p>
        </div>
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 justify-center bg-gray-900/50 backdrop-blur-sm p-2 rounded-full">
            {services.slice(0, 6).map((service, idx) => (
              <Button
                key={service.title}
                variant={activeService === idx ? "default" : "ghost"}
                className={activeService === idx 
                  ? "bg-yellow-400 text-black" 
                  : "text-gray-300 hover:text-white"}
                onClick={() => setActiveService(idx)}
              >
                {service.title}
              </Button>
            ))}
          </div>
        </div>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          key={activeService}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="w-full h-auto object-cover rounded-xl"
                style={{ height: "500px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-white text-lg bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                  {services[activeService].caseStudy}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg z-10">
              {React.createElement(services[activeService].icon, { className: "h-10 w-10 text-black" })}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">{services[activeService].title}</h3>
            <p className="text-gray-300 mb-8">{services[activeService].description}</p>
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Key Features</h4>
              <ul className="space-y-3">
                {services[activeService].features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckSquare className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default ServicesFeaturedSection;
