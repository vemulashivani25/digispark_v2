/**
 * ============================================================================
 * Resources Page
 * ============================================================================
 * 
 * A curated collection of external resources, tools, and learning materials
 * for digital professionals. Features filtering, search, and bookmarking.
 * 
 * Features:
 * - Category and type filtering
 * - Full-text search across titles and descriptions
 * - Bookmark functionality with localStorage persistence
 * - Copy link to clipboard
 * - Animated resource cards with hover effects
 * - Newsletter subscription section
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 * ============================================================================
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Book,
  Code,
  LayoutDashboard,
  LucideIcon,
  Palette,
  Settings,
  SlidersHorizontal,
  Video,
  Youtube,
  Link,
  Github,
  Twitter,
  Mail,
  FileText,
  GraduationCap,
  MessageSquare,
  Globe,
  Search,
  Users,
  BarChart,
  TrendingUp,
  Lightbulb,
  ShieldCheck,
  Image,
  Film,
  Cloud,
  Database,
  Terminal,
  Share2,
  Send,
  Edit,
  Award,
  Briefcase,
  Droplet,
  GitBranch,
  Tag,
  List,
  ExternalLink,
  Sparkles,
  Star,
  ArrowRight,
  Filter,
  X,
  Bookmark,
  Copy,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import ResourceLibrary from "@/components/resources/ResourceLibrary";
import { toast } from "@/hooks/use-toast";

interface Resource {
  title: string;
  description: string;
  link: string;
  category: string;
  type: string;
  iconComponent?: LucideIcon;
}

// Resource card with innovative hover effects
const ResourceCard = ({ 
  resource, 
  index 
}: { 
  resource: Resource; 
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(resource.link);
    setIsCopied(true);
    toast({
      title: "Link copied!",
      description: "Resource link copied to clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmarked!",
      description: isBookmarked ? "Resource removed from bookmarks" : "Resource saved for later",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Analytics": "from-blue-500 to-cyan-500",
      "SEO": "from-green-500 to-emerald-500",
      "Marketing": "from-purple-500 to-pink-500",
      "Design": "from-orange-500 to-red-500",
      "Productivity": "from-yellow-500 to-amber-500",
      "Development": "from-indigo-500 to-violet-500",
      "Multimedia": "from-rose-500 to-pink-500",
      "Social Media": "from-sky-500 to-blue-500",
      "Learning": "from-teal-500 to-cyan-500",
      "Innovation": "from-fuchsia-500 to-purple-500",
      "Security": "from-red-500 to-orange-500",
      "Performance": "from-lime-500 to-green-500",
      "Communication": "from-violet-500 to-indigo-500",
      "Writing": "from-amber-500 to-yellow-500",
      "News": "from-slate-500 to-gray-500",
      "Business": "from-emerald-500 to-teal-500",
      "Research": "from-cyan-500 to-sky-500",
      "Reference": "from-stone-500 to-slate-500",
    };
    return colors[category] || "from-yellow-500 to-amber-500";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.03,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Subtle glow effect on hover */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${getCategoryColor(resource.category)} rounded-xl blur-md opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
      />
      
      <div className="relative h-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-yellow-500/30 group-hover:bg-gray-800/80">
        {/* Subtle corner accent */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${getCategoryColor(resource.category)} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
          style={{ 
            clipPath: "polygon(100% 0, 0 0, 100% 100%)" 
          }}
        />

        {/* Quick action buttons */}
        <motion.div
          className="absolute top-3 right-3 flex gap-2 z-10"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyLink}
            className="p-2 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-600/50 hover:border-yellow-500/50 transition-colors"
          >
            {isCopied ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBookmark}
            className="p-2 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-600/50 hover:border-yellow-500/50 transition-colors"
          >
            <Bookmark 
              className={`w-4 h-4 transition-colors ${isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 hover:text-white'}`} 
            />
          </motion.button>
        </motion.div>

        <div className="p-6">
          {/* Icon with subtle background */}
          <div className="relative mb-4">
            <div
              className="relative w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center border border-gray-700/50 group-hover:border-yellow-500/20 transition-colors duration-300"
            >
              {resource.iconComponent && (
                <resource.iconComponent
                  className="text-yellow-400 transition-transform duration-300 group-hover:scale-105"
                  size={24}
                />
              )}
            </div>
          </div>

          {/* Title with underline animation */}
          <div className="relative mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              {resource.title}
            </h3>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "60%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-5 line-clamp-2 group-hover:text-gray-300 transition-colors">
            {resource.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800/60 text-gray-300 border border-gray-600/30`}
            >
              {resource.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800/40 text-gray-400 border border-gray-700/20">
              {resource.type}
            </span>
          </div>

          {/* Visit button with arrow animation */}
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors group/link"
          >
            <span>Visit Resource</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </motion.div>
          </a>
        </div>

        {/* Bottom subtle line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400/60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
};

// Filter pill component
const FilterPill = ({ 
  label, 
  isActive, 
  onClick, 
  count 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
  count?: number;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
      ${isActive 
        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/25' 
        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700/50'
      }
    `}
  >
    <span>{label}</span>
    {count !== undefined && (
      <span className={`
        px-2 py-0.5 rounded-full text-xs
        ${isActive ? 'bg-black/20 text-black' : 'bg-gray-700 text-gray-400'}
      `}>
        {count}
      </span>
    )}
  </motion.button>
);

