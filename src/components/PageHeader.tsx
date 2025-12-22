
import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
  bgImage: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, bgImage }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-gray-300">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
