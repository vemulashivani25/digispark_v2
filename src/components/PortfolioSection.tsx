import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaseStudyModal from "./portfolio/CaseStudyModal";

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "crm", name: "CRM Implementation" },
  { id: "seo", name: "SEO" },
  { id: "design", name: "Design" }
];

const projects = [
  {
    id: 1,
    title: "Enterprise HubSpot CRM Implementation",
    category: "crm",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    description: "End-to-end deployment of HubSpot CRM with custom workflows, integrations, and deep analytics for a Fortune 500 company.",
    tech: ["HubSpot", "API Integration", "Automation", "Data Migration"],
    challenges: "Data migration and training for 200+ staff, zero downtime mandate.",
    featured: true
  },
  {
    id: 2,
    title: "Full-Service SEO Campaign",
    category: "seo",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f01a?auto=format&fit=crop&w=1000&q=80",
    description: "Aggressive technical and content SEO resulting in a 310% increase in traffic within 6 months.",
    tech: ["Technical SEO", "Content", "Backlinks", "Analytics"],
    challenges: "Overcoming a major Google penalty and rebuilding authority fast.",
    featured: true
  },
  {
    id: 3,
    title: "E-Commerce Platform Redesign",
    category: "web",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=1000&q=80",
    description: "Complete UX overhaul and technical rebuild of an e-commerce platform, increasing conversion rates by 28%.",
    tech: ["React", "Node.js", "Stripe", "AWS"],
    challenges: "Migration of 50,000+ products and maintaining SEO rankings.",
    featured: true
  },
  {
    id: 4,
    title: "Fintech App UI/UX Design",
    category: "design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    description: "Comprehensive mobile app design for a leading fintech startup, focusing on accessibility and user security.",
    tech: ["Figma", "Prototyping", "User Testing", "Design System"],
    challenges: "Creating an intuitive interface for complex financial products.",
    featured: false
  },
  {
    id: 5,
    title: "SaaS Analytics Dashboard",
    category: "web",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1000&q=80",
    description: "Real-time data visualization dashboard for SaaS metrics, enabling better business decision making.",
    tech: ["Vue.js", "D3.js", "Firebase", "WebSockets"],
    challenges: "Handling large data sets without compromising performance.",
    featured: true
  },
  {
    id: 6,
    title: "Marketing Automation Setup",
    category: "crm",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
    description: "Implementation of marketing automation workflows that increased qualified leads by 45%.",
    tech: ["Marketo", "Integrations", "Lead Scoring", "Analytics"],
    challenges: "Integration with legacy systems and training marketing team.",
    featured: false
  },
  {
    id: 7,
    title: "B2B Website Redesign",
    category: "web",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1000&q=80",
    description: "Complete redesign and development of a B2B website focused on lead generation.",
    tech: ["Next.js", "Tailwind CSS", "Contentful", "Vercel"],
    challenges: "Balancing design aesthetics with strict corporate guidelines.",
    featured: true
  },
  {
    id: 8,
    title: "Brand Identity Refresh",
    category: "design",
    image: "https://images.unsplash.com/photo-1600775508103-9fda5da10b7b?auto=format&fit=crop&w=1000&q=80",
    description: "Comprehensive brand refresh including logo, style guide, and marketing materials.",
    tech: ["Illustrator", "Photoshop", "Brand Strategy", "Guidelines"],
    challenges: "Evolving the brand while respecting its 20-year heritage.",
    featured: false
  }
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleCaseStudyClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="text-yellow-400">Work</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries and technologies
          </p>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mt-10">
            <TabsList className="flex flex-wrap justify-center bg-transparent h-auto gap-2 p-1">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2 rounded-full bg-gray-800 data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
          {filteredProjects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              className={`${idx % 3 === 1 ? "md:mt-12" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="bg-gray-900 border-gray-800 overflow-hidden group text-white h-full flex flex-col">
                <div 
                  className="relative overflow-hidden aspect-[16/11]"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <Button 
                      variant="secondary" 
                      className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2"
                    >
                      View Project <ExternalLink size={16} />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-xs font-semibold bg-yellow-400/80 text-black px-2 py-1 rounded-full">
                      {categories.find(c => c.id === project.category)?.name}
                    </span>
                  </div>
                </div>
                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-yellow-400 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-yellow-400 group/btn transition-colors"
                    onClick={() => handleCaseStudyClick(project)}
                  >
                    <span>Case Study</span> 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
            View All Projects
          </Button>
        </div>
      </div>
      
      {/* Case Study Modal */}
      <CaseStudyModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default PortfolioSection;
