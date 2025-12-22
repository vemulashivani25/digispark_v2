import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Copy, CheckCircle2, Building, ShoppingBag, FileText, HelpCircle, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type SchemaType = "organization" | "product" | "article" | "faq" | "event" | "person";

const SchemaMarkupGenerator = () => {
  const { toast } = useToast();
  const [schemaType, setSchemaType] = useState<SchemaType>("organization");
  const [copied, setCopied] = useState(false);
  
  // Organization fields
  const [orgName, setOrgName] = useState("DigiSpark Agency");
  const [orgUrl, setOrgUrl] = useState("https://digispark.agency");
  const [orgLogo, setOrgLogo] = useState("https://digispark.agency/logo.png");
  const [orgDescription, setOrgDescription] = useState("Digital marketing and web development agency");
  const [orgPhone, setOrgPhone] = useState("+1-234-567-8900");
  const [orgEmail, setOrgEmail] = useState("contact@digispark.agency");
  
  // Product fields
  const [productName, setProductName] = useState("Premium SEO Package");
  const [productDescription, setProductDescription] = useState("Complete SEO optimization service");
  const [productPrice, setProductPrice] = useState("999");
  const [productCurrency, setProductCurrency] = useState("USD");
  const [productImage, setProductImage] = useState("https://example.com/product.jpg");
  
  // Article fields
  const [articleTitle, setArticleTitle] = useState("10 SEO Tips for 2024");
  const [articleDescription, setArticleDescription] = useState("Learn the latest SEO strategies");
  const [articleAuthor, setArticleAuthor] = useState("John Doe");
  const [articleDate, setArticleDate] = useState("2024-01-15");
  const [articleImage, setArticleImage] = useState("https://example.com/article.jpg");
  
  // FAQ fields
  const [faqItems, setFaqItems] = useState([
    { question: "What is SEO?", answer: "SEO stands for Search Engine Optimization, the practice of optimizing websites for better search rankings." },
    { question: "How long does SEO take?", answer: "SEO typically takes 3-6 months to show significant results." }
  ]);
  
  // Event fields
  const [eventName, setEventName] = useState("Digital Marketing Workshop");
  const [eventDescription, setEventDescription] = useState("Learn digital marketing strategies");
  const [eventStartDate, setEventStartDate] = useState("2024-03-15T09:00");
  const [eventEndDate, setEventEndDate] = useState("2024-03-15T17:00");
  const [eventLocation, setEventLocation] = useState("New York, NY");
  
  // Person fields
  const [personName, setPersonName] = useState("Jane Smith");
  const [personJobTitle, setPersonJobTitle] = useState("Digital Marketing Expert");
  const [personImage, setPersonImage] = useState("https://example.com/person.jpg");
  const [personUrl, setPersonUrl] = useState("https://example.com/about");

  const schemaTypes = [
    { id: "organization", icon: Building, label: "Organization" },
    { id: "product", icon: ShoppingBag, label: "Product" },
    { id: "article", icon: FileText, label: "Article" },
    { id: "faq", icon: HelpCircle, label: "FAQ" },
    { id: "event", icon: Calendar, label: "Event" },
    { id: "person", icon: User, label: "Person" },
  ];

  const generateSchema = (): string => {
    let schema: Record<string, any> = {};

    switch (schemaType) {
      case "organization":
        schema = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: orgName,
          url: orgUrl,
          logo: orgLogo,
          description: orgDescription,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: orgPhone,
            email: orgEmail,
            contactType: "customer service"
          }
        };
        break;
        
      case "product":
        schema = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: productName,
          description: productDescription,
          image: productImage,
          offers: {
            "@type": "Offer",
            price: productPrice,
            priceCurrency: productCurrency,
            availability: "https://schema.org/InStock"
          }
        };
        break;
        
      case "article":
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articleTitle,
          description: articleDescription,
          image: articleImage,
          author: {
            "@type": "Person",
            name: articleAuthor
          },
          datePublished: articleDate,
          publisher: {
            "@type": "Organization",
            name: orgName,
            logo: {
              "@type": "ImageObject",
              url: orgLogo
            }
          }
        };
        break;
        
      case "faq":
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        };
        break;
        
      case "event":
        schema = {
          "@context": "https://schema.org",
          "@type": "Event",
          name: eventName,
          description: eventDescription,
          startDate: eventStartDate,
          endDate: eventEndDate,
          location: {
            "@type": "Place",
            name: eventLocation
          },
          organizer: {
            "@type": "Organization",
            name: orgName,
            url: orgUrl
          }
        };
        break;
        
      case "person":
        schema = {
          "@context": "https://schema.org",
          "@type": "Person",
          name: personName,
          jobTitle: personJobTitle,
          image: personImage,
          url: personUrl
        };
        break;
    }

    return JSON.stringify(schema, null, 2);
  };

  const copyToClipboard = () => {
    const schemaCode = `<script type="application/ld+json">\n${generateSchema()}\n</script>`;
    navigator.clipboard.writeText(schemaCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Schema markup copied to clipboard. Add it to your HTML <head> section.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: "", answer: "" }]);
  };

  const updateFaqItem = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqItems];
    updated[index][field] = value;
    setFaqItems(updated);
  };

  const removeFaqItem = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  };

  return (
    <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-yellow-400" />
              Schema Markup Generator
            </h3>
            <p className="text-gray-300 mb-6">
              Generate structured data to improve your search results appearance and SEO.
            </p>

            {/* Schema Type Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {schemaTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSchemaType(type.id as SchemaType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    schemaType === type.id
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </motion.button>
              ))}
            </div>

            {/* Dynamic Form Fields */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {schemaType === "organization" && (
                <>
                  <div>
                    <label className="block text-white mb-2">Organization Name</label>
                    <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Website URL</label>
                    <Input value={orgUrl} onChange={(e) => setOrgUrl(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Logo URL</label>
                    <Input value={orgLogo} onChange={(e) => setOrgLogo(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <Textarea value={orgDescription} onChange={(e) => setOrgDescription(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Phone</label>
                      <Input value={orgPhone} onChange={(e) => setOrgPhone(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Email</label>
                      <Input value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                    </div>
                  </div>
                </>
              )}

              {schemaType === "product" && (
                <>
                  <div>
                    <label className="block text-white mb-2">Product Name</label>
                    <Input value={productName} onChange={(e) => setProductName(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <Textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Image URL</label>
                    <Input value={productImage} onChange={(e) => setProductImage(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Price</label>
                      <Input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Currency</label>
                      <select value={productCurrency} onChange={(e) => setProductCurrency(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {schemaType === "article" && (
                <>
                  <div>
                    <label className="block text-white mb-2">Article Title</label>
                    <Input value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <Textarea value={articleDescription} onChange={(e) => setArticleDescription(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Author</label>
                      <Input value={articleAuthor} onChange={(e) => setArticleAuthor(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Publish Date</label>
                      <Input type="date" value={articleDate} onChange={(e) => setArticleDate(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Featured Image URL</label>
                    <Input value={articleImage} onChange={(e) => setArticleImage(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                </>
              )}

              {schemaType === "faq" && (
                <>
                  {faqItems.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-yellow-400 text-sm font-medium">FAQ {index + 1}</span>
                        {faqItems.length > 1 && (
                          <button onClick={() => removeFaqItem(index)} className="text-red-400 text-xs hover:text-red-300">
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-white mb-1 text-sm">Question</label>
                          <Input value={item.question} onChange={(e) => updateFaqItem(index, "question", e.target.value)} className="bg-gray-900 text-white border-gray-600" />
                        </div>
                        <div>
                          <label className="block text-white mb-1 text-sm">Answer</label>
                          <Textarea value={item.answer} onChange={(e) => updateFaqItem(index, "answer", e.target.value)} className="bg-gray-900 text-white border-gray-600" rows={2} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addFaqItem} variant="outline" className="w-full border-dashed border-gray-600 text-gray-300">
                    + Add FAQ Item
                  </Button>
                </>
              )}

              {schemaType === "event" && (
                <>
                  <div>
                    <label className="block text-white mb-2">Event Name</label>
                    <Input value={eventName} onChange={(e) => setEventName(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <Textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Start Date & Time</label>
                      <Input type="datetime-local" value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                    </div>
                    <div>
                      <label className="block text-white mb-2">End Date & Time</label>
                      <Input type="datetime-local" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Location</label>
                    <Input value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                </>
              )}

              {schemaType === "person" && (
                <>
                  <div>
                    <label className="block text-white mb-2">Full Name</label>
                    <Input value={personName} onChange={(e) => setPersonName(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Job Title</label>
                    <Input value={personJobTitle} onChange={(e) => setPersonJobTitle(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Profile Image URL</label>
                    <Input value={personImage} onChange={(e) => setPersonImage(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Profile Page URL</label>
                    <Input value={personUrl} onChange={(e) => setPersonUrl(e.target.value)} className="bg-gray-800 text-white border-gray-700" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Generated Schema</h3>
            
            <div className="relative">
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs text-green-400 font-mono max-h-[450px] overflow-y-auto border border-gray-700">
                <code>{`<script type="application/ld+json">\n${generateSchema()}\n</script>`}</code>
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

            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h4 className="text-blue-400 font-semibold mb-2">How to use:</h4>
              <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                <li>Fill in the form fields above</li>
                <li>Click "Copy" to copy the generated schema</li>
                <li>Paste the code in your HTML {"<head>"} section</li>
                <li>Test using Google's Rich Results Test tool</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaMarkupGenerator;
