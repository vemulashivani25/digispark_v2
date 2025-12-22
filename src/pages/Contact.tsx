/**
 * ============================================================================
 * Contact Page
 * ============================================================================
 * 
 * Contact page with rich animated background, vector illustrations,
 * contact information cards, embedded Google Map, and contact form.
 * 
 * Features:
 * - Animated geometric background with floating elements
 * - SVG vector illustrations
 * - Glowing contact info cards
 * - Embedded Google Maps iframe
 * - Contact form section
 * - Newsletter subscription
 * - SEO optimized with Helmet meta tags
 * 
 * @author DigiSpark Team
 * @version 2.0.0
 * ============================================================================
 */

import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import { Mail, Phone, MapPin, Clock, Sparkles, Send, MessageCircle, Zap } from "lucide-react";

// Animated floating geometric shapes
const FloatingShape = ({ 
  className, 
  delay = 0, 
  duration = 20,
  size = 100,
  type = "circle"
}: { 
  className?: string; 
  delay?: number; 
  duration?: number;
  size?: number;
  type?: "circle" | "triangle" | "square" | "hexagon";
}) => {
  const shapes = {
    circle: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.1" />
      </svg>
    ),
    triangle: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M50 25 L75 70 L25 70 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
      </svg>
    ),
    square: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="1" opacity="0.3" rx="5" />
        <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" rx="3" />
      </svg>
    ),
    hexagon: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {shapes[type]}
    </motion.div>
  );
};

// Animated grid lines background
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Horizontal lines */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`h-${i}`}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent"
        style={{ top: `${(i + 1) * 12}%` }}
        animate={{ opacity: [0.1, 0.3, 0.1], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
      />
    ))}
    {/* Vertical lines */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`v-${i}`}
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-400/15 to-transparent"
        style={{ left: `${(i + 1) * 16}%` }}
        animate={{ opacity: [0.1, 0.25, 0.1], scaleY: [0.9, 1, 0.9] }}
        transition={{ duration: 5, delay: i * 0.4, repeat: Infinity }}
      />
    ))}
  </div>
);

