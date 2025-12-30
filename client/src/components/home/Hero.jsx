import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center pb-6 justify-center min-h-screen px-4 pt-20 overflow-hidden bg-black text-white">
      {/* Ambient Background Glow (Opal Reference) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2EFFA9]/10 blur-[140px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-5xl"
      >
        {/* Assignment Tag */}
        <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest uppercase border rounded-full border-[#2EFFA9]/30 bg-[#2EFFA9]/5 text-[#2EFFA9]">
          Full Stack Developer Intern Assignment
        </span>

        {/* Main Heading */}
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
          Evolving Content <br />
          <span className="bg-gradient-to-r from-[#2EFFA9] via-[#3BD9FF] to-[#2EFFA9] bg-clip-text text-transparent">
            with BeyondChats
          </span>
        </h2>

        {/* Project Info Section */}
        <div className="mt-10 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            Integrating automated web scraping, Google Search analysis, and
            LLM-powered content optimization to redefine the blog experience.
          </p>
        </div>

        {/* Phase Progress Indicators (Optional Visual) */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-[10px] font-mono text-gray-500">
          <span className="px-3 py-1 border border-white/10 rounded">
            PHASE 1: Sraping + CRUD API
          </span>
          <span className="px-3 py-1 border border-white/10 rounded">
            PHASE 2: Competitor's content + LLM OPTIMIZATION
          </span>
          <span className="px-3 py-1 border border-[#2EFFA9]/50 text-[#2EFFA9] rounded">
            PHASE 3: REACT UI
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/articles">
            <button className="px-6 py-2 text-lg font-bold text-black bg-white rounded-full shadow-[0_0_40px_rgba(46,255,169,0.3)] hover:scale-105 transition-all active:scale-95">
              Explore the Articles
            </button>
          </Link>

          <a
            href="https://github.com/Sammaiah-Guguloth/BeyondChats"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors "
          >
            Github
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
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
