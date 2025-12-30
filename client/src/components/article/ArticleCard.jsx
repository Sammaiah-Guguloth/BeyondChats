import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {article.originalContent.substring(0, 150)}...
      </p>
      {article.isAiUpdated && (
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
            AI Updated
          </span>
        </div>
      )}
      <Link
        to={`/article/${article._id}`}
        className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors duration-200"
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticleCard;
