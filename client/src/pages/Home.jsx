import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/global/Footer";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Hero section */}
      <div>
        <Hero />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
