"use client";

import { motion } from "framer-motion";

export default function TeamPage() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 pt-32 pb-20 flex flex-col items-center overflow-hidden">

      {/* Background Light Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(13,148,136,0.4),transparent_70%)] blur-[140px] opacity-30"></div>
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-5xl md:text-6xl font-bold mb-12 text-center"
      >
        Team
      </motion.h1>

      {/* Coming Soon Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-black/60 border border-[#0d9488]/40 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_35px_rgba(13,148,136,0.25)]"
      >
        <p className="text-3xl md:text-4xl font-bold text-[#0d9488] tracking-wide">
          Coming soon...
        </p>
      </motion.div>

    </main>
  );
}
