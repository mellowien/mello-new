"use client";

import { motion } from "framer-motion";

export default function ImpressumPage() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 pt-32 pb-20 flex flex-col items-center">

      {/* Subtiles Grid-Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      {/* Glow */}
      <div
        className="absolute top-40 w-[260px] h-[260px] rounded-full blur-[150px] opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(45,212,191,0.55), transparent)"
        }}
      ></div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-center mb-12"
      >
        Impressum
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative bg-black/70 border border-teal-300/30 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-3xl leading-relaxed shadow-[0_0_25px_rgba(45,212,191,0.2)]"
      >
        {/* Vereinsname */}
        <p className="text-gray-300 mb-4">
          <strong>Verein:</strong><br />
          Fußballclub Mello Wien (FC Mello Wien)
        </p>

        {/* ZVR-Zahl */}
        <p className="text-gray-300 mb-4">
          <strong>ZVR-Zahl:</strong> 1231202907
        </p>

        {/* Rechtsform */}
        <p className="text-gray-300 mb-4">
          <strong>Rechtsform:</strong><br />
          Gemeinnütziger, eingetragener Verein nach österreichischem Vereinsgesetz (VerG 2002)
        </p>

        {/* Adresse */}
        <p className="text-gray-300 mb-4">
          <strong>Vereinssitz:</strong><br />
          1020 Wien<br />
          Nordbahnstraße 47<br />
          Österreich
        </p>

        {/* Vertretung */}
        <p className="text-gray-300 mb-4">
          <strong>Vertretungsbefugnis:</strong><br />
          Der Verein wird nach außen vertreten durch den Obmann:<br />
          <span className="text-teal-300 font-semibold">Daniel Rezai</span>
          <br /><br />
          Schriftliche Ausfertigungen benötigen die Unterschrift des Obmanns und des/der Schriftführer/in.<br />
          In finanziellen Angelegenheiten: Obmann und Kassier/in.
        </p>

        {/* Kontakt */}
        <p className="text-gray-300 mb-4">
          <strong>Kontakt:</strong><br />
          E-Mail:{" "}
          <a href="mailto:kontakt@mellowien.at" className="text-teal-300 hover:underline">
            kontakt@mellowien.at
          </a><br />
          Website:{" "}
          <a href="https://mellowien.at" className="text-teal-300 hover:underline">
            mellowien.at
          </a>
        </p>

        {/* Vereinszweck */}
        <p className="text-gray-300 mb-4">
          <strong>Vereinszweck:</strong><br />
          Förderung des Sports, insbesondere Fußball, sowie Aufbau eines urbanen, modernen Multisportvereins.
        </p>

        {/* Haftung */}
        <p className="text-gray-300 mb-4">
          <strong>Haftungsausschluss:</strong><br />
          Alle Inhalte dieser Website wurden sorgfältig erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann keine Haftung übernommen werden.
          Für Inhalte externer Links ist ausschließlich der jeweilige Betreiber verantwortlich.
        </p>

        {/* Copyright */}
        <p className="text-gray-300 mb-4">
          <strong>Urheberrecht:</strong><br />
          Sämtliche Inhalte (Texte, Bilder, Grafiken, Medien) unterliegen dem Urheberrecht.
          Jede Nutzung außerhalb des Urheberrechts bedarf der schriftlichen Zustimmung.
        </p>
      </motion.div>
    </main>
  );
}
