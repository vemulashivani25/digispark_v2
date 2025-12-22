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

type MilestoneStatus = "pending" | "in_progress" | "completed" | "delayed";

interface MilestoneManagerProps {
  projectId: string;
  milestone?: Tables<"project_milestones"> | null;
  onSave: () => void;
  onClose: () => void;
}

const MilestoneManager = ({ projectId, milestone, onSave, onClose }: MilestoneManagerProps) => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: milestone?.title || "",
    description: milestone?.description || "",
    status: (milestone?.status || "pending") as MilestoneStatus,
    due_date: milestone?.due_date || "",
    completed_date: milestone?.completed_date || "",
    order_index: milestone?.order_index || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Validation Error",
        description: "Please enter a milestone title",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const milestoneData = {
        project_id: projectId,
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        due_date: formData.due_date || null,
        completed_date: formData.completed_date || null,
        order_index: formData.order_index,
      };

      if (milestone) {
        const { error } = await supabase
          .from("project_milestones")
          .update(milestoneData)
          .eq("id", milestone.id);
        if (error) throw error;
        toast({ title: "Success", description: "Milestone updated successfully" });
      } else {
        const { error } = await supabase
          .from("project_milestones")
          .insert([milestoneData]);
        if (error) throw error;
        toast({ title: "Success", description: "Milestone created successfully" });
      }

      onSave();
    } catch (error) {
      console.error("Error saving milestone:", error);
      toast({
        title: "Error",
        description: "Failed to save milestone",
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
          {milestone ? "Edit Milestone" : "Add Milestone"}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title" className="text-gray-300">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
              placeholder="Milestone title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-300">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as MilestoneStatus })}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="pending" className="text-white">Pending</SelectItem>
                <SelectItem value="in_progress" className="text-white">In Progress</SelectItem>
                <SelectItem value="completed" className="text-white">Completed</SelectItem>
                <SelectItem value="delayed" className="text-white">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order_index" className="text-gray-300">Order</Label>
            <Input
              id="order_index"
              type="number"
              min="0"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date" className="text-gray-300">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="completed_date" className="text-gray-300">Completed Date</Label>
            <Input
              id="completed_date"
              type="date"
              value={formData.completed_date}
              onChange={(e) => setFormData({ ...formData, completed_date: e.target.value })}
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
            placeholder="Milestone description..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-300 text-black">
            {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
            {milestone ? "Update Milestone" : "Add Milestone"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default MilestoneManager;
