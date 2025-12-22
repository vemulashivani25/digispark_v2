
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('soundEnabled') === 'true';
  });
  const { toast } = useToast();
  
  useEffect(() => {
    // Create audio element for transition sound
    audioRef.current = new Audio("/sounds/page-transition.mp3");
    
    // Set volume to a subtle level
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      
      if (soundEnabled) {
        audioRef.current.play().catch(e => {
          // Autoplay may be blocked by browser policies
          console.log("Audio autoplay was prevented:", e);
        });
      }
    }
    
    // Show toast for sound controls on first visit
    const hasShownToast = localStorage.getItem('soundToastShown');
    if (!hasShownToast) {
      toast({
        title: "Page Sound Effects",
        description: "Sounds are turned " + (soundEnabled ? "on" : "off") + ". Click to toggle.",
        action: (
          <button 
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded" 
            onClick={toggleSound}
          >
            {soundEnabled ? "Disable" : "Enable"}
          </button>
        )
      });
      localStorage.setItem('soundToastShown', 'true');
    }
    
    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundEnabled]);
  
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('soundEnabled', String(newState));
    
    toast({
      title: "Sound " + (newState ? "Enabled" : "Disabled"),
      description: "Page transition sounds are now " + (newState ? "on" : "off"),
      variant: "default"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={toggleSound}
          className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
          title={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white w-4 h-4"
          >
            {soundEnabled ? (
              // Volume On icon
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            ) : (
              // Volume Off icon
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            )}
          </svg>
        </button>
      </div>
      {children}
    </motion.div>
  );
};

export default PageTransition;
