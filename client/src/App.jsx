import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import AboutMe from "./pages/AboutMe";

const App = () => {
  return (
    <div className="text-white">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/articles" element={<Articles />} />

        <Route path="/article/:id" element={<Article />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/about-me" element={<AboutMe />} />
      </Routes>
    </div>
  );
};

export default App;
