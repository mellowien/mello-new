import Link from "next/link";

const MATCH = {
  competition: "1. Klasse A",
  date: "Sonntag, 06. September 2026",
  time: "11:30 Uhr",
  home: "FC Mello Wien",
  away: "FC Polska Wien",
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
          --line: rgba(247,247,244,.12);
          --muted: rgba(247,247,244,.62);
          background: var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          overflow: hidden;
          padding-top: 88px;
        }

        .article-page * {
          box-sizing: border-box;
        }

        .article-shell {
          margin: 0 auto;
          width: min(100% - 6rem, 1440px);
        }

        .article-hero {
          background:
            radial-gradient(
              ellipse 43% 120% at 94% 48%,
              rgba(13,148,136,.15),
              transparent 74%
            ),
            linear-gradient(115deg, #080808 0%, #080808 56%, #0a1211 100%);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          padding: 4.7rem 0 4.4rem;
          position: relative;
        }

        .article-hero-inner {
          max-width: 1060px;
          position: relative;
          z-index: 1;
        }

        .article-back {
          align-items: center;
          border: 1px solid rgba(247,247,244,.16);
          border-radius: 99px;
          color: rgba(247,247,244,.70);
          display: inline-flex;
          font-size: .63rem;
          font-weight: 800;
          gap: .55rem;
          letter-spacing: .12em;
          min-height: 2.6rem;
          padding: 0 1rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }

        .article-back:hover {
          background: rgba(13,148,136,.08);
          border-color: rgba(13,148,136,.65);
          color: var(--teal);
        }

        .article-meta {
          align-items: center;
          color: var(--teal);
          display: flex;
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .16em;
          margin: 2rem 0 1.65rem;
          text-transform: uppercase;
        }

        .article-title {
          font-size: clamp(3.15rem, 7vw, 7.4rem);
          font-weight: 900;
          letter-spacing: -.08em;
          line-height: .81;
          margin: 0 0 .35rem;
          max-width: 13ch;
          text-transform: uppercase;
        }

        .article-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.25px rgba(247,247,244,.76);
        }

        .article-title span em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .article-lead {
          color: rgba(247,247,244,.73);
          font-size: clamp(1rem, 1.3vw, 1.16rem);
          line-height: 1.76;
          margin: 2.1rem 0 0;
          max-width: 61ch;
        }

        .article-match-wrap {
          padding: 4.2rem 0 0;
        }

        .article-match {
          align-items: center;
          background:
            radial-gradient(
              circle at 88% 12%,
              rgba(13,148,136,.20),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              rgba(13,148,136,.10),
              rgba(8,8,8,.95) 70%
            );
          border: 1px solid rgba(13,148,136,.58);
          border-radius: 1.15rem;
          display: grid;
          gap: clamp(1rem, 3vw, 3.5rem);
          grid-template-columns: minmax(0,1fr) auto minmax(0,1fr);
          overflow: hidden;
          padding: clamp(1.6rem,4vw,3.3rem);
          position: relative;
        }

        .article-match::before {
          border: 1px solid rgba(13,148,136,.18);
          border-radius: 50%;
          bottom: -8rem;
          content: "";
          height: 22rem;
          pointer-events: none;
          position: absolute;
          right: -8rem;
          width: 22rem;
        }

        .article-team {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: .9rem;
          min-width: 0;
          position: relative;
          z-index: 1;
        }

        .article-team-logo {
          display: block;
          filter: drop-shadow(0 0 1rem rgba(13,148,136,.16));
          height: clamp(4.8rem,10vw,7rem);
          object-fit: contain;
          width: clamp(4.8rem,10vw,7rem);
        }

        .article-team-name {
          color: var(--paper);
          font-size: clamp(1rem,1.8vw,1.55rem);
          font-weight: 900;
          letter-spacing: -.04em;
          line-height: 1;
          margin: 0;
          overflow-wrap: anywhere;
          text-align: center;
          text-transform: uppercase;
        }

        .article-versus {
          position: relative;
          text-align: center;
          z-index: 1;
        }

        .article-competition {
          color: var(--teal);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .article-vs {
          color: var(--paper);
          font-size: clamp(2rem,4vw,3.7rem);
          font-weight: 900;
          letter-spacing: -.08em;
          line-height: .8;
          margin: .75rem 0;
        }

        .article-kickoff {
          color: rgba(247,247,244,.66);
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .11em;
          line-height: 1.65;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .article-content {
          display: grid;
          gap: clamp(2.5rem,8vw,9rem);
          grid-template-columns: minmax(0,.76fr) minmax(280px,.24fr);
          padding: 5.8rem 0 6.5rem;
        }

        .article-copy {
          max-width: 46rem;
        }

        .article-copy p {
          color: rgba(247,247,244,.70);
          font-size: clamp(1rem,1.2vw,1.08rem);
          line-height: 1.86;
          margin: 0 0 1.45rem;
        }

        .article-copy h2 {
          color: var(--paper);
          font-size: clamp(1.7rem,3vw,2.65rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .95;
          margin: 3rem 0 1.15rem;
          text-transform: uppercase;
        }

        .article-copy h2 span {
          color: var(--teal);
        }

        .article-quote {
          border-left: 2px solid var(--teal);
          margin: 2.8rem 0;
          padding: .35rem 0 .35rem 1.4rem;
        }

        .article-quote p {
          color: var(--paper);
          font-size: clamp(1.3rem,2.2vw,1.85rem);
          font-weight: 800;
          letter-spacing: -.035em;
          line-height: 1.15;
          margin: 0;
        }

        .article-quote span {
          color: var(--teal);
          display: block;
          font-size: .62rem;
          font-weight: 800;
          letter-spacing: .14em;
          margin-top: .8rem;
          text-transform: uppercase;
        }

        .article-aside {
          align-self: start;
          border-top: 1px solid var(--line);
          padding-top: 1.35rem;
          position: sticky;
          top: 7rem;
        }

        .article-aside-label {
          color: rgba(247,247,244,.42);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .15em;
          margin: 0 0 .75rem;
          text-transform: uppercase;
        }

        .article-aside-value {
          color: var(--paper);
          font-size: .96rem;
          font-weight: 700;
          line-height: 1.55;
          margin: 0 0 1.55rem;
        }

        .article-cta {
          background: rgba(13,148,136,.07);
          border: 1px solid rgba(13,148,136,.55);
          border-radius: 1rem;
          margin-top: 2.6rem;
          padding: 1.35rem;
        }

        .article-cta p {
          color: var(--muted);
          font-size: .84rem;
          line-height: 1.65;
          margin: .9rem 0 1.25rem;
        }

        .article-cta-link {
          align-items: center;
          background: var(--teal);
          border: 1px solid var(--teal);
          border-radius: 99px;
          color: var(--ink);
          display: inline-flex;
          font-size: .65rem;
          font-weight: 900;
          gap: .5rem;
          justify-content: center;
          letter-spacing: .13em;
          min-height: 2.8rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .2s ease, transform .2s ease;
          width: 100%;
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
            gap: 1rem;
            grid-template-columns: 1fr;
            padding: 4.3rem 0 5rem;
          }

          .article-aside {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(3,1fr);
            margin-top: 1.5rem;
            position: static;
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
          .article-page {
            padding-top: 68px;
          }

          .article-shell {
            width: min(100% - 2.25rem, 40rem);
          }

          .article-hero {
            background:
              radial-gradient(
                ellipse 110% 55% at 100% 10%,
                rgba(13,148,136,.12),
                transparent 72%
              ),
              linear-gradient(145deg,#080808 0%,#08100f 100%);
            padding: 2.4rem 0 2.75rem;
          }

          .article-back {
            font-size: .57rem;
            letter-spacing: .1em;
            min-height: 44px;
            padding: 0 .9rem;
          }

          .article-meta {
            font-size: .58rem;
            letter-spacing: .14em;
            margin: 1.55rem 0 1.05rem;
          }

          .article-title {
            font-size: clamp(2.55rem,13vw,3.75rem);
            letter-spacing: -.075em;
            line-height: .86;
            max-width: 12ch;
          }

          .article-title span {
            -webkit-text-stroke-width: 1px;
          }

          .article-lead {
            color: rgba(247,247,244,.72);
            font-size: 1rem;
            line-height: 1.68;
            margin-top: 1.45rem;
            max-width: 35ch;
          }

          .article-match-wrap {
            padding: 2.2rem 0 0;
          }

          .article-match {
            border-radius: .9rem;
            display: flex;
            flex-direction: row;
            gap: .65rem;
            justify-content: space-between;
            min-height: 12rem;
            padding: 1.15rem .85rem 1rem;
          }

          .article-match::before {
            bottom: -6rem;
            height: 15rem;
            right: -6rem;
            width: 15rem;
          }

          .article-team {
            flex: 1 1 0;
            gap: .5rem;
            justify-content: center;
            min-width: 0;
          }

          .article-team-logo {
            height: clamp(3.65rem,18vw,4.7rem);
            width: clamp(3.65rem,18vw,4.7rem);
          }

          .article-team-name {
            font-size: clamp(.72rem,3.4vw,.92rem);
            letter-spacing: -.025em;
            line-height: 1.08;
            max-width: 10ch;
          }

          .article-versus {
            align-items: center;
            display: flex;
            flex: 0 0 3.75rem;
            flex-direction: column;
            justify-content: center;
            min-width: 0;
          }

          .article-competition {
            font-size: .45rem;
            letter-spacing: .08em;
            line-height: 1.15;
            max-width: 100%;
            text-align: center;
          }

          .article-vs {
            font-size: 1.65rem;
            line-height: 1;
            margin: .45rem 0;
          }

          .article-kickoff {
            font-size: .46rem;
            letter-spacing: .045em;
            line-height: 1.4;
            text-align: center;
            white-space: normal;
          }

          .article-content {
            gap: 2.65rem;
            padding: 3.6rem 0 4rem;
          }

          .article-copy {
            max-width: 36ch;
          }

          .article-copy p {
            font-size: 1rem;
            line-height: 1.75;
            margin-bottom: 1.25rem;
          }

          .article-copy h2 {
            font-size: clamp(1.7rem,8vw,2.2rem);
            line-height: 1;
            margin: 2.4rem 0 .9rem;
          }

          .article-quote {
            margin: 2.15rem 0;
            padding-left: 1rem;
          }

          .article-quote p {
            font-size: clamp(1.18rem,5.8vw,1.55rem);
            line-height: 1.2;
          }

          .article-quote span {
            font-size: .54rem;
            letter-spacing: .11em;
            line-height: 1.4;
            margin-top: .65rem;
          }

          .article-aside {
            background: rgba(247,247,244,.025);
            border: 1px solid rgba(247,247,244,.1);
            border-radius: .9rem;
            display: grid;
            gap: 0;
            grid-template-columns: 1fr;
            margin-top: 0;
            overflow: hidden;
            padding: 0;
          }

          .article-aside > div:not(.article-cta) {
            border-bottom: 1px solid rgba(247,247,244,.09);
            padding: .9rem 1rem .85rem;
          }

          .article-aside-label {
            font-size: .54rem;
            letter-spacing: .13em;
            margin-bottom: .38rem;
          }

          .article-aside-value {
            font-size: .9rem;
            line-height: 1.45;
          }

          .article-cta {
            background: rgba(13,148,136,.075);
            border: 0;
            border-radius: 0;
            margin: 0;
            padding: 1.1rem 1rem 1rem;
          }

          .article-cta .article-meta {
            font-size: .55rem;
            margin: 0;
          }

          .article-cta p {
            font-size: .87rem;
            line-height: 1.6;
            margin: .65rem 0 1rem;
          }

          .article-cta-link {
            font-size: .62rem;
            min-height: 49px;
          }
        }

        @media (max-width: 360px) {
          .article-shell {
            width: min(100% - 2rem,40rem);
          }

          .article-title {
            font-size: 2.42rem;
          }

          .article-match {
            padding-left: .65rem;
            padding-right: .65rem;
          }

          .article-versus {
            flex-basis: 3.25rem;
          }

          .article-team-name {
            font-size: .68rem;
          }

          .article-copy p {
            font-size: .95rem;
          }
        }
      `}</style>

      <section className="article-hero">
        <div className="article-shell article-hero-inner">
          <Link className="article-back" href="/">
            <span aria-hidden="true">←</span>
            Zur Startseite
          </Link>

          <div className="article-meta">Vorbericht · 3 Min. Lesezeit</div>

          <h1 className="article-title">
            Der Countdown
            <span>
              läuft: <em>Auftakt</em>
            </span>
          </h1>

          <p className="article-lead">
            Am Sonntag startet der FC Mello Wien in die erste Saison der Vereinsgeschichte. Mit dem FC
            Polska wartet zum Auftakt in der 1. Klasse A die erste echte
            Standortbestimmung und ein Moment, auf den das Team seit Monaten
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
            Die letzte Woche <span>vor dem Start</span>
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
              „Wir wollen als Team auftreten. Mutig, geschlossen und mit der
              Freude, für Mello zu spielen.“
            </p>
            <span>FC Mello Wien · Saisonauftakt</span>
          </div>

          <h2>
            Ein erstes <span>Zeichen setzen</span>
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
              vs. FC Polska Wien
            </p>
          </div>

          <div className="article-cta">
            <div className="article-meta" style={{ margin: 0 }}>
              Mello TV
            </div>

            <p>
              Livestreams, Highlights und Einblicke aus dem Vereinsalltag
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