/**
 * 404 Not Found Page
 * Displays when users navigate to non-existent routes
 * Provides navigation back to home or contact support
 */
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppChat from "@/components/WhatsAppChat";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* SEO Meta Tags - noindex to prevent indexing error pages */}
      <Helmet>
        <title>404 - Page Not Found | DigiSpark</title>
        <meta name="description" content="The page you're looking for doesn't exist. Navigate back to our homepage or contact support." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div 
              className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-yellow-100"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Search className="h-12 w-12 text-yellow-500" />
            </motion.div>
            
            <motion.h1 
              className="text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              404
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-gray-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Oops! Page not found
            </motion.p>
            
            <motion.p 
              className="text-gray-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button 
                asChild
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8"
              >
                <a href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-50"
              >
                <a href="/contact">
                  Contact Support
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <FooterSection />
      <WhatsAppChat phoneNumber="+1234567890" />
    </div>
  );
};

export default NotFound;
