/**
 * Animated Auth Icon with Login-related vectors
 */

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedAuthIcon: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  return (
    <div className="relative w-20 h-20 mx-auto mb-6">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-dashed border-yellow-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner glowing container */}
      <motion.div
        className="absolute inset-2 rounded-xl bg-gradient-to-br from-yellow-400/20 via-green-400/10 to-yellow-400/20 border border-yellow-400/40 flex items-center justify-center overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
        
        {/* Animated Icon SVG */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10"
        >
          {isLogin ? (
            // Login/Key icon animation
            <>
              {/* Door frame */}
              <motion.rect
                x="3"
                y="2"
                width="12"
                height="20"
                rx="2"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              {/* Door handle */}
              <motion.circle
                cx="12"
                cy="12"
                r="1.5"
                fill="#facc15"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              />
              {/* Arrow entering */}
              <motion.path
                d="M17 12H22M22 12L19 9M22 12L19 15"
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
              />
            </>
          ) : (
            // Create account/User+ icon animation
            <>
              {/* User circle */}
              <motion.circle
                cx="10"
                cy="8"
                r="4"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                fill="none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              />
              {/* User body */}
              <motion.path
                d="M2 20C2 16.6863 5.13401 14 10 14"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              {/* Plus sign */}
              <motion.g
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.7, type: 'spring' }}
              >
                <line x1="18" y1="11" x2="18" y2="19" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="15" x2="22" y2="15" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              </motion.g>
            </>
          )}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400/60"
          style={{
            left: `${20 + i * 20}%`,
            top: i % 2 === 0 ? '-10%' : '110%',
          }}
          animate={{
            y: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedAuthIcon;
