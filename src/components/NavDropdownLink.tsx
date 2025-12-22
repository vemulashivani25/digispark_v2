
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface NavDropdownLinkProps {
  href?: string; 
  children?: React.ReactNode; 
  onClick?: () => void; 
  to?: string;
  title?: string;
  links?: { label: string; href: string; }[];
  isScrolled?: boolean;
}

const NavDropdownLink = ({ title, links, isScrolled = false }: NavDropdownLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`flex items-center text-sm font-medium px-2 py-1.5 rounded-md transition-colors duration-200 ${
          isScrolled ? "text-gray-300 hover:text-yellow-400" : "text-white/90 hover:text-yellow-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-1 z-30 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden min-w-[200px]"
          >
            <div className="py-1">
              {links && links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdownLink;
