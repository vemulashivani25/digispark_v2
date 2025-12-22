/**
 * About Page Component
 * Displays company information, story, values, team, and testimonials
 * SEO optimized with proper meta tags for search engine visibility
 */
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ProcessSection from "@/components/ProcessSection";
import AgencyStatsInfoGraphic from "@/components/infographics/AgencyStatsInfoGraphic";
import MeetTheTeamSection from "@/components/MeetTheTeamSection";
import GlobalPresenceSection from "@/components/GlobalPresenceSection";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import ProjectInquiryPopup from "@/components/ProjectInquiryPopup";

const About = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Us | DigiSpark - Digital Agency Story & Team</title>
        <meta 
          name="description" 
          content="Learn about DigiSpark's journey, our passionate team of digital experts, and our commitment to transforming businesses through innovative digital solutions since 2015." 
        />
        <meta 
          name="keywords" 
          content="about DigiSpark, digital agency team, web development company, digital marketing experts, creative agency story, our values, meet the team" 
        />
        <meta property="og:title" content="About Us | DigiSpark - Digital Agency Story & Team" />
        <meta property="og:description" content="Discover our story, values, and the talented team behind DigiSpark's success in digital transformation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:image" content="https://yourdomain.com/images/about-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | DigiSpark" />
        <meta name="twitter:description" content="Meet the team behind DigiSpark's innovative digital solutions." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DigiSpark Team" />
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Helmet>
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
        <div className="absolute w-full h-full">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              About <span className="text-yellow-400">Our Agency</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We're a team of creative professionals passionate about transforming businesses through innovative digital
              solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 relative bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="h-1 w-20 bg-yellow-400 mb-8" />
              <p className="text-gray-300 mb-6">
                Founded in 2015, our agency began as a small team of digital enthusiasts with a vision to bridge the gap
                between technical expertise and creative design.
              </p>
              <p className="text-gray-300 mb-6">
                Over the years, we've grown into a full-service digital agency, partnering with startups, Fortune 500
                companies, and everything in between. We've helped hundreds of clients transform their digital presence
                and achieve remarkable growth.
              </p>
              <p className="text-gray-300">
                Our approach combines cutting-edge technology with strategic thinking and creative execution to deliver
                exceptional results that drive business success.
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
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-purple-400/5 to-transparent rounded-xl transform -rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="DigiSpark team collaborating in a modern office meeting room discussing digital strategy"
                className="relative rounded-xl shadow-2xl z-10"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Our <span className="text-yellow-400">Values</span>
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 group-hover:border-yellow-500/30 transition-colors relative z-10">
                  <motion.div
                    className="text-4xl mb-4 transform transition-all duration-300 group-hover:scale-110"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2,
                    }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{value.description}</p>
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
