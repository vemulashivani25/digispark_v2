/**
 * Resource Library Component
 * Displays downloadable eBooks, templates, checklists
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  FileSpreadsheet,
  Filter,
  Search,
  X,
  Star,
  Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  file_url: string;
  thumbnail_url: string | null;
  download_count: number;
  is_featured: boolean;
}

const ITEMS_PER_PAGE = 10;

const ResourceLibrary = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Sample resources (fallback when database is empty)
  const sampleResources: Resource[] = [
    {
      id: "1",
      title: "Complete SEO Checklist 2024",
      description: "A comprehensive 50-point checklist to optimize your website for search engines. Covers technical SEO, on-page optimization, and link building strategies.",
      category: "SEO",
      type: "checklist",
      file_url: "#",
      thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      download_count: 1250,
      is_featured: true,
    },
    {
      id: "2",
      title: "Digital Marketing Strategy Template",
      description: "Plan your marketing campaigns with this comprehensive template. Includes goal setting, audience analysis, and ROI tracking sections.",
      category: "Marketing",
      type: "template",
      file_url: "#",
      thumbnail_url: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400",
      download_count: 890,
      is_featured: true,
    },
    {
      id: "3",
      title: "Ultimate Guide to Content Marketing",
      description: "A 50-page eBook covering everything from content strategy to distribution. Learn how to create content that converts.",
      category: "Content",
      type: "ebook",
      file_url: "#",
      thumbnail_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      download_count: 2100,
      is_featured: true,
    },
    {
      id: "4",
      title: "Social Media Calendar Template",
      description: "Stay organized with this monthly social media planning template. Includes content ideas and posting schedules for all major platforms.",
      category: "Social Media",
      type: "template",
      file_url: "#",
      thumbnail_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
      download_count: 1560,
      is_featured: false,
    },
    {
      id: "5",
      title: "Website Launch Checklist",
      description: "Don't miss anything before launching your website. This checklist covers SEO, performance, security, and user experience.",
      category: "Development",
      type: "checklist",
      file_url: "#",
      thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      download_count: 780,
      is_featured: false,
    },
    {
      id: "6",
      title: "Email Marketing Playbook",
      description: "Learn the secrets of high-converting email campaigns. Includes templates, subject line formulas, and automation workflows.",
      category: "Email",
      type: "guide",
      file_url: "#",
      thumbnail_url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400",
      download_count: 1340,
      is_featured: false,
    },
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("download_count", { ascending: false });

      if (error) throw error;
      
      // Use sample resources if database is empty
      setResources(data && data.length > 0 ? data : sampleResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setResources(sampleResources);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (resource: Resource) => {
    // Update download count
    if (resource.id && !resource.id.startsWith("sample")) {
      await supabase
        .from("resources")
        .update({ download_count: resource.download_count + 1 })
        .eq("id", resource.id);
    }

    toast({
      title: "Download Started",
      description: `${resource.title} is being downloaded.`,
    });

    // Open file URL
    if (resource.file_url !== "#") {
      window.open(resource.file_url, "_blank");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ebook":
        return BookOpen;
      case "template":
        return FileSpreadsheet;
      case "checklist":
        return CheckSquare;
      case "guide":
        return FileText;
      default:
        return FileText;
    }
  };

  const types = [...new Set(resources.map(r => r.type))];
  const categories = [...new Set(resources.map(r => r.category))];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || resource.type === selectedType;
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const displayedResources = filteredResources.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResources.length;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedType, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-600 text-sm mb-4"
          >
            <Download className="w-4 h-4" />
            <span>Free Resources</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resource Library
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Download free eBooks, templates, checklists, and guides to accelerate your digital marketing success.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedType 
                  ? "bg-yellow-400 text-black" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Types
            </button>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedType === type 
                    ? "bg-yellow-400 text-black" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}s
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category 
                    ? "bg-gray-900 text-white" 
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${searchTerm}-${selectedType}-${selectedCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type);
              
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-yellow-400/50 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {resource.thumbnail_url ? (
                      <img
                        src={resource.thumbnail_url}
                        alt={resource.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400/20 to-amber-500/20">
                        <TypeIcon className="w-16 h-16 text-yellow-600/50" />
                      </div>
                    )}
                    
                    {resource.is_featured && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-400 text-black text-xs font-medium px-2 py-1 rounded-full">
                        <Star className="w-3 h-3" />
                        Featured
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full capitalize">
                      {resource.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                        {resource.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {resource.download_count.toLocaleString()}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                      {resource.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    <Button
                      onClick={() => handleDownload(resource)}
                      className="w-full bg-gray-900 hover:bg-yellow-400 hover:text-black transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Free
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Show More Button */}
        {hasMore && (
          <div className="text-center mt-10">
            <Button
              onClick={handleShowMore}
              variant="outline"
              className="px-8 py-3 border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black"
            >
              Show More ({filteredResources.length - visibleCount} remaining)
            </Button>
          </div>
        )}

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourceLibrary;
