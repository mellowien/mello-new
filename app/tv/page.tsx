"use client";

import { motion } from "framer-motion";

export default function MelloTVPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-gray-100 flex flex-col items-center pt-28 pb-16 px-4"
    >
      {/* Titel */}
      <h1 className="text-4xl md:text-5xl font-bold text-teal-300 mb-8 drop-shadow-[0_0_15px_rgba(45,212,191,0.6)]">
        Mello TV – Livestream
      </h1>

      {/* Twitch Livestream */}
      <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-teal-300/40 shadow-[0_0_35px_rgba(45,212,191,0.25)] mb-14">
        <iframe
          src="https://player.twitch.tv/?channel=mellowien&parent=localhost&parent=mello.vercel.app&parent=yourdomain.com"
          height="100%"
          width="100%"
          allowFullScreen
        ></iframe>
      </div>

      {/* Highlights Titel */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-semibold mb-6 text-teal-300 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]"
      >
        Highlights
      </motion.h2>

      {/* Coming Soon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">

        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="rounded-xl border border-teal-300/25 bg-black/50 backdrop-blur-md overflow-hidden shadow-[0_0_25px_rgba(45,212,191,0.25)] hover:shadow-[0_0_35px_rgba(45,212,191,0.35)] transition-all duration-500 flex items-center justify-center py-14"
          >
            <p className="text-teal-300 text-lg font-medium opacity-80 tracking-wide">
              Coming soon…
            </p>
          </motion.div>
        ))}

      </div>

    </motion.main>
  );
}
