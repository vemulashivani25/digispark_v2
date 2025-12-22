/**
 * Blog Suggestion Popup Component
 * Allows visitors to submit content suggestions with proper validation
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { blogSuggestionSchema, containsXss } from "@/lib/validation";

interface BlogSuggestionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const topicOptions = [
  "Web Development",
  "Digital Marketing",
  "SEO Strategies",
  "UI/UX Design",
  "E-commerce",
  "AI & Technology",
  "Business Growth",
  "Social Media",
  "Other",
];

const BlogSuggestionPopup: React.FC<BlogSuggestionPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with zod
    const result = blogSuggestionSchema.safeParse({
      email: email.trim(),
      topic: selectedTopic,
      details: suggestion.trim(),
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    // Security check for XSS
    if (containsXss(suggestion)) {
      toast({
        title: "Invalid input",
        description: "Your suggestion contains invalid characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("blog_suggestions" as any)
        .insert({
          email: result.data.email.toLowerCase(),
          topic: result.data.topic || "General",
          details: result.data.details,
        });

      if (error) {
        console.error("[BlogSuggestionPopup] Supabase error:", error);
        throw error;
      }

      toast({
        title: "Thank You!",
        description: "Your suggestion has been submitted. We appreciate your feedback!",
      });

      localStorage.setItem("blogSuggestionSubmitted", "true");

      setEmail("");
      setSuggestion("");
      setSelectedTopic("");
      setErrors({});
      onClose();

    } catch (error) {
      console.error("[BlogSuggestionPopup] Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("blogSuggestionDismissed", "true");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-6 relative">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 p-1 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5 text-black" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-black/10 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    What Should We Write About?
                  </h3>
                </div>
                <p className="text-black/80 text-sm">
                  Help us create content you actually want to read!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="popup-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Email
                  </label>
                  <Input
                    id="popup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                    maxLength={255}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Interest (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {topicOptions.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() =>
                          setSelectedTopic(selectedTopic === topic ? "" : topic)
                        }
                        className={`px-3 py-1 text-xs rounded-full transition-all ${
                          selectedTopic === topic
                            ? "bg-yellow-400 text-black font-medium"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="popup-suggestion"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Suggestion
                  </label>
                  <Textarea
                    id="popup-suggestion"
                    placeholder="Tell us what topics or questions you'd like us to cover..."
                    value={suggestion}
                    onChange={(e) => {
                      setSuggestion(e.target.value);
                      if (errors.details) setErrors((prev) => ({ ...prev, details: "" }));
                    }}
                    className={`w-full min-h-[100px] resize-none ${errors.details ? 'border-red-500' : ''}`}
                    maxLength={1000}
                    required
                  />
                  {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium hover:from-yellow-500 hover:to-amber-600"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.span>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Submit Suggestion
                    </span>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your email will only be used to
                  notify you about related content.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlogSuggestionPopup;
