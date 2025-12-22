/**
 * ============================================================================
 * ContactSection.tsx - Contact Form Section Component
 * ============================================================================
 * 
 * Contact section with:
 * - Contact form (name, email, service selection, message)
 * - Form validation and submission to Supabase
 * - Progress indicator showing form completion
 * - Success animation with confetti on submit
 * - Animated background elements
 * 
 * Form submissions are stored in the contact_submissions table in Supabase.
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Mail } from "lucide-react";
import { triggerSuccessConfetti } from "@/utils/confetti";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mediumTap, successFeedback } from "@/utils/hapticFeedback";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Calculate form completion progress
    const totalFields = 4; // name, email, subject, message
    const filledFields = Object.values({ ...formState, [name]: value }).filter(val => val.trim() !== '').length;
    setFormProgress((filledFields / totalFields) * 100);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formState.name || !formState.email || !formState.service || !formState.message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    mediumTap();
    setIsLoading(true);
    
    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: formState.name,
            email: formState.email,
            service: formState.service,
            message: formState.message
          }
        ]);
      
      if (error) throw error;
      
      setIsLoading(false);
      setIsSubmitted(true);
      triggerSuccessConfetti();
      successFeedback();

      // Show success toast
      toast.success("Message sent successfully!", {
        description: "Thanks for filling the form. We will reach out to you soon!!",
        duration: 5000
      });
      
      // Reset the form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          service: "",
          message: "",
        });
        setFormProgress(0);
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
      toast.error("Failed to send message. Please try again later.");
    }
  };
  
  useEffect(() => {
    if (isSubmitted) {
      controls.start({
        y: [-20, 0],
        opacity: [0, 1],
        transition: { duration: 0.5 }
      });
    }
  }, [isSubmitted, controls]);
  
  return (
    <section className="py-20 relative bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none" />
      <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-yellow-600/10 rounded-full filter blur-[80px] opacity-50" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full filter blur-[80px] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get In <span className="text-yellow-400">Touch</span>
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a project in mind or a question about our services? Send us a message and we'll get back to you as soon as possible.
            </motion.p>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Decoration glow effects */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-[20px] opacity-50 group-hover:opacity-75 transition duration-500"></div>
            
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8 shadow-lg overflow-hidden group">
              {/* Form completion progress bar */}
              <div className="absolute top-0 left-0 h-[2px] bg-yellow-400" style={{ width: `${formProgress}%`, transition: 'width 0.3s ease-in-out' }}></div>
              
              {/* Animated background shapes */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full filter blur-lg opacity-50 group-hover:bg-yellow-500/20 transition-all duration-700 group-hover:w-56 group-hover:h-56"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full filter blur-lg opacity-30 group-hover:bg-blue-500/20 transition-all duration-700 group-hover:w-56 group-hover:h-56"></div>
              
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-10"
                  animate={controls}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thanks for filling the form. We will reach out to you soon!!
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring focus:ring-yellow-500/20 focus:border-yellow-500 transition duration-200 text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring focus:ring-yellow-500/20 focus:border-yellow-500 transition duration-200 text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300">
                      Service Interested In
                    </label>
                    <input
                      id="service"
                      name="service"
                      type="text"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring focus:ring-yellow-500/20 focus:border-yellow-500 transition duration-200 text-white"
                      placeholder="Web Development, SEO, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring focus:ring-yellow-500/20 focus:border-yellow-500 transition duration-200 text-white"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black rounded-lg font-medium flex items-center justify-center transition-all duration-300 group relative overflow-hidden hover:shadow-lg hover:shadow-yellow-500/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Mail className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700"></span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
          
          <div className="mt-16 text-center text-gray-400 text-sm">
            <p>
              For immediate assistance, call us at <a href="tel:+1234567890" className="text-yellow-400 hover:underline transition-colors">+1 (234) 567-890</a> or email us at <a href="mailto:hello@digispark.com" className="text-yellow-400 hover:underline transition-colors">hello@digispark.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
