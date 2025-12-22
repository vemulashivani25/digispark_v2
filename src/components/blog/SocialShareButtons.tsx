/**
 * Social Share Buttons Component
 * Provides social sharing functionality for blog posts
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  CheckCircle,
  Mail,
  MessageCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  variant?: 'horizontal' | 'vertical';
}

const SocialShareButtons = ({ 
  title, 
  url = window.location.href,
  variant = 'horizontal' 
}: SocialShareButtonsProps) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      toast({
        title: "Link Copied!",
        description: "Article link copied to clipboard",
      });
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank'),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      action: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank'),
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`, '_blank'),
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  const containerClass = variant === 'vertical' 
    ? 'flex flex-col gap-2' 
    : 'flex flex-wrap items-center gap-2';

  return (
    <div className={containerClass}>
      <span className="text-sm text-gray-500 flex items-center gap-1 mr-2">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      
      {shareLinks.map((link) => (
        <motion.button
          key={link.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={link.action}
          className={`p-2 ${link.color} text-white rounded-full transition-colors`}
          aria-label={`Share on ${link.name}`}
          title={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </motion.button>
      ))}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCopyLink}
        className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Copy link"
        title="Copy link"
      >
        {linkCopied ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </motion.button>
    </div>
  );
};

export default SocialShareButtons;
