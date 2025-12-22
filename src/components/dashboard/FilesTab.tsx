/**
 * Files Tab - Display and manage project files
 * Used in: ClientDashboard.tsx
 * Dependencies: @/types/dashboard, lucide-react, framer-motion
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image, 
  FileCode, 
  File,
  Download,
  ExternalLink,
  Upload
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ProjectFile } from '@/types/dashboard';

interface FilesTabProps {
  files: ProjectFile[];
  isAdmin?: boolean;
  onUpload?: () => void;
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return Image;
  if (fileType.includes('pdf') || fileType.includes('doc')) return FileText;
  if (fileType.includes('code') || fileType.includes('javascript') || fileType.includes('typescript')) return FileCode;
  return File;
};

const getFileColor = (fileType: string) => {
  if (fileType.startsWith('image/')) return 'text-purple-500 bg-purple-500/10';
  if (fileType.includes('pdf')) return 'text-red-500 bg-red-500/10';
  if (fileType.includes('doc')) return 'text-blue-500 bg-blue-500/10';
  if (fileType.includes('code') || fileType.includes('javascript')) return 'text-yellow-500 bg-yellow-500/10';
  return 'text-gray-500 bg-gray-500/10';
};

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return 'Unknown';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function FilesTab({ files, isAdmin = false, onUpload }: FilesTabProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <File className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground">No Files</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Project files will appear here
        </p>
        {isAdmin && onUpload && (
          <Button className="mt-4" onClick={onUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isAdmin && onUpload && (
        <div className="flex justify-end">
          <Button onClick={onUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => {
          const FileIcon = getFileIcon(file.file_type);
          const colorClasses = getFileColor(file.file_type);

          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${colorClasses}`}>
                      <FileIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.file_size)}</span>
                        <span>•</span>
                        <span>{formatDate(file.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(file.file_url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      asChild
                    >
                      <a href={file.file_url} download>
                        <Download className="h-3 w-3" />
                      </a>
                    </Button>
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
