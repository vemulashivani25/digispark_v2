/**
 * Generates a local SVG data URL for avatar fallbacks
 * This replaces the unreliable via.placeholder.com service
 */

// Generate a consistent color based on text hash
const generateColor = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#EAB308', // yellow-500
    '#22C55E', // green-500
    '#3B82F6', // blue-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#F97316', // orange-500
    '#06B6D4', // cyan-500
    '#84CC16', // lime-500
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Creates a local SVG data URL for company/client logos
 * @param text - Text to display (usually first letter or abbreviation)
 * @param size - Size of the avatar (default 80)
 */
export const createLogoFallback = (text: string, size: number = 80): string => {
  const displayText = text.substring(0, 2).toUpperCase();
  const bgColor = generateColor(text);
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${bgColor}" rx="8"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-size="${size * 0.4}" font-weight="600" fill="white">
        ${displayText}
      </text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * Creates a fallback for tool/tech logos
 * @param toolName - Name of the tool
 */
export const createToolFallback = (toolName: string): string => {
  return createLogoFallback(toolName.charAt(0), 80);
};

/**
 * Error handler for image elements to apply fallback
 * @param e - Image error event
 * @param fallbackText - Text to use for fallback generation
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>, 
  fallbackText: string
): void => {
  const target = e.target as HTMLImageElement;
  target.src = createLogoFallback(fallbackText);
  target.onerror = null; // Prevent infinite loop
};
