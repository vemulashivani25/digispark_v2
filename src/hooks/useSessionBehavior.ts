import { useState, useEffect, useCallback } from 'react';

interface ServiceView {
  slug: string;
  title: string;
  category: string;
  viewCount: number;
  lastViewed: number;
}

interface SessionBehavior {
  viewedServices: ServiceView[];
  viewedPages: string[];
  interests: string[];
  sessionStart: number;
}

const SESSION_KEY = 'digispark_session_behavior';

export const useSessionBehavior = () => {
  const [behavior, setBehavior] = useState<SessionBehavior>(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      viewedServices: [],
      viewedPages: [],
      interests: [],
      sessionStart: Date.now()
    };
  });

  // Persist to session storage
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(behavior));
  }, [behavior]);

  // Track page view
  const trackPageView = useCallback((page: string) => {
    setBehavior(prev => {
      if (prev.viewedPages.includes(page)) return prev;
      return {
        ...prev,
        viewedPages: [...prev.viewedPages, page]
      };
    });
  }, []);

  // Track service interest
  const trackServiceInterest = useCallback((service: {
    slug: string;
    title: string;
    category: string;
  }) => {
    setBehavior(prev => {
      const existing = prev.viewedServices.find(s => s.slug === service.slug);
      
      if (existing) {
        return {
          ...prev,
          viewedServices: prev.viewedServices.map(s =>
            s.slug === service.slug
              ? { ...s, viewCount: s.viewCount + 1, lastViewed: Date.now() }
              : s
          )
        };
      }

      return {
        ...prev,
        viewedServices: [...prev.viewedServices, {
          ...service,
          viewCount: 1,
          lastViewed: Date.now()
        }],
        interests: prev.interests.includes(service.category)
          ? prev.interests
          : [...prev.interests, service.category]
      };
    });
  }, []);

  // Get recommended services based on behavior
  const getRecommendedCategories = useCallback((): string[] => {
    const categoryScores: Record<string, number> = {};
    
    behavior.viewedServices.forEach(service => {
      const score = service.viewCount * 2 + (Date.now() - service.lastViewed < 300000 ? 3 : 0);
      categoryScores[service.category] = (categoryScores[service.category] || 0) + score;
    });

    return Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category)
      .slice(0, 3);
  }, [behavior.viewedServices]);

  // Get most viewed services
  const getMostViewedServices = useCallback((): ServiceView[] => {
    return [...behavior.viewedServices]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 5);
  }, [behavior.viewedServices]);

  return {
    behavior,
    trackPageView,
    trackServiceInterest,
    getRecommendedCategories,
    getMostViewedServices,
    hasInterests: behavior.viewedServices.length > 0
  };
};
