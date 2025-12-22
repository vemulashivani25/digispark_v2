/**
 * Project Overview - Main project details view
 * Used in: ClientDashboard.tsx
 * Dependencies: @/types/dashboard, lucide-react, framer-motion
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  Target,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { ClientProject, ProjectStatus } from '@/types/dashboard';

interface ProjectOverviewProps {
  project: ClientProject;
}

const statusVariants: Record<ProjectStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  in_progress: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  review: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  on_hold: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const statusLabels: Record<ProjectStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  review: 'Under Review',
  completed: 'Completed',
  on_hold: 'On Hold',
  cancelled: 'Cancelled',
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const formatDate = (date: string | null) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return 'Not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      icon: Calendar,
      label: 'Start Date',
      value: formatDate(project.start_date),
      color: 'text-blue-500',
    },
    {
      icon: Target,
      label: 'End Date',
      value: formatDate(project.end_date),
      color: 'text-purple-500',
    },
    {
      icon: DollarSign,
      label: 'Budget',
      value: formatCurrency(project.budget),
      color: 'text-green-500',
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: `${project.progress}%`,
      color: 'text-orange-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{project.title}</h1>
          <p className="text-muted-foreground mt-1">{project.category}</p>
        </div>
        <Badge 
          variant="outline" 
          className={`${statusVariants[project.status]} text-sm px-3 py-1`}
        >
          {statusLabels[project.status]}
        </Badge>
      </div>

      {/* Description */}
      {project.description && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="font-semibold text-foreground text-sm">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            <span>Project Progress</span>
            <span className="text-lg font-bold text-primary">{project.progress}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={project.progress} className="h-3" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
