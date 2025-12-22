/**
 * Newsletter3DModel - Animated 3D envelope model for newsletter section
 * Uses Three.js for rendering an animated mail/envelope theme
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Newsletter3DModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfacc15, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 0.8);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // Create envelope group
    const envelopeGroup = new THREE.Group();

    // Envelope body (main rectangle)
    const bodyGeometry = new THREE.BoxGeometry(2.4, 1.6, 0.1);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xfacc15,
      shininess: 80,
      specular: 0x444444
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    envelopeGroup.add(body);

    // Envelope flap (triangle on top)
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-1.2, 0);
    flapShape.lineTo(0, -0.9);
    flapShape.lineTo(1.2, 0);
    flapShape.lineTo(-1.2, 0);

    const flapGeometry = new THREE.ExtrudeGeometry(flapShape, {
      depth: 0.05,
      bevelEnabled: false
    });
    const flapMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf59e0b,
      shininess: 60
    });
    const flap = new THREE.Mesh(flapGeometry, flapMaterial);
    flap.position.set(0, 0.8, 0.05);
    flap.rotation.x = -0.3;
    envelopeGroup.add(flap);

    // Inner V shape on envelope front
    const vShape = new THREE.Shape();
    vShape.moveTo(-1.1, 0.7);
    vShape.lineTo(0, -0.2);
    vShape.lineTo(1.1, 0.7);
    vShape.lineTo(1.0, 0.7);
    vShape.lineTo(0, -0.1);
    vShape.lineTo(-1.0, 0.7);

    const vGeometry = new THREE.ShapeGeometry(vShape);
    const vMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xfbbf24,
      side: THREE.DoubleSide
    });
    const vMesh = new THREE.Mesh(vGeometry, vMaterial);
    vMesh.position.z = 0.06;
    envelopeGroup.add(vMesh);

    // Paper/letter peeking out
    const paperGeometry = new THREE.PlaneGeometry(2, 0.8);
    const paperMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    const paper = new THREE.Mesh(paperGeometry, paperMaterial);
    paper.position.set(0, 0.9, 0);
    envelopeGroup.add(paper);

    // Text lines on paper
    const lineGeometry = new THREE.PlaneGeometry(1.5, 0.08);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    
    for (let i = 0; i < 3; i++) {
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0, 1.1 - i * 0.15, 0.01);
      envelopeGroup.add(line);
    }

    // At symbol floating around
    const atGroup = new THREE.Group();
    const torusGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 32);
    const atMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x60a5fa,
      shininess: 100
    });
    const atTorus = new THREE.Mesh(torusGeometry, atMaterial);
    atGroup.add(atTorus);

    // @ symbol center
    const atCenterGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const atCenter = new THREE.Mesh(atCenterGeometry, atMaterial);
    atCenter.position.set(0.05, 0, 0);
    atGroup.add(atCenter);

    // @ tail
    const tailGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
    const tail = new THREE.Mesh(tailGeometry, atMaterial);
    tail.position.set(0.2, -0.05, 0);
    tail.rotation.z = -0.5;
    atGroup.add(tail);

    atGroup.position.set(1.8, 0.5, 0.5);
    scene.add(atGroup);

    // Floating particles (stars/sparkles)
    const particlesGroup = new THREE.Group();
    const particleGeometry = new THREE.OctahedronGeometry(0.06);
    const particleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xfacc15,
      emissive: 0xfacc15,
      emissiveIntensity: 0.3
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < 15; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      );
      particle.userData = {
        originalY: particle.position.y,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      };
      particles.push(particle);
      particlesGroup.add(particle);
    }
    scene.add(particlesGroup);

    // Add envelope to scene
    scene.add(envelopeGroup);

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);

      // Envelope floating animation
      envelopeGroup.position.y = Math.sin(time * 0.8) * 0.15;
      envelopeGroup.rotation.y = Math.sin(time * 0.5) * 0.1;
      envelopeGroup.rotation.z = Math.sin(time * 0.3) * 0.05;

      // Flap animation (opening/closing)
      flap.rotation.x = -0.3 + Math.sin(time * 0.6) * 0.15;

      // Paper peeking animation
      paper.position.y = 0.9 + Math.sin(time * 0.6) * 0.1;

      // @ symbol orbiting
      atGroup.position.x = 1.5 + Math.cos(time * 0.7) * 0.3;
      atGroup.position.y = 0.5 + Math.sin(time * 0.9) * 0.4;
      atGroup.rotation.z = time * 0.5;

      // Particles floating
      particles.forEach((particle) => {
        const { originalY, speed, offset } = particle.userData;
        particle.position.y = originalY + Math.sin(time * speed + offset) * 0.2;
        particle.rotation.x = time * speed;
        particle.rotation.y = time * speed * 0.7;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-48 md:h-64 lg:h-72"
      aria-hidden="true"
    />
  );
};

export default Newsletter3DModel;
