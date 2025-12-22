/**
 * =========================================================
 * BLOG PAGE COMPONENT
 * =========================================================
 * 
 * Main blog listing page with search, filtering, and
 * category navigation functionality.
 * 
 * Features:
 * - SEO optimization with meta tags and structured data
 * - Search functionality across titles, excerpts, and tags
 * - Category filtering
 * - Animated UI elements with framer-motion
 * - Blog suggestion popup after 2 seconds
 * - Newsletter subscription CTA
 * 
 * =========================================================
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { blogPosts } from "@/components/blog/BlogData";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogPostModal from "@/components/blog/BlogPostModal";
import BlogSuggestionPopup from "@/components/blog/BlogSuggestionPopup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, TrendingUp, BookOpen, X } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import PageHeader from "@/components/PageHeader";
import { BlogPost } from "@/components/blog/BlogData";

// =========================================================
// MAIN COMPONENT
// =========================================================
const Blog = () => {
  // ----- State Management -----
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showSuggestionPopup, setShowSuggestionPopup] = useState(false);
  const { toast } = useToast();
  
  // Extract unique categories from blog posts
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  // ----- Filter Posts Effect -----
  // Updates filtered posts when search term or category changes
  useEffect(() => {
    let result = [...blogPosts];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    setFilteredPosts(result);
  }, [selectedCategory, searchTerm]);
  
  // ----- SEO Meta Tags Effect -----
  // Sets up page title, meta descriptions, and structured data
  useEffect(() => {
    document.title = "Tech & Digital Marketing Blog | DigiSpark";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Explore our blog for the latest insights on digital marketing, web development, AI, and technology trends. Expert advice to help your business grow online.');
    
    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'digital marketing, web development, SEO, AI technology, business growth, content strategy, UX design, e-commerce, mobile apps, social media marketing');
    
    // Add structured data for SEO
    let scriptTag = document.querySelector('#blog-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'blog-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    
    // Blog structured data schema
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "headline": "DigiSpark Blog",
      "description": "Expert insights on digital marketing, web development, and technology trends",
      "url": window.location.href,
      "author": {
        "@type": "Organization",
        "name": "DigiSpark",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "DigiSpark",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "blogPost": blogPosts.slice(0, 5).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author || "DigiSpark Team"
        },
        "datePublished": post.date,
        "image": post.image,
        "url": `${window.location.origin}/blog/${post.slug}`
      }))
    };
    
    (scriptTag as HTMLScriptElement).textContent = JSON.stringify(structuredData);
    
    // Cleanup on unmount
    return () => {
      document.title = "DigiSpark";
      if (scriptTag) {
        document.head.removeChild(scriptTag);
      }
    };
  }, []);
  
  // ----- Blog Suggestion Popup Timer -----
  // Shows popup after 2 seconds if not previously dismissed/submitted
  useEffect(() => {
    const hasSubmitted = localStorage.getItem("blogSuggestionSubmitted");
    const hasDismissed = localStorage.getItem("blogSuggestionDismissed");
    
    // Only show if user hasn't submitted or dismissed before
    if (!hasSubmitted && !hasDismissed) {
      const timer = setTimeout(() => {
        setShowSuggestionPopup(true);
      }, 2000); // 2 second delay
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // ----- Post Selection Handler -----
  // Opens the modal for selected blog post
  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    
    toast({
      title: "Blog Post Selected",
      description: `Now reading: ${post.title}`
    });
  };
  
  // =========================================================
  // RENDER
  // =========================================================
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <Navbar />
        
        {/* Hero Header */}
        <PageHeader 
          title="Our Blog"
          description="Insights, strategies, and expert advice to help your business thrive in the digital landscape"
          bgImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200"
        />
        
        {/* Search Section */}
        <section className="py-8 bg-black relative overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -top-48 -left-48"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -bottom-48 -right-48"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Stats bar showing blog metrics */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-gray-400">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">{blogPosts.length} Articles</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">{blogPosts.filter(p => p.featured).length} Featured</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">{categories.length} Categories</span>
              </div>
            </motion.div>

            {/* Search input with glow effect */}
            <motion.div 
              className="relative max-w-xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-xl blur-lg opacity-70" />
              <div className="relative flex items-center bg-white/10 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden focus-within:border-yellow-400/50 transition-all duration-300">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 bg-transparent py-6 text-white placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {/* Clear search button */}
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchTerm("")}
                    className="p-2 mr-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Blog Posts Grid Section */}
        <section className="py-20 bg-gray-50 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[length:20px_20px]" />
          
          <div className="container mx-auto px-4 relative">
            {/* Category Filter Component */}
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onCategorySelect={setSelectedCategory} 
            />
            
            {/* Posts Grid with Animation */}
            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                <motion.div 
                  key="posts-grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredPosts.map((post, index) => (
                    <BlogCard 
                      key={post.id} 
                      post={post}
                      index={index}
                      onSelectForModal={handlePostSelect} 
                    />
                  ))}
                </motion.div>
              ) : (
                // No results state
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="max-w-lg mx-auto border-dashed border-2">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Search className="w-8 h-8 text-gray-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-4">No Results Found</h3>
                      <p className="text-gray-600 mb-6">
                        We could not find any posts matching your search criteria. Try different keywords or browse by category.
                      </p>
                      <Button 
                        onClick={() => {
                          setSelectedCategory(null);
                          setSearchTerm("");
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black"
                      >
                        Reset Filters
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Newsletter CTA Section */}
            <motion.div 
              className="mt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-2xl p-8 max-w-4xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated glow effects */}
              <motion.div
                className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm mb-4"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Join 5,000+ subscribers</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-gray-300">Subscribe to our newsletter for the latest insights and articles</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-gray-700 text-white focus:border-yellow-400 placeholder-gray-500"
                  />
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="bg-yellow-500 hover:bg-yellow-600 text-black whitespace-nowrap font-medium w-full sm:w-auto"
                      onClick={() => {
                        toast({
                          title: "Thank you for subscribing!",
                          description: "You'll receive our next newsletter soon."
                        });
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Blog Post Modal */}
        <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        
        {/* Blog Suggestion Popup - appears after 2 seconds */}
        <BlogSuggestionPopup 
          isOpen={showSuggestionPopup} 
          onClose={() => setShowSuggestionPopup(false)} 
        />
        
        {/* Footer */}
        <FooterSection />
        <ScrollToTop />
      </div>
    </PageTransition>
  );
};

export default Blog;