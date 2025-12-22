/**
 * =========================================================
 * BLOG POST PAGE COMPONENT
 * =========================================================
 * 
 * Individual blog post page with full article content,
 * breadcrumbs, reading info, TOC, related posts, and social sharing.
 * 
 * Features:
 * - Dynamic routing based on blog slug
 * - SEO optimization with dynamic meta tags
 * - Breadcrumb navigation
 * - Reading time & word count
 * - Table of contents for long posts
 * - Social sharing functionality
 * - Related posts section
 * 
 * Route: /blog/:slug
 * 
 * =========================================================
 */

import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag
} from "lucide-react";
import { blogPosts, BlogPost as BlogPostType } from "@/components/blog/BlogData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";
import DOMPurify from "dompurify";

// Blog components
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import BlogReadingInfo from "@/components/blog/BlogReadingInfo";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import SocialShareButtons from "@/components/blog/SocialShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";

// =========================================================
// HELPER FUNCTIONS
// =========================================================

// Add IDs to headings for TOC navigation
const addHeadingIds = (content: string): string => {
  let counter = 0;
  return content.replace(/<h([23])>(.*?)<\/h[23]>/gi, (match, level, text) => {
    const id = `heading-${counter}-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    counter++;
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
};

// =========================================================
// MAIN COMPONENT
// =========================================================
const BlogPost = () => {
  // ----- Routing and State -----
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const navigate = useNavigate();

  // ----- Fetch Post Data Effect -----
  useEffect(() => {
    // Find the post that matches the URL slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
    } else {
      // Redirect to blog listing if post not found
      navigate("/blog", { replace: true });
    }
    
    // Scroll to top when navigating to new post
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, navigate]);

  // ----- Related Posts -----
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [post]);

  // ----- Processed Content with Heading IDs -----
  const processedContent = useMemo(() => {
    if (!post) return "";
    return addHeadingIds(post.content);
  }, [post]);

  // Return null while redirecting
  if (!post) {
    return null;
  }

  const pageUrl = `${window.location.origin}/blog/${post.slug}`;

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* SEO Meta Tags */}
        <Helmet>
          <title>{post.title} | DigiSpark Blog</title>
          <meta name="description" content={post.excerpt} />
          <meta name="keywords" content={post.tags?.join(", ")} />
          <link rel="canonical" href={pageUrl} />
          
          {/* Open Graph */}
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:image" content={post.image} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="article" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.excerpt} />
          <meta name="twitter:image" content={post.image} />
          
          {/* Article Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.image,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.date,
              "publisher": {
                "@type": "Organization",
                "name": "DigiSpark",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${window.location.origin}/logo.png`
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": pageUrl
              }
            })}
          </script>
        </Helmet>

        {/* Navigation */}
        <Navbar />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb Navigation */}
            <BlogBreadcrumb category={post.category} postTitle={post.title} />
            
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
              <motion.header
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
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                  </div>
                </div>

                {/* Reading Time & Word Count */}
                <div className="mb-6">
                  <BlogReadingInfo content={post.content} readTime={post.readTime} />
                </div>

                {/* Social Share Buttons */}
                <div className="mb-8">
                  <SocialShareButtons title={post.title} url={pageUrl} />
                </div>
                
                {/* Featured Image */}
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-10 shadow-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.header>

              {/* Table of Contents */}
              <BlogTableOfContents content={post.content} />
              
              {/* Article Content - Sanitized HTML */}
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(processedContent, {
                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img', 'span', 'div'],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'id'],
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
                      <Link
                        key={tag}
                        to={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-800 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 p-6 bg-gray-50 rounded-xl"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Share this article</h3>
                <SocialShareButtons title={post.title} url={pageUrl} />
              </motion.div>
              
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
              <RelatedPosts posts={blogPosts} currentPostId={post.id} />
              
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
                  <Link 
                    to="/resources"
                    className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Subscribe Now
                  </Link>
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
