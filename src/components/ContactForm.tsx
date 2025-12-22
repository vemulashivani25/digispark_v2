import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { triggerConfetti } from "@/utils/confetti";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { mediumTap, successFeedback } from "@/utils/hapticFeedback";
import { contactFormSchema, ContactFormData, containsXss } from "@/lib/validation";

// Rate limiting: max 3 submissions per minute
const RATE_LIMIT_KEY = 'contact_form_submissions';
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3;

function isClientRateLimited(): boolean {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) return false;
    
    const { timestamps } = JSON.parse(stored);
    const now = Date.now();
    const recentSubmissions = timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW);
    
    return recentSubmissions.length >= RATE_LIMIT_MAX;
  } catch {
    return false;
  }
}

function recordSubmission(): void {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let timestamps: number[] = [];
    
    if (stored) {
      const parsed = JSON.parse(stored);
      timestamps = parsed.timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW);
    }
    
    timestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamps }));
  } catch {
    // Ignore storage errors
  }
}

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formLoadTime] = useState(Date.now()); // Track when form loaded
  const [honeypot, setHoneypot] = useState(""); // Honeypot field
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
    mode: "onChange",
  });
  
  // Update progress bar when fields are completed
  const watchedFields = form.watch();
  
  useEffect(() => {
    const fieldsCount = 6;
    let filledFields = 0;
    
    if (watchedFields.name && watchedFields.name.length >= 2) filledFields++;
    if (watchedFields.email && /^\S+@\S+\.\S+$/.test(watchedFields.email)) filledFields++;
    if (watchedFields.phone) filledFields++;
    if (watchedFields.company) filledFields++;
    if (watchedFields.service) filledFields++;
    if (watchedFields.message && watchedFields.message.length >= 10) filledFields++;
    
    const newProgress = (filledFields / fieldsCount) * 100;
    setProgress(newProgress);
    
    if (progressRef.current) {
      progressRef.current.style.width = `${newProgress}%`;
    }
  }, [watchedFields]);

  const onSubmit = async (data: ContactFormData) => {
    // Security check for XSS
    if (containsXss(data.message) || containsXss(data.name)) {
      toast({
        title: "Invalid input",
        description: "Your message contains invalid characters.",
        variant: "destructive",
      });
      return;
    }

    // Client-side rate limiting
    if (isClientRateLimited()) {
      toast({
        title: "Too many requests",
        description: "Please wait a moment before submitting again.",
        variant: "destructive",
      });
      return;
    }

    mediumTap();
    setIsSubmitting(true);
    
    try {
      if (envelopeRef.current) {
        envelopeRef.current.style.transform = 'translateY(-100vh) scale(0.5) rotate(-10deg)';
        envelopeRef.current.style.opacity = '0';
      }
      
      // Use edge function for secure submission with server-side rate limiting
      const response = await supabase.functions.invoke('submit-contact', {
        body: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || null,
          company: data.company?.trim() || null,
          service: data.service,
          message: data.message.trim(),
          honeypot: honeypot, // Bot trap
          timestamp: formLoadTime, // For timing check
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Submission failed');
      }

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      // Record successful submission for client-side rate limiting
      recordSubmission();
      
      setIsSuccess(true);
      
      setTimeout(() => {
        triggerConfetti();
        successFeedback();
      }, 300);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
      setProgress(0);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 8000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      
      const errorMessage = error.message?.includes("Too many") 
        ? "Too many requests. Please wait a moment."
        : "Please try again later or contact us directly.";
      
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "bg-black/5 backdrop-blur-sm border-yellow-500/30 focus:border-yellow-500 transition-all rounded-md shadow-inner hover:shadow-md focus:shadow-lg text-base";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="h-0.5 bg-black/10 w-full mb-6 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-yellow-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-b from-green-400/20 to-green-600/10 backdrop-blur-md border border-green-400/30 rounded-lg p-8 text-center shadow-xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <motion.h3 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl font-bold text-white mb-4"
              >
                Thanks for filling the form!
              </motion.h3>
              <p className="text-gray-200 mb-6 text-lg">
                We will reach out to you soon!!
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSuccess(false)}
                className="border-green-500 text-green-400 hover:bg-green-500/20"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative overflow-hidden backdrop-blur-lg bg-gray-900/60 border border-gray-700/50 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all duration-700"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-700"></div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 font-medium">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                className={`${inputStyles} border-2 hover:border-yellow-400/70 focus:border-yellow-400 shadow-lg bg-black/30 text-white`} 
                                maxLength={100}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 font-medium">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="john@example.com" 
                                className={`${inputStyles} border-2 hover:border-yellow-400/70 focus:border-yellow-400 shadow-lg bg-black/30 text-white`} 
                                maxLength={255}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 font-medium">Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                placeholder="+1 (555) 000-0000" 
                                className={`${inputStyles} border-2 hover:border-yellow-400/70 focus:border-yellow-400 shadow-lg bg-black/30 text-white`} 
                                maxLength={20}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 font-medium">Company Name (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Company" 
                                className={`${inputStyles} border-2 hover:border-yellow-400/70 focus:border-yellow-400 shadow-lg bg-black/30 text-white`} 
                                maxLength={100}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">Service You're Interested In</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className={`${inputStyles} h-12 border-2 hover:border-yellow-400/70 focus:border-yellow-400 shadow-lg bg-black/30 text-white`}>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-900/95 backdrop-blur-md border-yellow-400/20 text-white">
                              <SelectItem value="web-development">Web Development</SelectItem>
                              <SelectItem value="hubspot-crm">HubSpot CRM</SelectItem>
                              <SelectItem value="zoho-crm">Zoho CRM</SelectItem>
                              <SelectItem value="zapier-automations">Zapier Automations</SelectItem>
                              <SelectItem value="seo-services">SEO Services</SelectItem>
                              <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                              <SelectItem value="content-creation">Content Creation</SelectItem>
                              <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                              <SelectItem value="email-marketing">Email Marketing</SelectItem>
                              <SelectItem value="video-production">Video Production</SelectItem>
                              <SelectItem value="social-media">Social Media Management</SelectItem>
                              <SelectItem value="discord-management">Discord Server Management</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project or inquiry..."
                              className={`${inputStyles} min-h-[140px] border-2 hover:border-yellow-400/70 focus:border-yellow-400 shadow-lg bg-black/30 text-white resize-none`}
                              maxLength={2000}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Honeypot field - hidden from users, catches bots */}
                    <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                      <label htmlFor="website_url">Website</label>
                      <input
                        type="text"
                        id="website_url"
                        name="website_url"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    <div className="relative">
                      <div 
                        ref={envelopeRef} 
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isSubmitting ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transformOrigin: 'center', transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 1s ease' }}
                      >
                        <div className="bg-yellow-400 p-4 rounded-lg shadow-lg">
                          <Mail size={32} className="text-black" />
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black py-6 text-lg font-medium shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20 transform transition-all hover:-translate-y-1 disabled:opacity-70 disabled:pointer-events-none"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
