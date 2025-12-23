import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  Users, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Globe, 
  RefreshCw,
  MapPin,
  Chrome
} from 'lucide-react';

interface VisitorStats {
  totalVisitors: number;
  uniqueVisitors: number;
  deviceBreakdown: { device: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
  countryBreakdown: { country: string; count: number }[];
  topPages: { page: string; count: number }[];
  todayVisitors: number;
  weekVisitors: number;
}

const VisitorAnalytics: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch all visitor data
      const { data, error } = await supabase
        .from('visitor_analytics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        setStats({
          totalVisitors: 0,
          uniqueVisitors: 0,
          deviceBreakdown: [],
          browserBreakdown: [],
          countryBreakdown: [],
          topPages: [],
          todayVisitors: 0,
          weekVisitors: 0
        });
        return;
      }

      // Calculate stats
      const uniqueIds = new Set(data.map(v => v.visitor_id));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);

      const todayVisitors = data.filter(v => new Date(v.created_at) >= today).length;
      const weekVisitors = data.filter(v => new Date(v.created_at) >= weekAgo).length;

      // Device breakdown
      const deviceCounts: Record<string, number> = {};
      data.forEach(v => {
        const device = v.device_type || 'unknown';
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      });
      const deviceBreakdown = Object.entries(deviceCounts)
        .map(([device, count]) => ({ device, count }))
        .sort((a, b) => b.count - a.count);

      // Browser breakdown
      const browserCounts: Record<string, number> = {};
      data.forEach(v => {
        const browser = v.browser || 'unknown';
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      });
      const browserBreakdown = Object.entries(browserCounts)
        .map(([browser, count]) => ({ browser, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Country breakdown
      const countryCounts: Record<string, number> = {};
      data.forEach(v => {
        const country = v.country || 'Unknown';
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      });
      const countryBreakdown = Object.entries(countryCounts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Top pages
      const pageCounts: Record<string, number> = {};
      data.forEach(v => {
        const page = v.page_path || '/';
        pageCounts[page] = (pageCounts[page] || 0) + 1;
      });
      const topPages = Object.entries(pageCounts)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setStats({
        totalVisitors: data.length,
        uniqueVisitors: uniqueIds.size,
        deviceBreakdown,
        browserBreakdown,
        countryBreakdown,
        topPages,
        todayVisitors,
        weekVisitors
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to load visitor analytics',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-400">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Visitor Analytics</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={fetchStats}
          className="border-gray-600 hover:bg-gray-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-white">{stats.totalVisitors}</p>
            <p className="text-sm text-gray-400">Total Page Views</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6 text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <p className="text-3xl font-bold text-white">{stats.uniqueVisitors}</p>
            <p className="text-sm text-gray-400">Unique Visitors</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <p className="text-3xl font-bold text-white">{stats.todayVisitors}</p>
            <p className="text-sm text-gray-400">Today</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <p className="text-3xl font-bold text-white">{stats.weekVisitors}</p>
            <p className="text-sm text-gray-400">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Device Breakdown */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
              <Monitor className="h-4 w-4" /> Devices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {stats.deviceBreakdown.length === 0 ? (
              <p className="text-gray-500 text-sm">No data</p>
            ) : (
              stats.deviceBreakdown.map(({ device, count }) => (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    {getDeviceIcon(device)}
                    <span className="capitalize">{device}</span>
                  </div>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Browser Breakdown */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
              <Chrome className="h-4 w-4" /> Browsers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {stats.browserBreakdown.length === 0 ? (
              <p className="text-gray-500 text-sm">No data</p>
            ) : (
              stats.browserBreakdown.map(({ browser, count }) => (
                <div key={browser} className="flex items-center justify-between">
                  <span className="text-gray-300">{browser}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Country Breakdown */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {stats.countryBreakdown.length === 0 ? (
              <p className="text-gray-500 text-sm">No data</p>
            ) : (
              stats.countryBreakdown.map(({ country, count }) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-gray-300">{country}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
              <Globe className="h-4 w-4" /> Top Pages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {stats.topPages.length === 0 ? (
              <p className="text-gray-500 text-sm">No data</p>
            ) : (
              stats.topPages.map(({ page, count }) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="text-gray-300 truncate max-w-[120px]" title={page}>
                    {page}
                  </span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitorAnalytics;
