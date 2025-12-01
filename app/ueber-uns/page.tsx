"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 pt-32 pb-20 flex flex-col items-center">

      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      {/* Glow */}
      <div
        className="absolute top-40 w-[260px] h-[260px] rounded-full blur-[150px] opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(45,212,191,0.7), transparent)"
        }}
      ></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-center mb-12"
      >
        Über <span className="text-teal-300">uns</span>
      </motion.h1>

      {/* Textbox */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative bg-black/70 border border-teal-300/40 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-3xl leading-relaxed shadow-[0_0_25px_rgba(45,212,191,0.25)]"
      >
        <p className="text-gray-300 mb-6">
          <strong>Mello Wien</strong> ist ein moderner Fußballverein – geschaffen für eine neue
          Generation von Spielern, Fans und Menschen, die Sport anders leben wollen. Wir verbinden
          Fußball mit Gemeinschaft, urbaner Kultur und einem klaren, zeitgemäßen Zugang zum Vereinsleben.
        </p>

        <p className="text-gray-300 mb-6">
          Wir haben Mello gegründet, weil etwas gefehlt hat: ein Verein, der offen denkt,
          Gemeinschaft lebt und sportliche Ambition mit einer modernen Identität verbindet. 
          Ein Club, der nicht in alten Mustern steckt, sondern Fußball neu interpretiert.
        </p>

        <p className="text-gray-300 mb-6">
          Bei Mello stehen unsere Werte im Mittelpunkt: Gemeinschaft, Ambition, Entwicklung,
          Offenheit und ein urbaner Spirit, der uns und die Stadt Wien verbindet. Wir wollen
          einen Raum schaffen, in dem jeder wachsen kann – sportlich und menschlich.
        </p>

        <p className="text-gray-300 mb-6">
          Unsere Vision geht weit über Fußball hinaus. Schritt für Schritt bauen wir einen
          <strong> modernen Mehrsparten-Sportverein</strong> auf – mit langfristigen Angeboten
          für Kinder, Jugendliche und Erwachsene. Fußball ist unser Startpunkt, aber nicht unser Ziel.
        </p>

        <p className="text-gray-300 mb-6">
          Die ersten Jahre legen wir selbst Hand an: Organisation, Trainings, Social Media,
          Vereinsaufbau. Das Fundament entsteht durch Menschen, die an etwas Größeres glauben.
          Jeder Cent fließt zurück in den Sport – Mello Wien ist ein eingetragener,
          gemeinnütziger Verein.
        </p>

        <p className="text-gray-300 font-medium text-lg mt-8 text-center">
          Mello ist mehr als ein Verein.
          <span className="block text-teal-300 text-xl font-semibold mt-2">
            Es ist eine Bewegung. Und du kannst Teil davon sein.
          </span>
        </p>
      </motion.div>
    </main>
  );
}
