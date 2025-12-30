import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllArticlesThunk } from "../redux/thunks/articles.thunk";
import ArticleCard from "../components/article/ArticleCard";

const Articles = () => {
  const { articles, loading, error } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllArticlesThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter">
            Curated <span className="text-[#2EFFA9]">Insights</span>
          </h1>
          <p className="text-gray-500 mt-2 font-mono uppercase tracking-widest text-xs">
            Phase 1 & 2 Output: Scraped & AI-Enhanced Content
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#2EFFA9]"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500">No articles found in the database.</p>
            <p className="text-xs text-[#2EFFA9] mt-2 font-mono">
              Run the /seed endpoint to begin.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Articles;
