/**
 * ============================================================================
 * main.tsx - Application Entry Point
 * ============================================================================
 * 
 * This is the entry point for the React application.
 * It initializes:
 * - React DOM rendering
 * - BrowserRouter for client-side routing
 * - Animation utilities
 * - Toast notification system
 * 
 * File Structure:
 * - main.tsx (this file) → App.tsx → Individual Pages
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { initAllAnimations } from './utils/animationUtils.ts';
import { Toaster } from './components/ui/toaster.tsx';

// ============================================================================
// ROOT COMPONENT
// ============================================================================

/**
 * Root component that wraps the entire application with necessary providers
 * - BrowserRouter: Enables client-side routing
 * - Toaster: Global toast notification container
 */
const Root = () => {
  // Initialize scroll and intersection observer animations on mount
  React.useEffect(() => {
    initAllAnimations();
  }, []);
  
  return (
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  );
};

// ============================================================================
// RENDER APPLICATION
// ============================================================================

// Mount the React app to the DOM
createRoot(document.getElementById("root")!).render(<Root />);
