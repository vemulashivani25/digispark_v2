/**
 * ============================================================================
 * ProcessSection.tsx - Work Process Display Component
 * ============================================================================
 * 
 * Displays the agency's work process in a visually appealing grid layout.
 * Used on the homepage to show the step-by-step approach to project delivery.
 * 
 * Features:
 * - Animated cards with hover effects
 * - Numbered steps with color-coded icons
 * - Responsive grid layout (1/2/3 columns)
 * - Timeline connector on desktop
 * - Gradient backgrounds per step
 * 
 * Usage:
 * ```tsx
 * <ProcessSection />
 * ```
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 */

import React from "react";
import { motion } from "framer-motion";
import { Search, Code, Layers, CheckCircle, Rocket, HeartHandshake } from "lucide-react";

const processes = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description: "Deep analysis of your needs and market research",
    color: "from-yellow-400/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
    borderColor: "group-hover:border-yellow-400/50",
    hoverColor: "hover:border-yellow-400"
  },
  {
    number: "02",
    icon: Layers,
    title: "Design",
    description: "Creating intuitive and beautiful interfaces",
    color: "from-blue-400/20 to-blue-600/20",
    iconColor: "text-blue-400",
    borderColor: "group-hover:border-blue-400/50",
    hoverColor: "hover:border-blue-400"
  },
  {
    number: "03",
    icon: Code,
    title: "Development",
    description: "Building your solution with cutting-edge tech",
    color: "from-purple-400/20 to-purple-600/20",
    iconColor: "text-purple-400",
    borderColor: "group-hover:border-purple-400/50",
    hoverColor: "hover:border-purple-400"
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Testing",
    description: "Ensuring quality and performance",
    color: "from-green-400/20 to-green-600/20",
    iconColor: "text-green-400",
    borderColor: "group-hover:border-green-400/50",
    hoverColor: "hover:border-green-400"
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    description: "Deploying and monitoring your solution",
    color: "from-red-400/20 to-red-600/20",
    iconColor: "text-red-400",
    borderColor: "group-hover:border-red-400/50",
    hoverColor: "hover:border-red-400"
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Support",
    description: "Ongoing maintenance and optimization",
    color: "from-amber-400/20 to-amber-600/20",
    iconColor: "text-amber-400",
    borderColor: "group-hover:border-amber-400/50",
    hoverColor: "hover:border-amber-400"
  }
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-gradient-to-br from-black via-gray-900/95 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
      <div className="absolute w-full h-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Our Process
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A systematic approach to delivering exceptional digital solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {processes.map((process, idx) => {
            const Icon = process.icon;
            return (
              <motion.div
                key={process.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${process.color} 
                  backdrop-blur-lg border border-white/10 ${process.hoverColor} 
                  hover:transform hover:scale-105 transition-all duration-300
                  hover:shadow-lg`}
              >
                <span className="block text-4xl font-bold text-gray-700/20 mb-4">{process.number}</span>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gray-900 ${process.iconColor} 
                    group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 
                      transition-colors">{process.title}</h3>
                    <p className="text-gray-400">{process.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-1">
                  <div className="h-1 w-16 bg-gradient-to-r from-yellow-400/50 to-transparent rounded" />
                  <div className="h-1 w-12 bg-gradient-to-r from-yellow-400/30 to-transparent rounded" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
