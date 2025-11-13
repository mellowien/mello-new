"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-black text-white flex items-center justify-center px-6">
      {/* Cinematic Background Layer */}
      <div className="pointer-events-none absolute inset-0">
        {/* Oberer Lichtfächer */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.55),_transparent_60%)] opacity-70 mix-blend-screen animate-softPulse" />

        {/* Diagonaler Lichtfächer links */}
        <div className="absolute left-[-20%] top-[10%] w-[700px] h-[500px] rotate-[-18deg] bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.45),_transparent_65%)] opacity-60 mix-blend-screen animate-slowDrift" />

        {/* Diagonaler Lichtfächer rechts */}
        <div className="absolute right-[-15%] bottom-[-10%] w-[700px] h-[500px] rotate-[16deg] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.4),_transparent_65%)] opacity-55 mix-blend-screen animate-slowDriftReverse" />

        {/* Subtiles dunkles Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_70%)] opacity-90" />

        {/* ganz feine Partikel-Ebene */}
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen noise-layer" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        {/* Textblock */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:text-left"
        >
          <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-teal-300/80 mb-4">
            FUTURE SPORT CLUB • WIEN
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-tight">
            Wir sind{" "}
            <span className="text-teal-300">
              Mello.
            </span>
            <br />
            Eine neue Ära für Wien.
          </h1>

          <p className="text-gray-300/90 mb-8 text-base md:text-lg leading-relaxed">
            Nicht nur ein Verein, sondern eine Bewegung.{" "}
            <span className="text-gray-100">
              Football, Community, Culture
            </span>{" "}
            – für eine Generation, die mehr will als nur 90 Minuten.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/mitgliedschaft"
              className="inline-flex items-center justify-center rounded-full bg-teal-400 text-black font-semibold px-7 py-2.5 text-sm md:text-base shadow-[0_0_35px_rgba(45,212,191,0.8)] hover:shadow-[0_0_45px_rgba(45,212,191,1)] hover:bg-teal-300 transition-all duration-300 hover:-translate-y-[1px]"
            >
              Jetzt Teil von Mello werden
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-teal-300/60 text-teal-100 px-7 py-2.5 text-sm md:text-base hover:bg-teal-300/10 hover:border-teal-300 transition-all duration-300"
            >
              Mehr über uns
            </Link>
          </div>

          {/* kleine Subline */}
          <p className="mt-5 text-xs md:text-sm text-gray-400/90">
            Erste Mitglieder prägen die Geschichte.{" "}
            <span className="text-teal-300/90">Du bist früh genug.</span>
          </p>
        </motion.section>

        {/* Logo + Cinematic Glow rechts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative group flex items-center justify-center">
            {/* starker Glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full blur-[80px] bg-[radial-gradient(circle,_rgba(34,211,238,0.65)_0%,_rgba(13,148,136,0.25)_55%,_transparent_75%)] opacity-90 animate-softPulseSlow group-hover:blur-[95px] transition-all duration-700" />

            {/* vertikaler Lichtstreifen */}
            <div className="absolute w-[3px] h-[220px] bg-gradient-to-b from-transparent via-teal-200/80 to-transparent blur-[1px] opacity-75 group-hover:opacity-100 animate-lightSweep" />

            {/* Logo-Container */}
            <div className="relative rounded-full border border-teal-300/40 bg-black/40 backdrop-blur-xl p-3 shadow-[0_0_25px_rgba(45,212,191,0.7)] group-hover:shadow-[0_0_40px_rgba(45,212,191,1)] transition-shadow duration-500">
              <Image
                src="/logo.png"
                alt="Mello Logo"
                width={170}
                height={170}
                className="rounded-full select-none pointer-events-none drop-shadow-[0_0_18px_rgba(45,212,191,0.9)]"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
