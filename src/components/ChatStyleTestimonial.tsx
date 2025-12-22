import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, MessageCircle, CheckCircle2, Sparkles, Quote } from "lucide-react";

interface ClientFeedback {
  text: string;
  clientName: string;
  clientRole: string;
  avatar: string;
  rating: number;
  country?: string;
}

interface ChatStyleTestimonialProps {
  feedback: ClientFeedback;
  color: string;
}

const ChatStyleTestimonial = ({ feedback, color }: ChatStyleTestimonialProps) => {
  const [showFullMessage, setShowFullMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullMessage(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 + i * 0.1 }}
      >
        <Star
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
          }`}
        />
      </motion.span>
    ));
  };

  // Extract country from role if present
  const getCountryFromRole = (role: string): string => {
    const countries: Record<string, string> = {
      "TechGrowth Solutions": "🇺🇸 USA",
      "Meridian Consulting Group": "🇬🇧 UK",
      "GreenLife Organics": "🇫🇷 France",
      "UrbanFit Studios": "🇮🇳 India",
      "Global Education Network": "🇺🇸 USA",
      "Executive Assistants Pro": "🇦🇺 Australia",
      "Prime Properties Group": "🇦🇪 UAE",
      "Growth Marketing Agency": "🇺🇸 USA",
      "TechBytes Media": "🇬🇧 UK",
      "Gaming Community Network": "🇩🇪 Germany",
    };
    
    const company = role.split(", ")[1] || "";
    return countries[company] || "🌍 Global";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Testimonial card */}
      <div className="bg-secondary/30 backdrop-blur-md rounded-2xl border border-border/50 p-5 md:p-6 overflow-hidden">
        {/* Gradient glow effect */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${color} opacity-10 blur-3xl rounded-full`} />
        
        {/* Client header with single profile image */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative flex-shrink-0">
            <motion.img
              src={feedback.avatar}
              alt={feedback.clientName}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
              whileHover={{ scale: 1.05 }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-secondary flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 className="w-3 h-3 text-white" />
            </motion.div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-foreground text-base">{feedback.clientName}</h4>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${color} text-white`}
              >
                Verified Client
              </motion.span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{feedback.clientRole}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {getCountryFromRole(feedback.clientRole)}
                </span>
              </div>
              <div className="flex gap-0.5">{renderStars(feedback.rating)}</div>
            </div>
          </div>
        </div>

        {/* Testimonial quote */}
        <AnimatePresence>
          {showFullMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className={`relative bg-gradient-to-br ${color} bg-opacity-5 rounded-xl px-5 py-4 border border-primary/20`}>
                {/* Quote icon */}
                <div className="absolute -top-3 left-4">
                  <div className={`p-1.5 rounded-full bg-gradient-to-r ${color}`}>
                    <Quote className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                
                <p className="text-base text-foreground leading-relaxed pt-1">
                  "{feedback.text}"
                </p>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
                  <span className="text-xs text-muted-foreground">
                    Verified Review
                  </span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs text-emerald-500 font-medium">Confirmed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agency response */}
        <AnimatePresence>
          {showFullMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3 justify-end mt-4"
            >
              <div className="flex-1 max-w-[80%] flex justify-end">
                <div className="bg-primary/15 rounded-xl rounded-br-sm px-4 py-3 border border-primary/25">
                  <p className="text-sm text-foreground">
                    Thank you for your wonderful feedback! 🙏 It was a pleasure working with you.
                  </p>
                  <div className="flex items-center justify-end mt-2">
                    <span className="text-xs text-muted-foreground font-medium">— DigiSpark Team</span>
                  </div>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                DS
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatStyleTestimonial;
