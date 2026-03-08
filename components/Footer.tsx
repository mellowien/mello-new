"use client";

import Link from "next/link";

const navLinks = [
  { href: "/ueber-uns",      label: "Über uns" },
  { href: "/team",           label: "Team" },
  { href: "/mitgliedschaft", label: "Mitgliedschaft" },
  { href: "/tv",             label: "Mello TV" },
];

const legalLinks = [
  { href: "/kontakt",   label: "Kontakt" },
  { href: "/impressum", label: "Impressum" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "#111111",
      borderTop: "1px solid #222222",
      padding: "4rem 3rem 2.5rem",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .footer-brand-name { font-size: 1.4rem !important; }
        }
      `}</style>

      {/* Top grid */}
      <div className="footer-grid" style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "4rem",
        marginBottom: "3rem",
      }}>

        {/* Brand */}
        <div>
          <Link href="/" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.8rem",
            color: "#0d9488",
            display: "block",
            marginBottom: ".8rem",
            textDecoration: "none",
            letterSpacing: ".08em",
          }} className="footer-brand-name">
            FC MELLO WIEN
          </Link>
          <p style={{ color: "#888888", fontSize: ".9rem", maxWidth: "28ch", lineHeight: 1.6 }}>
            Ein Verein, der moderner denkt — offen, gemeinschaftlich, ambitioniert.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{
            fontSize: ".65rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "#0d9488",
            marginBottom: "1.2rem", fontWeight: 500,
          }}>Navigation</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navLinks.map((l) => (
              <li key={l.href} style={{ marginBottom: ".6rem" }}>
                <Link href={l.href} style={{ color: "#888888", textDecoration: "none", fontSize: ".9rem" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{
            fontSize: ".65rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "#0d9488",
            marginBottom: "1.2rem", fontWeight: 500,
          }}>Rechtliches</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {legalLinks.map((l) => (
              <li key={l.href} style={{ marginBottom: ".6rem" }}>
                <Link href={l.href} style={{ color: "#888888", textDecoration: "none", fontSize: ".9rem" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid #222222",
        paddingTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.2rem",
      }}>
        <span style={{ fontSize: ".78rem", color: "#888888", letterSpacing: ".05em" }}>
          © 2026 FC Mello Wien
          <span style={{ color: "#0d9488", margin: "0 .4rem" }}>—</span>
          Alle Rechte vorbehalten.
        </span>

        {/* Social Icons */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {[
            {
              href: "https://instagram.com/mellowien",
              label: "Instagram",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
            },
            {
              href: "https://twitch.tv/mellowien",
              label: "Twitch",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16l4-4h14V2z"/><line x1="9" y1="9" x2="9" y2="14"/><line x1="15" y1="9" x2="15" y2="14"/></svg>,
            },
            {
              href: "https://youtube.com/@mellowien",
              label: "YouTube",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
            },
            {
              href: "https://tiktok.com/@mellowien",
              label: "TikTok",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
            },
            {
              href: "https://linkedin.com/company/mellowien",
              label: "LinkedIn",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
            },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={s.label}
              style={{ color: "#555555", transition: "color .2s", display: "flex" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0d9488")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
            >
              {s.svg}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const navLinks = [
  { href: "/ueber-uns",      label: "Über uns" },
  { href: "/team",           label: "Team" },
  { href: "/mitgliedschaft", label: "Mitgliedschaft" },
  { href: "/tv",             label: "Mello TV" },
];

const legalLinks = [
  { href: "/kontakt",   label: "Kontakt" },
  { href: "/impressum", label: "Impressum" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "#111111",
      borderTop: "1px solid #222222",
      padding: "4rem 3rem 2.5rem",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Top grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "4rem",
        marginBottom: "3rem",
      }}>

        {/* Brand */}
        <div>
          <Link href="/" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2.5rem",
            color: "#0d9488",
            display: "block",
            marginBottom: ".8rem",
            textDecoration: "none",
            letterSpacing: ".05em",
          }}>
            FC MELLO WIEN
          </Link>
          <p style={{ color: "#888888", fontSize: ".9rem", maxWidth: "28ch", lineHeight: 1.6 }}>
            Ein Verein, der moderner denkt — offen, gemeinschaftlich, ambitioniert.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{
            fontSize: ".65rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "#0d9488",
            marginBottom: "1.2rem", fontWeight: 500,
          }}>Navigation</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navLinks.map((l) => (
              <li key={l.href} style={{ marginBottom: ".6rem" }}>
                <Link href={l.href} style={{ color: "#888888", textDecoration: "none", fontSize: ".9rem" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{
            fontSize: ".65rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "#0d9488",
            marginBottom: "1.2rem", fontWeight: 500,
          }}>Rechtliches</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {legalLinks.map((l) => (
              <li key={l.href} style={{ marginBottom: ".6rem" }}>
                <Link href={l.href} style={{ color: "#888888", textDecoration: "none", fontSize: ".9rem" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid #222222",
        paddingTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.2rem",
      }}>
        <span style={{ fontSize: ".78rem", color: "#888888", letterSpacing: ".05em" }}>
          © 2026 FC Mello Wien
          <span style={{ color: "#0d9488", margin: "0 .4rem" }}>—</span>
          Alle Rechte vorbehalten.
        </span>

        {/* Social Icons */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {[
            {
              href: "https://instagram.com/mellowien",
              label: "Instagram",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
            },
            {
              href: "https://twitch.tv/mellowien",
              label: "Twitch",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16l4-4h14V2z"/><line x1="9" y1="9" x2="9" y2="14"/><line x1="15" y1="9" x2="15" y2="14"/></svg>,
            },
            {
              href: "https://youtube.com/@mellowien",
              label: "YouTube",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
            },
            {
              href: "https://tiktok.com/@mellowien",
              label: "TikTok",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
            },
            {
              href: "https://linkedin.com/company/mellowien",
              label: "LinkedIn",
              svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
            },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={s.label}
              style={{ color: "#555555", transition: "color .2s", display: "flex" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0d9488")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
            >
              {s.svg}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}