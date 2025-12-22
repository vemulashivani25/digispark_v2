
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  CheckCircle, 
  Users, 
  Globe, 
  Link,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  date: string;
  technologies: string[];
  features: string[];
  challenge: string;
  solution: string;
  results: string[];
  imageUrl: string;
  galleryImages: string[];
  link?: string;
  demoUrl?: string; // Live demo iframe URL
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

interface ProjectDetailsModalProps {
  project: ProjectDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [showLiveDemo, setShowLiveDemo] = useState(false);
  
  // Reset image index when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setLoadedImages(Array(project.galleryImages.length).fill(false));
      setShowLiveDemo(false);
    }
  }, [project]);
  
  // Handle image loading
  const handleImageLoad = (index: number) => {
    const newLoadedImages = [...loadedImages];
    newLoadedImages[index] = true;
    setLoadedImages(newLoadedImages);
  };
  
  // Safe navigation
  const nextImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) => 
      prev === project.galleryImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.galleryImages.length - 1 : prev - 1
    );
  };
  
  if (!project) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gray-900 flex justify-between items-center p-5 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-5 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image gallery / Live Demo */}
                <div className="col-span-1">
                  {/* Toggle between gallery and live demo */}
                  {project.demoUrl && (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setShowLiveDemo(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          !showLiveDemo 
                            ? 'bg-yellow-400 text-black' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        Gallery
                      </button>
                      <button
                        onClick={() => setShowLiveDemo(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          showLiveDemo 
                            ? 'bg-yellow-400 text-black' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <Globe className="w-4 h-4" />
                        Live Demo
                      </button>
                    </div>
                  )}

                  {/* Live Demo iFrame */}
                  {showLiveDemo && project.demoUrl ? (
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <iframe
                        src={project.demoUrl}
                        title={`${project.title} - Live Demo`}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Live
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                      {project.galleryImages.map((image, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: currentImageIndex === idx ? 1 : 0,
                            scale: currentImageIndex === idx ? 1 : 1.1
                          }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                          style={{ display: currentImageIndex === idx ? 'block' : 'none' }}
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Image ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onLoad={() => handleImageLoad(idx)}
                          />
                          
                          {!loadedImages[idx] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-400"></div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      
                      {/* Navigation buttons */}
                      {project.galleryImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {project.galleryImages.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  currentImageIndex === idx 
                                    ? "bg-yellow-400 w-4" 
                                    : "bg-gray-400/50 hover:bg-gray-300/70"
                                }`}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* Project metadata */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                      <Calendar className="text-yellow-400 w-5 h-5" />
                      <div>
                        <p className="text-gray-400 text-sm">Completed</p>
                        <p className="text-white font-medium">{project.date}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                      <Globe className="text-yellow-400 w-5 h-5" />
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="text-white font-medium">{project.category}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                      <Users className="text-yellow-400 w-5 h-5" />
                      <div>
                        <p className="text-gray-400 text-sm">Client</p>
                        <p className="text-white font-medium">{project.client}</p>
                      </div>
                    </div>
                    
                    {project.link && (
                      <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                        <Link className="text-yellow-400 w-5 h-5" />
                        <div>
                          <p className="text-gray-400 text-sm">Website</p>
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-400 font-medium hover:underline"
                          >
                            Visit Site
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Technologies */}
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                          className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Project details */}
                <div className="col-span-1">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Project Overview</h3>
                      <p className="text-gray-300">{project.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">The Challenge</h3>
                      <p className="text-gray-300">{project.challenge}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Our Solution</h3>
                      <p className="text-gray-300">{project.solution}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <CheckCircle className="text-yellow-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Results & Impact</h3>
                      <ul className="space-y-2">
                        {project.results.map((result, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {project.testimonial && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-yellow-400 mt-8"
                      >
                        <p className="text-gray-300 italic mb-4">"{project.testimonial.quote}"</p>
                        <div>
                          <p className="text-white font-medium">{project.testimonial.author}</p>
                          <p className="text-gray-400 text-sm">{project.testimonial.position}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-end gap-4 border-t border-gray-800 pt-6">
                <Button variant="outline" onClick={onClose}>
                  Back to Portfolio
                </Button>
                
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-black" asChild>
                  <a href="/project-quote">
                    Start a Similar Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
