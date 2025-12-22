import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Upload, Loader2, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface FileUploadManagerProps {
  projectId: string;
  onSave: () => void;
  onClose: () => void;
}

const FileUploadManager = ({ projectId, onSave, onClose }: FileUploadManagerProps) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !user) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to storage
      const fileExt = selectedFile.name.split(".").pop();
      const filePath = `${projectId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("resources")
        .getPublicUrl(filePath);

      // Save file record
      const { error: dbError } = await supabase
        .from("project_files")
        .insert([{
          project_id: projectId,
          name: fileName || selectedFile.name,
          file_url: urlData.publicUrl,
          file_type: selectedFile.type || "application/octet-stream",
          file_size: selectedFile.size,
          uploaded_by: user.id,
        }]);

      if (dbError) throw dbError;

      toast({ title: "Success", description: "File uploaded successfully" });
      onSave();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Upload File</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fileName" className="text-gray-300">File Name</Label>
          <Input
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white"
            placeholder="Enter file name"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Select File</Label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-400/50 transition-colors"
          >
            {selectedFile ? (
              <div className="flex items-center justify-center gap-3">
                <File size={24} className="text-yellow-400" />
                <span className="text-white">{selectedFile.name}</span>
                <span className="text-gray-400 text-sm">
                  ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ) : (
              <div>
                <Upload size={32} className="mx-auto mb-2 text-gray-500" />
                <p className="text-gray-400">Click to select a file</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={uploading || !selectedFile} className="bg-yellow-400 hover:bg-yellow-300 text-black">
            {uploading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Upload className="mr-2" size={16} />}
            Upload File
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default FileUploadManager;
