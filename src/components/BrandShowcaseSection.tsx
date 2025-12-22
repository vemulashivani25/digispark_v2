
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Sample brand logos - replace with your actual brand images or logos
const brands = [
  { name: "Microsoft", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
  { name: "Google", logo: "https://cdn.worldvectorlogo.com/logos/google-2015.svg" },
  { name: "Amazon", logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg" },
  { name: "Apple", logo: "https://cdn.worldvectorlogo.com/logos/apple-13.svg" },
  { name: "Meta", logo: "https://cdn.worldvectorlogo.com/logos/meta-1.svg" },
  { name: "Salesforce", logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" },
];

const BrandShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for brands
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <section 
      ref={containerRef}
      className="py-16 bg-black relative overflow-hidden border-t border-b border-white/5"
    >
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50 pointer-events-none" />
      
      {/* Animated background shapes */}
      <div className="absolute w-full h-full overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-yellow-400/5 blur-[80px]"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-400/5 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ bottom: "10%", right: "5%" }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-medium text-gray-400">
            Trusted by Industry Leaders
          </h2>
        </motion.div>
        
        <motion.div style={{ y }} className="relative">
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="py-4 overflow-hidden">
            <div className="flex gap-20 items-center marquee">
              <div className="flex gap-20 items-center marquee-content">
                {[...brands, ...brands].map((brand, index) => (
                  <motion.div
                    key={`${brand.name}-${index}`}
                    className="group flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 % 0.6 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className="w-32 h-32 rounded-xl flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4 border border-gray-800 group-hover:border-yellow-500/30 transition-colors">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-14 w-auto opacity-40 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandShowcaseSection;
