/**
 * Project Detail Page Component
 * Displays all portfolio projects in a dark techie, animated layout
 * Includes Animated Metrics, Creative Client Feedback with Audio
 * SEO optimized with keywords, metadata, and alt tags
 */
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ChatStyleTestimonial from "@/components/ChatStyleTestimonial";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Clock, 
  Calendar, 
  Globe, 
  Award, 
  Users, 
  Code2, 
  Zap, 
  Target, 
  TrendingUp,
  Sparkles,
  Terminal,
  Cpu,
  Rocket,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Activity,
  MessageCircle,
  Star,
  GitBranch,
  Database,
  Shield,
  Layers,
  Mail,
  Video,
  Settings,
  Search,
  BarChart3
} from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

// Project screenshots imports - Real UI images
import hubspotCrmImg from "@/assets/projects/hubspot-crm-ui.jpg";
import websiteDevelopmentImg from "@/assets/projects/website-dev-ui.jpg";
import seoDashboardImg from "@/assets/projects/seo-analytics-ui.jpg";
import digitalManagementImg from "@/assets/projects/digital-marketing-ui.jpg";
import zoomSupportImg from "@/assets/projects/zoom-meeting-ui.jpg";
import virtualAssistanceImg from "@/assets/projects/virtual-assistant-ui.jpg";
import zohoCrmImg from "@/assets/projects/zoho-crm-ui.jpg";
import emailMarketingImg from "@/assets/projects/email-marketing-ui.jpg";
import videoEditingImg from "@/assets/projects/video-editing-ui.jpg";
import discordManagementImg from "@/assets/projects/discord-community-ui.jpg";

