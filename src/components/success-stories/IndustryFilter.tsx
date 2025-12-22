
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface IndustryFilterProps {
  industries: string[];
  activeIndustry: string;
  onIndustryChange: (industry: string) => void;
}

const IndustryFilter = ({ industries, activeIndustry, onIndustryChange }: IndustryFilterProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  // Auto scroll animation when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentPosition(prev => (prev + 1) % industries.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isHovering, industries.length]);

  return (
    <motion.div
      className="py-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Browse by Industry</h2>
      
      <div className="relative max-w-4xl mx-auto overflow-hidden">
        {/* Left fade effect */}
        <div className="absolute top-0 bottom-0 left-0 w-16 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        
        <div className="flex justify-start items-center gap-3 px-4 py-2 overflow-x-hidden">
          <motion.div
            className="flex items-center gap-3 flex-nowrap"
            animate={{ 
              x: isHovering ? 0 : `-${currentPosition * 120}px` 
            }}
            transition={{ 
              duration: isHovering ? 0.3 : 1.5,
              ease: "easeInOut"
            }}
          >
            {industries.map((industry) => (
              <motion.button
                key={industry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors duration-300 min-w-[100px]
                  ${activeIndustry === industry
                    ? "bg-purple-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                onClick={() => onIndustryChange(industry)}
              >
                {industry}
              </motion.button>
            ))}
            {/* Duplicate first few items for infinite scroll effect */}
            {industries.slice(0, 4).map((industry) => (
              <motion.button
                key={`duplicate-${industry}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors duration-300 min-w-[100px]
                  ${activeIndustry === industry
                    ? "bg-purple-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                onClick={() => onIndustryChange(industry)}
              >
                {industry}
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        {/* Right fade effect */}
        <div className="absolute top-0 bottom-0 right-0 w-16 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default IndustryFilter;
