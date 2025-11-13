"use client";

import { motion } from "framer-motion";

export default function TeamPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(45,212,191,0.35),transparent_70%)] blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold mb-4 text-center"
      >
        Coming <span className="text-teal-300">Soon</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg text-center max-w-xl leading-relaxed"
      >
        Unser Team befindet sich aktuell im Aufbau — stay tuned.
      </motion.p>
    </main>
  );
}
