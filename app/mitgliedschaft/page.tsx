"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MitgliedschaftPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white px-6 pt-12 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
      >
        Werde Teil von <span className="text-teal-300">Mello</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-300 mb-10 text-center max-w-2xl leading-relaxed"
      >
        Egal ob Spieler, Mitgestalter oder Partner – unser Verein lebt von Menschen,
        die gemeinsam etwas Großes aufbauen wollen.
      </motion.p>

      {/* Drei Karten */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
      >
        {/* Spieler */}
        <div className="bg-black/60 border border-teal-300/30 rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(45,212,191,0.15)] hover:shadow-[0_0_35px_rgba(45,212,191,0.3)] transition-all duration-300">
          <h2 className="text-2xl font-semibold text-teal-300 mb-2">Spieler</h2>

          <p className="text-gray-300 mb-5 leading-relaxed">
            Egal ob du Anfänger oder erfahren bist – bei uns zählt Leidenschaft.
            Wir bauen ein neues Team auf, das gemeinsam wächst, lernt und etwas
            Besonderes entstehen lässt.
          </p>

          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-teal-400 text-black font-semibold shadow-[0_0_30px_rgba(45,212,191,0.7)] hover:bg-teal-300 hover:scale-105 transition-all duration-300"
          >
            Spieleranfrage senden
          </Link>
        </div>

        {/* Mitgestalten */}
        <div className="bg-black/60 border border-teal-300/30 rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(45,212,191,0.15)] hover:shadow-[0_0_35px_rgba(45,212,191,0.3)] transition-all duration-300">
          <h2 className="text-2xl font-semibold text-teal-300 mb-2">
            Mitgestalten
          </h2>

          <p className="text-gray-300 mb-5 leading-relaxed">
            Hilf mit, den Verein aktiv aufzubauen — ob Events, Organisation,
            kreative Ideen oder sogar Vorstand. Wir suchen Menschen, die etwas
            verändern wollen.
          </p>

          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-teal-400 text-black font-semibold shadow-[0_0_30px_rgba(45,212,191,0.7)] hover:bg-teal-300 hover:scale-105 transition-all duration-300"
          >
            Kontakt aufnehmen
          </Link>
        </div>

        {/* Sponsoren */}
        <div className="bg-black/60 border border-teal-300/30 rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(45,212,191,0.15)] hover:shadow-[0_0_35px_rgba(45,212,191,0.3)] transition-all duration-300">
          <h2 className="text-2xl font-semibold text-teal-300 mb-2">
            Sponsoren
          </h2>

          <p className="text-gray-300 mb-5 leading-relaxed">
            Unterstütze unsere Vision langfristig als Partner und hilf uns,
            den Verein professionell aufzubauen.
          </p>

          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-teal-400 text-black font-semibold shadow-[0_0_30px_rgba(45,212,191,0.7)] hover:bg-teal-300 hover:scale-105 transition-all duration-300"
          >
            Partner werden
          </Link>
        </div>
      </motion.div>

      {/* Unten: allgemeiner Kontakt */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-14 max-w-xl text-center"
      >
        <p className="text-gray-300 mb-6">
          Wenn du Mitglied werden möchtest, melde dich einfach über unser
          Kontaktformular. Wir melden uns persönlich bei dir.
        </p>

        <Link
          href="/kontakt"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-teal-400 text-black font-semibold text-lg shadow-[0_0_40px_rgba(45,212,191,0.7)] hover:bg-teal-300 transition-all duration-300"
        >
          Jetzt Mitglied werden
        </Link>

        <p className="mt-6 text-gray-500 text-sm">
          Der FC Mello Wien ist ein eingetragener gemeinnütziger Verein.
        </p>
      </motion.div>
    </main>
  );
}
