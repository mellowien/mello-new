"use client";

export default function AboutPage() {
  const values = [
    { label: "Gemeinschaft", desc: "Ein Verein lebt durch seine Menschen. Wir bauen eine Community, die zusammenhält." },
    { label: "Ambition", desc: "Wir denken groß — sportlich und strukturell. Wachstum ist unser Antrieb." },
    { label: "Offenheit", desc: "Kein alter Muster, kein Ausschluss. Mello ist für alle, die mitmachen wollen." },
    { label: "Urbaner Spirit", desc: "Wien ist unser Zuhause. Die Stadt prägt uns — und wir prägen die Stadt." },
  ];

  return (
    <main style={{
      background: "#080808",
      color: "#f5f5f5",
      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      minHeight: "100vh",
      paddingTop: "96px",
    }}>

      <style>{`
        @media (max-width: 768px) {
          .about-hero   { padding: 3rem 1.5rem 2.5rem !important; }
          .about-story  { grid-template-columns: 1fr !important; padding: 3rem 1.5rem !important; gap: 2rem !important; }
          .about-values { padding: 3rem 1.5rem !important; }
          .about-values-grid { grid-template-columns: 1fr 1fr !important; }
          .about-vision { padding: 3rem 1.5rem !important; }
          .about-cta    { padding: 3rem 1.5rem !important; flex-direction: column !important; align-items: flex-start !important; }
          .about-cta a  { width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="about-hero" style={{
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
          <p style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            letterSpacing: ".2em", color: "#0d9488", marginBottom: "1rem",
          }}>Wer wir sind</p>
          <h1 style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(4rem, 9vw, 8rem)",
            lineHeight: .9, letterSpacing: ".02em",
            color: "#f5f5f5", marginBottom: "2rem",
          }}>
            Über <span style={{ color: "#0d9488" }}>Mello</span>
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "#888888", maxWidth: "55ch", lineHeight: 1.8,
          }}>
            Mello Wien ist ein moderner Fußballverein — geschaffen für eine neue Generation von Spielern, Fans und Menschen, die Sport anders leben wollen.
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="about-story" style={{
        padding: "6rem 3rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "6rem",
        alignItems: "start",
        borderBottom: "1px solid #1a1a1a",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(2.5rem, 4vw, 4rem)",
          lineHeight: 1, letterSpacing: ".02em",
          color: "#f5f5f5", margin: 0,
        }}>
          Warum wir Mello<br />
          <span style={{ color: "#0d9488" }}>gegründet haben</span>
        </h2>
        <div style={{ color: "#888888", fontSize: "1rem", lineHeight: 1.9 }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Wir haben Mello gegründet, weil etwas gefehlt hat: ein Verein, der offen denkt, Gemeinschaft lebt und sportliche Ambition mit einer modernen Identität verbindet. Ein Club, der nicht in alten Mustern steckt, sondern Fußball neu interpretiert.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Die ersten Jahre legen wir selbst Hand an: Organisation, Trainings, Social Media, Vereinsaufbau. Das Fundament entsteht durch Menschen, die an etwas Größeres glauben. Jeder Cent fließt zurück in den Sport.
          </p>
          <p style={{ color: "rgba(245,245,245,.6)" }}>
            Mello Wien ist ein eingetragener, gemeinnütziger Verein.
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="about-values" style={{
        padding: "6rem 3rem",
        borderBottom: "1px solid #1a1a1a",
      }}>
        <p style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          letterSpacing: ".2em", color: "#0d9488",
          marginBottom: "3rem", textTransform: "uppercase",
        }}>Unsere Werte</p>
        <div className="about-values-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2px",
        }}>
          {values.map((v, i) => (
            <div key={i} style={{
              background: "#0f0f0f",
              padding: "2.5rem 2rem",
              borderLeft: i === 0 ? "none" : "1px solid #1a1a1a",
            }}>
              <div style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                letterSpacing: ".05em", color: "#f5f5f5", marginBottom: "1rem",
              }}>{v.label}</div>
              <p style={{ fontSize: ".9rem", color: "#666666", lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="about-vision" style={{
        padding: "6rem 3rem",
        borderBottom: "1px solid #1a1a1a",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 40% 60% at 20% 50%, rgba(13,148,136,.05) 0%, transparent 70%)",
        }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            lineHeight: .95, letterSpacing: ".02em",
            color: "#f5f5f5", marginBottom: "2rem",
          }}>
            Fußball ist unser<br />
            <span style={{ color: "#0d9488" }}>Startpunkt</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#888888", lineHeight: 1.8, marginBottom: "3rem" }}>
            Unsere Vision geht weit über Fußball hinaus. Schritt für Schritt bauen wir einen modernen Mehrsparten-Sportverein auf — mit langfristigen Angeboten für Kinder, Jugendliche und Erwachsene. Fußball ist unser Startpunkt, aber nicht unser Ziel.
          </p>
          <p style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
            letterSpacing: ".08em", color: "#0d9488",
          }}>
            Mello ist mehr als ein Verein. Es ist eine Bewegung.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta" style={{
        padding: "5rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "2rem",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          letterSpacing: ".02em", color: "#f5f5f5", margin: 0,
        }}>
          Sei von Anfang an dabei
        </h2>
        <a href="/mitgliedschaft" style={{
          background: "#0d9488", color: "#ffffff",
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontWeight: 600, fontSize: ".85rem",
          letterSpacing: ".1em", textTransform: "uppercase",
          padding: "1rem 2.5rem", textDecoration: "none",
          display: "inline-block", whiteSpace: "nowrap",
        }}>
          Jetzt Mitglied werden
        </a>
      </section>

    </main>
  );
}