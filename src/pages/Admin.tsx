import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { UserProfile, ContactSubmission, NewsletterSubscription } from "@/types/supabase";
import { Tables } from "@/integrations/supabase/types";
import { Plus, Trash, Edit, Eye, RefreshCcw, Check, X, Calendar, ShieldAlert, FileText, Wrench } from "lucide-react";
import ContentGuideDownloader from "@/components/ContentGuideDownloader";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import ResourceManager from "@/components/admin/ResourceManager";
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

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  file_url: string;
  thumbnail_url: string | null;
  download_count: number;
  is_featured: boolean;
  is_active: boolean;
}

const Admin = () => {
  const { user, loading, isAdmin, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("contacts");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscription[]>([]);
  const [blogPosts, setBlogPosts] = useState<Tables<"blog_posts">[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Tables<"blog_posts"> | null>(null);
  const [showResourceManager, setShowResourceManager] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'contact' | 'blog' | 'resource';
    id: string;
    title?: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    
    setAuthChecked(true);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to access this page",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (userRole === null && user) {
      return;
    }

    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    fetchData(activeTab);
  }, [user, loading, isAdmin, userRole, navigate]);

  const fetchData = async (tab: string) => {
    setDataLoading(true);
    
    try {
      switch (tab) {
        case "contacts":
          const { data: contactsData, error: contactsError } = await supabase
            .from('contact_submissions' as any)
            .select('*')
            .order('created_at', { ascending: false });
          
          if (contactsError) throw contactsError;
          setContacts((contactsData || []) as unknown as ContactSubmission[]);
          break;
          
        case "subscribers":
          const { data: subscribersData, error: subscribersError } = await supabase
            .from('newsletter_subscriptions' as any)
            .select('*')
            .order('subscribed_at', { ascending: false });
          
          if (subscribersError) throw subscribersError;
          setSubscribers((subscribersData || []) as unknown as NewsletterSubscription[]);
          break;
          
        case "blog":
          const { data: blogData, error: blogError } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (blogError) throw blogError;
          setBlogPosts((blogData || []) as Tables<"blog_posts">[]);
          break;

        case "resources":
          const { data: resourcesData, error: resourcesError } = await supabase
            .from('resources')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (resourcesError) throw resourcesError;
          setResources((resourcesData || []) as Resource[]);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${tab} data:`, error);
      toast({
        title: "Error",
        description: `Failed to load ${tab} data`,
        variant: "destructive"
      });
    } finally {
      setDataLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    fetchData(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions' as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setContacts(contacts.filter(contact => contact.id !== id));
      
      toast({
        title: "Contact deleted",
        description: "Contact submission has been removed"
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast({
        title: "Error",
        description: "Failed to delete contact submission",
        variant: "destructive"
      });
    }
  };

  const toggleSubscriberStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions' as any)
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setSubscribers(subscribers.map(sub => 
        sub.id === id ? { ...sub, is_active: !currentStatus } : sub
      ));
      
      toast({
        title: currentStatus ? "Subscriber deactivated" : "Subscriber activated",
        description: `Subscription status updated`
      });
    } catch (error) {
      console.error("Error updating subscriber status:", error);
      toast({
        title: "Error",
        description: "Failed to update subscriber status",
        variant: "destructive"
      });
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setBlogPosts(blogPosts.filter(post => post.id !== id));
      
      toast({
        title: "Post deleted",
        description: "Blog post has been removed"
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const deleteResource = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setResources(resources.filter(r => r.id !== id));
      
      toast({
        title: "Resource deleted",
        description: "Resource has been removed"
      });
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive"
      });
    }
  };

  if (loading || !authChecked || (user && userRole === null)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <ShieldAlert size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6 text-center">You don't have permission to access the admin dashboard.</p>
        <Button onClick={() => navigate('/')} className="bg-yellow-400 hover:bg-yellow-300 text-black">
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Admin Dashboard | DigiSpark</title>
        <meta name="description" content="Admin dashboard for DigiSpark website" />
      </Helmet>

      <Navbar />

      <div className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin <span className="text-yellow-400">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300">
              Manage website content and user interactions
            </p>
          </motion.div>

          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl">Dashboard</CardTitle>
                <Button
                  size="sm"
                  onClick={() => fetchData(activeTab)}
                  className="bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 border border-yellow-400/30"
                >
                  <RefreshCcw size={16} className="mr-2" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                  <TabsTrigger value="blog">Blog Posts</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="tools" className="flex items-center gap-1">
                    <Wrench size={14} /> Tools
                  </TabsTrigger>
                </TabsList>
                
                {/* Contacts Tab */}
                <TabsContent value="contacts">
                  {dataLoading ? (
                    <div className="py-20 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading contact submissions...</p>
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="py-20 text-center">
                      <p className="text-gray-400">No contact submissions found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 text-gray-300">Name</th>
                            <th className="text-left py-3 px-4 text-gray-300">Email</th>
                            <th className="text-left py-3 px-4 text-gray-300">Service</th>
                            <th className="text-left py-3 px-4 text-gray-300">Date</th>
                            <th className="text-right py-3 px-4 text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map(contact => (
                            <tr key={contact.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                              <td className="py-4 px-4 text-white">{contact.name}</td>
                              <td className="py-4 px-4 text-gray-300">{contact.email}</td>
                              <td className="py-4 px-4 text-gray-300">{contact.service}</td>
                              <td className="py-4 px-4 text-gray-300">{formatDate(contact.created_at)}</td>
                              <td className="py-4 px-4 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  onClick={() => setDeleteConfirmation({ type: 'contact', id: contact.id, title: contact.name })}
                                >
                                  <Trash size={16} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
                
                {/* Subscribers Tab */}
                <TabsContent value="subscribers">
                  {dataLoading ? (
                    <div className="py-20 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading subscribers...</p>
                    </div>
                  ) : subscribers.length === 0 ? (
                    <div className="py-20 text-center">
                      <p className="text-gray-400">No newsletter subscribers found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 text-gray-300">Email</th>
                            <th className="text-left py-3 px-4 text-gray-300">Subscribed On</th>
                            <th className="text-left py-3 px-4 text-gray-300">Status</th>
                            <th className="text-right py-3 px-4 text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map(sub => (
                            <tr key={sub.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                              <td className="py-4 px-4 text-white">{sub.email}</td>
                              <td className="py-4 px-4 text-gray-300">{formatDate(sub.subscribed_at)}</td>
                              <td className="py-4 px-4">
                                {sub.is_active ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Inactive
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className={sub.is_active ? 
                                    "text-orange-400 hover:text-orange-300 hover:bg-orange-900/20" : 
                                    "text-green-400 hover:text-green-300 hover:bg-green-900/20"}
                                  onClick={() => toggleSubscriberStatus(sub.id, sub.is_active)}
                                >
                                  {sub.is_active ? <X size={16} /> : <Check size={16} />}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
                
                {/* Blog Posts Tab */}
                <TabsContent value="blog">
                  {showBlogEditor ? (
                    <BlogPostEditor
                      post={editingPost as any}
                      onSave={() => {
                        setShowBlogEditor(false);
                        setEditingPost(null);
                        fetchData("blog");
                      }}
                      onCancel={() => {
                        setShowBlogEditor(false);
                        setEditingPost(null);
                      }}
                    />
                  ) : (
                    <>
                      <div className="mb-6">
                        <Button 
                          className="bg-yellow-400 hover:bg-yellow-300 text-black"
                          onClick={() => setShowBlogEditor(true)}
                        >
                          <Plus size={16} className="mr-2" /> Create New Post
                        </Button>
                      </div>
                      
                      {dataLoading ? (
                        <div className="py-20 text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                          <p className="text-gray-400">Loading blog posts...</p>
                        </div>
                      ) : blogPosts.length === 0 ? (
                        <div className="py-20 text-center bg-gray-800/20 rounded-lg border border-dashed border-gray-700">
                          <Calendar size={48} className="mx-auto mb-4 text-gray-500" />
                          <h3 className="text-xl font-medium text-white mb-2">No Blog Posts Yet</h3>
                          <p className="text-gray-400 mb-6">Start creating content for your blog</p>
                          <Button 
                            className="bg-yellow-400 hover:bg-yellow-300 text-black"
                            onClick={() => setShowBlogEditor(true)}
                          >
                            <Plus size={16} className="mr-2" /> Create First Post
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {blogPosts.map(post => (
                            <Card key={post.id} className="bg-gray-800/30 border-gray-700/50">
                              <CardHeader>
                                <CardTitle className="text-white text-lg line-clamp-2">{post.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                  {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div>
                                    {post.is_published ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Published
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Draft
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                                    >
                                      <Eye size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
                                      onClick={() => {
                                        setEditingPost(post);
                                        setShowBlogEditor(true);
                                      }}
                                    >
                                      <Edit size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                      onClick={() => setDeleteConfirmation({ type: 'blog', id: post.id, title: post.title })}
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                {/* Resources Tab */}
                <TabsContent value="resources">
                  {showResourceManager ? (
                    <ResourceManager
                      resource={editingResource}
                      onSave={() => {
                        setShowResourceManager(false);
                        setEditingResource(null);
                        fetchData("resources");
                      }}
                      onClose={() => {
                        setShowResourceManager(false);
                        setEditingResource(null);
                      }}
                    />
                  ) : (
                    <>
                      <div className="mb-6">
                        <Button 
                          className="bg-yellow-400 hover:bg-yellow-300 text-black"
                          onClick={() => setShowResourceManager(true)}
                        >
                          <Plus size={16} className="mr-2" /> Add New Resource
                        </Button>
                      </div>
                      
                      {dataLoading ? (
                        <div className="py-20 text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                          <p className="text-gray-400">Loading resources...</p>
                        </div>
                      ) : resources.length === 0 ? (
                        <div className="py-20 text-center bg-gray-800/20 rounded-lg border border-dashed border-gray-700">
                          <FileText size={48} className="mx-auto mb-4 text-gray-500" />
                          <h3 className="text-xl font-medium text-white mb-2">No Resources Yet</h3>
                          <p className="text-gray-400 mb-6">Start adding eBooks, templates, and checklists</p>
                          <Button 
                            className="bg-yellow-400 hover:bg-yellow-300 text-black"
                            onClick={() => setShowResourceManager(true)}
                          >
                            <Plus size={16} className="mr-2" /> Add First Resource
                          </Button>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-300">Title</th>
                                <th className="text-left py-3 px-4 text-gray-300">Category</th>
                                <th className="text-left py-3 px-4 text-gray-300">Type</th>
                                <th className="text-left py-3 px-4 text-gray-300">Downloads</th>
                                <th className="text-left py-3 px-4 text-gray-300">Status</th>
                                <th className="text-right py-3 px-4 text-gray-300">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {resources.map(resource => (
                                <tr key={resource.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                  <td className="py-4 px-4 text-white">{resource.title}</td>
                                  <td className="py-4 px-4 text-gray-300">{resource.category}</td>
                                  <td className="py-4 px-4 text-gray-300 capitalize">{resource.type}</td>
                                  <td className="py-4 px-4 text-gray-300">{resource.download_count}</td>
                                  <td className="py-4 px-4">
                                    {resource.is_active ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        Inactive
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-4 px-4 text-right">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
                                      onClick={() => {
                                        setEditingResource(resource);
                                        setShowResourceManager(true);
                                      }}
                                    >
                                      <Edit size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                      onClick={() => setDeleteConfirmation({ type: 'resource', id: resource.id, title: resource.title })}
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                {/* Tools Tab */}
                <TabsContent value="tools">
                  <div className="py-8">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Developer Tools</h3>
                      <p className="text-gray-400 text-sm">Download guides and utilities for content management</p>
                    </div>
                    <ContentGuideDownloader />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <FooterSection />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmation} onOpenChange={(open) => !open && setDeleteConfirmation(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {deleteConfirmation?.type === 'contact' && 
                `Are you sure you want to delete the contact submission from "${deleteConfirmation.title}"? This action cannot be undone.`}
              {deleteConfirmation?.type === 'blog' && 
                `Are you sure you want to delete the blog post "${deleteConfirmation.title}"? This action cannot be undone.`}
              {deleteConfirmation?.type === 'resource' && 
                `Are you sure you want to delete the resource "${deleteConfirmation.title}"? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (!deleteConfirmation) return;
                if (deleteConfirmation.type === 'contact') {
                  deleteContact(deleteConfirmation.id);
                } else if (deleteConfirmation.type === 'blog') {
                  deleteBlogPost(deleteConfirmation.id);
                } else if (deleteConfirmation.type === 'resource') {
                  deleteResource(deleteConfirmation.id);
                }
                setDeleteConfirmation(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
