import Link from "next/link";

const infoItems = [
  {
    title: "Verein",
    content: (
      <>
        Fußballclub Mello Wien
        <br />
        <span style={{ color: "#f7f7f4" }}>(FC Mello Wien)</span>
      </>
    ),
  },
  {
    title: "ZVR-Zahl",
    content: "1231202907",
  },
  {
    title: "Sitz & Zustellung",
    content: (
      <>
        Nordbahnstraße 47/4080
        <br />
        1020 Wien, Österreich
      </>
    ),
  },
];

const sections = [
  {
    number: "1",
    title: "Medieninhaber & Herausgeber",
    content: (
      <>
        <p>
          Medieninhaber und Herausgeber dieser Website ist der Fußballclub Mello
          Wien (FC Mello Wien), ein gemeinnütziger, eingetragener Verein nach
          dem österreichischen Vereinsgesetz 2002 (VerG).
        </p>

        <p>
          Der Verein ist nicht auf Gewinn gerichtet und verfolgt ausschließlich
          gemeinnützige Zwecke.
        </p>
      </>
    ),
  },
  {
    number: "2",
    title: "Kontakt",
    content: (
      <p>
        E-Mail:{" "}
        <a href="mailto:kontakt@mellowien.at">kontakt@mellowien.at</a>
        <br />
        Website:{" "}
        <a href="https://mellowien.at">mellowien.at</a>
      </p>
    ),
  },
  {
    number: "3",
    title: "Vertretungsbefugnis",
    content: (
      <>
        <p>
          Der Verein wird nach außen durch den Obmann vertreten.
          Schriftliche Ausfertigungen des Vereins benötigen zu ihrer Gültigkeit
          die Unterschrift des Obmanns und der Schriftführerin. In
          Geldangelegenheiten und bei vermögenswerten Dispositionen sind die
          Unterschriften des Obmanns und des Kassiers erforderlich.
        </p>

        <div className="imprint-people">
          <div className="imprint-person">
            <span>Obmann</span>
            <strong>Daniel Rezai</strong>
          </div>

          <div className="imprint-person">
            <span>Schriftführerin</span>
            <strong>Sorayya Esaei</strong>
          </div>

          <div className="imprint-person">
            <span>Kassier</span>
            <strong>Lorenz Predcechtel</strong>
          </div>
        </div>
      </>
    ),
  },
  {
    number: "4",
    title: "Vereinszweck",
    content: (
      <p>
        Der Fußballclub Mello Wien fördert den Breiten- und Leistungssport,
        beginnend mit Fußball und perspektivisch weiteren Sportarten. Dazu
        zählen insbesondere Trainings- und Spielbetrieb,
        Nachwuchsförderung, Talententwicklung, Integration,
        Gesundheitsförderung durch Sport sowie gemeinnützige Projekte.
      </p>
    ),
  },
  {
    number: "5",
    title: "Grundlegende Richtung",
    content: (
      <p>
        Diese Website informiert über den Fußballclub Mello Wien, seine
        sportlichen Aktivitäten, Teams, Veranstaltungen, Mitgliedschaften,
        Partnerschaften und gemeinnützigen Projekte. Sie fördert ein faires,
        respektvolles, inklusives und modernes Vereinsleben.
      </p>
    ),
  },
  {
    number: "6",
    title: "Haftung für Inhalte",
    content: (
      <p>
        Wir erstellen die Inhalte dieser Website mit größtmöglicher Sorgfalt.
        Dennoch können wir keine Gewähr für Richtigkeit, Vollständigkeit oder
        Aktualität übernehmen. Verpflichtungen zur Entfernung oder Sperrung von
        Informationen nach den allgemeinen Gesetzen bleiben unberührt.
      </p>
    ),
  },
  {
    number: "7",
    title: "Externe Links",
    content: (
      <p>
        Diese Website kann Links zu externen Websites enthalten. Für deren
        Inhalte, Verfügbarkeit und Datenschutzpraktiken sind ausschließlich die
        jeweiligen Betreiber:innen verantwortlich. Zum Zeitpunkt der
        Verlinkung waren keine rechtswidrigen Inhalte erkennbar.
      </p>
    ),
  },
  {
    number: "8",
    title: "Urheberrecht",
    content: (
      <p>
        Die Inhalte dieser Website — insbesondere Texte, Fotos, Grafiken,
        Videos, Logos und sonstige Medien — sind urheberrechtlich geschützt.
        Jede Nutzung außerhalb der Grenzen des Urheberrechts bedarf der
        vorherigen schriftlichen Zustimmung des Fußballclub Mello Wien oder der
        jeweils berechtigten Rechteinhaber:innen.
      </p>
    ),
  },
];

