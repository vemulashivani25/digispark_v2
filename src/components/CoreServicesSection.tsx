
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "HubSpot CRM", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Streamline customer relationships with our HubSpot CRM implementation and management services." },
  { label: "SEO", img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Boost your search rankings with our data-driven SEO strategies tailored to your industry." },
  { label: "Digital Marketing", img: "https://images.unsplash.com/photo-1533750516278-4555310c7e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Drive targeted traffic and conversions with comprehensive digital marketing campaigns." },
  { label: "Video Production", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Create engaging video content that tells your brand story and connects with your audience." },
  { label: "Web Development", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Build custom websites and web applications that delight users and drive business results." },
  { label: "Virtual Assistance", img: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Get expert administrative support to handle your day-to-day operations and boost productivity." },
];

const CoreServicesSection = () => {
  const [selected, setSelected] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const handleServiceClick = () => {
    navigate('/services');
  };
  
  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-400/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400/5 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Our Services </span>
            <span className="text-yellow-400">Categories</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Our specialized services deliver exceptional results for businesses of all sizes.
          </p>
        </motion.div>
        
        {/* Horizontal tab bar with glowing effects - Mobile friendly */}
        <div className="relative mb-8 md:mb-16">
          {/* Gradient fade indicators for scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none md:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none md:hidden"></div>
          
          <motion.div 
            className="flex md:justify-center overflow-x-auto py-4 px-4 scrollbar-hide -mx-4 md:mx-0"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate={controls}
          >
            <div className="inline-flex space-x-2 md:space-x-2 relative px-4 md:px-0">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  className={`px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all relative whitespace-nowrap flex-shrink-0
                    ${selected === idx
                      ? "text-black z-10"
                      : "text-gray-300 hover:text-white"
                    }
                  `}
                  onClick={() => setSelected(idx)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Highlight background for active tab */}
                  {selected === idx && (
                    <motion.div 
                      className="absolute inset-0 bg-yellow-400 rounded-lg shadow-lg"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-lg opacity-0 transition-opacity ${selected !== idx ? 'hover:opacity-100' : ''}`}>
                    <div className="absolute inset-0 rounded-lg bg-yellow-400/20 blur-md"></div>
                  </div>
                  
                  <span className="relative z-10">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Mobile scroll hint */}
          <p className="text-center text-gray-500 text-xs mt-2 md:hidden">← Swipe to see more →</p>
        </div>
        
        <motion.div 
          className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center justify-center max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selected}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-full lg:w-1/2 perspective-1000"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative rounded-xl shadow-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900/80 to-black">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-60"></div>
              <img
                src={menuItems[selected].img}
                alt={menuItems[selected].label}
                className="w-full h-[200px] sm:h-[280px] lg:h-[350px] object-cover transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 sm:p-6">
                <div className="bg-black/60 backdrop-blur-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg inline-block">
                  <span className="text-yellow-400 font-semibold text-sm sm:text-base">{menuItems[selected].label}</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-white">{menuItems[selected].label}</h3>
            <div className="h-1 w-16 sm:w-20 bg-yellow-400 mb-3 sm:mb-6 mx-auto lg:mx-0"></div>
            <p className="text-gray-300 mb-4 sm:mb-8 text-sm sm:text-base">{menuItems[selected].description}</p>
            <motion.div className="mt-3 sm:mt-6" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <button onClick={handleServiceClick} className="group inline-flex items-center font-semibold text-yellow-400 hover:text-yellow-300 text-sm sm:text-base">
                Learn more about {menuItems[selected].label} 
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreServicesSection;
