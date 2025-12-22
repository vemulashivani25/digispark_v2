
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServicesCtaSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-400 relative overflow-hidden">
    <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
    <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Ready to Transform Your Digital Presence?
        </motion.h2>
        <motion.p
          className="text-black/80 text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Get in touch with our team to discuss how our services can help your business achieve its goals.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button className="bg-black text-white hover:bg-gray-900 px-8 py-6 text-lg rounded-full shadow-lg">
            Request a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
  </section>
);

export default ServicesCtaSection;