// Glowing orbs
const GlowingOrb = ({ 
  color, 
  size, 
  position, 
  delay = 0 
}: { 
  color: string; 
  size: string; 
  position: string; 
  delay?: number;
}) => (
  <motion.div
    className={`absolute ${size} ${position} rounded-full blur-3xl pointer-events-none`}
    style={{ background: color }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.15, 0.3, 0.15],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Vector illustration component
const ContactIllustration = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
    {/* Background circles */}
    <motion.circle
      cx="200" cy="150" r="120"
      stroke="url(#gradient1)" strokeWidth="1"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "200px 150px" }}
    />
    <motion.circle
      cx="200" cy="150" r="100"
      stroke="url(#gradient2)" strokeWidth="0.5"
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "200px 150px" }}
    />
    
    {/* Envelope */}
    <motion.g
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="140" y="110" width="120" height="80" rx="8" fill="url(#envelopeGrad)" />
      <path d="M140 118 L200 160 L260 118" stroke="#facc15" strokeWidth="2" fill="none" />
      <path d="M140 190 L180 155 M260 190 L220 155" stroke="#facc15" strokeWidth="1.5" opacity="0.5" />
    </motion.g>
    
    {/* Floating dots */}
    {[...Array(12)].map((_, i) => (
      <motion.circle
        key={i}
        cx={120 + Math.random() * 160}
        cy={80 + Math.random() * 140}
        r={2 + Math.random() * 3}
        fill="#facc15"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
          repeat: Infinity,
        }}
      />
    ))}
    
    {/* Sparkles */}
    <motion.path
      d="M100 100 L105 110 L100 120 L95 110 Z"
      fill="#facc15"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.path
      d="M300 130 L305 140 L300 150 L295 140 Z"
      fill="#a855f7"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.8, delay: 0.5, repeat: Infinity }}
    />
    <motion.path
      d="M320 80 L325 90 L320 100 L315 90 Z"
      fill="#3b82f6"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, delay: 1, repeat: Infinity }}
    />
    
    {/* Gradients */}
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#facc15" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#facc15" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="envelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1f2937" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
    </defs>
  </svg>
);

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll get back to you within 24 hours.",
      content: "hello@digispark.com",
      gradient: "from-blue-500/20 via-blue-600/10 to-cyan-500/5",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our friendly support team.",
      content: "+1 (555) 123-4567",
      gradient: "from-green-500/20 via-emerald-600/10 to-teal-500/5",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our headquarters.",
      content: "123 Innovation Way, San Francisco, CA 94107",
      gradient: "from-purple-500/20 via-violet-600/10 to-fuchsia-500/5",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're available when you need us.",
      content: "Monday - Friday: 9am - 6pm PST",
      gradient: "from-yellow-500/20 via-amber-600/10 to-orange-500/5",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>Contact DigiSpark | HubSpot CRM & Digital Agency Experts</title>
        <meta name="description" content="Contact DigiSpark for HubSpot CRM implementation, cold email marketing, Zoom support, video editing, and web development services. Get a free consultation and quote for your project." />
        <meta name="keywords" content="contact DigiSpark, HubSpot CRM consultation, cold email marketing agency, digital agency contact, web development quote, video editing services contact, marketing automation help" />
        <meta property="og:title" content="Contact DigiSpark | Get Your Free Consultation" />
        <meta property="og:description" content="Reach out to discuss HubSpot CRM, cold email campaigns, video editing, or web development for your business." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />
      
      {/* Hero Section with Rich Animated Background */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />
        
        {/* Glowing orbs */}
        <GlowingOrb color="rgba(250, 204, 21, 0.3)" size="w-[500px] h-[500px]" position="-top-40 -right-40" delay={0} />
        <GlowingOrb color="rgba(168, 85, 247, 0.25)" size="w-[400px] h-[400px]" position="-bottom-20 -left-20" delay={2} />
        <GlowingOrb color="rgba(59, 130, 246, 0.2)" size="w-[300px] h-[300px]" position="top-1/2 left-1/2" delay={4} />
        
        {/* Animated grid */}
        <AnimatedGrid />
        
        {/* Floating geometric shapes */}
        <FloatingShape className="top-20 left-[10%] text-yellow-400" size={60} type="circle" delay={0} duration={18} />
        <FloatingShape className="top-40 right-[15%] text-purple-400" size={80} type="hexagon" delay={2} duration={22} />
        <FloatingShape className="bottom-20 left-[20%] text-blue-400" size={50} type="triangle" delay={4} duration={20} />
        <FloatingShape className="bottom-40 right-[10%] text-yellow-400" size={70} type="square" delay={6} duration={25} />
        <FloatingShape className="top-1/3 left-[5%] text-cyan-400" size={40} type="circle" delay={1} duration={16} />
        <FloatingShape className="top-1/4 right-[25%] text-pink-400" size={55} type="triangle" delay={3} duration={19} />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Let's Connect</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-white">Get in </span>
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Touch</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-lg mb-6 sm:mb-8">
                We're here to help you transform your digital presence. Whether you have a question, need a quote, or just want to say hello — we'd love to hear from you.
              </p>
              
              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8"
              >
                {[
                  { icon: MessageCircle, label: "24h Response", value: "Guaranteed" },
                  { icon: Zap, label: "Projects Done", value: "500+" },
                  { icon: Send, label: "Satisfaction", value: "98%" },
                ].map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Vector illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative h-[300px] sm:h-[400px]"
            >
              <ContactIllustration />
            </motion.div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Contact Cards Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {contactCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl p-5 sm:p-6 h-full overflow-hidden group-hover:border-gray-700/50 transition-colors">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Animated corner accent */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/5 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    <div className="relative z-10 flex items-start gap-4">
                      <motion.div 
                        className={`p-3 rounded-xl ${card.iconBg} border border-white/5`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <card.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${card.iconColor}`} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2 sm:mb-3">{card.description}</p>
                        <motion.div 
                          className="font-medium text-yellow-400 text-sm sm:text-base"
                          whileHover={{ x: 5 }}
                        >
                          {card.content}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-5xl mx-auto mt-12 sm:mt-16"
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* Decorative border glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-sm" />
              
              <div className="relative bg-gray-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-800/50">
                {/* Animated grid overlay */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                      style={{ top: `${(i + 1) * 20}%` }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                    />
                  ))}
                </div>
                
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0376546235167!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085d2d3c5c1%3A0x317bd43e0e17d5f4!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1587567456640!5m2!1sen!2sus"
                  className="w-full h-[300px] sm:h-[400px] rounded-xl border-0 relative z-10"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DigiSpark Location Map"
                  aria-label="Map showing the location of our agency"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <NewsletterSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
