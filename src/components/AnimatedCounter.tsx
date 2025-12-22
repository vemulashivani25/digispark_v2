
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type AnimatedCounterProps = {
  target: number;
  label: string;
  duration?: number;
  suffix?: string;
  decimalPlaces?: number;
};

const AnimatedCounter = ({ 
  target, 
  label, 
  duration = 2.5, 
  suffix = "", 
  decimalPlaces = 0 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = target;
    
    const incrementTime = Math.floor(duration * 1000 / end);
    
    let timer = setInterval(() => {
      start += 1;
      const progress = Math.min(start / end, 1);
      setCount(Math.floor(progress * end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [target, duration, isInView]);
  
  return (
    <div ref={nodeRef} className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-400/5 to-black/70 border border-yellow-400/10 rounded-lg shadow-inner">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-yellow-400"
      >
        {count.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}{suffix}
      </motion.div>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm text-gray-300 mt-2 text-center"
      >
        {label}
      </motion.p>
    </div>
  );
};

export default AnimatedCounter;
