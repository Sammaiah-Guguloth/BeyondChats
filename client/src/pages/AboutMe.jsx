import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const AboutMe = () => {
  // Replace with your actual Google Drive links
  const resumeViewLink =
    "https://drive.google.com/file/d/1GXCRJ1rpcrsZjw545Uwhmc0PovJMvgeZ/view";
  const resumeDownloadLink =
    "https://drive.google.com/uc?export=download&id=1GXCRJ1rpcrsZjw545Uwhmc0PovJMvgeZ";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Profile Header */}
          <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#2EFFA9] to-[#3BD9FF] p-1 shadow-[0_0_30px_rgba(46,255,169,0.3)]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold">
                SG
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Sammaiah Guguloth
              </h1>
              <p className="text-[#2EFFA9] font-mono text-sm uppercase tracking-widest">
                Full Stack Developer
              </p>
            </div>
          </section>

          {/* Resume Actions */}
          <section className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={resumeViewLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#2EFFA9] transition-all"
            >
              View Resume
            </a>
            <a
              href={resumeDownloadLink}
              className="flex-1 text-center px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:border-[#2EFFA9] hover:text-[#2EFFA9] transition-all"
            >
              Download PDF ↓
            </a>
          </section>

          {/* About Text */}
          <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 leading-relaxed text-gray-400">
            <p className="mb-6">
              I am a B.Tech Computer Science student at{" "}
              <strong>RGUKT Basar</strong> passsion building scalable web
              applications. As a competitive programmer with 600+ problems
              solved, I thrive on solving complex logic challenges—much like the
              <strong> Phase 2 automation</strong> required for this assignment
            </p>
            <p>
              My focus is on the MERN stack, real-time collaboration tools, and
              now,
              <strong> AI-driven content transformation</strong>. This project
              showcases my ability to integrate LLMs (Gemini) with traditional
              web scraping to create complex applications
            </p>
          </section>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10">
            {[
              { label: "LeetCode", val: "400+" },
              { label: "GFG", val: "430+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[#2EFFA9] font-bold text-xl">
                  {stat.val}
                </div>
                <div className="text-gray-600 text-[10px] uppercase font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutMe;
