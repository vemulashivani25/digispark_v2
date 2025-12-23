import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitorData {
  visitor_id: string;
  page_path: string;
  referrer: string | null;
  user_agent: string;
  device_type: string;
  browser: string;
  os: string;
  country: string | null;
  city: string | null;
}

const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

const getBrowser = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Browser';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'IE';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Edg')) return 'Edge Chromium';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Unknown';
};

const getOS = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
};

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

export const useVisitorTracking = () => {
  const trackedRef = useRef(false);

  useEffect(() => {
    // Only track once per page load
    if (trackedRef.current) return;
    trackedRef.current = true;

    const trackVisitor = async () => {
      try {
        const visitorData: VisitorData = {
          visitor_id: getVisitorId(),
          page_path: window.location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          device_type: getDeviceType(),
          browser: getBrowser(),
          os: getOS(),
          country: null, // Would need a geolocation API
          city: null
        };

        // Try to get location from IP (using free API)
        try {
          const geoResponse = await fetch('https://ipapi.co/json/', { 
            signal: AbortSignal.timeout(3000) 
          });
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            visitorData.country = geoData.country_name || null;
            visitorData.city = geoData.city || null;
          }
        } catch {
          // Geolocation failed, continue without it
        }

        await supabase.from('visitor_analytics').insert(visitorData);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);
};

export default useVisitorTracking;
