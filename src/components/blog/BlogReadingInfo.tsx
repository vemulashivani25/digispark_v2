/**
 * Blog Reading Info Component
 * Displays reading time and word count for blog posts
 */

import { Clock, FileText } from "lucide-react";

interface BlogReadingInfoProps {
  content: string;
  readTime?: string;
}

const BlogReadingInfo = ({ content, readTime }: BlogReadingInfoProps) => {
  // Calculate word count from HTML content
  const calculateWordCount = (htmlContent: string): number => {
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return textContent.split(' ').filter(word => word.length > 0).length;
  };

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (wordCount: number): string => {
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  const wordCount = calculateWordCount(content);
  const calculatedReadTime = readTime || calculateReadingTime(wordCount);

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
        <Clock className="w-4 h-4 text-yellow-600" />
        <span>{calculatedReadTime}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
        <FileText className="w-4 h-4 text-yellow-600" />
        <span>{wordCount.toLocaleString()} words</span>
      </div>
    </div>
  );
};

export default BlogReadingInfo;
