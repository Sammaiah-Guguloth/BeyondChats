import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ArticleCard = ({ article }) => {
  /**
   * Safe preview extractor: Finds the first 'paragraph' block
   * from the structured originalContent array.
   */
  const getPreviewText = () => {
    if (Array.isArray(article.originalContent)) {
      const firstPara = article.originalContent.find(
        (block) => block.type === "paragraph"
      );
      return firstPara ? firstPara.text : "No preview available.";
    }
    // Fallback if data is still a string
    return typeof article.originalContent === "string"
      ? article.originalContent
      : "Initializing content...";
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/[0.03] backdrop-blur-md rounded-[2rem] p-8 border border-white/10 hover:border-[#2EFFA9]/30 transition-all duration-500 overflow-hidden"
    >
      {/* Decorative Gradient Glow on Hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2EFFA9]/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* AI Badge - Top Right */}
      {article.isAiUpdated && (
        <div className="flex justify-end mb-4">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#2EFFA9]/5 border border-[#2EFFA9]/20 text-[#2EFFA9] text-[9px] font-mono uppercase tracking-widest rounded-full">
            <span className="w-1 h-1 rounded-full bg-[#2EFFA9] animate-pulse" />
            ___
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-[#2EFFA9] transition-colors duration-300">
          {article.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
          {getPreviewText()}
        </p>

        {/* Action Button */}
        <Link
          to={`/article/${article._id}`}
          className="flex items-center justify-between w-full px-6 py-3 bg-white/5 border border-white/10 text-white text-xs font-mono uppercase tracking-[0.2em] rounded-xl group-hover:bg-[#2EFFA9] group-hover:text-black group-hover:border-transparent transition-all duration-300"
        >
          Full Article
          <span className="text-lg group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {/* Bottom Progress Bar (Visual Polish) */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EFFA9]/40 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ArticleCard;
