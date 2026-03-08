"use client";

export default function MelloTVPage() {
  return (
    <main style={{
      background: "#080808", color: "#f5f5f5",
      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      minHeight: "100vh", paddingTop: "96px",
    }}>

      <style>{`
        @media (max-width: 768px) {
          .tv-hero       { padding: 3rem 1.5rem 2rem !important; }
          .tv-stream     { padding: 2rem 1.5rem 0 !important; }
          .tv-highlights { grid-template-columns: 1fr !important; padding: 3rem 1.5rem !important; gap: 2.5rem !important; }
        }
      `}</style>

      <section className="tv-hero" style={{
        padding: "4rem 3rem 3rem", borderBottom: "1px solid #1a1a1a",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(13,148,136,.07) 0%, transparent 70%)",
        }} />
        <h1 style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          lineHeight: .9, letterSpacing: ".02em",
          color: "#f5f5f5", marginBottom: ".5rem", position: "relative", zIndex: 1,
        }}>
          Mello <span style={{ color: "#0d9488" }}>TV</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "#555555", letterSpacing: ".05em", position: "relative", zIndex: 1 }}>
          Livestream · Highlights · Momente
        </p>
      </section>

      <section className="tv-stream" style={{ padding: "3rem 3rem 0", display: "flex", justifyContent: "center" }}>
        <div style={{
          width: "100%", maxWidth: "800px", aspectRatio: "16/9",
          border: "1px solid rgba(13,148,136,.5)",
          boxShadow: "0 0 30px rgba(13,148,136,.25), 0 0 80px rgba(13,148,136,.1)",
          overflow: "hidden", background: "#000",
        }}>
          <iframe
            src="https://player.twitch.tv/?channel=mellowien&parent=mellowien.at&parent=www.mellowien.at&parent=localhost&parent=127.0.0.1"
            height="100%" width="100%" allowFullScreen style={{ display: "block" }}
          />
        </div>
      </section>

      <section className="tv-highlights" style={{
        padding: "5rem 3rem", display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: "6rem",
        alignItems: "center", borderTop: "1px solid #1a1a1a", marginTop: "3rem",
      }}>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(2.5rem, 4vw, 4rem)",
            lineHeight: 1, letterSpacing: ".02em", color: "#f5f5f5", marginBottom: "1.5rem",
          }}>
            Highlights<br /><span style={{ color: "#0d9488" }}>Coming Soon</span>
          </h2>
          <p style={{ fontSize: ".9rem", color: "#555555", lineHeight: 1.8 }}>
            Schon bald findest du hier Clips, Highlights & besondere Momente aus unseren Spielen, Events und Livestreams.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
          {["Spielclips", "Events", "Interviews", "Behind the Scenes"].map((label, i) => (
            <div key={i} style={{
              background: "#0f0f0f", padding: "2rem 1.5rem",
              borderLeft: i % 2 === 0 ? "none" : "1px solid #1a1a1a",
              borderTop: i < 2 ? "none" : "1px solid #1a1a1a",
            }}>
              <div style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "1.1rem", letterSpacing: ".08em", color: "#333333", marginBottom: ".3rem",
              }}>Bald</div>
              <div style={{ fontSize: ".85rem", color: "#444444" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}