// Extended SEO-optimized projects data
const projectsData = [
  {
    id: "hubspot-crm",
    title: "HubSpot CRM Implementation & Optimization",
    seoTitle: "HubSpot CRM Setup & Management | Sales Pipeline Automation",
    clientName: "TechGrowth Solutions",
    category: "CRM Solutions",
    keywords: ["HubSpot CRM", "sales automation", "lead management", "CRM implementation", "customer relationship management"],
    coverImage: hubspotCrmImg,
    images: [
      { url: hubspotCrmImg, alt: "HubSpot CRM dashboard showing customer management and sales pipeline analytics" },
    ],
    description: "Complete HubSpot CRM implementation and optimization for a growing tech company, including sales pipeline setup, lead scoring, automation workflows, and custom reporting dashboards.",
    longDescription: "TechGrowth Solutions needed a comprehensive CRM solution to manage their rapidly growing customer base and streamline their sales processes. We implemented HubSpot CRM from scratch, setting up custom pipelines, automated workflows, and integrations with their existing tools.\n\nThe implementation included lead scoring models, email sequence automation, deal tracking, and comprehensive reporting dashboards that give real-time visibility into sales performance.",
    challenges: [
      "Migrating 50,000+ contacts from legacy spreadsheets",
      "Creating custom sales pipelines for 3 different product lines",
      "Integrating with existing email and calendar systems",
      "Training 25 sales team members on new processes"
    ],
    solutions: [
      "Automated data migration with duplicate detection",
      "Custom deal stages and properties for each product line",
      "Native integrations with Gmail, Outlook, and Calendly",
      "Comprehensive training program with video tutorials"
    ],
    results: [
      { metric: "45%", label: "Sales Cycle Reduction" },
      { metric: "60%", label: "Lead Response Time Improvement" },
      { metric: "35%", label: "Revenue Increase" },
      { metric: "98%", label: "Team Adoption Rate" }
    ],
    services: ["CRM Implementation", "Sales Automation", "Data Migration", "Team Training"],
    technologies: ["HubSpot CRM", "HubSpot Sales Hub", "Zapier", "Gmail Integration", "Calendly"],
    animatedMetrics: [
      { icon: "users", value: 50000, suffix: "+", label: "Contacts Managed", color: "from-orange-500 to-amber-500" },
      { icon: "deals", value: 2500, suffix: "+", label: "Deals Tracked", color: "from-emerald-500 to-green-500" },
      { icon: "automation", value: 150, suffix: "+", label: "Workflows Created", color: "from-blue-500 to-cyan-500" },
      { icon: "reports", value: 25, suffix: "", label: "Custom Reports", color: "from-purple-500 to-pink-500" }
    ],
    duration: "6 weeks",
    completionDate: "October 2024",
    clientFeedback: {
      text: "The HubSpot implementation transformed our sales process. We now have complete visibility into our pipeline and our team is closing deals faster than ever. The automation alone saves us 20 hours per week.",
      clientName: "Michael Chen",
      clientRole: "VP of Sales, TechGrowth Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      voiceId: "JBFqnCBsd6RMkjVDRZzb", // George - US accent
      accent: "US",
      rating: 5
    },
    siteUrl: "https://hubspot.com",
    awards: ["HubSpot Partner Excellence Award"],
    funFacts: [
      { icon: "contacts", value: "50K+", label: "Contacts Migrated" },
      { icon: "workflows", value: "150+", label: "Automations Built" },
      { icon: "training", value: "25", label: "Team Members Trained" },
      { icon: "hours", value: "20h/week", label: "Time Saved" }
    ],
    color: "from-orange-500 to-amber-500"
  },
  {
    id: "website-development",
    title: "Corporate Website Development & Redesign",
    seoTitle: "Professional Website Development | Responsive Web Design",
    clientName: "Meridian Consulting Group",
    category: "Website Development",
    keywords: ["website development", "responsive design", "corporate website", "web design", "SEO optimization"],
    coverImage: websiteDevelopmentImg,
    images: [
      { url: websiteDevelopmentImg, alt: "Modern corporate website homepage with responsive design and call-to-action buttons" },
    ],
    description: "Complete website redesign and development for a professional consulting firm, featuring modern design, SEO optimization, lead capture forms, and mobile-responsive layouts.",
    longDescription: "Meridian Consulting Group's website was outdated and not generating leads effectively. We redesigned and rebuilt their entire web presence using modern technologies and conversion-focused design principles.\n\nThe new website features a clean, professional design that reflects their brand, optimized page speeds, integrated blog, case studies section, and strategic call-to-action placement throughout.",
    challenges: [
      "Outdated design hurting brand credibility",
      "Poor mobile experience with high bounce rates",
      "No lead capture or conversion optimization",
      "Slow page load times affecting SEO"
    ],
    solutions: [
      "Modern, professional design aligned with brand guidelines",
      "Mobile-first responsive development approach",
      "Strategic CTA placement and lead capture forms",
      "Performance optimization achieving 95+ PageSpeed score"
    ],
    results: [
      { metric: "200%", label: "Lead Generation Increase" },
      { metric: "65%", label: "Bounce Rate Reduction" },
      { metric: "95+", label: "PageSpeed Score" },
      { metric: "150%", label: "Organic Traffic Growth" }
    ],
    services: ["Web Design", "Web Development", "SEO", "Content Strategy", "Performance Optimization"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel", "Google Analytics"],
    animatedMetrics: [
      { icon: "pages", value: 45, suffix: "", label: "Pages Designed", color: "from-blue-500 to-indigo-500" },
      { icon: "forms", value: 12, suffix: "", label: "Lead Forms Created", color: "from-emerald-500 to-teal-500" },
      { icon: "speed", value: 95, suffix: "+", label: "PageSpeed Score", color: "from-yellow-500 to-orange-500" },
      { icon: "visitors", value: 50000, suffix: "+", label: "Monthly Visitors", color: "from-purple-500 to-pink-500" }
    ],
    duration: "8 weeks",
    completionDate: "November 2024",
    clientFeedback: {
      text: "Our new website has completely transformed how clients perceive us. The leads are coming in consistently and the mobile experience is fantastic. Best investment we've made for our digital presence.",
      clientName: "Sarah Williams",
      clientRole: "CEO, Meridian Consulting Group",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      voiceId: "pFZP5JQG7iQjIQuC4Bku", // Lily - UK accent
      accent: "UK",
      rating: 5
    },
    siteUrl: "https://meridian-demo.com",
    awards: ["Best Corporate Website Design 2024"],
    funFacts: [
      { icon: "pages", value: "45", label: "Pages Built" },
      { icon: "speed", value: "0.8s", label: "Load Time" },
      { icon: "mobile", value: "100%", label: "Mobile Optimized" },
      { icon: "seo", value: "Top 5", label: "Google Rankings" }
    ],
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "seo-optimization",
    title: "SEO Strategy & Search Engine Optimization",
    seoTitle: "SEO Services | Organic Traffic Growth & Keyword Ranking",
    clientName: "GreenLife Organics",
    category: "SEO",
    keywords: ["SEO optimization", "keyword research", "organic traffic", "search rankings", "content optimization"],
    coverImage: seoDashboardImg,
    images: [
      { url: seoDashboardImg, alt: "SEO analytics dashboard showing keyword rankings and organic traffic growth" },
    ],
    description: "Comprehensive SEO strategy and implementation for an organic food e-commerce brand, achieving first-page rankings for 50+ high-value keywords and 300% organic traffic growth.",
    longDescription: "GreenLife Organics was struggling to compete with larger players in the organic food market. We developed and executed a comprehensive SEO strategy focusing on long-tail keywords, content optimization, and technical SEO improvements.\n\nThe strategy included keyword research, on-page optimization, content creation, link building, and technical audits that dramatically improved their search visibility.",
    challenges: [
      "Competing against major e-commerce players",
      "Low domain authority and minimal backlinks",
      "Thin product descriptions lacking SEO value",
      "Technical issues affecting crawlability"
    ],
    solutions: [
      "Long-tail keyword strategy targeting niche queries",
      "Strategic link building with food & wellness blogs",
      "Rich, SEO-optimized product descriptions",
      "Complete technical SEO audit and fixes"
    ],
    results: [
      { metric: "300%", label: "Organic Traffic Growth" },
      { metric: "50+", label: "First Page Rankings" },
      { metric: "180%", label: "Revenue from Organic" },
      { metric: "45", label: "Domain Authority Increase" }
    ],
    services: ["SEO Strategy", "Keyword Research", "Content Optimization", "Technical SEO", "Link Building"],
    technologies: ["SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog", "Google Analytics"],
    animatedMetrics: [
      { icon: "keywords", value: 500, suffix: "+", label: "Keywords Tracked", color: "from-emerald-500 to-green-500" },
      { icon: "backlinks", value: 350, suffix: "+", label: "Backlinks Built", color: "from-blue-500 to-cyan-500" },
      { icon: "content", value: 120, suffix: "", label: "Pages Optimized", color: "from-purple-500 to-violet-500" },
      { icon: "traffic", value: 85000, suffix: "+", label: "Monthly Organic Visits", color: "from-orange-500 to-red-500" }
    ],
    duration: "6 months",
    completionDate: "September 2024",
    clientFeedback: {
      text: "We went from invisible to ranking on the first page for our most valuable keywords. The organic traffic has become our primary revenue driver and the ROI has been incredible.",
      clientName: "David Park",
      clientRole: "Founder, GreenLife Organics",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      voiceId: "Xb7hH8MSUJpSbSDYk0k2", // Alice - French accent
      accent: "French",
      rating: 5
    },
    siteUrl: "https://greenlife-demo.com",
    awards: ["SEO Excellence Award 2024"],
    funFacts: [
      { icon: "rankings", value: "50+", label: "Page 1 Keywords" },
      { icon: "traffic", value: "300%", label: "Traffic Growth" },
      { icon: "backlinks", value: "350+", label: "Quality Backlinks" },
      { icon: "roi", value: "5x", label: "ROI Achieved" }
    ],
    color: "from-emerald-500 to-green-500"
  },
  {
    id: "digital-management",
    title: "Digital Marketing & Social Media Management",
    seoTitle: "Digital Marketing Services | Social Media Management & Ads",
    clientName: "UrbanFit Studios",
    category: "Digital Marketing",
    keywords: ["digital marketing", "social media management", "paid advertising", "brand awareness", "content marketing"],
    coverImage: digitalManagementImg,
    images: [
      { url: digitalManagementImg, alt: "Digital marketing dashboard showing social media analytics and campaign performance" },
    ],
    description: "Full-service digital marketing management for a fitness studio chain, including social media content, paid advertising, influencer partnerships, and brand awareness campaigns.",
    longDescription: "UrbanFit Studios wanted to establish a strong digital presence and attract new members to their growing chain of fitness studios. We developed and executed a comprehensive digital marketing strategy across all major platforms.\n\nThe strategy included daily social media content, targeted Facebook and Instagram ads, Google Ads campaigns, influencer partnerships, and email marketing automation.",
    challenges: [
      "Low brand awareness in competitive fitness market",
      "Inconsistent social media presence",
      "High cost per acquisition on paid ads",
      "Limited engagement with target demographic"
    ],
    solutions: [
      "Cohesive brand identity across all platforms",
      "Content calendar with daily engaging posts",
      "Optimized ad targeting with A/B testing",
      "Micro-influencer partnership program"
    ],
    results: [
      { metric: "500%", label: "Social Following Growth" },
      { metric: "65%", label: "Cost Per Lead Reduction" },
      { metric: "250%", label: "Membership Sign-ups" },
      { metric: "4.2M", label: "Impressions Monthly" }
    ],
    services: ["Social Media Management", "Paid Advertising", "Content Creation", "Influencer Marketing", "Email Marketing"],
    technologies: ["Meta Business Suite", "Google Ads", "Hootsuite", "Canva", "Mailchimp"],
    animatedMetrics: [
      { icon: "followers", value: 150000, suffix: "+", label: "Social Followers", color: "from-pink-500 to-rose-500" },
      { icon: "posts", value: 720, suffix: "+", label: "Posts Created", color: "from-blue-500 to-indigo-500" },
      { icon: "reach", value: 4200000, suffix: "+", label: "Monthly Reach", color: "from-purple-500 to-violet-500" },
      { icon: "conversions", value: 3500, suffix: "+", label: "New Members", color: "from-emerald-500 to-teal-500" }
    ],
    duration: "12 months",
    completionDate: "December 2024",
    clientFeedback: {
      text: "Our digital presence has exploded since partnering with DigiSpark. We've become the go-to fitness brand in our area and new members are signing up daily through our social channels.",
      clientName: "Jennifer Lopez",
      clientRole: "Marketing Director, UrbanFit Studios",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      voiceId: "nPczCjzI2devNBz1zQrb", // Brian - Indian accent
      accent: "Indian",
      rating: 5
    },
    siteUrl: "https://urbanfit-demo.com",
    awards: ["Best Fitness Marketing Campaign 2024"],
    funFacts: [
      { icon: "posts", value: "720+", label: "Posts Created" },
      { icon: "followers", value: "150K+", label: "Followers Gained" },
      { icon: "reach", value: "4.2M", label: "Monthly Reach" },
      { icon: "members", value: "3,500+", label: "New Members" }
    ],
    color: "from-pink-500 to-rose-500"
  },
  {
    id: "zoom-support",
    title: "Zoom Meeting & Webinar Technical Support",
    seoTitle: "Zoom Support Services | Virtual Meeting Technical Assistance",
    clientName: "Global Education Network",
    category: "Virtual Support",
    keywords: ["Zoom support", "virtual meetings", "webinar management", "technical assistance", "video conferencing"],
    coverImage: zoomSupportImg,
    images: [
      { url: zoomSupportImg, alt: "Zoom video conferencing interface showing professional meeting setup with multiple participants" },
    ],
    description: "Comprehensive Zoom technical support and webinar management for an international education network, ensuring flawless virtual events for 10,000+ participants monthly.",
    longDescription: "Global Education Network conducts hundreds of virtual classes and webinars monthly, reaching students worldwide. They needed reliable technical support to ensure smooth delivery of their educational content.\n\nWe provided end-to-end Zoom management including account setup, webinar configuration, live event support, recording management, and troubleshooting for both presenters and attendees.",
    challenges: [
      "Managing 200+ monthly webinars across time zones",
      "Technical issues during live educational sessions",
      "Inconsistent audio/video quality for presenters",
      "Complex registration and attendance tracking"
    ],
    solutions: [
      "Dedicated support team with 24/7 coverage",
      "Pre-event technical checks for all presenters",
      "Standardized setup templates for consistent quality",
      "Integrated registration with LMS tracking"
    ],
    results: [
      { metric: "99.8%", label: "Event Success Rate" },
      { metric: "10K+", label: "Monthly Participants" },
      { metric: "85%", label: "Support Ticket Reduction" },
      { metric: "4.9/5", label: "Presenter Satisfaction" }
    ],
    services: ["Zoom Administration", "Live Event Support", "Webinar Management", "Technical Training", "Recording Management"],
    technologies: ["Zoom", "Zoom Webinars", "Calendly", "Slack", "LMS Integration"],
    animatedMetrics: [
      { icon: "meetings", value: 2400, suffix: "+", label: "Meetings Supported", color: "from-blue-500 to-cyan-500" },
      { icon: "participants", value: 120000, suffix: "+", label: "Total Participants", color: "from-emerald-500 to-green-500" },
      { icon: "hours", value: 5000, suffix: "+", label: "Hours of Content", color: "from-purple-500 to-violet-500" },
      { icon: "uptime", value: 99.8, suffix: "%", label: "Event Success Rate", color: "from-orange-500 to-amber-500" }
    ],
    duration: "Ongoing",
    completionDate: "Active Partnership",
    clientFeedback: {
      text: "Having dedicated Zoom support has been a game-changer for our virtual programs. Our instructors can focus on teaching while knowing technical issues are handled instantly.",
      clientName: "Dr. Amanda Foster",
      clientRole: "Director of Online Learning",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      voiceId: "onwK4e9ZLuTAKqWW03F9", // Daniel - UK accent
      accent: "UK",
      rating: 5
    },
    siteUrl: "https://zoom.us",
    awards: ["Excellence in Virtual Education Support"],
    funFacts: [
      { icon: "events", value: "2,400+", label: "Events Managed" },
      { icon: "uptime", value: "99.8%", label: "Success Rate" },
      { icon: "countries", value: "45+", label: "Countries Reached" },
      { icon: "hours", value: "5,000+", label: "Hours Streamed" }
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "virtual-assistance",
    title: "Virtual Assistance & Administrative Support",
    seoTitle: "Virtual Assistant Services | Administrative Support Solutions",
    clientName: "Apex Ventures Capital",
    category: "Virtual Assistance",
    keywords: ["virtual assistant", "administrative support", "executive assistance", "task management", "productivity"],
    coverImage: virtualAssistanceImg,
    images: [
      { url: virtualAssistanceImg, alt: "Virtual assistant dashboard showing task management, calendar, and email organization" },
    ],
    description: "Dedicated virtual assistance services for a venture capital firm, handling executive support, calendar management, investor communications, and administrative operations.",
    longDescription: "Apex Ventures Capital's managing partners were overwhelmed with administrative tasks, taking time away from deal sourcing and portfolio management. We provided dedicated virtual assistance to streamline their operations.\n\nOur team manages executive calendars, coordinates investor meetings, handles email correspondence, prepares reports, and manages travel arrangements, allowing the partners to focus on high-value activities.",
    challenges: [
      "Executives spending 40% of time on admin tasks",
      "Missed meetings and scheduling conflicts",
      "Delayed investor communications",
      "Disorganized document management"
    ],
    solutions: [
      "Dedicated VA team with executive experience",
      "Proactive calendar management and coordination",
      "Standardized investor communication templates",
      "Cloud-based document organization system"
    ],
    results: [
      { metric: "40%", label: "Time Savings for Executives" },
      { metric: "100%", label: "Meeting Attendance Rate" },
      { metric: "24h", label: "Response Time to Investors" },
      { metric: "Zero", label: "Scheduling Conflicts" }
    ],
    services: ["Executive Assistance", "Calendar Management", "Email Management", "Travel Coordination", "Document Organization"],
    technologies: ["Google Workspace", "Calendly", "Notion", "Slack", "Asana"],
    animatedMetrics: [
      { icon: "tasks", value: 5000, suffix: "+", label: "Tasks Completed", color: "from-violet-500 to-purple-500" },
      { icon: "meetings", value: 1200, suffix: "+", label: "Meetings Scheduled", color: "from-blue-500 to-indigo-500" },
      { icon: "emails", value: 15000, suffix: "+", label: "Emails Managed", color: "from-emerald-500 to-teal-500" },
      { icon: "hours", value: 2000, suffix: "+", label: "Hours Saved", color: "from-orange-500 to-amber-500" }
    ],
    duration: "Ongoing",
    completionDate: "Active Partnership",
    clientFeedback: {
      text: "Our virtual assistants have become indispensable. They anticipate our needs, handle everything professionally, and give us back the time we need to focus on deals. Best decision we made.",
      clientName: "Robert Chen",
      clientRole: "Managing Partner, Apex Ventures",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      voiceId: "CwhRBWXzGAHq8TQ4Fs17", // Roger - US accent
      accent: "US",
      rating: 5
    },
    siteUrl: "https://apex-demo.com",
    awards: ["Top Virtual Assistance Provider 2024"],
    funFacts: [
      { icon: "tasks", value: "5,000+", label: "Tasks Done" },
      { icon: "hours", value: "2,000+", label: "Hours Saved" },
      { icon: "response", value: "<1hr", label: "Response Time" },
      { icon: "satisfaction", value: "100%", label: "Satisfaction" }
    ],
    color: "from-violet-500 to-purple-500"
  },
  {
    id: "zoho-crm",
    title: "Zoho CRM Setup & Sales Automation",
    seoTitle: "Zoho CRM Implementation | Sales Automation & Lead Management",
    clientName: "Premier Real Estate Group",
    category: "CRM Solutions",
    keywords: ["Zoho CRM", "sales automation", "real estate CRM", "lead management", "property management"],
    coverImage: zohoCrmImg,
    images: [
      { url: zohoCrmImg, alt: "Zoho CRM dashboard showing lead management, sales pipeline, and contact analytics" },
    ],
    description: "Complete Zoho CRM implementation for a real estate agency, featuring custom property modules, automated lead nurturing, and integration with property listing platforms.",
    longDescription: "Premier Real Estate Group needed a CRM solution tailored to the unique needs of real estate sales. We implemented Zoho CRM with custom modules for properties, automated lead assignment based on territory, and integrations with major listing platforms.\n\nThe system includes custom fields for property details, automated follow-up sequences, document generation for contracts, and mobile access for agents in the field.",
    challenges: [
      "No centralized system for leads and properties",
      "Manual lead assignment causing delays",
      "Inconsistent follow-up by sales agents",
      "No visibility into sales pipeline"
    ],
    solutions: [
      "Custom property and listing modules",
      "Territory-based automatic lead routing",
      "Automated email and SMS follow-up sequences",
      "Real-time dashboard with pipeline visibility"
    ],
    results: [
      { metric: "55%", label: "Lead Conversion Increase" },
      { metric: "70%", label: "Follow-up Compliance" },
      { metric: "30%", label: "Sales Cycle Reduction" },
      { metric: "$2.5M", label: "Additional Closed Deals" }
    ],
    services: ["Zoho CRM Implementation", "Custom Module Development", "Automation Setup", "Integration", "Training"],
    technologies: ["Zoho CRM", "Zoho Flow", "Zoho Analytics", "Twilio", "DocuSign"],
    animatedMetrics: [
      { icon: "leads", value: 25000, suffix: "+", label: "Leads Managed", color: "from-blue-500 to-indigo-500" },
      { icon: "properties", value: 500, suffix: "+", label: "Properties Listed", color: "from-emerald-500 to-green-500" },
      { icon: "agents", value: 45, suffix: "", label: "Agents Using", color: "from-purple-500 to-violet-500" },
      { icon: "deals", value: 120, suffix: "+", label: "Deals Closed Monthly", color: "from-orange-500 to-amber-500" }
    ],
    duration: "8 weeks",
    completionDate: "August 2024",
    clientFeedback: {
      text: "Zoho CRM has revolutionized how we manage our real estate business. Our agents love the mobile access, and the automated follow-ups ensure no lead falls through the cracks.",
      clientName: "James Mitchell",
      clientRole: "Broker/Owner, Premier Real Estate",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      voiceId: "Xb7hH8MSUJpSbSDYk0k2", // Alice - French accent
      accent: "French",
      rating: 5
    },
    siteUrl: "https://zoho.com/crm",
    awards: ["Real Estate Tech Innovation Award"],
    funFacts: [
      { icon: "leads", value: "25K+", label: "Leads Tracked" },
      { icon: "agents", value: "45", label: "Agents Trained" },
      { icon: "deals", value: "$2.5M", label: "Extra Revenue" },
      { icon: "automation", value: "80+", label: "Workflows" }
    ],
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "email-marketing",
    title: "Email Marketing & Newsletter Campaigns",
    seoTitle: "Email Marketing Services | Newsletter Design & Automation",
    clientName: "Lifestyle Magazine Online",
    category: "Email Marketing",
    keywords: ["email marketing", "newsletter design", "email automation", "subscriber growth", "campaign management"],
    coverImage: emailMarketingImg,
    images: [
      { url: emailMarketingImg, alt: "Email marketing platform showing newsletter builder and campaign analytics" },
    ],
    description: "Strategic email marketing program for an online lifestyle magazine, including newsletter design, automation sequences, subscriber growth campaigns, and engagement optimization.",
    longDescription: "Lifestyle Magazine Online wanted to build a stronger relationship with their readers through email and monetize their subscriber base. We developed a comprehensive email marketing strategy from the ground up.\n\nThe program includes beautifully designed newsletters, automated welcome sequences, re-engagement campaigns, sponsored content integration, and detailed analytics to continuously improve performance.",
    challenges: [
      "Low email list growth rate",
      "Poor open and click rates on existing emails",
      "No email monetization strategy",
      "Inconsistent sending schedule"
    ],
    solutions: [
      "Lead magnet strategy for subscriber growth",
      "A/B tested subject lines and content",
      "Sponsored newsletter integration model",
      "Consistent weekly newsletter schedule"
    ],
    results: [
      { metric: "400%", label: "Subscriber List Growth" },
      { metric: "42%", label: "Average Open Rate" },
      { metric: "$50K", label: "Monthly Email Revenue" },
      { metric: "12%", label: "Click-Through Rate" }
    ],
    services: ["Email Strategy", "Newsletter Design", "Automation", "List Growth", "Monetization"],
    technologies: ["Mailchimp", "ConvertKit", "Canva", "Litmus", "Google Analytics"],
    animatedMetrics: [
      { icon: "subscribers", value: 250000, suffix: "+", label: "Subscribers", color: "from-cyan-500 to-blue-500" },
      { icon: "emails", value: 500, suffix: "+", label: "Campaigns Sent", color: "from-emerald-500 to-teal-500" },
      { icon: "opens", value: 42, suffix: "%", label: "Open Rate", color: "from-purple-500 to-violet-500" },
      { icon: "revenue", value: 600000, suffix: "+", label: "Email Revenue", color: "from-yellow-500 to-orange-500" }
    ],
    duration: "12 months",
    completionDate: "November 2024",
    clientFeedback: {
      text: "Our email list has become our most valuable asset. The newsletters look amazing, open rates are through the roof, and we're generating significant revenue from sponsors. Incredible transformation.",
      clientName: "Emily Roberts",
      clientRole: "Editor-in-Chief, Lifestyle Magazine",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      voiceId: "nPczCjzI2devNBz1zQrb", // Brian - Indian accent
      accent: "Indian",
      rating: 5
    },
    siteUrl: "https://lifestyle-demo.com",
    awards: ["Best Email Marketing Campaign 2024"],
    funFacts: [
      { icon: "subscribers", value: "250K+", label: "Subscribers" },
      { icon: "opens", value: "42%", label: "Open Rate" },
      { icon: "revenue", value: "$600K", label: "Total Revenue" },
      { icon: "campaigns", value: "500+", label: "Emails Sent" }
    ],
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: "video-audio-editing",
    title: "Video & Audio Production Services",
    seoTitle: "Video Editing Services | Professional Audio & Video Production",
    clientName: "TechTalk Podcast Network",
    category: "Media Production",
    keywords: ["video editing", "audio editing", "podcast production", "content creation", "media production"],
    coverImage: videoEditingImg,
    images: [
      { url: videoEditingImg, alt: "Professional video editing software interface showing timeline and color grading" },
    ],
    description: "Complete video and audio production services for a podcast network, including editing, sound design, thumbnail creation, and YouTube optimization for 10+ shows.",
    longDescription: "TechTalk Podcast Network produces multiple technology-focused shows across audio and video platforms. They needed professional post-production support to maintain quality while scaling their content output.\n\nWe provide end-to-end production services including audio editing, video editing, sound design, intro/outro creation, thumbnail design, caption generation, and platform-specific optimization.",
    challenges: [
      "Inconsistent audio quality across episodes",
      "Long turnaround times for video editing",
      "No visual branding consistency",
      "Poor YouTube performance metrics"
    ],
    solutions: [
      "Standardized audio processing pipeline",
      "48-hour turnaround for edited episodes",
      "Custom branded templates and assets",
      "YouTube SEO optimization for all uploads"
    ],
    results: [
      { metric: "500%", label: "YouTube Views Increase" },
      { metric: "48h", label: "Episode Turnaround" },
      { metric: "10+", label: "Shows Produced" },
      { metric: "100K+", label: "Monthly Downloads" }
    ],
    services: ["Video Editing", "Audio Editing", "Sound Design", "Thumbnail Design", "Platform Optimization"],
    technologies: ["Adobe Premiere Pro", "Adobe Audition", "DaVinci Resolve", "Photoshop", "Descript"],
    animatedMetrics: [
      { icon: "episodes", value: 500, suffix: "+", label: "Episodes Produced", color: "from-red-500 to-rose-500" },
      { icon: "hours", value: 2000, suffix: "+", label: "Hours of Content", color: "from-blue-500 to-indigo-500" },
      { icon: "views", value: 5000000, suffix: "+", label: "Total Views", color: "from-emerald-500 to-green-500" },
      { icon: "downloads", value: 1200000, suffix: "+", label: "Podcast Downloads", color: "from-purple-500 to-violet-500" }
    ],
    duration: "Ongoing",
    completionDate: "Active Partnership",
    clientFeedback: {
      text: "The production quality of our shows has skyrocketed. Our hosts just record and everything else is handled professionally. The YouTube growth alone has been worth the investment many times over.",
      clientName: "Marcus Johnson",
      clientRole: "Founder, TechTalk Network",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      voiceId: "JBFqnCBsd6RMkjVDRZzb", // George - US accent
      accent: "US",
      rating: 5
    },
    siteUrl: "https://techtalk-demo.com",
    awards: ["Best Podcast Production 2024"],
    funFacts: [
      { icon: "episodes", value: "500+", label: "Episodes Edited" },
      { icon: "views", value: "5M+", label: "Total Views" },
      { icon: "turnaround", value: "48h", label: "Delivery Time" },
      { icon: "shows", value: "10+", label: "Active Shows" }
    ],
    color: "from-red-500 to-rose-500"
  },
  {
    id: "discord-management",
    title: "Discord Server Setup & Community Management",
    seoTitle: "Discord Server Management | Community Building & Moderation",
    clientName: "GamersUnite NFT Project",
    category: "Community Management",
    keywords: ["Discord management", "community building", "server moderation", "engagement", "NFT community"],
    coverImage: discordManagementImg,
    images: [
      { url: discordManagementImg, alt: "Discord server management dashboard showing moderation tools and community analytics" },
    ],
    description: "Complete Discord server setup and community management for an NFT project, building an engaged community of 50,000+ members with custom bots, events, and moderation.",
    longDescription: "GamersUnite NFT Project needed to build and manage an active Discord community as the foundation of their Web3 gaming project. We handled everything from server architecture to daily community engagement.\n\nThe implementation includes custom channel structure, verification systems, custom bots for engagement, role management, 24/7 moderation, regular events, and detailed analytics to track community health.",
    challenges: [
      "Building community from zero members",
      "Managing spam and bot attacks",
      "Keeping members engaged long-term",
      "Coordinating across time zones"
    ],
    solutions: [
      "Strategic growth campaigns and partnerships",
      "Advanced verification and anti-raid systems",
      "Daily events, games, and engagement activities",
      "24/7 moderation team across all time zones"
    ],
    results: [
      { metric: "50K+", label: "Community Members" },
      { metric: "15K", label: "Daily Active Users" },
      { metric: "98%", label: "Spam Prevention Rate" },
      { metric: "200+", label: "Events Hosted" }
    ],
    services: ["Server Setup", "Community Management", "Bot Development", "Moderation", "Event Coordination"],
    technologies: ["Discord", "MEE6", "Carl-bot", "Collab.Land", "Discord.js"],
    animatedMetrics: [
      { icon: "members", value: 50000, suffix: "+", label: "Total Members", color: "from-indigo-500 to-purple-500" },
      { icon: "active", value: 15000, suffix: "+", label: "Daily Active", color: "from-emerald-500 to-teal-500" },
      { icon: "messages", value: 2000000, suffix: "+", label: "Messages Sent", color: "from-blue-500 to-cyan-500" },
      { icon: "events", value: 200, suffix: "+", label: "Events Hosted", color: "from-orange-500 to-amber-500" }
    ],
    duration: "10 months",
    completionDate: "December 2024",
    clientFeedback: {
      text: "Our Discord community has become the heart of our project. The engagement is incredible, the moderation keeps it safe, and the events keep members coming back. This team knows community building.",
      clientName: "Alex Turner",
      clientRole: "Community Lead, GamersUnite",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      voiceId: "pFZP5JQG7iQjIQuC4Bku", // Lily - UK accent
      accent: "UK",
      rating: 5
    },
    siteUrl: "https://discord.gg",
    awards: ["Best Web3 Community 2024"],
    funFacts: [
      { icon: "members", value: "50K+", label: "Members" },
      { icon: "messages", value: "2M+", label: "Messages" },
      { icon: "events", value: "200+", label: "Events" },
      { icon: "mods", value: "24/7", label: "Moderation" }
    ],
    color: "from-indigo-500 to-purple-500"
  }
];

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted) return;
    
    setHasStarted(true);
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, duration, isInView, startOnView, hasStarted]);

  return { count, ref };
};

