import React, { useState } from 'react';
import { FileText, FileSpreadsheet, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateContentGuidePDF, generateContentGuideExcel } from '@/utils/generateContentGuide';

const ContentGuideDownloader: React.FC = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      generateContentGuidePDF();
      toast({
        title: "PDF Downloaded!",
        description: "Content editing guide has been saved as PDF."
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadExcel = async () => {
    setIsGeneratingExcel(true);
    try {
      generateContentGuideExcel();
      toast({
        title: "Excel Downloaded!",
        description: "Content editing guide has been saved as Excel."
      });
    } catch (error) {
      console.error("Error generating Excel:", error);
      toast({
        title: "Error",
        description: "Failed to generate Excel. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingExcel(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Content Editing Guide
        </CardTitle>
        <CardDescription>
          Download the guide showing where to edit services, portfolio, testimonials, and social links
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="w-full justify-start gap-3"
          variant="outline"
        >
          {isGeneratingPDF ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <FileText className="h-5 w-5 text-red-500" />
          )}
          {isGeneratingPDF ? 'Generating...' : 'Download PDF Guide'}
        </Button>
        
        <Button
          onClick={handleDownloadExcel}
          disabled={isGeneratingExcel}
          className="w-full justify-start gap-3"
          variant="outline"
        >
          {isGeneratingExcel ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <FileSpreadsheet className="h-5 w-5 text-green-500" />
          )}
          {isGeneratingExcel ? 'Generating...' : 'Download Excel Guide'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentGuideDownloader;
