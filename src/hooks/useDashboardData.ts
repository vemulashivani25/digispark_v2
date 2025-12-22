/**
 * Custom hook for fetching and managing Client Dashboard data
 * Used in: ClientDashboard.tsx
 * Dependencies: @/integrations/supabase/client, @/types/dashboard
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { 
  ClientProject, 
  ProjectInvoice, 
  ProjectFile, 
  ProjectMilestone, 
  ProjectMessage 
} from '@/types/dashboard';

interface DashboardData {
  projects: ClientProject[];
  invoices: ProjectInvoice[];
  files: ProjectFile[];
  milestones: ProjectMilestone[];
  messages: ProjectMessage[];
}

interface UseDashboardDataReturn {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

export function useDashboardData(): UseDashboardDataReturn {
  const { user, isAdmin } = useAuth();
  const [data, setData] = useState<DashboardData>({
    projects: [],
    invoices: [],
    files: [],
    milestones: [],
    messages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch projects
      const { data: projects, error: projectsError } = await supabase
        .from('client_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const projectIds = (projects || []).map((p: ClientProject) => p.id);

      if (projectIds.length === 0) {
        setData({
          projects: [],
          invoices: [],
          files: [],
          milestones: [],
          messages: [],
        });
        setLoading(false);
        return;
      }

      // Fetch related data in parallel
      const [invoicesRes, filesRes, milestonesRes, messagesRes] = await Promise.all([
        supabase
          .from('project_invoices')
          .select('*')
          .in('project_id', projectIds)
          .order('created_at', { ascending: false }),
        supabase
          .from('project_files')
          .select('*')
          .in('project_id', projectIds)
          .order('created_at', { ascending: false }),
        supabase
          .from('project_milestones')
          .select('*')
          .in('project_id', projectIds)
          .order('order_index', { ascending: true }),
        supabase
          .from('project_messages')
          .select('*')
          .in('project_id', projectIds)
          .order('created_at', { ascending: true }),
      ]);

      setData({
        projects: (projects || []) as ClientProject[],
        invoices: (invoicesRes.data || []) as ProjectInvoice[],
        files: (filesRes.data || []) as ProjectFile[],
        milestones: (milestonesRes.data || []) as ProjectMilestone[],
        messages: (messagesRes.data || []) as ProjectMessage[],
      });

      // Auto-select first project if none selected
      if (!selectedProjectId && projects && projects.length > 0) {
        setSelectedProjectId(projects[0].id);
      }
    } catch (err: any) {
      console.error('Dashboard data fetch error:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [user, selectedProjectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    selectedProjectId,
    setSelectedProjectId,
  };
}
