import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, Heart, Coffee, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import MusicPlayer from "@/components/MusicPlayer";
import ToolsCarousel from "@/components/ToolsCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import SchemaMarkupGenerator from "@/components/tools/SchemaMarkupGenerator";
import MetaTagGenerator from "@/components/tools/MetaTagGenerator";
import LoremIpsumGenerator from "@/components/tools/LoremIpsumGenerator";
import GradientGenerator from "@/components/tools/GradientGenerator";
import KeywordDensityChecker from "@/components/tools/KeywordDensityChecker";
import RobotsTxtGenerator from "@/components/tools/RobotsTxtGenerator";
import SitemapGenerator from "@/components/tools/SitemapGenerator";

const Tools = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Color palette state
  const [primaryColor, setPrimaryColor] = useState("#3366FF");
  const [secondaryColor, setSecondaryColor] = useState("#FF6633");
  const [accentColor, setAccentColor] = useState("#33FF99");
  const [paletteColors, setPaletteColors] = useState<string[]>([]);

  // Font pairing state
  const [headingFont, setHeadingFont] = useState("Space Grotesk");
  const [bodyFont, setBodyFont] = useState("Inter");

  // Traffic analytics state
  const [visitors, setVisitors] = useState(1200);
  const [bounceRate, setBounceRate] = useState(35);
  const [conversionRate, setConversionRate] = useState(4.2);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Generate complementary palette colors
    generateComplementaryColors(primaryColor);

    return () => clearTimeout(timer);
  }, [primaryColor]);

  const generateComplementaryColors = (baseColor: string) => {
    // Simple algorithm to generate a color palette
    // In a real app, this would be more sophisticated
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const rgb = hexToRgb(baseColor);
    const newColors = [];

    // Add tints (lighter versions)
    for (let i = 1; i <= 3; i++) {
      const factor = 0.2 * i;
      const r = Math.round(rgb.r + (255 - rgb.r) * factor);
      const g = Math.round(rgb.g + (255 - rgb.g) * factor);
      const b = Math.round(rgb.b + (255 - rgb.b) * factor);
      newColors.push(rgbToHex(r, g, b));
    }

    // Add shades (darker versions)
    for (let i = 1; i <= 3; i++) {
      const factor = 1 - 0.2 * i;
      const r = Math.round(rgb.r * factor);
      const g = Math.round(rgb.g * factor);
      const b = Math.round(rgb.b * factor);
      newColors.push(rgbToHex(r, g, b));
    }

    setPaletteColors(newColors);
  };

  // Font options
  const headingFonts = ["Space Grotesk", "Playfair Display", "Montserrat", "Roboto", "Poppins"];
  const bodyFonts = ["Inter", "Open Sans", "Lato", "Roboto", "Source Sans Pro"];

  // Human touch messages
  const humanTouchMessages = [
    { icon: Coffee, text: "Crafted with love and lots of coffee ☕" },
    { icon: Heart, text: "Made by humans who care about your success" },
    { icon: Sparkles, text: "Every pixel placed with purpose" },
    { icon: Rocket, text: "Built to help you launch faster" },
  ];

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Show locked state if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none"></div>
          <div className="absolute w-[40rem] h-[40rem] bg-yellow-400/5 rounded-full blur-3xl -top-20 -right-20 animate-pulse"></div>
          <div className="absolute w-[30rem] h-[30rem] bg-purple-400/10 rounded-full blur-2xl bottom-0 left-0 animate-pulse"></div>

          <motion.div
            className="container mx-auto px-4 relative z-10 text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-400/30"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Lock className="w-10 h-10 text-yellow-400" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Unlock Our <span className="text-yellow-400">Digital Tools</span>
            </h1>

            <p className="text-xl text-gray-300 mb-4">Hey there, creative soul! 👋</p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Our tools are like a secret garden of creativity - you just need a key to enter! Sign in to access our
              color palette generator, font pairing tool, and traffic analytics simulator. We promise it's worth it (and
              free)!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
                onClick={() => navigate("/auth")}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Sign In to Unlock
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>

            {/* Human touch section */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {humanTouchMessages.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-400 bg-gray-900/50 rounded-lg p-3 border border-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <item.icon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black page-transition">
      <Navbar />

      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none"></div>
        <div className="absolute w-[40rem] h-[40rem] bg-yellow-400/5 rounded-full blur-3xl -top-20 -right-20 animate-pulse-slow"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Digital <span className="text-yellow-400">Tools</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">Free web tools to help you with your digital projects</p>
          </div>

          {/* Music Player */}
          <div className="fixed bottom-24 right-6 z-40">
            <MusicPlayer />
          </div>

          <Tabs defaultValue="qr-code" className="w-full mt-12">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-gray-900/50 p-3 h-auto">
              <TabsTrigger value="qr-code" className="text-white text-sm px-4 py-2">
                QR Code
              </TabsTrigger>
              <TabsTrigger value="robots-txt" className="text-white text-sm px-4 py-2">
                Robots.txt
              </TabsTrigger>
              <TabsTrigger value="sitemap" className="text-white text-sm px-4 py-2">
                Sitemap
              </TabsTrigger>
              <TabsTrigger value="schema-markup" className="text-white text-sm px-4 py-2">
                Schema Markup
              </TabsTrigger>
              <TabsTrigger value="meta-tags" className="text-white text-sm px-4 py-2">
                Meta Tags
              </TabsTrigger>
              <TabsTrigger value="keyword-density" className="text-white text-sm px-4 py-2">
                Keyword Checker
              </TabsTrigger>
              <TabsTrigger value="gradient" className="text-white text-sm px-4 py-2">
                Gradients
              </TabsTrigger>
              <TabsTrigger value="lorem-ipsum" className="text-white text-sm px-4 py-2">
                Lorem Ipsum
              </TabsTrigger>
              <TabsTrigger value="color-palette" className="text-white text-sm px-4 py-2">
                Color Palette
              </TabsTrigger>
              <TabsTrigger value="font-pairing" className="text-white text-sm px-4 py-2">
                Font Pairing
              </TabsTrigger>
              <TabsTrigger value="traffic-analytics" className="text-white text-sm px-4 py-2">
                Traffic Analytics
              </TabsTrigger>
            </TabsList>

            {/* QR Code Generator */}
            <TabsContent value="qr-code" className="mt-8">
              <QRCodeGenerator />
            </TabsContent>

            {/* Robots.txt Generator */}
            <TabsContent value="robots-txt" className="mt-8">
              <RobotsTxtGenerator />
            </TabsContent>

            {/* Sitemap Generator */}
            <TabsContent value="sitemap" className="mt-8">
              <SitemapGenerator />
            </TabsContent>

            {/* Schema Markup Generator */}
            <TabsContent value="schema-markup" className="mt-8">
              <SchemaMarkupGenerator />
            </TabsContent>

            {/* Meta Tag Generator */}
            <TabsContent value="meta-tags" className="mt-8">
              <MetaTagGenerator />
            </TabsContent>

            {/* Keyword Density Checker */}
            <TabsContent value="keyword-density" className="mt-8">
              <KeywordDensityChecker />
            </TabsContent>

            {/* Gradient Generator */}
            <TabsContent value="gradient" className="mt-8">
              <GradientGenerator />
            </TabsContent>

            {/* Lorem Ipsum Generator */}
            <TabsContent value="lorem-ipsum" className="mt-8">
              <LoremIpsumGenerator />
            </TabsContent>

            {/* Color Palette Generator */}
            <TabsContent value="color-palette" className="mt-8">
              <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Generate Your Color Palette</h3>
                      <p className="text-gray-300 mb-6">
                        Pick a primary color and we'll generate a complementary palette
                      </p>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-white mb-2">Primary Color</label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-16 h-10 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="bg-gray-800 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white mb-2">Secondary Color</label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="color"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="w-16 h-10 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="bg-gray-800 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white mb-2">Accent Color</label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="color"
                              value={accentColor}
                              onChange={(e) => setAccentColor(e.target.value)}
                              className="w-16 h-10 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={accentColor}
                              onChange={(e) => setAccentColor(e.target.value)}
                              className="bg-gray-800 text-white"
                            />
                          </div>
                        </div>

                        <Button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-black">
                          Copy Color Codes
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Your Palette</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <div className="h-16 rounded-md" style={{ backgroundColor: primaryColor }}></div>
                            <p className="text-sm text-gray-300 mt-1">Primary</p>
                          </div>

                          <div>
                            <div className="h-16 rounded-md" style={{ backgroundColor: secondaryColor }}></div>
                            <p className="text-sm text-gray-300 mt-1">Secondary</p>
                          </div>

                          <div>
                            <div className="h-16 rounded-md" style={{ backgroundColor: accentColor }}></div>
                            <p className="text-sm text-gray-300 mt-1">Accent</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {paletteColors.map((color, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-md" style={{ backgroundColor: color }}></div>
                              <span className="text-xs text-gray-300">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 p-4 rounded-md bg-gray-800/50">
                        <h4 className="text-md font-bold text-white mb-2">Preview</h4>
                        <div className="p-4 rounded-md" style={{ backgroundColor: primaryColor }}>
                          <div className="p-3 rounded-md" style={{ backgroundColor: secondaryColor }}>
                            <div
                              className="p-2 rounded-md flex justify-center items-center h-12"
                              style={{ backgroundColor: accentColor }}
                            >
                              <span className="text-white font-bold">Sample Text</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Font Pairing */}
            <TabsContent value="font-pairing" className="mt-6">
              <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Font Pairing Tool</h3>
                      <p className="text-gray-300 mb-6">Select fonts to see how they work together</p>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-white mb-2">Heading Font</label>
                          <select
                            value={headingFont}
                            onChange={(e) => setHeadingFont(e.target.value)}
                            className="w-full p-2 bg-gray-800 text-white rounded-md"
                          >
                            {headingFonts.map((font) => (
                              <option key={font} value={font}>
                                {font}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-white mb-2">Body Font</label>
                          <select
                            value={bodyFont}
                            onChange={(e) => setBodyFont(e.target.value)}
                            className="w-full p-2 bg-gray-800 text-white rounded-md"
                          >
                            {bodyFonts.map((font) => (
                              <option key={font} value={font}>
                                {font}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-black">
                          Save Combination
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Preview</h3>

                      <div className="p-6 bg-gray-800/50 rounded-md">
                        <h1 style={{ fontFamily: headingFont }} className="text-3xl font-bold text-white mb-3">
                          This is a heading in {headingFont}
                        </h1>

                        <h2 style={{ fontFamily: headingFont }} className="text-xl text-yellow-400 mb-4">
                          This is a subheading
                        </h2>

                        <p style={{ fontFamily: bodyFont }} className="text-gray-300 mb-3">
                          This is paragraph text in {bodyFont}. Good typography improves readability and creates visual
                          harmony. The right font pairing can elevate your design and help communicate your message
                          effectively.
                        </p>

                        <p style={{ fontFamily: bodyFont }} className="text-gray-300">
                          A secondary paragraph with more sample text to show how the body font looks in a block of
                          content. Font pairings are crucial in establishing the right tone and hierarchy for your
                          website.
                        </p>

                        <div className="mt-6">
                          <Button
                            style={{ fontFamily: bodyFont }}
                            className="bg-yellow-400 hover:bg-yellow-300 text-black"
                          >
                            Sample Button
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-md font-bold text-white mb-2">Tips for Good Font Pairing</h4>
                        <ul className="list-disc list-inside text-gray-300 text-sm">
                          <li>Create contrast between heading and body fonts</li>
                          <li>Ensure readability is maintained</li>
                          <li>Don't use more than 2-3 fonts on a single page</li>
                          <li>Consider the mood and personality of your brand</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Traffic Analytics */}
            <TabsContent value="traffic-analytics" className="mt-6">
              <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Traffic Analytics Simulator</h3>
                      <p className="text-gray-300 mb-6">Adjust parameters to see how they affect website performance</p>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-white mb-2">Monthly Visitors: {visitors}</label>
                          <Slider
                            value={[visitors]}
                            min={100}
                            max={10000}
                            step={100}
                            onValueChange={(values) => setVisitors(values[0])}
                            className="my-4"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2">Bounce Rate: {bounceRate}%</label>
                          <Slider
                            value={[bounceRate]}
                            min={10}
                            max={90}
                            step={1}
                            onValueChange={(values) => setBounceRate(values[0])}
                            className="my-4"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2">Conversion Rate: {conversionRate}%</label>
                          <Slider
                            value={[conversionRate]}
                            min={0.1}
                            max={10}
                            step={0.1}
                            onValueChange={(values) => setConversionRate(values[0])}
                            className="my-4"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Analytics Results</h3>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gray-800/50 rounded-md">
                          <p className="text-sm text-gray-400">Engaged Users</p>
                          <p className="text-2xl font-bold text-white">
                            {Math.round(visitors * (1 - bounceRate / 100))}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-800/50 rounded-md">
                          <p className="text-sm text-gray-400">Conversions</p>
                          <p className="text-2xl font-bold text-yellow-400">
                            {Math.round(visitors * (conversionRate / 100))}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-800/50 rounded-md">
                          <p className="text-sm text-gray-400">Avg. Session</p>
                          <p className="text-2xl font-bold text-white">
                            {Math.round(2 + 10 * (1 - bounceRate / 100))}m
                          </p>
                        </div>

                        <div className="p-4 bg-gray-800/50 rounded-md">
                          <p className="text-sm text-gray-400">Est. Revenue</p>
                          <p className="text-2xl font-bold text-yellow-400">
                            ${Math.round(visitors * (conversionRate / 100) * 25)}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-800/50 rounded-md">
                        <h4 className="text-md font-bold text-white mb-3">Performance Analysis</h4>
                        <p className="text-gray-300 text-sm mb-2">
                          {bounceRate > 60
                            ? "⚠️ Your bounce rate is high. Consider improving your landing page design and content."
                            : "✅ Your bounce rate is within acceptable range."}
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                          {conversionRate < 2
                            ? "⚠️ Your conversion rate is below average. Consider optimizing your call-to-action elements."
                            : "✅ Your conversion rate is performing well."}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {visitors < 1000
                            ? "⚠️ Your traffic is low. Consider investing in SEO and marketing."
                            : "✅ Your traffic volume is healthy."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <FooterSection />
      <ScrollToTop />
      <MusicPlayer />
    </div>
  );
};

export default Tools;
