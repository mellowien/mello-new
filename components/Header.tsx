"use client";

import Link from "next/link";

const navLinks = [
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Team", href: "/team" },
  { name: "Mitgliedschaft", href: "/mitgliedschaft" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(8, 8, 8, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--mello-line, #222222)",
      }}
    >
      <style>{`
        .header-nav-link {
          color: rgba(247, 247, 244, 0.68);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s ease;
          white-space: nowrap;
        }

        .header-nav-link:hover {
          color: #f7f7f4;
        }

        .header-tv-link {
          color: #0d9488;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s ease, opacity 0.2s ease;
          white-space: nowrap;
        }

        .header-tv-link:hover {
          color: #14b8a6;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .header-inner {
            padding: 0 1rem !important;
            height: 64px !important;
          }

          .header-logo {
            width: 40px !important;
            height: 40px !important;
          }

          .header-mello {
            font-size: 1.45rem !important;
          }

          .desktop-nav {
            display: none !important;
          }

          .mobile-nav {
            display: flex !important;
            align-items: center;
            gap: 0.6rem;
          }

          .header-nav-link,
          .header-tv-link {
            font-size: 0.52rem !important;
            letter-spacing: 0.08em !important;
          }
        }

        /* default */
        .mobile-nav {
          display: none;
        }
      `}</style>

      <div
        className="header-inner"
        style={{
          padding: "0 3rem",
          height: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo + MELLO */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.05rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
            }}
          >
            <img
              className="header-logo"
              src="/mello-wien.png"
              alt="FC Mello Wien"
              width={56}
              height={56}
              style={{
                width: "56px",
                height: "56px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <span
            className="header-mello"
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "1.9rem",
              fontWeight: 700,
              letterSpacing: ".02em",
              lineHeight: 1,
              color: "#f7f7f4",
              textTransform: "uppercase",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            MELLO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.4rem",
          }}
        >
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="header-nav-link">
              {l.name}
            </Link>
          ))}

          <Link href="/tv" className="header-tv-link">
            Mello TV
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <nav className="mobile-nav">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="header-nav-link">
              {l.name}
            </Link>
          ))}

          <Link href="/tv" className="header-tv-link">
            Mello TV
          </Link>
        </nav>
      </div>
    </header>
  );
}