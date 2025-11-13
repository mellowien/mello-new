"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 pt-32 pb-24 flex flex-col items-center overflow-hidden">
      
      {/* --- Background Effects --- */}
      <div className="pointer-events-none select-none">
        {/* Cinematic Light Flares */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[800px] opacity-20 bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.35),transparent_70%)] animate-pulse-slow"></div>
        <div className="absolute top-40 right-0 w-[800px] h-[600px] opacity-[0.10] bg-[radial-gradient(circle,rgba(13,148,136,0.45),transparent_70%)] blur-3xl"></div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/grid.png')] bg-repeat"></div>
      </div>

      {/* --- Heading --- */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-center mb-16 tracking-tight"
      >
        Über <span className="text-mello">uns</span>
      </motion.h1>

      {/* --- Content Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25 }}
        className="relative bg-black/60 border border-mello/40 backdrop-blur-xl rounded-3xl p-10 md:p-14 max-w-3xl leading-relaxed shadow-[0_0_35px_rgba(13,148,136,0.25)]"
      >
        <p className="text-gray-300 mb-6">
          Der <strong>FC Mello Wien</strong> ist Wiens jüngster Verein — entstanden aus einer Idee,
          die größer ist als Fußball: Wir wollen Bewegung, Gemeinschaft und moderne Sportkultur
          verbinden.
        </p>

        <p className="text-gray-300 mb-6">
          Gegründet wurde Mello von Freunden, die nach Wien gezogen sind und nicht nur einen Platz
          zum Spielen gesucht haben — sondern eine Vision hatten: Einen urbanen, offenen Verein zu
          schaffen, der neue Wege geht.
        </p>

        <p className="text-gray-300 mb-6">
          Mello ist jung, energiegeladen und eigenständig. In den ersten Jahren stemmen wir fast alles selbst:
          Organisation, Training, Social Media, Strukturaufbau. Ein kleines Team baut etwas Großes auf.
        </p>

        <p className="text-gray-300 mb-6">
          Langfristig möchten wir ein moderner <strong>Multisportverein</strong> werden — mit Angeboten
          für Kinder, Jugendliche und Erwachsene. Fußball, Basketball, Tennis und mehr sollen Teil der
          Mello-Familie werden.
        </p>

        <p className="text-gray-300 mb-6">
          Der <strong>FC Mello Wien</strong> ist ein gemeinnütziger Verein. Jeder Euro, den wir erhalten,
          fließt zu 100% in den Sport — in Trainingsplätze, Material, Jugendarbeit und Infrastruktur.
        </p>

        <p className="text-gray-200 font-semibold text-lg mt-10 text-center">
          Mello ist mehr als ein Verein.  
          <span className="block text-mello text-2xl font-bold mt-2">
            Es ist eine Bewegung.
          </span>
        </p>
      </motion.div>
    </main>
  );
}
