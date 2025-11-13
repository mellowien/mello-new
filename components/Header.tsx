"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Team", href: "/team" },
  { name: "Mitgliedschaft", href: "/mitgliedschaft" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50 
        bg-black/70 backdrop-blur-md
        border-b border-teal-300/30
        shadow-[0_0_25px_rgba(45,212,191,0.35)]
      "
    >
      <div className="mx-auto flex items-center justify-between px-6 py-3 max-w-7xl">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Mello Logo"
            width={45}
            height={45}
            className="
              rounded-full 
              hover:scale-110 
              transition-transform duration-300 
              drop-shadow-[0_0_15px_rgba(45,212,191,0.7)]
            "
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="
                text-gray-300 hover:text-teal-300 transition relative group
              "
            >
              {link.name}
              <span className="
                absolute left-0 -bottom-[3px] 
                w-0 h-[2px] bg-teal-300 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          ))}

          {/* Mello TV Button (hellere Version) */}
          <Link
            href="/tv"
            className="
              ml-4 bg-teal-400 text-black px-4 py-1.5 rounded-full font-semibold
              shadow-[0_0_25px_rgba(45,212,191,0.8)]
              hover:bg-teal-300 hover:scale-105 transition-all
            "
          >
            Mello TV
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 border-t border-teal-300/20 flex flex-col text-center pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-3 text-gray-300 hover:text-teal-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mello TV Button Mobile (hellere Version) */}
          <Link
            href="/tv"
            className="
              mx-auto mt-2 bg-teal-400 text-black px-6 py-2 rounded-full font-semibold
              shadow-[0_0_20px_rgba(45,212,191,0.8)]
              hover:bg-teal-300 hover:scale-105 transition-all
            "
            onClick={() => setMenuOpen(false)}
          >
            Mello TV
          </Link>
        </div>
      )}
    </header>
  );
}
