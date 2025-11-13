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
          Der <strong>FC Mello Wien</strong> ist Wiens jüngster Verein – entstanden aus dem
          Wunsch, etwas Neues aufzubauen. Etwas, das Bewegung, Gemeinschaft und eine moderne,
          offene Sportkultur vereint.
        </p>

        <p className="text-gray-300 mb-6">
          Was als einfache Idee begann – ein eigener Verein mit Charakter – wurde zu einem
          langfristigen Projekt. Wir wollen Strukturen schaffen, die modern, zugänglich und
          geprägt von einer neuen Generation an Sportkultur sind.
        </p>

        <p className="text-gray-300 mb-6">
          In den ersten Jahren übernehmen wir <strong>alles selbst</strong> – Organisation,
          Trainings, Social Media und den gesamten Vereinsaufbau. Ein kleines Team legt damit
          die Basis für etwas Größeres.
        </p>

        <p className="text-gray-300 mb-6">
          Langfristig möchten wir ein echter <strong>Multisportverein</strong> werden – mit
          Angeboten für Kinder, Jugendliche und Erwachsene. Basketball, Tennis und andere
          Sportarten werden folgen.
        </p>

        <p className="text-gray-300 mb-6">
          Der <strong>FC Mello Wien</strong> ist ein eingetragener gemeinnütziger Verein.
          Jeder Cent fließt zurück in den Sport und in den Aufbau des Vereins.
        </p>

        <p className="text-gray-300 font-medium text-lg mt-8 text-center">
          Mello ist mehr als ein Name.
          <span className="block text-teal-300 text-xl font-semibold mt-2">
            Es ist eine Bewegung. Und du kannst Teil davon sein.
          </span>
        </p>
      </motion.div>
    </main>
  );
}

