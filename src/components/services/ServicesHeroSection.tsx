
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const ServicesHeroSection: React.FC = () => (
  <>
    <Navbar />
    <section className="pt-28 pb-16 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/30 rounded-full blur-[120px] -top-64 -right-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] top-40 -left-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Digital Solutions That <span className="text-yellow-400 inline-block">Transform</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Comprehensive digital services tailored to your unique business needs, delivering measurable results that drive growth.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 rounded-xl text-lg shadow-lg shadow-yellow-400/20">
              Explore Our Services
            </Button>
            <Button variant="outline" className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 px-8 py-6 rounded-xl text-lg">
              Request a Consultation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  </>
);
export default ServicesHeroSection;
