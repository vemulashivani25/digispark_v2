import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppChat from "@/components/WhatsAppChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Check,
  Download,
  Mail,
  Laptop,
  Clock,
  DollarSign,
  Search,
  LineChart,
  Users,
  Headphones,
  Database,
  TrendingUp,
  Zap,
  Target,
  Award,
  Rocket,
  Heart,
  Sparkles,
  Loader2,
  Globe,
} from "lucide-react";
import confetti from "canvas-confetti";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { triggerCtaConfetti } from "@/utils/confetti";

// Currency options with exchange rates (approximate rates relative to USD)
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 1.34 },
];

// Project categories with icons
const projectCategories = [
  { id: "web-development", name: "Web Development", icon: <Laptop className="w-6 h-6" /> },
  { id: "seo", name: "SEO", icon: <Search className="w-6 h-6" /> },
  { id: "crm", name: "CRM", icon: <Database className="w-6 h-6" /> },
  { id: "digital-marketing", name: "Digital Marketing", icon: <LineChart className="w-6 h-6" /> },
  { id: "virtual-assistance", name: "Virtual Assistance", icon: <Users className="w-6 h-6" /> },
  { id: "support", name: "Support", icon: <Headphones className="w-6 h-6" /> },
];

// Feature options per category
const featureOptions = {
  "web-development": [
    "Responsive Design",
    "E-commerce Integration",
    "CMS Implementation",
    "Custom Web Application",
    "Website Redesign",
    "Landing Page",
    "Progressive Web App",
  ],
  seo: [
    "Technical SEO Audit",
    "Keyword Research",
    "On-page Optimization",
    "Content Strategy",
    "Local SEO",
    "International SEO",
    "Link Building",
  ],
  crm: [
    "HubSpot Implementation",
    "CRM Strategy Development",
    "Sales Pipeline Setup",
    "Marketing Automation",
    "Custom Integrations",
    "Data Migration",
    "User Training",
  ],
  "digital-marketing": [
    "Social Media Marketing",
    "PPC Campaigns",
    "Email Marketing",
    "Content Marketing",
    "Conversion Rate Optimization",
    "Marketing Strategy Development",
    "Analytics & Reporting",
  ],
  "virtual-assistance": [
    "Administrative Support",
    "Email Management",
    "Calendar Management",
    "Research Tasks",
    "Data Entry",
    "Customer Service",
    "Social Media Management",
  ],
  support: [
    "Technical Support",
    "Help Desk Setup",
    "User Documentation",
    "Knowledge Base Development",
    "Maintenance Plan",
    "Performance Monitoring",
    "Security Audits",
  ],
};

// Timeline options
const timelineOptions = ["1 week", "2-4 weeks", "1 month+", "Flexible"];

// Impact data based on category
const categoryImpactData = {
  "web-development": {
    baseConversion: 25,
    satisfactionRate: 98,
    successStories: 127,
    avgROI: 340,
  },
  seo: {
    baseConversion: 35,
    satisfactionRate: 96,
    successStories: 89,
    avgROI: 420,
  },
  crm: {
    baseConversion: 28,
    satisfactionRate: 97,
    successStories: 64,
    avgROI: 280,
  },
  "digital-marketing": {
    baseConversion: 32,
    satisfactionRate: 95,
    successStories: 112,
    avgROI: 380,
  },
  "virtual-assistance": {
    baseConversion: 18,
    satisfactionRate: 99,
    successStories: 156,
    avgROI: 220,
  },
  support: {
    baseConversion: 22,
    satisfactionRate: 98,
    successStories: 98,
    avgROI: 260,
  },
};

