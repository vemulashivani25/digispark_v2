/**
 * Documentation - Searchable documentation browser
 * 
 * @route /docs
 * @description Interactive documentation page with search functionality
 * to quickly find components, pages, utilities, and more.
 */

import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Component, Wrench, Palette, Database, Book, ExternalLink, Code, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Documentation items data
interface DocItem {
  name: string;
  description: string;
  category: string;
  file?: string;
  route?: string;
  tags: string[];
  type: 'page' | 'component' | 'utility' | 'style' | 'database';
}

const documentationItems: DocItem[] = [
  // Pages
  { name: "Index", description: "Main landing page with hero, services, portfolio, and testimonials", category: "Pages", file: "src/pages/Index.tsx", route: "/", tags: ["home", "landing", "hero", "main"], type: "page" },
  { name: "About", description: "Company information, team members, mission and values", category: "Pages", file: "src/pages/About.tsx", route: "/about", tags: ["about", "team", "company", "mission"], type: "page" },
  { name: "Services", description: "Comprehensive services listing with pricing and details", category: "Pages", file: "src/pages/Services.tsx", route: "/services", tags: ["services", "offerings", "pricing"], type: "page" },
  { name: "Portfolio", description: "Project showcase with filtering and case study modals", category: "Pages", file: "src/pages/Portfolio.tsx", route: "/portfolio", tags: ["portfolio", "projects", "work", "case study"], type: "page" },
  { name: "Blog", description: "Blog listing with category filtering and search", category: "Pages", file: "src/pages/Blog.tsx", route: "/blog", tags: ["blog", "articles", "posts", "news"], type: "page" },
  { name: "BlogPost", description: "Individual blog post with TOC and related posts", category: "Pages", file: "src/pages/BlogPost.tsx", route: "/blog/:slug", tags: ["blog", "article", "post", "content"], type: "page" },
  { name: "Contact", description: "Contact form with validation and email notification", category: "Pages", file: "src/pages/Contact.tsx", route: "/contact", tags: ["contact", "form", "email", "support"], type: "page" },
  { name: "FAQ", description: "Frequently asked questions with accordion interface", category: "Pages", file: "src/pages/Faq.tsx", route: "/faq", tags: ["faq", "questions", "help", "support"], type: "page" },
  { name: "Success Stories", description: "Client case studies with industry and service filtering", category: "Pages", file: "src/pages/SuccessStories.tsx", route: "/success-stories", tags: ["success", "case study", "clients", "results"], type: "page" },
  { name: "Resources", description: "Downloadable resources library", category: "Pages", file: "src/pages/Resources.tsx", route: "/resources", tags: ["resources", "downloads", "ebooks", "templates"], type: "page" },
  { name: "Tools", description: "Free digital tools for SEO and development", category: "Pages", file: "src/pages/Tools.tsx", route: "/tools", tags: ["tools", "seo", "generator", "utilities"], type: "page" },
  { name: "Project Quote", description: "Interactive quote calculator", category: "Pages", file: "src/pages/ProjectQuote.tsx", route: "/project-quote", tags: ["quote", "calculator", "pricing", "estimate"], type: "page" },
  { name: "Auth", description: "Login, registration, and password reset", category: "Pages", file: "src/pages/Auth.tsx", route: "/auth", tags: ["auth", "login", "register", "password"], type: "page" },
  { name: "Admin", description: "Admin dashboard for content management", category: "Pages", file: "src/pages/Admin.tsx", route: "/admin", tags: ["admin", "dashboard", "management", "crud"], type: "page" },
  { name: "Testimonials", description: "Full testimonials page with filtering", category: "Pages", file: "src/pages/TestimonialsPage.tsx", route: "/testimonials", tags: ["testimonials", "reviews", "clients", "feedback"], type: "page" },
  
  // Layout Components
  { name: "Navbar", description: "Primary navigation with responsive mobile menu and dropdowns", category: "Layout", file: "src/components/Navbar.tsx", tags: ["navbar", "navigation", "header", "menu"], type: "component" },
  { name: "FooterSection", description: "Site footer with links, social, and newsletter", category: "Layout", file: "src/components/FooterSection.tsx", tags: ["footer", "links", "social", "copyright"], type: "component" },
  { name: "PageHeader", description: "Reusable page hero header with breadcrumb", category: "Layout", file: "src/components/PageHeader.tsx", tags: ["header", "hero", "breadcrumb", "title"], type: "component" },
  { name: "PageTransition", description: "Wrapper for page enter/exit animations", category: "Layout", file: "src/components/PageTransition.tsx", tags: ["transition", "animation", "page", "motion"], type: "component" },
  { name: "ScrollToTop", description: "Floating button to scroll to top", category: "Layout", file: "src/components/ScrollToTop.tsx", tags: ["scroll", "button", "navigation", "floating"], type: "component" },
  
  // Section Components
  { name: "HeroSection", description: "Main hero with animated 3D background", category: "Sections", file: "src/components/HeroSection.tsx", tags: ["hero", "banner", "3d", "animation"], type: "component" },
  { name: "CoreServicesSection", description: "Grid display of main service categories", category: "Sections", file: "src/components/CoreServicesSection.tsx", tags: ["services", "grid", "categories"], type: "component" },
  { name: "ServicesSection", description: "Detailed services with icons", category: "Sections", file: "src/components/ServicesSection.tsx", tags: ["services", "icons", "cards"], type: "component" },
  { name: "PortfolioSection", description: "Featured projects showcase", category: "Sections", file: "src/components/PortfolioSection.tsx", tags: ["portfolio", "projects", "showcase"], type: "component" },
  { name: "TestimonialsSection", description: "Client testimonials carousel", category: "Sections", file: "src/components/TestimonialsSection.tsx", tags: ["testimonials", "carousel", "reviews"], type: "component" },
  { name: "ContactSection", description: "Contact form section", category: "Sections", file: "src/components/ContactSection.tsx", tags: ["contact", "form", "section"], type: "component" },
  { name: "GlobalPresenceSection", description: "World map showing office locations", category: "Sections", file: "src/components/GlobalPresenceSection.tsx", tags: ["map", "global", "locations", "offices"], type: "component" },
  { name: "ProcessTimelineSection", description: "Step-by-step process visualization", category: "Sections", file: "src/components/ProcessTimelineSection.tsx", tags: ["process", "timeline", "steps", "workflow"], type: "component" },
  { name: "BrandShowcaseSection", description: "Client logo marquee", category: "Sections", file: "src/components/BrandShowcaseSection.tsx", tags: ["brands", "logos", "clients", "marquee"], type: "component" },
  { name: "TechStackMarquee", description: "Technology icons scrolling marquee", category: "Sections", file: "src/components/TechStackMarquee.tsx", tags: ["tech", "stack", "marquee", "icons"], type: "component" },
  { name: "MeetTheTeamSection", description: "Team member cards", category: "Sections", file: "src/components/MeetTheTeamSection.tsx", tags: ["team", "members", "staff", "profiles"], type: "component" },
  { name: "NewsletterSection", description: "Email subscription section", category: "Sections", file: "src/components/newsletter/NewsletterSection.tsx", tags: ["newsletter", "email", "subscribe", "subscription"], type: "component" },
  
  // Interactive Components
  { name: "WhatsAppChat", description: "Floating WhatsApp chat button", category: "Interactive", file: "src/components/WhatsAppChat.tsx", tags: ["whatsapp", "chat", "floating", "button"], type: "component" },
  { name: "ProjectInquiryPopup", description: "Modal popup for project inquiries", category: "Interactive", file: "src/components/ProjectInquiryPopup.tsx", tags: ["popup", "modal", "inquiry", "form"], type: "component" },
  { name: "MusicPlayer", description: "Background music player", category: "Interactive", file: "src/components/MusicPlayer.tsx", tags: ["music", "player", "audio", "background"], type: "component" },
  { name: "PreloaderNew", description: "Initial loading animation", category: "Interactive", file: "src/components/PreloaderNew.tsx", tags: ["preloader", "loading", "animation", "splash"], type: "component" },
  { name: "AnimatedCounter", description: "Animated number counter for stats", category: "Interactive", file: "src/components/AnimatedCounter.tsx", tags: ["counter", "number", "animation", "statistics"], type: "component" },
  { name: "ContactForm", description: "Reusable contact form with validation", category: "Interactive", file: "src/components/ContactForm.tsx", tags: ["contact", "form", "validation", "submit"], type: "component" },
  
  // Blog Components
  { name: "BlogCard", description: "Blog post preview card", category: "Blog", file: "src/components/blog/BlogCard.tsx", tags: ["blog", "card", "preview", "post"], type: "component" },
  { name: "BlogSection", description: "Blog posts grid section", category: "Blog", file: "src/components/blog/BlogSection.tsx", tags: ["blog", "grid", "posts", "listing"], type: "component" },
  { name: "BlogBreadcrumb", description: "Breadcrumb navigation for posts", category: "Blog", file: "src/components/blog/BlogBreadcrumb.tsx", tags: ["breadcrumb", "navigation", "blog"], type: "component" },
  { name: "BlogTableOfContents", description: "Sidebar TOC with scroll tracking", category: "Blog", file: "src/components/blog/BlogTableOfContents.tsx", tags: ["toc", "contents", "sidebar", "navigation"], type: "component" },
  { name: "SocialShareButtons", description: "Social media share buttons", category: "Blog", file: "src/components/blog/SocialShareButtons.tsx", tags: ["social", "share", "buttons", "twitter", "facebook"], type: "component" },
  { name: "RelatedPosts", description: "Related posts section", category: "Blog", file: "src/components/blog/RelatedPosts.tsx", tags: ["related", "posts", "suggestions", "similar"], type: "component" },
  
  // Portfolio Components
  { name: "ProjectDetailsModal", description: "Case study modal with gallery", category: "Portfolio", file: "src/components/portfolio/ProjectDetailsModal.tsx", tags: ["modal", "project", "details", "gallery", "case study"], type: "component" },
  { name: "CaseStudyModal", description: "Detailed case study modal", category: "Portfolio", file: "src/components/portfolio/CaseStudyModal.tsx", tags: ["case study", "modal", "details"], type: "component" },
  
  // Services Components
  { name: "ServicesHeroSection", description: "Services page header", category: "Services", file: "src/components/services/ServicesHeroSection.tsx", tags: ["services", "hero", "header"], type: "component" },
  { name: "ServicesTabbedSection", description: "Tabbed service categories", category: "Services", file: "src/components/services/ServicesTabbedSection.tsx", tags: ["services", "tabs", "categories"], type: "component" },
  { name: "ServicePopup", description: "Service detail modal", category: "Services", file: "src/components/services/ServicePopup.tsx", tags: ["service", "popup", "modal", "details"], type: "component" },
  
  // Tool Components
  { name: "MetaTagGenerator", description: "Generate SEO meta tags", category: "Tools", file: "src/components/tools/MetaTagGenerator.tsx", tags: ["meta", "seo", "generator", "tags"], type: "component" },
  { name: "SchemaMarkupGenerator", description: "Create JSON-LD schema", category: "Tools", file: "src/components/tools/SchemaMarkupGenerator.tsx", tags: ["schema", "jsonld", "structured", "data"], type: "component" },
  { name: "QRCodeGenerator", description: "Generate QR codes", category: "Tools", file: "src/components/tools/QRCodeGenerator.tsx", tags: ["qr", "code", "generator", "barcode"], type: "component" },
  { name: "SitemapGenerator", description: "Create XML sitemaps", category: "Tools", file: "src/components/tools/SitemapGenerator.tsx", tags: ["sitemap", "xml", "seo", "generator"], type: "component" },
  { name: "GradientGenerator", description: "CSS gradient generator", category: "Tools", file: "src/components/tools/GradientGenerator.tsx", tags: ["gradient", "css", "colors", "generator"], type: "component" },
  
  // Utilities
  { name: "useAuth (AuthContext)", description: "Authentication context with user state and admin check", category: "Utilities", file: "src/contexts/AuthContext.tsx", tags: ["auth", "context", "user", "login", "admin"], type: "utility" },
  { name: "useMobile", description: "Hook to detect mobile viewport", category: "Utilities", file: "src/hooks/use-mobile.tsx", tags: ["mobile", "responsive", "hook", "viewport"], type: "utility" },
  { name: "useToast", description: "Toast notification hook", category: "Utilities", file: "src/hooks/use-toast.ts", tags: ["toast", "notification", "hook", "alert"], type: "utility" },
  { name: "useTypingPlaceholder", description: "Animated typing placeholder for inputs", category: "Utilities", file: "src/hooks/useTypingPlaceholder.ts", tags: ["typing", "animation", "placeholder", "hook"], type: "utility" },
  { name: "animationUtils", description: "Framer Motion animation presets", category: "Utilities", file: "src/utils/animationUtils.ts", tags: ["animation", "framer", "motion", "variants"], type: "utility" },
  { name: "confetti", description: "Confetti animation utilities", category: "Utilities", file: "src/utils/confetti.ts", tags: ["confetti", "celebration", "animation", "effects"], type: "utility" },
  { name: "hapticFeedback", description: "Vibration and sound feedback", category: "Utilities", file: "src/utils/hapticFeedback.ts", tags: ["haptic", "vibration", "feedback", "sound"], type: "utility" },
  { name: "validation", description: "Zod validation schemas", category: "Utilities", file: "src/lib/validation.ts", tags: ["validation", "zod", "schema", "form"], type: "utility" },
  { name: "utils (cn)", description: "Tailwind class merge utility", category: "Utilities", file: "src/lib/utils.ts", tags: ["utils", "classname", "tailwind", "merge"], type: "utility" },
  
  // Styling
  { name: "Design System", description: "CSS custom properties and design tokens", category: "Styling", file: "src/index.css", tags: ["design", "tokens", "css", "variables", "theme"], type: "style" },
  { name: "Tailwind Config", description: "Tailwind CSS configuration and theme extension", category: "Styling", file: "tailwind.config.ts", tags: ["tailwind", "config", "theme", "colors"], type: "style" },
  
  // Database
  { name: "blog_posts", description: "Blog articles with content and metadata", category: "Database", tags: ["blog", "posts", "articles", "content"], type: "database" },
  { name: "contact_submissions", description: "Contact form entries", category: "Database", tags: ["contact", "submissions", "form", "entries"], type: "database" },
  { name: "newsletter_subscriptions", description: "Email subscribers", category: "Database", tags: ["newsletter", "email", "subscribers"], type: "database" },
  { name: "project_quotes", description: "Quote request submissions", category: "Database", tags: ["quotes", "projects", "requests", "budget"], type: "database" },
  { name: "resources", description: "Downloadable resources", category: "Database", tags: ["resources", "downloads", "files"], type: "database" },
  { name: "profiles", description: "User profile data", category: "Database", tags: ["profiles", "users", "accounts"], type: "database" },
  { name: "user_roles", description: "Role assignments for access control", category: "Database", tags: ["roles", "permissions", "admin", "access"], type: "database" },
];

