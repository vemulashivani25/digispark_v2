/**
 * Resource Manager Component
 * For uploading and managing downloadable resources
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Save, 
  X, 
  Trash, 
  Edit,
  FileText,
  Plus,
  Star,
  Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Resource {
  id?: string;
  title: string;
  description: string;
  category: string;
  type: string;
  file_url: string;
  thumbnail_url: string | null;
  is_featured: boolean;
  is_active: boolean;
}

interface ResourceManagerProps {
  onClose: () => void;
  resource?: Resource | null;
  onSave: () => void;
}

const ResourceManager = ({ onClose, resource, onSave }: ResourceManagerProps) => {
  const [formData, setFormData] = useState<Resource>({
    title: "",
    description: "",
    category: "",
    type: "ebook",
    file_url: "",
    thumbnail_url: null,
    is_featured: false,
    is_active: true,
  });
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    }
  }, [resource]);

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `${path}/${fileName}`;

    const { error } = await supabase.storage
      .from("resources")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("resources")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setUploading(true);

    try {
      let fileUrl = formData.file_url;
      let thumbnailUrl = formData.thumbnail_url;

      // Upload file if selected
      if (file) {
        fileUrl = await uploadFile(file, "files");
      }

      // Upload thumbnail if selected
      if (thumbnail) {
        thumbnailUrl = await uploadFile(thumbnail, "thumbnails");
      }

      const resourceData = {
        ...formData,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl,
      };

      if (resource?.id) {
        const { error } = await supabase
          .from("resources")
          .update(resourceData)
          .eq("id", resource.id);
        
        if (error) throw error;
        toast({ title: "Resource updated successfully" });
      } else {
        const { error } = await supabase
          .from("resources")
          .insert([resourceData]);
        
        if (error) throw error;
        toast({ title: "Resource created successfully" });
      }

      onSave();
    } catch (error: any) {
      console.error("Error saving resource:", error);
      toast({
        title: "Error saving resource",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          {resource?.id ? "Edit Resource" : "Add New Resource"}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resource title"
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., SEO, Marketing"
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description..."
            className="bg-gray-700/50 border-gray-600 min-h-[100px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ebook">eBook</SelectItem>
                <SelectItem value="template">Template</SelectItem>
                <SelectItem value="checklist">Checklist</SelectItem>
                <SelectItem value="guide">Guide</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">File Upload</Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-gray-700/50 border-gray-600"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
            />
            {formData.file_url && !file && (
              <p className="text-xs text-gray-400">Current file: {formData.file_url.split("/").pop()}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Thumbnail Image</Label>
          <Input
            type="file"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="bg-gray-700/50 border-gray-600"
            accept="image/*"
          />
          {formData.thumbnail_url && !thumbnail && (
            <p className="text-xs text-gray-400">Current thumbnail: {formData.thumbnail_url.split("/").pop()}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Or use external URL</Label>
          <Input
            value={formData.file_url}
            onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
            placeholder="https://..."
            className="bg-gray-700/50 border-gray-600"
          />
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label className="text-gray-300">Active</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
            />
            <Label className="text-gray-300">Featured</Label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-600">
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={saving || uploading} 
            className="bg-yellow-400 hover:bg-yellow-300 text-black"
          >
            {uploading ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {resource?.id ? "Update" : "Create"}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ResourceManager;
