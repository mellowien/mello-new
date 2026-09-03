import Link from "next/link";

export default function MemberNotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        paddingTop: "88px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "min(100% - 3rem, 620px)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: ".55rem",
            height: ".55rem",
            borderRadius: "50%",
            background: "#0d9488",
            boxShadow: "0 0 14px rgba(13, 148, 136, .7)",
            margin: "0 auto 1.5rem",
          }}
        />

        <div
          style={{
            color: "#0d9488",
            fontSize: ".68rem",
            fontWeight: 800,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            marginBottom: ".85rem",
          }}
        >
          Member Verification
        </div>

        <h1
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: "clamp(2.3rem, 6vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            margin: "0 0 1.3rem",
            textTransform: "uppercase",
          }}
        >
          Mitglied nicht gefunden.
        </h1>

        <p
          style={{
            color: "rgba(247, 247, 244, .62)",
            fontSize: "1rem",
            lineHeight: 1.7,
            margin: "0 auto 2rem",
            maxWidth: "48ch",
          }}
        >
          Die angegebene Member ID ist ungültig oder die Mitgliedschaft ist
          aktuell nicht aktiv.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".45rem",
            border: "1px solid rgba(13, 148, 136, .52)",
            borderRadius: "99px",
            color: "#0d9488",
            fontSize: ".72rem",
            fontWeight: 800,
            letterSpacing: ".12em",
            padding: ".9rem 1.4rem",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Zur Mello Website <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}