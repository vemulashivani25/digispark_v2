
// We can't modify this file as it's marked as read-only in the allowed-files section.
// Instead, we need to create a new component that we'll use in the Index page.

import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { createToolFallback } from "@/utils/avatarFallback";

const toolsData = {
  "CRM & Marketing": [
    { name: "HubSpot", logo: "https://cdn.worldvectorlogo.com/logos/hubspot.svg" },
    { name: "Salesforce", logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" },
    { name: "Marketo", logo: "https://cdn.worldvectorlogo.com/logos/marketo.svg" },
    { name: "Mailchimp", logo: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon-2.svg" },
    { name: "ActiveCampaign", logo: "https://cdn.worldvectorlogo.com/logos/activecampaign-1.svg" },
    { name: "Constant Contact", logo: "https://cdn.worldvectorlogo.com/logos/constant-contact-2.svg" },
  ],
  "Development": [
    { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
    { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
    { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
    { name: "Visual Studio Code", logo: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg" },
    { name: "GitHub", logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" },
  ],
  "Design": [
    { name: "Adobe XD", logo: "https://cdn.worldvectorlogo.com/logos/adobe-xd-1.svg" },
    { name: "Figma", logo: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" },
    { name: "Sketch", logo: "https://cdn.worldvectorlogo.com/logos/sketch-2.svg" },
    { name: "Photoshop", logo: "https://cdn.worldvectorlogo.com/logos/photoshop-cc.svg" },
    { name: "Illustrator", logo: "https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc.svg" },
    { name: "InDesign", logo: "https://cdn.worldvectorlogo.com/logos/indesign-cc.svg" },
  ],
  "Automation": [
    { name: "Zapier", logo: "https://cdn.worldvectorlogo.com/logos/zapier.svg" },
    { name: "Make", logo: "https://cdn.worldvectorlogo.com/logos/integromat-1.svg" },
    { name: "IFTTT", logo: "https://cdn.worldvectorlogo.com/logos/ifttt-1.svg" },
    { name: "Power Automate", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Microsoft_Power_Automate_%282020%29.svg" },
    { name: "n8n", logo: "https://avatars.githubusercontent.com/u/45487711" },
    { name: "Tray.io", logo: "https://images.ctfassets.net/qqlj6g4ee76j/5TX9wCR8gVPASzHFwwL9H0/cc0c8af26ac91ccf5d10666c92a57bf2/tray-logo.svg" },
  ],
  "Analytics": [
    { name: "Google Analytics", logo: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg" },
    { name: "Mixpanel", logo: "https://cdn.worldvectorlogo.com/logos/mixpanel.svg" },
    { name: "Amplitude", logo: "https://cdn.worldvectorlogo.com/logos/amplitude-1.svg" },
    { name: "Heap", logo: "https://avatars.githubusercontent.com/u/528067?s=200&v=4" },
    { name: "Segment", logo: "https://cdn.worldvectorlogo.com/logos/segment-1.svg" },
    { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
  ],
  "SEO": [
    { name: "SEMrush", logo: "https://cdn.worldvectorlogo.com/logos/semrush.svg" },
    { name: "Ahrefs", logo: "https://cdn.worldvectorlogo.com/logos/ahrefs.svg" },
    { name: "Moz", logo: "https://cdn.worldvectorlogo.com/logos/moz-1.svg" },
    { name: "Google Search Console", logo: "https://cdn.worldvectorlogo.com/logos/google-search-console-1.svg" },
    { name: "Screaming Frog", logo: "https://www.screamingfrog.co.uk/wp-content/themes/screamingfrog/images/seo-spider-v2.png" },
    { name: "Majestic", logo: "https://cdn.worldvectorlogo.com/logos/majestic-2.svg" },
  ]
};

const EnhancedToolsTechSection: React.FC = () => {
  const categories = Object.keys(toolsData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const tabIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-switch categories at interval
  useEffect(() => {
    tabIntervalRef.current = setInterval(() => {
      setActiveCategory(prevCategory => {
        const currentIndex = categories.indexOf(prevCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 5000); // Change every 5 seconds
    
    return () => {
      if (tabIntervalRef.current) clearInterval(tabIntervalRef.current);
    };
  }, [categories]);
  
  // Reset interval when user manually changes category
  const handleTabChange = (category: string) => {
    setActiveCategory(category);
    if (tabIntervalRef.current) {
      clearInterval(tabIntervalRef.current);
      tabIntervalRef.current = setInterval(() => {
        setActiveCategory(prevCategory => {
          const currentIndex = categories.indexOf(prevCategory);
          const nextIndex = (currentIndex + 1) % categories.length;
          return categories[nextIndex];
        });
      }, 5000);
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-1/4 w-72 h-72 bg-purple-600/5 rounded-full filter blur-[100px]"></div>
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
            Our <span className="text-yellow-400">Tools</span> & Technologies
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We use industry-leading tools and technologies to create exceptional digital experiences
          </motion.p>
        </div>

        <Tabs 
          defaultValue={categories[0]} 
          value={activeCategory} 
          onValueChange={handleTabChange}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="mb-12">
            <TabsList className="w-full bg-gray-900 p-1 rounded-xl flex flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="flex-1 data-[state=active]:bg-yellow-400 data-[state=active]:text-black transition-all duration-300"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent 
              key={category} 
              value={category} 
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {toolsData[category as keyof typeof toolsData].map((tool, idx) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-5 flex flex-col items-center justify-center hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 group">
                      <div className="h-16 w-16 flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img 
                          src={tool.logo} 
                          alt={`${tool.name} logo`} 
                          className="max-h-12 max-w-12 object-contain z-10 group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = createToolFallback(tool.name);
                          }}
                        />
                      </div>
                      <p className="text-sm text-center text-gray-300 group-hover:text-yellow-400 transition-colors duration-300">
                        {tool.name}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Animated indicator to show auto-rotation */}
        <div className="flex justify-center gap-2 mt-12">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCategory === cat ? 'bg-yellow-400 w-8' : 'bg-gray-600'
              }`}
            ></div>
          ))}
        </div>
        <div className="text-center text-gray-500 text-xs mt-2">
          Categories auto-rotate every 5 seconds
        </div>
      </div>
    </section>
  );
};

export default EnhancedToolsTechSection;
