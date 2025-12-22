/**
 * Related Posts Component
 * Displays related blog articles to keep users engaged
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "@/components/blog/BlogData";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: number;
}

const RelatedPosts = ({ posts, currentPostId }: RelatedPostsProps) => {
  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16 pt-10 border-t border-gray-200"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
        <Link 
          to="/blog" 
          className="text-yellow-600 hover:text-yellow-700 flex items-center gap-1 text-sm font-medium"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group"
          >
            <Link to={`/blog/${post.slug}`}>
              <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default RelatedPosts;
