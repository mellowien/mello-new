"use client";

import { motion } from "framer-motion";

export default function TeamPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden pt-28 pb-20">
      
      {/* --- Cinematic Background --- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] 
          bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.55),_transparent_60%)]
          opacity-70 mix-blend-screen animate-softPulse"
        />

        <div className="absolute left-[-20%] top-[10%] w-[700px] h-[500px] rotate-[-18deg] 
          bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.45),_transparent_65%)]
          opacity-60 mix-blend-screen animate-slowDrift"
        />

        <div className="absolute right-[-15%] bottom-[-10%] w-[700px] h-[500px] rotate-[16deg]
          bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.4),_transparent_65%)]
          opacity-55 mix-blend-screen animate-slowDriftReverse"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_70%)] opacity-90" />
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen noise-layer" />
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 text-center max-w-2xl">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Team <span className="text-teal-300">Coming Soon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-300 text-lg leading-relaxed mb-10"
        >
          Wir arbeiten gerade daran, die ersten Spieler, Verantwortlichen 
          und Staff-Mitglieder für den FC Mello Wien vorzustellen.  
          <br />  
          Schon bald kannst du hier sehen, wer die Bewegung trägt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="inline-block px-8 py-3 rounded-full bg-teal-400 text-black font-semibold shadow-[0_0_25px_rgba(45,212,191,0.8)] hover:shadow-[0_0_40px_rgba(45,212,191,1)] transition-all duration-300"
        >
          Bald verfügbar
        </motion.div>

      </div>
    </main>
  );
}
