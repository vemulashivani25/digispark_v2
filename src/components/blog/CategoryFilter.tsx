
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}) => {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className={`rounded-full ${
              selectedCategory === null 
                ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                : "hover:bg-yellow-500/10 hover:text-yellow-800"
            }`}
            onClick={() => onCategorySelect(null)}
          >
            All Categories
          </Button>
        </motion.div>
        
        {categories.map((category) => (
          <motion.div 
            key={category} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full ${
                selectedCategory === category 
                  ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                  : "hover:bg-yellow-500/10 hover:text-yellow-800"
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
