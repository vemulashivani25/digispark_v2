import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ServiceFilterProps {
  services: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ServiceFilter = ({ services, activeFilter, onFilterChange }: ServiceFilterProps) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Button
        onClick={() => onFilterChange("All")}
        variant={activeFilter === "All" ? "default" : "outline"}
        className={
          activeFilter === "All"
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "text-gray-300 border-gray-700 hover:bg-gray-800"
        }
      >
        All Services
      </Button>

      {services.map((service) => (
        <Button
          key={service}
          onClick={() => onFilterChange(service)}
          variant={activeFilter === service ? "default" : "outline"}
          className={
            activeFilter === service
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "text-gray-300 border-gray-700 hover:bg-yellow-800"
          }
        >
          {service}
        </Button>
      ))}
    </motion.div>
  );
};

export default ServiceFilter;
