/**
 * Newsletter3DModel - Minimalist 3D envelope with sleek animations
 * Clean, elegant design with subtle floating motion
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

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

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

    // Soft lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfacc15, 0.8);
    mainLight.position.set(3, 4, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.3);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    // Main group
    const group = new THREE.Group();

    // Envelope - Clean geometric shape
    const envelopeGeometry = new THREE.BoxGeometry(2, 1.3, 0.08);
    const envelopeMaterial = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.1,
      roughness: 0.3,
    });
    const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
    group.add(envelope);

    // Envelope inner shadow line
    const lineGeometry = new THREE.PlaneGeometry(1.8, 0.02);
    const lineMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xd4a50a,
      transparent: true,
      opacity: 0.6
    });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(0, -0.2, 0.05);
    group.add(line);

    // Minimal flap - thin elegant triangle
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-0.95, 0);
    flapShape.lineTo(0, -0.55);
    flapShape.lineTo(0.95, 0);
    flapShape.closePath();

    const flapGeometry = new THREE.ShapeGeometry(flapShape);
    const flapMaterial = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.1,
      roughness: 0.4,
      side: THREE.DoubleSide
    });
    const flap = new THREE.Mesh(flapGeometry, flapMaterial);
    flap.position.set(0, 0.65, 0.04);
    group.add(flap);

    // Paper peek - subtle white
    const paperGeometry = new THREE.PlaneGeometry(1.7, 0.4);
    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.5,
    });
    const paper = new THREE.Mesh(paperGeometry, paperMaterial);
    paper.position.set(0, 0.75, 0);
    group.add(paper);

    // Single minimal text line on paper
    const textLineGeometry = new THREE.PlaneGeometry(1.2, 0.03);
    const textLineMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xe5e7eb,
      transparent: true,
      opacity: 0.8
    });
    const textLine = new THREE.Mesh(textLineGeometry, textLineMaterial);
    textLine.position.set(0, 0.8, 0.01);
    group.add(textLine);

    // Floating ring - subtle orbit element
    const ringGeometry = new THREE.TorusGeometry(0.15, 0.02, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.3,
      roughness: 0.2,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(1.4, 0.6, 0.3);
    scene.add(ring);

    // Small accent sphere
    const sphereGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.4,
      roughness: 0.1,
      emissive: 0xfacc15,
      emissiveIntensity: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-1.3, 0.4, 0.4);
    scene.add(sphere);

    // Second small sphere
    const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
    sphere2.position.set(1.1, -0.5, 0.3);
    sphere2.scale.setScalar(0.7);
    scene.add(sphere2);

    scene.add(group);

    // Smooth animation
    let time = 0;
    const animate = () => {
      time += 0.008;
      animationRef.current = requestAnimationFrame(animate);

      // Gentle floating
      group.position.y = Math.sin(time) * 0.08;
      group.rotation.y = Math.sin(time * 0.5) * 0.06;
      group.rotation.x = Math.sin(time * 0.3) * 0.02;

      // Subtle flap movement
      flap.rotation.x = Math.sin(time * 0.8) * 0.08;

      // Paper subtle peek
      paper.position.y = 0.75 + Math.sin(time * 0.8) * 0.03;

      // Ring rotation and float
      ring.rotation.x = time * 0.5;
      ring.rotation.z = time * 0.3;
      ring.position.y = 0.6 + Math.sin(time * 1.2) * 0.1;

      // Spheres gentle movement
      sphere.position.y = 0.4 + Math.sin(time * 0.9) * 0.12;
      sphere.position.x = -1.3 + Math.cos(time * 0.6) * 0.05;
      
      sphere2.position.y = -0.5 + Math.sin(time * 1.1 + 1) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-44 md:h-56"
      aria-hidden="true"
    />
  );
};

export default Newsletter3DModel;
