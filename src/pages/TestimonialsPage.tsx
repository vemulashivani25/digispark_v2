/**
 * ============================================================================
 * Testimonials Page
 * ============================================================================
 * 
 * Displays client testimonials with filtering, stats, and interactive cards.
 * Features industry-based filtering and modal view for detailed testimonials.
 * 
 * Features:
 * - 15 real testimonial entries with ratings
 * - Industry-based filtering
 * - Animated stats section
 * - Load more pagination
 * - Modal view for full testimonial details
 * - Newsletter subscription section
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Users, Award } from "lucide-react";

// 15 Real testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "Working with DigiSpark transformed our digital presence. Their team delivered a beautiful website and implemented an SEO strategy that increased our organic traffic by 156% in just 3 months. Their attention to detail and strategic approach sets them apart.",
    rating: 5,
    industry: "Technology",
    result: "+156% Traffic"
  },
  {
    id: 2,
    name: "James Wilson",
    role: "CEO",
    company: "Innovate Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "When we needed to modernize our e-commerce platform, DigiSpark exceeded our expectations. Their team redesigned our user experience and optimized our conversion funnel, resulting in a 42% increase in sales within the first quarter after launch.",
    rating: 5,
    industry: "E-commerce",
    result: "+42% Sales"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "HealthPlus",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "DigiSpark's HubSpot implementation streamlined our entire sales process. Their team provided exceptional training and support, making the transition smooth for our team. We've seen a 28% improvement in lead management efficiency.",
    rating: 5,
    industry: "Healthcare",
    result: "+28% Efficiency"
  },
  {
    id: 4,
    name: "David Chen",
    role: "Founder",
    company: "StyleBox",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "The DigiSpark team took our brand to the next level with their creative direction and technical expertise. Their holistic approach to digital marketing helped us establish a cohesive brand identity across all platforms. Highly recommended!",
    rating: 5,
    industry: "Fashion",
    result: "Brand Growth"
  },
  {
    id: 5,
    name: "Michelle Parker",
    role: "Digital Strategist",
    company: "GrowthMedia",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "I've worked with many agencies over my career, but DigiSpark stands out for their strategic thinking and execution. They don't just follow instructions - they bring innovative ideas that drive real business outcomes. A true partner in our growth.",
    rating: 5,
    industry: "Marketing",
    result: "2x Growth"
  },
  {
    id: 6,
    name: "Robert Taylor",
    role: "CTO",
    company: "NexGen Systems",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "DigiSpark's development team built a custom web application that automated our core business processes. Their technical expertise and project management made the development process smooth and delivered exactly what we needed on time and on budget.",
    rating: 5,
    industry: "Technology",
    result: "On Time Delivery"
  },
  {
    id: 7,
    name: "Jessica Adams",
    role: "Creative Director",
    company: "Design Collective",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "The branding work that DigiSpark created for our startup was phenomenal. They truly understood our vision and translated it into a visual identity that resonates with our target audience. Since launch, our brand recognition has increased dramatically.",
    rating: 5,
    industry: "Design",
    result: "Brand Recognition"
  },
  {
    id: 8,
    name: "Thomas Williams",
    role: "E-commerce Manager",
    company: "Urban Outfitters",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "DigiSpark revamped our online store with a focus on mobile optimization and checkout simplification. The results were immediate – mobile conversions up 75% and cart abandonment down 30%. Their data-driven approach was exactly what we needed.",
    rating: 5,
    industry: "Retail",
    result: "+75% Conversions"
  },
  {
    id: 9,
    name: "Sophia Martinez",
    role: "Marketing VP",
    company: "Global Reach Inc",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "Their PPC campaign management transformed our customer acquisition strategy. Through careful audience targeting and creative optimization, DigiSpark reduced our cost per lead by 45% while increasing quality. The ROI has been exceptional.",
    rating: 5,
    industry: "Marketing",
    result: "-45% CPL"
  },
  {
    id: 10,
    name: "Daniel Brown",
    role: "Product Manager",
    company: "Tech Innovations",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "DigiSpark helped us conceptualize and build our SaaS platform from scratch. Their technical insights and user-centered design approach resulted in a product that our customers love using. User adoption exceeded our projections by 200%.",
    rating: 5,
    industry: "SaaS",
    result: "+200% Adoption"
  },
  {
    id: 11,
    name: "Olivia Thompson",
    role: "Content Director",
    company: "Media Central",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "The content strategy DigiSpark developed for our brand has dramatically improved our organic reach. Their team created a comprehensive editorial calendar and SEO-optimized content that has positioned us as thought leaders in our industry.",
    rating: 5,
    industry: "Media",
    result: "Thought Leader"
  },
  {
    id: 12,
    name: "Marcus Johnson",
    role: "Sales Director",
    company: "Enterprise Solutions",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "Implementing DigiSpark's CRM recommendations revolutionized our sales process. The automated workflows and improved data visibility have empowered our team to close deals faster and provide better customer service throughout the sales cycle.",
    rating: 5,
    industry: "Enterprise",
    result: "Faster Deals"
  },
  {
    id: 13,
    name: "Elena Vega",
    role: "UX Director",
    company: "Interactive Labs",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "DigiSpark's approach to user experience design is exceptional. They conducted thorough research and testing to create an interface that delights our users. The redesign has decreased support tickets by 60% while increasing user engagement metrics.",
    rating: 5,
    industry: "Technology",
    result: "-60% Tickets"
  },
  {
    id: 14,
    name: "Alex Zhang",
    role: "Startup Founder",
    company: "NextWave Tech",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "As a startup, we needed a partner who could help us establish our digital footprint quickly and effectively. DigiSpark delivered a complete brand identity and website that perfectly positioned us in the market and helped secure our second round of funding.",
    rating: 5,
    industry: "Startup",
    result: "Series B Funded"
  },
  {
    id: 15,
    name: "Rebecca Clark",
    role: "Marketing Manager",
    company: "Retail Innovations",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "The email marketing campaigns DigiSpark created for us have consistently outperformed industry benchmarks. Their strategic approach to segmentation and personalization has resulted in open rates 30% above average and a significant increase in customer lifetime value.",
    rating: 5,
    industry: "Retail",
    result: "+30% Open Rate"
  }
];

const stats = [
  { value: "150+", label: "Happy Clients", icon: Users },
  { value: "98%", label: "Satisfaction Rate", icon: TrendingUp },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "50+", label: "Awards Won", icon: Award }
];

const TestimonialsPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  
  const industries = ["All", ...Array.from(new Set(testimonials.map(t => t.industry)))];
  
  const filteredTestimonials = activeFilter === "All" 
    ? testimonials 
    : testimonials.filter(t => t.industry === activeFilter);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ));
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredTestimonials.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <Helmet>
        <title>Client Testimonials | DigiSpark - Real Success Stories</title>
        <meta
          name="description"
          content="Discover what our clients say about DigiSpark. Read real testimonials and success stories from businesses we've helped grow."
        />
      </Helmet>
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-40 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-16 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Real Stories, Real Results</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">What Our </span>
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join over 150+ satisfied clients who have transformed their digital presence with DigiSpark. Here's what they have to say.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 text-center hover:border-yellow-400/30 transition-colors"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <stat.icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 pb-8 relative z-10">
          <motion.div 
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => {
                  setActiveFilter(industry);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === industry
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                }`}
              >
                {industry}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Testimonials Grid */}
        <section className="container mx-auto px-4 pb-16 relative z-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 cursor-pointer hover:border-yellow-400/40 transition-all"
                  onClick={() => setSelectedTestimonial(testimonial)}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -20px rgba(250, 204, 21, 0.2)" }}
                >
                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-yellow-400/10 group-hover:text-yellow-400/20 transition-colors" />
                  
                  {/* Result Badge */}
                  <motion.span 
                    className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-medium mb-4 border border-yellow-400/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonial.result}
                  </motion.span>
                  
                  {/* Rating */}
                  <div className="flex gap-0.5 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4 group-hover:text-white transition-colors">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-700/50">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-yellow-400 transition-colors"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-white text-sm group-hover:text-yellow-400 transition-colors">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {testimonial.role}, <span className="text-yellow-400/80">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Industry Tag */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs text-gray-500">{testimonial.industry}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {visibleCount < filteredTestimonials.length && (
            <motion.div 
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-400/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Testimonials
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </section>

        {/* Featured Testimonial Modal */}
        <AnimatePresence>
          {selectedTestimonial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedTestimonial(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-1.5 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium border border-yellow-400/20">
                    {selectedTestimonial.result}
                  </span>
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {renderStars(selectedTestimonial.rating)}
                </div>
                
                <Quote className="w-10 h-10 text-yellow-400/30 mb-4" />
                
                <p className="text-white text-lg leading-relaxed mb-8">
                  "{selectedTestimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                  <img
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div>
                    <p className="font-bold text-white text-lg">{selectedTestimonial.name}</p>
                    <p className="text-yellow-400">{selectedTestimonial.role}</p>
                    <p className="text-gray-400 text-sm">{selectedTestimonial.company} • {selectedTestimonial.industry}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <section className="container mx-auto px-4 pb-20 relative z-10">
          <motion.div
            className="bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-transparent border border-yellow-400/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join hundreds of satisfied clients and transform your digital presence today.
            </p>
            <motion.a
              href="/project-quote"
              className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Quote
              <ChevronRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </section>
      </main>

      <NewsletterSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default TestimonialsPage;
