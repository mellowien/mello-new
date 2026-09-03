import Link from "next/link";
import MelloMemberCard from "@/components/MelloMemberCard";

const BENEFITS = [
  {
    number: "01",
    title: "Offizielles Mitglied",
    text: "Du wirst offizieller Teil von FC Mello Wien und unterstützt den Verein in seiner Aufbauphase — auf und neben dem Platz.",
  },
  {
    number: "02",
    title: "Digitale Member Card",
    text: "Du erhältst deine persönliche digitale Mello Member Card direkt per E-Mail und hast deinen Mitgliedsstatus immer am Smartphone dabei.",
  },
  {
    number: "03",
    title: "Freier Eintritt",
    text: "Als Mitglied erhältst du freien Eintritt zu den Heimspielen von FC Mello Wien und bist bei jedem Matchday näher am Team.",
  },
  {
    number: "04",
    title: "Exklusive Updates",
    text: "Erhalte ausgewählte Vereinsnews, Einblicke und Informationen zu Team, Spielbetrieb und Projekten direkt aus dem Club.",
  },
  {
    number: "05",
    title: "Community Events",
    text: "Erfahre frühzeitig von Mello-Events, besonderen Spieltagen und ausgewählten Community-Momenten rund um den Verein.",
  },
  {
    number: "06",
    title: "Founding Member",
    text: "Werde in der Saison 2026/27 Teil der ersten offiziellen Mello-Community und sichere dir deinen dauerhaften Founding-Member-Status.",
  },
];

const IMPACT_AREAS = [
  {
    number: "01",
    title: "Training & Team",
    text: "Dein Mitgliedsbeitrag hilft bei Trainingsmaterial, Organisation und der sportlichen Weiterentwicklung unseres Kaders.",
  },
  {
    number: "02",
    title: "Spielbetrieb",
    text: "Du unterstützt Platzkosten, Schiedsrichter, Ausstattung und den laufenden Meisterschaftsbetrieb.",
  },
  {
    number: "03",
    title: "Vereinsaufbau",
    text: "Du ermöglichst Mello TV, Community-Projekte, Events und den langfristigen Aufbau eines modernen Wiener Fußballvereins.",
  },
];

