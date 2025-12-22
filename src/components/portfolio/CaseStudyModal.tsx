/**
 * Case Study Modal Component
 * Displays detailed project information in a modal dialog
 */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Clock, Tag, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  challenges: string;
  featured: boolean;
}

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-gray-900 rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </Badge>
                {project.featured && (
                  <Badge className="bg-green-400/10 text-green-400 border-green-400/20">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative aspect-video rounded-xl overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </motion.div>
                  
                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Details Section */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {project.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>
                  
                  {/* Challenges Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800/50 rounded-xl p-5"
                  >
                    <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Key Challenges
                    </h4>
                    <p className="text-gray-300">
                      {project.challenges}
                    </p>
                  </motion.div>
                  
                  {/* Results/Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <h4 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Project Highlights
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                        Successfully delivered within timeline
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                        Client satisfaction rating: 5/5
                      </li>
                      <li className="flex items-start gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                        Scalable and maintainable solution
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Footer with actions */}
            <div className="p-4 md:p-6 border-t border-gray-800 flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Close
              </Button>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Project
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
