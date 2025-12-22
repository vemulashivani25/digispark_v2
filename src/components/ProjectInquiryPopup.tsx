import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { projectInquirySchema, sanitizeForUrl, containsXss } from "@/lib/validation";

const ProjectInquiryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if popup was already shown this session
    const wasShown = sessionStorage.getItem("projectInquiryShown");
    if (wasShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("projectInquiryShown", "true");
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleWhatsappRedirect = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with zod
    const result = projectInquirySchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please fill in all fields correctly",
        variant: "destructive",
      });
      return;
    }

    // Security check for XSS
    if (containsXss(formData.details) || containsXss(formData.name)) {
      toast({
        title: "Invalid input",
        description: "Your message contains invalid characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("project_inquiries" as any).insert({
        name: result.data.name,
        email: result.data.email.toLowerCase(),
        details: result.data.details,
      });

      if (error) throw error;

      // Construct WhatsApp message with sanitized data
      const message = `New Project Inquiry:\nName: ${sanitizeForUrl(result.data.name)}\nEmail: ${sanitizeForUrl(result.data.email)}\nProject Details: ${sanitizeForUrl(result.data.details)}`;
      const whatsappUrl = `https://wa.me/1234567890?text=${message}`;

      window.open(whatsappUrl, "_blank");

      setIsOpen(false);
      setFormData({ name: "", email: "", details: "" });
      setErrors({});

      toast({
        title: "Success!",
        description: "Your inquiry has been saved and sent via WhatsApp.",
      });
    } catch (error) {
      console.error("Error saving inquiry:", error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-black/90 backdrop-blur-md border border-yellow-400 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-yellow-400">Have a Project in Mind?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleWhatsappRedirect} className="space-y-4 mt-4">
          <div>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              maxLength={100}
              className={`bg-black/50 border-yellow-400/50 text-white placeholder:text-gray-400 backdrop-blur-sm ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              maxLength={255}
              className={`bg-black/50 border-yellow-400/50 text-white placeholder:text-gray-400 backdrop-blur-sm ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Project Details"
              required
              maxLength={1000}
              className={`bg-black/50 border-yellow-400/50 text-white placeholder:text-gray-400 backdrop-blur-sm ${errors.details ? 'border-red-500' : ''}`}
            />
            {errors.details && <p className="text-red-400 text-sm mt-1">{errors.details}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 transition-all duration-300"
          >
            {isSubmitting ? "Processing..." : "Chat on WhatsApp"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectInquiryPopup;
