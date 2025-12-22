/**
 * Invoices Tab - Display project invoices
 * Used in: ClientDashboard.tsx
 * Dependencies: @/types/dashboard, lucide-react, framer-motion
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ProjectInvoice, InvoiceStatus } from '@/types/dashboard';

interface InvoicesTabProps {
  invoices: ProjectInvoice[];
}

const statusConfig: Record<InvoiceStatus, { icon: React.ElementType; color: string; bgColor: string }> = {
  draft: { icon: FileText, color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
  sent: { icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  paid: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  overdue: { icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-500/10' },
  cancelled: { icon: AlertTriangle, color: 'text-gray-400', bgColor: 'bg-gray-400/10' },
};

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground">No Invoices</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Invoices will appear here once created
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Invoiced</p>
                <p className="font-bold text-foreground">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Paid</p>
                <p className="font-bold text-foreground">{formatCurrency(paidAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        {invoices.map((invoice, index) => {
          const status = statusConfig[invoice.status];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg ${status.bgColor} ${status.color}`}>
                        <StatusIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {invoice.invoice_number}
                        </p>
                        {invoice.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {invoice.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="font-semibold text-foreground">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Due: {formatDate(invoice.due_date)}
                        </div>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={`${status.bgColor} ${status.color} border-0 capitalize`}
                      >
                        {invoice.status}
                      </Badge>

                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
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
