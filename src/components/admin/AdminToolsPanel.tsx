import React, { useState } from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Download, 
  Loader2, 
  Database, 
  Trash2, 
  RefreshCw,
  HardDrive,
  Info,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateContentGuidePDF, generateContentGuideExcel } from '@/utils/generateContentGuide';
import { supabase } from '@/integrations/supabase/client';
import * as XLSX from 'xlsx';

type TableName = 'contact_submissions' | 'newsletter_subscriptions' | 'blog_posts' | 'resources' | 'project_quotes' | 'blog_suggestions' | 'profiles' | 'user_roles';

const AdminToolsPanel: React.FC = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);
  const [exportingTable, setExportingTable] = useState<string | null>(null);
  const [clearingCache, setClearingCache] = useState(false);
  const { toast } = useToast();

  // Content Guide Downloads
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      generateContentGuidePDF();
      toast({ title: "PDF Downloaded!", description: "Content editing guide saved." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate PDF.", variant: "destructive" });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadExcel = async () => {
    setIsGeneratingExcel(true);
    try {
      generateContentGuideExcel();
      toast({ title: "Excel Downloaded!", description: "Content editing guide saved." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate Excel.", variant: "destructive" });
    } finally {
      setIsGeneratingExcel(false);
    }
  };

  // Database Export
  const exportTableToCSV = async (tableName: TableName) => {
    setExportingTable(tableName);
    try {
      let exportData: Record<string, unknown>[] = [];

      if (tableName === 'user_roles') {
        // Fetch user_roles with profile data for clarity
        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('id, user_id, role, created_at')
          .order('created_at', { ascending: false });

        if (rolesError) throw rolesError;

        // Fetch all profiles to join
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, email');

        const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

        exportData = (rolesData || []).map(role => ({
          id: role.id,
          user_id: role.user_id,
          full_name: profilesMap.get(role.user_id)?.full_name || 'N/A',
          email: profilesMap.get(role.user_id)?.email || 'N/A',
          role: role.role,
          created_at: role.created_at
        }));
      } else if (tableName === 'profiles') {
        // Fetch profiles with role information
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, email, avatar_url, created_at, updated_at')
          .order('created_at', { ascending: false });

        if (profilesError) throw profilesError;

        // Fetch roles to join
        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('user_id, role');

        const rolesMap = new Map(rolesData?.map(r => [r.user_id, r.role]) || []);

        exportData = (profilesData || []).map(profile => ({
          id: profile.id,
          full_name: profile.full_name || 'N/A',
          email: profile.email || 'N/A',
          role: rolesMap.get(profile.id) || 'user',
          avatar_url: profile.avatar_url || '',
          created_at: profile.created_at,
          updated_at: profile.updated_at
        }));
      } else {
        // Standard export for other tables
        const orderColumn = tableName === 'newsletter_subscriptions' ? 'subscribed_at' : 'created_at';
        
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .order(orderColumn, { ascending: false });

        if (error) throw error;
        exportData = data || [];
      }

      if (exportData.length === 0) {
        toast({ title: "No Data", description: `No records found in ${tableName}.`, variant: "destructive" });
        return;
      }

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, ws, tableName);
      
      // Download
      XLSX.writeFile(wb, `${tableName}-export-${new Date().toISOString().split('T')[0]}.xlsx`);

      toast({ 
        title: "Export Complete!", 
        description: `${exportData.length} records exported from ${tableName}.` 
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({ title: "Export Failed", description: "Could not export data.", variant: "destructive" });
    } finally {
      setExportingTable(null);
    }
  };

  // Cache Clearing
  const clearLocalCache = () => {
    setClearingCache(true);
    try {
      // Clear localStorage (except auth)
      const authKeys = ['supabase.auth.token', 'sb-'];
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !authKeys.some(authKey => key.includes(authKey))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear sessionStorage
      sessionStorage.clear();

      toast({ 
        title: "Cache Cleared!", 
        description: `Removed ${keysToRemove.length} cached items.` 
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to clear cache.", variant: "destructive" });
    } finally {
      setClearingCache(false);
    }
  };

  // Get storage info
  const getStorageInfo = () => {
    const localStorageSize = new Blob(Object.values(localStorage)).size;
    const sessionStorageSize = new Blob(Object.values(sessionStorage)).size;
    return {
      localStorage: (localStorageSize / 1024).toFixed(2),
      sessionStorage: (sessionStorageSize / 1024).toFixed(2),
      localStorageItems: localStorage.length,
      sessionStorageItems: sessionStorage.length
    };
  };

  const storageInfo = getStorageInfo();

  const tables: { name: TableName; label: string; icon: React.ReactNode }[] = [
    { name: 'profiles', label: 'Users/Profiles', icon: <FileText size={14} /> },
    { name: 'user_roles', label: 'User Roles', icon: <FileText size={14} /> },
    { name: 'contact_submissions', label: 'Contacts', icon: <FileText size={14} /> },
    { name: 'newsletter_subscriptions', label: 'Subscribers', icon: <FileText size={14} /> },
    { name: 'blog_posts', label: 'Blog Posts', icon: <FileText size={14} /> },
    { name: 'resources', label: 'Resources', icon: <FileText size={14} /> },
    { name: 'project_quotes', label: 'Project Quotes', icon: <FileText size={14} /> },
    { name: 'blog_suggestions', label: 'Blog Suggestions', icon: <FileText size={14} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Content Guide Downloads */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Download className="h-5 w-5 text-primary" />
            Content Editing Guide
          </CardTitle>
          <CardDescription className="text-gray-400">
            Download documentation showing where to edit services, portfolio, testimonials, and social links
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            variant="outline"
            className="border-gray-600 hover:bg-gray-700"
          >
            {isGeneratingPDF ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileText className="mr-2 h-4 w-4 text-red-500" />
            )}
            Download PDF
          </Button>
          
          <Button
            onClick={handleDownloadExcel}
            disabled={isGeneratingExcel}
            variant="outline"
            className="border-gray-600 hover:bg-gray-700"
          >
            {isGeneratingExcel ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="mr-2 h-4 w-4 text-green-500" />
            )}
            Download Excel
          </Button>
        </CardContent>
      </Card>

      {/* Database Export */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Database className="h-5 w-5 text-blue-400" />
            Database Export
          </CardTitle>
          <CardDescription className="text-gray-400">
            Export database tables to Excel files for backup or analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {tables.map((table) => (
              <Button
                key={table.name}
                onClick={() => exportTableToCSV(table.name)}
                disabled={exportingTable === table.name}
                variant="outline"
                size="sm"
                className="border-gray-600 hover:bg-gray-700 justify-start"
              >
                {exportingTable === table.name ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4 text-blue-400" />
                )}
                {table.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cache Management */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <HardDrive className="h-5 w-5 text-purple-400" />
            Cache Management
          </CardTitle>
          <CardDescription className="text-gray-400">
            View and manage browser storage cache
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Storage Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{storageInfo.localStorageItems}</p>
              <p className="text-xs text-gray-400">Local Items</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">{storageInfo.localStorage} KB</p>
              <p className="text-xs text-gray-400">Local Size</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">{storageInfo.sessionStorageItems}</p>
              <p className="text-xs text-gray-400">Session Items</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">{storageInfo.sessionStorage} KB</p>
              <p className="text-xs text-gray-400">Session Size</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={clearLocalCache}
              disabled={clearingCache}
              variant="outline"
              className="border-red-600/50 text-red-400 hover:bg-red-900/20 hover:text-red-300"
            >
              {clearingCache ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Clear Cache
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-gray-600 hover:bg-gray-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload Page
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Info className="h-5 w-5 text-cyan-400" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Browser</span>
                <span className="text-white">{navigator.userAgent.split(' ').slice(-2).join(' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Platform</span>
                <span className="text-white">{navigator.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Language</span>
                <span className="text-white">{navigator.language}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Screen</span>
                <span className="text-white">{window.screen.width} x {window.screen.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Viewport</span>
                <span className="text-white">{window.innerWidth} x {window.innerHeight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Online</span>
                <span className="text-white flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  {navigator.onLine ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminToolsPanel;
