
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
    <section className={`py-12 sm:py-16 md:py-24 ${darkMode ? "bg-black" : "bg-white"} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className={`absolute inset-0 ${darkMode ? "bg-gradient-to-b from-black via-black/95 to-black/90" : "bg-gradient-to-b from-white via-white/95 to-white/90"} pointer-events-none`}></div>
      
      <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-yellow-400/5 rounded-full blur-3xl -top-32 sm:-top-48 -left-32 sm:-left-48"></div>
      <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-400/5 rounded-full blur-3xl -bottom-32 sm:-bottom-48 -right-32 sm:-right-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title} <span className="text-yellow-500">{titleHighlight}</span>
          </motion.h2>
          <motion.p
            className={`text-sm sm:text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {processes.map((process, idx) => (
            <motion.div
              key={idx}
              className={`relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-md
                ${darkMode 
                  ? "bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50" 
                  : "bg-gradient-to-br from-white/80 to-gray-50/50 border border-gray-200/50"}
                shadow-xl group hover:scale-[1.02] transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={`absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
                ${darkMode ? "bg-yellow-500" : "bg-yellow-400"} text-black font-bold text-sm sm:text-base md:text-lg
                shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                {process.number}
              </div>
              
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5
                ${darkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50" 
                  : "bg-gradient-to-br from-gray-50 to-white border border-gray-200/50"}
                shadow-inner`}>
                <div className="scale-75 sm:scale-90 md:scale-100">{process.icon}</div>
              </div>
              
              <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 
                ${darkMode ? "text-white" : "text-gray-900"}
                group-hover:text-yellow-500 transition-colors`}>
                {process.title}
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} leading-relaxed text-xs sm:text-sm md:text-base`}>
                {process.description}
              </p>
              
              <div className="mt-3 sm:mt-4 md:mt-5 flex gap-1">
                <div className={`h-0.5 sm:h-1 w-8 sm:w-12 rounded-full ${darkMode ? "bg-yellow-500/50" : "bg-yellow-400/50"}`} />
                <div className={`h-0.5 sm:h-1 w-5 sm:w-8 rounded-full ${darkMode ? "bg-yellow-500/30" : "bg-yellow-400/30"}`} />
                <div className={`h-0.5 sm:h-1 w-3 sm:w-4 rounded-full ${darkMode ? "bg-yellow-500/20" : "bg-yellow-400/20"}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimelineSection;
