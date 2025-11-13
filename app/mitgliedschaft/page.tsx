"use client";

import { motion } from "framer-motion";

export default function MitgliedschaftPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white px-6 pt-6 pb-20">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
      >
        Werde Teil von <span className="text-teal-400">Mello</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 mb-10 text-center max-w-2xl"
      >
        Egal ob Spieler, Supporter oder Partner – unser Verein lebt von Menschen,
        die gemeinsam etwas Großes aufbauen wollen.
      </motion.p>

      {/* Drei Kategorie-Karten */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
      >

        {/* Spieler */}
        <div className="bg-black/70 border border-teal-400/40 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.3)]">
          <h2 className="text-2xl font-semibold text-teal-400 mb-2">Spieler</h2>
          <p className="text-gray-400 mb-4">
            Jeder ist willkommen – egal ob Anfänger oder erfahren.
          </p>
          <a
            href="/kontakt"
            className="relative px-6 py-2 rounded-full font-semibold text-white 
            bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.7),rgba(16,185,129,0.15),transparent)]
            shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-teal-500/40 
            hover:scale-105 transition-all duration-300"
          >
            Kontakt
          </a>
        </div>

        {/* Supporter */}
        <div className="bg-black/70 border border-teal-400/40 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.3)]">
          <h2 className="text-2xl font-semibold text-teal-400 mb-2">Supporter</h2>
          <p className="text-gray-400 mb-4">
            Hilf mit bei Events, Projekten oder Organisation. Wir sind offen für alles.
          </p>
          <a
            href="/kontakt"
            className="relative px-6 py-2 rounded-full font-semibold text-white 
            bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.7),rgba(16,185,129,0.15),transparent)]
            shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-teal-500/40 
            hover:scale-105 transition-all duration-300"
          >
            Kontakt
          </a>
        </div>

        {/* Sponsoren */}
        <div className="bg-black/70 border border-teal-400/40 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.3)]">
          <h2 className="text-2xl font-semibold text-teal-400 mb-2">Sponsoren</h2>
          <p className="text-gray-400 mb-4">
            Unterstütze unsere Vision langfristig als Partner.
          </p>
          <a
            href="/kontakt"
            className="relative px-6 py-2 rounded-full font-semibold text-white 
            bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.7),rgba(16,185,129,0.15),transparent)]
            shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-teal-500/40 
            hover:scale-105 transition-all duration-300"
          >
            Kontakt
          </a>
        </div>

      </motion.div>

      {/* Footer Bereich */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-14 text-center"
      >
        <p className="text-gray-400 mb-4 max-w-xl mx-auto">
          Wenn du Mitglied werden möchtest, melde dich einfach über unser Kontaktformular.
          Wir melden uns persönlich bei dir.
        </p>

        <a
          href="/kontakt"
          className="relative px-8 py-3 rounded-full font-semibold text-white text-lg
          bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.7),rgba(16,185,129,0.15),transparent)]
          shadow-[0_0_35px_rgba(16,185,129,0.5)] border border-teal-500/40 
          hover:scale-105 transition-all duration-300"
        >
          Jetzt Mitglied werden
        </a>

        <p className="text-gray-500 mt-6 text-sm">
          Der FC Mello Wien ist ein eingetragener gemeinnütziger Verein.
        </p>
      </motion.div>

    </main>
  );
}
