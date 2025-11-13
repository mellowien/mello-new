"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MitgliedschaftPage() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 pt-32 pb-24 flex flex-col items-center overflow-hidden">

      {/* Hintergrund Effekte */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(13,148,136,0.45),transparent_70%)] blur-[150px] opacity-30"></div>

        {/* Subtiles Grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Titel */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-center mb-10 tracking-tight"
      >
        Mitgliedschaft
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-300 text-center max-w-2xl leading-relaxed mb-14"
      >
        Werde Teil von <span className="text-mello font-semibold">Mello</span>.
        Unterstütze einen modernen, jungen Verein und hilf mit, etwas Neues
        aufzubauen — egal ob als Spieler, Supporter oder Förderer.
      </motion.p>

      {/* 3 Karten */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        {/* Spieler */}
        <div className="bg-black/70 border border-mello/40 rounded-3xl p-8 text-center shadow-[0_0_25px_rgba(13,148,136,0.25)] hover:shadow-[0_0_35px_rgba(13,148,136,0.5)] transition-all">
          <h2 className="text-3xl font-bold text-mello mb-3">Spieler</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Egal ob Anfänger oder erfahren — jeder ist willkommen.  
            Werde Teil der ersten Generation des FC Mello Wien.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-mello text-black font-semibold rounded-full px-6 py-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(13,148,136,0.4)]"
          >
            Bewerben
          </Link>
        </div>

        {/* Supporter */}
        <div className="bg-black/70 border border-mello/40 rounded-3xl p-8 text-center shadow-[0_0_25px_rgba(13,148,136,0.25)] hover:shadow-[0_0_35px_rgba(13,148,136,0.5)] transition-all">
          <h2 className="text-3xl font-bold text-mello mb-3">Supporter</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Hilf bei Organisation, Media, Events oder bring neue Ideen ein.  
            Mello wächst — und du kannst mitgestalten.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-mello text-black font-semibold rounded-full px-6 py-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(13,148,136,0.4)]"
          >
            Mitmachen
          </Link>
        </div>

        {/* Sponsoren */}
        <div className="bg-black/70 border border-mello/40 rounded-3xl p-8 text-center shadow-[0_0_25px_rgba(13,148,136,0.25)] hover:shadow-[0_0_35px_rgba(13,148,136,0.5)] transition-all">
          <h2 className="text-3xl font-bold text-mello mb-3">Sponsoren</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Werde Partner und unterstütze Wiens modernsten Sportverein.  
            Gemeinsam schaffen wir etwas Großes.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-mello text-black font-semibold rounded-full px-6 py-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(13,148,136,0.4)]"
          >
            Kontakt
          </Link>
        </div>
      </motion.div>

      {/* Info Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-gray-500 text-sm text-center max-w-lg mt-14"
      >
        Der <strong>FC Mello Wien</strong> ist ein eingetragener gemeinnütziger Verein.
        Jeder Beitrag fließt direkt zurück in Sport, Jugendförderung und Infrastruktur.
      </motion.p>
    </main>
  );
}
