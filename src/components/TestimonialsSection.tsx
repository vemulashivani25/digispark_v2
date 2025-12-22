import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';
import AnimatedTestimonialIllustration from "@/components/testimonials/AnimatedTestimonialIllustration";

// Expanded testimonials array with 15 items
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "Working with DigiSpark transformed our digital presence. Their team delivered a beautiful website and implemented an SEO strategy that increased our organic traffic by 156% in just 3 months. Their attention to detail and strategic approach sets them apart.",
    rating: 5
  },
  {
    id: 2,
    name: "James Wilson",
    role: "CEO",
    company: "Innovate Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "When we needed to modernize our e-commerce platform, DigiSpark exceeded our expectations. Their team redesigned our user experience and optimized our conversion funnel, resulting in a 42% increase in sales within the first quarter after launch.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "HealthPlus",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "DigiSpark's HubSpot implementation streamlined our entire sales process. Their team provided exceptional training and support, making the transition smooth for our team. We've seen a 28% improvement in lead management efficiency.",
    rating: 5
  },
  {
    id: 4,
    name: "David Chen",
    role: "Founder",
    company: "StyleBox",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "The DigiSpark team took our brand to the next level with their creative direction and technical expertise. Their holistic approach to digital marketing helped us establish a cohesive brand identity across all platforms. Highly recommended!",
    rating: 4
  },
  {
    id: 5,
    name: "Michelle Parker",
    role: "Digital Strategist",
    company: "GrowthMedia",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "I've worked with many agencies over my career, but DigiSpark stands out for their strategic thinking and execution. They don't just follow instructions - they bring innovative ideas that drive real business outcomes. A true partner in our growth.",
    rating: 5
  },
  {
    id: 6,
    name: "Robert Taylor",
    role: "CTO",
    company: "NexGen Systems",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "DigiSpark's development team built a custom web application that automated our core business processes. Their technical expertise and project management made the development process smooth and delivered exactly what we needed on time and on budget.",
    rating: 5
  },
  {
    id: 7,
    name: "Jessica Adams",
    role: "Creative Director",
    company: "Design Collective",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "The branding work that DigiSpark created for our startup was phenomenal. They truly understood our vision and translated it into a visual identity that resonates with our target audience. Since launch, our brand recognition has increased dramatically.",
    rating: 5
  },
  {
    id: 8,
    name: "Thomas Williams",
    role: "E-commerce Manager",
    company: "Urban Outfitters",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "DigiSpark revamped our online store with a focus on mobile optimization and checkout simplification. The results were immediate – mobile conversions up 75% and cart abandonment down 30%. Their data-driven approach was exactly what we needed.",
    rating: 4
  },
  {
    id: 9,
    name: "Sophia Martinez",
    role: "Marketing VP",
    company: "Global Reach Inc",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "Their PPC campaign management transformed our customer acquisition strategy. Through careful audience targeting and creative optimization, DigiSpark reduced our cost per lead by 45% while increasing quality. The ROI has been exceptional.",
    rating: 5
  },
  {
    id: 10,
    name: "Daniel Brown",
    role: "Product Manager",
    company: "Tech Innovations",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "DigiSpark helped us conceptualize and build our SaaS platform from scratch. Their technical insights and user-centered design approach resulted in a product that our customers love using. User adoption exceeded our projections by 200%.",
    rating: 5
  },
  {
    id: 11,
    name: "Olivia Thompson",
    role: "Content Director",
    company: "Media Central",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "The content strategy DigiSpark developed for our brand has dramatically improved our organic reach. Their team created a comprehensive editorial calendar and SEO-optimized content that has positioned us as thought leaders in our industry.",
    rating: 4
  },
  {
    id: 12,
    name: "Marcus Johnson",
    role: "Sales Director",
    company: "Enterprise Solutions",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "Implementing DigiSpark's CRM recommendations revolutionized our sales process. The automated workflows and improved data visibility have empowered our team to close deals faster and provide better customer service throughout the sales cycle.",
    rating: 5
  },
  {
    id: 13,
    name: "Elena Vega",
    role: "UX Director",
    company: "Interactive Labs",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "DigiSpark's approach to user experience design is exceptional. They conducted thorough research and testing to create an interface that delights our users. The redesign has decreased support tickets by 60% while increasing user engagement metrics.",
    rating: 5
  },
  {
    id: 14,
    name: "Alex Zhang",
    role: "Startup Founder",
    company: "NextWave Tech",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "As a startup, we needed a partner who could help us establish our digital footprint quickly and effectively. DigiSpark delivered a complete brand identity and website that perfectly positioned us in the market and helped secure our second round of funding.",
    rating: 5
  },
  {
    id: 15,
    name: "Rebecca Clark",
    role: "Marketing Manager",
    company: "Retail Innovations",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    text: "The email marketing campaigns DigiSpark created for us have consistently outperformed industry benchmarks. Their strategic approach to segmentation and personalization has resulted in open rates 30% above average and a significant increase in customer lifetime value.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  const [api, setApi] = useState<any>(null);
  
  // Setup auto-scroll behavior
  useEffect(() => {
    if (!api || !autoScroll) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api, autoScroll]);

  const handleMouseEnter = () => {
    setAutoScroll(false);
  };
  
  const handleMouseLeave = () => {
    setAutoScroll(true);
  };
  
  const handleCardClick = (id: number) => {
    if (isExpanded === id) {
      setIsExpanded(null);
    } else {
      setIsExpanded(id);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ));
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <style>
        {`
        .testimonial-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px -10px rgba(250, 204, 21, 0.15);
        }
        
        .expanded-card {
          z-index: 50;
        }
        `}
      </style>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <AnimatedTestimonialIllustration size="large" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">What Our </span>
            <span className="text-yellow-400">Clients Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Read what our clients have to say about our services and results
          </p>
        </motion.div>
        
        {/* Horizontal infinite scrolling testimonial carousel */}
        <div 
          className="relative mx-auto max-w-7xl" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel 
            className="w-full" 
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
            setApi={setApi}
          >
            <CarouselContent className="py-4">
              {/* Double the testimonials to create a seamless looping effect */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <CarouselItem key={`${testimonial.id}-${index}`} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <motion.div
                    className={`testimonial-card group h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-yellow-400/30 px-6 py-8 relative cursor-pointer ${
                      isExpanded === testimonial.id ? 'expanded-card border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.15)]' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (index % testimonials.length) * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0px 0px 30px rgba(250, 204, 21, 0.15)"
                    }}
                    onClick={() => handleCardClick(testimonial.id)}
                  >
                    {/* Quote icon */}
                    <div className="absolute top-4 left-4 font-serif text-4xl leading-none text-yellow-400/10 group-hover:text-yellow-400/20 transition-all">"</div>
                    
                    <div className="mb-6">
                      {/* Rating stars */}
                      <div className="flex mb-2">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      {/* Testimonial text */}
                      <p className={`text-gray-300 italic relative z-10 mb-4 group-hover:text-white transition-colors ${
                        isExpanded === testimonial.id ? '' : 'line-clamp-4'
                      }`}>
                        "{testimonial.text}"
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {testimonial.role}, <span className="text-yellow-400/80">{testimonial.company}</span>
                        </p>
                      </div>
                    </div>
                    
                    {isExpanded === testimonial.id && (
                      <motion.div 
                        className="absolute bottom-2 right-2 text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Click to collapse
                      </motion.div>
                    )}
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/testimonials" 
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
          >
            View All Testimonials
            <svg 
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
