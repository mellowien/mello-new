import Link from "next/link";

const CARDS = [
  {
    tag: "Aktiv am Platz",
    title: "Spieler",
    desc: "Egal ob junges Talent oder erfahrener Kicker. Bei uns zählen Leidenschaft, Teamgeist und Zuverlässigkeit. Werde Teil unseres Kaders in der 1. Klasse A Wiens.",
    cta: "Spieleranfrage senden",
    href: "/kontakt?anliegen=spieler",
    meta: "Probetraining anfragen",
  },
  {
    tag: "Verein mitgestalten",
    title: "Community & Orga",
    desc: "Hilf mit, den Club aufzubauen, ob bei Spieltagen, Social Media & Mello TV, Event-Planung oder Vereinsführung. Wir suchen Menschen, die mit anpacken wollen.",
    cta: "Mitgestalten",
    href: "/kontakt?anliegen=community",
    meta: "Werde Teil des Aufbaus",
  },
  {
    tag: "Teil der Mello-Community",
    title: "Mitglied & Unterstützer",
    desc: "Unterstütze FC Mello Wien monatlich oder jährlich und werde offizieller Teil unseres Vereins. Für Fans, Freunde, Selbstständige und Unternehmen, die unsere Idee mittragen wollen.",
    cta: "Vorteile ansehen",
    href: "/mitgliedschaft/vorteile",
    meta: "Ab 10 € monatlich",
  },
];

