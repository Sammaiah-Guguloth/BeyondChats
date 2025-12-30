import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Article from "./pages/Article";

const App = () => {
  return (
    <div className="text-white">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/articles" element={<Articles />} />

        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </div>
  );
};

export default App;
