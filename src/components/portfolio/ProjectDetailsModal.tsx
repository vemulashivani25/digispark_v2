
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 w-full h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
              <div className="flex justify-between items-center px-6 py-4 max-w-[1920px] mx-auto">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
                    {project.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">{project.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Bento Grid Layout */}
            <div className="h-full pt-16 pb-4 px-4 md:px-6 overflow-y-auto">
              <div className="max-w-[1920px] mx-auto h-full">
                <div className="grid grid-cols-12 grid-rows-[auto] gap-3 md:gap-4 min-h-[calc(100vh-5rem)]">
                  
                  {/* Hero Image - Large */}
                  <div className="col-span-12 lg:col-span-7 xl:col-span-8 row-span-2 relative rounded-2xl overflow-hidden group">
                    {project.demoUrl && (
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <button
                          onClick={() => setShowLiveDemo(false)}
                          className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all ${
                            !showLiveDemo 
                              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                              : 'bg-black/40 text-white hover:bg-black/60'
                          }`}
                        >
                          Gallery
                        </button>
                        <button
                          onClick={() => setShowLiveDemo(true)}
                          className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all flex items-center gap-2 ${
                            showLiveDemo 
                              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                              : 'bg-black/40 text-white hover:bg-black/60'
                          }`}
                        >
                          <Globe className="w-4 h-4" />
                          Live Demo
                        </button>
                      </div>
                    )}

                    {showLiveDemo && project.demoUrl ? (
                      <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-gray-800">
                        <iframe
                          src={project.demoUrl}
                          title={`${project.title} - Live Demo`}
                          className="w-full h-full"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                          loading="lazy"
                        />
                        <div className="absolute top-4 right-4 bg-green-500/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Live Preview
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
                        {project.galleryImages.map((image, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: currentImageIndex === idx ? 1 : 0,
                              scale: currentImageIndex === idx ? 1 : 1.05
                            }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                            style={{ display: currentImageIndex === idx ? 'block' : 'none' }}
                          >
                            <img
                              src={image}
                              alt={`${project.title} - Image ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onLoad={() => handleImageLoad(idx)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                          </motion.div>
                        ))}
                        
                        {project.galleryImages.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all hover:scale-110"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all hover:scale-110"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full">
                              {project.galleryImages.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentImageIndex(idx)}
                                  className={`transition-all rounded-full ${
                                    currentImageIndex === idx 
                                      ? "bg-primary w-6 h-2" 
                                      : "bg-white/40 hover:bg-white/60 w-2 h-2"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Stats - Right Column */}
                  <div className="col-span-6 lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 rounded-2xl border border-primary/20"
                    >
                      <Calendar className="text-primary w-5 h-5 mb-2" />
                      <p className="text-muted-foreground text-xs">Completed</p>
                      <p className="text-foreground font-semibold text-sm">{project.date}</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-4 rounded-2xl border border-blue-500/20"
                    >
                      <Users className="text-blue-400 w-5 h-5 mb-2" />
                      <p className="text-muted-foreground text-xs">Client</p>
                      <p className="text-foreground font-semibold text-sm truncate">{project.client}</p>
                    </motion.div>
                  </div>

                  {/* Technologies */}
                  <div className="col-span-6 lg:col-span-5 xl:col-span-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50 h-full"
                    >
                      <h3 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 6).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-2.5 py-1 bg-gray-700/50 text-muted-foreground rounded-full text-xs">
                            +{project.technologies.length - 6}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Overview */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="col-span-12 lg:col-span-4 bg-gray-800/30 p-5 rounded-2xl border border-gray-700/30"
                  >
                    <h3 className="text-sm font-semibold text-primary mb-2">Overview</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">{project.description}</p>
                  </motion.div>

                  {/* Challenge & Solution - Side by Side */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="col-span-12 lg:col-span-4 bg-gradient-to-br from-orange-500/10 to-red-500/5 p-5 rounded-2xl border border-orange-500/20"
                  >
                    <h3 className="text-sm font-semibold text-orange-400 mb-2">Challenge</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">{project.challenge}</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="col-span-12 lg:col-span-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-5 rounded-2xl border border-green-500/20"
                  >
                    <h3 className="text-sm font-semibold text-green-400 mb-2">Solution</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">{project.solution}</p>
                  </motion.div>

                  {/* Features */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-12 md:col-span-6 bg-gray-800/30 p-5 rounded-2xl border border-gray-700/30"
                  >
                    <h3 className="text-sm font-semibold text-foreground mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="text-primary w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Results */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="col-span-12 md:col-span-6 bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-2xl border border-primary/20"
                  >
                    <h3 className="text-sm font-semibold text-foreground mb-3">Results & Impact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.results.slice(0, 4).map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="text-green-400 w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-xs">{result}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Testimonial */}
                  {project.testimonial && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="col-span-12 lg:col-span-8 bg-gradient-to-r from-primary/5 via-gray-800/50 to-gray-800/30 p-5 rounded-2xl border-l-4 border-primary"
                    >
                      <p className="text-muted-foreground italic text-sm mb-3">"{project.testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">
                            {project.testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">{project.testimonial.author}</p>
                          <p className="text-muted-foreground text-xs">{project.testimonial.position}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CTA */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className={`${project.testimonial ? 'col-span-12 lg:col-span-4' : 'col-span-12'} flex items-center justify-end gap-3 p-4`}
                  >
                    {project.link && (
                      <Button variant="outline" size="sm" asChild className="rounded-full">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Visit Site
                        </a>
                      </Button>
                    )}
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full" asChild>
                      <a href="/project-quote">
                        Start Similar Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
