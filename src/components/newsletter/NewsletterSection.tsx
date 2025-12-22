
import React from "react";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { Sparkles, Bell, Mail, Zap } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:20px_20px]"></div>
      <div className="absolute w-[20rem] h-[20rem] bg-yellow-400/5 rounded-full blur-3xl -top-10 left-[10%] animate-pulse-slow"></div>
      <div className="absolute w-[25rem] h-[25rem] bg-yellow-400/5 rounded-full blur-3xl -bottom-32 right-[5%] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Enhanced Animation - Left Side */}
            <motion.div 
              className="hidden md:flex items-center justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-48 h-48">
                {/* Main envelope icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-400/30">
                      <Mail className="w-12 h-12 text-black" />
                    </div>
                    
                    {/* Notification badge */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Bell className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Orbiting icons */}
                <motion.div
                  className="absolute w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-purple-400/30"
                  animate={{ 
                    x: [0, 60, 0, -60, 0],
                    y: [-60, 0, 60, 0, -60],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ top: '50%', left: '50%', marginTop: -20, marginLeft: -20 }}
                >
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </motion.div>
                
                <motion.div
                  className="absolute w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-blue-400/30"
                  animate={{ 
                    x: [60, 0, -60, 0, 60],
                    y: [0, 60, 0, -60, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ top: '50%', left: '50%', marginTop: -20, marginLeft: -20 }}
                >
                  <Zap className="w-5 h-5 text-blue-400" />
                </motion.div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
            
            {/* Newsletter Content - Right Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">Stay Updated</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <span className="text-yellow-400">DigiSpark</span> Updates
                </h2>
                <p className="text-gray-300 mb-6">
                  Stay in the loop with our latest digital insights and industry news
                </p>
                
                <NewsletterForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
