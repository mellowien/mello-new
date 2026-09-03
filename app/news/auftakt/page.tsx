import Link from "next/link";

const MATCH = {
  competition: "1. Klasse A",
  date: "Sonntag, 06. September 2026",
  time: "11:30 Uhr",
  home: "FC Mello Wien",
  away: "FC Polska",
  homeLogo: "/mello-wien.png",
  awayLogo: "/polska-wien.png",
};

export default function AuftaktPage() {
  return (
    <main className="article-page">
      <style>{`
        .article-page {
          --ink: #080808;
          --paper: #f7f7f4;
          --teal: #0d9488;
          --teal-bright: #14b8a6;
          --line: rgba(247, 247, 244, .12);
          --muted: rgba(247, 247, 244, .62);
          min-height: 100vh;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          padding-top: 88px;
        }

        .article-page * {
          box-sizing: border-box;
        }

        .article-shell {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        .article-hero {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          padding: 4.7rem 0 4.4rem;
          background:
            radial-gradient(
              ellipse 43% 120% at 94% 48%,
              rgba(13, 148, 136, .15),
              transparent 74%
            ),
            linear-gradient(115deg, #080808 0%, #080808 56%, #0a1211 100%);
        }

        .article-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1060px;
        }

        .article-back {
          display: inline-flex;
          align-items: center;
          min-height: 2.6rem;
          gap: .55rem;
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 99px;
          padding: 0 1rem;
          color: rgba(247, 247, 244, .70);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .12em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            color .2s ease,
            border-color .2s ease,
            background .2s ease;
        }

        .article-back:hover {
          border-color: rgba(13, 148, 136, .65);
          background: rgba(13, 148, 136, .08);
          color: var(--teal);
        }

        .article-meta {
          display: flex;
          align-items: center;
          margin: 2rem 0 1.65rem;
          color: var(--teal);
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .article-title {
          max-width: 13ch;
          margin: 0 0 .35rem;
          font-size: clamp(3.15rem, 7vw, 7.4rem);
          font-weight: 900;
          letter-spacing: -.08em;
          line-height: .81;
          text-transform: uppercase;
        }

        .article-title span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1.25px rgba(247, 247, 244, .76);
        }

        .article-title span em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .article-lead {
          max-width: 61ch;
          margin: 2.1rem 0 0;
          color: rgba(247, 247, 244, .73);
          font-size: clamp(1rem, 1.3vw, 1.16rem);
          line-height: 1.76;
        }

        .article-match-wrap {
          padding: 4.2rem 0 0;
        }

        .article-match {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          gap: clamp(1rem, 3vw, 3.5rem);
          overflow: hidden;
          border: 1px solid rgba(13, 148, 136, .58);
          border-radius: 1.15rem;
          padding: clamp(1.6rem, 4vw, 3.3rem);
          background:
            radial-gradient(
              circle at 88% 12%,
              rgba(13, 148, 136, .20),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              rgba(13, 148, 136, .10),
              rgba(8, 8, 8, .95) 70%
            );
        }

        .article-match::before {
          content: "";
          position: absolute;
          right: -8rem;
          bottom: -8rem;
          width: 22rem;
          height: 22rem;
          border: 1px solid rgba(13, 148, 136, .18);
          border-radius: 50%;
          pointer-events: none;
        }

        .article-team {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .9rem;
          min-width: 0;
        }

        .article-team-logo {
          display: block;
          width: clamp(4.8rem, 10vw, 7rem);
          height: clamp(4.8rem, 10vw, 7rem);
          object-fit: contain;
          filter: drop-shadow(0 0 1rem rgba(13, 148, 136, .16));
        }

        .article-team-name {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1rem, 1.8vw, 1.55rem);
          font-weight: 900;
          letter-spacing: -.04em;
          line-height: 1;
          text-align: center;
          text-transform: uppercase;
        }

        .article-versus {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .article-competition {
          color: var(--teal);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .article-vs {
          margin: .75rem 0;
          color: var(--paper);
          font-size: clamp(2rem, 4vw, 3.7rem);
          font-weight: 900;
          letter-spacing: -.08em;
          line-height: .8;
        }

        .article-kickoff {
          color: rgba(247, 247, 244, .66);
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .11em;
          line-height: 1.65;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .article-content {
          display: grid;
          grid-template-columns: minmax(0, .76fr) minmax(280px, .24fr);
          gap: clamp(2.5rem, 8vw, 9rem);
          padding: 5.8rem 0 6.5rem;
        }

        .article-copy {
          max-width: 46rem;
        }

        .article-copy p {
          margin: 0 0 1.45rem;
          color: rgba(247, 247, 244, .70);
          font-size: clamp(1rem, 1.2vw, 1.08rem);
          line-height: 1.86;
        }

        .article-copy h2 {
          margin: 3rem 0 1.15rem;
          color: var(--paper);
          font-size: clamp(1.7rem, 3vw, 2.65rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .95;
          text-transform: uppercase;
        }

        .article-copy h2 span {
          color: var(--teal);
        }

        .article-quote {
          margin: 2.8rem 0;
          border-left: 2px solid var(--teal);
          padding: .35rem 0 .35rem 1.4rem;
        }

        .article-quote p {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1.3rem, 2.2vw, 1.85rem);
          font-weight: 800;
          letter-spacing: -.035em;
          line-height: 1.15;
        }

        .article-quote span {
          display: block;
          margin-top: .8rem;
          color: var(--teal);
          font-size: .62rem;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .article-aside {
          position: sticky;
          top: 7rem;
          align-self: start;
          border-top: 1px solid var(--line);
          padding-top: 1.35rem;
        }

        .article-aside-label {
          margin: 0 0 .75rem;
          color: rgba(247, 247, 244, .42);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .article-aside-value {
          margin: 0 0 1.55rem;
          color: var(--paper);
          font-size: .96rem;
          font-weight: 700;
          line-height: 1.55;
        }

        .article-cta {
          margin-top: 2.6rem;
          border: 1px solid rgba(13, 148, 136, .55);
          border-radius: 1rem;
          padding: 1.35rem;
          background: rgba(13, 148, 136, .07);
        }

        .article-cta p {
          margin: .9rem 0 1.25rem;
          color: var(--muted);
          font-size: .84rem;
          line-height: 1.65;
        }

        .article-cta-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.8rem;
          width: 100%;
          gap: .5rem;
          border: 1px solid var(--teal);
          border-radius: 99px;
          background: var(--teal);
          color: var(--ink);
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .2s ease, transform .2s ease;
        }

        .article-cta-link:hover {
          background: var(--teal-bright);
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .article-shell {
            width: min(100% - 2.5rem, 1440px);
          }

          .article-hero {
            padding: 3.8rem 0 3.5rem;
          }

          .article-content {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 4.3rem 0 5rem;
          }

          .article-aside {
            position: static;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .article-aside-value {
            margin-bottom: 0;
          }

          .article-cta {
            grid-column: 1 / -1;
            margin-top: .5rem;
          }
        }

        @media (max-width: 620px) {
          .article-title {
            font-size: clamp(2.95rem, 15vw, 4.5rem);
          }

          .article-match {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            border-radius: .9rem;
          }

          .article-versus {
            order: 2;
          }

          .article-team:first-child {
            order: 1;
          }

          .article-team:last-child {
            order: 3;
          }

          .article-aside {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="article-hero">
        <div className="article-shell article-hero-inner">
          <Link className="article-back" href="/">
            <span aria-hidden="true">←</span> Zur Startseite
          </Link>

          <div className="article-meta">Vorbericht · 3 Min. Lesezeit</div>

          <h1 className="article-title">
            Der Countdown
            <span>
              läuft: <em>Auftakt.</em>
            </span>
          </h1>

          <p className="article-lead">
            Am Sonntag startet FC Mello Wien in die neue Saison. Mit dem FC
            Polska wartet zum Auftakt in der 1. Klasse A die erste echte
            Standortbestimmung – und ein Moment, auf den das Team seit Wochen
            hinarbeitet.
          </p>
        </div>
      </section>

      <section className="article-shell article-match-wrap">
        <div className="article-match">
          <div className="article-team">
            <img
              className="article-team-logo"
              src={MATCH.homeLogo}
              alt={`${MATCH.home} Logo`}
            />
            <p className="article-team-name">{MATCH.home}</p>
          </div>

          <div className="article-versus">
            <div className="article-competition">{MATCH.competition}</div>
            <div className="article-vs">VS</div>
            <div className="article-kickoff">
              {MATCH.date}
              <br />
              {MATCH.time}
            </div>
          </div>

          <div className="article-team">
            <img
              className="article-team-logo"
              src={MATCH.awayLogo}
              alt={`${MATCH.away} Logo`}
            />
            <p className="article-team-name">{MATCH.away}</p>
          </div>
        </div>
      </section>

      <section className="article-shell article-content">
        <article className="article-copy">
          <p>
            Der Saisonauftakt ist mehr als ein Termin im Kalender. Für Mello ist
            er der erste gemeinsame Beweis dafür, wie weit ein neues Team in
            kurzer Zeit kommen kann: mit Energie, Verlässlichkeit und dem
            Anspruch, füreinander einzustehen.
          </p>

          <h2>
            Die letzte Woche <span>vor dem Start.</span>
          </h2>

          <p>
            In den letzten Einheiten liegt der Fokus auf Klarheit. Abläufe
            festigen, Kommunikation schärfen, Mut im Spiel nach vorne
            mitnehmen. Die Mannschaft arbeitet konzentriert daran, die
            Trainingsleistung auch dann auf den Platz zu bringen, wenn es am
            Sonntag erstmals um Punkte geht.
          </p>

          <div className="article-quote">
            <p>
              „Wir wollen als Team auftreten – mutig, geschlossen und mit der
              Freude, für Mello zu spielen.“
            </p>
            <span>FC Mello Wien · Saisonauftakt</span>
          </div>

          <h2>
            Ein erstes <span>Zeichen setzen.</span>
          </h2>

          <p>
            Gegen FC Polska beginnt die Saison mit einem Heimspiel. Das Team
            weiß, dass ein Auftakt kein fertiges Urteil über eine ganze Spielzeit
            ist. Trotzdem ist er die erste Gelegenheit, Haltung zu zeigen:
            füreinander arbeiten, Verantwortung übernehmen und jeden Ball
            gemeinsam verteidigen.
          </p>

          <p>
            Wir freuen uns auf alle, die dabei sind, mitfiebern und Mello von
            Beginn an unterstützen. Der Countdown läuft.
          </p>
        </article>

        <aside className="article-aside">
          <div>
            <p className="article-aside-label">Wettbewerb</p>
            <p className="article-aside-value">1. Klasse A</p>
          </div>

          <div>
            <p className="article-aside-label">Anpfiff</p>
            <p className="article-aside-value">
              Sonntag, 06.09.2026
              <br />
              11:30 Uhr
            </p>
          </div>

          <div>
            <p className="article-aside-label">Begegnung</p>
            <p className="article-aside-value">
              FC Mello Wien
              <br />
              vs. FC Polska
            </p>
          </div>

          <div className="article-cta">
            <div className="article-meta" style={{ margin: 0 }}>
              Mello TV
            </div>
            <p>
              Livestreams, Highlights und Einblicke aus dem Vereinsalltag.
            </p>
            <Link className="article-cta-link" href="/tv">
              Zu Mello TV <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}