"use client";

import Link from "next/link";

const navLinks = [
  { name: "Über uns",       href: "/ueber-uns" },
  { name: "Team",           href: "/team" },
  { name: "Mitgliedschaft", href: "/mitgliedschaft" },
  { name: "Kontakt",        href: "/kontakt" },
];

export default function Header() {
  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "rgba(13,15,10,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #222222",
    }}>
      <style>{`

        /* MOBILE */
        @media (max-width: 768px) {

          .header-inner {
            padding: 0 0.6rem !important;
            height: 58px !important;
          }

          .header-logo {
            width: 32px !important;
            height: 32px !important;
          }

          .header-mello {
            display: none !important;
          }

          .desktop-nav {
            display: none !important;
          }

          .mobile-nav {
            display: flex !important;
            align-items: center;
            gap: 0.45rem;
          }

          .mobile-nav a {
            font-size: .55rem !important;
            letter-spacing: .05em !important;
            white-space: nowrap;
          }

        }

        /* default */
        .mobile-nav {
          display: none;
          align-items: center;
          gap: 1rem;
          flex-wrap: nowrap;
        }

      `}</style>

      <div
        className="header-inner"
        style={{
          padding: "0 3rem",
          height: "96px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        {/* Logo + MELLO */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            textDecoration: "none",
          }}
        >
          <img
            className="header-logo"
            src="/logo.png"
            alt="FC Mello Wien"
            style={{
              width: "62px",
              height: "62px",
              borderRadius: "50%",
            }}
          />

          <span
            className="header-mello"
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "2.8rem",
              letterSpacing: ".12em",
              color: "#f5f5f5",
              WebkitFontSmoothing: "antialiased",
              lineHeight: 1,
            }}
          >
            MELLO
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: "#888888",
                textDecoration: "none",
                fontSize: ".85rem",
                fontWeight: 500,
                letterSpacing: ".12em",
                textTransform: "uppercase",
              }}
            >
              {l.name}
            </Link>
          ))}

          <Link
            href="/tv"
            style={{
              color: "#0d9488",
              textDecoration: "none",
              fontSize: ".85rem",
              fontWeight: 600,
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}
          >
            Mello TV
          </Link>
        </nav>

        {/* Mobile nav */}
        <nav className="mobile-nav">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: "#888888",
                textDecoration: "none",
                fontSize: ".55rem",
                fontWeight: 500,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {l.name}
            </Link>
          ))}

          <Link
            href="/tv"
            style={{
              color: "#0d9488",
              textDecoration: "none",
              fontSize: ".55rem",
              fontWeight: 600,
              letterSpacing: ".05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Mello TV
          </Link>
        </nav>

      </div>
    </header>
  );
}