const ProjectQuote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    selectedCategory: "",
    selectedFeatures: [] as string[],
    otherFeatures: "",
    pages: 5,
    timeline: "",
    budget: 5000,
    comments: "",
  });
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  // Calculate projected impact based on selections
  const projectedImpact = useMemo(() => {
    if (!formData.selectedCategory) {
      return {
        conversionIncrease: 0,
        timeToLaunch: "TBD",
        satisfactionRate: 0,
        successStories: 0,
        avgROI: 0,
        funFact: "",
      };
    }

    const categoryData = categoryImpactData[formData.selectedCategory as keyof typeof categoryImpactData];
    const featureBonus = formData.selectedFeatures.length * 2;
    const pageBonus = formData.selectedCategory === "web-development" ? Math.min(formData.pages * 0.5, 10) : 0;

    const timeToLaunch = 
      formData.timeline === "1 week" ? "7 days" :
      formData.timeline === "2-4 weeks" ? "3 weeks" :
      formData.timeline === "1 month+" ? "5 weeks" :
      "Flexible";

    const funFacts = [
      `Similar projects have helped businesses grow by ${categoryData.avgROI}% ROI on average! 🚀`,
      `${categoryData.successStories} businesses like yours have already succeeded with us! ✨`,
      `Our clients save an average of 15 hours/week with this solution! ⏰`,
      `This project type has a ${categoryData.satisfactionRate}% client happiness rate! 💛`,
    ];

    return {
      conversionIncrease: Math.round(categoryData.baseConversion + featureBonus + pageBonus),
      timeToLaunch,
      satisfactionRate: categoryData.satisfactionRate,
      successStories: categoryData.successStories,
      avgROI: categoryData.avgROI,
      funFact: funFacts[Math.floor(Math.random() * funFacts.length)],
    };
  }, [formData.selectedCategory, formData.selectedFeatures.length, formData.pages, formData.timeline]);

  // Calculate budget based on selections (clamped between $20 - $1000)
  useEffect(() => {
    let base = 0;

    // Base cost per category (adjusted for $20-$1000 range)
    const categoryCosts = {
      "web-development": 400,
      seo: 200,
      crm: 300,
      "digital-marketing": 350,
      "virtual-assistance": 150,
      support: 180,
    };

    if (formData.selectedCategory) {
      base = categoryCosts[formData.selectedCategory as keyof typeof categoryCosts] || 100;
    }

    // Add cost for each feature (avg $50 per feature)
    const featureCost = formData.selectedFeatures.length * 50;

    // Factor in page count for web projects
    const pagesCost = formData.selectedCategory === "web-development" ? Math.max(0, formData.pages - 3) * 30 : 0;

    // Calculate total
    let total = base + featureCost + pagesCost;

    // Budget range adjustment (±10%)
    total = Math.round(total * (0.9 + Math.random() * 0.2));

    // Clamp between $20 and $1000
    total = Math.max(20, Math.min(1000, total));

    setEstimatedBudget(total);
  }, [formData.selectedCategory, formData.selectedFeatures, formData.pages]);

  // Trigger confetti when completing the form
  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          particleCount,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#EAB308", "#3B82F6", "#22C55E", "#EC4899"],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.selectedCategory) {
        newErrors.category = "Please select a project category";
      }
    } else if (currentStep === 2) {
      if (formData.selectedFeatures.length === 0 && !formData.otherFeatures) {
        newErrors.features = "Please select at least one feature or specify other requirements";
      }
    } else if (currentStep === 3) {
      if (!formData.timeline) {
        newErrors.timeline = "Please select a timeline";
      }
    } else if (currentStep === 4) {
      if (!formData.name.trim()) {
        newErrors.name = "Please enter your name";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const nextStep = async () => {
    if (validateStep()) {
      if (currentStep < 5) {
        // Save to Supabase when moving from step 4 to 5
        if (currentStep === 4) {
          setIsSubmitting(true);
          try {
            const { error } = await supabase.from("project_quotes" as any).insert({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company_name: formData.companyName,
              selected_category: formData.selectedCategory,
              selected_features: formData.selectedFeatures,
              other_features: formData.otherFeatures || null,
              pages: formData.pages,
              timeline: formData.timeline,
              budget: formData.budget,
              comments: formData.comments || null,
              estimated_budget: estimatedBudget,
            });

            if (error) throw error;

            setCurrentStep(currentStep + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);

            toast({
              title: "Quote submitted successfully!",
              description: "We'll get back to you with a detailed proposal.",
            });
          } catch (error) {
            console.error("Error saving quote:", error);
            toast({
              title: "Error submitting quote",
              description: "Please try again later.",
              variant: "destructive",
            });
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  // Handle previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    const isSelected = formData.selectedFeatures.includes(feature);

    if (isSelected) {
      setFormData({
        ...formData,
        selectedFeatures: formData.selectedFeatures.filter((f) => f !== feature),
      });
    } else {
      setFormData({
        ...formData,
        selectedFeatures: [...formData.selectedFeatures, feature],
      });
    }
  };

  // Download PDF estimate
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();
      const projectType = projectCategories.find((c) => c.id === formData.selectedCategory)?.name || "";
      
      // Header
      doc.setFillColor(31, 41, 55);
      doc.rect(0, 0, 210, 50, 'F');
      
      doc.setTextColor(251, 191, 36);
      doc.setFontSize(24);
      doc.text("Project Quote", 105, 25, { align: "center" });
      
      doc.setTextColor(156, 163, 175);
      doc.setFontSize(12);
      doc.text("Bright Idea Projects", 105, 35, { align: "center" });
      
      // Client Info
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(14);
      doc.text(`Prepared for: ${formData.name}`, 20, 65);
      doc.setFontSize(10);
      doc.text(`Email: ${formData.email}`, 20, 73);
      if (formData.phone) doc.text(`Phone: ${formData.phone}`, 20, 80);
      if (formData.companyName) doc.text(`Company: ${formData.companyName}`, 20, 87);
      
      // Estimate Box
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(20, 95, 170, 35, 3, 3, 'F');
      
      doc.setTextColor(146, 64, 14);
      doc.setFontSize(12);
      doc.text("Estimated Budget", 105, 108, { align: "center" });
      
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(28);
      doc.text(`$${estimatedBudget.toLocaleString()}`, 105, 122, { align: "center" });
      
      // Project Details
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(14);
      doc.text("Project Details", 20, 145);
      
      doc.setFontSize(10);
      doc.text(`Project Type: ${projectType}`, 25, 155);
      doc.text(`Timeline: ${formData.timeline}`, 25, 163);
      if (formData.selectedCategory === "web-development") {
        doc.text(`Pages/Views: ${formData.pages}`, 25, 171);
      }
      
      // Features
      if (formData.selectedFeatures.length > 0) {
        doc.setFontSize(14);
        doc.text("Selected Features", 20, 185);
        
        doc.setFontSize(10);
        formData.selectedFeatures.forEach((feature, index) => {
          doc.text(`• ${feature}`, 25, 195 + (index * 7));
        });
      }
      
      // Projected Impact
      const impactY = 195 + (formData.selectedFeatures.length * 7) + 15;
      doc.setFillColor(17, 24, 39);
      doc.roundedRect(20, impactY, 170, 40, 3, 3, 'F');
      
      doc.setTextColor(251, 191, 36);
      doc.setFontSize(12);
      doc.text("Projected Impact", 105, impactY + 12, { align: "center" });
      
      doc.setFontSize(10);
      doc.setTextColor(16, 185, 129);
      doc.text(`+${projectedImpact.conversionIncrease}% Conversion`, 45, impactY + 28);
      
      doc.setTextColor(59, 130, 246);
      doc.text(`${projectedImpact.timeToLaunch} Launch`, 105, impactY + 28, { align: "center" });
      
      doc.setTextColor(245, 158, 11);
      doc.text(`${projectedImpact.satisfactionRate}% Satisfaction`, 165, impactY + 28, { align: "right" });
      
      // Footer
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(8);
      doc.text(`Generated on ${new Date().toLocaleDateString()} | Valid for 30 days`, 105, 280, { align: "center" });
      doc.text("© Bright Idea Projects", 105, 287, { align: "center" });
      
      doc.save(`quote-${formData.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`);
      
      toast({
        title: "PDF Downloaded!",
        description: "Your quote has been saved successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating PDF",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Send via email
  const sendEmail = async () => {
    setIsSendingEmail(true);
    try {
      const projectType = projectCategories.find((c) => c.id === formData.selectedCategory)?.name || "";
      
      const { data, error } = await supabase.functions.invoke("send-quote-email", {
        body: {
          name: formData.name,
          email: formData.email,
          estimatedBudget,
          projectType,
          timeline: formData.timeline,
          features: formData.selectedFeatures,
          pages: formData.selectedCategory === "web-development" ? formData.pages : undefined,
          projectedImpact: {
            conversionIncrease: projectedImpact.conversionIncrease,
            timeToLaunch: projectedImpact.timeToLaunch,
            satisfactionRate: projectedImpact.satisfactionRate,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Email Sent! 📧",
        description: `Your quote has been sent to ${formData.email}`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending email",
        description: "Please try again or download the PDF instead.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Render projected impact section
  const renderProjectedImpact = () => {
    if (!formData.selectedCategory) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-gradient-to-br from-gray-900/80 to-black/70 border border-yellow-400/20 rounded-xl p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h4 className="text-lg font-semibold text-white">Projected Impact</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <motion.div 
            className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-green-400 text-xl font-bold">+{projectedImpact.conversionIncrease}%</div>
            <div className="text-gray-400 text-xs">Est. Conversion</div>
          </motion.div>

          <motion.div 
            className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-blue-400 text-xl font-bold">{projectedImpact.timeToLaunch}</div>
            <div className="text-gray-400 text-xs">Time to Launch</div>
          </motion.div>

          <motion.div 
            className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <div className="text-yellow-400 text-xl font-bold">{projectedImpact.satisfactionRate}%</div>
            <div className="text-gray-400 text-xs">Happy Clients</div>
          </motion.div>

          <motion.div 
            className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-purple-400 text-xl font-bold">{projectedImpact.avgROI}%</div>
            <div className="text-gray-400 text-xs">Avg. ROI</div>
          </motion.div>
        </div>

        {projectedImpact.funFact && (
          <motion.div 
            className="bg-yellow-400/10 border-l-4 border-yellow-400 p-3 rounded-r-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-yellow-200 text-sm italic">{projectedImpact.funFact}</p>
          </motion.div>
        )}

        <p className="text-gray-500 text-xs mt-3 text-center">
          *Based on data from {projectedImpact.successStories} similar projects
        </p>
      </motion.div>
    );
  };

  // Render category selection
  const renderCategorySelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-white">Select Your Project Category</h3>
      <p className="text-gray-400">What type of project are you looking to start?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {projectCategories.map((category) => (
          <motion.div
            key={category.id}
            className={`relative overflow-hidden rounded-xl border p-6 cursor-pointer
              transition-all duration-300 group hover:shadow-glow-sm
              ${
                formData.selectedCategory === category.id
                  ? "border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-black/80"
                  : "border-gray-800 bg-gray-900/50 hover:bg-gray-900/80"
              }`}
            onClick={() => setFormData({ ...formData, selectedCategory: category.id })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -inset-px z-0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:blur-md transition-all duration-500 bg-gradient-to-br from-yellow-400/30 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div
                className={`p-3 rounded-full 
                ${
                  formData.selectedCategory === category.id
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-300 group-hover:bg-yellow-400/20"
                } 
                transition-colors duration-300`}
              >
                {category.icon}
              </div>
              <h4 className="font-medium text-lg text-white">{category.name}</h4>

              {formData.selectedCategory === category.id && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {errors.category && <p className="text-red-500 mt-2">{errors.category}</p>}

      {renderProjectedImpact()}
    </motion.div>
  );

  // Render feature selection
  const renderFeatureSelection = () => {
    const features = formData.selectedCategory
      ? featureOptions[formData.selectedCategory as keyof typeof featureOptions]
      : [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <h3 className="text-2xl font-bold text-white">Select Desired Features</h3>
        <p className="text-gray-400">Choose the features you need for your project:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
          {features.map((feature) => (
            <motion.button
              key={feature}
              className={`p-4 rounded-lg text-left flex items-center space-x-3
                transition-colors duration-300 group
                ${
                  formData.selectedFeatures.includes(feature)
                    ? "bg-yellow-400/20 border border-yellow-400/50 text-white"
                    : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800"
                }`}
              onClick={() => toggleFeature(feature)}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-1 rounded-md
                ${
                  formData.selectedFeatures.includes(feature)
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 text-gray-300 group-hover:bg-gray-600"
                }
              `}
              >
                {formData.selectedFeatures.includes(feature) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              <span>{feature}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-white mb-2">Other Features or Requirements</label>
          <Textarea
            value={formData.otherFeatures}
            onChange={(e) => setFormData({ ...formData, otherFeatures: e.target.value })}
            placeholder="Describe any other features or specific requirements you have..."
            className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
            rows={4}
          />
        </div>
        {errors.features && <p className="text-red-500 mt-2">{errors.features}</p>}

        {renderProjectedImpact()}
      </motion.div>
    );
  };

  // Render project scope
  const renderProjectScope = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-white">Define Your Project Scope</h3>
      <p className="text-gray-400">Help us understand the scale of your project:</p>

      {/* Pages/Views slider */}
      {formData.selectedCategory === "web-development" && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <label className="text-white">Number of Pages/Views</label>
            <span className="text-yellow-400 font-medium">{formData.pages} pages</span>
          </div>

          <div className="flex items-center relative py-4">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700 rounded-full transform -translate-y-1/2"></div>
            <input
              type="range"
              min="1"
              max="30"
              value={formData.pages}
              onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
              className="appearance-none w-full absolute cursor-pointer z-10 opacity-0"
            />
            <div
              className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transform -translate-y-1/2"
              style={{ width: `${(formData.pages / 30) * 100}%` }}
            ></div>
            <div
              className="absolute top-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-lg transform -translate-y-1/2 -mt-0.5"
              style={{ left: `${(formData.pages / 30) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>1 page</span>
            <span>15 pages</span>
            <span>30 pages</span>
          </div>
        </div>
      )}

      {/* Timeline selection */}
      <div className="mt-6">
        <label className="block text-white mb-2 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-yellow-400" />
          Project Timeline
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timelineOptions.map((option) => (
            <motion.button
              key={option}
              className={`p-3 rounded-lg text-center
                transition-all duration-300
                ${
                  formData.timeline === option
                    ? "bg-yellow-400/20 border border-yellow-400/50 text-white"
                    : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                }`}
              onClick={() => setFormData({ ...formData, timeline: option })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {errors.timeline && <p className="text-red-500 mt-2">{errors.timeline}</p>}
      </div>

      {/* Currency Selector */}
      <div className="mt-6">
        <label className="block text-white mb-2 flex items-center">
          <Globe className="w-4 h-4 mr-2 text-yellow-400" />
          Select Currency
        </label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {currencies.map((currency) => (
            <motion.button
              key={currency.code}
              className={`p-2 rounded-lg text-center text-sm transition-all duration-300
                ${selectedCurrency.code === currency.code
                  ? "bg-yellow-400/20 border border-yellow-400/50 text-yellow-400"
                  : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                }`}
              onClick={() => setSelectedCurrency(currency)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold">{currency.symbol}</span>
              <span className="block text-xs opacity-70">{currency.code}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Budget slider */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <label className="text-white flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
            Budget Range
          </label>
          <span className="text-yellow-400 font-medium">
            {selectedCurrency.symbol}{Math.round(formData.budget * selectedCurrency.rate).toLocaleString()} {selectedCurrency.code}
          </span>
        </div>

        <div className="flex items-center relative py-4">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700 rounded-full transform -translate-y-1/2"></div>
          <input
            type="range"
            min="100"
            max="20000"
            step="100"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
            className="appearance-none w-full absolute cursor-pointer z-10 opacity-0"
          />
          <div
            className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transform -translate-y-1/2"
            style={{ width: `${(formData.budget / 20000) * 100}%` }}
          ></div>
          <div
            className="absolute top-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-lg transform -translate-y-1/2 -mt-0.5"
            style={{ left: `${(formData.budget / 20000) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>{selectedCurrency.symbol}{Math.round(100 * selectedCurrency.rate).toLocaleString()}</span>
          <span>{selectedCurrency.symbol}{Math.round(10000 * selectedCurrency.rate).toLocaleString()}</span>
          <span>{selectedCurrency.symbol}{Math.round(20000 * selectedCurrency.rate).toLocaleString()}</span>
        </div>
      </div>

      {/* Additional comments */}
      <div className="mt-6">
        <label className="block text-white mb-2">Additional Comments</label>
        <Textarea
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          placeholder="Share any other details that might help us understand your project better..."
          className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
          rows={4}
        />
      </div>

      {renderProjectedImpact()}
    </motion.div>
  );

  // Render contact information
  const renderContactInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-white">Your Contact Information</h3>
      <p className="text-gray-400">So we know how to reach you with your estimate:</p>

      <div className="space-y-4 mt-6">
        <div>
          <label className="block text-white mb-2">Full Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Smith"
            className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
            required
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-white mb-2">Email Address</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
            required
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-white mb-2">Phone Number (Optional)</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (123) 456-7890"
            className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Company Name (Optional)</label>
          <Input
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Your Company"
            className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
          />
        </div>
      </div>

      {renderProjectedImpact()}
    </motion.div>
  );

  // Render estimate results
  const renderEstimateResults = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mx-auto w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mb-4"
        >
          <Check className="w-12 h-12 text-black" />
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold text-white">Thanks, {formData.name.split(" ")[0]}!</h3>
        <p className="text-yellow-400 mt-1">Your project estimate is ready</p>
        <p className="text-gray-400 mt-3">We'll reach out shortly to discuss your project in detail.</p>
      </div>

      <div className="bg-gradient-to-br from-gray-900/80 to-black/70 border border-yellow-400/20 rounded-xl p-6 backdrop-blur-sm shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-medium text-white">Project Estimate</h4>
          <div className="text-right">
            <div className="text-yellow-400 font-bold text-2xl">
              {selectedCurrency.symbol}{Math.round(estimatedBudget * selectedCurrency.rate).toLocaleString()} {selectedCurrency.code}
            </div>
            <div className="text-gray-400 text-sm">Estimated Budget</div>
            {selectedCurrency.code !== "USD" && (
              <div className="text-gray-500 text-xs">(≈ ${estimatedBudget.toLocaleString()} USD)</div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <div className="text-gray-400">Project Type</div>
            <div className="text-white font-medium">
              {projectCategories.find((c) => c.id === formData.selectedCategory)?.name}
            </div>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <div className="text-gray-400">Timeline</div>
            <div className="text-white font-medium">{formData.timeline}</div>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <div className="text-gray-400">Selected Features</div>
            <div className="text-white font-medium text-right">{formData.selectedFeatures.length} features</div>
          </div>

          {formData.selectedCategory === "web-development" && (
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <div className="text-gray-400">Pages/Views</div>
              <div className="text-white font-medium">{formData.pages}</div>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <div className="text-gray-400">Contact Email</div>
            <div className="text-white font-medium">{formData.email}</div>
          </div>
        </div>
      </div>

      {/* Projected Impact in Results */}
      <div className="bg-gradient-to-br from-gray-900/80 to-black/70 border border-green-400/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-green-400" />
          <h4 className="text-lg font-semibold text-white">Your Projected Impact</h4>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-green-400 text-2xl font-bold">+{projectedImpact.conversionIncrease}%</div>
            <div className="text-gray-400 text-xs">Conversion Boost</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 text-2xl font-bold">{projectedImpact.timeToLaunch}</div>
            <div className="text-gray-400 text-xs">To Launch</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 text-2xl font-bold">{projectedImpact.satisfactionRate}%</div>
            <div className="text-gray-400 text-xs">Success Rate</div>
          </div>
        </div>

        <div className="mt-4 bg-green-500/10 border-l-4 border-green-400 p-3 rounded-r-lg">
          <p className="text-green-200 text-sm">
            Based on {projectedImpact.successStories} similar projects, clients typically see a {projectedImpact.avgROI}% return on investment within the first year!
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
          <Button
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
          <Button 
            onClick={sendEmail} 
            disabled={isSendingEmail}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            {isSendingEmail ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Email Estimate
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Human touch message */}
      <motion.div 
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-500 text-sm italic">
          "Every project is a partnership. We're excited to start this journey with you!" 💛
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Project Quote | Digital Agency</title>
        <meta name="description" content="Get an estimate for your digital project." />
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-20">
        <section className="bg-black relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none" />
          <div className="absolute w-[30rem] h-[30rem] bg-yellow-400/5 rounded-full blur-2xl top-20 -right-20 animate-pulse-slow" />
          <div className="absolute w-[20rem] h-[20rem] bg-blue-400/10 rounded-full blur-xl -bottom-10 -left-10 animate-pulse-slow" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Let's Estimate Your <span className="text-yellow-400">Project</span>
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-400 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Answer a few questions to get an instant ballpark estimate for your project
                </motion.p>
              </div>

              {/* Progress steps */}
              <div className="mb-12">
                <div className="flex justify-between items-center w-full max-w-md mx-auto">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <React.Fragment key={step}>
                      {step > 1 && (
                        <div className="flex-1 h-1 bg-gray-700 relative">
                          <motion.div
                            className="h-1 bg-yellow-400 absolute inset-0"
                            initial={{ width: "0%" }}
                            animate={{ width: currentStep >= step ? "100%" : "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      )}
                      <div className="relative">
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                            ${
                              currentStep >= step
                                ? "bg-yellow-400 text-black border-yellow-400"
                                : "bg-gray-800 text-white border-gray-700"
                            }`}
                          whileHover={currentStep >= step ? { scale: 1.1 } : {}}
                          animate={
                            currentStep === step
                              ? {
                                  scale: [1, 1.1, 1],
                                  transition: { duration: 1, repeat: Infinity, repeatType: "reverse" },
                                }
                              : {}
                          }
                        >
                          {currentStep > step ? <Check className="w-5 h-5" /> : <span>{step}</span>}

                          {/* Glowing effect for active step */}
                          {currentStep === step && (
                            <motion.div
                              className="absolute -inset-2 rounded-full bg-yellow-400/20 blur-md z-[-1]"
                              animate={{
                                opacity: [0.5, 0.8, 0.5],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />
                          )}
                        </motion.div>

                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-500">
                          {step === 1 && "Category"}
                          {step === 2 && "Features"}
                          {step === 3 && "Scope"}
                          {step === 4 && "Contact"}
                          {step === 5 && "Estimate"}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Form container */}
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 md:p-10 border border-gray-800 shadow-2xl">
                <div className="min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && renderCategorySelection()}
                    {currentStep === 2 && renderFeatureSelection()}
                    {currentStep === 3 && renderProjectScope()}
                    {currentStep === 4 && renderContactInfo()}
                    {currentStep === 5 && renderEstimateResults()}
                  </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                {currentStep < 5 && (
                  <div className="flex justify-between mt-8">
                    <Button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      variant="outline"
                      className={`px-5 ${currentStep === 1 ? "opacity-0" : ""}`}
                    >
                      Back
                    </Button>

                    <Button
                      onClick={nextStep}
                      disabled={isSubmitting}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-8"
                    >
                      {isSubmitting ? "Submitting..." : currentStep === 4 ? "Get Estimate" : "Next Step"}
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Add Newsletter Section */}
        <NewsletterSection />
      </main>

      <FooterSection />
      <ScrollToTop />
      <WhatsAppChat phoneNumber="+1234567890" />
    </div>
  );
};

export default ProjectQuote;
