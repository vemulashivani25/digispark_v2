/**
 * Newsletter Preview Page
 * Showcases different newsletter templates with preview functionality
 * Allows users to see email designs before subscribing
 */
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import MusicPlayer from "@/components/MusicPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DOMPurify from "dompurify";

const NewsletterPreview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const newsletterTemplates = [
    {
      id: "welcome",
      name: "Welcome Email",
      subject: "Welcome to Digital Agency's Newsletter 🚀",
      previewText: "Thank you for joining our digital community!",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1A1F2C; color: #fff;">
          <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #333;">
            <h1 style="color: #fff; margin: 0;">Digital<span style="color: #EAB308;">Agency</span></h1>
          </header>
          
          <main style="padding: 20px 0;">
            <h2 style="color: #EAB308;">Welcome to Our Community!</h2>
            
            <p>Hi there,</p>
            
            <p>We're thrilled to have you join our newsletter! You're now part of a community of forward-thinking professionals and digital enthusiasts.</p>
            
            <p>Here's what you can expect from us:</p>
            
            <ul style="padding-left: 20px;">
              <li>Weekly insights on the latest digital trends</li>
              <li>Exclusive tips and tricks from our experts</li>
              <li>Free resources to help you grow</li>
              <li>Early access to our workshops and events</li>
            </ul>
            
            <div style="background: #2D3748; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0;">🎁 <strong>Welcome Gift:</strong> Claim your free digital audit by replying to this email!</p>
            </div>
            
            <p>Stay creative,</p>
            <p>The Digital Agency Team</p>
          </main>
          
          <footer style="text-align: center; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #aaa;">
            <p>© 2025 Digital Agency. All rights reserved.</p>
            <p>If you no longer wish to receive our emails, you can <a href="#" style="color: #EAB308;">unsubscribe here</a>.</p>
          </footer>
        </div>
      `
    },
    {
      id: "weekly",
      name: "Weekly Digest",
      subject: "This Week in Digital: AI Trends, SEO Tips & More",
      previewText: "Your weekly roundup of digital news and insights",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1A1F2C; color: #fff;">
          <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #333;">
            <h1 style="color: #fff; margin: 0;">Digital<span style="color: #EAB308;">Agency</span></h1>
            <p style="color: #aaa; margin-top: 5px;">Weekly Digest | April 21, 2025</p>
          </header>
          
          <main style="padding: 20px 0;">
            <h2 style="color: #EAB308;">This Week in Digital</h2>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #fff; margin-bottom: 10px;">🔥 Trending: AI-Generated Content Guidelines</h3>
              <p>Google has updated its guidelines for AI-generated content. Learn what this means for your SEO strategy and how to stay compliant while leveraging AI.</p>
              <a href="#" style="color: #EAB308; text-decoration: none;">Read More →</a>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #fff; margin-bottom: 10px;">💡 Quick Tip: Mobile Optimization</h3>
              <p>Did you know that 68% of website visits now come from mobile devices? Here's a 2-minute check to ensure your site is fully optimized.</p>
              <a href="#" style="color: #EAB308; text-decoration: none;">Read More →</a>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #fff; margin-bottom: 10px;">🎯 Featured Case Study</h3>
              <p>How we helped TechStart increase their conversion rate by 45% through UX improvements and strategic content positioning.</p>
              <a href="#" style="color: #EAB308; text-decoration: none;">Read More →</a>
            </div>
            
            <div style="background: #2D3748; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
              <p style="margin: 0 0 10px 0;"><strong>Upcoming Webinar: Mastering Digital Analytics</strong></p>
              <p style="margin: 0 0 15px 0;">April 28, 2025 • 2:00 PM EST</p>
              <a href="#" style="background: #EAB308; color: #000; padding: 8px 15px; border-radius: 4px; text-decoration: none; display: inline-block;">Reserve Your Spot</a>
            </div>
          </main>
          
          <footer style="text-align: center; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #aaa;">
            <p>© 2025 Digital Agency. All rights reserved.</p>
            <p>If you no longer wish to receive our emails, you can <a href="#" style="color: #EAB308;">unsubscribe here</a>.</p>
          </footer>
        </div>
      `
    },
    {
      id: "promo",
      name: "Promotional Offer",
      subject: "🔥 Special Offer: 25% Off All Digital Services",
      previewText: "Limited time offer for our newsletter subscribers",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1A1F2C; color: #fff;">
          <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #333;">
            <h1 style="color: #fff; margin: 0;">Digital<span style="color: #EAB308;">Agency</span></h1>
          </header>
          
          <main style="padding: 20px 0;">
            <div style="background: #EAB308; padding: 20px; border-radius: 5px; text-align: center; margin-bottom: 25px;">
              <h2 style="color: #000; margin-top: 0;">LIMITED TIME OFFER</h2>
              <p style="color: #000; font-size: 18px; margin-bottom: 0;">Get <strong>25% OFF</strong> all digital services</p>
              <p style="color: #000; font-size: 14px; margin-top: 5px;">Offer valid until April 30, 2025</p>
            </div>
            
            <h3 style="color: #EAB308;">Dear Valued Subscriber,</h3>
            
            <p>As a thank you for being part of our community, we're offering an exclusive discount on all our digital services!</p>
            
            <div style="margin: 25px 0;">
              <div style="background: #2D3748; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <h4 style="color: #EAB308; margin-top: 0;">Website Design & Development</h4>
                <p style="margin-bottom: 0;">Transform your online presence with a custom, responsive website that converts visitors into customers.</p>
              </div>
              
              <div style="background: #2D3748; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <h4 style="color: #EAB308; margin-top: 0;">SEO & Content Strategy</h4>
                <p style="margin-bottom: 0;">Climb the search rankings and engage your audience with data-driven SEO and compelling content.</p>
              </div>
              
              <div style="background: #2D3748; padding: 15px; border-radius: 5px;">
                <h4 style="color: #EAB308; margin-top: 0;">Digital Marketing Campaigns</h4>
                <p style="margin-bottom: 0;">Reach your target audience and drive conversions with strategic, multi-channel marketing campaigns.</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #EAB308; color: #000; padding: 12px 25px; border-radius: 4px; text-decoration: none; display: inline-block; font-weight: bold;">CLAIM YOUR 25% OFF</a>
              <p style="color: #aaa; margin-top: 10px; font-size: 14px;">Use code: <strong>SPRING25</strong> at checkout</p>
            </div>
            
            <p>Have questions? Reply directly to this email or contact our team at support@digitalagency.com.</p>
            
            <p>Best regards,<br>The Digital Agency Team</p>
          </main>
          
          <footer style="text-align: center; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #aaa;">
            <p>© 2025 Digital Agency. All rights reserved.</p>
            <p>Terms and conditions apply. Cannot be combined with other offers.</p>
            <p>If you no longer wish to receive our emails, you can <a href="#" style="color: #EAB308;">unsubscribe here</a>.</p>
          </footer>
        </div>
      `
    }
  ];
  
  const [activeTemplate, setActiveTemplate] = useState(newsletterTemplates[0]);
  
  return (
    <div className="min-h-screen bg-black page-transition">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Newsletter Preview | DigiSpark - Email Marketing Templates</title>
        <meta 
          name="description" 
          content="Preview our professionally designed newsletter templates. See what you'll receive when you subscribe to DigiSpark's digital marketing insights and updates." 
        />
        <meta 
          name="keywords" 
          content="newsletter preview, email templates, digital marketing newsletter, email design, subscribe newsletter, marketing updates" 
        />
        <meta property="og:title" content="Newsletter Preview | DigiSpark" />
        <meta property="og:description" content="Preview our newsletter templates before subscribing." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/newsletter-preview" />
      </Helmet>
      
      <Navbar />
      
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none"></div>
        <div className="absolute w-[40rem] h-[40rem] bg-yellow-400/5 rounded-full blur-3xl -top-20 -right-20 animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Newsletter <span className="text-yellow-400">Preview</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              See what our newsletters look like before you subscribe
            </p>
            
            <div className="max-w-md mx-auto mb-12">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-gray-800/50 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-black">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Join 5,000+ subscribers. No spam, just the good stuff.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900/30 backdrop-blur-md rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Email Preview Gallery</h2>
            
            <Tabs defaultValue={activeTemplate.id} onValueChange={(value) => {
              const template = newsletterTemplates.find(t => t.id === value);
              if (template) setActiveTemplate(template);
            }}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                {newsletterTemplates.map(template => (
                  <TabsTrigger 
                    key={template.id} 
                    value={template.id}
                    className="text-white"
                  >
                    {template.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {newsletterTemplates.map(template => (
                <TabsContent key={template.id} value={template.id} className="mt-6">
                  <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div className="bg-gray-800 rounded-t-lg p-4 flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="flex-1 text-center">
                            <p className="text-sm text-gray-400">Email Preview</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-700 px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-600">
                          <div>
                            <p className="text-sm text-gray-300"><span className="font-bold">From:</span> Digital Agency &lt;newsletter@digitalagency.com&gt;</p>
                            <p className="text-sm text-gray-300"><span className="font-bold">Subject:</span> {template.subject}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <p className="text-xs text-gray-400">Preview: {template.previewText}</p>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-b-lg p-1">
                          <div className="overflow-auto max-h-[500px] email-preview" 
                            dangerouslySetInnerHTML={{ 
                              __html: DOMPurify.sanitize(template.content, {
                                ALLOWED_TAGS: ['div', 'header', 'main', 'footer', 'h1', 'h2', 'h3', 'h4', 'p', 'span', 'strong', 'a', 'ul', 'ol', 'li', 'br'],
                                ALLOWED_ATTR: ['style', 'href', 'class'],
                                ALLOW_DATA_ATTR: false,
                              })
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">About This Template</h3>
                          <p className="text-gray-300 text-sm mb-4">
                            This is our {template.name.toLowerCase()} template, designed to {
                              template.id === 'welcome' ? 'welcome new subscribers to our newsletter community.' :
                              template.id === 'weekly' ? 'keep our audience informed with a weekly roundup of digital insights.' :
                              'promote special offers and drive conversions through limited-time promotions.'
                            }
                          </p>
                          <div className="bg-gray-800/50 p-4 rounded-md">
                            <h4 className="text-yellow-400 font-bold text-sm mb-2">Key Features:</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Mobile-responsive design</li>
                              <li>• Optimized for deliverability</li>
                              <li>• Eye-catching CTAs</li>
                              <li>• Accessible color contrast</li>
                              <li>• GDPR-compliant unsubscribe option</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">Performance Stats</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 p-4 rounded-md">
                              <p className="text-gray-400 text-xs">Open Rate</p>
                              <p className="text-2xl font-bold text-yellow-400">
                                {template.id === 'welcome' ? '72%' : template.id === 'weekly' ? '48%' : '55%'}
                              </p>
                              <p className="text-xs text-gray-400">
                                {template.id === 'welcome' ? '+24%' : template.id === 'weekly' ? '+5%' : '+10%'} above industry avg
                              </p>
                            </div>
                            
                            <div className="bg-gray-800/50 p-4 rounded-md">
                              <p className="text-gray-400 text-xs">Click Rate</p>
                              <p className="text-2xl font-bold text-yellow-400">
                                {template.id === 'welcome' ? '28%' : template.id === 'weekly' ? '12%' : '19%'}
                              </p>
                              <p className="text-xs text-gray-400">
                                {template.id === 'welcome' ? '+15%' : template.id === 'weekly' ? '+4%' : '+8%'} above industry avg
                              </p>
                            </div>
                            
                            <div className="bg-gray-800/50 p-4 rounded-md">
                              <p className="text-gray-400 text-xs">Avg Response Time</p>
                              <p className="text-2xl font-bold text-white">
                                {template.id === 'welcome' ? '1.2h' : template.id === 'weekly' ? '6.5h' : '3.8h'}
                              </p>
                            </div>
                            
                            <div className="bg-gray-800/50 p-4 rounded-md">
                              <p className="text-gray-400 text-xs">Conversion</p>
                              <p className="text-2xl font-bold text-white">
                                {template.id === 'welcome' ? '5.2%' : template.id === 'weekly' ? '3.1%' : '7.4%'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
      
      <FooterSection />
      <MusicPlayer />
    </div>
  );
};

export default NewsletterPreview;