export default function MitgliedschaftVorteilePage() {
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
        .benefits-container {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        .benefit-card {
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, 0.045) 0%,
              rgba(247, 247, 244, 0.018) 60%,
              rgba(13, 148, 136, 0.025) 100%
            );
          border: 1px solid rgba(247, 247, 244, 0.1);
          border-radius: 1rem;
          min-height: 255px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          transition:
            border-color .28s ease,
            background .28s ease,
            transform .28s ease,
            box-shadow .28s ease;
        }

        .benefit-card::after {
          content: "";
          position: absolute;
          width: 8rem;
          height: 8rem;
          right: -4rem;
          top: -4rem;
          border-radius: 50%;
          background: rgba(13, 148, 136, 0.065);
          pointer-events: none;
          transition: transform .35s ease, background .35s ease;
        }

        .benefit-card:hover {
          border-color: rgba(13, 148, 136, .62);
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, 0.065) 0%,
              rgba(247, 247, 244, 0.028) 60%,
              rgba(13, 148, 136, 0.065) 100%
            );
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(0, 0, 0, .45);
        }

        .benefit-card:hover::after {
          transform: scale(1.25);
          background: rgba(13, 148, 136, .12);
        }

        .benefit-number {
          color: #0d9488;
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .12em;
          margin-bottom: 2.4rem;
          position: relative;
          z-index: 1;
        }

        .benefit-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.18rem;
          font-weight: 900;
          letter-spacing: -0.015em;
          line-height: 1.1;
          margin: 0 0 .75rem;
          position: relative;
          text-transform: uppercase;
          z-index: 1;
        }

        .benefit-text {
          color: rgba(247, 247, 244, .64);
          font-size: .9rem;
          line-height: 1.7;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .founding-section {
          background:
            radial-gradient(
              ellipse 70% 120% at 88% 50%,
              rgba(13, 148, 136, 0.16) 0%,
              transparent 70%
            ),
            linear-gradient(
              135deg,
              rgba(13, 148, 136, 0.13) 0%,
              rgba(247, 247, 244, 0.03) 55%,
              rgba(247, 247, 244, 0.015) 100%
            );
          border: 1px solid rgba(13, 148, 136, 0.4);
          border-radius: 1.2rem;
          overflow: hidden;
          position: relative;
        }

        .founding-section::after {
          content: "";
          width: 35rem;
          height: 35rem;
          position: absolute;
          right: -19rem;
          top: -17rem;
          border: 1px solid rgba(13, 148, 136, .14);
          border-radius: 50%;
          box-shadow:
            0 0 0 3rem rgba(13, 148, 136, .02),
            0 0 0 7rem rgba(13, 148, 136, .015);
          pointer-events: none;
        }

        .founding-badge {
          border: 1px solid rgba(13, 148, 136, .55);
          color: #0d9488;
          background: rgba(13, 148, 136, .1);
          border-radius: 99px;
          display: inline-flex;
          font-size: .62rem;
          font-weight: 800;
          letter-spacing: .16em;
          padding: .34rem .85rem;
          text-transform: uppercase;
        }

        .impact-card {
          border-top: 1px solid rgba(247, 247, 244, .12);
          padding-top: 1.5rem;
        }

        .impact-number {
          color: #0d9488;
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .12em;
          margin-bottom: 1.3rem;
        }

        .membership-option {
          background: rgba(247, 247, 244, .032);
          border: 1px solid rgba(247, 247, 244, .12);
          border-radius: 1.1rem;
          display: flex;
          flex-direction: column;
          min-height: 310px;
          padding: 2.25rem;
        }

        .membership-option--featured {
          background:
            radial-gradient(
              ellipse 100% 100% at 80% 0%,
              rgba(13, 148, 136, .16) 0%,
              transparent 65%
            ),
            rgba(247, 247, 244, .04);
          border-color: rgba(13, 148, 136, .62);
        }

        .mello-button-primary {
          background: #0d9488;
          color: #080808;
          border-radius: 99px;
          transition: background .2s ease, transform .2s ease;
        }

        .mello-button-primary:hover {
          background: #14b8a6;
          transform: translateY(-1px);
        }

        .mello-button-secondary {
          border: 1px solid rgba(13, 148, 136, .55);
          color: #0d9488;
          border-radius: 99px;
          transition:
            background .2s ease,
            color .2s ease,
            border-color .2s ease,
            transform .2s ease;
        }

        .mello-button-secondary:hover {
          background: #0d9488;
          border-color: #0d9488;
          color: #080808;
          transform: translateY(-1px);
        }

        @media (max-width: 1050px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .founding-inner {
            grid-template-columns: 1fr !important;
            gap: 2.8rem !important;
          }
        }

        @media (max-width: 760px) {
          .benefits-container {
            width: min(100% - 2.5rem, 1440px) !important;
          }

          .benefits-grid,
          .membership-grid,
          .impact-grid {
            grid-template-columns: 1fr !important;
          }

          .benefit-card {
            min-height: auto;
          }

          .founding-inner {
            padding: 2.1rem 1.55rem !important;
          }

          .membership-option {
            min-height: auto;
            padding: 1.85rem 1.55rem;
          }

          .final-cta {
            align-items: flex-start !important;
            flex-direction: column !important;
          }

          .final-cta-link {
            box-sizing: border-box;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          overflow: "hidden",
          padding: "4.5rem 0 3.8rem",
          position: "relative",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 85% 40%, rgba(13, 148, 136, 0.1) 0%, transparent 70%)",
            inset: 0,
            pointerEvents: "none",
            position: "absolute",
          }}
        />

        <div
          className="benefits-container"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link
            href="/mitgliedschaft"
            style={{
              color: "rgba(247, 247, 244, .58)",
              display: "inline-flex",
              fontSize: ".72rem",
              fontWeight: 800,
              letterSpacing: ".12em",
              marginBottom: "2rem",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            ← Zur Mitgliedschaft
          </Link>

          <div
            style={{
              color: "#0d9488",
              fontSize: ".68rem",
              fontWeight: 800,
              letterSpacing: ".18em",
              marginBottom: ".9rem",
              textTransform: "uppercase",
            }}
          >
            Mitglied &amp; Unterstützer
          </div>

          <h1
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 1.5rem",
              maxWidth: "16ch",
              textTransform: "uppercase",
            }}
          >
            Deine Mitgliedschaft.
            <br />
            <span style={{ color: "#0d9488" }}>Dein Mello.</span>
          </h1>

          <p
            style={{
              color: "rgba(247, 247, 244, .75)",
              fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "60ch",
            }}
          >
            Mit deiner Mitgliedschaft unterstützt du den Aufbau von FC Mello Wien
            und wirst offizieller Teil einer neuen Fußball-Community in Wien.
          </p>
        </div>
      </section>

      {/* ── VORTEILE ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="benefits-container">
          <div
            style={{
              alignItems: "flex-end",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "space-between",
              marginBottom: "2.2rem",
            }}
          >
            <div>
              <div
                style={{
                  color: "#0d9488",
                  fontSize: ".66rem",
                  fontWeight: 800,
                  letterSpacing: ".16em",
                  marginBottom: ".7rem",
                  textTransform: "uppercase",
                }}
              >
                Deine Vorteile
              </div>

              <h2
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Mehr als Unterstützung.
              </h2>
            </div>

            <p
              style={{
                color: "rgba(247, 247, 244, .55)",
                fontSize: ".88rem",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "40ch",
              }}
            >
              Du hilfst nicht nur beim Aufbau von Mello — du wirst ein sichtbarer
              Teil unserer ersten offiziellen Community.
            </p>
          </div>

          <div
            className="benefits-grid"
            style={{
              display: "grid",
              gap: "1.2rem",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {BENEFITS.map((benefit) => (
              <article key={benefit.number} className="benefit-card">
                <div className="benefit-number">{benefit.number}</div>

                <h3 className="benefit-title">{benefit.title}</h3>

                <p className="benefit-text">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDING MEMBER + MEMBER CARD ── */}
      <section style={{ padding: "0 0 5rem" }}>
        <div className="benefits-container">
          <div className="founding-section">
            <div
              className="founding-inner"
              style={{
                alignItems: "center",
                display: "grid",
                gap: "3rem",
                gridTemplateColumns: "minmax(0, 1fr) minmax(300px, 480px)",
                padding: "3.4rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div>
                <span className="founding-badge">Saison 2026/27</span>

                <h2
                  style={{
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    fontSize: "clamp(2rem, 3.8vw, 3.35rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    margin: "1.25rem 0 1rem",
                    textTransform: "uppercase",
                  }}
                >
                  Werde
                  <br />
                  <span style={{ color: "#0d9488" }}>Founding Member.</span>
                </h2>

                <p
                  style={{
                    color: "rgba(247, 247, 244, .76)",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: "54ch",
                  }}
                >
                  Die erste Mello-Saison beginnt jetzt. Alle Mitglieder der Saison
                  2026/27 erhalten dauerhaft den Status{" "}
                  <strong style={{ color: "#f7f7f4" }}>Founding Member</strong>{" "}
                  und werden Teil der ersten offiziellen Mello-Community.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <MelloMemberCard
                  name="Daniel Rezai"
                  memberId="MELLO-0001"
                  season="2026 / 27"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEIN BEITRAG WIRKT ── */}
      <section
        style={{
          background: "rgba(247, 247, 244, .016)",
          borderBottom: "1px solid var(--mello-line, #222222)",
          borderTop: "1px solid var(--mello-line, #222222)",
          padding: "5rem 0",
        }}
      >
        <div className="benefits-container">
          <div
            style={{
              marginBottom: "2.8rem",
              maxWidth: "650px",
            }}
          >
            <div
              style={{
                color: "#0d9488",
                fontSize: ".66rem",
                fontWeight: 800,
                letterSpacing: ".16em",
                marginBottom: ".7rem",
                textTransform: "uppercase",
              }}
            >
              Transparent &amp; wirksam
            </div>

            <h2
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: "0 0 1rem",
                textTransform: "uppercase",
              }}
            >
              Dein Beitrag wirkt.
            </h2>

            <p
              style={{
                color: "rgba(247, 247, 244, .62)",
                fontSize: ".96rem",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Jeder Mitgliedsbeitrag fließt in den Aufbau von FC Mello Wien und
              macht sportliche wie organisatorische Entwicklung planbarer.
            </p>
          </div>

          <div
            className="impact-grid"
            style={{
              display: "grid",
              gap: "2.4rem",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {IMPACT_AREAS.map((area) => (
              <article key={area.number} className="impact-card">
                <div className="impact-number">{area.number}</div>

                <h3
                  style={{
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    fontSize: "1.2rem",
                    fontWeight: 900,
                    letterSpacing: "-0.015em",
                    margin: "0 0 .75rem",
                    textTransform: "uppercase",
                  }}
                >
                  {area.title}
                </h3>

                <p
                  style={{
                    color: "rgba(247, 247, 244, .6)",
                    fontSize: ".9rem",
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: "35ch",
                  }}
                >
                  {area.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MITGLIEDSOPTIONEN ── */}
      <section style={{ padding: "5rem 0" }}>
        <div
          className="benefits-container"
          style={{
            maxWidth: "1080px",
          }}
        >
          <div
            style={{
              marginBottom: "2.4rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#0d9488",
                fontSize: ".66rem",
                fontWeight: 800,
                letterSpacing: ".16em",
                marginBottom: ".7rem",
                textTransform: "uppercase",
              }}
            >
              Deine Unterstützung
            </div>

            <h2
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: "0 0 .9rem",
                textTransform: "uppercase",
              }}
            >
              Wähle deinen Beitrag.
            </h2>

            <p
              style={{
                color: "rgba(247, 247, 244, .58)",
                fontSize: ".94rem",
                lineHeight: 1.65,
                margin: "0 auto",
                maxWidth: "56ch",
              }}
            >
              Du entscheidest, wie du FC Mello Wien in seiner ersten Aufbauphase
              begleiten möchtest.
            </p>
          </div>

          <div
            className="membership-grid"
            style={{
              display: "grid",
              gap: "1.4rem",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <article className="membership-option">
              <div>
                <div
                  style={{
                    color: "rgba(247, 247, 244, .52)",
                    fontSize: ".65rem",
                    fontWeight: 800,
                    letterSpacing: ".14em",
                    marginBottom: ".85rem",
                    textTransform: "uppercase",
                  }}
                >
                  Flexibel unterstützen
                </div>

                <h3
                  style={{
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    fontSize: "clamp(2rem, 3.5vw, 2.7rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    margin: "0 0 .9rem",
                    textTransform: "uppercase",
                  }}
                >
                  10 € <span style={{ fontSize: ".52em" }}>monatlich</span>
                </h3>

                <p
                  style={{
                    color: "rgba(247, 247, 244, .63)",
                    fontSize: ".92rem",
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: "42ch",
                  }}
                >
                  Dein regelmäßiger Beitrag gibt Mello Planungssicherheit für
                  Training, Spielbetrieb und neue Vereinsprojekte.
                </p>
              </div>

              <Link
                href="/mitgliedschaft/antrag?beitrag=monatlich"
                className="mello-button-secondary"
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  fontFamily: "var(--font-body), Arial, sans-serif",
                  fontSize: ".72rem",
                  fontWeight: 800,
                  letterSpacing: ".12em",
                  marginTop: "2rem",
                  padding: ".9rem 1.45rem",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Monatlich Mitglied werden <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </article>

            <article className="membership-option membership-option--featured">
              <div>
                <div
                  style={{
                    color: "#0d9488",
                    fontSize: ".65rem",
                    fontWeight: 800,
                    letterSpacing: ".14em",
                    marginBottom: ".85rem",
                    textTransform: "uppercase",
                  }}
                >
                  Einmalig dabei sein
                </div>

                <h3
                  style={{
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    fontSize: "clamp(2rem, 3.5vw, 2.7rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    margin: "0 0 .9rem",
                    textTransform: "uppercase",
                  }}
                >
                  100 € <span style={{ fontSize: ".52em" }}>jährlich</span>
                </h3>

                <p
                  style={{
                    color: "rgba(247, 247, 244, .72)",
                    fontSize: ".92rem",
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: "42ch",
                  }}
                >
                  Eine direkte Jahresunterstützung für alle, die von Anfang an
                  Teil der Mello-Geschichte sein möchten.
                </p>
              </div>

              <Link
                href="/mitgliedschaft/antrag?beitrag=jaehrlich"
                className="mello-button-primary"
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  fontFamily: "var(--font-body), Arial, sans-serif",
                  fontSize: ".72rem",
                  fontWeight: 800,
                  letterSpacing: ".12em",
                  marginTop: "2rem",
                  padding: ".9rem 1.45rem",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Jährlich Mitglied werden <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </article>
          </div>

          <p
            style={{
              color: "rgba(247, 247, 244, .42)",
              fontSize: ".75rem",
              lineHeight: 1.6,
              margin: "1.35rem auto 0",
              maxWidth: "76ch",
              textAlign: "center",
            }}
          >
            Die konkrete Aufnahme sowie Rechte und Pflichten der Mitgliedschaft
            richten sich nach den geltenden Vereinsstatuten und den Beschlüssen
            des Vereins.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(13,148,136,0.09) 100%)",
          borderTop: "1px solid var(--mello-line, #222222)",
          padding: "5.5rem 0",
        }}
      >
        <div
          className="benefits-container final-cta"
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            justifyContent: "space-between",
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
                margin: "0 0 .65rem",
                textTransform: "uppercase",
              }}
            >
              Bereit für Mello?
            </h2>

            <p
              style={{
                color: "rgba(247, 247, 244, .6)",
                fontSize: ".94rem",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "54ch",
              }}
            >
              Werde Mitglied und begleite FC Mello Wien von Beginn an.
            </p>
          </div>

          <Link
            href="/mitgliedschaft/antrag"
            className="mello-button-primary final-cta-link"
            style={{
              alignItems: "center",
              display: "inline-flex",
              fontFamily: "var(--font-body), Arial, sans-serif",
              fontSize: ".75rem",
              fontWeight: 800,
              gap: ".4rem",
              letterSpacing: ".14em",
              padding: "1rem 2.4rem",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Mitgliedschaft anfragen <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}