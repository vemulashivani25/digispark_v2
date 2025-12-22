import { LucideIcon } from "lucide-react";
import {
  Code,
  Database,
  LineChart,
  Mail,
  MessageSquare,
  PenTool,
  Search,
  Server,
  Smartphone,
  Users,
  Video,
  Zap,
  Settings,
  Bot,
  Headphones,
  Monitor,
  Mic,
  Users2
} from "lucide-react";

/** Service type definition for type safety across the application */
export interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: LucideIcon;
  highlight: string;
  caseStudy: string;
  slug: string;
  category: string;
}

export const services: Service[] = [
  {
    title: "HubSpot CRM",
    description: "Streamline customer relationships with our HubSpot CRM implementation and management services.",
    features: ["Contact Management", "Pipeline Automation", "Sales Analytics", "Email Integration", "Lead Scoring", "Custom Dashboards"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Database,
    highlight: "yellow",
    caseStudy: "22% More Leads for Acme Inc",
    slug: "hubspot-crm",
    category: "Automation & CRM"
  },
  {
    title: "Web Development",
    description: "Custom websites and web applications that deliver exceptional user experiences and drive business growth.",
    features: ["Responsive Design", "E-commerce", "Web Applications", "CMS Development", "UI/UX Design", "API Integration"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Code,
    highlight: "blue",
    caseStudy: "200% Conversion Increase",
    slug: "web-development",
    category: "Development"
  },
  {
    title: "SEO Services",
    description: "Boost your search rankings with our data-driven SEO strategies tailored to your industry and audience.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO", "Keyword Research", "SEO Audits"],
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Search,
    highlight: "green",
    caseStudy: "Top 3 Rankings in 4 Months",
    slug: "seo-services",
    category: "Marketing"
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to increase visibility, engagement, and conversions.",
    features: ["Social Media", "PPC Campaigns", "Content Marketing", "Email Campaigns", "Influencer Marketing", "Analytics & Reporting"],
    image: "https://images.unsplash.com/photo-1533750516278-4555310c7e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: LineChart,
    highlight: "purple",
    caseStudy: "147% ROI on Ad Spend",
    slug: "digital-marketing",
    category: "Marketing"
  },
  {
    title: "Video Production",
    description: "Professional video content creation from concept to delivery, tailored to your brand and objectives.",
    features: ["Brand Videos", "Product Demos", "Event Coverage", "Animations", "Social Media Content", "Video Ads"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Video,
    highlight: "red",
    caseStudy: "3M Views for Brand Campaign",
    slug: "video-production",
    category: "Creative"
  },
  {
    title: "Virtual Assistance",
    description: "Reliable administrative support to streamline operations and increase productivity for your business.",
    features: ["Email Management", "Calendar Organization", "Customer Support", "Data Entry", "Research", "Task Management"],
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Users,
    highlight: "teal",
    caseStudy: "30+ Hours Saved Weekly",
    slug: "virtual-assistance",
    category: "Support"
  },
  {
    title: "Mobile App Development",
    description: "Custom mobile applications for iOS and Android that engage users and extend your digital presence.",
    features: ["Native Apps", "Cross-Platform", "UI/UX Design", "API Integration", "App Store Optimization", "Maintenance"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Smartphone,
    highlight: "indigo",
    caseStudy: "500K+ Downloads in Year One",
    slug: "mobile-app-development",
    category: "Development"
  },
  {
    title: "Email Marketing",
    description: "Strategic email campaigns that nurture leads, build relationships, and drive consistent conversions.",
    features: ["Campaign Strategy", "Email Automation", "List Management", "A/B Testing", "Analytics", "Template Design"],
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Mail,
    highlight: "amber",
    caseStudy: "32% Open Rate Improvement",
    slug: "email-marketing",
    category: "Marketing"
  },
  {
    title: "Content Creation",
    description: "Compelling content that tells your brand story, engages your audience, and drives action.",
    features: ["Blog Posts", "White Papers", "Case Studies", "Social Media Content", "Copywriting", "Content Strategy"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: PenTool,
    highlight: "emerald",
    caseStudy: "87% Increase in Blog Traffic",
    slug: "content-creation",
    category: "Creative"
  },
  {
    title: "Social Media Management",
    description: "Strategic social media presence management to build your brand and engage your community.",
    features: ["Channel Strategy", "Content Calendar", "Community Management", "Analytics", "Paid Campaigns", "Influencer Coordination"],
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: MessageSquare,
    highlight: "sky",
    caseStudy: "300% Engagement Growth",
    slug: "social-media-management",
    category: "Marketing"
  },
  {
    title: "Hosting & Maintenance",
    description: "Reliable hosting solutions and ongoing maintenance to keep your digital properties secure and optimized.",
    features: ["Cloud Hosting", "Security", "Backups", "Performance Optimization", "Updates", "Technical Support"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Server,
    highlight: "violet",
    caseStudy: "99.9% Uptime Achievement",
    slug: "hosting-maintenance",
    category: "Support"
  },
  {
    title: "Performance Optimization",
    description: "Speed up your website and improve user experience through comprehensive performance optimization.",
    features: ["Page Speed", "Core Web Vitals", "Image Optimization", "Code Minification", "Caching", "CDN Implementation"],
    image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Zap,
    highlight: "orange",
    caseStudy: "65% Faster Load Times",
    slug: "performance-optimization",
    category: "Development"
  },
  {
    title: "Zoom Meeting Support",
    description: "Professional virtual meeting management for webinars, conferences, and team collaborations.",
    features: ["Webinar Hosting", "Meeting Scheduling", "Technical Support", "Recording & Transcription", "Breakout Room Management", "Attendee Management"],
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Monitor,
    highlight: "cyan",
    caseStudy: "500+ Successful Webinars",
    slug: "zoom-meeting-support",
    category: "Support"
  },
  {
    title: "Podcast Editing",
    description: "Professional podcast production from raw audio to polished episodes ready for distribution.",
    features: ["Audio Cleanup", "Noise Reduction", "Intro/Outro Creation", "Sound Mixing", "Show Notes", "Distribution Support"],
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Mic,
    highlight: "rose",
    caseStudy: "200+ Episodes Produced",
    slug: "podcast-editing",
    category: "Creative"
  },
  {
    title: "Discord Community Management",
    description: "Build and manage thriving Discord communities with expert moderation and engagement strategies.",
    features: ["Server Setup", "Bot Configuration", "Moderation", "Community Engagement", "Event Hosting", "Growth Strategy"],
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Users2,
    highlight: "indigo",
    caseStudy: "50K+ Community Members Managed",
    slug: "discord-community-management",
    category: "Community"
  },
  {
    title: "Zoho CRM Solutions",
    description: "Complete Zoho CRM implementation and customization to streamline your sales and customer management.",
    features: ["CRM Setup", "Custom Modules", "Workflow Automation", "Analytics Dashboard", "Third-party Integration", "Training & Support"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Database,
    highlight: "yellow",
    caseStudy: "35% Sales Efficiency Increase",
    slug: "zoho-crm-solutions",
    category: "Automation & CRM"
  },
  {
    title: "Digital Marketing Specialist",
    description: "Comprehensive digital marketing strategies tailored for business growth and online visibility.",
    features: ["Marketing Strategy", "Campaign Management", "Analytics & Reporting", "Conversion Optimization", "Brand Development", "Market Research"],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: LineChart,
    highlight: "emerald",
    caseStudy: "250% ROI for Clients",
    slug: "digital-marketing-specialist",
    category: "Marketing"
  }
];

// Customer paths for ServicesPathSection
export const customerPaths = [
  {
    id: "startup",
    title: "Startup Launch",
    description: "Perfect for new businesses looking to establish their digital presence",
    steps: ["Brand Identity", "Website Development", "SEO Foundation", "Social Media Setup"],
    icon: "🚀",
    recommendedServices: ["Web Development", "SEO Services", "Social Media Management"],
    cta: "Start Your Journey"
  },
  {
    id: "growth",
    title: "Business Growth",
    description: "Scale your existing business with comprehensive digital solutions",
    steps: ["Performance Audit", "Marketing Strategy", "CRM Implementation", "Content Marketing"],
    icon: "📈",
    recommendedServices: ["HubSpot CRM", "Digital Marketing", "Content Creation"],
    cta: "Accelerate Growth"
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    description: "Custom solutions for large organizations with complex needs",
    steps: ["Digital Transformation", "System Integration", "Advanced Analytics", "Ongoing Support"],
    icon: "🏢",
    recommendedServices: ["Custom Development", "AI Integration", "Hosting & Maintenance"],
    cta: "Transform Your Business"
  }
];

// Technologies for ServicesTechStackSection (if needed)
export const technologies = services.map(s => ({ name: s.title, icon: s.icon }));