export default function MitgliedschaftPage() {
  return (
    <main
      style={{
        background: "var(--mello-black, #080808)",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        minHeight: "100vh",
        paddingTop: "88px",
      }}
    >
      <style>{`
        .mitgl-container {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        /* ── MEMBERSHIP CARDS ── */
        .mitgl-card {
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, 0.05) 0%,
              rgba(247, 247, 244, 0.022) 55%,
              rgba(13, 148, 136, 0.025) 100%
            );
          border: 1px solid rgba(247, 247, 244, 0.11);
          border-radius: 1.15rem;
          padding: 2.15rem 2rem 1.85rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 365px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease,
            box-shadow 0.35s ease,
            background 0.35s ease;
        }

        .mitgl-card::before {
          content: "";
          position: absolute;
          width: 17rem;
          height: 17rem;
          right: -9.5rem;
          top: -9.5rem;
          border: 1px solid rgba(13, 148, 136, 0.13);
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease;
        }

        .mitgl-card::after {
          content: "";
          position: absolute;
          width: 9rem;
          height: 9rem;
          right: -4.5rem;
          top: -4.5rem;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(13, 148, 136, 0.13) 0%,
            rgba(13, 148, 136, 0.025) 55%,
            transparent 72%
          );
          pointer-events: none;
          z-index: -1;
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.35s ease;
        }

        .mitgl-card:hover {
          transform: translateY(-6px);
          border-color: rgba(13, 148, 136, 0.7);
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, 0.07) 0%,
              rgba(247, 247, 244, 0.035) 55%,
              rgba(13, 148, 136, 0.07) 100%
            );
          box-shadow:
            0 18px 42px rgba(0, 0, 0, 0.52),
            0 0 30px rgba(13, 148, 136, 0.12);
        }

        .mitgl-card:hover::before {
          transform: scale(1.15);
          border-color: rgba(13, 148, 136, 0.3);
        }

        .mitgl-card:hover::after {
          transform: scale(1.3);
          opacity: 1;
        }

        .mitgl-card-content {
          position: relative;
          z-index: 1;
        }

        .mitgl-card-tag {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          color: #0d9488;
          font-size: .61rem;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .mitgl-card-tag::before {
          content: "";
          display: inline-block;
          width: .36rem;
          height: .36rem;
          border-radius: 50%;
          background: #0d9488;
          box-shadow: 0 0 10px rgba(13, 148, 136, .7);
        }

        .mitgl-card-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.35rem, 1.65vw, 1.6rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          color: #f7f7f4;
          margin: 0 0 1rem;
          text-transform: uppercase;
          line-height: 1.05;
        }

        .mitgl-card-description {
          max-width: 34ch;
          font-size: .92rem;
          color: rgba(247, 247, 244, 0.67);
          line-height: 1.72;
          margin: 0;
        }

        .mitgl-card-footer {
          position: relative;
          z-index: 1;
          margin-top: 2rem;
          padding-top: 1.15rem;
          border-top: 1px solid rgba(247, 247, 244, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .mitgl-card-meta {
          color: rgba(247, 247, 244, 0.42);
          font-size: .66rem;
          font-weight: 700;
          letter-spacing: .06em;
          line-height: 1.35;
          text-transform: uppercase;
        }

        .mitgl-link {
          flex-shrink: 0;
          border: 1px solid rgba(13, 148, 136, 0.52);
          color: #0d9488;
          border-radius: 99px;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .mitgl-link:hover {
          background: #0d9488;
          color: #080808;
          border-color: #0d9488;
          transform: translateY(-1px);
        }

        .mitgl-primary-link {
          background: #0d9488;
          color: #080808;
          border-radius: 99px;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .mitgl-primary-link:hover {
          background: #14b8a6;
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .mitgl-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }

          .mitgl-container {
            width: min(100% - 2.5rem, 1440px) !important;
          }

          .mitgl-card {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .mitgl-card {
            padding: 1.8rem 1.45rem 1.55rem;
          }

          .mitgl-card-footer {
            align-items: flex-start;
            flex-direction: column-reverse;
            gap: .9rem;
          }

          .mitgl-card-description {
            max-width: none;
          }

          .mitgl-cta {
            align-items: flex-start !important;
            flex-direction: column !important;
          }

          .mitgl-cta-link {
            width: 100%;
            justify-content: center;
            box-sizing: border-box;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "4.5rem 0 3.8rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 55% 70% at 85% 40%, rgba(13, 148, 136, 0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className="mitgl-container"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "#0d9488",
              fontSize: ".68rem",
              fontWeight: 800,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              marginBottom: ".9rem",
            }}
          >
            Mitgliedschaft &amp; Engagement
          </div>

          <h1
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 1.5rem",
              textTransform: "uppercase",
            }}
          >
            Werde Teil von
            <br />
            <span style={{ color: "#0d9488" }}>FC Mello Wien.</span>
          </h1>

          <p
            style={{
              color: "rgba(247, 247, 244, 0.75)",
              fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
              lineHeight: 1.65,
              maxWidth: "56ch",
              margin: 0,
            }}
          >
            Auf dem Platz, im Hintergrund oder als unterstützendes Mitglied:
            Mello lebt von Menschen und Unternehmen, die gemeinsam etwas
            Nachhaltiges für den Wiener Fußball aufbauen wollen.
          </p>
        </div>
      </section>

      {/* ── DREI WEGE ZU MELLO ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="mitgl-container">
          <div
            className="mitgl-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.6rem",
            }}
          >
            {CARDS.map((card) => (
              <article key={card.title} className="mitgl-card">
                <div className="mitgl-card-content">
                  <div className="mitgl-card-tag">{card.tag}</div>

                  <h2 className="mitgl-card-title">{card.title}</h2>

                  <p className="mitgl-card-description">{card.desc}</p>
                </div>

                <div className="mitgl-card-footer">
                  <span className="mitgl-card-meta">{card.meta}</span>

                  <Link
                    href={card.href}
                    className="mitgl-link"
                    aria-label={`${card.cta}: ${card.title}`}
                    style={{
                      fontFamily: "var(--font-body), Arial, sans-serif",
                      fontWeight: 800,
                      fontSize: ".68rem",
                      letterSpacing: ".11em",
                      textTransform: "uppercase",
                      padding: ".78rem 1.2rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: ".35rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {card.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABSCHLIESSENDER CTA ── */}
      <section
        style={{
          borderTop: "1px solid var(--mello-line, #222222)",
          padding: "5.5rem 0",
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(13,148,136,0.08) 100%)",
        }}
      >
        <div
          className="mitgl-container mitgl-cta"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2.5rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: "0 0 .6rem",
                textTransform: "uppercase",
              }}
            >
              Gemeinsam Mello aufbauen.
            </h2>

            <p
              style={{
                color: "rgba(247, 247, 244, 0.55)",
                fontSize: "0.92rem",
                margin: 0,
              }}
            >
              FC Mello Wien · ZVR-Zahl: 1231202907
            </p>
          </div>

          <Link
            href="/mitgliedschaft/vorteile"
            className="mitgl-primary-link mitgl-cta-link"
            style={{
              fontFamily: "var(--font-body), Arial, sans-serif",
              fontSize: ".75rem",
              fontWeight: 800,
              letterSpacing: ".14em",
              textDecoration: "none",
              textTransform: "uppercase",
              padding: "1rem 2.4rem",
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
            }}
          >
            Mitgliedschaft entdecken <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}