import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Link to={"/"}>
          <h1 className="text-xl font-bold tracking-tight text-white">
            BeyondChats
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link to="/articles" className="hover:text-white transition-colors">
          Articles
        </Link>
        <Link to="/about-me" className="hover:text-white transition-colors">
          About Me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
