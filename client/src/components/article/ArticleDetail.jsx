import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const ArticleDetail = ({ article: articleProp }) => {
  // Handle the "article.article" nesting often seen in Redux responses
  const article = articleProp?.article || articleProp;

  if (!article)
    return (
      <div className="text-[#2EFFA9] font-mono p-20 text-center">
        INITIALIZING_DATA_STREAM...
      </div>
    );

  /**
   * Semantically renders the structured array from Phase 1
   */
  const renderOriginalBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) {
      return (
        <p className="text-gray-500 italic text-sm">
          No structured data found.
        </p>
      );
    }

    return blocks.map((block, index) => {
      // Dynamic mapping of tags (h2, p, li, etc.)
      const Tag = block.tag || "p";

      // Theme-consistent styling based on semantic type
      const styles = {
        heading: "text-white font-bold mt-8 mb-4 tracking-tight first:mt-0",
        paragraph: "text-gray-400 leading-relaxed mb-4 text-sm font-light",
        "list-item": "text-gray-400 list-disc ml-6 mb-2 text-sm",
      };

      return (
        <Tag key={index} className={styles[block.type] || styles.paragraph}>
          {block.text}
        </Tag>
      );
    });
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Title Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/5 pb-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
          {article.title}
        </h1>
        <div className="flex flex-wrap gap-6 items-center">
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-mono text-[#2EFFA9] border border-[#2EFFA9]/30 px-3 py-1 rounded-full uppercase tracking-widest hover:bg-[#2EFFA9]/10 transition-all"
          >
            Original Source ↗
          </a>
          <span className="text-gray-700 font-mono text-xs">|</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
            Entry_Stamp: {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
      </motion.section>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* LEFT: SEMANTIC ORIGINAL VIEW */}
        <div className="bg-black p-8 md:p-12 border-r border-white/5 h-full">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-pulse" />
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">
              Legacy_Source_Scrape
            </h3>
          </div>
          <div className="max-w-none">
            {renderOriginalBlocks(article.originalContent)}
          </div>
        </div>

        {/* RIGHT: AI ENHANCED VIEW */}
        <div className="bg-[#050505] p-8 md:p-12 h-full relative group">
          <div className="absolute top-0 right-0 p-8">
            <span className="px-3 py-1 bg-[#2EFFA9]/10 text-[#2EFFA9] text-[9px] font-mono border border-[#2EFFA9]/30 rounded-full shadow-[0_0_15px_rgba(46,255,169,0.1)] group-hover:shadow-[0_0_20px_rgba(46,255,169,0.3)] transition-all">
              AI_OPTIMIZED
            </span>
          </div>
          <div className="flex items-center gap-2 mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2EFFA9] shadow-[0_0_10px_#2EFFA9]" />
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#2EFFA9]">
              Refined_By_Gemini_1.5
            </h3>
          </div>

          <div
            className="prose prose-invert prose-emerald max-w-none 
            prose-p:text-sm prose-p:leading-relaxed prose-p:font-light prose-p:text-gray-300
            prose-headings:text-white prose-headings:tracking-tight prose-headings:font-bold
            prose-strong:text-[#2EFFA9]"
          >
            {/* Phase 2 Markdown Rendering */}
            <ReactMarkdown>
              {article.updatedContent ||
                "_Processing AI enhancement script... Check console for Phase 2 logs._"}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* References Section */}
      {article.references?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 bg-white/[0.02] border border-white/10 rounded-[2rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2EFFA9]/5 blur-[80px] -mr-32 -mt-32" />
          <h4 className="text-[#2EFFA9] font-mono text-[10px] mb-8 uppercase tracking-[0.4em]">
            Google_Search_Intelligence_Logs
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {article.references.map((ref, i) => (
              <li key={i} className="group flex items-center gap-3">
                <span className="text-[9px] font-mono text-gray-700 tracking-tighter">
                  0{i + 1}
                </span>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-500 group-hover:text-white truncate transition-colors duration-300"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default ArticleDetail;
