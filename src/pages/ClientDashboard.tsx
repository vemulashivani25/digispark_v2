/**
 * Client Dashboard Page
 * Private area for clients to view project status, invoices, files, and milestones
 * 
 * Route: /dashboard
 * Components Used: DashboardSidebar, ProjectOverview, InvoicesTab, FilesTab, MilestonesTab, MessagesTab
 * Authentication: Required - redirects to /auth if not logged in
 * Access: Clients see their own projects, Admins see all projects
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  CalendarCheck,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import { 
  DashboardSidebar,
  ProjectOverview,
  InvoicesTab,
  FilesTab,
  MilestonesTab,
  MessagesTab
} from '@/components/dashboard';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { 
    data, 
    loading: dataLoading, 
    error, 
    refetch,
    selectedProjectId, 
    setSelectedProjectId 
  } = useDashboardData();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const selectedProject = data.projects.find((p) => p.id === selectedProjectId);
  const projectInvoices = data.invoices.filter((i) => i.project_id === selectedProjectId);
  const projectFiles = data.files.filter((f) => f.project_id === selectedProjectId);
  const projectMilestones = data.milestones.filter((m) => m.project_id === selectedProjectId);
  const projectMessages = data.messages.filter((m) => m.project_id === selectedProjectId);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Client Dashboard | DigiSpark</title>
        <meta name="description" content="Access your project dashboard to view status, invoices, files, and communicate with our team." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isAdmin 
                ? 'Manage all client projects, invoices, and communications'
                : 'View your project progress, invoices, and files'}
            </p>
          </motion.div>

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {dataLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
              {/* Sidebar - Project List */}
              <DashboardSidebar
                projects={data.projects}
                selectedProjectId={selectedProjectId}
                onSelectProject={setSelectedProjectId}
                isAdmin={isAdmin}
              />

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {selectedProject ? (
                  <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
                      <TabsTrigger value="overview" className="gap-1.5">
                        <LayoutDashboard className="h-4 w-4 hidden sm:block" />
                        <span>Overview</span>
                      </TabsTrigger>
                      <TabsTrigger value="invoices" className="gap-1.5">
                        <FileText className="h-4 w-4 hidden sm:block" />
                        <span>Invoices</span>
                      </TabsTrigger>
                      <TabsTrigger value="files" className="gap-1.5">
                        <FolderOpen className="h-4 w-4 hidden sm:block" />
                        <span>Files</span>
                      </TabsTrigger>
                      <TabsTrigger value="milestones" className="gap-1.5">
                        <CalendarCheck className="h-4 w-4 hidden sm:block" />
                        <span>Milestones</span>
                      </TabsTrigger>
                      <TabsTrigger value="messages" className="gap-1.5">
                        <MessageCircle className="h-4 w-4 hidden sm:block" />
                        <span>Chat</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <ProjectOverview project={selectedProject} />
                    </TabsContent>

                    <TabsContent value="invoices">
                      <InvoicesTab invoices={projectInvoices} />
                    </TabsContent>

                    <TabsContent value="files">
                      <FilesTab files={projectFiles} isAdmin={isAdmin} />
                    </TabsContent>

                    <TabsContent value="milestones">
                      <MilestonesTab milestones={projectMilestones} />
                    </TabsContent>

                    <TabsContent value="messages">
                      <MessagesTab 
                        messages={projectMessages} 
                        projectId={selectedProjectId!}
                        onMessageSent={refetch}
                      />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <FolderOpen className="h-20 w-20 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-medium text-foreground">
                      No Project Selected
                    </h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      {data.projects.length === 0
                        ? 'You don\'t have any projects yet. Contact us to get started!'
                        : 'Select a project from the sidebar to view details'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default ClientDashboard;
