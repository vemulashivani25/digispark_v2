
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#facc15', '#ffffff', '#60a5fa']
  });
};

export const triggerSuccessConfetti = () => {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    
    const particleCount = 50 * (timeLeft / duration);
    
    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      shapes: ['square', 'circle'],
      origin: {
        x: randomInRange(0.1, 0.9),
        y: Math.random() - 0.2
      },
      colors: ['#facc15', '#ffffff', '#60a5fa', '#ef4444', '#22c55e'],
      particleCount: Math.floor(particleCount)
    });
  }, 250);
};

// CTA button confetti - triggers on button click
export const triggerCtaConfetti = (buttonElement?: HTMLElement) => {
  const rect = buttonElement?.getBoundingClientRect();
  const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
  const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

  // First burst
  confetti({
    particleCount: 50,
    spread: 60,
    startVelocity: 25,
    origin: { x, y },
    colors: ['#facc15', '#fbbf24', '#f59e0b'],
    ticks: 100,
    gravity: 0.8,
    scalar: 0.9
  });

  // Second delayed burst
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 100,
      startVelocity: 20,
      origin: { x, y },
      colors: ['#ffffff', '#60a5fa', '#22c55e'],
      ticks: 80,
      gravity: 1,
      scalar: 0.7
    });
  }, 100);
};

