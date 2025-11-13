"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MitgliedschaftPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Werde Teil von <span className="text-teal-300">Mello</span>
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Egal ob Spieler, Supporter oder Partner – unser Verein lebt von Menschen,
          die gemeinsam etwas Großes aufbauen wollen.
        </p>

        {/* 3er Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Box */}
          {[
            { title: "Spieler", text: "Jeder ist willkommen – egal ob Anfänger oder erfahren." },
            { title: "Supporter", text: "Hilf mit bei Events, Projekten oder Organisation. Wir sind offen für alles." },
            { title: "Sponsoren", text: "Unterstütze unsere Vision langfristig als Partner." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-black/40 border border-teal-300/30 rounded-2xl p-8 shadow-[0_0_25px_rgba(45,212,191,0.15)]"
            >
              <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
              <p className="text-gray-300 mb-6">{item.text}</p>

              {/* Button → exakt wie Homepage */}
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-teal-400 text-black font-semibold px-7 py-2.5 text-sm
                shadow-[0_0_35px_rgba(45,212,191,0.8)]
                hover:shadow-[0_0_45px_rgba(45,212,191,1)]
                hover:bg-teal-300 transition-all duration-300 hover:-translate-y-[1px]"
              >
                Kontakt
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mitglied werden */}
        <p className="text-gray-300 mb-6">
          Wenn du Mitglied werden möchtest, melde dich einfach über unser Kontaktformular.
          Wir melden uns persönlich bei dir.
        </p>

        {/* Großer Button */}
        <Link
          href="/kontakt"
          className="inline-flex items-center justify-center rounded-full bg-teal-400 text-black font-semibold px-8 py-3 text-lg
          shadow-[0_0_35px_rgba(45,212,191,0.8)]
          hover:shadow-[0_0_50px_rgba(45,212,191,1)]
          hover:bg-teal-300 transition-all duration-300 hover:-translate-y-[2px]"
        >
          Jetzt Mitglied werden
        </Link>

        <p className="mt-10 text-gray-400 text-sm">
          Der FC Mello Wien ist ein eingetragener gemeinnütziger Verein.
        </p>
      </div>
    </main>
  );
}
