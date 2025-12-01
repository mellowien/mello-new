"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6 pt-10 pb-20 md:pt-0">

      {/* Background Glow Layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.45),_transparent_65%)] opacity-70 md:opacity-80 mix-blend-screen"
        />
        <div
          className="hidden md:block absolute left-[-20%] top-[5%] w-[650px] h-[450px] rotate-[-18deg] bg-[radial-gradient(circle,_rgba(45,212,191,0.35),_transparent_70%)] opacity-60 mix-blend-screen"
        />
        <div
          className="hidden md:block absolute right-[-20%] bottom-[-10%] w-[650px] h-[450px] rotate-[15deg] bg-[radial-gradient(circle,_rgba(56,189,248,0.35),_transparent_70%)] opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_0%,_black_70%)] opacity-90" />
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen noise-layer" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">

        {/* TEXTBLOCK */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:text-left"
        >
          <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-teal-300/80 mb-4">
            FC MELLO WIEN • 2025
          </p>

          {/* ⭐ Professionelle Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-tight">
            Mello Wien – <span className="text-teal-300">Der Fußballverein für eine neue Generation.</span>
          </h1>

          <p className="text-gray-300/90 mb-4 text-base md:text-lg leading-relaxed">
            Wir sind Mello. Ein Verein, der moderner denkt: offen, gemeinschaftlich,
            ambitioniert. Ein Club für alle, die Fußball lieben – und gleichzeitig
            etwas Neues in Wien mitgestalten wollen.
          </p>

          <p className="text-gray-300/90 mb-8 text-base md:text-lg leading-relaxed">
            Bei uns findest du nicht nur ein Team, sondern eine Community, die zusammen
            trainiert, zusammen wächst und eine neue Fußballkultur prägt.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/mitgliedschaft"
              className="inline-flex items-center justify-center rounded-full bg-teal-400 text-black font-semibold px-7 py-2.5 text-sm md:text-base shadow-[0_0_35px_rgba(45,212,191,0.7)] hover:bg-teal-300 transition-all duration-300"
            >
              Jetzt Teil von Mello werden
            </Link>

            <Link
              href="/ueber-uns"
              className="inline-flex items-center justify-center rounded-full border border-teal-300/60 text-teal-100 px-7 py-2.5 text-sm md:text-base hover:bg-teal-300/10 transition-all duration-300"
            >
              Mehr über uns
            </Link>
          </div>

          <p className="mt-6 text-xs md:text-sm text-gray-400/90">
            Die erste Generation schreibt Geschichte.
            <span className="text-teal-300/90"> Sei von Anfang an dabei.</span>
          </p>
        </motion.section>

        {/* LOGO BLOCK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="flex justify-center md:justify-end w-full"
        >
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full blur-[70px] bg-[radial-gradient(circle,_rgba(34,211,238,0.55)_0%,_rgba(13,148,136,0.25)_55%,_transparent_75%)] opacity-80"
            />

            <div className="relative rounded-full border border-teal-300/40 bg-black/40 backdrop-blur-xl p-3 shadow-[0_0_25px_rgba(45,212,191,0.7)]">
              <Image
                src="/logo.png"
                alt="Mello Logo"
                width={130}
                height={130}
                className="rounded-full md:w-[170px] md:h-[170px] select-none pointer-events-none"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