export default function ImpressumPage() {
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
        .imprint-container {
          width: min(100% - 3rem, 920px);
          margin: 0 auto;
        }

        .imprint-back-link {
          display: inline-flex;
          color: rgba(247, 247, 244, .58);
          font-size: .7rem;
          font-weight: 800;
          letter-spacing: .12em;
          margin-bottom: 2rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: color .2s ease;
        }

        .imprint-back-link:hover {
          color: #0d9488;
        }

        .imprint-content {
          display: grid;
          gap: 1rem;
        }

        .imprint-info-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .85rem;
        }

        .imprint-info-item {
          border: 1px solid rgba(13, 148, 136, .24);
          border-radius: .85rem;
          background: rgba(13, 148, 136, .045);
          padding: 1rem;
        }

        .imprint-info-item h2 {
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .64rem;
          font-weight: 800;
          letter-spacing: .12em;
          line-height: 1.35;
          margin: 0 0 .5rem;
          text-transform: uppercase;
        }

        .imprint-info-item p {
          color: rgba(247, 247, 244, .72);
          font-size: .83rem;
          line-height: 1.6;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .imprint-card {
          border: 1px solid rgba(247, 247, 244, .1);
          border-radius: 1rem;
          background: rgba(247, 247, 244, .018);
          padding: clamp(1.35rem, 3vw, 2rem);
        }

        .imprint-card h2 {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          font-weight: 900;
          letter-spacing: -.025em;
          line-height: 1.1;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .imprint-card p {
          color: rgba(247, 247, 244, .68);
          font-size: .94rem;
          line-height: 1.7;
          margin: 0;
        }

        .imprint-card p + p {
          margin-top: .85rem;
        }

        .imprint-card strong {
          color: #f7f7f4;
          font-weight: 800;
        }

        .imprint-card a {
          color: #0d9488;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: .18rem;
        }

        .imprint-section-number {
          color: #0d9488;
          display: inline-block;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .12em;
          margin-bottom: .55rem;
        }

        .imprint-people {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .75rem;
          margin-top: 1.25rem;
        }

        .imprint-person {
          border: 1px solid rgba(247, 247, 244, .09);
          border-radius: .75rem;
          background: rgba(247, 247, 244, .018);
          display: grid;
          gap: .35rem;
          padding: .9rem;
        }

        .imprint-person span {
          color: #0d9488;
          font-size: .62rem;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .imprint-person strong {
          color: #f7f7f4;
          font-size: .87rem;
          line-height: 1.35;
        }

        .imprint-links {
          display: flex;
          flex-wrap: wrap;
          gap: .75rem 1.25rem;
          margin-top: .15rem;
        }

        .imprint-links a {
          font-size: .85rem;
          font-weight: 700;
        }

        @media (max-width: 760px) {
          .imprint-container {
            width: min(100% - 2.5rem, 920px);
          }

          .imprint-info-grid,
          .imprint-people {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "4.5rem 0 4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 58% 72% at 86% 38%, rgba(13,148,136,.1) 0%, transparent 70%)",
          }}
        />

        <div
          className="imprint-container"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link href="/" className="imprint-back-link">
            ← Zurück zur Startseite
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
            FC Mello Wien
          </div>

          <h1
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "clamp(2.45rem, 5vw, 4.4rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              margin: "0 0 1.15rem",
              textTransform: "uppercase",
            }}
          >
            Im
            <span style={{ color: "#0d9488" }}>pressum.</span>
          </h1>

          <p
            style={{
              color: "rgba(247, 247, 244, .68)",
              fontSize: "clamp(.98rem, 1.2vw, 1.08rem)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "66ch",
            }}
          >
            Angaben gemäß österreichischem Vereins-, Medien- und
            E-Commerce-Recht.
          </p>
        </div>
      </section>

      {/* INHALT */}
      <section style={{ padding: "3.5rem 0 6rem" }}>
        <div className="imprint-container">
          <div className="imprint-content">
            <div className="imprint-info-grid">
              {infoItems.map((item) => (
                <article className="imprint-info-item" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                </article>
              ))}
            </div>

            {sections.map((section) => (
              <article className="imprint-card" key={section.number}>
                <span className="imprint-section-number">
                  {section.number.padStart(2, "0")}
                </span>
                <h2>{section.title}</h2>
                {section.content}
              </article>
            ))}

            <article className="imprint-card">
              <span className="imprint-section-number">09</span>
              <h2>Rechtliche Dokumente</h2>

              <p>
                Weitere Informationen zu den Grundlagen unserer
                Vereinsmitgliedschaft und zur Verarbeitung personenbezogener
                Daten findest du hier:
              </p>

              <div className="imprint-links">
                <a
                  href="/dokumente/Statuten.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vereinsstatuten (PDF) ↗
                </a>

                <Link href="/datenschutz">Datenschutzerklärung →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}