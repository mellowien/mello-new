export default function TeamPage() {
  return (
    <main style={{
      background: "#080808",
      color: "#f5f5f5",
      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      minHeight: "100vh",
      paddingTop: "64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Teal glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 50% at 50% 60%, rgba(13,148,136,.08) 0%, transparent 70%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1,
        textAlign: "center",
        padding: "0 3rem",
      }}>

        <h1 style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(5rem, 12vw, 11rem)",
          lineHeight: .85,
          letterSpacing: ".02em",
          color: "#f5f5f5",
          marginBottom: "1.5rem",
        }}>
          Coming <span style={{ color: "#0d9488" }}>Soon</span>
        </h1>

        <div style={{
          width: "3rem", height: "1px",
          background: "#0d9488",
          margin: "0 auto 2rem",
        }} />

        <p style={{
          fontSize: "clamp(.95rem, 1.5vw, 1.1rem)",
          color: "#666666",
          maxWidth: "40ch",
          lineHeight: 1.8,
          margin: "0 auto 3rem",
        }}>
          Unser Team befindet sich aktuell im Aufbau — die erste Generation entsteht gerade.
        </p>

        <a href="/mitgliedschaft" style={{
          background: "transparent",
          border: "1px solid rgba(13,148,136,.4)",
          color: "#0d9488",
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontWeight: 600, fontSize: ".8rem",
          letterSpacing: ".12em", textTransform: "uppercase",
          padding: ".85rem 2rem", textDecoration: "none",
          display: "inline-block",
        }}>
          Teil des Teams werden
        </a>
      </div>

    </main>
  );
}