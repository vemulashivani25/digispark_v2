
// Utility for scroll-synced animations

// Create cursor trail elements
export const initCursorTrail = () => {
  if (typeof window === 'undefined') return;
  
  const maxTrails = 10;
  const trails: HTMLElement[] = [];
  let mouseX = 0;
  let mouseY = 0;
  
  // Create trail elements
  for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.opacity = (1 - i / maxTrails).toString();
    document.body.appendChild(trail);
    trails.push(trail);
  }
  
  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Update trails
  function updateTrails() {
    // Move all trails to follow the cursor with delay
    trails.forEach((trail, index) => {
      setTimeout(() => {
        trail.style.left = `${mouseX}px`;
        trail.style.top = `${mouseY}px`;
      }, index * 40);
    });
    
    requestAnimationFrame(updateTrails);
  }
  
  updateTrails();
};

// Initialize scroll-triggered animations
export const initScrollAnimations = () => {
  if (typeof window === 'undefined') return;
  
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
  const slideElements = document.querySelectorAll('.slide-up-on-scroll');
  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Get scroll speed by comparing with last position
    const currentScrollY = window.scrollY;
    
    // Handle fade-in animations
    fadeElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementVisible = 150;
      
      if (elementTop < scrollTop + windowHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
    
    // Handle slide-up animations
    slideElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      
      // Only play animation when element is in view
      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        (element as HTMLElement).style.animationPlayState = 'running';
      }
    });
  };
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial check
  handleScroll();
};

// Initialize parallax effects
export const initParallaxEffects = () => {
  if (typeof window === 'undefined') return;
  
  const parallaxContainers = document.querySelectorAll('.parallax');
  
  const handleMouseMove = (e: MouseEvent) => {
    parallaxContainers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center of element
      const distX = (e.clientX - centerX) / 30;
      const distY = (e.clientY - centerY) / 30;
      
      // Apply transform to container
      (container as HTMLElement).style.transform = `perspective(1000px) rotateY(${distX}deg) rotateX(${-distY}deg)`;
      
      // Apply transform to layers within the container
      const layers = container.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const depth = (index + 1) * 0.2; // Increase depth for each layer
        (layer as HTMLElement).style.transform = `translateX(${distX * depth}px) translateY(${distY * depth}px)`;
      });
    });
  };
  
  document.addEventListener('mousemove', handleMouseMove);
};

// Initialize all animations
export const initAllAnimations = () => {
  // Only run on client-side
  if (typeof window === 'undefined') return;
  
  // Don't run animations if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  // Initialize all animation systems
  initScrollAnimations();
  initParallaxEffects();
  
  // Only enable cursor trails on non-touch devices
  if (!('ontouchstart' in window)) {
    initCursorTrail();
  }
  
  console.log('All animations initialized');
};
