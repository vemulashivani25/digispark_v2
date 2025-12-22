
import { motion } from "framer-motion";

interface Process {
  number: number;
  icon: JSX.Element;
  title: string;
  description: string;
}

interface ProcessTimelineSectionProps {
  title: string;
  subtitle: string;
  titleHighlight?: string;
  processes: Process[];
  darkMode?: boolean;
}

const ProcessTimelineSection = ({
  title,
  titleHighlight,
  subtitle,
  processes,
  darkMode = false,
}: ProcessTimelineSectionProps) => {
  return (
    <section className={`py-24 ${darkMode ? "bg-black" : "bg-white"} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className={`absolute inset-0 ${darkMode ? "bg-gradient-to-b from-black via-black/95 to-black/90" : "bg-gradient-to-b from-white via-white/95 to-white/90"} pointer-events-none`}></div>
      
      {/* Gradient Orbs */}
      <div className="absolute w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -top-48 -left-48"></div>
      <div className="absolute w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -bottom-48 -right-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title} <span className="text-yellow-500">{titleHighlight}</span>
          </motion.h2>
          <motion.p
            className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Two-Row Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, idx) => (
            <motion.div
              key={idx}
              className={`relative p-6 rounded-2xl backdrop-blur-md
                ${darkMode 
                  ? "bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50" 
                  : "bg-gradient-to-br from-white/80 to-gray-50/50 border border-gray-200/50"}
                shadow-xl group hover:scale-105 transition-all duration-300
                hover:shadow-yellow-500/10`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Step Number Badge */}
              <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center 
                ${darkMode ? "bg-yellow-500" : "bg-yellow-400"} text-black font-bold text-lg
                shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                {process.number}
              </div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5
                ${darkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50" 
                  : "bg-gradient-to-br from-gray-50 to-white border border-gray-200/50"}
                shadow-inner group-hover:shadow-yellow-400/20 transition-all duration-300`}>
                {process.icon}
              </div>
              
              {/* Content */}
              <h3 className={`text-xl font-bold mb-3 
                ${darkMode ? "text-white" : "text-gray-900"}
                group-hover:text-yellow-500 transition-colors`}>
                {process.title}
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                {process.description}
              </p>
              
              {/* Decorative Line */}
              <div className="mt-5 flex gap-1">
                <div className={`h-1 w-12 rounded-full ${darkMode ? "bg-yellow-500/50" : "bg-yellow-400/50"}`} />
                <div className={`h-1 w-8 rounded-full ${darkMode ? "bg-yellow-500/30" : "bg-yellow-400/30"}`} />
                <div className={`h-1 w-4 rounded-full ${darkMode ? "bg-yellow-500/20" : "bg-yellow-400/20"}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimelineSection;
