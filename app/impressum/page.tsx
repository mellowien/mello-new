export default function ImpressumPage() {
  const sections = [
    { title: "Verein", content: "Fußballclub Mello Wien (FC Mello Wien)" },
    { title: "ZVR-Zahl", content: "1231202907" },
    { title: "Rechtsform", content: "Gemeinnütziger, eingetragener Verein nach österreichischem Vereinsgesetz (VerG 2002)" },
    { title: "Vereinssitz", content: "1020 Wien\nNordbahnstraße 47\nÖsterreich" },
    { title: "Vertretungsbefugnis", content: "Der Verein wird nach außen vertreten durch den Obmann:\nDaniel Rezai\n\nSchriftliche Ausfertigungen benötigen die Unterschrift des Obmanns und des/der Schriftführer/in.\nIn finanziellen Angelegenheiten: Obmann und Kassier/in." },
    { title: "Vereinszweck", content: "Förderung des Sports, insbesondere Fußball, sowie Aufbau eines urbanen, modernen Multisportvereins." },
    { title: "Haftungsausschluss", content: "Alle Inhalte dieser Website wurden sorgfältig erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann keine Haftung übernommen werden. Für Inhalte externer Links ist ausschließlich der jeweilige Betreiber verantwortlich." },
    { title: "Urheberrecht", content: "Sämtliche Inhalte (Texte, Bilder, Grafiken, Medien) unterliegen dem Urheberrecht. Jede Nutzung außerhalb des Urheberrechts bedarf der schriftlichen Zustimmung." },
  ];

  return (
    <main style={{
      background: "#080808", color: "#f5f5f5",
      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      minHeight: "100vh", paddingTop: "96px",
    }}>

      <style>{`
        @media (max-width: 768px) {
          .impr-hero    { padding: 3rem 1.5rem 2.5rem !important; }
          .impr-content { padding: 2rem 1.5rem !important; }
          .impr-row     { grid-template-columns: 1fr !important; gap: .5rem !important; padding: 1.5rem 0 !important; }
        }
      `}</style>

      <section className="impr-hero" style={{
        padding: "6rem 3rem 5rem", borderBottom: "1px solid #1a1a1a",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 40% 60% at 80% 50%, rgba(13,148,136,.06) 0%, transparent 70%)",
        }} />
        <h1 style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(4rem, 9vw, 8rem)",
          lineHeight: .9, letterSpacing: ".02em",
          color: "#f5f5f5", margin: 0, position: "relative", zIndex: 1,
        }}>Impressum</h1>
      </section>

      <section className="impr-content" style={{ padding: "4rem 3rem", maxWidth: "900px" }}>
        {sections.map((s, i) => (
          <div key={i} className="impr-row" style={{
            display: "grid", gridTemplateColumns: "220px 1fr",
            gap: "2rem", padding: "2rem 0", borderBottom: "1px solid #111111",
          }}>
            <div style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "1rem", letterSpacing: ".1em", color: "#0d9488", paddingTop: ".1rem",
            }}>{s.title}</div>
            <div style={{ fontSize: ".95rem", color: "#888888", lineHeight: 1.8 }}>
              {s.content.split("\n").map((line, j) => (
                <span key={j}>
                  {line === "Daniel Rezai"
                    ? <span style={{ color: "#f5f5f5", fontWeight: 500 }}>{line}</span>
                    : line}
                  {j < s.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="impr-row" style={{
          display: "grid", gridTemplateColumns: "220px 1fr",
          gap: "2rem", padding: "2rem 0", borderBottom: "1px solid #111111",
        }}>
          <div style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "1rem", letterSpacing: ".1em", color: "#0d9488", paddingTop: ".1rem",
          }}>Kontakt</div>
          <div style={{ fontSize: ".95rem", color: "#888888", lineHeight: 1.8 }}>
            E-Mail:{" "}<a href="mailto:kontakt@mellowien.at" style={{ color: "#0d9488", textDecoration: "none" }}>kontakt@mellowien.at</a><br />
            Website:{" "}<a href="https://mellowien.at" style={{ color: "#0d9488", textDecoration: "none" }}>mellowien.at</a>
          </div>
        </div>
      </section>

    </main>
  );
}