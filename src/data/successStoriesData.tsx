
import { Code, Globe, Database, Shield, Lightbulb, Network, Server, Star, BarChart3, MessageCircle, Mail, Users, Smartphone, TrendingUp, Rocket, Briefcase } from "lucide-react";
import { SuccessStory } from "@/types/successStory";
import { createLogoFallback } from "@/utils/avatarFallback";

export const successStories: SuccessStory[] = [
  {
    id: 1,
    title: "E-commerce Platform Transformation",
    client: "FashionLoop",
    industry: "Retail",
    services: ["UX Design", "Web Development", "SEO", "Analytics"],
    challenge: "FashionLoop struggled with low conversion rates and high cart abandonment on their legacy e-commerce platform. Their mobile experience was particularly poor, with load times exceeding industry standards by 300%.",
    solution: "Complete platform redesign with enhanced UX and optimized checkout flow. We rebuilt their storefront using React for the frontend and implemented performance optimizations including lazy loading, image optimization, and server-side rendering.",
    result: "37% increase in conversions, 42% decrease in cart abandonment, and mobile sales grew by 64% within the first quarter after launch.",
    testimonial: "Our online store transformation exceeded expectations. Customer feedback has been overwhelmingly positive, and the impact on our bottom line was immediate and substantial.",
    clientLogo: createLogoFallback("FashionLoop", 150),
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    icon: Globe,
    metrics: [
      { label: "Conversion Rate", value: "+37%" },
      { label: "Cart Abandonment", value: "-42%" },
      { label: "Mobile Sales", value: "+64%" }
    ]
  },
  {
    id: 2,
    title: "SaaS Platform Launch",
    client: "TechFlow Solutions",
    industry: "Technology",
    services: ["Web Development", "UI/UX Design", "Cloud Infrastructure"],
    challenge: "Launching a complex B2B SaaS platform with tight deadlines and ambitious feature requirements. The client needed a scalable solution that could handle enterprise-level data processing while maintaining an intuitive user experience.",
    solution: "Agile development with modular architecture and automated testing. Our team implemented a microservices architecture on AWS, with a React frontend and comprehensive API documentation for third-party integrations.",
    result: "Successful launch with 200+ enterprise clients onboarded in Q1, 94% user retention rate, and system performance maintaining 99.9% uptime even under peak load.",
    testimonial: "The platform has become our most valuable asset, setting new industry standards. The architecture decisions made by the team have proven invaluable as we've scaled beyond our initial projections.",
    clientLogo: createLogoFallback("TechFlow", 150),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    icon: Server,
    metrics: [
      { label: "Enterprise Clients", value: "200+" },
      { label: "User Retention", value: "94%" },
      { label: "Performance", value: "99.9%" }
    ]
  },
  {
    id: 3,
    title: "Digital Transformation",
    client: "Global Finance Corp",
    industry: "Finance",
    services: ["Cloud Migration", "Security", "DevOps"],
    challenge: "Modernizing legacy systems while maintaining security compliance and zero downtime. The client operated in a highly regulated industry with over 50TB of sensitive data stored across disparate systems.",
    solution: "Phased migration with enhanced security protocols and monitoring. We implemented a cloud-native architecture with comprehensive security testing, automated compliance checks, and real-time monitoring.",
    result: "45% cost reduction in infrastructure, 99.99% uptime during and after migration, zero security incidents, and 78% improvement in process efficiency.",
    testimonial: "The modernization has transformed our operations, making us more agile and secure. What impressed us most was the meticulous planning that ensured zero downtime during the transition.",
    clientLogo: createLogoFallback("GlobalFinance", 150),
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    icon: Shield,
    metrics: [
      { label: "Cost Savings", value: "45%" },
      { label: "System Uptime", value: "99.99%" },
      { label: "Process Speed", value: "+78%" }
    ]
  },
  {
    id: 4,
    title: "HubSpot CRM Implementation",
    client: "Nexus Marketing",
    industry: "Marketing",
    services: ["HubSpot CRM", "Data Migration", "Automation"],
    challenge: "Fragmented customer data across multiple systems resulted in inefficient processes and missed opportunities. The sales team was spending 15+ hours weekly on manual data entry and reporting.",
    solution: "Full HubSpot CRM implementation with custom integrations to existing tools and automated workflows. We designed a comprehensive migration strategy and created custom dashboards for real-time performance monitoring.",
    result: "68% reduction in administrative tasks, 42% increase in lead qualification rate, and 23% improvement in customer retention through better follow-up processes.",
    testimonial: "The HubSpot implementation has revolutionized how our teams collaborate. We now have a single source of truth for customer data and automated processes that have freed our sales team to focus on relationships rather than paperwork.",
    clientLogo: createLogoFallback("NexusM", 150),
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    icon: Database,
    metrics: [
      { label: "Time Saved", value: "15+ hrs/week" },
      { label: "Lead Quality", value: "+42%" },
      { label: "Retention Rate", value: "+23%" }
    ]
  },
  {
    id: 5,
    title: "SEO & Content Strategy",
    client: "Wellness Collective",
    industry: "Health & Wellness",
    services: ["SEO", "Content Marketing", "Analytics"],
    challenge: "Despite quality content and services, the client struggled with low organic visibility and high customer acquisition costs through paid channels only.",
    solution: "Comprehensive SEO audit followed by technical fixes, content optimization, and strategic keyword targeting. We developed a content calendar aligned with search trends and implemented structured data markup for enhanced SERP features.",
    result: "312% increase in organic traffic within 6 months, first page rankings for 83% of target keywords, and 57% reduction in customer acquisition costs.",
    testimonial: "The SEO strategy transformed our digital presence from invisible to industry-leading. We're now ranking for keywords we couldn't even imagine targeting before, and the quality of leads coming from organic search is exceptional.",
    clientLogo: createLogoFallback("Wellness", 150),
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f01a",
    icon: BarChart3,
    metrics: [
      { label: "Organic Traffic", value: "+312%" },
      { label: "First Page Keywords", value: "83%" },
      { label: "Cost Per Lead", value: "-57%" }
    ]
  },
  {
    id: 6,
    title: "Social Media Growth Campaign",
    client: "Urban Eats Delivery",
    industry: "Food & Beverage",
    services: ["Social Media Marketing", "Content Creation", "Paid Advertising"],
    challenge: "A new food delivery service needed to establish brand presence and drive app downloads in a highly competitive market dominated by established players.",
    solution: "Multi-platform social media strategy with influencer partnerships, user-generated content campaigns, and targeted ads. We created a distinct brand voice and visual identity that stood out in the crowded delivery space.",
    result: "275,000+ app downloads in the first quarter, 82% increase in brand mentions, and customer acquisition cost 37% below industry average.",
    testimonial: "The social media strategy catapulted our brand from unknown to unmissable in our target markets. The creative approach to content and strategic influencer partnerships delivered results far beyond our expectations.",
    clientLogo: createLogoFallback("UrbanEats", 150),
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    icon: MessageCircle,
    metrics: [
      { label: "App Downloads", value: "275k+" },
      { label: "Brand Mentions", value: "+82%" },
      { label: "Acquisition Cost", value: "-37%" }
    ]
  },
  {
    id: 7,
    title: "Email Marketing Revamp",
    client: "Luxury Timepieces",
    industry: "Luxury Retail",
    services: ["Email Marketing", "Segmentation", "Automation"],
    challenge: "Generic email campaigns with low open rates (12%) and even lower conversion rates (0.8%). The client had a valuable customer database but wasn't effectively monetizing it.",
    solution: "Complete email strategy redesign with advanced segmentation, personalized content, and behavior-triggered automation. We implemented abandoned cart recovery, post-purchase sequences, and VIP customer journeys.",
    result: "Open rates increased to 38%, click-through rates reached 12%, and email-attributed revenue grew by 215% year-over-year.",
    testimonial: "The sophistication of the email marketing program has transformed this channel from an afterthought to our highest ROI marketing activity. The personalized approach has also significantly improved customer feedback scores.",
    clientLogo: createLogoFallback("LuxuryTime", 150),
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
    icon: Mail,
    metrics: [
      { label: "Open Rate", value: "38%" },
      { label: "Click Rate", value: "12%" },
      { label: "Revenue Growth", value: "+215%" }
    ]
  },
  {
    id: 8,
    title: "Virtual Team Implementation",
    client: "Global Consulting Group",
    industry: "Business Services",
    services: ["Virtual Assistance", "Process Optimization", "Team Training"],
    challenge: "Escalating operational costs and inconsistent client support across multiple time zones. Senior consultants were spending 40% of their time on administrative tasks.",
    solution: "Implemented a dedicated team of 12 virtual assistants with specialized roles, custom training, and clear workflows. We created process documentation, quality control measures, and performance tracking systems.",
    result: "Operational costs reduced by 42%, client satisfaction scores improved by 35%, and senior consultant productivity increased by 28% with more billable hours.",
    testimonial: "The virtual team has become an indispensable extension of our business. The quality of support, attention to detail, and proactive approach has exceeded our expectations and allowed our consultants to focus on high-value activities.",
    clientLogo: createLogoFallback("GCG", 150),
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    icon: Users,
    metrics: [
      { label: "Cost Reduction", value: "42%" },
      { label: "Client Satisfaction", value: "+35%" },
      { label: "Productivity", value: "+28%" }
    ]
  },
  {
    id: 9,
    title: "Mobile App Development",
    client: "HealthTrack",
    industry: "Healthcare",
    services: ["Mobile Development", "UX Design", "API Integration"],
    challenge: "Creating a HIPAA-compliant health monitoring app with seamless integration to multiple wearable devices and electronic health record systems.",
    solution: "Developed a cross-platform mobile app with end-to-end encryption, secure cloud storage, and real-time data synchronization. We implemented an intuitive interface with accessibility features and comprehensive API connections.",
    result: "App achieved 4.8/5 rating on app stores, 92% user retention after 3 months, and secured partnerships with 3 major healthcare providers for wider distribution.",
    testimonial: "The app has been transformative for patient engagement. The thoughtful UX design makes complex health data understandable, while the robust backend ensures seamless operation across devices and systems.",
    clientLogo: createLogoFallback("HealthTrack", 150),
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    icon: Smartphone,
    metrics: [
      { label: "App Rating", value: "4.8/5" },
      { label: "User Retention", value: "92%" },
      { label: "Healthcare Partners", value: "3" }
    ]
  },
  {
    id: 10,
    title: "E-learning Platform Development",
    client: "EduReach Academy",
    industry: "Education",
    services: ["Web Development", "Content Management", "Payment Integration"],
    challenge: "Building a scalable e-learning platform that could handle video content, interactive assessments, and user progress tracking while maintaining fast load times.",
    solution: "Custom learning management system with optimized video delivery, interactive quiz modules, and comprehensive analytics dashboard. We implemented adaptive learning features and gamification elements to boost engagement.",
    result: "93% course completion rate (industry average: 62%), 4.5x increase in student enrollment within 12 months, and 89% of users reporting high satisfaction.",
    testimonial: "The platform has exceeded our expectations in both functionality and performance. The intuitive interface for course creators and engaging experience for students has positioned us as a leader in online education.",
    clientLogo: createLogoFallback("EduReach", 150),
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
    icon: Code,
    metrics: [
      { label: "Completion Rate", value: "93%" },
      { label: "Enrollment Growth", value: "4.5x" },
      { label: "User Satisfaction", value: "89%" }
    ]
  },
  {
    id: 11,
    title: "Lead Generation Campaign",
    client: "PropTech Solutions",
    industry: "Real Estate Technology",
    services: ["Digital Marketing", "Landing Page Optimization", "CRM Integration"],
    challenge: "Newly launched real estate technology platform needed to generate qualified leads while establishing market position against entrenched competitors.",
    solution: "Multi-channel lead generation campaign with industry-specific content, targeted advertising, and high-converting landing pages. We implemented advanced lead scoring and nurturing sequences in their CRM.",
    result: "485 qualified leads generated in the first month (162% above target), 28% lead-to-demo conversion rate, and 68% reduction in cost per qualified lead.",
    testimonial: "The lead generation campaign delivered not just quantity but exceptional quality. The strategic approach to targeting and messaging differentiated us from competitors and has been instrumental in our rapid growth.",
    clientLogo: createLogoFallback("PropTech", 150),
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    icon: TrendingUp,
    metrics: [
      { label: "Qualified Leads", value: "162%" },
      { label: "Demo Conversion", value: "28%" },
      { label: "Cost Reduction", value: "68%" }
    ]
  },
  {
    id: 12,
    title: "Corporate Website Redesign",
    client: "Meridian Legal Associates",
    industry: "Legal Services",
    services: ["Web Design", "Content Strategy", "SEO"],
    challenge: "Prestigious law firm with dated website that failed to communicate expertise, generate leads, or rank for relevant search terms in competitive markets.",
    solution: "Comprehensive website redesign with practice area-focused content, attorney profiles, case studies, and strategic calls-to-action. We optimized the site architecture and implemented local SEO strategies for multiple office locations.",
    result: "115% increase in organic traffic, 73% improvement in page engagement time, and 92% increase in qualified case inquiry submissions.",
    testimonial: "The redesigned website perfectly balances professionalism with accessibility. It effectively communicates our expertise while making it easy for potential clients to take the next step. The improvement in lead quality has been remarkable.",
    clientLogo: createLogoFallback("MeridianLaw", 150),
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    icon: Globe,
    metrics: [
      { label: "Organic Traffic", value: "+115%" },
      { label: "Engagement Time", value: "+73%" },
      { label: "Case Inquiries", value: "+92%" }
    ]
  },
  {
    id: 13,
    title: "Product Launch Campaign",
    client: "EcoLife Innovations",
    industry: "Consumer Goods",
    services: ["Go-to-Market Strategy", "Digital Marketing", "PR"],
    challenge: "Launching a new eco-friendly product line with limited brand recognition and entering a market dominated by established players with larger marketing budgets.",
    solution: "Integrated product launch strategy combining digital marketing, influencer partnerships, and PR outreach. We created compelling product storytelling focused on sustainability and implemented a pre-launch waitlist campaign to build anticipation.",
    result: "Product sold out within 72 hours of launch, 15,000+ waitlist signups, and featured in 28 media outlets including two major publications.",
    testimonial: "The launch exceeded our wildest expectations. The strategic approach to building anticipation and leveraging the right channels for our audience resulted in demand that outpaced our initial production capacity.",
    clientLogo: createLogoFallback("EcoLife", 150),
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    icon: Rocket,
    metrics: [
      { label: "Sell-out Time", value: "72 hours" },
      { label: "Waitlist", value: "15,000+" },
      { label: "Media Coverage", value: "28 outlets" }
    ]
  },
  {
    id: 14,
    title: "B2B Sales Enablement",
    client: "IndusTech Manufacturing",
    industry: "Manufacturing",
    services: ["HubSpot Implementation", "Sales Process Optimization", "Content Creation"],
    challenge: "Lengthy sales cycles (avg. 8 months) with inconsistent processes and poor visibility into pipeline, resulting in missed opportunities and inaccurate forecasting.",
    solution: "Comprehensive sales enablement program with HubSpot CRM implementation, standardized sales processes, and targeted content for each buyer journey stage. We created interactive product demos and developed a comprehensive sales playbook.",
    result: "Sales cycle reduced by 35% (to 5.2 months), win rates increased by 42%, and 29% improvement in forecast accuracy.",
    testimonial: "The sales enablement initiative transformed our approach to B2B sales. The structured processes and supporting content have empowered our team to close deals more effectively and efficiently.",
    clientLogo: createLogoFallback("IndusTech", 150),
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    icon: Briefcase,
    metrics: [
      { label: "Sales Cycle", value: "-35%" },
      { label: "Win Rate", value: "+42%" },
      { label: "Forecast Accuracy", value: "+29%" }
    ]
  },
  {
    id: 15,
    title: "Analytics Implementation",
    client: "GlobalRetail Chain",
    industry: "Retail",
    services: ["Data Analytics", "Dashboard Development", "Training"],
    challenge: "Retailer with 50+ locations lacked visibility into cross-channel performance and customer behavior, hampering marketing effectiveness and inventory decisions.",
    solution: "End-to-end analytics solution with unified data collection, custom dashboards, and automated reporting. We integrated online and offline data sources and provided comprehensive training for the marketing and operations teams.",
    result: "Marketing efficiency improved by 52%, inventory turnover increased by 37%, and customer lifetime value grew by 28% through better targeting and personalization.",
    testimonial: "The analytics solution has given us unprecedented visibility into our business. We're now making decisions based on data rather than intuition, and the impact on our bottom line has been substantial.",
    clientLogo: createLogoFallback("GlobalRetail", 150),
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f",
    icon: BarChart3,
    metrics: [
      { label: "Marketing Efficiency", value: "+52%" },
      { label: "Inventory Turnover", value: "+37%" },
      { label: "Customer LTV", value: "+28%" }
    ]
  }
];
