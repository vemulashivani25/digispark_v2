import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "./BlogData";
import { X, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  if (!post) return null;
  
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 pt-16 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl max-w-3xl w-full overflow-hidden my-8"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
              onClick={onClose}
            >
              <X size={20} />
            </button>
            
            {/* Category tag */}
            <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-medium py-1 px-3 rounded-full">
              {post.category}
            </div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Share buttons */}
            <div className="flex justify-between items-center pb-4 border-b">
              <div className="text-sm text-gray-500">{post.date} • {post.readTime}</div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-gray-100"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    // You can add a toast notification here
                  }}
                  title="Copy link"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Excerpt */}
            <p className="text-lg text-gray-700 font-medium">
              {post.excerpt}
            </p>
            
            {/* Main content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(post.content, {
                  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img', 'span', 'div'],
                  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                  ALLOW_DATA_ATTR: false,
                })
              }}
            />
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t flex flex-wrap gap-2">
                <Tag className="h-4 w-4 text-gray-500 mt-1" />
                {post.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Author bio */}
            <div className="pt-6 mt-6 border-t">
              <div className="flex items-center gap-4">
                {post.authorAvatar ? (
                  <img 
                    src={post.authorAvatar} 
                    alt={post.author} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{post.author}</h3>
                  <p className="text-sm text-gray-600">Content Writer & Marketing Specialist</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>
            
            <Button 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => window.location.href = `/blog/${post.slug}`}
            >
              View Full Page
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPostModal;
