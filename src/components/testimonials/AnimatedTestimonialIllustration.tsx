
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface AnimatedTestimonialIllustrationProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const AnimatedTestimonialIllustration: React.FC<AnimatedTestimonialIllustrationProps> = ({ 
  className = "", 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12 md:w-14 md:h-14",
    large: "w-16 h-16 md:w-20 md:h-20",
  };
  
  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6 md:w-7 md:h-7",
    large: "w-8 h-8 md:w-10 md:h-10",
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Elegant quote container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ 
          scale: [0.9, 1.05, 0.9],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          {/* Glow background */}
          <motion.div 
            className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-md"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Main icon container */}
          <div className="relative bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 rounded-xl p-2 md:p-3 border border-yellow-400/30 backdrop-blur-sm">
            <Quote className={`${iconSizes[size]} text-yellow-400`} />
          </div>
        </div>
      </motion.div>
      
      {/* Subtle floating stars */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{ 
          y: [0, -3, 0],
          opacity: [0.5, 1, 0.5],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-1 -left-1"
        animate={{ 
          y: [0, 3, 0],
          opacity: [0.4, 0.8, 0.4],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
      >
        <Star className="w-2 h-2 text-yellow-400/70 fill-yellow-400/70" />
      </motion.div>
    </div>
  );
};

export default AnimatedTestimonialIllustration;
