
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createToolFallback } from "@/utils/avatarFallback";

// Type definition for a tech tool
type TechTool = {
  name: string;
  logo: string;
  category: string;
};

// Comprehensive technology stack data
const techStackData: TechTool[] = [
  { name: "Zapier", logo: "https://cdn.worldvectorlogo.com/logos/zapier.svg", category: "Automation" },
  { name: "Make", logo: "https://cdn.worldvectorlogo.com/logos/integromat-1.svg", category: "Automation" },
  { name: "IFTTT", logo: "https://cdn.worldvectorlogo.com/logos/ifttt-1.svg", category: "Automation" },
  { name: "HubSpot", logo: "https://cdn.worldvectorlogo.com/logos/hubspot.svg", category: "CRM" },
  { name: "Salesforce", logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg", category: "CRM" },
  { name: "Zoho CRM", logo: "https://cdn.worldvectorlogo.com/logos/zoho-3.svg", category: "CRM" },
  { name: "Adobe Premiere Pro", logo: "https://cdn.worldvectorlogo.com/logos/premiere-cc.svg", category: "Video Editing" },
  { name: "Final Cut Pro", logo: "https://cdn.worldvectorlogo.com/logos/final-cut-pro-x.svg", category: "Video Editing" },
  { name: "DaVinci Resolve", logo: "https://cdn.worldvectorlogo.com/logos/davinci-resolve-12.svg", category: "Video Editing" },
  { name: "Adobe Audition", logo: "https://cdn.worldvectorlogo.com/logos/adobe-audition-cs6.svg", category: "Audio Editing" },
  { name: "Audacity", logo: "https://cdn.worldvectorlogo.com/logos/audacity.svg", category: "Audio Editing" },
  { name: "Logic Pro X", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/Logic_Pro_X_icon.png", category: "Audio Editing" },
  { name: "SEMrush", logo: "https://cdn.worldvectorlogo.com/logos/semrush.svg", category: "SEO" },
  { name: "Ahrefs", logo: "https://cdn.worldvectorlogo.com/logos/ahrefs.svg", category: "SEO" },
  { name: "Google Search Console", logo: "https://cdn.worldvectorlogo.com/logos/google-search-console-1.svg", category: "SEO" },
  { name: "Hootsuite", logo: "https://cdn.worldvectorlogo.com/logos/hootsuite-1.svg", category: "Social Media" },
  { name: "Buffer", logo: "https://cdn.worldvectorlogo.com/logos/buffer-logo.svg", category: "Social Media" },
  { name: "Sprout Social", logo: "https://cdn.worldvectorlogo.com/logos/sprout-social-icon-1.svg", category: "Social Media" },
  { name: "Mailchimp", logo: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon-2.svg", category: "Email Marketing" },
  { name: "ActiveCampaign", logo: "https://cdn.worldvectorlogo.com/logos/activecampaign-1.svg", category: "Email Marketing" },
  { name: "Constant Contact", logo: "https://cdn.worldvectorlogo.com/logos/constant-contact-2.svg", category: "Email Marketing" },
  { name: "Visual Studio Code", logo: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg", category: "Development" },
  { name: "GitHub", logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg", category: "Development" },
  { name: "Chrome DevTools", logo: "https://cdn.worldvectorlogo.com/logos/chrome-1.svg", category: "Development" },
  { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg", category: "Development" },
  { name: "NextJs", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg", category: "Development" }
];

// Split into rows for marquee effect
const createRows = (): TechTool[][] => {
  const row1 = techStackData.slice(0, Math.ceil(techStackData.length / 2));
  const row2 = techStackData.slice(Math.ceil(techStackData.length / 2));
  
  // Duplicate each array for seamless looping
  return [
    [...row1, ...row1],
    [...row2, ...row2]
  ];
};

const TechStackMarquee: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [rows, setRows] = useState<TechTool[][]>([]);
  const [selectedTool, setSelectedTool] = useState<TechTool | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const isPausedForPopup = useRef(false);

  useEffect(() => {
    setRows(createRows());
  }, []);

  const handleToolClick = (e: React.MouseEvent, tool: TechTool) => {
    e.stopPropagation();
    isPausedForPopup.current = true;
    setSelectedTool(tool);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Delay resetting the pause state to prevent flicker
    setTimeout(() => {
      isPausedForPopup.current = false;
    }, 100);
  };

  // Determine if animation should be paused
  const shouldPause = isHovered || showPopup;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-1/4 w-72 h-72 bg-yellow-600/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-yellow-400">Technology</span> Stack
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We leverage cutting-edge tools and technologies to deliver exceptional results
          </motion.p>
        </div>
        
        <div 
          className="space-y-16 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="relative overflow-hidden py-4"
            >
              <motion.div
                className="flex gap-6"
                animate={
                  shouldPause
                    ? { x: undefined }
                    : {
                        x: rowIndex % 2 === 0
                          ? ["-10%", "-60%"]
                          : ["-60%", "-10%"]
                      }
                }
                transition={
                  shouldPause
                    ? { duration: 0 }
                    : {
                        x: {
                          duration: 50,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear",
                        }
                      }
                }
                style={shouldPause ? {} : undefined}
              >
                {row.map((tool, idx) => (
                  <motion.div
                    key={`${tool.name}-${idx}`}
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, y: -10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={(e) => handleToolClick(e, tool)}
                  >
                    <div className="w-[160px] p-5 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700/30 
                      hover:border-yellow-400/30 transition-all duration-300 shadow-lg
                      hover:shadow-yellow-400/10 cursor-pointer group">
                      <div className="h-16 flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img 
                          src={tool.logo} 
                          alt={`${tool.name} logo`} 
                          className="max-h-12 max-w-12 group-hover:scale-110 transition-transform duration-300 z-10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = createToolFallback(tool.name);
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-xs text-yellow-400/70 block mt-1">{tool.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tool info popup */}
      <AnimatePresence>
        {showPopup && selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={handleClosePopup}>
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div 
              className="bg-gray-900 rounded-2xl border border-gray-800 p-8 max-w-md w-full relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-xl bg-gray-800 flex items-center justify-center">
                  <img 
                    src={selectedTool.logo} 
                    alt={`${selectedTool.name} logo`} 
                    className="h-16 w-16 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = createToolFallback(selectedTool.name);
                    }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">{selectedTool.name}</h3>
              <p className="text-yellow-400 text-center text-sm mb-4">{selectedTool.category}</p>
              <p className="text-gray-400 text-center">
                We use {selectedTool.name} to deliver exceptional results for our clients.
                Our team is highly skilled with this technology.
              </p>
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={handleClosePopup}
                  className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Hover to pause the scrolling • Click on any technology to learn more</p>
      </div>
    </section>
  );
};

export default TechStackMarquee;
