import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Bookmark, Share2, Eye } from "lucide-react";
import { BlogPost } from "./BlogData";
import { toast } from "@/hooks/use-toast";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  onSelectForModal?: (post: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0, onSelectForModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleReadMore = (e: React.MouseEvent) => {
    if (onSelectForModal) {
      e.preventDefault();
      onSelectForModal(post);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Article removed from your reading list" : "Article saved for later reading",
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
      });
    } catch {
      toast({
        title: "Share",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white relative">
        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ padding: "2px", zIndex: -1 }}
          animate={{
            backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="relative h-52 overflow-hidden">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Category badge with animation */}
          <motion.div 
            className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {post.category}
          </motion.div>
          
          {post.featured && (
            <motion.div 
              className="absolute top-4 right-4 bg-black/80 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ★ Featured
            </motion.div>
          )}

          {/* Quick action buttons on hover */}
          <motion.div
            className="absolute bottom-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-700" />
            </motion.button>
          </motion.div>

          {/* Reading indicator */}
          <motion.div
            className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <Eye className="w-3 h-3" />
            <span>{post.readTime}</span>
          </motion.div>
        </div>

        <CardContent className="p-6 flex-grow">
          {/* Meta info with icons */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <motion.div 
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              <Calendar className="h-3.5 w-3.5 text-yellow-500" />
              <span>{post.date}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Clock className="h-3.5 w-3.5 text-yellow-500" />
              <span>{post.readTime}</span>
            </motion.div>
          </div>

          {/* Title with underline animation */}
          <Link to={`/blog/${post.slug}`} onClick={handleReadMore} className="block relative">
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "50%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Excerpt */}
          <p className="text-gray-600 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {post.tags.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-yellow-100 hover:text-yellow-700 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <Button 
            variant="ghost" 
            className="p-0 h-auto text-yellow-600 hover:text-yellow-800 hover:bg-transparent group/btn font-medium"
            asChild
          >
            <Link to={`/blog/${post.slug}`} onClick={handleReadMore} className="flex items-center gap-2">
              <span>Read Article</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </CardFooter>

        {/* Bottom progress bar animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.4 }}
        />
      </Card>
    </motion.div>
  );
};

export default BlogCard;