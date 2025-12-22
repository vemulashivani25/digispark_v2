import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { SuccessStory } from "@/types/successStory";

interface SuccessStoryCardProps {
  story: SuccessStory;
  onSelect: (story: SuccessStory) => void;
}

const SuccessStoryCard = ({ story, onSelect }: SuccessStoryCardProps) => {
  const Icon = story.icon;

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Card className="group overflow-hidden border-yellow-400/20 bg-black/50 backdrop-blur-md h-full hover:shadow-[0_0_40px_rgba(253,224,71,0.25)] transition-all duration-500 relative">
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.3), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 flex items-center">
            <motion.div
              className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mr-3"
              whileHover={{ scale: 1.2, rotate: 10 }}
              animate={{
                boxShadow: ["0 0 0 0 rgba(234, 179, 8, 0.4)", "0 0 0 10px rgba(234, 179, 8, 0)"],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
                scale: { duration: 0.2 },
              }}
            >
              <Icon className="w-5 h-5 text-black" />
            </motion.div>
            <div>
              <h3 className="text-white font-bold">{story.client}</h3>
              <p className="text-gray-300 text-sm">{story.industry}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
            {story.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {story.services.slice(0, 3).map((service, idx) => (
              <motion.span
                key={service}
                className="text-xs px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                {service}
              </motion.span>
            ))}
          </div>

          <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">
            {story.challenge}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {story.metrics.slice(0, 2).map((metric, idx) => (
              <motion.div
                key={metric.label}
                className="bg-gray-800/50 p-3 rounded-lg group-hover:bg-yellow-400/10 transition-colors duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-yellow-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.3 + idx * 0.2, duration: 0.8 }}
                />
                <p className="text-yellow-400 text-xl font-bold">{metric.value}</p>
                <p className="text-xs text-gray-400">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => onSelect(story)}
              className="w-full mt-2 bg-black hover:bg-yellow-400 text-yellow-400 hover:text-black border border-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center w-full">
                View Case Study
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SuccessStoryCard;
