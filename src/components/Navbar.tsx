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
import { LogOut, User, ChevronDown } from "lucide-react";
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
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
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

          {/* Mobile hamburger button - simple and compact */}
          <button 
            aria-label="Menu Toggle" 
            className="md:hidden focus:outline-none relative z-50 p-2" 
            onClick={toggleMenu}
          >
            <div className="w-5 flex flex-col items-end space-y-1">
              <motion.span
                animate={isMenuOpen ? { y: 5, rotate: 45, width: 20 } : { y: 0, rotate: 0, width: 20 }}
                className="h-0.5 bg-white block"
              ></motion.span>
              <motion.span
                animate={isMenuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 14 }}
                className="h-0.5 bg-white block"
              ></motion.span>
              <motion.span
                animate={isMenuOpen ? { y: -5, rotate: -45, width: 20 } : { y: 0, rotate: 0, width: 18 }}
                className="h-0.5 bg-white block"
              ></motion.span>
            </div>
          </button>

          {/* Mobile menu - compact slide-down with dropdowns */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 md:hidden z-40"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <nav className="container mx-auto px-4 py-3 max-h-[75vh] overflow-y-auto">
                  {/* Main Links */}
                  <div className="space-y-1">
                    <Link to="/" className={`block text-sm font-medium py-2.5 px-3 rounded-lg ${pathname === "/" ? "text-yellow-400 bg-white/5" : "text-white/90"}`} onClick={closeMenu}>
                      Home
                    </Link>
                    <Link to="/services" className={`block text-sm font-medium py-2.5 px-3 rounded-lg ${pathname === "/services" ? "text-yellow-400 bg-white/5" : "text-white/90"}`} onClick={closeMenu}>
                      Services
                    </Link>

                    {/* Work Dropdown */}
                    <div>
                      <button
                        onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                        className="w-full flex items-center justify-between text-sm font-medium py-2.5 px-3 rounded-lg text-white/90"
                      >
                        <span>Work</span>
                        <ChevronDown size={16} className={`transition-transform ${mobileWorkOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileWorkOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            <Link to="/portfolio" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/portfolio" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Portfolio
                            </Link>
                            <Link to="/project-details" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/project-details" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Project Details
                            </Link>
                            <Link to="/success-stories" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/success-stories" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Success Stories
                            </Link>
                            <Link to="/testimonials" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/testimonials" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Testimonials
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <Link to="/blog" className={`block text-sm font-medium py-2.5 px-3 rounded-lg ${pathname === "/blog" || pathname.startsWith("/blog/") ? "text-yellow-400 bg-white/5" : "text-white/90"}`} onClick={closeMenu}>
                      Blog
                    </Link>

                    {/* Company Dropdown */}
                    <div>
                      <button
                        onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                        className="w-full flex items-center justify-between text-sm font-medium py-2.5 px-3 rounded-lg text-white/90"
                      >
                        <span>Company</span>
                        <ChevronDown size={16} className={`transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileCompanyOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            <Link to="/about" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/about" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              About Us
                            </Link>
                            <Link to="/contact" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/contact" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Contact Us
                            </Link>
                            <Link to="/faq" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/faq" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              FAQ
                            </Link>
                            <Link to="/project-quote" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/project-quote" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Project Quote
                            </Link>
                            <Link to="/tools" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/tools" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Tools
                            </Link>
                            <Link to="/resources" className={`block text-sm py-2 px-3 rounded-lg ${pathname === "/resources" ? "text-yellow-400 bg-white/5" : "text-white/70"}`} onClick={closeMenu}>
                              Resources
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                    {!user ? (
                      <Link to="/auth" className="flex-1 text-center bg-yellow-400 text-black text-sm font-medium py-2.5 px-4 rounded-lg" onClick={closeMenu}>
                        Sign In
                      </Link>
                    ) : (
                      <button
                        onClick={() => { signOut(); closeMenu(); }}
                        className="flex-1 text-center bg-white/10 text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5"
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    )}
                  </div>
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
