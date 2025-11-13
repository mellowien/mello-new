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
      <h1 className="text-3xl md:text-4xl font-bold text-teal-300 mb-6 drop-shadow-[0_0_10px_rgba(45,212,191,0.6)]">
        Mello TV – Livestream
      </h1>

      {/* Twitch Livestream */}
      <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-teal-300/40 shadow-[0_0_25px_rgba(45,212,191,0.3)] mb-14">
        <iframe
          src="https://player.twitch.tv/?channel=mellowien&parent=mellowien.at&parent=www.mellowien.at&parent=localhost&parent=127.0.0.1"
          height="100%"
          width="100%"
          allowFullScreen
        ></iframe>
      </div>

      {/* Coming Soon Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-black/60 border border-teal-300/30 backdrop-blur-md rounded-2xl p-8 max-w-xl text-center shadow-[0_0_25px_rgba(45,212,191,0.15)]"
      >
        <h2 className="text-2xl font-semibold text-teal-300 mb-3">
          Highlights – Coming Soon
        </h2>

        <p className="text-gray-300 leading-relaxed">
          Schon bald findest du hier Clips, Highlights & besondere Momente aus 
          unseren Spielen, Events und Livestreams.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          Wir arbeiten daran – stay tuned!
        </p>
      </motion.div>
    </motion.main>
  );
}
