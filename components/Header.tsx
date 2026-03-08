"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Über uns",       href: "/ueber-uns" },
  { name: "Team",           href: "/team" },
  { name: "Mitgliedschaft", href: "/mitgliedschaft" },
  { name: "Kontakt",        href: "/kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(13,15,10,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #222222",
    }}>
      <div style={{
        padding: "0 3rem",
        height: "96px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo + Name */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "1.2rem", textDecoration: "none" }}>
          <img src="/logo.png" alt="FC Mello Wien" style={{ width: "62px", height: "62px", borderRadius: "50%" }} />
          <span style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "2.8rem",
            letterSpacing: ".12em",
            color: "#f5f5f5",
            WebkitFontSmoothing: "antialiased",
            lineHeight: 1,
          }}>MELLO</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{
          display: "flex", alignItems: "center", gap: "2.5rem",
        }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{
              color: "#888888", textDecoration: "none",
              fontSize: ".85rem", fontWeight: 500,
              letterSpacing: ".12em", textTransform: "uppercase",
            }}>
              {l.name}
            </Link>
          ))}
          <Link href="/tv" style={{
            color: "#0d9488", textDecoration: "none",
            fontSize: ".85rem", fontWeight: 600,
            letterSpacing: ".12em", textTransform: "uppercase",
          }}>
            Mello TV
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none",
            color: "#f5f5f5", cursor: "pointer",
            fontSize: "1.5rem", display: "none",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "#111111",
          borderTop: "1px solid #222222",
          padding: "1.5rem 2rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#888888", textDecoration: "none",
                fontSize: ".9rem", fontWeight: 500,
                letterSpacing: ".1em", textTransform: "uppercase",
              }}>
              {l.name}
            </Link>
          ))}
          <Link href="/tv"
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#0d9488", textDecoration: "none",
              fontSize: ".9rem", fontWeight: 600,
              letterSpacing: ".1em", textTransform: "uppercase",
            }}>
            Mello TV
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}