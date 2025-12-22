
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { CircleDot, BarChart3, Globe, Users, Award } from "lucide-react";
import AnimatedCounter from "../AnimatedCounter";

const statItems = [
  {
    icon: Globe,
    value: 120,
    label: "Global Clients",
    color: "from-blue-500 to-blue-700",
    delay: 0.1
  },
  {
    icon: BarChart3,
    value: 600,
    label: "Projects Completed",
    color: "from-yellow-400 to-yellow-600",
    delay: 0.2
  },
  {
    icon: Award,
    value: 25,
    label: "Industry Awards",
    color: "from-purple-500 to-purple-700",
    delay: 0.3
  },
  {
    icon: Users,
    value: 15,
    label: "Years Experience",
    color: "from-green-500 to-green-700",
    delay: 0.4
  },
];

const ConnectionLines = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    // Animate connection lines
    const animateLines = async () => {
      await controls.start({
        pathLength: 1,
        transition: { duration: 1.5, ease: "easeInOut" }
      });
    };
    
    animateLines();
  }, [controls]);

  return (
    <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-0" style={{ maxWidth: 900 }}>
      <defs>
        <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EAB30880" />
          <stop offset="100%" stopColor="#EAB30810" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <motion.path
        d="M150,100 C300,50 500,150 750,100" 
        stroke="url(#gradientLine)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        filter="url(#glow)"
      />
      
      <motion.path
        d="M150,200 C300,300 500,200 750,300"
        stroke="url(#gradientLine)" 
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        transition={{ delay: 0.5 }}
        filter="url(#glow)"
      />
    </svg>
  );
};

const AgencyStatsInfoGraphic: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-400/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Our <span className="text-yellow-400">Impact</span> In Numbers
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Measurable results that speak volumes about our commitment to excellence and client success
          </motion.p>
        </div>
        
        <div ref={ref} className="relative mx-auto max-w-5xl">
          <ConnectionLines />
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate={controls}
          >
            {statItems.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      delay: stat.delay
                    }
                  }
                }}
                className="relative group"
              >
                <div 
                  className={`p-8 bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden
                    hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_10px_40px_-15px_rgba(234,179,8,0.3)]
                    relative`}
                >
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-yellow-400/0 rounded-full" />
                  <div className="absolute -left-5 -bottom-5 w-20 h-20 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-full" />
                  
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} inline-block mb-4 shadow-lg`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter 
                      target={stat.value} 
                      label={stat.label}
                    />
                    <span className="text-yellow-400">+</span>
                  </h3>
                </div>
                
                {idx < statItems.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <CircleDot className="h-4 w-4 text-yellow-400/80" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgencyStatsInfoGraphic;
