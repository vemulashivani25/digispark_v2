import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Headphones, Users, Zap, Pen, Lightbulb, Briefcase, MapPin, Coffee, Timer, Headphones as HeadphonesIcon, Heart, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Role {
  title: string;
  icon: React.ElementType;
  tagline: string;
  color: string;
  description: string;
}

interface QuickFact {
  icon: string;
  label: string;
  value: string;
}

const MeetTheTeamSection = () => {
  const [activeRole, setActiveRole] = useState(0);
  const [hoveredRole, setHoveredRole] = useState<number | null>(null);
  
  const roles: Role[] = [
    { 
      title: "Full-Stack Developer", 
      icon: Code, 
      tagline: "Building Digital Wonders", 
      color: "from-blue-500 to-purple-600",
      description: "Passionate about elegant code and robust architectures. Turning coffee into cutting-edge websites since 2015."
    },
    { 
      title: "Audio/Video Editor", 
      icon: Headphones, 
      tagline: "Pixels with Purpose", 
      color: "from-red-500 to-pink-600",
      description: "Creating visual stories that captivate audiences. Every frame and beat meticulously crafted to perfection."
    },
    { 
      title: "Digital Marketer", 
      icon: Users, 
      tagline: "Converting Clicks to Clients", 
      color: "from-green-500 to-teal-600",
      description: "Data-driven strategies that deliver real results. Your brand's biggest fan and growth advocate."
    },
    { 
      title: "Automation Specialist", 
      icon: Zap, 
      tagline: "Making The Machines Work For You", 
      color: "from-orange-500 to-amber-600",
      description: "Automating the mundane so you can focus on what matters. Working smarter, not harder."
    },
    { 
      title: "Copywriter", 
      icon: Pen, 
      tagline: "Words That Work", 
      color: "from-cyan-500 to-blue-600",
      description: "Crafting compelling narratives that convert. Every word meticulously chosen to tell your story."
    },
    { 
      title: "Creative Strategist", 
      icon: Lightbulb, 
      tagline: "Ideas Worth Implementing", 
      color: "from-purple-500 to-indigo-600",
      description: "Thinking outside the box, inside the box, and sometimes redesigning the box entirely."
    },
    { 
      title: "Virtual Executive", 
      icon: Briefcase, 
      tagline: "Vision Meets Execution", 
      color: "from-yellow-400 to-amber-600",
      description: "Bringing Fortune 500 strategies to businesses of all sizes. Your success is my mission."
    }
  ];

  const quickFacts: QuickFact[] = [
    { icon: "📍", label: "Based in", value: "India" },
    { icon: "☕", label: "Powered by", value: "Coffee & curiosity" },
    { icon: "⚡", label: "Response time", value: "Fast" },
    { icon: "🎧", label: "Work mode", value: "Deep focus" },
    { icon: "❤️", label: "Values", value: "Clarity, quality, ownership" }
  ];

  const ActiveRoleIcon = roles[activeRole].icon;

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="meet-team">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.08)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
        
        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(250,204,21,${0.03 + i * 0.01}) 0%, transparent 70%)`,
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">The Solo Powerhouse</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            One Mind. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Many Skills.</span>
          </h2>
        </motion.div>

        {/* Main Content - Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Hero Card - Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black border border-gray-800/50 rounded-3xl p-8 md:p-10 h-full backdrop-blur-sm">
              {/* Animated Accent Line */}
              <motion.div 
                className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <motion.div 
                  className="relative shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-yellow-400/30 relative">
                    <img 
                      src="/expert-avatar.svg" 
                      alt="Jarviz - Aravind" 
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-transparent"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  {/* Status Indicator */}
                  <motion.div 
                    className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-black flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="sr-only">Available</span>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Hi, I'm <span className="text-yellow-400">Jarviz</span>, aka Aravind— the builder, strategist, and creative force behind DigiSpark.
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-300 text-lg mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    I design, build, and automate digital solutions that help brands grow smarter, faster, and stronger — without unnecessary complexity.
                  </motion.p>

                  {/* Trust Line */}
                  <motion.div 
                    className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-yellow-400/90 text-sm md:text-base font-medium">
                      ✨ No middle layers. No handoffs.<br/>
                      <span className="text-gray-300">You work directly with the person building your solution.</span>
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Facts Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black border border-gray-800/50 rounded-3xl p-6 md:p-8 h-full backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">⚡</span>
                Quick Facts
              </h4>
              
              <div className="space-y-4">
                {quickFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <span className="text-2xl">{fact.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">{fact.label}</p>
                      <p className="text-white font-medium group-hover:text-yellow-400 transition-colors">{fact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills/Roles Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-12"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black border border-gray-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">🎭</span>
                  The Many Hats I Wear
                </h4>
                <p className="text-gray-400 text-sm">Click to explore each role</p>
              </div>

              {/* Role Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {roles.map((role, index) => {
                  const RoleIcon = role.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setActiveRole(index)}
                      onMouseEnter={() => setHoveredRole(index)}
                      onMouseLeave={() => setHoveredRole(null)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                        activeRole === index
                          ? "bg-gradient-to-r " + role.color + " text-white border-transparent shadow-lg"
                          : "bg-gray-800/50 text-gray-300 border-gray-700/50 hover:border-yellow-400/30 hover:bg-gray-800"
                      }`}
                    >
                      <RoleIcon className="w-4 h-4" />
                      <span className="font-medium text-sm">{role.title}</span>
                      
                      {activeRole === index && (
                        <motion.div
                          layoutId="activeRoleIndicator"
                          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                          style={{ x: "-50%" }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Role Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className={`relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br ${roles[activeRole].color}`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
                      backgroundSize: '30px 30px'
                    }}></div>
                  </div>

                  <div className="relative flex flex-col md:flex-row items-start gap-6">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0"
                      initial={{ rotate: -10, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <ActiveRoleIcon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <motion.h5 
                        className="text-2xl md:text-3xl font-bold text-white mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        {roles[activeRole].title}
                      </motion.h5>
                      <motion.p 
                        className="text-white/80 text-lg mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        "{roles[activeRole].tagline}"
                      </motion.p>
                      <motion.p 
                        className="text-white/90 text-base leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                      >
                        {roles[activeRole].description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/5"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-12 w-16 h-16 rounded-full bg-white/5"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Role Navigation Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {roles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveRole(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeRole 
                        ? "bg-yellow-400 w-6" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to role ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black text-lg py-7 px-10 rounded-2xl shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 font-semibold group"
            >
              <span>Let's Build Something Impact & Brilliant</span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          <motion.p 
            className="text-gray-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Direct collaboration, no middlemen ✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheTeamSection;
