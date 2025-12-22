
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDashed } from "lucide-react";
import Lottie from "lottie-react";

interface PreloaderProps {
  onLoadComplete: () => void;
}

const loadingMessages = [
  "Brewing digital coffee ☕",
  "Adding a little sparkle ✨",
  "Hang tight, greatness loading…",
  "Warming up the engines 🔧",
  "Good things take a second 😉"
];

const PreloaderNew: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  
  // Fetch the Lottie animation data
  useEffect(() => {
    const fetchLottieAnimation = async () => {
      try {
        // Using a static animation data instead of fetching to avoid CORS issues
        import("@/assets/lottie/loading-animation.json")
          .then(data => {
            setAnimationData(data.default);
          })
          .catch(error => {
            console.error("Failed to load Lottie animation:", error);
            // Fallback to null, the component will still work without animation
          });
      } catch (error) {
        console.error("Failed to load Lottie animation:", error);
      }
    };
    
    fetchLottieAnimation();
  }, []);
  
  useEffect(() => {
    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Calculate how much progress to add for each step to complete in around 4.5 seconds
        const newProgress = prev + 1.5;
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadComplete();
            }, 800); // Short delay after fade out starts
          }, 500); // Give a moment at 100% before starting the exit transition
          return 100;
        }
        return newProgress;
      });
    }, 70); // Update frequently for smooth progress
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0f172a] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating code snippets */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10 font-mono text-xs whitespace-nowrap"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.1 
            }}
            animate={{ 
              y: [null, `${Math.random() * 100}%`],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 8 + Math.random() * 4, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {['<div>', '</>', 'const', '{ }', '( )', '=> {}'][i]}
          </motion.div>
        ))}
        
        {/* Glowing orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Logo/Brand area */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
            DigiSpark
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Igniting Digital Excellence</p>
        </motion.div>

        {/* Lottie Animation */}
        <div className="relative w-48 h-48 mx-auto md:w-56 md:h-56">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          )}
          
          {/* Pulsing ring around animation */}
          <motion.div
            className="absolute inset-0 border-2 border-primary/30 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Loading message */}
        <div className="mt-8 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessageIndex}
              className="text-[#facc15] font-medium text-xl"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {loadingMessages[currentMessageIndex]}
            </motion.p>
          </AnimatePresence>
          
          {/* Digital-style loading indicator */}
          <motion.div 
            className="flex items-center justify-center gap-1 mt-4"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Progress bar at bottom of screen */}
      <div className="fixed bottom-0 left-0 w-full">
        <div className="h-1 bg-muted/20">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-yellow-300 to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        <div className="text-center py-2">
          <span className="text-muted-foreground text-xs font-mono">{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PreloaderNew;