const ITEMS_PER_PAGE = 10;

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const resources: Resource[] = [
    { title: "Google Analytics", description: "Analyze web traffic and gain insights into user behavior with Google Analytics.", link: "https://analytics.google.com/", category: "Analytics", type: "Tool", iconComponent: BarChart },
    { title: "Google Search Console", description: "Monitor your website's search performance and identify issues with Google Search Console.", link: "https://search.google.com/search-console/about", category: "SEO", type: "Tool", iconComponent: Search },
    { title: "Moz SEO Learning Center", description: "Learn SEO best practices and strategies with Moz's comprehensive learning resources.", link: "https://moz.com/learn/seo", category: "SEO", type: "Learning", iconComponent: Book },
    { title: "HubSpot Marketing Blog", description: "Stay up-to-date with the latest marketing trends and tips on the HubSpot blog.", link: "https://blog.hubspot.com/marketing", category: "Marketing", type: "Blog", iconComponent: TrendingUp },
    { title: "Canva", description: "Create stunning designs and graphics with Canva's easy-to-use design tools.", link: "https://www.canva.com/", category: "Design", type: "Tool", iconComponent: Palette },
    { title: "Unsplash", description: "Find high-quality, royalty-free images for your projects on Unsplash.", link: "https://unsplash.com/", category: "Design", type: "Resource", iconComponent: Image },
    { title: "Google Workspace", description: "Collaborate and stay organized with Google's suite of productivity tools.", link: "https://workspace.google.com/", category: "Productivity", type: "Tool", iconComponent: LayoutDashboard },
    { title: "Trello", description: "Manage projects and tasks effectively with Trello's visual project management tool.", link: "https://trello.com/", category: "Productivity", type: "Tool", iconComponent: List },
    { title: "Codecademy", description: "Learn to code with Codecademy's interactive coding courses and tutorials.", link: "https://www.codecademy.com/", category: "Development", type: "Learning", iconComponent: Code },
    { title: "Stack Overflow", description: "Find answers to your coding questions and connect with other developers on Stack Overflow.", link: "https://stackoverflow.com/", category: "Development", type: "Community", iconComponent: Terminal },
    { title: "YouTube", description: "Explore a vast library of video content on YouTube, covering a wide range of topics.", link: "https://www.youtube.com/", category: "Multimedia", type: "Resource", iconComponent: Youtube },
    { title: "Vimeo", description: "Discover high-quality video content and connect with filmmakers on Vimeo.", link: "https://vimeo.com/", category: "Multimedia", type: "Resource", iconComponent: Film },
    { title: "Google Fonts", description: "Use a vast library of fonts for your websites and designs with Google Fonts.", link: "https://fonts.google.com/", category: "Design", type: "Resource", iconComponent: FileText },
    { title: "Font Awesome", description: "Get access to a wide range of icons for your projects with Font Awesome.", link: "https://fontawesome.com/", category: "Design", type: "Resource", iconComponent: Tag },
    { title: "GitHub", description: "Collaborate on code and manage projects with GitHub's version control platform.", link: "https://github.com/", category: "Development", type: "Tool", iconComponent: Github },
    { title: "GitLab", description: "Manage code repositories and collaborate with teams using GitLab's DevOps platform.", link: "https://about.gitlab.com/", category: "Development", type: "Tool", iconComponent: GitBranch },
    { title: "Twitter", description: "Stay connected and share updates with the world on Twitter's social media platform.", link: "https://twitter.com/", category: "Social Media", type: "Platform", iconComponent: Twitter },
    { title: "LinkedIn", description: "Connect with professionals and build your network on LinkedIn's professional networking platform.", link: "https://www.linkedin.com/", category: "Social Media", type: "Platform", iconComponent: Users },
    { title: "Mailchimp", description: "Create and manage email marketing campaigns with Mailchimp's email marketing platform.", link: "https://mailchimp.com/", category: "Marketing", type: "Tool", iconComponent: Mail },
    { title: "Sendinblue", description: "Engage with customers through email, SMS, and chat with Sendinblue's marketing platform.", link: "https://www.sendinblue.com/", category: "Marketing", type: "Tool", iconComponent: Send },
    { title: "Udemy", description: "Learn new skills and expand your knowledge with Udemy's online learning platform.", link: "https://www.udemy.com/", category: "Learning", type: "Platform", iconComponent: GraduationCap },
    { title: "Coursera", description: "Take online courses and earn certificates from top universities and institutions on Coursera.", link: "https://www.coursera.org/", category: "Learning", type: "Platform", iconComponent: GraduationCap },
    { title: "StackShare", description: "Discover and compare software tools and technologies used by top companies on StackShare.", link: "https://stackshare.io/", category: "Development", type: "Resource", iconComponent: Database },
    { title: "Product Hunt", description: "Discover new and innovative products every day on Product Hunt's product discovery platform.", link: "https://www.producthunt.com/", category: "Innovation", type: "Platform", iconComponent: Lightbulb },
    { title: "Built With", description: "Find out what technologies a website is built with using Built With's technology lookup tool.", link: "https://builtwith.com/", category: "Development", type: "Tool", iconComponent: Settings },
    { title: "SSL Labs", description: "Test the SSL/TLS configuration of a website with SSL Labs' SSL Server Test.", link: "https://www.ssllabs.com/ssltest/", category: "Security", type: "Tool", iconComponent: ShieldCheck },
    { title: "Google PageSpeed Insights", description: "Analyze the speed and performance of your website with Google PageSpeed Insights.", link: "https://developers.google.com/speed/pagespeed/insights/", category: "Performance", type: "Tool", iconComponent: SlidersHorizontal },
    { title: "GTmetrix", description: "Analyze website performance and identify optimization opportunities with GTmetrix.", link: "https://gtmetrix.com/", category: "Performance", type: "Tool", iconComponent: TrendingUp },
    { title: "Awwwards", description: "Discover and get inspired by the best website designs from around the world on Awwwards.", link: "https://www.awwwards.com/", category: "Design", type: "Inspiration", iconComponent: Award },
    { title: "Dribbble", description: "Explore and showcase design work with Dribbble's online design community.", link: "https://dribbble.com/", category: "Design", type: "Community", iconComponent: Droplet },
    { title: "Behance", description: "Discover and showcase creative work with Behance's online design portfolio platform.", link: "https://www.behance.net/", category: "Design", type: "Community", iconComponent: Palette },
    { title: "Medium", description: "Read and share articles, stories, and ideas on Medium's online publishing platform.", link: "https://medium.com/", category: "Writing", type: "Platform", iconComponent: FileText },
    { title: "Grammarly", description: "Improve your writing with Grammarly's online grammar and spell-checking tool.", link: "https://www.grammarly.com/", category: "Writing", type: "Tool", iconComponent: Edit },
    { title: "Hemingway Editor", description: "Make your writing clear and concise with the Hemingway Editor's online writing tool.", link: "http://www.hemingwayapp.com/", category: "Writing", type: "Tool", iconComponent: Edit },
    { title: "Google Trends", description: "Explore trending search topics and data with Google Trends' online trend analysis tool.", link: "https://trends.google.com/trends/", category: "Analytics", type: "Tool", iconComponent: TrendingUp },
    { title: "Similarweb", description: "Analyze website traffic and performance with Similarweb's online analytics platform.", link: "https://www.similarweb.com/", category: "Analytics", type: "Tool", iconComponent: BarChart },
    { title: "Ubersuggest", description: "Get keyword ideas and SEO insights with Ubersuggest's online SEO tool.", link: "https://neilpatel.com/ubersuggest/", category: "SEO", type: "Tool", iconComponent: Search },
    { title: "SEMrush", description: "Improve your online visibility with SEMrush's online SEO and marketing toolkit.", link: "https://www.semrush.com/", category: "SEO", type: "Tool", iconComponent: Search },
    { title: "Ahrefs", description: "Grow your search traffic with Ahrefs' online SEO and marketing toolkit.", link: "https://ahrefs.com/", category: "SEO", type: "Tool", iconComponent: Search },
    { title: "BuzzSumo", description: "Discover the most shared content on social media with BuzzSumo's online content analysis tool.", link: "https://buzzsumo.com/", category: "Marketing", type: "Tool", iconComponent: Share2 },
    { title: "Buffer", description: "Manage your social media presence with Buffer's online social media management tool.", link: "https://buffer.com/", category: "Marketing", type: "Tool", iconComponent: Share2 },
    { title: "Hootsuite", description: "Manage your social media presence with Hootsuite's online social media management tool.", link: "https://www.hootsuite.com/", category: "Marketing", type: "Tool", iconComponent: Share2 },
    { title: "IFTTT", description: "Automate tasks and connect apps with IFTTT's online automation platform.", link: "https://ifttt.com/", category: "Productivity", type: "Tool", iconComponent: Link },
    { title: "Zapier", description: "Automate tasks and connect apps with Zapier's online automation platform.", link: "https://zapier.com/", category: "Productivity", type: "Tool", iconComponent: Link },
    { title: "Evernote", description: "Stay organized and capture ideas with Evernote's online note-taking tool.", link: "https://evernote.com/", category: "Productivity", type: "Tool", iconComponent: FileText },
    { title: "Notion", description: "Collaborate and stay organized with Notion's online workspace and productivity tool.", link: "https://www.notion.so/", category: "Productivity", type: "Tool", iconComponent: LayoutDashboard },
    { title: "Slack", description: "Communicate and collaborate with teams using Slack's online messaging platform.", link: "https://slack.com/", category: "Communication", type: "Tool", iconComponent: MessageSquare },
    { title: "Zoom", description: "Connect with others through video conferencing with Zoom's online meeting platform.", link: "https://zoom.us/", category: "Communication", type: "Tool", iconComponent: Video },
    { title: "Google Meet", description: "Connect with others through video conferencing with Google Meet's online meeting platform.", link: "https://meet.google.com/", category: "Communication", type: "Tool", iconComponent: Video },
    { title: "Discord", description: "Connect with communities and friends using Discord's online communication platform.", link: "https://discord.com/", category: "Communication", type: "Platform", iconComponent: MessageSquare },
    { title: "Twitch", description: "Watch live streams and connect with gamers on Twitch's online streaming platform.", link: "https://www.twitch.tv/", category: "Multimedia", type: "Platform", iconComponent: Video },
    { title: "Pexels", description: "Find high-quality, royalty-free images and videos for your projects on Pexels.", link: "https://www.pexels.com/", category: "Multimedia", type: "Resource", iconComponent: Image },
    { title: "Pixabay", description: "Find high-quality, royalty-free images and videos for your projects on Pixabay.", link: "https://pixabay.com/", category: "Multimedia", type: "Resource", iconComponent: Image },
    { title: "Flaticon", description: "Get access to a wide range of icons for your projects with Flaticon's online icon library.", link: "https://www.flaticon.com/", category: "Design", type: "Resource", iconComponent: Tag },
    { title: "The Noun Project", description: "Get access to a wide range of icons for your projects with The Noun Project's online icon library.", link: "https://thenounproject.com/", category: "Design", type: "Resource", iconComponent: Tag },
    { title: "Coolors", description: "Generate color palettes and explore color schemes with Coolors' online color tool.", link: "https://coolors.co/", category: "Design", type: "Tool", iconComponent: Palette },
    { title: "Adobe Color", description: "Create color palettes and explore color schemes with Adobe Color's online color tool.", link: "https://color.adobe.com/", category: "Design", type: "Tool", iconComponent: Palette },
    { title: "CodePen", description: "Share and discover code snippets and web development experiments on CodePen's online code editor.", link: "https://codepen.io/", category: "Development", type: "Community", iconComponent: Code },
    { title: "JSFiddle", description: "Test and share code snippets and web development experiments on JSFiddle's online code editor.", link: "https://jsfiddle.net/", category: "Development", type: "Community", iconComponent: Code },
    { title: "W3Schools", description: "Learn web development with W3Schools' online tutorials and references.", link: "https://www.w3schools.com/", category: "Development", type: "Learning", iconComponent: Book },
    { title: "MDN Web Docs", description: "Get comprehensive documentation and resources for web development from MDN Web Docs.", link: "https://developer.mozilla.org/en-US/", category: "Development", type: "Learning", iconComponent: Book },
    { title: "Dev.to", description: "Read and share articles, tutorials, and insights on Dev.to's online development community.", link: "https://dev.to/", category: "Development", type: "Community", iconComponent: Code },
    { title: "Hacker News", description: "Stay up-to-date with the latest news and discussions in the tech industry on Hacker News.", link: "https://news.ycombinator.com/", category: "News", type: "Community", iconComponent: Lightbulb },
    { title: "TechCrunch", description: "Read the latest news and analysis on the tech industry from TechCrunch's online publication.", link: "https://techcrunch.com/", category: "News", type: "Publication", iconComponent: Lightbulb },
    { title: "The Verge", description: "Read the latest news and analysis on technology, science, and culture from The Verge's online publication.", link: "https://www.theverge.com/", category: "News", type: "Publication", iconComponent: Lightbulb },
    { title: "Wired", description: "Read the latest news and analysis on technology, science, and culture from Wired's online publication.", link: "https://www.wired.com/", category: "News", type: "Publication", iconComponent: Lightbulb },
    { title: "MIT Technology Review", description: "Read the latest news and analysis on emerging technologies from MIT Technology Review's online publication.", link: "https://www.technologyreview.com/", category: "News", type: "Publication", iconComponent: Lightbulb },
    { title: "Harvard Business Review", description: "Read the latest insights and analysis on business and management from Harvard Business Review's online publication.", link: "https://hbr.org/", category: "Business", type: "Publication", iconComponent: Briefcase },
    { title: "Forbes", description: "Read the latest news and analysis on business, finance, and investing from Forbes' online publication.", link: "https://www.forbes.com/", category: "Business", type: "Publication", iconComponent: Briefcase },
    { title: "Bloomberg", description: "Read the latest news and analysis on business, finance, and economics from Bloomberg's online publication.", link: "https://www.bloomberg.com/", category: "Business", type: "Publication", iconComponent: Briefcase },
    { title: "The Wall Street Journal", description: "Read the latest news and analysis on business, finance, and economics from The Wall Street Journal's online publication.", link: "https://www.wsj.com/", category: "Business", type: "Publication", iconComponent: Briefcase },
    { title: "The Economist", description: "Read the latest news and analysis on global economics, politics, and business from The Economist's online publication.", link: "https://www.economist.com/", category: "Business", type: "Publication", iconComponent: Briefcase },
    { title: "Google Scholar", description: "Search for scholarly literature and research papers with Google Scholar's online search engine.", link: "https://scholar.google.com/", category: "Research", type: "Tool", iconComponent: GraduationCap },
    { title: "PubMed", description: "Search for biomedical literature and research papers with PubMed's online search engine.", link: "https://pubmed.ncbi.nlm.nih.gov/", category: "Research", type: "Tool", iconComponent: GraduationCap },
    { title: "arXiv", description: "Access preprints of scientific papers in physics, mathematics, computer science, and related fields on arXiv's online repository.", link: "https://arxiv.org/", category: "Research", type: "Repository", iconComponent: GraduationCap },
    { title: "ResearchGate", description: "Connect with researchers and share research papers on ResearchGate's online platform.", link: "https://www.researchgate.net/", category: "Research", type: "Community", iconComponent: Users },
    { title: "Academia.edu", description: "Share research papers and connect with academics on Academia.edu's online platform.", link: "https://www.academia.edu/", category: "Research", type: "Community", iconComponent: Users },
    { title: "Wikipedia", description: "Access a vast encyclopedia of information on a wide range of topics with Wikipedia's online encyclopedia.", link: "https://www.wikipedia.org/", category: "Reference", type: "Encyclopedia", iconComponent: Book },
    { title: "Britannica", description: "Access a comprehensive encyclopedia of information on a wide range of topics with Britannica's online encyclopedia.", link: "https://www.britannica.com/", category: "Reference", type: "Encyclopedia", iconComponent: Book },
    { title: "Merriam-Webster", description: "Look up definitions, synonyms, and antonyms with Merriam-Webster's online dictionary.", link: "https://www.merriam-webster.com/", category: "Reference", type: "Dictionary", iconComponent: Book },
    { title: "Oxford English Dictionary", description: "Look up definitions, etymologies, and pronunciations with the Oxford English Dictionary's online dictionary.", link: "https://www.oed.com/", category: "Reference", type: "Dictionary", iconComponent: Book },
    { title: "Thesaurus.com", description: "Find synonyms and antonyms for words with Thesaurus.com's online thesaurus.", link: "https://www.thesaurus.com/", category: "Reference", type: "Thesaurus", iconComponent: Book },
  ];

  const categories = ["All", ...new Set(resources.map((r) => r.category))];
  const types = ["All", ...new Set(resources.map((r) => r.type))];

  const filteredResources = resources.filter((resource) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTermLower) ||
      resource.description.toLowerCase().includes(searchTermLower);
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType = selectedType === "All" || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedCategory, selectedType]);

  const getCategoryCount = (category: string) => {
    if (category === "All") return resources.length;
    return resources.filter(r => r.category === category).length;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedType("All");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "All" || selectedType !== "All";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <Helmet>
        <title>Resources | DigiSpark</title>
        <meta
          name="description"
          content="A curated list of resources to help you succeed online."
        />
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>{resources.length}+ Curated Resources</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Helpful <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Resources</span>
            </h1>
            <motion.p 
              className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {"Explore our handpicked collection of tools, learning materials, and platforms to supercharge your digital journey.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl" />
            <div className="relative flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden focus-within:border-yellow-500/50 transition-colors">
              <Search className="w-5 h-5 text-gray-400 ml-5" />
              <input
                type="text"
                placeholder="Search resources..."
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchTerm("")}
                  className="p-2 mr-3 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`
                  flex items-center gap-2 px-5 py-4 border-l border-gray-700/50 transition-colors
                  ${showFilters ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-400 hover:text-white'}
                `}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
            </div>
          </div>

          {/* Category filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <Globe className="w-4 h-4 text-yellow-400" />
                      Categories
                    </h3>
                    {hasActiveFilters && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={clearFilters}
                        className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Clear all
                      </motion.button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <FilterPill
                        key={category}
                        label={category}
                        isActive={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                        count={getCategoryCount(category)}
                      />
                    ))}
                  </div>

                  <h3 className="text-white font-semibold flex items-center gap-2 mt-6 mb-4">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                      <FilterPill
                        key={type}
                        label={type}
                        isActive={selectedType === type}
                        onClick={() => setSelectedType(type)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-400">
              Showing <span className="text-yellow-400 font-semibold">{Math.min(visibleCount, filteredResources.length)}</span> of{" "}
              <span className="text-white font-semibold">{filteredResources.length}</span> resources
            </p>
            {hasActiveFilters && !showFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Resources Grid */}
        <AnimatePresence mode="wait">
          {filteredResources.length > 0 ? (
            <div>
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredResources.slice(0, visibleCount).map((resource, index) => (
                  <ResourceCard
                    key={resource.title}
                    resource={resource}
                    index={index}
                  />
                ))}
              </motion.div>
              
              {/* Show More Button */}
              {visibleCount < filteredResources.length && (
                <motion.div
                  className="flex justify-center mt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-400/25 transition-shadow flex items-center gap-2"
                  >
                    Show More
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <Search className="w-12 h-12 text-gray-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">No resources found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-400/25 transition-shadow"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Resource Library - Downloadable Content */}
      <div className="bg-white">
        <ResourceLibrary />
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Resources;
