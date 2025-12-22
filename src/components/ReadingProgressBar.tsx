import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ReadingProgressBarProps {
  className?: string;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ className = '' }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-800/50 ${className}`}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 origin-left"
        style={{ scaleX }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute top-0 h-1 w-20 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent blur-sm"
        style={{ 
          left: `calc(${scrollYProgress.get() * 100}% - 40px)`,
          scaleX
        }}
      />
    </motion.div>
  );
};

export default ReadingProgressBar;
