import { useState, useEffect } from "react";
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

type ProjectStatus = "pending" | "in_progress" | "review" | "completed" | "on_hold" | "cancelled";

interface ProjectManagerProps {
  project?: Tables<"client_projects"> | null;
  onSave: () => void;
  onClose: () => void;
}

interface ClientProfile {
  id: string;
  email: string | null;
  full_name: string | null;
}

const ProjectManager = ({ project, onSave, onClose }: ProjectManagerProps) => {
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    client_id: project?.client_id || "",
    category: project?.category || "",
    status: (project?.status || "pending") as ProjectStatus,
    progress: project?.progress || 0,
    budget: project?.budget || null,
    start_date: project?.start_date || "",
    end_date: project?.end_date || "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      // Get users with client role
      const { data: clientRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "client");

      if (rolesError) throw rolesError;

      if (clientRoles && clientRoles.length > 0) {
        const clientIds = clientRoles.map((r) => r.user_id);
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select("id, email, full_name")
          .in("id", clientIds);

        if (profilesError) throw profilesError;
        setClients(profiles || []);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast({
        title: "Error",
        description: "Failed to load clients",
        variant: "destructive",
      });
    } finally {
      setLoadingClients(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.client_id || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description || null,
        client_id: formData.client_id,
        category: formData.category,
        status: formData.status,
        progress: formData.progress,
        budget: formData.budget,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
      };

      if (project) {
        const { error } = await supabase
          .from("client_projects")
          .update(projectData)
          .eq("id", project.id);
        if (error) throw error;
        toast({ title: "Success", description: "Project updated successfully" });
      } else {
        const { error } = await supabase
          .from("client_projects")
          .insert([projectData]);
        if (error) throw error;
        toast({ title: "Success", description: "Project created successfully" });
      }

      onSave();
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    "Web Development",
    "Digital Marketing",
    "SEO",
    "Branding",
    "E-Commerce",
    "Mobile App",
    "Content Creation",
    "Social Media",
    "Other",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          {project ? "Edit Project" : "Create New Project"}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
              placeholder="Project title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client" className="text-gray-300">Client *</Label>
            <Select
              value={formData.client_id}
              onValueChange={(value) => setFormData({ ...formData, client_id: value })}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder={loadingClients ? "Loading..." : "Select client"} />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id} className="text-white">
                    {client.full_name || client.email || client.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-300">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-white">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-300">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="pending" className="text-white">Pending</SelectItem>
                <SelectItem value="in_progress" className="text-white">In Progress</SelectItem>
                <SelectItem value="review" className="text-white">Review</SelectItem>
                <SelectItem value="completed" className="text-white">Completed</SelectItem>
                <SelectItem value="on_hold" className="text-white">On Hold</SelectItem>
                <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress" className="text-gray-300">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-gray-300">Budget ($)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget || ""}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value ? parseFloat(e.target.value) : null })}
              className="bg-gray-900 border-gray-700 text-white"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_date" className="text-gray-300">Start Date</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_date" className="text-gray-300">End Date</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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
            className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
            placeholder="Project description..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-300 text-black">
            {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
            {project ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectManager;
