import { motion } from "framer-motion";

interface AmbientParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

const AmbientParticles = ({ count = 30, color = "yellow", className = "" }: AmbientParticlesProps) => {
  const colorClasses = {
    yellow: "bg-yellow-400/20",
    purple: "bg-purple-400/20",
    blue: "bg-blue-400/20",
    white: "bg-white/10",
  };

  const bgColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.yellow;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${bgColor}`}
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40 - Math.random() * 30, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating orbs */}
      <motion.div
        className="absolute w-64 h-64 bg-yellow-400/5 rounded-full blur-[80px]"
        style={{ left: "10%", top: "20%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-purple-400/5 rounded-full blur-[60px]"
        style={{ right: "15%", bottom: "30%" }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default AmbientParticles;