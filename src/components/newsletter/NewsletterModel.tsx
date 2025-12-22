
import { useEffect, useRef } from "react";
import * as THREE from "three";

const NewsletterModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Create animated email 3D model
    const emailGroup = new THREE.Group();
    
    // Create envelope base
    const envelopeGeometry = new THREE.BoxGeometry(2, 1.2, 0.2);
    const envelopeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xEAB308, // Yellow to match theme
      metalness: 0.2,
      roughness: 0.5,
      transparent: true,
      opacity: 0.9
    });
    const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
    emailGroup.add(envelope);
    
    // Create envelope flap
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-1, 0.6);
    flapShape.lineTo(0, 1.2);
    flapShape.lineTo(1, 0.6);
    flapShape.lineTo(-1, 0.6);
    
    const flapGeometry = new THREE.ShapeGeometry(flapShape);
    const flapMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xF0DB74, // Lighter yellow
      metalness: 0.2,
      roughness: 0.6,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
    const flap = new THREE.Mesh(flapGeometry, flapMaterial);
    flap.position.z = 0.11;
    emailGroup.add(flap);
    
    // Create paper/message
    const paperGeometry = new THREE.PlaneGeometry(1.8, 1.6);
    const paperMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xF8FAFC,
      side: THREE.DoubleSide
    });
    const paper = new THREE.Mesh(paperGeometry, paperMaterial);
    paper.position.z = 0.05;
    paper.position.y = -0.1;
    
    // Add text lines to the paper
    const textLineGeometry1 = new THREE.PlaneGeometry(1.4, 0.1);
    const textLineMaterial = new THREE.MeshBasicMaterial({ color: 0xD1D5DB });
    
    for (let i = 0; i < 6; i++) {
      const textLine = new THREE.Mesh(textLineGeometry1, textLineMaterial);
      textLine.position.y = 0.5 - (i * 0.2);
      paper.add(textLine);
    }
    
    emailGroup.add(paper);
    
    // Create @ symbol for email
    const atSymbolGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 32);
    const atSymbolMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xEAB308,
      emissive: 0xEAB308,
      emissiveIntensity: 0.2,
      metalness: 0.8,
      roughness: 0.2
    });
    const atSymbol = new THREE.Mesh(atSymbolGeometry, atSymbolMaterial);
    atSymbol.position.set(0, 0, 0.5);
    atSymbol.rotation.x = Math.PI / 2;
    
    // Add a line through the @ symbol
    const lineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 16);
    const lineMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xEAB308,
      emissive: 0xEAB308,
      emissiveIntensity: 0.2
    });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.rotation.x = Math.PI / 2;
    line.position.set(0, 0, 0.5);
    
    // Create a decorative email notification icon
    const notificationGroup = new THREE.Group();
    
    // Notification circle
    const circleGeometry = new THREE.CircleGeometry(0.3, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 0xEAB308,
      side: THREE.DoubleSide
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.set(1, 1, 0.5);
    notificationGroup.add(circle);
    
    // Notification number
    const numberGeometry = new THREE.CircleGeometry(0.15, 32);
    const numberMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide
    });
    const number = new THREE.Mesh(numberGeometry, numberMaterial);
    number.position.set(1, 1, 0.55);
    notificationGroup.add(number);
    
    // Add notification to scene
    emailGroup.add(notificationGroup);
    emailGroup.add(atSymbol);
    emailGroup.add(line);
    
    // Add small decorative particles around the email
    const particles = new THREE.Group();
    
    for (let i = 0; i < 25; i++) {
      const size = Math.random() * 0.12 + 0.03;
      const geometry = Math.random() > 0.5 ? 
          new THREE.SphereGeometry(size, 16, 16) : 
          new THREE.BoxGeometry(size, size, size);
          
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0xEAB308 : 0xF0DB74,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Position particles in a spherical pattern around the envelope
      const radius = Math.random() * 2.5 + 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
      particle.position.z = radius * Math.cos(phi);
      
      particles.add(particle);
    }
    
    emailGroup.add(particles);
    scene.add(emailGroup);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, 5, 5);
    scene.add(dirLight);
    
    const pointLight = new THREE.PointLight(0xEAB308, 1.5, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    camera.position.z = 4;

    // Add responsive behavior for mobile
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        camera.position.z = 5; // Move camera back for better mobile view
        emailGroup.scale.set(0.8, 0.8, 0.8); // Scale down on mobile
      } else {
        camera.position.z = 4;
        emailGroup.scale.set(1, 1, 1);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the email group
      emailGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.3;
      emailGroup.rotation.x = Math.sin(Date.now() * 0.0015) * 0.1;
      
      // Make flap and paper move slightly
      flap.rotation.x = Math.sin(Date.now() * 0.002) * 0.05;
      paper.position.y = -0.1 + Math.sin(Date.now() * 0.003) * 0.1;
      
      // Animate @ symbol
      atSymbol.rotation.z += 0.01;
      
      // Animate notification
      notificationGroup.position.y = Math.sin(Date.now() * 0.005) * 0.1;
      
      // Animate particles
      particles.children.forEach((particle, i) => {
        particle.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
        particle.rotation.y += 0.01;
        particle.rotation.x += 0.005;
      });
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="aspect-square w-full max-w-xs mx-auto md:max-w-md"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default NewsletterModel;
