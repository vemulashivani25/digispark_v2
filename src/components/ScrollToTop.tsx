
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed z-40 left-4 bottom-20 group"
          title="Scroll to top"
        >
          {/* Progress ring */}
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-yellow-400"
              style={{
                strokeDasharray: 125.6,
                strokeDashoffset: 125.6 - (scrollProgress / 100) * 125.6,
              }}
            />
          </svg>
          
          {/* Inner button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="bg-yellow-400 text-black p-2 rounded-full shadow-lg shadow-yellow-400/30 group-hover:shadow-yellow-400/50 transition-shadow"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(234, 179, 8, 0.4)",
                  "0 0 0 8px rgba(234, 179, 8, 0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
