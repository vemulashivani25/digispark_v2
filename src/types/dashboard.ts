/**
 * Type definitions for Client Dashboard
 * Used in: ClientDashboard.tsx, dashboard components
 */

export type ProjectStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'on_hold' | 'cancelled';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'delayed';

export interface ClientProject {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  category: string;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectInvoice {
  id: string;
  project_id: string;
  invoice_number: string;
  amount: number;
  status: InvoiceStatus;
  due_date: string;
  paid_date: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  name: string;
  file_url: string;
  file_type: string;
  file_size: number | null;
  uploaded_by: string;
  created_at: string;
}

export interface ProjectMilestone {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: MilestoneStatus;
  due_date: string | null;
  completed_date: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectMessage {
  id: string;
  project_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
