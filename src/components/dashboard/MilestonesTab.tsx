/**
 * Milestones Tab - Display project timeline and milestones
 * Used in: ClientDashboard.tsx
 * Dependencies: @/types/dashboard, lucide-react, framer-motion
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Circle,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProjectMilestone, MilestoneStatus } from '@/types/dashboard';

interface MilestonesTabProps {
  milestones: ProjectMilestone[];
}

const statusConfig: Record<MilestoneStatus, { icon: React.ElementType; color: string; lineColor: string }> = {
  pending: { icon: Circle, color: 'text-gray-400 bg-gray-400/10', lineColor: 'bg-gray-300' },
  in_progress: { icon: Clock, color: 'text-blue-500 bg-blue-500/10', lineColor: 'bg-blue-500' },
  completed: { icon: CheckCircle, color: 'text-green-500 bg-green-500/10', lineColor: 'bg-green-500' },
  delayed: { icon: AlertCircle, color: 'text-red-500 bg-red-500/10', lineColor: 'bg-red-500' },
};

const statusLabels: Record<MilestoneStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  delayed: 'Delayed',
};

export function MilestonesTab({ milestones }: MilestonesTabProps) {
  const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (milestones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground">No Milestones</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Project milestones will appear here
        </p>
      </div>
    );
  }

  const completedCount = milestones.filter((m) => m.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Timeline Progress</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {completedCount} of {milestones.length} milestones completed
              </p>
            </div>
            <div className="text-2xl font-bold text-primary">
              {Math.round((completedCount / milestones.length) * 100)}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {milestones.map((milestone, index) => {
          const status = statusConfig[milestone.status];
          const StatusIcon = status.icon;
          const isLast = index === milestones.length - 1;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 pb-6 last:pb-0"
            >
              {/* Timeline Line */}
              {!isLast && (
                <div 
                  className={`absolute left-3 top-8 w-0.5 h-[calc(100%-16px)] ${status.lineColor}`}
                />
              )}

              {/* Status Icon */}
              <div 
                className={`absolute left-0 top-1 p-1.5 rounded-full ${status.color}`}
              >
                <StatusIcon className="h-4 w-4" />
              </div>

              {/* Content */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">
                          {milestone.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${status.color} border-0`}
                        >
                          {statusLabels[milestone.status]}
                        </Badge>
                      </div>
                      {milestone.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                      {milestone.due_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {formatDate(milestone.due_date)}
                        </span>
                      )}
                      {milestone.completed_date && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          Done: {formatDate(milestone.completed_date)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
