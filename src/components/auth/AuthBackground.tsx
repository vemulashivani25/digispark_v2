/**
 * Animated Background for Auth Page
 * Features floating geometric shapes, particles, and gradient effects
 */

import React from 'react';
import { motion } from 'framer-motion';

const AuthBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 70%)',
          bottom: '-15%',
          left: '-10%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Floating geometric shapes */}
      <FloatingShape
        className="top-[15%] left-[10%]"
        shape="hexagon"
        size={80}
        color="yellow"
        delay={0}
      />
      <FloatingShape
        className="top-[25%] right-[15%]"
        shape="triangle"
        size={60}
        color="green"
        delay={1}
      />
      <FloatingShape
        className="bottom-[30%] left-[8%]"
        shape="circle"
        size={50}
        color="yellow"
        delay={2}
      />
      <FloatingShape
        className="bottom-[20%] right-[12%]"
        shape="square"
        size={40}
        color="green"
        delay={0.5}
      />
      <FloatingShape
        className="top-[60%] left-[20%]"
        shape="diamond"
        size={45}
        color="yellow"
        delay={1.5}
      />
      <FloatingShape
        className="top-[40%] right-[25%]"
        shape="hexagon"
        size={35}
        color="green"
        delay={2.5}
      />

      {/* Animated lines/connectors */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,200 Q300,100 600,200 T1200,200"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,400 Q400,300 800,400 T1600,400"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
        />
      </svg>

      {/* Particle dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? '#facc15' : '#22c55e',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250, 204, 21, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250, 204, 21, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

// Floating Shape Component
interface FloatingShapeProps {
  className: string;
  shape: 'hexagon' | 'triangle' | 'circle' | 'square' | 'diamond';
  size: number;
  color: 'yellow' | 'green';
  delay: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  className,
  shape,
  size,
  color,
  delay,
}) => {
  const colorClass = color === 'yellow' 
    ? 'stroke-yellow-400/30 fill-yellow-400/5' 
    : 'stroke-green-400/30 fill-green-400/5';

  const renderShape = () => {
    switch (shape) {
      case 'hexagon':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              className={colorClass}
              strokeWidth="2"
            />
          </svg>
        );
      case 'triangle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,10 90,90 10,90"
              className={colorClass}
              strokeWidth="2"
            />
          </svg>
        );
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className={colorClass}
              strokeWidth="2"
            />
          </svg>
        );
      case 'square':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              className={colorClass}
              strokeWidth="2"
            />
          </svg>
        );
      case 'diamond':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,5 95,50 50,95 5,50"
              className={colorClass}
              strokeWidth="2"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 6 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

export default AuthBackground;
