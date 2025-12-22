/**
 * ============================================================================
 * About Page
 * ============================================================================
 * 
 * Company information page featuring story, values, team, and testimonials.
 * SEO optimized with proper meta tags for search engine visibility.
 * 
 * SECTIONS (in order):
 * 1. Navbar - Main navigation (@/components/Navbar)
 * 2. Hero Section - Page header with title
 * 3. Company Story - About the agency origin
 * 4. Our Values - Core principles (Excellence, Collaboration, etc.)
 * 5. AgencyStatsInfoGraphic - Statistics (@/components/infographics/AgencyStatsInfoGraphic)
 * 6. ProcessSection - How we work (@/components/ProcessSection)
 * 7. MeetTheTeamSection - Team members (@/components/MeetTheTeamSection)
 * 8. GlobalPresenceSection - World locations (@/components/GlobalPresenceSection)
 * 9. TestimonialsSection - Client reviews (@/components/TestimonialsSection)
 * 10. NewsletterSection - Email subscription (@/components/newsletter/NewsletterSection)
 * 11. FooterSection - Site footer (@/components/FooterSection)
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 * ============================================================================
 */

import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

// ============================================================================
// COMPONENT IMPORTS
// ============================================================================

/** Main navigation with dropdowns */
import Navbar from "@/components/Navbar";

/** Site footer with links and social */
import FooterSection from "@/components/FooterSection";

/** Visual process steps display */
import ProcessSection from "@/components/ProcessSection";

/** Animated agency statistics */
import AgencyStatsInfoGraphic from "@/components/infographics/AgencyStatsInfoGraphic";

/** Team members showcase */
import MeetTheTeamSection from "@/components/MeetTheTeamSection";

/** World map with office locations */
import GlobalPresenceSection from "@/components/GlobalPresenceSection";

/** Newsletter email subscription */
import NewsletterSection from "@/components/newsletter/NewsletterSection";

/** Client testimonials carousel */
import TestimonialsSection from "@/components/TestimonialsSection";

/** Floating scroll-to-top button */
import ScrollToTop from "@/components/ScrollToTop";

/** Project inquiry popup */
import ProjectInquiryPopup from "@/components/ProjectInquiryPopup";

// ============================================================================
// ABOUT PAGE COMPONENT
// ============================================================================

const About = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About DigiSpark | HubSpot CRM & Digital Marketing Experts</title>
        <meta 
          name="description" 
          content="Learn about DigiSpark's expert team specializing in HubSpot CRM implementation, marketing automation, cold email campaigns, Zoom support, video editing, and custom web development." 
        />
        <meta 
          name="keywords" 
          content="about DigiSpark, HubSpot CRM experts, digital agency team, marketing automation specialists, cold email marketing experts, video editing team, web development company" 
        />
        <meta property="og:title" content="About DigiSpark | HubSpot CRM & Digital Agency Experts" />
        <meta property="og:description" content="Meet our expert team specializing in HubSpot CRM, cold email marketing, Zoom support, video editing, and web development." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digispark.agency/about" />
        <meta property="og:image" content="https://digispark.agency/og-about.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About DigiSpark | Digital Agency Experts" />
        <meta name="twitter:description" content="Meet the team behind DigiSpark's HubSpot CRM and digital marketing solutions." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DigiSpark Agency" />
        <link rel="canonical" href="https://digispark.agency/about" />
      </Helmet>
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
        <div className="absolute w-full h-full">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-400/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              About <span className="text-yellow-400">Our Agency</span>
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We're a team of creative professionals passionate about transforming businesses through innovative digital solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-10 sm:py-14 md:py-20 relative bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6">Our Story</h2>
              <div className="h-1 w-16 sm:w-20 bg-yellow-400 mb-4 sm:mb-6 md:mb-8" />
              <p className="text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base">
                Founded in 2015, our agency began as a small team of digital enthusiasts with a vision to bridge the gap between technical expertise and creative design.
              </p>
              <p className="text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base">
                Over the years, we've grown into a full-service digital agency, partnering with startups, Fortune 500 companies, and everything in between.
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                Our approach combines cutting-edge technology with strategic thinking and creative execution to deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-purple-400/5 to-transparent rounded-xl transform rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="DigiSpark team collaborating in a modern office"
                className="relative rounded-xl shadow-2xl z-10"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-10 sm:py-14 md:py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Our <span className="text-yellow-400">Values</span>
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We're committed to delivering exceptional work that exceeds expectations and creates lasting impact.",
                icon: "🏆",
              },
              {
                title: "Collaboration",
                description:
                  "We believe the best results come from working together, sharing ideas, and combining diverse perspectives.",
                icon: "👥",
              },
              {
                title: "Innovation",
                description:
                  "We constantly push boundaries, embrace new technologies, and find creative solutions to complex challenges.",
                icon: "💡",
              },
              {
                title: "Integrity",
                description:
                  "We operate with honesty, transparency, and ethical practices in all our business relationships.",
                icon: "🤝",
              },
              {
                title: "Growth",
                description: "We're dedicated to continuous learning and improvement, for ourselves and our clients.",
                icon: "📈",
              },
              {
                title: "Impact",
                description:
                  "We measure our success by the tangible results we create for our clients and their businesses.",
                icon: "🎯",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/10 via-yellow-400/20 to-yellow-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-800 group-hover:border-yellow-500/30 transition-colors relative z-10">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4">{value.icon}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-yellow-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-xs sm:text-sm md:text-base">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AgencyStatsInfoGraphic />

      {/* Our Process */}
      <ProcessSection />

      <MeetTheTeamSection />

      <GlobalPresenceSection />

      <TestimonialsSection />

      <NewsletterSection />
      <ProjectInquiryPopup />

      {/* Team Section 
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Meet Our <span className="text-yellow-400">Team</span>
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The talented individuals behind our agency's success
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Michael Chen",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Priya Patel",
                role: "Technical Lead",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "David Rodriguez",
                role: "Marketing Strategist",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              }
            ].map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2">
                      {["Twitter", "LinkedIn", "Email"].map(social => (
                        <div key={social} className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                          <span className="sr-only">{social}</span>
                          <span className="text-black text-xs">{social[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-yellow-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default About;
