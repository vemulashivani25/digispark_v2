
import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ServicePopupProps {
  title?: string;
  description?: string;
  features?: string[];
  benefits?: string[];
  image?: string;
  isOpen: boolean;
  onClose: () => void;
  service?: any;
}

const ServicePopup: React.FC<ServicePopupProps> = ({
  title,
  description,
  features,
  benefits,
  image,
  isOpen,
  onClose,
  service,
}) => {
  // Use service prop if provided, otherwise use the direct props
  const serviceTitle = service ? service.title : title;
  const serviceDescription = service ? service.description : description;
  const serviceFeatures = service ? service.features : features;
  const serviceBenefits = service ? (service.benefits || []) : benefits;
  const serviceImage = service ? service.image : image;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-black border-white/10 overflow-hidden">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 text-white transition-colors z-10"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {serviceImage && (
                    <div className="relative h-60 lg:h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
                      <img
                        src={serviceImage}
                        alt={serviceTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-8 lg:p-10 overflow-y-auto max-h-[80vh]">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4">{serviceTitle}</h2>
                      <div className="h-1 w-20 bg-yellow-400 mb-6" />
                      <p className="text-gray-300">{serviceDescription}</p>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                      <ul className="space-y-2">
                        {serviceFeatures?.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="bg-yellow-400 h-1.5 w-1.5 rounded-full mt-2 mr-2" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {serviceBenefits && serviceBenefits.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Benefits</h3>
                        <ul className="space-y-2">
                          {serviceBenefits.map((benefit: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="bg-yellow-400 h-1.5 w-1.5 rounded-full mt-2 mr-2" />
                              <span className="text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-8">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md transition-colors"
                        onClick={onClose}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServicePopup;
