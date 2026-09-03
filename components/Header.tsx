"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Team", href: "/team" },
  { name: "Mitgliedschaft", href: "/mitgliedschaft" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

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

        .mobile-menu-button,
        .mobile-menu-panel {
          display: none;
        }

        @media (max-width: 768px) {
          .header-inner {
            box-sizing: border-box !important;
            height: 68px !important;
            padding: 0 1.1rem !important;
          }

          .header-brand {
            gap: .7rem !important;
          }

          .header-logo-wrap {
            height: 39px !important;
            width: 39px !important;
          }

          .header-logo {
            height: 39px !important;
            width: 39px !important;
          }

          .header-mello {
            font-size: 1.45rem !important;
            letter-spacing: .04em !important;
          }

          .desktop-nav {
            display: none !important;
          }

          .mobile-menu-button {
            align-items: center;
            background: transparent;
            border: 1px solid rgba(247,247,244,.26);
            border-radius: .55rem;
            color: #f7f7f4;
            cursor: pointer;
            display: inline-flex !important;
            height: 42px;
            justify-content: center;
            padding: 0;
            transition: border-color .2s ease, background .2s ease;
            width: 46px;
          }

          .mobile-menu-button:hover,
          .mobile-menu-button.is-open {
            background: rgba(13,148,136,.1);
            border-color: rgba(13,148,136,.78);
          }

          .mobile-menu-icon {
            display: flex;
            flex-direction: column;
            gap: 5px;
            width: 19px;
          }

          .mobile-menu-icon span {
            background: currentColor;
            display: block;
            height: 1.5px;
            transform-origin: center;
            transition: transform .22s ease, opacity .22s ease;
            width: 100%;
          }

          .mobile-menu-button.is-open .mobile-menu-icon span:nth-child(1) {
            transform: translateY(6.5px) rotate(45deg);
          }

          .mobile-menu-button.is-open .mobile-menu-icon span:nth-child(2) {
            opacity: 0;
          }

          .mobile-menu-button.is-open .mobile-menu-icon span:nth-child(3) {
            transform: translateY(-6.5px) rotate(-45deg);
          }

          .mobile-menu-panel {
            background: rgba(8,8,8,.98);
            border-bottom: 1px solid rgba(247,247,244,.14);
            box-shadow: 0 14px 32px rgba(0,0,0,.28);
            box-sizing: border-box;
            display: block !important;
            left: 0;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            padding: 0 1.1rem;
            pointer-events: none;
            position: absolute;
            right: 0;
            top: 68px;
            transform: translateY(-8px);
            transition: max-height .28s ease, opacity .22s ease, transform .28s ease, padding .28s ease;
          }

          .mobile-menu-panel.is-open {
            max-height: 32rem;
            opacity: 1;
            padding: .8rem 1.1rem 1.15rem;
            pointer-events: auto;
            transform: translateY(0);
          }

          .mobile-menu-link {
            align-items: center;
            border-bottom: 1px solid rgba(247,247,244,.1);
            color: #f7f7f4;
            display: flex;
            font-family: Arial, Helvetica, sans-serif;
            font-size: .76rem;
            font-weight: 800;
            justify-content: space-between;
            letter-spacing: .13em;
            min-height: 52px;
            text-decoration: none;
            text-transform: uppercase;
          }

          .mobile-menu-link::after {
            color: #0d9488;
            content: "→";
            font-size: 1rem;
            font-weight: 700;
          }

          .mobile-menu-tv {
            align-items: center;
            background: #0d9488;
            color: #080808;
            display: flex;
            font-family: Arial, Helvetica, sans-serif;
            font-size: .72rem;
            font-weight: 900;
            justify-content: center;
            letter-spacing: .14em;
            margin-top: 1rem;
            min-height: 49px;
            text-decoration: none;
            text-transform: uppercase;
          }

          .mobile-menu-tv::after {
            content: "→";
            font-size: 1rem;
            margin-left: .55rem;
          }
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
        <Link
          href="/"
          className="header-brand"
          onClick={closeMenu}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.05rem",
            textDecoration: "none",
          }}
        >
          <div
            className="header-logo-wrap"
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

        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.4rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="header-nav-link"
            >
              {link.name}
            </Link>
          ))}

          <Link href="/tv" className="header-tv-link">
            Mello TV
          </Link>
        </nav>

        <button
          type="button"
          className={`mobile-menu-button ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="mobile-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-menu-panel ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile Navigation"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="mobile-menu-link"
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        ))}

        <Link href="/tv" className="mobile-menu-tv" onClick={closeMenu}>
          Mello TV
        </Link>
      </nav>
    </header>
  );
}