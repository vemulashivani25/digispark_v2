import { useState, useEffect } from "react";
import { Plus, Trash, Edit, Receipt, Flag, Upload, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";
import ProjectManager from "./ProjectManager";
import InvoiceManager from "./InvoiceManager";
import MilestoneManager from "./MilestoneManager";
import FileUploadManager from "./FileUploadManager";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProjectsTabProps {
  loading: boolean;
}

const ProjectsTab = ({ loading: initialLoading }: ProjectsTabProps) => {
  const [projects, setProjects] = useState<Tables<"client_projects">[]>([]);
  const [loading, setLoading] = useState(initialLoading);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [editingProject, setEditingProject] = useState<Tables<"client_projects"> | null>(null);
  const [showInvoiceManager, setShowInvoiceManager] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showMilestoneManager, setShowMilestoneManager] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<{
    invoices: Tables<"project_invoices">[];
    milestones: Tables<"project_milestones">[];
    files: Tables<"project_files">[];
  } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: "project" | "invoice" | "milestone" | "file";
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("client_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectDetails = async (projectId: string) => {
    try {
      const [invoicesRes, milestonesRes, filesRes] = await Promise.all([
        supabase.from("project_invoices").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
        supabase.from("project_milestones").select("*").eq("project_id", projectId).order("order_index"),
        supabase.from("project_files").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
      ]);

      setProjectDetails({
        invoices: invoicesRes.data || [],
        milestones: milestonesRes.data || [],
        files: filesRes.data || [],
      });
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const toggleProjectExpand = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
      setProjectDetails(null);
    } else {
      setExpandedProject(projectId);
      fetchProjectDetails(projectId);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      let error = null;
      
      switch (deleteConfirmation.type) {
        case "project":
          const projectRes = await supabase.from("client_projects").delete().eq("id", deleteConfirmation.id);
          error = projectRes.error;
          break;
        case "invoice":
          const invoiceRes = await supabase.from("project_invoices").delete().eq("id", deleteConfirmation.id);
          error = invoiceRes.error;
          break;
        case "milestone":
          const milestoneRes = await supabase.from("project_milestones").delete().eq("id", deleteConfirmation.id);
          error = milestoneRes.error;
          break;
        case "file":
          const fileRes = await supabase.from("project_files").delete().eq("id", deleteConfirmation.id);
          error = fileRes.error;
          break;
      }
      if (error) throw error;

      toast({ title: "Deleted", description: `${deleteConfirmation.type} deleted successfully` });
      
      if (deleteConfirmation.type === "project") {
        fetchProjects();
      } else if (expandedProject) {
        fetchProjectDetails(expandedProject);
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    } finally {
      setDeleteConfirmation(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      review: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      on_hold: "bg-orange-100 text-orange-800",
      cancelled: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800",
      sent: "bg-blue-100 text-blue-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
      delayed: "bg-orange-100 text-orange-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (showProjectManager) {
    return (
      <ProjectManager
        project={editingProject}
        onSave={() => {
          setShowProjectManager(false);
          setEditingProject(null);
          fetchProjects();
        }}
        onClose={() => {
          setShowProjectManager(false);
          setEditingProject(null);
        }}
      />
    );
  }

  if (showInvoiceManager && selectedProjectId) {
    return (
      <InvoiceManager
        projectId={selectedProjectId}
        onSave={() => {
          setShowInvoiceManager(false);
          setSelectedProjectId(null);
          if (expandedProject) fetchProjectDetails(expandedProject);
        }}
        onClose={() => {
          setShowInvoiceManager(false);
          setSelectedProjectId(null);
        }}
      />
    );
  }

  if (showMilestoneManager && selectedProjectId) {
    return (
      <MilestoneManager
        projectId={selectedProjectId}
        onSave={() => {
          setShowMilestoneManager(false);
          setSelectedProjectId(null);
          if (expandedProject) fetchProjectDetails(expandedProject);
        }}
        onClose={() => {
          setShowMilestoneManager(false);
          setSelectedProjectId(null);
        }}
      />
    );
  }

  if (showFileUpload && selectedProjectId) {
    return (
      <FileUploadManager
        projectId={selectedProjectId}
        onSave={() => {
          setShowFileUpload(false);
          setSelectedProjectId(null);
          if (expandedProject) fetchProjectDetails(expandedProject);
        }}
        onClose={() => {
          setShowFileUpload(false);
          setSelectedProjectId(null);
        }}
      />
    );
  }

  return (
    <>
      <div className="mb-6">
        <Button
          className="bg-yellow-400 hover:bg-yellow-300 text-black"
          onClick={() => setShowProjectManager(true)}
        >
          <Plus size={16} className="mr-2" /> Create New Project
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center bg-gray-800/20 rounded-lg border border-dashed border-gray-700">
          <FolderOpen size={48} className="mx-auto mb-4 text-gray-500" />
          <h3 className="text-xl font-medium text-white mb-2">No Projects Yet</h3>
          <p className="text-gray-400 mb-6">Start by creating a new client project</p>
          <Button
            className="bg-yellow-400 hover:bg-yellow-300 text-black"
            onClick={() => setShowProjectManager(true)}
          >
            <Plus size={16} className="mr-2" /> Create First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800/30 border-gray-700/50">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                      {project.status.replace("_", " ")}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleProjectExpand(project.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      {expandedProject === project.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Progress: {project.progress}%</span>
                    {project.budget && <span>Budget: ${project.budget.toLocaleString()}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
                      onClick={() => {
                        setEditingProject(project);
                        setShowProjectManager(true);
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => setDeleteConfirmation({ type: "project", id: project.id, title: project.title })}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>

                {expandedProject === project.id && projectDetails && (
                  <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700"
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setShowInvoiceManager(true);
                        }}
                      >
                        <Receipt size={14} className="mr-1" /> Add Invoice
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700"
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setShowMilestoneManager(true);
                        }}
                      >
                        <Flag size={14} className="mr-1" /> Add Milestone
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700"
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setShowFileUpload(true);
                        }}
                      >
                        <Upload size={14} className="mr-1" /> Upload File
                      </Button>
                    </div>

                    {/* Invoices */}
                    {projectDetails.invoices.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Invoices</h4>
                        <div className="space-y-2">
                          {projectDetails.invoices.map((inv) => (
                            <div key={inv.id} className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                              <div className="flex items-center gap-3">
                                <span className="text-white">{inv.invoice_number}</span>
                                <span className="text-gray-400">${inv.amount.toLocaleString()}</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(inv.status)}`}>
                                  {inv.status}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => setDeleteConfirmation({ type: "invoice", id: inv.id, title: inv.invoice_number })}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Milestones */}
                    {projectDetails.milestones.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Milestones</h4>
                        <div className="space-y-2">
                          {projectDetails.milestones.map((ms) => (
                            <div key={ms.id} className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                              <div className="flex items-center gap-3">
                                <span className="text-white">{ms.title}</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(ms.status)}`}>
                                  {ms.status.replace("_", " ")}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => setDeleteConfirmation({ type: "milestone", id: ms.id, title: ms.title })}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Files */}
                    {projectDetails.files.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Files</h4>
                        <div className="space-y-2">
                          {projectDetails.files.map((file) => (
                            <div key={file.id} className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                              <a
                                href={file.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300"
                              >
                                {file.name}
                              </a>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => setDeleteConfirmation({ type: "file", id: file.id, title: file.name })}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmation} onOpenChange={(open) => !open && setDeleteConfirmation(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete {deleteConfirmation?.type}?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete "{deleteConfirmation?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProjectsTab;
