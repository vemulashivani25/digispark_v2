
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
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-black relative overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Our <span className="text-yellow-400">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Innovative tech, creative talent & measurable growth for your business
          </p>
        </motion.div>
        <div className="relative w-full flex justify-center">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mx-auto w-full"
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
                    scale: 1.03,
                    boxShadow: "0 12px 36px 0 #eab30822"
                  }}
                  className="group"
                >
                  <Card className={`relative ${service.bg} rounded-xl sm:rounded-2xl border border-yellow-400/10 shadow-2xl h-full glass-effect transition-all duration-300 overflow-hidden`}>
                    <motion.div
                      className={`absolute -top-6 -right-6 sm:-top-8 sm:-right-8 text-[6rem] sm:text-[8.5rem] opacity-10 rotate-12 pointer-events-none select-none ${service.accent}`}
                    >
                      <Icon className="w-[4rem] h-[4rem] sm:w-[6rem] sm:h-[6rem]" />
                    </motion.div>
                    <CardContent className="flex flex-col items-start gap-3 sm:gap-4 md:gap-6 p-5 sm:p-6 md:p-8 z-10 min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
                      <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 bg-yellow-400/5 border border-yellow-400/20 backdrop-blur-lg mb-1 sm:mb-2 shadow group-hover:scale-110 transition-all duration-300">
                        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 ${service.accent} group-hover:text-yellow-400 transition-colors`} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300">{service.description}</p>
                      <motion.div
                        className="h-1 w-0 bg-yellow-400/90 rounded transition-all mt-auto"
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
