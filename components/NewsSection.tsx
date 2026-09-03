"use client";

import Link from "next/link";

const ARTICLES = [
  {
    id: 1,
    tag: "Spielbericht",
    date: "31. Aug 2026",
    title: "Auftaktsieg vor heimischer Kulisse: Die Stimmen zum Spiel",
    excerpt:
      "Trainer und Mannschaft nach dem intensiven 90-Minuten-Fight im ersten Saisonspiel.",
    href: "/news/auftaktsieg",
    readTime: "3 Min.",
  },
  {
    id: 2,
    tag: "Interview",
    date: "28. Aug 2026",
    title: "„Wir wollen Fußball nahbar und transparent gestalten“",
    excerpt:
      "Der Vorstand im ausführlichen Gespräch über Vereinsphilosophie, Kaderplanung und die Ziele für 2026/27.",
    href: "/news/vorstand-interview",
    readTime: "5 Min.",
  },
];

export default function NewsSection() {
  return (
    <section
      style={{
        background: "var(--mello-black, #080808)",
        borderBottom: "1px solid var(--mello-line, #222222)",
        color: "#f7f7f4",
        padding: "5rem 0 6.5rem",
        position: "relative",
      }}
    >
      <style>{`
        .news-card {
          background: rgba(247, 247, 244, 0.035);
          border: 1px solid rgba(247, 247, 244, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.3s ease,
                      background 0.3s ease,
                      box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .news-card:hover {
          transform: translateY(-4px);
          border-color: rgba(13, 148, 136, 0.6);
          background: rgba(247, 247, 244, 0.055);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(13, 148, 136, 0.08);
        }

        .news-cta-card {
          background: linear-gradient(145deg, rgba(13, 148, 136, 0.16), rgba(8, 8, 8, 0.95) 75%);
          border: 1px solid rgba(13, 148, 136, 0.65);
          border-radius: 1rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .news-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

      <div
        style={{
          width: "min(100% - 6rem, 1440px)",
          margin: "0 auto",
        }}
      >
        {/* Header-Zeile */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2.8rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                color: "#0d9488",
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: ".68rem",
                fontWeight: 800,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                marginBottom: ".6rem",
              }}
            >
              Stimmen & Berichte
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display), 'Arial Black', Arial, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Aktuell bei Mello
            </h2>
          </div>

          <Link
            href="/tv"
            style={{
              color: "rgba(247, 247, 244, 0.7)",
              fontFamily: "var(--font-body), Arial, sans-serif",
              fontSize: ".68rem",
              fontWeight: 800,
              letterSpacing: ".14em",
              textDecoration: "none",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
              transition: "color .2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0d9488")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(247, 247, 244, 0.7)")
            }
          >
            Alle Berichte & Videos&nbsp;→
          </Link>
        </div>

        {/* Grid: 2 News-Karten + 1 CTA-Karte */}
        <div
          className="news-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {ARTICLES.map((article) => (
            <Link key={article.id} href={article.href} className="news-card">
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(13, 148, 136, 0.15)",
                      color: "#0d9488",
                      border: "1px solid rgba(13, 148, 136, 0.35)",
                      borderRadius: "99px",
                      padding: ".2rem .6rem",
                      fontSize: ".48rem",
                      fontWeight: 800,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body), Arial, sans-serif",
                    }}
                  >
                    {article.tag}
                  </span>

                  <span
                    style={{
                      color: "rgba(247, 247, 244, 0.4)",
                      fontSize: ".58rem",
                      fontFamily: "var(--font-body), Arial, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {article.date} · {article.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily:
                      "var(--font-display), 'Arial Black', Arial, sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    margin: "0 0 .8rem",
                  }}
                >
                  {article.title}
                </h3>

                <p
                  style={{
                    color: "rgba(247, 247, 244, 0.65)",
                    fontFamily: "var(--font-body), Arial, sans-serif",
                    fontSize: ".82rem",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {article.excerpt}
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.8rem",
                  color: "#0d9488",
                  fontSize: ".62rem",
                  fontWeight: 800,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body), Arial, sans-serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".3rem",
                }}
              >
                Weiterlesen&nbsp;→
              </div>
            </Link>
          ))}

          {/* Die 3. Spalte: Direkter CTA */}
          <div className="news-cta-card">
            <div>
              <span
                style={{
                  background: "#0d9488",
                  color: "#080808",
                  borderRadius: "99px",
                  padding: ".22rem .65rem",
                  fontSize: ".48rem",
                  fontWeight: 900,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body), Arial, sans-serif",
                  display: "inline-block",
                  marginBottom: "1.2rem",
                }}
              >
                Mitglied werden
              </span>

              <h3
                style={{
                  fontFamily:
                    "var(--font-display), 'Arial Black', Arial, sans-serif",
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  margin: "0 0 .85rem",
                }}
              >
                Gestalte den Verein aktiv mit
              </h3>

              <p
                style={{
                  color: "rgba(247, 247, 244, 0.75)",
                  fontFamily: "var(--font-body), Arial, sans-serif",
                  fontSize: ".82rem",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Volles Stimmrecht, Community-Events und exklusiver Zugang zu allen
                Inhalten. Werde jetzt offizielles Mello-Mitglied.
              </p>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link
                href="/mitgliedschaft"
                style={{
                  background: "#0d9488",
                  color: "#080808",
                  fontFamily: "var(--font-body), Arial, sans-serif",
                  fontSize: ".68rem",
                  fontWeight: 800,
                  letterSpacing: ".14em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  padding: ".75rem 1.3rem",
                  borderRadius: "99px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".4rem",
                  width: "100%",
                  boxSizing: "border-box",
                  transition: "background .2s ease, transform .2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#14b8a6";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0d9488";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Jetzt Mitglied werden&nbsp;→
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}