const typeIcons = {
  page: FileText,
  component: Component,
  utility: Wrench,
  style: Palette,
  database: Database,
};

const typeColors = {
  page: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  component: "bg-green-500/20 text-green-400 border-green-500/30",
  utility: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  style: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  database: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState<DocItem | null>(null);

  // Filter documentation items based on search and tab
  const filteredItems = useMemo(() => {
    return documentationItems.filter((item) => {
      const matchesSearch = searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTab = activeTab === "all" || item.type === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, DocItem[]> = {};
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const categories = Object.keys(groupedItems).sort();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Documentation | DigiSpark</title>
        <meta name="description" content="Searchable documentation for DigiSpark components, pages, utilities, and database schema." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Book className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Documentation</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search and explore all pages, components, utilities, and database tables in the DigiSpark codebase.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search pages, components, hooks, utilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 py-6 text-lg bg-card border-border focus:border-primary"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {filteredItems.length} items found
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  All ({documentationItems.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="page"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Pages ({documentationItems.filter(i => i.type === 'page').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="component"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  <Component className="w-4 h-4 mr-1" />
                  Components ({documentationItems.filter(i => i.type === 'component').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="utility"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  <Wrench className="w-4 h-4 mr-1" />
                  Utilities ({documentationItems.filter(i => i.type === 'utility').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="style"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  <Palette className="w-4 h-4 mr-1" />
                  Styling ({documentationItems.filter(i => i.type === 'style').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="database"
                  className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                >
                  <Database className="w-4 h-4 mr-1" />
                  Database ({documentationItems.filter(i => i.type === 'database').length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Results Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <ScrollArea className="h-[calc(100vh-400px)] pr-4">
                <AnimatePresence mode="popLayout">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-8"
                      >
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {category}
                        </h2>
                        <div className="grid gap-3">
                          {groupedItems[category].map((item) => {
                            const Icon = typeIcons[item.type];
                            return (
                              <motion.div
                                key={item.name}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                              >
                                <Card 
                                  className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg ${selectedItem?.name === item.name ? 'border-primary ring-1 ring-primary' : ''}`}
                                  onClick={() => setSelectedItem(item)}
                                >
                                  <CardHeader className="py-3 px-4">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${typeColors[item.type]}`}>
                                          <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <CardTitle className="text-base font-medium">{item.name}</CardTitle>
                                          <CardDescription className="text-sm line-clamp-1">
                                            {item.description}
                                          </CardDescription>
                                        </div>
                                      </div>
                                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                    </div>
                                  </CardHeader>
                                </Card>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <AnimatePresence mode="wait">
                  {selectedItem ? (
                    <motion.div
                      key={selectedItem.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card className="border-primary/20">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={typeColors[selectedItem.type]}>
                              {selectedItem.type}
                            </Badge>
                            <Badge variant="outline">{selectedItem.category}</Badge>
                          </div>
                          <CardTitle className="text-2xl">{selectedItem.name}</CardTitle>
                          <CardDescription className="text-base">
                            {selectedItem.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {selectedItem.file && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">File Path</h4>
                              <code className="text-sm bg-muted px-2 py-1 rounded block overflow-x-auto">
                                {selectedItem.file}
                              </code>
                            </div>
                          )}
                          
                          {selectedItem.route && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Route</h4>
                              <a 
                                href={selectedItem.route} 
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                <Code className="w-4 h-4" />
                                {selectedItem.route}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedItem.tags.map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                  onClick={() => setSearchQuery(tag)}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card className="border-dashed">
                        <CardContent className="py-12 text-center">
                          <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            Select an item to view details
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Documentation;
