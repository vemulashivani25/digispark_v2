/**
 * ============================================================================
 * Navbar.tsx - Main Navigation Component
 * ============================================================================
 * 
 * Responsive navigation bar with:
 * - Desktop: Horizontal nav with dropdowns
 * - Mobile: Hamburger menu with slide-out drawer
 * - Scroll-aware styling (transparent -> solid background)
 * - Active route highlighting
 * - User account menu (when authenticated)
 * 
 * Dropdown Menus:
 * - Services: Links to service categories
 * - Work: Portfolio, Success Stories, Testimonials
 * - Resources: Blog, Tools, FAQ
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 */

// Import necessary components and hooks
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import NavDropdownLink from "@/components/NavDropdownLink";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link to={to} onClick={handleClick} className={`nav-link ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"}`}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const location = useLocation();
  const { pathname } = location;

  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !(accountMenuRef.current as any).contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const closeAccountMenu = () => {
    setIsAccountMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center relative z-50">
            <span className="text-white font-bold text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300">
              Digi<span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">Spark</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`nav-link text-base font-semibold tracking-wide ${pathname === "/" ? "text-yellow-400" : "text-white hover:text-yellow-400"}`}
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`nav-link text-base font-semibold tracking-wide ${pathname === "/services" ? "text-yellow-400" : "text-white hover:text-yellow-400"}`}
            >
              Services
            </Link>
            <NavDropdownLink
              title="Work"
              isScrolled={isScrolled}
              links={[
                { label: "Portfolio", href: "/portfolio" },
                { label: "Project Details", href: "/project-details" },
                { label: "Success Stories", href: "/success-stories" },
                { label: "Testimonials", href: "/testimonials" },
              ]}
            />
            <Link
              to="/blog"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`nav-link text-base font-semibold tracking-wide ${pathname === "/blog" || pathname.startsWith("/blog/") ? "text-yellow-400" : "text-white hover:text-yellow-400"}`}
            >
              Blog
            </Link>
            <NavDropdownLink
              title="Company"
              isScrolled={isScrolled}
              links={[
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Project Quote", href: "/project-quote" },
                { label: "Tools", href: "/tools" },
                { label: "Resources", href: "/resources" },
              ]}
            />
            {!user ? (
              <Link
                to="/auth"
                className="bg-yellow-400 text-black px-5 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center text-white hover:text-yellow-400 gap-2"
                >
                  <User size={18} />
                  <span>Account</span>
                </button>
                <AnimatePresence>
                  {isAccountMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-800 origin-top-right"
                    >
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-800">
                        Signed in as
                        <br />
                        <span className="font-medium text-yellow-400">{user.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          signOut();
                          closeAccountMenu();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          <button aria-label="Menu Toggle" className="md:hidden focus:outline-none relative z-50" onClick={toggleMenu}>
            <div className="w-6 flex flex-col items-end space-y-1.5 overflow-hidden">
              <motion.span
                animate={isMenuOpen ? { y: 6, rotate: 45, width: 24 } : { y: 0, rotate: 0, width: 24 }}
                className="h-0.5 bg-white block"
              ></motion.span>
              <motion.span
                animate={isMenuOpen ? { width: 0 } : { width: 16 }}
                className="h-0.5 bg-white block"
              ></motion.span>
              <motion.span
                animate={isMenuOpen ? { y: -6, rotate: -45, width: 24 } : { y: 0, rotate: 0, width: 20 }}
                className="h-0.5 bg-white block"
              ></motion.span>
            </div>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-black/95 flex items-center justify-center md:hidden z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <nav className="flex flex-col items-center space-y-6 text-lg">
                  <Link to="/" className={`text-lg font-medium ${pathname === "/" ? "text-yellow-400" : "text-white"}`} onClick={closeMenu}>
                    Home
                  </Link>
                  <Link
                    to="/services"
                    className={`text-lg font-medium ${pathname === "/services" ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    Services
                  </Link>
                  <Link
                    to="/portfolio"
                    className={`text-lg font-medium ${pathname === "/portfolio" ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    Portfolio
                  </Link>
                  <Link
                    to="/success-stories"
                    className={`text-lg font-medium ${pathname === "/success-stories" ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    Success Stories
                  </Link>
                  <Link
                    to="/blog"
                    className={`text-lg font-medium ${pathname === "/blog" || pathname.startsWith("/blog/") ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/faq"
                    className={`text-lg font-medium ${pathname === "/faq" ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/about"
                    className={`text-lg font-medium ${pathname === "/about" ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    About
                  </Link>
                  <Link
                    to="/project-quote"
                    className={`text-lg font-medium ${pathname === "/project-quote" ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    Project Quote
                  </Link>
                  <Link
                    to="/contact"
                    className={`text-lg font-medium ${pathname === "/contact" ? "text-yellow-400" : "text-white"}`}
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                  {!user ? (
                    <Link
                      to="/auth"
                      className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors"
                      onClick={closeMenu}
                    >
                      Sign In
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      className="bg-gray-800 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
