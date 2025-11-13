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
        Werde Teil von <span className="text-mello">Mello</span>
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

      {/* Drei Kategorien */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
      >

        <div className="bg-black/70 border border-mello rounded-xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.3)]">
          <h2 className="text-2xl font-semibold text-mello mb-2">Spieler</h2>
          <p className="text-gray-400 mb-4">
            Jeder ist willkommen – egal ob Anfänger oder erfahren.
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-mello text-black font-semibold rounded-full px-5 py-2 hover:scale-105 transition"
          >
            Kontakt
          </a>
        </div>

        <div className="bg-black/70 border border-mello rounded-xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.3)]">
          <h2 className="text-2xl font-semibold text-mello mb-2">Supporter</h2>
          <p className="text-gray-400 mb-4">
            Hilf mit bei Events, Projekten oder Organisation. Wir sind offen für alles.
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-mello text-black font-semibold rounded-full px-5 py-2 hover:scale-105 transition"
          >
            Kontakt
          </a>
        </div>

        <div className="bg-black/70 border border-mello rounded-xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.3)]">
          <h2 className="text-2xl font-semibold text-mello mb-2">Sponsoren</h2>
          <p className="text-gray-400 mb-4">
            Unterstütze unsere Vision langfristig als Partner.
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-mello text-black font-semibold rounded-full px-5 py-2 hover:scale-105 transition"
          >
            Kontakt
          </a>
        </div>

      </motion.div>

      {/* Abschluss */}
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
          className="inline-block bg-mello text-black font-semibold rounded-full px-8 py-3 text-lg hover:scale-105 transition-all hover:bg-teal-500"
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
