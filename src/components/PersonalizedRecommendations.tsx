import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSessionBehavior } from '@/hooks/useSessionBehavior';
import { Button } from '@/components/ui/button';

interface RecommendedService {
  slug: string;
  title: string;
  description: string;
  category: string;
}

// Service recommendations by category
const servicesByCategory: Record<string, RecommendedService[]> = {
  'Web Development': [
    { slug: 'website-development', title: 'Custom Website Development', description: 'Professional websites tailored to your brand', category: 'Web Development' },
    { slug: 'seo-optimization', title: 'SEO Optimization', description: 'Boost your search rankings', category: 'Web Development' },
  ],
  'Digital Marketing': [
    { slug: 'digital-marketing', title: 'Digital Marketing Strategy', description: 'Comprehensive marketing campaigns', category: 'Digital Marketing' },
    { slug: 'email-marketing', title: 'Email Marketing', description: 'Engaging email campaigns that convert', category: 'Digital Marketing' },
  ],
  'CRM Solutions': [
    { slug: 'hubspot-crm', title: 'HubSpot CRM Setup', description: 'Streamline your customer relationships', category: 'CRM Solutions' },
    { slug: 'zoho-crm', title: 'Zoho CRM Integration', description: 'Powerful CRM customization', category: 'CRM Solutions' },
  ],
  'Virtual Assistance': [
    { slug: 'virtual-assistance', title: 'Virtual Assistant Services', description: 'Professional support for your business', category: 'Virtual Assistance' },
    { slug: 'zoom-support', title: 'Zoom Meeting Support', description: 'Seamless virtual meeting management', category: 'Virtual Assistance' },
  ],
  'Content Creation': [
    { slug: 'video-editing', title: 'Professional Video Editing', description: 'High-quality video production', category: 'Content Creation' },
    { slug: 'content-strategy', title: 'Content Strategy', description: 'Engaging content that drives results', category: 'Content Creation' },
  ],
};

interface PersonalizedRecommendationsProps {
  className?: string;
  maxRecommendations?: number;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  className = '',
  maxRecommendations = 3
}) => {
  const { getRecommendedCategories, hasInterests, getMostViewedServices } = useSessionBehavior();
  const [isVisible, setIsVisible] = React.useState(true);
  const [dismissed, setDismissed] = React.useState(false);

  if (!hasInterests || dismissed) return null;

  const recommendedCategories = getRecommendedCategories();
  const mostViewed = getMostViewedServices();
  
  // Get services from recommended categories that haven't been viewed much
  const recommendations: RecommendedService[] = [];
  
  recommendedCategories.forEach(category => {
    const categoryServices = servicesByCategory[category] || [];
    categoryServices.forEach(service => {
      const viewed = mostViewed.find(v => v.slug === service.slug);
      if (!viewed || viewed.viewCount < 2) {
        recommendations.push(service);
      }
    });
  });

  // If no specific recommendations, suggest popular services
  if (recommendations.length === 0) {
    recommendations.push(
      { slug: 'website-development', title: 'Website Development', description: 'Get a professional website', category: 'Web Development' },
      { slug: 'digital-marketing', title: 'Digital Marketing', description: 'Grow your online presence', category: 'Digital Marketing' }
    );
  }

  const displayRecommendations = recommendations.slice(0, maxRecommendations);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-yellow-400/20 rounded-xl p-6 ${className}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Recommended for You</h3>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss recommendations"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Based on your interests in {recommendedCategories.slice(0, 2).join(' and ')}
          </p>

          <div className="grid gap-3">
            {displayRecommendations.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services#${service.slug}`}
                  className="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors group"
                >
                  <div>
                    <h4 className="text-white font-medium group-hover:text-yellow-400 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <Button asChild variant="outline" className="w-full">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersonalizedRecommendations;
