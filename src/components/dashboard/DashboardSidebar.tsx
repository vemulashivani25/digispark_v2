/**
 * Dashboard Sidebar - Project list and navigation
 * Used in: ClientDashboard.tsx
 * Dependencies: @/types/dashboard, lucide-react
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ClientProject, ProjectStatus } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DashboardSidebarProps {
  projects: ClientProject[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  isAdmin?: boolean;
  onAddProject?: () => void;
}

const statusConfig: Record<ProjectStatus, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: 'text-yellow-500', label: 'Pending' },
  in_progress: { icon: AlertCircle, color: 'text-blue-500', label: 'In Progress' },
  review: { icon: AlertCircle, color: 'text-purple-500', label: 'Review' },
  completed: { icon: CheckCircle, color: 'text-green-500', label: 'Completed' },
  on_hold: { icon: Clock, color: 'text-orange-500', label: 'On Hold' },
  cancelled: { icon: AlertCircle, color: 'text-red-500', label: 'Cancelled' },
};

export function DashboardSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
  isAdmin = false,
  onAddProject,
}: DashboardSidebarProps) {
  return (
    <aside className="w-full lg:w-80 bg-card border-r border-border h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Projects
          </h2>
          {isAdmin && onAddProject && (
            <Button size="sm" variant="outline" onClick={onAddProject}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No projects yet</p>
          </div>
        ) : (
          projects.map((project) => {
            const status = statusConfig[project.status];
            const StatusIcon = status.icon;
            const isSelected = project.id === selectedProjectId;

            return (
              <motion.button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={cn(
                  'w-full p-3 rounded-lg text-left transition-all',
                  'border border-transparent hover:border-border',
                  isSelected
                    ? 'bg-primary/10 border-primary/30'
                    : 'hover:bg-muted/50'
                )}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate text-sm">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <StatusIcon className={cn('h-3 w-3', status.color)} />
                      {status.label}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} className="h-1.5 mt-2" />
              </motion.button>
            );
          })
        )}
      </div>
    </aside>
  );
}
