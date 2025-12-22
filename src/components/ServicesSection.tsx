
import { Code, Lightbulb, CheckSquare, Rocket } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

// Updated color scheme to match the website's black and yellow theme
const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites, web apps, e-commerce and maintenance for modern brands.",
    bg: "bg-gradient-to-br from-black via-gray-800 to-gray-900",
    accent: "text-yellow-400"
  },
  {
    icon: Lightbulb,
    title: "Branding & Strategy",
    description: "Cutting-edge branding, creative strategy, and memorable digital storytelling.",
    bg: "bg-gradient-to-br from-black via-gray-800 to-gray-900",
    accent: "text-yellow-400"
  },
  {
    icon: CheckSquare,
    title: "Digital Marketing",
    description: "Drive traffic & conversions with SEO, SEM, content, SMM, and more.",
    bg: "bg-gradient-to-br from-black via-gray-800 to-gray-900",
    accent: "text-yellow-400"
  },
  {
    icon: Rocket,
    title: "Growth Solutions",
    description: "Analytics, automation, A/B testing and continuous optimization for business scaling.",
    bg: "bg-gradient-to-br from-black via-gray-800 to-gray-900",
    accent: "text-yellow-400"
  }
];

const stagger = {
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: "easeOut"
    }
  }),
  hidden: { opacity: 0, y: 40 }
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-black relative overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-yellow-400">Services</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Innovative tech, creative talent & measurable growth for your business
          </p>
        </motion.div>
        <div className="relative w-full flex justify-center">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.13 }}
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  variants={stagger}
                  custom={idx}
                  key={service.title}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 12px 36px 0 #eab30822"
                  }}
                  className="group"
                >
                  <Card className={`relative ${service.bg} rounded-2xl border border-yellow-400/10 shadow-2xl h-full glass-effect transition-all duration-300 overflow-hidden`}>
                    <motion.div
                      className={`absolute -top-8 -right-8 text-[8.5rem] opacity-10 rotate-12 pointer-events-none select-none ${service.accent}`}
                    >
                      <Icon className="w-[6rem] h-[6rem]" />
                    </motion.div>
                    <CardContent className="flex flex-col items-start gap-6 p-8 z-10 min-h-[340px]">
                      <div className="rounded-xl p-4 bg-yellow-400/5 border border-yellow-400/20 backdrop-blur-lg mb-2 shadow group-hover:scale-110 transition-all duration-300">
                        <Icon className={`w-9 h-9 ${service.accent} group-hover:text-yellow-400 transition-colors`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      <p className="text-md text-gray-300">{service.description}</p>
                      <motion.div
                        className="h-1 w-0 bg-yellow-400/90 rounded transition-all"
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * idx }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
