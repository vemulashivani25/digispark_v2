/**
 * Portfolio Page Component
 * Showcases agency's project portfolio with filtering and detail modals
 * SEO optimized with proper meta tags
 */
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollToTop from "@/components/ScrollToTop";
import { 
  ArrowRight, Code, Globe, Database, BarChart3, 
  MessageCircle, Rocket, Star
} from "lucide-react";
import ProjectDetailsModal, { ProjectDetails } from "@/components/portfolio/ProjectDetailsModal";
import WhatsAppChat from "@/components/WhatsAppChat";

interface Project {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  logo?: string;
  client: string;
  industry: string;
  tags: string[];
  icon: React.ElementType;
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
}

const projects: Project[] = [
  {
    id: "crm-implementation",
    title: "Enterprise HubSpot CRM Solution",
    description: "Complete implementation and custom development of HubSpot CRM platform for a multinational financial services corporation.",
    challenge: "The client was struggling with fragmented customer data across 12 different systems, leading to poor customer insights and inefficient sales processes.",
    solution: "We implemented a full-scale HubSpot CRM solution with custom integrations to their existing ERP, created automated workflows for lead nurturing, and developed custom reporting dashboards.",
    results: [
      "Sales cycle reduced by 35%",
      "Customer retention improved by 28%",
      "Marketing ROI increased by 156%",
      "Customer service response time decreased by 62%"
    ],
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1200",
    logo: "https://via.placeholder.com/100?text=FinCorp",
    client: "Global Financial Services Inc.",
    industry: "Financial Services",
    tags: ["HubSpot CRM", "Automation", "Integration"],
    icon: Database,
    technologies: ["HubSpot", "JavaScript", "REST API", "Zapier", "Data Migration"],
    testimonial: {
      quote: "The CRM implementation has transformed how we understand and serve our customers. The custom reporting gives us insights we never had before.",
      author: "Sarah Johnson",
      position: "CTO, Global Financial Services"
    },
    stats: [
      { value: "12+", label: "Systems Integrated" },
      { value: "35%", label: "Reduced Sales Cycle" },
      { value: "28%", label: "Customer Retention" },
      { value: "3.8M", label: "Records Migrated" }
    ]
  },
  {
    id: "ecommerce-platform",
    title: "High-Performance E-commerce Platform",
    description: "Custom-built e-commerce solution for a rapidly growing fashion retailer with international presence.",
    challenge: "The client's existing platform couldn't handle their growth, with slow page loads, frequent crashes during peak traffic, and limited international payment options.",
    solution: "We developed a scalable, custom e-commerce platform with CDN integration, elastic server architecture, and support for 15+ payment gateways and multiple currencies.",
    results: [
      "Page load times reduced by 68%",
      "Conversion rate increased by 24%",
      "Cart abandonment reduced by 31%",
      "International sales grew by 87%"
    ],
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200",
    logo: "https://via.placeholder.com/100?text=FashionX",
    client: "LuxeStyle Couture",
    industry: "Fashion Retail",
    tags: ["E-commerce", "Web Development", "Performance"],
    icon: Globe,
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"],
    testimonial: {
      quote: "The new platform has been transformative. We handled our biggest sale day ever with zero issues, and our conversion rates have skyrocketed.",
      author: "Michael Chen",
      position: "CEO, LuxeStyle Couture"
    },
    stats: [
      { value: "68%", label: "Faster Loading" },
      { value: "24%", label: "Higher Conversion" },
      { value: "87%", label: "International Growth" },
      { value: "99.99%", label: "Uptime" }
    ]
  },
  {
    id: "seo-campaign",
    title: "Comprehensive SEO Overhaul",
    description: "Data-driven SEO strategy and implementation for a nationwide healthcare provider network.",
    challenge: "The client was struggling with poor organic visibility despite having quality content, resulting in high paid acquisition costs and limited reach.",
    solution: "We executed a comprehensive SEO strategy including technical fixes, content optimization, structured data implementation, and a strategic backlinking campaign.",
    results: [
      "Organic traffic increased by 215%",
      "First page rankings for 78% of target keywords",
      "Decrease in customer acquisition cost by 42%",
      "Local search visibility improved by 156%"
    ],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f01a?q=80&w=1200",
    logo: "https://via.placeholder.com/100?text=HealthNet",
    client: "MedConnect Healthcare",
    industry: "Healthcare",
    tags: ["SEO", "Content Strategy", "Analytics"],
    icon: BarChart3,
    technologies: ["Schema Markup", "Python Analysis", "Google Search Console", "Ahrefs", "SEMrush"],
    testimonial: {
      quote: "The SEO results exceeded our expectations. We're now the dominant organic search result in our industry, and our cost per acquisition has dramatically decreased.",
      author: "Dr. Amanda Rivera",
      position: "Marketing Director, MedConnect"
    },
    stats: [
      { value: "215%", label: "Traffic Increase" },
      { value: "78%", label: "Keywords on Page 1" },
      { value: "42%", label: "Lower CPA" },
      { value: "156%", label: "Local Search Growth" }
    ]
  },
  {
    id: "virtual-assistance",
    title: "Enterprise Virtual Assistant Team",
    description: "Comprehensive virtual assistant solution for a multinational consulting firm handling client support, data management, and administrative tasks.",
    challenge: "The client needed to reduce operational costs while maintaining 24/7 client support and efficient back-office operations across multiple time zones.",
    solution: "We implemented a dedicated team of 25 specialized virtual assistants with custom workflows, training, and quality control measures to handle all client-facing and internal processes.",
    results: [
      "Operational costs reduced by 63%",
      "Client satisfaction scores improved by 28%",
      "Service response times decreased by 76%",
      "Internal process efficiency increased by 42%"
    ],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
    logo: "https://via.placeholder.com/100?text=ConsultCo",
    client: "Global Consulting Partners",
    industry: "Business Consulting",
    tags: ["Virtual Assistance", "Operations", "Business Process"],
    icon: MessageCircle,
    technologies: ["Asana", "Slack", "Zendesk", "HubSpot", "Notion", "Zoom"],
    testimonial: {
      quote: "The virtual assistance team has become an integral part of our operations. They're so effective that many clients don't realize they're not in-house staff.",
      author: "Robert Martinez",
      position: "COO, Global Consulting Partners"
    },
    stats: [
      { value: "63%", label: "Cost Reduction" },
      { value: "25+", label: "Team Members" },
      { value: "24/7", label: "Support Coverage" },
      { value: "98%", label: "Task Completion Rate" }
    ]
  },
  {
    id: "digital-marketing",
    title: "Integrated Digital Marketing Campaign",
    description: "Comprehensive digital marketing strategy spanning multiple channels for a SaaS startup's product launch.",
    challenge: "The client needed to establish market presence and generate qualified leads for their new SaaS product with a limited initial budget.",
    solution: "We developed and executed a multi-channel campaign including content marketing, paid social, email nurture sequences, webinars, and targeted advertising with continuous optimization.",
    results: [
      "Generated 12,500+ qualified leads in first quarter",
      "Achieved 487% ROI on marketing spend",
      "Established thought leadership with 30+ guest publications",
      "Built email list of 75,000+ engaged subscribers"
    ],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200",
    logo: "https://via.placeholder.com/100?text=TechSaaS",
    client: "CloudDrive Solutions",
    industry: "Software",
    tags: ["Digital Marketing", "Lead Generation", "Content"],
    icon: Rocket,
    technologies: ["Google Ads", "Meta Ads", "HubSpot", "SEMrush", "Mailchimp", "Google Analytics"],
    testimonial: {
      quote: "The campaign exceeded all our expectations. Not only did we hit our lead targets, but the quality of leads was exceptional, leading to a much higher conversion rate than projected.",
      author: "Jessica Lee",
      position: "VP Marketing, CloudDrive"
    },
    stats: [
      { value: "12.5k+", label: "Qualified Leads" },
      { value: "487%", label: "Marketing ROI" },
      { value: "75k+", label: "Email Subscribers" },
      { value: "42%", label: "Lead-to-Demo Rate" }
    ]
  },
  {
    id: "video-production",
    title: "Corporate Brand Video Campaign",
    description: "Comprehensive video marketing campaign for a technology company's rebranding initiative.",
    challenge: "The client needed to establish a new brand identity after a merger, communicating their evolved value proposition to existing and potential customers.",
    solution: "We created a series of high-quality brand videos including a main brand film, customer testimonials, product demonstrations, and targeted social media content.",
    results: [
      "Brand recognition increased by 45%",
      "Website engagement time improved by 87%",
      "Social media engagement up 132%",
      "Recruitment application rate increased 68%"
    ],
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200",
    logo: "https://via.placeholder.com/100?text=TechMerge",
    client: "Nexus Technologies",
    industry: "Technology",
    tags: ["Video Production", "Branding", "Social Media"],
    icon: Star,
    technologies: ["4K Production", "Motion Graphics", "Color Grading", "Sound Design", "Drone Footage"],
    testimonial: {
      quote: "The video series perfectly captured our new brand identity and has been instrumental in communicating our vision to both customers and employees.",
      author: "David Wilson",
      position: "CMO, Nexus Technologies"
    },
    stats: [
      { value: "45%", label: "Brand Recognition" },
      { value: "87%", label: "Engagement Time" },
      { value: "1.2M+", label: "Online Views" },
      { value: "132%", label: "Social Engagement" }
    ]
  },
  {
    id: "web-development",
    title: "Corporate Website & Web Application",
    description: "Modern corporate website and internal web application for a multinational industrial manufacturer.",
    challenge: "The client needed to replace their outdated website and inefficient internal processes with modern digital solutions that reflected their innovative approach.",
    solution: "We developed a high-performance, responsive corporate website with integrated dealer locator and product catalog, plus a separate internal web application for inventory and order management.",
    results: [
      "Website conversion rate increased by 86%",
      "Internal process efficiency improved by 74%",
      "Order processing time reduced by 92%",
      "Customer satisfaction scores up by 38%"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    logo: "https://via.placeholder.com/100?text=IndustryCo",
    client: "Global Manufacturing Inc.",
    industry: "Manufacturing",
    tags: ["Web Development", "Web Application", "UX Design"],
    icon: Code,
    technologies: ["React", "Node.js", "GraphQL", "MongoDB", "AWS", "Docker"],
    testimonial: {
      quote: "Both the website and internal application have transformed our business operations. The systems have paid for themselves many times over in efficiency gains alone.",
      author: "Thomas Rodriguez",
      position: "IT Director, Global Manufacturing"
    },
    stats: [
      { value: "86%", label: "Higher Conversion" },
      { value: "92%", label: "Faster Processing" },
      { value: "74%", label: "Process Efficiency" },
      { value: "99.9%", label: "System Uptime" }
    ]
  }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const allTags = ["All", ...Array.from(new Set(projects.flatMap(project => project.tags)))];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const filteredProjects = selectedTag === "All" 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedTag));

  // Convert Project to ProjectDetails for the modal
  const convertToProjectDetails = (project: Project): ProjectDetails => ({
    id: project.id,
    title: project.title,
    description: project.description,
    category: project.industry,
    client: project.client,
    date: "2024",
    technologies: project.technologies,
    features: project.stats.map(s => `${s.value} ${s.label}`),
    challenge: project.challenge,
    solution: project.solution,
    results: project.results,
    imageUrl: project.image,
    galleryImages: [project.image],
    testimonial: project.testimonial
  });

  const viewProject = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeProjectDetail = () => {
    setIsDetailOpen(false);
    document.body.style.overflow = "auto";
  };
  
  return (
    <div className="min-h-screen bg-black page-transition">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Portfolio | DigiSpark - Our Work, Case Studies & Results</title>
        <meta 
          name="description" 
          content="Explore our portfolio of successful projects spanning CRM implementation, e-commerce, SEO campaigns, virtual assistance, web development, and digital marketing strategies." 
        />
        <meta 
          name="keywords" 
          content="portfolio, case studies, HubSpot CRM, e-commerce, SEO, virtual assistance, digital marketing, video production, web development, success stories, client projects" 
        />
        <meta property="og:title" content="Portfolio | DigiSpark - Our Work & Case Studies" />
        <meta property="og:description" content="See how we've helped businesses transform their digital presence with real project examples." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/portfolio" />
        <meta property="og:image" content="https://yourdomain.com/images/portfolio-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/portfolio" />
      </Helmet>
      
      <Navbar />

      <section className="pt-24 pb-12 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none"></div>
        <div className="absolute w-[70rem] h-[70rem] bg-yellow-400/5 rounded-full blur-[100px] -top-40 -right-20 animate-pulse-slow"></div>
        <div className="absolute w-[50rem] h-[50rem] bg-purple-500/5 rounded-full blur-[100px] -bottom-20 -left-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our <span className="text-yellow-400">Portfolio</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transforming businesses through innovative digital solutions
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full font-medium text-sm md:text-base transition-colors duration-300
                    ${selectedTag === tag
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {filteredProjects.map((project, idx) => {
              const ProjectIcon = project.icon;
              return (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={idx}
                  onClick={() => viewProject(project)}
                />
              );
            })}
          </motion.div>
        </div>
      </section>
      
      <ProjectDetailsModal
        project={selectedProject ? convertToProjectDetails(selectedProject) : null}
        isOpen={isDetailOpen}
        onClose={closeProjectDetail}
      />

      <NewsletterSection />
      <FooterSection />
      <ScrollToTop />
      <WhatsAppChat phoneNumber="+1234567890" />
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  const ProjectIcon = project.icon;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.1 * (index % 3) }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-yellow-400/10 rounded-xl overflow-hidden shadow-lg shadow-yellow-400/5 hover:shadow-yellow-400/20 transition-all duration-500 h-full cursor-pointer" onClick={onClick}>
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-yellow-400 rounded-full p-2">
            <ProjectIcon className="w-5 h-5 text-black" />
          </div>
          {project.logo && (
            <div className="absolute bottom-4 right-4">
              <img 
                src={project.logo} 
                alt={project.client} 
                className="h-8 w-auto rounded bg-white/80 p-1"
              />
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map(tag => (
                <Badge key={tag} className="bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-gray-400 line-clamp-2">{project.description}</p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {project.stats.slice(0, 2).map((stat, i) => (
                <div key={i} className="bg-black/40 p-3 rounded-lg border border-gray-800/50">
                  <p className="text-yellow-400 font-bold text-lg">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <Button 
              size="sm"
              className="w-full mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
            >
              View Case Study
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Portfolio;
