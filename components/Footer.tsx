"use client";

import Link from "next/link";

const navLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/team", label: "Team" },
  { href: "/mitgliedschaft", label: "Mitgliedschaft" },
  { href: "/tv", label: "Mello TV" },
];

const legalLinks = [
  { href: "/kontakt", label: "Kontakt" },
  { href: "/impressum", label: "Impressum" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--mello-black, #080808)",
        borderTop: "1px solid var(--mello-line, #222222)",
        color: "#f7f7f4",
        padding: "5rem 0 3.2rem",
        position: "relative",
      }}
    >
      <style>{`
        .footer-link {
          color: rgba(247, 247, 244, 0.65);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: #f7f7f4;
          transform: translateX(2px);
        }

        .footer-social-icon {
          color: rgba(247, 247, 244, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(247, 247, 244, 0.12);
          background: rgba(247, 247, 244, 0.03);
          transition: all 0.2s ease;
        }

        .footer-social-icon:hover {
          color: #080808;
          background: #0d9488;
          border-color: #0d9488;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.35);
        }

        @media (max-width: 820px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.8rem !important;
          }

          .footer-content {
            width: min(100% - 2.5rem, 1440px) !important;
          }
        }
      `}</style>

      <div
        className="footer-content"
        style={{
          width: "min(100% - 6rem, 1440px)",
          margin: "0 auto",
        }}
      >
        {/* Haupt-Grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1fr",
            gap: "4.5rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand-Bereich */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-block",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: "1.85rem",
                  fontWeight: 700,
                  letterSpacing: ".02em",
                  lineHeight: 1,
                  color: "#f7f7f4",
                  textTransform: "uppercase",
                }}
              >
                MELLO
              </span>
            </Link>

            <p
              style={{
                color: "rgba(247, 247, 244, 0.65)",
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.65,
                maxWidth: "34ch",
                margin: 0,
              }}
            >
              Sportlicher Anspruch trifft moderne Vereinskultur. Mello verbindet
               Ambition auf dem Platz mit einer echten Gemeinschaft.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                color: "#0d9488",
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "1.3rem",
              }}
            >
              Navigation
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {navLinks.map((l) => (
                <li key={l.href} style={{ marginBottom: "0.75rem" }}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div
              style={{
                color: "#0d9488",
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "1.3rem",
              }}
            >
              Rechtliches
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {legalLinks.map((l) => (
                <li key={l.href} style={{ marginBottom: "0.75rem" }}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--mello-line, #222222)",
            paddingTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              color: "rgba(247, 247, 244, 0.45)",
              fontFamily: "var(--font-body), Arial, sans-serif",
              fontSize: "0.74rem",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 FC Mello Wien
            <span style={{ color: "#0d9488", margin: "0 0.5rem" }}>·</span>
            Alle Rechte vorbehalten.
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            {[
              {
                href: "https://www.facebook.com/profile.php?id=61568867905394",
                label: "Facebook",
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                href: "https://www.instagram.com/fcmellowien/",
                label: "Instagram",
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
              {
                href: "https://www.twitch.tv/mellowien",
                label: "Twitch",
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2H3v16l4-4h14V2z" />
                    <line x1="9" y1="9" x2="9" y2="14" />
                    <line x1="15" y1="9" x2="15" y2="14" />
                  </svg>
                ),
              },
              {
                href: "https://www.youtube.com/channel/UCYzw8fGaVVVAhXQulyounww",
                label: "YouTube",
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                ),
              },
              {
                href: "https://www.tiktok.com/@fcmellowien",
                label: "TikTok",
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                ),
              },
              {
                href: "https://www.linkedin.com/company/mellowien",
                label: "LinkedIn",
                svg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social-icon"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}