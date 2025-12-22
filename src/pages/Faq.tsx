/**
 * FAQ Page Component
 * Displays frequently asked questions organized by categories
 * Features search functionality and animated counters
 */
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Search, ChevronDown, MessageCircle, Users, Award, Clock, Globe, Zap, TrendingUp, Coffee, Rocket, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Animated Counter Component for FAQ stats
const AnimatedStatCounter = ({ target, suffix = "", label, icon: Icon }: { target: number; suffix?: string; label: string; icon: React.ElementType }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = target;
    const duration = 2000;
    const incrementTime = Math.floor(duration / end);
    
    let timer = setInterval(() => {
      start += 1;
      setCount(Math.min(start, end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [target, isInView]);
  
  return (
    <motion.div
      ref={nodeRef}
      className="text-center p-3 bg-black/30 rounded-xl relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
      </motion.div>
      <motion.div 
        className="text-xl font-bold text-white"
        animate={isInView ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-xs text-gray-400">{label}</div>
    </motion.div>
  );
};

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    question: "What is DigiSpark?",
    answer: "DigiSpark is a full-service digital agency specializing in web development, digital marketing, SEO, branding, and creative design. We help businesses of all sizes establish and grow their online presence through innovative digital solutions.",
    category: "General Questions"
  },
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of digital services including web design & development, mobile app development, SEO optimization, social media marketing, content creation, brand identity design, UI/UX design, e-commerce solutions, and digital strategy consulting.",
    category: "General Questions"
  },
  {
    question: "What industries do you work with?",
    answer: "We work with clients across various industries including technology, healthcare, e-commerce, finance, education, hospitality, real estate, and startups. Our diverse experience allows us to bring fresh perspectives and proven strategies to any sector.",
    category: "General Questions"
  },
  {
    question: "Where are you located?",
    answer: "We are a globally distributed team with offices in major cities. However, we work with clients worldwide and have successfully delivered projects for businesses across different time zones using modern collaboration tools.",
    category: "General Questions"
  },
  // Our Process
  {
    question: "What does the onboarding process look like?",
    answer: "Our onboarding process begins with a discovery call to understand your goals and requirements. We then conduct research, create a detailed proposal, and once approved, we kick off the project with a dedicated team. You'll have a project manager as your main point of contact throughout the journey.",
    category: "Our Process"
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a complex web application or comprehensive marketing campaign could take 3-6 months. We'll provide a detailed timeline during the proposal stage.",
    category: "Our Process"
  },
  {
    question: "How do you communicate progress during projects?",
    answer: "We believe in transparent communication. You'll receive weekly progress reports, have access to project management tools to track milestones, and can schedule regular video calls with your project manager. We use Slack for quick communication and are always just a message away.",
    category: "Our Process"
  },
  {
    question: "Can I request changes during the project?",
    answer: "Absolutely! We follow an agile methodology that accommodates changes. Minor adjustments are typically included, while significant scope changes may require timeline and budget discussions. We always prioritize delivering what truly meets your needs.",
    category: "Our Process"
  },
  // Results & Expectations
  {
    question: "How do you measure success?",
    answer: "We establish clear KPIs at the project's start based on your business objectives. These might include website traffic, conversion rates, search rankings, engagement metrics, or revenue growth. We provide regular analytics reports and optimize strategies based on data.",
    category: "Results & Expectations"
  },
  {
    question: "How quickly will I see results?",
    answer: "Results vary by service type. Website launches show immediate impact, while SEO typically takes 3-6 months for significant improvements. Paid advertising can show results within days. We set realistic expectations upfront and celebrate incremental wins along the way.",
    category: "Results & Expectations"
  },
  {
    question: "What kind of ROI can I expect?",
    answer: "ROI depends on your investment, industry, and goals. Our clients typically see 3-10x returns on their digital marketing investments. We focus on strategies with proven track records and continuously optimize to maximize your returns.",
    category: "Results & Expectations"
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes! We offer various maintenance and support packages to ensure your digital assets continue performing optimally. This includes regular updates, security monitoring, performance optimization, and strategic consultations.",
    category: "Results & Expectations"
  },
  // Pricing & Contracts
  {
    question: "How do you structure your pricing?",
    answer: "We offer flexible pricing models including project-based fixed fees, monthly retainers, and hourly rates for smaller tasks. During our discovery call, we'll recommend the best structure for your needs and provide a transparent quote with no hidden fees.",
    category: "Pricing & Contracts"
  },
  {
    question: "Do you require long-term contracts?",
    answer: "Not necessarily. While some services like SEO and ongoing marketing benefit from longer commitments (typically 6-12 months), many projects are one-time engagements. We believe in earning your business through results, not locking you in.",
    category: "Pricing & Contracts"
  },
  {
    question: "What are your payment terms?",
    answer: "For project work, we typically require a 50% deposit to begin, with the remaining 50% due upon completion. Monthly retainers are billed at the start of each month. We accept various payment methods including credit cards, bank transfers, and PayPal.",
    category: "Pricing & Contracts"
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, for larger projects, we can arrange milestone-based payment plans that align with project deliverables. This helps manage cash flow while ensuring steady progress. Discuss your needs with us, and we'll find a solution that works.",
    category: "Pricing & Contracts"
  },
];

const categories = ["All Categories", "General Questions", "Our Process", "Results & Expectations", "Pricing & Contracts"];

const quickStats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 150, suffix: "+", label: "Projects Delivered" },
  { icon: Clock, value: 24, suffix: "/7", label: "Support Available" },
  { icon: Globe, value: 30, suffix: "+", label: "Countries Served" },
];

