/**
 * ============================================================================
 * Success Stories Page
 * ============================================================================
 * 
 * Showcases client case studies with detailed metrics, filtering, and
 * interactive data visualization. Features industry and service filtering,
 * live stats counters, and rotating fun facts.
 * 
 * Features:
 * - Industry and service-based filtering
 * - Real-time animated counters
 * - Interactive case study modals with charts
 * - Performance metrics visualization
 * - Human touch quotes and fun facts
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Book,
  Star,
  Users,
  ArrowRight,
  Search,
  ChevronDown,
  ChevronUp,
  Zap,
  Trophy,
  Clock,
  Globe2,
  Coffee,
  Sparkles,
  Heart,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import { successStories } from "@/data/successStoriesData";
import type { SuccessStory } from "@/types/successStory";
import ServiceFilter from "@/components/success-stories/ServiceFilter";
import SuccessStoryCard from "@/components/success-stories/SuccessStoryCard";
import EnhancedCaseStudyModal from "@/components/success-stories/EnhancedCaseStudyModal";
import IndustrySuccessMetrics from "@/components/success-stories/IndustrySuccessMetrics";
import IndustryFilter from "@/components/success-stories/IndustryFilter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ScrollToTop from "@/components/ScrollToTop";

const caseStudyMetricsData = {
  performanceOverTime: [
    { month: "Jan", metrics: 38 },
    { month: "Feb", metrics: 52 },
    { month: "Mar", metrics: 61 },
    { month: "Apr", metrics: 75 },
    { month: "May", metrics: 85 },
    { month: "Jun", metrics: 92 },
  ],
  marketingChannels: [
    { channel: "Organic Search", value: 40 },
    { channel: "Social Media", value: 30 },
    { channel: "Email", value: 20 },
    { channel: "Paid Ads", value: 10 },
  ],
  industryBenchmark: {
    current: 72,
    competitors: 46,
    industry: 41,
  },
};

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [filter, setFilter] = useState("All");
  const [expandedChallengeId, setExpandedChallengeId] = useState<number | null>(null);
  const [showCharts, setShowCharts] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState("All");
  const controls = useAnimation();
  const { toast } = useToast();

  // Real-time fun facts state
  const [activeFact, setActiveFact] = useState(0);
  const [liveCounter, setLiveCounter] = useState({
    projectsCompleted: 847,
    coffeesCups: 12453,
    linesOfCode: 2847621,
    happyMoments: 9847,
  });

  const funFacts = [
    {
      icon: Coffee,
      text: "Our team drinks an average of 127 cups of coffee per project ☕",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Zap,
      text: "Average project completion is 40% faster than industry standard",
      color: "from-yellow-400 to-amber-500",
    },
    {
      icon: Trophy,
      text: "92% of our clients come back for additional projects 🏆",
      color: "from-emerald-400 to-green-500",
    },
    {
      icon: Clock,
      text: "We've saved clients over 50,000 hours of development time",
      color: "from-blue-400 to-cyan-500",
    },
    { 
      icon: Globe2, 
      text: "Our solutions are used in 45+ countries worldwide 🌍", 
      color: "from-purple-400 to-pink-500" 
    },
    {
      icon: Sparkles,
      text: "Every project includes 24/7 support for the first 90 days",
      color: "from-rose-400 to-red-500",
    },
    {
      icon: Heart,
      text: "We genuinely celebrate every client win like it's our own 🎉",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: MessageCircle,
      text: "Average response time to client messages: 12 minutes",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  // Human touch quotes that rotate
  const [activeQuote, setActiveQuote] = useState(0);
  const humanTouchQuotes = [
    "Behind every success story is a team that cared deeply about making it happen.",
    "We don't just build solutions – we build relationships that last.",
    "Your success keeps us up at night (in the best way possible).",
    "Every project teaches us something new. Thank you for that.",
  ];

  // Rotate quotes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % humanTouchQuotes.length);
    }, 6000);
    return () => clearInterval(quoteInterval);
  }, []);

  // Rotate fun facts
  useEffect(() => {
    const factInterval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(factInterval);
  }, []);

  // Simulate real-time counter updates
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setLiveCounter((prev) => ({
        projectsCompleted: prev.projectsCompleted + Math.floor(Math.random() * 2),
        coffeesCups: prev.coffeesCups + Math.floor(Math.random() * 5),
        linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 100),
        happyMoments: prev.happyMoments + Math.floor(Math.random() * 3),
      }));
    }, 3000);
    return () => clearInterval(counterInterval);
  }, []);

  const services = Array.from(new Set(successStories.flatMap((story) => story.services))).sort();

  const industries = ["All", ...Array.from(new Set(successStories.map((story) => story.industry))).sort()];

  const filteredStories = successStories
    .filter((story) => filter === "All" || story.services.includes(filter))
    .filter((story) => activeIndustry === "All" || story.industry === activeIndustry);

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Happy Clients",
      animDelay: 0,
    },
    {
      icon: Star,
      value: "98%",
      label: "Success Rate",
      animDelay: 0.1,
    },
    {
      icon: Book,
      value: "250+",
      label: "Case Studies",
      animDelay: 0.2,
    },
  ];

  const toggleChallengeExpand = (id: number) => {
    setExpandedChallengeId(expandedChallengeId === id ? null : id);
  };

  const handleStorySelect = (story: SuccessStory) => {
    setSelectedStory(story);
    setShowCharts(false);
    toast({
      title: "Case Study Loaded",
      description: `Now viewing ${story.client}'s success story`,
      variant: "default",
    });
  };

  const handleShowCharts = () => {
    if (selectedStory) {
      setShowCharts(true);
      controls.start({ opacity: 1, y: 0 });
    }
  };

  const hoverEffect = {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  };

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Success Stories | Client Case Studies & Results</title>
        <meta
          name="description"
          content="Explore our portfolio of success stories showcasing the transformative results we've achieved for clients across various industries."
        />
        <meta
          name="keywords"
          content="success stories, case studies, client results, digital transformation, business growth"
        />
      </Helmet>

      <Navbar />

      <main className="pt-16 sm:pt-20 pb-10 sm:pb-20">
        <section className="pt-12 sm:pt-20 pb-6 sm:pb-10 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[length:20px_20px] pointer-events-none" />
          <div className="absolute w-[25rem] sm:w-[50rem] h-[25rem] sm:h-[50rem] bg-yellow-400/5 rounded-full blur-3xl -top-20 -right-60 animate-pulse-slow" />
          <div className="absolute w-[15rem] sm:w-[30rem] h-[15rem] sm:h-[30rem] bg-purple-400/10 rounded-full blur-2xl -bottom-10 -left-20 animate-pulse-slow" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-8 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-6 relative">
                Client{" "}
                <span className="relative">
                  <span className="text-yellow-400">Success Stories</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                  />
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Real results from our innovative digital solutions. Explore how we've helped businesses transform and
                grow.
              </p>

              <motion.div
                className="mt-4 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-xs sm:text-sm"
                  onClick={() => {
                    const element = document.getElementById("success-stories-gallery");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Case Studies
                  <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 text-xs sm:text-sm"
                  onClick={() => {
                    const industrySection = document.getElementById("industry-filter");
                    industrySection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Search className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                  By Industry
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-8 mb-8 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-900/20 border border-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-6 text-center relative overflow-hidden group"
                  whileHover={hoverEffect}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + stat.animDelay }}
                >
                  <div className="absolute inset-0 opacity-20 bg-pattern-grid pointer-events-none" />

                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 sm:w-20 h-12 sm:h-20 bg-yellow-400/10 rounded-full blur-xl group-hover:bg-yellow-400/20 transition-all duration-700" />

                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400/20 to-purple-400/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 relative z-10 border border-white/5">
                    <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400" />
                  </div>

                  <motion.h3
                    className="text-xl sm:text-4xl font-bold text-white mb-1 sm:mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + stat.animDelay }}
                  >
                    {stat.value}
                  </motion.h3>

                  <p className="text-gray-400 text-xs sm:text-lg">{stat.label}</p>

                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 to-purple-400"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div id="industry-filter">
              <IndustryFilter
                industries={industries}
                activeIndustry={activeIndustry}
                onIndustryChange={setActiveIndustry}
              />
            </div>

            <ServiceFilter services={services} activeFilter={filter} onFilterChange={setFilter} />

            {/* Real-Time Fun Facts Ticker */}
            <motion.div
              className="mt-6 sm:mt-12 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 border border-yellow-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-lg">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-lg font-semibold text-white flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Live Stats
                  </h3>
                  <span className="text-[10px] sm:text-xs text-gray-400">Real-time</span>
                </div>

                {/* Live Counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {[
                    { label: "Projects", value: liveCounter.projectsCompleted, icon: Trophy },
                    { label: "Coffees", value: liveCounter.coffeesCups, icon: Coffee },
                    { label: "Lines of Code", value: liveCounter.linesOfCode, icon: Zap },
                    { label: "Happy Moments", value: liveCounter.happyMoments, icon: Sparkles },
                  ].map((counter, idx) => (
                    <motion.div
                      key={counter.label}
                      className="bg-black/40 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-700/50 group hover:border-yellow-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <counter.icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mb-1 sm:mb-2" />
                      <motion.p
                        className="text-lg sm:text-2xl font-bold text-white"
                        key={counter.value}
                        initial={{ scale: 1.1, color: "#facc15" }}
                        animate={{ scale: 1, color: "#ffffff" }}
                        transition={{ duration: 0.3 }}
                      >
                        {counter.value.toLocaleString()}
                      </motion.p>
                      <p className="text-[10px] sm:text-xs text-gray-400">{counter.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Rotating Fun Facts */}
                <div className="relative h-12 sm:h-16 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFact}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r ${funFacts[activeFact].color} bg-opacity-20`}
                      >
                        {(() => {
                          const IconComponent = funFacts[activeFact].icon;
                          return <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white flex-shrink-0" />;
                        })()}
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base line-clamp-1">{funFacts[activeFact].text}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress dots 
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {funFacts.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveFact(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeFact ? "bg-yellow-400 w-6" : "bg-gray-600 hover:bg-gray-500"}`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))} 
                  </div> */}
                </div>
              </div>
            </motion.div>

            {/* Human Touch Section */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="bg-gradient-to-r from-gray-900/60 via-purple-900/20 to-gray-900/60 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg border border-purple-400/30">
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">From Our Hearts</h3>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeQuote}
                    className="text-gray-300 italic text-center text-lg leading-relaxed relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    "{humanTouchQuotes[activeQuote]}"
                  </motion.p>
                </AnimatePresence>

                <div className="flex justify-center gap-2 mt-4">
                  {humanTouchQuotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveQuote(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === activeQuote ? "bg-pink-400 w-6" : "bg-gray-600 hover:bg-gray-500"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-yellow-400" />
                    Built with passion
                  </span>
                  <span className="hidden md:flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    Always listening
                  </span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Constantly improving
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="success-stories-gallery" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            {filteredStories.length === 0 ? (
              <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-2xl text-gray-400 mb-8">No stories found for this filter.</p>
                <Button
                  variant="default"
                  onClick={() => {
                    setFilter("All");
                    setActiveIndustry("All");
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: { opacity: 1, y: 0 },
                      }}
                    >
                      <div className="relative group">
                        <SuccessStoryCard story={story} onSelect={handleStorySelect} />

                        <motion.div
                          className="absolute left-2 right-2 bottom-2 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: expandedChallengeId === story.id ? 1 : 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChallengeExpand(story.id);
                          }}
                        >
                          <div className="bg-black p-4 rounded-xl border border-gray-800">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-yellow-400">Challenge & Solution</h4>
                              <button className="text-gray-400 hover:text-white transition-colors">
                                {expandedChallengeId === story.id ? (
                                  <ChevronDown className="w-5 h-5" />
                                ) : (
                                  <ChevronUp className="w-5 h-5" />
                                )}
                              </button>
                            </div>

                            <AnimatePresence>
                              {expandedChallengeId === story.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-2 border-t border-gray-800 mt-2">
                                    <p className="text-sm text-gray-300 mb-2">
                                      <span className="font-bold text-white">Challenge:</span> {story.challenge}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                      <span className="font-bold text-white">Solution:</span> {story.solution}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-20">
                  <IndustrySuccessMetrics />
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {selectedStory && <EnhancedCaseStudyModal story={selectedStory} onClose={() => setSelectedStory(null)} />}

      <NewsletterSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default SuccessStories;