// Animated Metrics Component
const AnimatedMetricsSection = ({ metrics, projectColor }: { metrics: typeof projectsData[0]['animatedMetrics']; projectColor: string }) => {
  const getMetricIcon = (icon: string) => {
    switch (icon) {
      case 'users': return <Users className="w-6 h-6" />;
      case 'deals': return <TrendingUp className="w-6 h-6" />;
      case 'automation': return <Zap className="w-6 h-6" />;
      case 'reports': return <BarChart3 className="w-6 h-6" />;
      case 'pages': return <Layers className="w-6 h-6" />;
      case 'forms': return <Mail className="w-6 h-6" />;
      case 'speed': return <Rocket className="w-6 h-6" />;
      case 'visitors': return <Users className="w-6 h-6" />;
      case 'keywords': return <Search className="w-6 h-6" />;
      case 'backlinks': return <GitBranch className="w-6 h-6" />;
      case 'content': return <Terminal className="w-6 h-6" />;
      case 'traffic': return <Activity className="w-6 h-6" />;
      case 'followers': return <Users className="w-6 h-6" />;
      case 'posts': return <Layers className="w-6 h-6" />;
      case 'reach': return <Globe className="w-6 h-6" />;
      case 'conversions': return <Target className="w-6 h-6" />;
      case 'meetings': return <Video className="w-6 h-6" />;
      case 'participants': return <Users className="w-6 h-6" />;
      case 'hours': return <Clock className="w-6 h-6" />;
      case 'uptime': return <Shield className="w-6 h-6" />;
      case 'tasks': return <CheckCircle2 className="w-6 h-6" />;
      case 'emails': return <Mail className="w-6 h-6" />;
      case 'leads': return <Users className="w-6 h-6" />;
      case 'properties': return <Database className="w-6 h-6" />;
      case 'agents': return <Users className="w-6 h-6" />;
      case 'subscribers': return <Mail className="w-6 h-6" />;
      case 'opens': return <Mail className="w-6 h-6" />;
      case 'revenue': return <TrendingUp className="w-6 h-6" />;
      case 'episodes': return <Video className="w-6 h-6" />;
      case 'views': return <Globe className="w-6 h-6" />;
      case 'downloads': return <Rocket className="w-6 h-6" />;
      case 'members': return <Users className="w-6 h-6" />;
      case 'active': return <Activity className="w-6 h-6" />;
      case 'messages': return <MessageCircle className="w-6 h-6" />;
      case 'events': return <Calendar className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const { count, ref } = useAnimatedCounter(metric.value);
        
        return (
          <motion.div
            key={index}
            ref={ref}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500`} />
            
            <div className="relative bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, hsl(var(--primary)) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
              
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} text-white mb-3`}
              >
                {getMetricIcon(metric.icon)}
              </motion.div>
              
              <div className={`text-2xl md:text-3xl font-bold font-mono bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {count.toLocaleString()}{metric.suffix}
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 right-2"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${metric.color}`} />
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Animated counter component
const AnimatedValue = ({ value, delay = 0 }: { value: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="font-mono"
    >
      {value}
    </motion.span>
  );
};

// Tech badge component
const TechBadge = ({ tech, index }: { tech: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-xs font-mono cursor-default"
  >
    <Code2 className="w-3 h-3" />
    {tech}
  </motion.span>
);

// Fun fact card component
const FunFactCard = ({ fact, index, color }: { fact: { icon: string; value: string; label: string }; index: number; color: string }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'contacts': return <Users className="w-5 h-5" />;
      case 'workflows': return <Zap className="w-5 h-5" />;
      case 'training': return <Award className="w-5 h-5" />;
      case 'hours': return <Clock className="w-5 h-5" />;
      case 'pages': return <Layers className="w-5 h-5" />;
      case 'speed': return <Rocket className="w-5 h-5" />;
      case 'mobile': return <Globe className="w-5 h-5" />;
      case 'seo': return <Search className="w-5 h-5" />;
      case 'rankings': return <TrendingUp className="w-5 h-5" />;
      case 'traffic': return <Activity className="w-5 h-5" />;
      case 'backlinks': return <GitBranch className="w-5 h-5" />;
      case 'roi': return <Target className="w-5 h-5" />;
      case 'posts': return <Layers className="w-5 h-5" />;
      case 'followers': return <Users className="w-5 h-5" />;
      case 'reach': return <Globe className="w-5 h-5" />;
      case 'members': return <Users className="w-5 h-5" />;
      case 'events': return <Calendar className="w-5 h-5" />;
      case 'uptime': return <Shield className="w-5 h-5" />;
      case 'countries': return <Globe className="w-5 h-5" />;
      case 'tasks': return <CheckCircle2 className="w-5 h-5" />;
      case 'response': return <Zap className="w-5 h-5" />;
      case 'satisfaction': return <Star className="w-5 h-5" />;
      case 'leads': return <Users className="w-5 h-5" />;
      case 'agents': return <Users className="w-5 h-5" />;
      case 'deals': return <TrendingUp className="w-5 h-5" />;
      case 'automation': return <Settings className="w-5 h-5" />;
      case 'subscribers': return <Mail className="w-5 h-5" />;
      case 'opens': return <Mail className="w-5 h-5" />;
      case 'revenue': return <TrendingUp className="w-5 h-5" />;
      case 'campaigns': return <Rocket className="w-5 h-5" />;
      case 'episodes': return <Video className="w-5 h-5" />;
      case 'views': return <Globe className="w-5 h-5" />;
      case 'turnaround': return <Clock className="w-5 h-5" />;
      case 'shows': return <Video className="w-5 h-5" />;
      case 'messages': return <MessageCircle className="w-5 h-5" />;
      case 'mods': return <Shield className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 blur-xl`} />
      <div className="relative bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center">
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${color} text-white mb-3`}>
          {getIcon(fact.icon)}
        </div>
        <div className="text-2xl font-bold text-foreground font-mono">
          <AnimatedValue value={fact.value} delay={index * 0.1} />
        </div>
        <div className="text-xs text-muted-foreground mt-1">{fact.label}</div>
      </div>
    </motion.div>
  );
};

// Project card component with unified bento grid layout
const ProjectCard = ({ project, index }: { 
  project: typeof projectsData[0]; 
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Unified Card Container */}
      <motion.div 
        className={`relative rounded-3xl overflow-hidden border border-border/50 bg-secondary/60 backdrop-blur-sm`}
        animate={{ borderColor: isHovered ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--border) / 0.5)' }}
      >
        {/* Gradient glow effect */}
        <motion.div 
          className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-3xl blur-xl -z-10`}
          animate={{ opacity: isHovered ? 0.3 : 0.1 }}
        />

        {/* Inner Grid */}
        <div className="grid grid-cols-12 gap-px bg-border/20">
          
          {/* Hero Image */}
          <div className="col-span-12 lg:col-span-5 relative h-[280px] lg:h-[380px] bg-secondary">
            <motion.img
              src={project.coverImage}
              alt={project.images[0].alt}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
            
            {/* Project number badge */}
            <div className={`absolute top-5 left-5 w-12 h-12 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white font-bold font-mono text-base shadow-lg`}>
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Category badge */}
            <span className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${project.color} text-white shadow-lg`}>
              {project.category}
            </span>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">{project.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {project.clientName}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {project.duration}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {project.completionDate}</span>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 gap-px bg-border/20">
            
            {/* Results Row */}
            <div className="grid grid-cols-4 gap-px bg-border/20">
              {project.results.map((result, i) => (
                <motion.div
                  key={i}
                  whileHover={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                  className={`p-4 md:p-5 text-center bg-secondary ${i === 0 ? `bg-gradient-to-br ${project.color}` : ''}`}
                >
                  <div className={`text-xl md:text-3xl font-bold font-mono ${
                    i === 0 ? 'text-white' : `bg-gradient-to-r ${project.color} bg-clip-text text-transparent`
                  }`}>
                    {result.metric}
                  </div>
                  <div className={`text-xs md:text-sm mt-1 ${i === 0 ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {result.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div className="p-5 md:p-6 bg-secondary">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.keywords.map((keyword, i) => (
                  <span key={i} className="text-xs text-muted-foreground bg-background/50 px-2.5 py-1 rounded">
                    #{keyword.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated Metrics Row */}
            <div className="grid grid-cols-4 gap-px bg-border/20">
              {project.animatedMetrics.map((metric, i) => {
                const { count, ref } = useAnimatedCounter(metric.value);
                return (
                  <div
                    key={i}
                    ref={ref}
                    className="p-4 md:p-5 text-center bg-secondary"
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${metric.color} text-white mb-2`}>
                      {getMetricIconSmall(metric.icon)}
                    </div>
                    <div className={`text-base md:text-xl font-bold font-mono bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                      {count.toLocaleString()}{metric.suffix}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section - Full Width */}
          <div className="col-span-12 grid grid-cols-12 gap-px bg-border/20">
            
            {/* Tech Stack */}
            <div className="col-span-6 md:col-span-3 p-5 bg-secondary">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech, i) => (
                  <span key={i} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-mono">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-xs bg-background/50 text-muted-foreground px-2.5 py-1 rounded-full">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Services */}
            <div className="col-span-6 md:col-span-3 p-5 bg-secondary">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.services.slice(0, 4).map((service, i) => (
                  <span key={i} className="text-xs bg-background/50 text-muted-foreground px-2.5 py-1 rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="col-span-6 md:col-span-3 p-5 bg-destructive/5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-destructive" /> Challenges
              </h4>
              <ul className="space-y-1.5">
                {project.challenges.slice(0, 3).map((challenge, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                    <span className="line-clamp-1">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="col-span-6 md:col-span-3 p-5 bg-emerald-500/5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Solutions
              </h4>
              <ul className="space-y-1.5">
                {project.solutions.slice(0, 3).map((solution, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="line-clamp-1">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Section */}
          <div className="col-span-12 grid grid-cols-12 gap-px bg-border/20">
            
            {/* Client Testimonial */}
            <div className="col-span-12 lg:col-span-8 p-5 md:p-6 bg-gradient-to-r from-primary/5 to-secondary">
              <div className="flex items-start gap-4">
                <img 
                  src={project.clientFeedback.avatar} 
                  alt={project.clientFeedback.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-muted-foreground italic mb-2 line-clamp-2">
                    "{project.clientFeedback.text}"
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{project.clientFeedback.clientName}</span>
                    <span className="text-xs text-muted-foreground">• {project.clientFeedback.clientRole}</span>
                    <div className="flex gap-0.5 ml-auto">
                      {[...Array(project.clientFeedback.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA + Awards */}
            <div className="col-span-12 lg:col-span-4 p-5 md:p-6 bg-secondary flex flex-col justify-center items-center gap-3">
              {project.awards.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {project.awards.map((award, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      <Award className="w-3 h-3" /> {award}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3">
                {project.siteUrl && (
                  <Button size="sm" variant="outline" asChild className="text-sm">
                    <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Visit
                    </a>
                  </Button>
                )}
                <Button size="sm" asChild className={`text-sm bg-gradient-to-r ${project.color} border-0 text-white`}>
                  <Link to="/project-quote">
                    Start Project <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

// Small metric icon helper
const getMetricIconSmall = (icon: string) => {
  switch (icon) {
    case 'users': return <Users className="w-4 h-4" />;
    case 'deals': return <TrendingUp className="w-4 h-4" />;
    case 'automation': return <Zap className="w-4 h-4" />;
    case 'reports': return <BarChart3 className="w-4 h-4" />;
    case 'pages': return <Layers className="w-4 h-4" />;
    case 'forms': return <Mail className="w-4 h-4" />;
    case 'speed': return <Rocket className="w-4 h-4" />;
    case 'visitors': return <Users className="w-4 h-4" />;
    case 'keywords': return <Search className="w-4 h-4" />;
    case 'backlinks': return <GitBranch className="w-4 h-4" />;
    case 'content': return <Terminal className="w-4 h-4" />;
    case 'traffic': return <Activity className="w-4 h-4" />;
    case 'followers': return <Users className="w-4 h-4" />;
    case 'posts': return <Layers className="w-4 h-4" />;
    case 'reach': return <Globe className="w-4 h-4" />;
    case 'conversions': return <Target className="w-4 h-4" />;
    case 'meetings': return <Video className="w-4 h-4" />;
    case 'participants': return <Users className="w-4 h-4" />;
    case 'hours': return <Clock className="w-4 h-4" />;
    case 'uptime': return <Shield className="w-4 h-4" />;
    case 'tasks': return <CheckCircle2 className="w-4 h-4" />;
    case 'emails': return <Mail className="w-4 h-4" />;
    case 'leads': return <Users className="w-4 h-4" />;
    case 'properties': return <Database className="w-4 h-4" />;
    case 'agents': return <Users className="w-4 h-4" />;
    case 'subscribers': return <Mail className="w-4 h-4" />;
    case 'opens': return <Mail className="w-4 h-4" />;
    case 'revenue': return <TrendingUp className="w-4 h-4" />;
    case 'episodes': return <Video className="w-4 h-4" />;
    case 'views': return <Globe className="w-4 h-4" />;
    case 'downloads': return <Rocket className="w-4 h-4" />;
    case 'members': return <Users className="w-4 h-4" />;
    case 'active': return <Activity className="w-4 h-4" />;
    case 'messages': return <MessageCircle className="w-4 h-4" />;
    case 'events': return <Calendar className="w-4 h-4" />;
    default: return <Sparkles className="w-4 h-4" />;
  }
};

const ProjectDetail = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Helmet>
        <title>Our Projects | DigiSpark Portfolio | CRM, SEO, Web Development & More</title>
        <meta name="description" content="Explore our portfolio of successful projects including HubSpot CRM, Zoho CRM, Website Development, SEO, Digital Marketing, Virtual Assistance, Email Marketing, Video Editing, and Discord Management." />
        <meta name="keywords" content="HubSpot CRM, Zoho CRM, website development, SEO services, digital marketing, virtual assistance, email marketing, video editing, Discord management, Zoom support" />
        <meta property="og:title" content="DigiSpark Project Portfolio | Digital Services & Solutions" />
        <meta property="og:description" content="Discover our successful digital transformation projects with measurable results across CRM, web development, SEO, and more." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://digispark.com/project-details" />
      </Helmet>
      
      <Navbar />
      
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-b from-background via-secondary/50 to-background">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', right: '10%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '20%', left: '5%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '40%', left: '30%' }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6 font-mono text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>portfolio.showcase()</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our portfolio of digital solutions across CRM, Web Development, SEO, Marketing, and more. Real results from real client partnerships.
            </p>

            <div className="flex flex-wrap justify-center gap-8 p-6 bg-secondary/80 backdrop-blur-sm border border-border rounded-2xl">
              {[
                { value: '10+', label: 'Service Categories' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '50+', label: 'Projects Delivered' },
                { value: '15+', label: 'Industries Served' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-8 md:p-12 bg-secondary/80 backdrop-blur-sm border border-border rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's discuss how we can help transform your business with our digital solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-emerald-500 to-blue-500 border-0 text-white hover:opacity-90">
                  <Link to="/project-quote">
                    Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default ProjectDetail;
