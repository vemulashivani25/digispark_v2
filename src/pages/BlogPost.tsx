/**
 * =========================================================
 * BLOG POST PAGE COMPONENT
 * =========================================================
 * 
 * Individual blog post page with full article content,
 * author information, related posts, and social sharing.
 * 
 * Features:
 * - Dynamic routing based on blog slug
 * - SEO optimization with dynamic meta tags
 * - Sanitized HTML content rendering
 * - Related posts suggestions
 * - Newsletter subscription CTA
 * - Social sharing functionality
 * 
 * Route: /blog/:slug
 * 
 * =========================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Copy,
  CheckCircle
} from "lucide-react";
import { blogPosts, BlogPost as BlogPostType } from "@/components/blog/BlogData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";
import DOMPurify from "dompurify";
import { toast } from "@/hooks/use-toast";

// =========================================================
// MAIN COMPONENT
// =========================================================
const BlogPost = () => {
  // ----- Routing and State -----
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();

  // ----- Fetch Post Data Effect -----
  useEffect(() => {
    // Find the post that matches the URL slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Update page title for SEO
      document.title = `${foundPost.title} | DigiSpark Blog`;
      
      // Find related posts from the same category
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    } else {
      // Redirect to blog listing if post not found
      navigate("/blog", { replace: true });
    }
    
    // Scroll to top when navigating to new post
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, navigate]);

  // ----- Copy Link Handler -----
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      toast({
        title: "Link Copied!",
        description: "Article link copied to clipboard",
      });
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  // ----- Social Share Handlers -----
  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = post ? `Check out: ${post.title}` : '';
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  // Return null while redirecting
  if (!post) {
    return null;
  }

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <Navbar />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Back Navigation Link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center text-yellow-600 hover:text-yellow-800 mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            {/* Article Content Container */}
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                
                {/* Article Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  {post.title}
                </h1>
                
                {/* Article Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {post.readTime}
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    Share:
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleFacebookShare}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleTwitterShare}
                    className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLinkedInShare}
                    className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyLink}
                    className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                    aria-label="Copy link"
                  >
                    {linkCopied ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
                
                {/* Featured Image */}
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-10 shadow-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Article Content - Sanitized HTML */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(post.content, {
                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img', 'span', 'div'],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                    ALLOW_DATA_ATTR: false,
                  })
                }}
              />
              
              {/* Article Tags */}
              {post.tags && post.tags.length > 0 && (
                <motion.div 
                  className="mt-10 pt-6 border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 items-center">
                    <Tag className="h-4 w-4 text-gray-600" />
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-800 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Author Bio Section */}
              {post.authorAvatar && (
                <motion.div 
                  className="mt-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{post.author}</h3>
                    <p className="text-yellow-600 text-sm mb-2">Content Writer</p>
                    <p className="text-gray-700">
                      Digital marketing expert with years of experience helping businesses grow their online presence through strategic content and innovative solutions.
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <motion.div 
                  className="mt-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <motion.div
                        key={relatedPost.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Link
                          to={`/blog/${relatedPost.slug}`}
                          className="group block"
                        >
                          <div className="h-48 rounded-lg overflow-hidden mb-3 shadow-md">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <span className="text-xs text-yellow-600 font-medium">{relatedPost.category}</span>
                          <h3 className="font-semibold group-hover:text-yellow-600 transition-colors line-clamp-2 mt-1">
                            {relatedPost.title}
                          </h3>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Newsletter CTA Section */}
              <motion.div 
                className="mt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-2xl p-8 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Want to learn more?</h3>
                  <p className="text-gray-300 mb-6">
                    Subscribe to our newsletter for the latest insights and articles delivered to your inbox.
                  </p>
                  <Button 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                    onClick={() => {
                      toast({
                        title: "Thank you!",
                        description: "You have been subscribed to our newsletter.",
                      });
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <FooterSection />
        <ScrollToTop />
      </div>
    </PageTransition>
  );
};

export default BlogPost;