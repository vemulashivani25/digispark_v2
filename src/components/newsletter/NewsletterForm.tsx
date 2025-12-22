import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { triggerSuccessConfetti } from '@/utils/confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { mediumTap, successFeedback } from '@/utils/hapticFeedback';
import { newsletterSchema } from '@/lib/validation';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with zod
    const result = newsletterSchema.safeParse({ email: email.trim() });
    
    if (!result.success) {
      toast({
        title: "Error",
        description: result.error.errors[0]?.message || "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    mediumTap();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions' as any)
        .insert([{ email: result.data.email.toLowerCase() }]);
      
      if (error) throw error;
      
      triggerSuccessConfetti();
      successFeedback();
      setIsSuccess(true);
      
      toast({
        title: "Success!",
        description: "You've successfully subscribed to our newsletter!",
      });
      
      setTimeout(() => {
        setEmail("");
        setIsSuccess(false);
      }, 3000);
      
    } catch (error: any) {
      if (error.code === '23505') {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "default",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
          variant: "destructive",
        });
        console.error("Newsletter subscription error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center justify-center gap-3 py-6 bg-green-500/20 rounded-lg border border-green-500/30"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-400 font-medium">Successfully subscribed!</span>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                maxLength={255}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center group disabled:opacity-70 hover:shadow-lg hover:shadow-yellow-400/20 mt-4"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Subscribe Now <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default NewsletterForm;
