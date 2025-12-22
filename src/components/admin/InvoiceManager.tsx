import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

interface InvoiceManagerProps {
  projectId: string;
  invoice?: Tables<"project_invoices"> | null;
  onSave: () => void;
  onClose: () => void;
}

const InvoiceManager = ({ projectId, invoice, onSave, onClose }: InvoiceManagerProps) => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    invoice_number: invoice?.invoice_number || `INV-${Date.now()}`,
    amount: invoice?.amount || 0,
    status: (invoice?.status || "draft") as InvoiceStatus,
    due_date: invoice?.due_date || "",
    paid_date: invoice?.paid_date || "",
    description: invoice?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.invoice_number || !formData.amount || !formData.due_date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const invoiceData = {
        project_id: projectId,
        invoice_number: formData.invoice_number,
        amount: formData.amount,
        status: formData.status,
        due_date: formData.due_date,
        paid_date: formData.paid_date || null,
        description: formData.description || null,
      };

      if (invoice) {
        const { error } = await supabase
          .from("project_invoices")
          .update(invoiceData)
          .eq("id", invoice.id);
        if (error) throw error;
        toast({ title: "Success", description: "Invoice updated successfully" });
      } else {
        const { error } = await supabase
          .from("project_invoices")
          .insert([invoiceData]);
        if (error) throw error;
        toast({ title: "Success", description: "Invoice created successfully" });
      }

      onSave();
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast({
        title: "Error",
        description: "Failed to save invoice",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          {invoice ? "Edit Invoice" : "Create Invoice"}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoice_number" className="text-gray-300">Invoice Number *</Label>
            <Input
              id="invoice_number"
              value={formData.invoice_number}
              onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">Amount ($) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-300">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as InvoiceStatus })}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="draft" className="text-white">Draft</SelectItem>
                <SelectItem value="sent" className="text-white">Sent</SelectItem>
                <SelectItem value="paid" className="text-white">Paid</SelectItem>
                <SelectItem value="overdue" className="text-white">Overdue</SelectItem>
                <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date" className="text-gray-300">Due Date *</Label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="paid_date" className="text-gray-300">Paid Date</Label>
            <Input
              id="paid_date"
              type="date"
              value={formData.paid_date}
              onChange={(e) => setFormData({ ...formData, paid_date: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-300">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
            placeholder="Invoice description..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-300 text-black">
            {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
            {invoice ? "Update Invoice" : "Create Invoice"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default InvoiceManager;
