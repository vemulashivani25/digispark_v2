/**
 * ============================================================================
 * HeroSection.tsx - Main Landing Hero Component
 * ============================================================================
 * 
 * Full-screen hero section featuring:
 * - Animated headline with typing effect (cycles through keywords)
 * - Call-to-action buttons (Get Started, View Work)
 * - 3D Three.js background animation
 * - Ambient particles effect
 * - Scroll indicator
 * 
 * Used as the first visible section on the homepage.
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 */

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import * as THREE from "three";
import { motion } from "framer-motion";
import AmbientParticles from "./AmbientParticles";

const digitalWords = [
  "Digital",
  "Web",
  "Creative",
  "Modern",
  "Tech",
  "Smart",
  "Interactive",
  "Brand"
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [forward, setForward] = useState(true);

  useEffect(() => {
    let timeout: number;
    if (forward) {
      if (displayed !== digitalWords[index]) {
        timeout = window.setTimeout(() => {
          setDisplayed(digitalWords[index].slice(0, displayed.length + 1));
        }, 250);
      } else {
        timeout = window.setTimeout(() => setForward(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 150);
      } else {
        setForward(true);
        setIndex((prev) => (prev + 1) % digitalWords.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, index, forward]);

  return (
    <span className="text-yellow-400 relative">
      {displayed}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const neonContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const isMobile = useRef<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Store container reference for cleanup
    const container = containerRef.current;

    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
      updateRendererSize();
    };

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
    
    checkMobile();
    container.appendChild(rendererRef.current.domElement);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xEAB308,
      wireframe: true,
    });
    cubeRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(cubeRef.current);
    cameraRef.current.position.z = 5;

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    function updateRendererSize() {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      const scale = isMobile.current ? 0.6 : 1;
      
      rendererRef.current.setSize(
        containerWidth * scale, 
        containerHeight * scale
      );
      
      cameraRef.current.aspect = containerWidth / containerHeight;
      cameraRef.current.updateProjectionMatrix();
    }

    window.addEventListener('resize', () => {
      checkMobile();
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationFrameId);
      
      // Safely remove renderer domElement
      if (rendererRef.current) {
        const domElement = rendererRef.current.domElement;
        if (domElement && domElement.parentNode === container) {
          container.removeChild(domElement);
        }
        rendererRef.current.dispose();
      }
      
      // Dispose of Three.js resources
      if (cubeRef.current) {
        cubeRef.current.geometry.dispose();
        (cubeRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <section id="top" className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16 sm:pt-20">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 pointer-events-none"></div>
      
      {/* Elegant grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
      
      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(234,179,8,0.15),transparent)] pointer-events-none"></div>
      
      <AmbientParticles count={25} />
      
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Primary golden orb - top left */}
        <motion.div 
          className="absolute w-[35rem] sm:w-[55rem] h-[35rem] sm:h-[55rem] rounded-full bg-gradient-to-br from-yellow-400/10 via-yellow-500/5 to-transparent blur-3xl top-1/4 -left-1/3"
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.08, 0.15, 0.08],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Secondary purple orb - bottom right */}
        <motion.div 
          className="absolute w-[28rem] sm:w-[45rem] h-[28rem] sm:h-[45rem] rounded-full bg-gradient-to-tl from-purple-500/8 via-violet-400/5 to-transparent blur-3xl bottom-0 right-0"
          animate={{ 
            scale: [1.1, 1, 1.1], 
            opacity: [0.05, 0.12, 0.05],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Tertiary accent orb - center */}
        <motion.div 
          className="absolute w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] rounded-full bg-gradient-to-r from-amber-400/6 to-orange-400/4 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.04, 0.1, 0.04],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating light particles */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-yellow-400/40 top-[20%] left-[15%]"
          animate={{ 
            y: [0, -40, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300/50 top-[60%] right-[20%]"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-amber-400/60 top-[40%] left-[70%]"
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-500/45 top-[75%] left-[30%]"
          animate={{ 
            y: [0, -35, 0],
            opacity: [0.35, 0.85, 0.35],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Elegant line accents */}
        <motion.div
          className="absolute top-[30%] left-0 w-[200px] sm:w-[400px] h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent"
          animate={{ 
            x: [-100, 100, -100],
            opacity: [0, 0.6, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[25%] right-0 w-[150px] sm:w-[300px] h-[1px] bg-gradient-to-r from-transparent via-purple-400/15 to-transparent"
          animate={{ 
            x: [100, -100, 100],
            opacity: [0, 0.5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Corner glow accents */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-yellow-400/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-purple-400/3 to-transparent pointer-events-none"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 font-space animate-fade-in leading-tight">
              We Create <Typewriter /> Experiences
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 animate-fade-in opacity-90 max-w-xl mx-auto lg:mx-0">
              Transform your brand with cutting-edge design and innovative solutions
            </p>
            <div className="flex flex-row justify-center lg:justify-start gap-2 sm:gap-3">
              <Button
                size="default"
                className="min-h-[40px] sm:min-h-[44px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-black 
                  hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 
                  text-sm sm:text-base font-semibold px-4 sm:px-6"
              >
                <span className="flex items-center">
                  View Work
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </span>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="min-h-[40px] sm:min-h-[44px] text-yellow-400 border-yellow-400 hover:bg-yellow-400/10 text-sm sm:text-base font-semibold px-4 sm:px-6"
              >
                Contact
              </Button>
            </div>
          </div>
          <div 
            ref={neonContainerRef}
            className="relative mt-4 lg:mt-0 hidden sm:block cursor-pointer"
            onMouseMove={(e) => {
              if (neonContainerRef.current) {
                const rect = neonContainerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                setMousePosition({ x, y });
              }
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setMousePosition({ x: 0, y: 0 });
            }}
          >
            {/* Black background base */}
            <div className="absolute -inset-16 sm:-inset-20 bg-black rounded-full" />
            
            {/* Neon half-circle arc - outer */}
            <motion.div 
              className="absolute -inset-14 sm:-inset-18"
              animate={{ 
                rotateZ: isHovering ? mousePosition.x * 15 : 0,
                rotateX: isHovering ? mousePosition.y * 10 : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "drop-shadow(0 0 20px rgba(234, 179, 8, 0.8)) drop-shadow(0 0 40px rgba(234, 179, 8, 0.5))" }}>
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#eab308" stopOpacity="1" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#neonGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                    strokeWidth: isHovering ? [3, 5, 3] : [3, 4, 3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            
            {/* Neon half-circle arc - middle */}
            <motion.div 
              className="absolute -inset-10 sm:-inset-14"
              animate={{ 
                rotateZ: isHovering ? mousePosition.x * 20 : 0,
                rotateX: isHovering ? mousePosition.y * 15 : 0
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "drop-shadow(0 0 15px rgba(234, 179, 8, 0.9)) drop-shadow(0 0 30px rgba(234, 179, 8, 0.6))" }}>
                <motion.path
                  d="M 30 100 A 70 70 0 0 1 170 100"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                    pathLength: isHovering ? [0.7, 1, 0.7] : [0.9, 1, 0.9]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
              </svg>
            </motion.div>
            
            {/* Neon half-circle arc - inner bright */}
            <motion.div 
              className="absolute -inset-6 sm:-inset-10"
              animate={{ 
                rotateZ: isHovering ? mousePosition.x * 25 : 0,
                rotateX: isHovering ? mousePosition.y * 20 : 0
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 1)) drop-shadow(0 0 25px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 50px rgba(234, 179, 8, 0.5))" }}>
                <motion.path
                  d="M 40 100 A 60 60 0 0 1 160 100"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ 
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
              </svg>
            </motion.div>
            
            {/* Animated neon dots along the arc */}
            {[...Array(7)].map((_, i) => {
              const angle = (Math.PI / 6) * (i + 1);
              const radius = 90;
              const x = 100 + Math.cos(Math.PI - angle) * radius;
              const y = 100 - Math.sin(angle) * radius;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-400"
                  style={{ 
                    left: `calc(${x / 2}% - 4px)`, 
                    top: `calc(${y / 2}% - 4px)`,
                    boxShadow: "0 0 10px #eab308, 0 0 20px #eab308, 0 0 30px #fbbf24"
                  }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                    boxShadow: isHovering 
                      ? ["0 0 10px #eab308, 0 0 20px #eab308", "0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #eab308", "0 0 10px #eab308, 0 0 20px #eab308"]
                      : ["0 0 10px #eab308, 0 0 20px #eab308", "0 0 15px #fbbf24, 0 0 30px #fbbf24", "0 0 10px #eab308, 0 0 20px #eab308"]
                  }}
                  transition={{ 
                    duration: 1.5 + i * 0.2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.15
                  }}
                />
              );
            })}
            
            {/* Center glow effect */}
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.3)_0%,transparent_60%)]"
              animate={{ 
                opacity: isHovering ? [0.5, 0.9, 0.5] : [0.3, 0.5, 0.3],
                scale: isHovering ? [1, 1.1, 1] : [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Flickering neon effect */}
            <motion.div 
              className="absolute -inset-12 sm:-inset-16 rounded-t-full"
              style={{ 
                background: "linear-gradient(to top, transparent 40%, rgba(234, 179, 8, 0.1) 100%)",
                clipPath: "polygon(0% 50%, 100% 50%, 100% 0%, 0% 0%)"
              }}
              animate={{ 
                opacity: [0.3, 0.6, 0.2, 0.5, 0.3]
              }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Electric spark particles */}
            {isHovering && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-yellow-200"
                    style={{
                      left: `${30 + i * 10}%`,
                      top: `${20 + (i % 3) * 15}%`,
                      boxShadow: "0 0 8px #fef08a, 0 0 15px #fbbf24"
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                      y: [0, -20, 0],
                      x: [0, (i % 2 === 0 ? 10 : -10), 0]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
            
            {/* 3D container */}
            <motion.div 
              ref={containerRef} 
              className="relative flex justify-center items-center p-4 sm:p-6 rounded-xl h-[150px] sm:h-[200px] md:h-[250px] bg-black/80 backdrop-blur-sm border border-yellow-400/30 shadow-[0_0_30px_rgba(234,179,8,0.2),inset_0_0_30px_rgba(234,179,8,0.1)]"
              animate={{
                rotateY: isHovering ? mousePosition.x * 5 : 0,
                rotateX: isHovering ? -mousePosition.y * 5 : 0
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ArrowDown className="text-yellow-400 h-6 w-6 sm:h-8 sm:w-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
