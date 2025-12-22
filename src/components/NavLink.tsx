
import { Link } from "react-router-dom";

interface NavLinkProps { 
  href?: string; 
  children: React.ReactNode; 
  isScrolled?: boolean;
  onClick?: () => void;
  to?: string;
}

export const NavLink = ({ href, children, isScrolled = false, onClick, to }: NavLinkProps) => {
  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`text-sm font-medium px-2 py-1.5 rounded-md transition-colors duration-200 ${
          isScrolled ? "text-gray-300 hover:text-yellow-400" : "text-white/90 hover:text-yellow-400"
        }`}
        style={{ minWidth: "max-content" }}
      >{children}</Link>
    );
  }
  return (
    <a
      href={href}
      onClick={e => { e.preventDefault(); onClick && onClick(); }}
      className={`text-sm font-medium px-2 py-1.5 rounded-md transition-colors duration-200 ${
        isScrolled ? "text-gray-300 hover:text-yellow-400" : "text-white/90 hover:text-yellow-400"
      }`}
      style={{ minWidth: "max-content" }}
    >{children}</a>
  );
};

export default NavLink;
