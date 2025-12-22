import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle2, 
  Trophy, 
  Lightbulb, 
  Award, 
  X, 
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Globe,
  ExternalLink,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SuccessStory } from "@/types/successStory";

interface EnhancedCaseStudyModalProps {
  story: SuccessStory;
  onClose: () => void;
  children?: React.ReactNode;
}

const EnhancedCaseStudyModal = ({ story, onClose }: EnhancedCaseStudyModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Generate gallery images from story image
  const galleryImages = [story.image, story.clientLogo || story.image];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
          className="bg-gray-900 max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 flex justify-between items-center p-5 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-2.5 bg-yellow-400/20 rounded-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <story.icon className="w-6 h-6 text-yellow-400" />
              </motion.div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">{story.title}</h2>
                <span className="text-sm text-yellow-400">{story.industry}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-full transition-all hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <ScrollArea className="h-[calc(90vh-80px)]">
            <div className="p-5 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image Gallery */}
                <div className="col-span-1 space-y-6">
                  {/* Image Gallery */}
                  <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden group">
                    {galleryImages.map((image, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: currentImageIndex === idx ? 1 : 0,
                          scale: currentImageIndex === idx ? 1 : 1.1
                        }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                        style={{ display: currentImageIndex === idx ? 'block' : 'none' }}
                      >
                        <img
                          src={image}
                          alt={`${story.title} - Image ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </motion.div>
                    ))}
                    
                    {/* Navigation buttons */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-yellow-400 text-white hover:text-black p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-yellow-400 text-white hover:text-black p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        
                        {/* Image indicators */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {galleryImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentImageIndex === idx 
                                  ? "bg-yellow-400 w-6" 
                                  : "bg-white/50 hover:bg-white/70"
                              }`}
                              aria-label={`Go to image ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Project Metadata */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="bg-gray-800/50 p-4 rounded-xl flex items-center gap-3 border border-gray-700/50 hover:border-yellow-400/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Globe className="text-yellow-400 w-5 h-5" />
                      <div>
                        <p className="text-gray-400 text-xs">Industry</p>
                        <p className="text-white font-medium text-sm">{story.industry}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gray-800/50 p-4 rounded-xl flex items-center gap-3 border border-gray-700/50 hover:border-yellow-400/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Users className="text-yellow-400 w-5 h-5" />
                      <div>
                        <p className="text-gray-400 text-xs">Client</p>
                        <p className="text-white font-medium text-sm">{story.client}</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Services Tags */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Services Provided</h3>
                    <div className="flex flex-wrap gap-2">
                      {story.services.map((service, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-3 py-1.5 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-medium border border-yellow-400/20"
                        >
                          {service}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Key Results</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {story.metrics.map((metric, index) => (
                        <motion.div 
                          key={metric.label} 
                          className="bg-gradient-to-br from-gray-800/80 to-gray-900/50 p-4 rounded-xl relative overflow-hidden border border-gray-700/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03, borderColor: 'rgba(250, 204, 21, 0.3)' }}
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-400/20" />
                          <p className="text-2xl md:text-3xl font-bold text-yellow-400">{metric.value}</p>
                          <p className="text-gray-400 text-xs mt-1">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Project Details */}
                <div className="col-span-1 space-y-6">
                  {/* Challenge Section */}
                  <motion.div 
                    className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      The Challenge
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{story.challenge}</p>
                  </motion.div>
                  
                  {/* Solution Section */}
                  <motion.div 
                    className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      Our Solution
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{story.solution}</p>
                    
                    <h4 className="text-sm font-semibold text-white mb-2">Key Approaches</h4>
                    <ul className="space-y-2">
                      {['Custom strategy development', 'Data-driven decision making', 'Continuous optimization', 'Expert team collaboration'].map((approach, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{approach}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  {/* Results Section */}
                  <motion.div 
                    className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Results & Impact
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{story.result}</p>
                  </motion.div>
                  
                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 p-5 rounded-xl border-l-4 border-yellow-400 relative overflow-hidden"
                  >
                    <Quote className="absolute top-3 right-3 w-8 h-8 text-yellow-400/20" />
                    <h4 className="text-sm font-semibold text-white mb-2">Client Testimonial</h4>
                    <p className="text-gray-300 text-sm italic mb-3 relative z-10">"{story.testimonial}"</p>
                    <div className="flex items-center gap-3">
                      {story.clientLogo ? (
                        <img 
                          src={story.clientLogo}
                          alt={story.client} 
                          className="w-10 h-10 object-contain bg-white rounded-full p-1"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                          <span className="text-lg font-bold text-yellow-400">{story.client.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-yellow-400 font-medium text-sm">{story.client}</p>
                        <p className="text-gray-400 text-xs">{story.industry}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-end gap-4 border-t border-gray-800 pt-6">
                <Button variant="outline" onClick={onClose} className="border-gray-700 hover:border-yellow-400/50">
                  Back to Success Stories
                </Button>
                
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-black" asChild>
                  <a href="/project-quote">
                    Start a Similar Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedCaseStudyModal;