const funFacts = [
  { icon: Coffee, fact: "We drink 2,847 cups of coffee per month" },
  { icon: Rocket, fact: "Average project launch time: 6 weeks" },
  { icon: Heart, fact: "98% client satisfaction rate" },
  { icon: Zap, fact: "Our sites load 3x faster than average" },
  { icon: TrendingUp, fact: "Clients see 40% traffic increase on average" },
];

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All Categories" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    const originalIndex = faqData.findIndex(f => f.question === faq.question);
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push({ ...faq, originalIndex });
    return acc;
  }, {} as Record<string, (FAQItem & { originalIndex: number })[]>);

  const getCategoryCount = (category: string) => {
    if (category === "All Categories") return faqData.length;
    return faqData.filter(f => f.category === category).length;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>FAQ | DigiSpark - Frequently Asked Questions</title>
        <meta 
          name="description" 
          content="Find answers to common questions about DigiSpark's digital services, pricing, process, and how we help businesses grow online. Get expert answers instantly." 
        />
        <meta 
          name="keywords" 
          content="FAQ, frequently asked questions, digital agency FAQ, web development questions, SEO questions, pricing, digital marketing help, support" 
        />
        <meta property="og:title" content="FAQ | DigiSpark - Frequently Asked Questions" />
        <meta property="og:description" content="Get answers to your questions about our digital services, process, and pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/faq" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/faq" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our services, process, and how we can help your business grow.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <motion.aside
              className="lg:w-80 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="lg:sticky lg:top-32 space-y-6">
                {/* Categories Card */}
                <div className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? "bg-yellow-400 text-black"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <span>{category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedCategory === category
                            ? "bg-black/20 text-black"
                            : "bg-gray-700 text-gray-400"
                        }`}>
                          {getCategoryCount(category)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-2xl border border-yellow-400/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {quickStats.map((stat, index) => (
                      <AnimatedStatCounter 
                        key={index}
                        target={stat.value}
                        suffix={stat.suffix}
                        label={stat.label}
                        icon={stat.icon}
                      />
                    ))}
                  </div>
                </div>

                {/* Fun Facts Card */}
                <div className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Fun Facts
                  </h3>
                  <div className="space-y-3">
                    {funFacts.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-xl"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <item.icon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{item.fact}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Right Content */}
            <div className="flex-1 min-w-0">
              {/* Search Bar */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border-gray-800 text-white placeholder:text-gray-500 rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20"
                  />
                </div>
              </motion.div>

              {/* Mobile Category Pills */}
              <motion.div
                className="flex flex-wrap gap-2 mb-8 lg:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-800/50 text-gray-300 border border-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* FAQ Sections */}
              <div className="space-y-10">
                {Object.entries(groupedFaqs).map(([category, faqs], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="w-1 h-8 bg-yellow-400 rounded-full"></span>
                      {category}
                    </h2>
                    <div className="space-y-4">
                      {faqs.map((faq) => (
                        <motion.div
                          key={faq.originalIndex}
                          className="bg-gray-900/60 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/5"
                        >
                          <button
                            onClick={() => toggleItem(faq.originalIndex)}
                            className="w-full flex items-center justify-between p-5 text-left group"
                          >
                            <span className="text-white font-medium pr-4 group-hover:text-yellow-400 transition-colors">{faq.question}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              openItems.includes(faq.originalIndex) 
                                ? "bg-yellow-400 text-black rotate-180" 
                                : "bg-gray-800 text-gray-400"
                            }`}>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>
                          <motion.div
                            initial={false}
                            animate={{
                              height: openItems.includes(faq.originalIndex) ? "auto" : 0,
                              opacity: openItems.includes(faq.originalIndex) ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {filteredFaqs.length === 0 && (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No questions found matching your search.</p>
                    <button 
                      onClick={() => { setSearchTerm(""); setSelectedCategory("All Categories"); }}
                      className="text-yellow-400 mt-2 hover:underline"
                    >
                      Clear filters
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Still Have Questions CTA */}
              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 rounded-2xl p-8 md:p-12 border border-yellow-400/20 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="relative text-center">
                    <MessageCircle className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Still Have Questions?
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Can't find the answer you're looking for? Our team is here to help you with any questions.
                    </p>
                    <Link to="/contact">
                      <Button 
                        size="lg"
                        className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold px-8 py-6 text-lg shadow-lg shadow-yellow-400/20"
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Faq;
