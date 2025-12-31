import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-black text-white">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-[#2EFFA9]/5 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* Error Code */}
        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent"
        >
          404
        </motion.h1>

        {/* Message */}
        <div className="mt-[-40px] md:mt-[-60px]">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Lost in the <span className="text-[#2EFFA9]">Data Stream</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mb-10 max-w-md mx-auto">
            The requested article or endpoint does not exist
          </p>
        </div>

        {/* Action Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(46,255,169,0.2)] hover:shadow-[0_0_40px_rgba(46,255,169,0.4)] transition-all"
          >
            Return to Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Decorative Bottom Code Fragment */}
      <div className="absolute bottom-10 left-10 hidden md:block opacity-20">
        <pre className="text-[10px] font-mono text-gray-600">
          {`error_type: ROUTE_NOT_FOUND
timestamp: ${new Date().toISOString()}
origin: beyondchats_assignment
status: 404_ERR`}
        </pre>
      </div>
    </section>
  );
};

export default NotFound;
