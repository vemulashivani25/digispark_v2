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

    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
      updateRendererSize();
    };

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
    
    checkMobile();
    containerRef.current.appendChild(rendererRef.current.domElement);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xEAB308,
      wireframe: true,
    });
    cubeRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(cubeRef.current);
    cameraRef.current.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
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
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
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
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <section id="top" className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 pointer-events-none"></div>
      <AmbientParticles count={20} />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[30rem] sm:w-[50rem] h-[30rem] sm:h-[50rem] rounded-full bg-yellow-400/5 blur-3xl top-1/4 -left-1/3"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[25rem] sm:w-[40rem] h-[25rem] sm:h-[40rem] rounded-full bg-purple-400/5 blur-3xl bottom-0 right-0"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
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
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
            <div ref={containerRef} className="relative flex justify-center items-center glass-effect p-4 sm:p-6 rounded-xl h-[150px] sm:h-[200px] md:h-[250px]" />
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
