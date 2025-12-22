
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Globe, MapPin, Users, Award, MessageCircle } from "lucide-react";

// Animated counter component
const AnimatedStatCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
  { label: "Projects", value: 215, icon: <Award className="w-5 h-5" />, subtext: "Across 15 industries", color: "from-yellow-400 to-amber-500" },
  { label: "Countries", value: 27, icon: <Globe className="w-5 h-5" />, subtext: "Clients on 5 continents", color: "from-blue-400 to-cyan-500" },
  { label: "Team", value: 22, icon: <Users className="w-5 h-5" />, subtext: "Global Talents", color: "from-green-400 to-emerald-500" },
  { label: "Languages", value: 10, icon: <MessageCircle className="w-5 h-5" />, subtext: "Multilingual Delivery", color: "from-purple-400 to-pink-500" }
];

const highlights = [
  "Multi-timezone project management",
  "Localized content and SEO strategies",
  "Cultural adaptation for global markets",
  "24/7 support with regional experts"
];

// Interactive map data
const locations = [
  { name: "New York", country: "USA", position: { top: "38%", left: "23%" }, isActive: true },
  { name: "London", country: "UK", position: { top: "30%", left: "45%" }, isActive: true },
  { name: "Dubai", country: "UAE", position: { top: "48%", left: "58%" }, isActive: true },
  { name: "Singapore", country: "Singapore", position: { top: "55%", left: "75%" }, isActive: true },
  { name: "Sydney", country: "Australia", position: { top: "70%", left: "85%" }, isActive: true },
  { name: "Mumbai", country: "India", position: { top: "48%", left: "68%" }, isActive: true },
  { name: "São Paulo", country: "Brazil", position: { top: "65%", left: "32%" }, isActive: false },
  { name: "Toronto", country: "Canada", position: { top: "33%", left: "21%" }, isActive: false },
];

const GlobalPresenceSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start((i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1 },
    }));
    
    setTimeout(() => setIsMapLoaded(true), 500);
  }, [controls]);
  
  const handleLocationClick = (index: number) => {
    setSelectedLocation(selectedLocation === index ? null : index);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="global-presence">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90 pointer-events-none"></div>
      <div className="absolute w-[40rem] h-[40rem] bg-yellow-400/5 rounded-full blur-3xl -top-60 -right-20 animate-pulse-slow"></div>
      <div className="absolute w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-3xl -bottom-40 -left-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3 text-white">
            Our <span className="text-yellow-400">Global Footprint</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Delivering exceptional digital experiences to clients worldwide with localized expertise
          </p>
        </motion.div>

        {/* Interactive Map */}
        <div className="relative mx-auto my-12 max-w-5xl">
          <div ref={mapRef} className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-yellow-400/20 shadow-2xl bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-10"></div>
            
            {/* Map background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920')] bg-cover bg-center opacity-60"></div>
            
            {/* World map overlay */}
            <svg 
              className="absolute inset-0 w-full h-full p-4 z-0 opacity-50"
              viewBox="0 0 1000 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M781.68,324.4l-24.2,8.61,5.4,10.21-15.4,15.15,2.3,14.63,4.5,4.28-5.38,7.65,12.53-.53-.17,14.32,10.53-7.72,6.95-13.43,21.54-20.67,6.37-12.19-25.37-20.31m-35.4,77.75,5.36-10.24-7.83-7.29-11.72,1.22,5.91-10.52-9.31-8.72-7.25,5.55,1.26-9.37-14.1-1.82,5.57-5.37-10.08-11.31-11.95,7.31-0.7-13.05-9.69-9.1-2,13.3L677,334.4l-6.11-4.41-4.59,5.9-13.73-6.85-21.15,5.57,3.68-11.1-7.05-7.18-8.88,8.97-0.76-17.27-10.19-3.3-11.45,8.35-2.31-9.05-24.41-2.26-2.73,7.54-9.06-2.47-4.8-9.87-6.01,2.85-0.86-9.85-17.14-2.36-3.93,3.66-17.28-6.42-6.51,3.31-8.07-7.31-15.63-2.64-2.79,7.62-16.5-3.84-5.4,4.8-8.21-6.92-17.67,0.85-3.77-6.45-16.44,0.83-10.06,5.69-13.65-2.01-7.01,3.5L401,255.17l-18.95,12.32-11.23,1.15-5.53,5.58-9.95-3.74-15.61,4.27,0.33,6.64-12.81,4.03-2.94,5.23-7.54-0.23-10.99,5.26-11.1-2.56-2.6-5.38-15.93,2.3-3.64,5.97-12.36,3-8.12,9.64-17.28-2-6.89,7.21-10.65-1.47-5.39-6.27-10.02-0.56L199.83,311l-7.62,8.53-11.05,1.34,0.39,6.62-7.03,5.31-18.53-3.75-3.27,1.81-0.44,3.04-7.83,6.78-3.36-1.7-4.39,6.58-10.84,0.71-6.07,4.96-9.97-1.64-3.88-4.64-14.39,0.75-6.14-5.21-13.81,0.39-8.73,3.94-9.3,0.73-1.13,3.52-11.47,2.18-2.5,6.03-7.31,1.67-2.27,4.87-14.33,1.9-2.37-4.1-7.42-0.56-3.51-4.17-13.41-0.8-0.73-4.96-10.47-0.25-1.3-3.96-11.64-0.18L0,361.3l2.16,9.97,2.06,3.32,0.63,6.5,3.37,5.6-1.5,2.17,2.39,4.54,0.3,5.71,3.64,1.72,0.56,2.83,2.75,2.67,4.63,0.56,5.39,6.58,3.95,3.48,0.16,4.17,14.38,6.17,1.79,2.23,12.93,2.86,13.86,8.79,1.14,4.52,9.02,0.34,6.71,4.16,0.4,6.97,5.85,9.21,1.21,4.55,4.25,4.0,9.54,1.4,1.25,2.7,4.26,2.68,10.1-0.25,0.92,1.45,1.56,11.6,8.67,1.41,7.68,7.75,11.45,2.43,5.93,3.77,7.88,0.22,3.85,3.34,12.73,2.11,8.82,6.04,1.05,3.06,14.15,5.73,5.77,0.1,2.49,3.66,12.91,0.14,4.67,5.68,5.49-0.1,10.77,3.97,4.58-0.37,13.37,6.11,9.69,8.88,2.14,4.74,9.53,0.58,4.01,4.5,5.15,8.66,2.53,5.58,8.76,3.39,0.43,2.94,12.56,7.71,5.32-1.75,7.78,1.22,4.38,5.98,8.57,7.8,1.74,4.12,7.34,6.9,5.08,8.97,15.07,1.39,6.93,3.99,4.42,7.14,0.42,5.02,3.02,3.34,5.52,8.58,0.38,5.4,2.94,4.48,7.78,2.6,10.98-0.22,11.06,8.09,15.65,9.46,5.35,13.25,3.11,3.32,7.61,3.48,2.24,16.96,9.99,17.18,10.25,6.94,3.56,4.24,3.81,7.46,3.37,2.08,6.46L524.62,500h28.6l15.3-2.37,2.73-1.77,4.04-0.09,4.95-3.44,22.35-1.66,7.88-6.54,7.92-2.06,7.74-7.17,2.66-6.49,7.55-3.92,3.66-3.65,9.53-1.28,4.44-2.85,4.97-0.45,11.27-6.27,8.57-0.3,5.32-2.98,2.71-6.4,6.78-0.13,6.99-4.52,3.05-5.28,8.86-4.92,5.5-0.6,5.39-4.69,7.59-1.42,4.21-10.63,6.97-6.25,7.8-2.05,1.74-2.86,10.03-2.78,3.13-5.47,8.81-3.92,1.45-4.16,5.05-1.22,0.69-5.88,5.21-1.95,9.69-3.03,14.38-7.71,3.21-0.76,0.87-9.24,7.94-1.47,4.66-3.3,8.02,1.63"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
            
            {/* Location pins */}
            {locations.map((location, idx) => location.isActive && (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={controls}
                custom={idx}
                onClick={() => handleLocationClick(idx)}
                style={{ 
                  position: "absolute", 
                  top: location.position.top, 
                  left: location.position.left,
                  transform: "translate(-50%, -50%)"
                }}
                className="cursor-pointer z-20"
              >
                <div className={`
                  flex flex-col items-center group
                  ${selectedLocation === idx ? "scale-125 z-30" : "z-20"}
                `}>
                  <div className="relative">
                    <span className="absolute animate-ping w-6 h-6 rounded-full bg-yellow-400/30"></span>
                    <div className="bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/20 border-2 border-white">
                      <MapPin className="w-3 h-3 text-black" />
                    </div>
                  </div>
                  
                  <div className={`
                    mt-2 px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-sm border border-yellow-400/30
                    transition-all duration-300 shadow-lg shadow-black/50
                    ${selectedLocation === idx ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
                  `}>
                    <p className="text-yellow-400 font-semibold text-sm whitespace-nowrap">{location.name}</p>
                    <p className="text-white/80 text-xs">{location.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats and Highlights */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px -15px rgba(250, 204, 21, 0.3)",
                  y: -5
                }}
                className="relative group bg-gradient-to-br from-gray-900/80 to-black border border-yellow-400/20 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center overflow-hidden cursor-pointer"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Glowing orb effect */}
                <motion.div 
                  className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Rotating border effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <motion.div 
                    className={`absolute inset-[-100%] bg-gradient-conic ${stat.color} opacity-0 group-hover:opacity-30`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                {/* Icon with pulse effect */}
                <motion.div 
                  className={`relative bg-gradient-to-br ${stat.color} rounded-full p-3 mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative text-black">{stat.icon}</span>
                </motion.div>
                
                {/* Animated counter */}
                <motion.h3 
                  className="text-4xl font-bold text-white mb-1 relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <AnimatedStatCounter value={stat.value} suffix="+" />
                  {/* Number glow */}
                  <motion.span 
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent blur-sm opacity-50`}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}+
                  </motion.span>
                </motion.h3>
                
                <p className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-semibold text-lg`}>{stat.label}</p>
                <p className="text-gray-400 text-sm mt-1 text-center">{stat.subtext}</p>
                
                {/* Bottom accent line */}
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-lg border border-yellow-400/10"
              >
                <div className="bg-yellow-400/30 rounded-full h-2 w-2"></div>
                <span className="text-white">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
