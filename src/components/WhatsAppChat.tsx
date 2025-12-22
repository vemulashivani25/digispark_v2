import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Users, CheckCheck, Clock, HelpCircle, Mail } from "lucide-react";
import { toast } from "./ui/use-toast";

interface WhatsAppChatProps {
  phoneNumber: string;
}

// Knowledge base questions and answers
const knowledgeBase = [
  {
    question: "What services does DigiSpark offer?",
    answer: "DigiSpark offers comprehensive digital services including web development, HubSpot CRM integration, SEO, social media marketing, email marketing, and virtual assistance."
  },
  {
    question: "How much does a website cost?",
    answer: "Website costs vary based on complexity, features, and design requirements. Our projects typically range from $3,000 to $25,000. We recommend scheduling a consultation for a custom quote tailored to your specific needs."
  },
  {
    question: "How long does it take to build a website?",
    answer: "A typical website takes 4-8 weeks depending on complexity and requirements. Simple landing pages can be ready in 2 weeks, while complex e-commerce or custom platforms may take 12+ weeks. We'll provide a timeline during our initial consultation."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, DigiSpark offers various maintenance and support packages to ensure your digital assets remain secure, updated, and performing optimally. Ask us about our monthly support plans!"
  },
  {
    question: "How does DigiSpark approach SEO?",
    answer: "Our SEO approach combines technical optimization, content strategy, keyword research, and link building to improve your visibility in search results and drive targeted traffic. We create custom strategies based on your industry and competition."
  },
  {
    question: "What industries do you work with?",
    answer: "DigiSpark works with businesses across various industries including healthcare, education, finance, e-commerce, real estate, hospitality, and technology. We tailor our solutions to meet the specific needs of each industry."
  },
  {
    question: "Can you help with branding and logo design?",
    answer: "Yes! Our creative team specializes in brand identity development including logo design, color palettes, typography selection, and brand guidelines. We can create a cohesive brand identity that resonates with your target audience."
  },
  {
    question: "What is your process for developing a website?",
    answer: "Our web development process includes discovery, planning, design, development, testing, launch, and post-launch support. We maintain transparent communication throughout to ensure the final product meets your expectations."
  }
];

