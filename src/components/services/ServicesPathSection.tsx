
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckSquare } from "lucide-react";
import { customerPaths } from "./servicesData";

const ServicesPathSection: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[150px] -bottom-64 -right-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Choose Your <span className="text-yellow-400">Path</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We offer tailored solutions based on your specific needs and goals.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customerPaths.map((path, idx) => {
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * idx }}
                onClick={() => setSelectedPath(selectedPath === path.title ? null : path.title)}
                className="cursor-pointer"
              >
                <Card className={`h-full border border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all duration-500 group 
                  ${selectedPath === path.title ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' : 'hover:border-gray-700'}`}>
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl
                      ${selectedPath === path.title ? 'bg-yellow-400' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                      {path.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{path.title}</h3>
                    <p className="text-gray-400 mb-6">{path.description}</p>
                    <AnimatePresence>
                      {selectedPath === path.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="w-full"
                        >
                          <div className="mb-6 pt-4 border-t border-gray-800">
                            <h4 className="text-yellow-400 font-medium mb-3">Recommended Services:</h4>
                            <ul className="space-y-2">
                              {path.recommendedServices.map((service, i) => (
                                <motion.li
                                  key={service}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center"
                                >
                                  <CheckSquare className="h-4 w-4 text-yellow-400 mr-2" />
                                  <span className="text-gray-300">{service}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                            {path.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {selectedPath !== path.title && (
                      <Button
                        variant="ghost"
                        className="mt-auto text-white hover:text-yellow-400 hover:bg-transparent p-0"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
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
export default ServicesPathSection;
