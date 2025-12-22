import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateCaseStudyPDF } from '@/utils/generateCaseStudyPDF';
import { SuccessStory } from '@/types/successStory';

interface CaseStudyDownloadButtonProps {
  story: SuccessStory;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const CaseStudyDownloadButton: React.FC<CaseStudyDownloadButtonProps> = ({
  story,
  variant = 'outline',
  size = 'default',
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      await generateCaseStudyPDF({
        title: story.title,
        client: story.client,
        industry: story.industry,
        services: story.services,
        challenge: story.challenge,
        solution: story.solution,
        result: story.result,
        testimonial: story.testimonial,
        metrics: story.metrics
      });

      toast({
        title: "PDF Downloaded!",
        description: `Case study for ${story.client} has been saved.`
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating PDF",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={isGenerating}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
};

export default CaseStudyDownloadButton;
