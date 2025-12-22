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
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const isMobile = useRef<boolean>(false);

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
          <div className="relative mt-4 lg:mt-0 hidden sm:block">
            {/* Outer pulsing semi-circle glow */}
            <motion.div 
              className="absolute -inset-8 sm:-inset-12 bg-gradient-to-t from-yellow-400/0 via-yellow-400/15 to-yellow-400/25 rounded-t-full blur-2xl"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Inner intense glow ring */}
            <motion.div 
              className="absolute -inset-4 sm:-inset-6 bg-gradient-to-t from-transparent via-yellow-500/20 to-yellow-400/30 rounded-t-full blur-xl"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.08, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            {/* Radial glow burst effect */}
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.25)_0%,transparent_70%)]"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.15, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Rotating arc glow */}
            <motion.div 
              className="absolute -inset-6 sm:-inset-10"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-gradient-to-b from-yellow-400/30 via-yellow-400/10 to-transparent rounded-t-full blur-lg" />
            </motion.div>
            
            {/* Secondary rotating arc */}
            <motion.div 
              className="absolute -inset-4 sm:-inset-8"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[30%] bg-gradient-to-t from-amber-400/25 via-amber-400/10 to-transparent rounded-b-full blur-md" />
            </motion.div>
            
            {/* Sparkle particles around the 3D element */}
            <motion.div
              className="absolute -top-2 left-1/4 w-1.5 h-1.5 rounded-full bg-yellow-300"
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
                y: [0, -15, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/4 -right-2 w-1 h-1 rounded-full bg-yellow-400"
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                x: [0, 10, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            />
            <motion.div
              className="absolute bottom-1/4 -left-3 w-1.5 h-1.5 rounded-full bg-amber-300"
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.3, 0.5],
                x: [0, -12, 0]
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
            
            {/* Base glow behind container */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
            
            {/* 3D container with enhanced border glow */}
            <div 
              ref={containerRef} 
              className="relative flex justify-center items-center p-4 sm:p-6 rounded-xl h-[150px] sm:h-[200px] md:h-[250px] bg-black/40 backdrop-blur-md border border-yellow-400/20 shadow-[0_0_40px_rgba(234,179,8,0.15),inset_0_0_20px_rgba(234,179,8,0.05)]" 
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
