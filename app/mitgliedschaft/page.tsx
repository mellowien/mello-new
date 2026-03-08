import Link from "next/link";

const mobileStyles = `
  @media (max-width: 768px) {
    .mitgl-hero    { padding: 3rem 1.5rem 2.5rem !important; }
    .mitgl-cards   { grid-template-columns: 1fr !important; padding: 2.5rem 1.5rem !important; }
    .mitgl-card    { border-left: none !important; border-top: 1px solid #1a1a1a; }
    .mitgl-card:first-child { border-top: none !important; }
    .mitgl-cta     { padding: 3rem 1.5rem !important; flex-direction: column !important; align-items: flex-start !important; }
    .mitgl-cta-btn { width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
  }
`;

const cards = [
  {
    title: "Spieler",
    desc: "Egal ob Anfänger oder erfahren — bei uns zählt Leidenschaft. Wir bauen ein neues Team auf, das gemeinsam wächst, lernt und etwas Besonderes entstehen lässt.",
    cta: "Spieleranfrage senden",
    href: "/kontakt",
  },
  {
    title: "Mitgestalten",
    desc: "Hilf mit, den Verein aktiv aufzubauen — ob Events, Organisation, kreative Ideen oder sogar Vorstand. Wir suchen Menschen, die etwas verändern wollen.",
    cta: "Kontakt aufnehmen",
    href: "/kontakt",
  },
  {
    title: "Sponsoren",
    desc: "Unterstütze unsere Vision langfristig als Partner und hilf uns, den Verein professionell aufzubauen.",
    cta: "Partner werden",
    href: "/kontakt",
  },
];

export default function MitgliedschaftPage() {
  return (
    <main style={{
      background: "#080808",
      color: "#f5f5f5",
      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      minHeight: "100vh",
      paddingTop: "96px",
    }}>

      <style>{mobileStyles}</style>

      {/* ── HERO ── */}
      <section className="mitgl-hero" style={{
        padding: "6rem 3rem 5rem",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #1a1a1a",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(13,148,136,.07) 0%, transparent 70%)",
        }} />
        <div style={{ maxWidth: "800px", position: "relative", zIndex: 1 }}>
        <h1 style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(4rem, 9vw, 8rem)",
            lineHeight: .9, letterSpacing: ".02em",
            color: "#f5f5f5", marginBottom: "2rem",
          }}>
            Werde Teil von <span style={{ color: "#0d9488" }}>Mello</span>
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "#888888", maxWidth: "55ch", lineHeight: 1.8,
          }}>
            Egal ob Spieler, Mitgestalter oder Partner — unser Verein lebt von Menschen, die gemeinsam etwas Großes aufbauen wollen.
          </p>
        </div>
      </section>

      {/* ── KARTEN ── */}
      <section className="mitgl-cards" style={{
        padding: "5rem 3rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2px",
        borderBottom: "1px solid #1a1a1a",
      }}>
        {cards.map((card, i) => (
          <div key={i} className="mitgl-card" style={{
            background: "#0f0f0f",
            padding: "3rem 2.5rem",
            borderLeft: i === 0 ? "none" : "1px solid #1a1a1a",
            display: "flex", flexDirection: "column",
          }}>
            <h2 style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
              letterSpacing: ".05em",
              color: "#f5f5f5",
              marginBottom: "1.2rem",
            }}>{card.title}</h2>
            <p style={{
              fontSize: ".95rem", color: "#666666",
              lineHeight: 1.8, flex: 1, marginBottom: "2rem",
            }}>{card.desc}</p>
            <Link href={card.href} style={{
              border: "1px solid rgba(13,148,136,.4)",
              color: "#0d9488",
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontWeight: 600, fontSize: ".8rem",
              letterSpacing: ".12em", textTransform: "uppercase",
              padding: ".85rem 1.5rem", textDecoration: "none",
              display: "inline-block", alignSelf: "flex-start",
            }}>{card.cta}</Link>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="mitgl-cta" style={{
        padding: "5rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "2rem",
      }}>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: ".02em", color: "#f5f5f5", margin: "0 0 .5rem",
          }}>Jetzt Mitglied werden</h2>
          <p style={{ fontSize: ".9rem", color: "#555555" }}>
            FC Mello Wien ist ein eingetragener gemeinnütziger Verein.
          </p>
        </div>
        <Link href="/kontakt" className="mitgl-cta-btn" style={{
          background: "#0d9488", color: "#ffffff",
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontWeight: 600, fontSize: ".85rem",
          letterSpacing: ".1em", textTransform: "uppercase",
          padding: "1rem 2.5rem", textDecoration: "none",
          display: "inline-block", whiteSpace: "nowrap",
        }}>
          Kontakt aufnehmen
        </Link>
      </section>

    </main>
  );
}