/**
 * Blog Post Editor with Rich Text Support
 * For creating and editing blog posts
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Save, 
  X, 
  Image, 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Quote,
  Code,
  Eye,
  EyeOff
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  author_avatar?: string;
  tags: string[];
  is_published: boolean;
  featured: boolean;
}

interface BlogPostEditorProps {
  post?: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}

const BlogPostEditor = ({ post, onSave, onCancel }: BlogPostEditorProps) => {
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    image: "",
    author: "DigiSpark Team",
    author_avatar: "/expert-avatar.svg",
    tags: [],
    is_published: false,
    featured: false,
  });
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData(post);
      setTagsInput(post.tags?.join(", ") || "");
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: post?.slug || generateSlug(value),
    }));
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    let newText = "";

    switch (format) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        newText = `*${selectedText || "italic text"}*`;
        break;
      case "h1":
        newText = `\n# ${selectedText || "Heading 1"}\n`;
        break;
      case "h2":
        newText = `\n## ${selectedText || "Heading 2"}\n`;
        break;
      case "h3":
        newText = `\n### ${selectedText || "Heading 3"}\n`;
        break;
      case "ul":
        newText = `\n- ${selectedText || "List item"}\n`;
        break;
      case "ol":
        newText = `\n1. ${selectedText || "List item"}\n`;
        break;
      case "link":
        newText = `[${selectedText || "link text"}](url)`;
        break;
      case "quote":
        newText = `\n> ${selectedText || "Quote"}\n`;
        break;
      case "code":
        newText = `\`${selectedText || "code"}\``;
        break;
    }

    const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const tags = tagsInput.split(",").map(tag => tag.trim()).filter(Boolean);
      const wordCount = formData.content.trim().split(/\s+/).length;
      const readTime = calculateReadTime(formData.content);

      const postData = {
        ...formData,
        tags,
        word_count: wordCount,
        read_time: readTime,
        published_at: formData.is_published ? new Date().toISOString() : null,
      };

      if (post?.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post.id);
        
        if (error) throw error;
        toast({ title: "Post updated successfully" });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);
        
        if (error) throw error;
        toast({ title: "Post created successfully" });
      }

      onSave();
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast({
        title: "Error saving post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
          {post?.id ? "Edit Post" : "Create New Post"}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="border-gray-600"
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? "Edit" : "Preview"}
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Slug</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="post-slug"
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Marketing, SEO, Development"
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Featured Image URL</Label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://..."
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Excerpt</Label>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief description of the post..."
            className="bg-gray-700/50 border-gray-600 min-h-[80px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Content (Markdown supported)</Label>
          
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 bg-gray-700/30 rounded-t-lg border border-gray-600 border-b-0">
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("bold")}>
              <Bold className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("italic")}>
              <Italic className="w-4 h-4" />
            </Button>
            <div className="w-px bg-gray-600 mx-1" />
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("h1")}>
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("h2")}>
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("h3")}>
              <Heading3 className="w-4 h-4" />
            </Button>
            <div className="w-px bg-gray-600 mx-1" />
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("ul")}>
              <List className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("ol")}>
              <ListOrdered className="w-4 h-4" />
            </Button>
            <div className="w-px bg-gray-600 mx-1" />
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("link")}>
              <Link className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("quote")}>
              <Quote className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("code")}>
              <Code className="w-4 h-4" />
            </Button>
          </div>
          
          {showPreview ? (
            <div 
              className="bg-gray-700/50 border border-gray-600 rounded-b-lg p-4 min-h-[300px] prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formData.content
                  .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                  .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                  .replace(/\*(.*)\*/gim, '<em>$1</em>')
                  .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
                  .replace(/`(.*?)`/gim, '<code>$1</code>')
                  .replace(/\n/g, '<br>')
              }}
            />
          ) : (
            <Textarea
              id="content-editor"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your blog post content here..."
              className="bg-gray-700/50 border-gray-600 min-h-[300px] rounded-t-none font-mono"
              required
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Tags (comma separated)</Label>
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="seo, marketing, tips"
              className="bg-gray-700/50 border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Author</Label>
            <Input
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Author name"
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
            />
            <Label className="text-gray-300">Publish</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
            <Label className="text-gray-300">Featured</Label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel} className="border-gray-600">
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-300 text-black">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : post?.id ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default BlogPostEditor;
