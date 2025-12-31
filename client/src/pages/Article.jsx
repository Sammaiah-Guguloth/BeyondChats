import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticleByIdThunk } from "../redux/thunks/articles.thunk";
import Navbar from "../components/global/Navbar";
import ArticleDetail from "../components/article/ArticleDetail";

const Article = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentArticle, loading, error } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleByIdThunk(id));
    }
  }, [id, dispatch]);

  // console.log("current article : ", currentArticle);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Back Button with Opal Hover */}
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 mb-10 px-4 py-2 text-xs font-mono uppercase tracking-widest text-gray-400 border border-white/10 rounded-full hover:border-[#2EFFA9] hover:text-[#2EFFA9] transition-all"
          >
            <span>←</span> Back to Articles
          </Link>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-12 h-12 border-t-2 border-[#2EFFA9] rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-mono text-xs uppercase animate-pulse">
                Fetching Data...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-3xl text-center">
              <p className="text-red-400 font-mono text-sm">
                Error System: {error}
              </p>
            </div>
          ) : currentArticle ? (
            <ArticleDetail article={currentArticle.article} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 font-mono">
                [404] Null Reference: Article Data Missing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
