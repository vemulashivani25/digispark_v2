import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Copy, CheckCircle2, Eye, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const MetaTagGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Meta fields
  const [title, setTitle] = useState("Your Page Title | Brand Name");
  const [description, setDescription] = useState("A compelling description of your page content that includes relevant keywords and encourages clicks from search results.");
  const [keywords, setKeywords] = useState("keyword1, keyword2, keyword3");
  const [author, setAuthor] = useState("Your Name");
  const [siteUrl, setSiteUrl] = useState("https://yoursite.com");
  const [imageUrl, setImageUrl] = useState("https://yoursite.com/og-image.jpg");
  const [twitterHandle, setTwitterHandle] = useState("@yourhandle");
  const [siteName, setSiteName] = useState("Your Site Name");
  const [locale, setLocale] = useState("en_US");
  const [pageType, setPageType] = useState("website");

  const generateMetaTags = (): string => {
    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${pageType}" />
<meta property="og:url" content="${siteUrl}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${siteName}" />
<meta property="og:locale" content="${locale}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${siteUrl}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${imageUrl}" />
<meta property="twitter:creator" content="${twitterHandle}" />

<!-- Canonical URL -->
<link rel="canonical" href="${siteUrl}" />`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Meta tags copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const titleLength = title.length;
  const descriptionLength = description.length;

  return (
    <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-yellow-400" />
              Meta Tag Generator
            </h3>
            <p className="text-gray-300 mb-6">
              Generate SEO-optimized meta tags for better search visibility and social sharing.
            </p>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {/* Title */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">Page Title</label>
                  <span className={`text-xs ${titleLength > 60 ? "text-red-400" : "text-green-400"}`}>
                    {titleLength}/60
                  </span>
                </div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                  placeholder="Your Page Title | Brand"
                />
                {titleLength > 60 && (
                  <p className="text-red-400 text-xs mt-1">Title exceeds recommended 60 characters</p>
                )}
              </div>

              {/* Description */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">Meta Description</label>
                  <span className={`text-xs ${descriptionLength > 160 ? "text-red-400" : "text-green-400"}`}>
                    {descriptionLength}/160
                  </span>
                </div>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                  rows={3}
                  placeholder="A compelling description..."
                />
                {descriptionLength > 160 && (
                  <p className="text-red-400 text-xs mt-1">Description exceeds recommended 160 characters</p>
                )}
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-white mb-2">Keywords</label>
                <Input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              {/* Author & Site Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Author</label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Site Name</label>
                  <Input
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
              </div>

              {/* URLs */}
              <div>
                <label className="block text-white mb-2">Page URL</label>
                <Input
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                  placeholder="https://yoursite.com/page"
                />
              </div>

              <div>
                <label className="block text-white mb-2">OG Image URL</label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                  placeholder="https://yoursite.com/image.jpg"
                />
                <p className="text-gray-500 text-xs mt-1">Recommended: 1200x630px</p>
              </div>

              {/* Twitter & Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Twitter Handle</label>
                  <Input
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Page Type</label>
                  <select
                    value={pageType}
                    onChange={(e) => setPageType(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="profile">Profile</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Locale</label>
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
                >
                  <option value="en_US">English (US)</option>
                  <option value="en_GB">English (UK)</option>
                  <option value="es_ES">Spanish</option>
                  <option value="fr_FR">French</option>
                  <option value="de_DE">German</option>
                  <option value="hi_IN">Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Preview & Code</h3>

            {/* Google Preview */}
            <div className="mb-6 p-4 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Google Preview</span>
              </div>
              <div className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                {title || "Page Title"}
              </div>
              <div className="text-green-700 text-sm truncate">{siteUrl}</div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {description || "Meta description will appear here..."}
              </div>
            </div>

            {/* Social Preview */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Social Media Preview</span>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="h-32 bg-gray-700 flex items-center justify-center">
                  {imageUrl ? (
                    <img src={imageUrl} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }} />
                  ) : (
                    <Eye className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-xs uppercase">{siteName}</p>
                  <p className="text-white font-semibold truncate">{title}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div className="relative">
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs text-green-400 font-mono max-h-[250px] overflow-y-auto border border-gray-700">
                <code>{generateMetaTags()}</code>
              </pre>
              
              <Button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-300 text-black"
                size="sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaTagGenerator;