// Add more context-aware responses for different user inputs
const contextResponses = [
  {
    keywords: ["price", "cost", "how much", "pricing", "quote", "estimate", "budget"],
    response: "Our pricing depends on your specific needs and project scope. For a customized quote, I'd be happy to connect you with our sales team. Would you like to share more details about your project requirements?"
  },
  {
    keywords: ["discount", "deal", "offer", "promotion", "special"],
    response: "We occasionally offer special promotions for new clients or specific services. I'd be happy to check if there are any current offers that match your needs. What specific services are you interested in?"
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello there! Thanks for reaching out to DigiSpark. How can we help you today? Feel free to ask about our services or share details about your project."
  },
  {
    keywords: ["thanks", "thank you", "appreciate", "grateful"],
    response: "You're very welcome! We appreciate your interest in DigiSpark. Is there anything else I can help you with today?"
  },
  {
    keywords: ["portfolio", "examples", "work", "clients", "projects"],
    response: "We have an extensive portfolio of successful projects across various industries. You can check our success stories section on the website, or I can connect you with our team to share case studies relevant to your industry."
  },
  {
    keywords: ["contact", "talk", "call", "reach"],
    response: "I'd be happy to connect you with our team! You can either continue chatting here, schedule a call, or we can have someone reach out to you via email. What works best for you?"
  },
  {
    keywords: ["time", "timeline", "how long", "schedule", "deadline"],
    response: "Project timelines vary based on complexity and scope. After understanding your requirements, we can provide a detailed timeline. When are you hoping to launch or complete your project?"
  }
];

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to DigiSpark. How can we help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [hasShownFollowup, setHasShownFollowup] = useState(false);
  const [chatSummary, setChatSummary] = useState<string[]>([]);
  const formattedNumber = phoneNumber.replace(/\D/g, "");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Remove automatic popup
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!isOpen && openCount === 0) {
  //       setIsOpen(true);
  //       setOpenCount(prev => prev + 1);
  //     }
  //   }, 15000); // 15 seconds
    
  //   return () => clearTimeout(timer);
  // }, [isOpen, openCount]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const endChat = () => {
    toast({
      title: "Chat Ended",
      description: "Thanks for chatting with us. Have a great day!",
    });
    setIsOpen(false);
    setTimeout(() => {
      // Reset chat state
      setMessages([{
        id: 1,
        text: "Hi there! 👋 Welcome to DigiSpark. How can we help you today?",
        isUser: false,
        timestamp: new Date()
      }]);
      setInputValue("");
      setShowSuggestions(true);
      setUserInteracted(false);
      setHasShownFollowup(false);
      setChatSummary([]);
    }, 500);
  };
  
  const redirectToWhatsApp = () => {
    // Generate a message summary before redirecting
    const summary = chatSummary.join("\n");
    const message = `Hi, I was chatting on the DigiSpark website about:\n\n${summary}\n\nI'd like to continue the conversation.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedNumber}?text=${encoded}`, "_blank");
    
    // Show toast notification
    toast({
      title: "Continuing on WhatsApp",
      description: "We've prepared a summary of our conversation to continue on WhatsApp.",
    });
  };

  const sendChatSummaryEmail = () => {
    // In a real implementation, this would send an API request
    // For now, we'll just simulate it
    const summary = chatSummary.join("\n");
    console.log("Sending email with chat summary:", summary);
    
    toast({
      title: "Chat Summary Sent",
      description: "We've sent a summary of this conversation to your email.",
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Add suggestion follow-up after user's first message
  useEffect(() => {
    if (userInteracted && !hasShownFollowup) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            text: "Would you like to discuss your project requirements or schedule a consultation call?",
            isUser: false,
            timestamp: new Date()
          }]);
          setIsTyping(false);
          setHasShownFollowup(true);
          setChatSummary(prev => [...prev, "Bot: Would you like to discuss your project requirements or schedule a consultation call?"]);
        }, 1500);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [userInteracted, hasShownFollowup]);

  // Function to find a contextual response
  const findContextResponse = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase();
    
    // First check knowledge base for exact matches
    for (const kb of knowledgeBase) {
      if (lowercaseInput.includes(kb.question.toLowerCase().replace("?", ""))) {
        return kb.answer;
      }
    }
    
    // Then check for keyword matches in contextResponses
    for (const ctx of contextResponses) {
      if (ctx.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return ctx.response;
      }
    }
    
    return null;
  };

  const generateResponse = (userMessage: string): string => {
    // Check if there's a context-specific response
    const contextResponse = findContextResponse(userMessage);
    if (contextResponse) return contextResponse;
    
    // Check for common questions or intents
    if (userMessage.toLowerCase().includes("help") || userMessage.toLowerCase().includes("support")) {
      return "I'd be happy to help! Could you tell me more about what you need assistance with? Our team specializes in web development, digital marketing, SEO, and more.";
    }
    
    if (userMessage.toLowerCase().includes("contact") || userMessage.toLowerCase().includes("talk to")) {
      return "You can reach our team via email at info@digispark.com or by phone at +1 (555) 123-4567. Would you prefer that we contact you instead?";
    }
    
    // Default response if no specific match found
    return "Thank you for your message. Our DigiSpark team would love to learn more about your project. Would you like to schedule a call with one of our experts or continue the conversation on WhatsApp for faster assistance?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatSummary(prev => [...prev, `User: ${inputValue}`]);
    setInputValue("");
    setShowSuggestions(false);
    setUserInteracted(true);
    
    // Simulate response
    setIsTyping(true);
    setTimeout(() => {
      const responseText = generateResponse(userMessage.text);
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      }]);
      
      setChatSummary(prev => [...prev, `Bot: ${responseText}`]);
      setIsTyping(false);
      
      // After several messages, offer to send summary to email
      if (messages.filter(m => m.isUser).length >= 2 && !messages.some(m => m.text.includes("email summary"))) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            text: "Would you like me to email you a summary of our conversation for your reference?",
            isUser: false,
            timestamp: new Date()
          }]);
        }, 2000);
      }
      
      // After several messages, suggest a specific call to action
      if (messages.filter(m => m.isUser).length >= 3 && !messages.some(m => m.text.includes("specific needs"))) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            text: "To better understand your specific needs, would you like to schedule a free 30-minute consultation with one of our experts?",
            isUser: false,
            timestamp: new Date()
          }]);
          
          setChatSummary(prev => [...prev, "Bot: Offered a free 30-minute consultation"]);
        }, 3000);
      }
    }, 1500);
  };

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
    setShowSuggestions(false);
    
    // Auto submit after selecting a suggestion
    const userMessage = {
      id: Date.now(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatSummary(prev => [...prev, `User: ${question}`]);
    setUserInteracted(true);
    
    // Simulate response
    setIsTyping(true);
    setTimeout(() => {
      const matchedItem = knowledgeBase.find(
        item => item.question === question
      );
      
      const responseText = matchedItem?.answer || "Thank you for your question. Our team will get back to you shortly.";
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      }]);
      
      setChatSummary(prev => [...prev, `Bot: ${responseText}`]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Button - More compact styling */}
      <div className="fixed bottom-4 right-4 z-30">
        <motion.button
          className={`p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300
            ${isOpen ? "bg-gray-700" : "bg-yellow-400 hover:bg-yellow-500"}`}
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageSquare className="w-5 h-5 text-black" />
          )}
        </motion.button>
      </div>

      {/* Chat Window - More compact styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.25 }}
            className="fixed bottom-16 right-4 w-72 sm:w-80 z-30"
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
              {/* Chat Header */}
              <div className="bg-yellow-400 p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="DigiSpark Logo"
                      className="h-5 w-auto"
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-black font-medium text-sm">DigiSpark Support</h3>
                    <div className="flex items-center text-gray-800 text-xs">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                        <span className="text-xs">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={endChat}
                    className="text-xs bg-black/10 hover:bg-black/20 px-2 py-1 rounded text-black font-medium transition-colors"
                  >
                    End Chat
                  </button>
                  <button 
                    onClick={toggleChat} 
                    className="p-1 rounded hover:bg-black/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="p-3 bg-gray-50 h-64 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-2 flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-2 rounded-lg shadow-sm max-w-[85%] relative
                        ${
                          message.isUser
                            ? "bg-yellow-400 text-black"
                            : "bg-white text-gray-700 border border-gray-200"
                        }`}
                    >
                      <p className="text-xs">{message.text}</p>
                      <p
                        className={`text-[10px] text-right mt-1 
                          ${message.isUser ? "text-yellow-900/70" : "text-gray-400"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {message.isUser && (
                        <div className="absolute -bottom-1 right-1">
                          <CheckCheck className={`h-2.5 w-2.5 text-yellow-900/70`} />
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
                {isTyping && (
                  <div className="mb-2 flex justify-start">
                    <motion.div 
                      className="p-2 rounded-lg shadow-sm max-w-[80%] bg-white text-gray-700 border border-gray-200"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        transition: { 
                          repeat: Infinity,
                          duration: 1.5
                        }
                      }}
                    >
                      <div className="flex items-center space-x-1">
                        <Loader2 className="h-3 w-3 animate-spin text-yellow-500" />
                        <p className="text-xs text-gray-500">Typing...</p>
                      </div>
                    </motion.div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {showSuggestions && !userInteracted && (
                <div className="px-3 py-2 bg-gray-100 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1.5">
                    <HelpCircle className="w-3 h-3 inline mr-1" />
                    FAQ
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {knowledgeBase.slice(0, 3).map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(item.question)}
                        className="text-xs text-left py-1.5 px-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(250, 250, 250)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="p-2 border-t">
                <div className="flex items-center">
                  <input
                    type="text"
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-1.5 text-sm border rounded-l-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                  <motion.button
                    type="submit"
                    className="bg-yellow-400 text-black p-1.5 rounded-r-md hover:bg-yellow-500"
                    disabled={!inputValue.trim()}
                    whileHover={{ backgroundColor: "#eab308" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </div>
              </form>

              {/* Chat Actions */}
              <div className="p-2 border-t">
                <motion.button
                  onClick={redirectToWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-md w-full flex items-center justify-center font-medium transition-colors text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  Continue with a Live Agent
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppChat;
