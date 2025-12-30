import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-400 border-t border-white/10 pt-10 overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#2EFFA9]/5 blur-[100px] rounded-full -mb-20 -mr-20" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container relative z-10 mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Brand & Developer Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Beyond<span className="text-[#2EFFA9]">Chats</span>
            </h3>
            <p className="text-xs mt-2 uppercase tracking-[0.2em] font-mono text-gray-500">
              Full Stack Developer Intern Assignment •{" "}
              <span className="text-gray-300">Sammaiah Guguloth</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-10 text-xs font-bold tracking-widest uppercase">
            <Link to="/" className="hover:text-[#2EFFA9] transition-colors">
              Home
            </Link>
            <Link
              to="/articles"
              className="hover:text-[#2EFFA9] transition-colors"
            >
              Articles
            </Link>
            <a
              href="https://github.com/Sammaiah-Guguloth/BeyondChats"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center  hover:text-white transition-colors"
            >
              GitHub
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8654 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM11.5 4C11.5 3.72386 11.2761 3.5 11 3.5L6.5 3.5C6.22386 3.5 6 3.72386 6 4C6 4.27614 6.22386 4.5 6.5 4.5H10.5V8.5C10.5 8.77614 10.7239 9 11 9C11.2761 9 11.5 8.77614 11.5 8.5L11.5 4ZM4.35355 12.0607L11.3536 5.06066L10.6464 4.35355L3.64645 11.3536L4.35355 12.0607Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </a>
          </div>

          {/* Copyright & Organization */}
          {/* <div className="text-center md:text-right">
            <p className="text-[10px] font-mono text-gray-600">
              © {new Date().getFullYear()} BEYONDCHATS
            </p>
            <p className="text-[10px] font-mono text-[#2EFFA9]/60 mt-1">
              STATUS: PRODUCTION_READY_V1.0
            </p>
          </div> */}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>
    </footer>
  );
};

export default Footer;
