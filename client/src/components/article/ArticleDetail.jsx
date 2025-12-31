import React from "react";
import ReactMarkdown from "react-markdown";

const ArticleDetail = ({ article }) => {
  console.log("article : ", article.article);
  return (
    <div className="space-y-12 pb-20">
      {/* Title Section */}
      <section className="border-b border-white/10 pb-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {article.title}
        </h1>
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={article.sourceUrl}
            target="_blank"
            className="text-xs font-mono text-[#2EFFA9] hover:underline"
          >
            ORIGINAL_SOURCE ↗
          </a>
          <span className="text-gray-600 text-xs font-mono">|</span>
          <span className="text-xs font-mono text-gray-500">
            STAMP: {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
      </section>
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
        {/* ORIGINAL COLUMN */}
        <div className="bg-black p-8 md:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500">
              Original Scraped Version
            </h3>
          </div>
          <div className="text-gray-400 leading-relaxed font-light italic">
            {article.originalContent}
          </div>
        </div>

        {/* AI ENHANCED COLUMN */}
        <div className="bg-[#0A0A0A] p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 p-6">
            <span className="px-3 py-1 bg-[#2EFFA9]/10 text-[#2EFFA9] text-[10px] font-mono border border-[#2EFFA9]/30 rounded-full">
              AI_OPTIMIZED
            </span>
          </div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#2EFFA9] shadow-[0_0_10px_#2EFFA9]" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#2EFFA9]">
              Refined by Gemini 1.5
            </h3>
          </div>

          <div className="prose prose-invert prose-emerald max-w-none">
            {/* Use ReactMarkdown to render the Phase 2 formatting */}
            <ReactMarkdown>{article.updatedContent}</ReactMarkdown>
          </div>
        </div>
      </div>
      {/* References Section */}
      {article.references?.length > 0 && (
        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
          <h4 className="text-[#2EFFA9] font-mono text-xs mb-4 uppercase tracking-widest">
            Google Search References
          </h4>
          <ul className="space-y-2">
            {article.references.map((ref, i) => (
              <li
                key={i}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                <a href={ref} target="_blank">
                  [{i + 1}] {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
