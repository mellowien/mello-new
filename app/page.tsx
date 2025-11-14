"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-black text-white flex items-center justify-center px-6 pt-10 md:pt-0">
      
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0">

        {/* Oberer Glow – Mobile kleiner */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 
          w-[900px] h-[450px] 
          md:w-[1200px] md:h-[600px]
          bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.55),transparent_60%)]
          opacity-70 mix-blend-screen animate-softPulse"
        />

        {/* Linker Glow */}
        <div className="absolute left-[-30%] top-[10%] 
          w-[450px] h-[350px] 
          md:w-[700px] md:h-[500px]
          rotate-[-18deg]
          bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.45),transparent_65%)]
          opacity-60 mix-blend-screen animate-slowDrift"
        />

        {/* Rechter Glow */}
        <div className="absolute right-[-25%] bottom-[5%]
          w-[450px] h-[350px]
          md:w-[700px] md:h-[500px]
          rotate-[16deg]
          bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.4),transparent_65%)]
          opacity-55 mix-blend-screen animate-slowDriftReverse"
        />

        {/* Vignette */}
        <div className="absolute inset-0 
          bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)] 
          opacity-90"
        />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen noise-layer" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 
        md:grid-cols-[1.4fr_1fr] gap-12 items-center">

        {/* Textblock */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:text-left px-2"
        >
          <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-teal-300/80 mb-3">
            FUTURE SPORT CLUB • WIEN
          </p>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
            Wir sind <span className="text-teal-300">Mello.</span>
            <br />
            Ein Verein, der verbindet.
          </h1>

          <p className="text-gray-300/90 mb-5 text-base md:text-lg leading-relaxed">
            Wir schaffen eine sportliche Heimat für Spieler, Mitglieder
            und alle, die etwas Neues in Wien mitgestalten wollen.
          </p>

          <p className="text-gray-300/90 mb-7 text-base md:text-lg leading-relaxed">
            Für Spieler, Unterstützer und Partner, die gemeinsam etwas aufbauen wollen.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/mitgliedschaft"
              className="inline-flex items-center justify-center rounded-full 
              bg-teal-400 text-black font-semibold px-7 py-2.5 text-sm md:text-base
              shadow-[0_0_30px_rgba(45,212,191,0.7)]
              hover:shadow-[0_0_45px_rgba(45,212,191,1)]
              hover:bg-teal-300 transition-all duration-300"
            >
              Jetzt Teil von Mello werden
            </Link>

            <Link
              href="/ueber-uns"
              className="inline-flex items-center justify-center rounded-full 
              border border-teal-300/60 text-teal-100 px-7 py-2.5 text-sm md:text-base
              hover:bg-teal-300/10 hover:border-teal-300 transition-all duration-300"
            >
              Mehr über uns
            </Link>
          </div>

          <p className="mt-4 text-xs md:text-sm text-gray-400/90">
            Erste Mitglieder prägen die Geschichte.{" "}
            <span className="text-teal-300/90">Du bist früh genug.</span>
          </p>
        </motion.section>

        {/* Logo Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative group flex items-center justify-center">

            {/* Glow – Mobile deutlich kleiner */}
            <div className="absolute 
              w-[180px] h-[180px]
              md:w-[260px] md:h-[260px]
              rounded-full blur-[60px] md:blur-[80px]
              bg-[radial-gradient(circle,rgba(34,211,238,0.65)_0%,rgba(13,148,136,0.25)_55%,transparent_75%)]
              opacity-90 animate-softPulseSlow"
            />

            {/* Lichtstreifen */}
            <div className="absolute 
              w-[2px] h-[150px] 
              md:w-[3px] md:h-[220px]
              bg-gradient-to-b from-transparent via-teal-200/80 to-transparent 
              blur-[1px] opacity-75 animate-lightSweep"
            />

            {/* Logo Container */}
            <div className="relative rounded-full border border-teal-300/40 
              bg-black/40 backdrop-blur-xl 
              p-2.5 md:p-3 
              shadow-[0_0_20px_rgba(45,212,191,0.7)] md:shadow-[0_0_25px_rgba(45,212,191,0.7)]"
            >
              <Image
                src="/logo.png"
                alt="Mello Logo"
                width={120}
                height={120}
                className="md:w-[170px] md:h-[170px] rounded-full select-none pointer-events-none 
                  drop-shadow-[0_0_18px_rgba(45,212,191,0.9)]"
                priority
              />
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
