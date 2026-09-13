import Link from "next/link";

const POLSKA_MATCH = {
  competition: "1. Klasse A",
  date: "Sonntag, 06. September 2026",
  time: "11:30 Uhr",
  home: "FC Mello Wien",
  away: "FC Polska",
  homeLogo: "/mello-wien.png",
  awayLogo: "/polska-wien.png",
  result: "1 : 5",
  halfTime: "1 : 3",
};

const PENAROL_MATCH = {
  competition: "1. Klasse A",
  date: "Sonntag, 13. September 2026",
  time: "14:00 Uhr",
  home: "Peñarol Wien",
  away: "FC Mello Wien",
  homeLogo: "/penarol-wien.png",
  awayLogo: "/mello-wien.png",
  venue: "Wienerbergplatz",
  address: "Computerstraße 3 · 1100 Wien",
};

const UNAVAILABLE_PLAYERS = [
  "Michael Ganhör",
  "Robert Mihalca",
  "Philip Molzer",
  "Lasthenis Polentas",
  "Damian Gugler",
  "Mario Dirr",
  "Jamil Harrati",
  "Lorenz Predcechtel",
  "Mathias Resch",
  "Oskar Ciula",
];

const REGISTRATION_PENDING = ["Felix Reiffen", "Vito Bruno Dicic"];

function MatchPanel({
  match,
  result,
  label,
}: {
  match: typeof POLSKA_MATCH | typeof PENAROL_MATCH;
  result?: string;
  label: string;
}) {
  return (
    <section className="article-match-wrap">
      <div className="article-match">
        <div className="article-team">
          <img
            className="article-team-logo"
            src={match.homeLogo}
            alt={`${match.home} Logo`}
          />
          <p className="article-team-name">{match.home}</p>
        </div>

        <div className="article-versus">
          <div className="article-competition">{match.competition}</div>
          <div className="article-vs">{result ?? "VS"}</div>
          <div className="article-kickoff">
            {result ? label : match.date}
            <br />
            {result ? `${match.date} · ${match.time}` : match.time}
          </div>
        </div>

        <div className="article-team">
          <img
            className="article-team-logo"
            src={match.awayLogo}
            alt={`${match.away} Logo`}
          />
          <p className="article-team-name">{match.away}</p>
        </div>
      </div>

      {!result && "venue" in match && (
        <p className="article-match-venue">
          {match.venue} · {match.address}
        </p>
      )}
    </section>
  );
}

export default function PenarolPage() {
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

        .article-hero::after {
          border: 1px solid rgba(13,148,136,.12);
          border-radius: 50%;
          bottom: -19rem;
          box-shadow:
            0 0 0 3.5rem rgba(13,148,136,.02),
            0 0 0 7rem rgba(13,148,136,.012);
          content: "";
          height: 42rem;
          pointer-events: none;
          position: absolute;
          right: -15rem;
          width: 42rem;
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

        .article-meta::before {
          background: var(--teal);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(13,148,136,.75);
          content: "";
          height: .42rem;
          margin-right: .65rem;
          width: .42rem;
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
          max-width: 64ch;
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

        .article-match-venue {
          color: rgba(247,247,244,.52);
          font-size: .74rem;
          font-weight: 700;
          letter-spacing: .05em;
          line-height: 1.6;
          margin: 1.15rem 0 0;
          text-align: center;
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

        .article-squad-card {
          background: rgba(247,247,244,.026);
          border: 1px solid rgba(247,247,244,.11);
          border-radius: 1rem;
          margin-top: 1.6rem;
          overflow: hidden;
        }

        .article-squad-card-head {
          background: rgba(13,148,136,.08);
          border-bottom: 1px solid rgba(13,148,136,.22);
          padding: 1.1rem 1.15rem .95rem;
        }

        .article-squad-card-head p {
          margin: 0;
        }

        .article-squad-card-title {
          color: var(--teal);
          font-size: .61rem;
          font-weight: 900;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .article-squad-card-subtitle {
          color: rgba(247,247,244,.72);
          font-size: .82rem;
          font-weight: 800;
          line-height: 1.45;
          margin-top: .4rem !important;
        }

        .article-squad-list {
          list-style: none;
          margin: 0;
          padding: .75rem 1.15rem 1rem;
        }

        .article-squad-list li {
          border-bottom: 1px solid rgba(247,247,244,.075);
          color: rgba(247,247,244,.68);
          font-size: .79rem;
          font-weight: 700;
          line-height: 1.45;
          padding: .6rem 0;
        }

        .article-squad-list li:last-child {
          border-bottom: 0;
        }

        .article-squad-note {
          color: rgba(247,247,244,.47);
          font-size: .71rem;
          font-weight: 700;
          line-height: 1.55;
          margin: 0;
          padding: 0 1.15rem 1.1rem;
        }

        .article-cta {
          background: rgba(13,148,136,.07);
          border: 1px solid rgba(13,148,136,.55);
          border-radius: 1rem;
          margin-top: 2.1rem;
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

          .article-squad-card,
          .article-cta {
            grid-column: 1 / -1;
          }

          .article-squad-card {
            margin-top: .5rem;
          }

          .article-squad-list {
            display: grid;
            gap: 0 1.5rem;
            grid-template-columns: repeat(2,minmax(0,1fr));
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

          .article-match-venue {
            font-size: .7rem;
            line-height: 1.55;
            margin-top: .9rem;
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

          .article-aside > div:not(.article-cta):not(.article-squad-card) {
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

          .article-squad-card {
            border: 0;
            border-radius: 0;
            margin: 0;
          }

          .article-squad-card-head {
            padding: 1rem;
          }

          .article-squad-list {
            display: block;
            padding: .65rem 1rem .8rem;
          }

          .article-squad-list li {
            font-size: .78rem;
            padding: .55rem 0;
          }

          .article-squad-note {
            padding: 0 1rem 1rem;
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
          <Link className="article-back" href="/news">
            <span aria-hidden="true">←</span>
            Zu den Berichten
          </Link>

          <div className="article-meta">Spielbericht &amp; Vorschau · 5 Min. Lesezeit</div>

          <h1 className="article-title">
            1:5 zum Auftakt.
            <span>
              Jetzt zählt die <em>Reaktion.</em>
            </span>
          </h1>

          <p className="article-lead">
            Der FC Mello Wien verliert das erste Pflichtspiel der
            Vereinsgeschichte gegen FC Polska mit 1:5. Die Analyse ist ehrlich,
            die Lehren sind klar — und die nächste Aufgabe bei Peñarol Wien
            verlangt der Mannschaft unter besonderen Bedingungen alles ab.
          </p>
        </div>
      </section>

      <div className="article-shell">
        <MatchPanel
          label="Endstand"
          match={POLSKA_MATCH}
          result={POLSKA_MATCH.result}
        />
      </div>

      <section className="article-shell article-content">
        <article className="article-copy">
          <p>
            Der Start in die erste Saison der Vereinsgeschichte ist misslungen.
            Gegen einen starken FC Polska musste sich der FC Mello Wien mit 1:5
            geschlagen geben. Das Ergebnis ist deutlich, der Blick darauf muss
            trotzdem ehrlich und differenziert sein: Polska war über 90 Minuten
            die bessere Mannschaft, nutzte Mellos Fehler konsequent aus und
            zeigte, warum der Gegner in der vergangenen Saison im Spitzenfeld
            der Liga stand und auch heuer wieder nach oben will.
          </p>

          <h2>
            Früh unter Druck, <span>späte Antwort</span>
          </h2>

          <p>
            Mello geriet früh in Rückstand. Mehrere einfache
            Konzentrationsfehler in der Defensive wurden direkt bestraft, nach
            knapp einer halben Stunde stand es 0:3. Gerade in diesen Momenten
            war zu sehen, dass viele Abläufe noch nicht automatisch greifen.
            Für einige Spieler war es das erste Pflichtspiel im Vereinsfußball
            überhaupt — eine neue Situation, ein höheres Tempo und viel Druck
            am Ball.
          </p>

          <p>
            Statt Ruhe und Klarheit gab es phasenweise Hektik, zu schnelle
            Entscheidungen und zu wenig Sicherheit im eigenen Ballbesitz. Auch
            im Spielaufbau gelang es zu selten, den Fußball auf den Platz zu
            bringen, den die Mannschaft in den Wochen davor trainiert und
            besprochen hatte.
          </p>

          <p>
            Trotzdem hat Mello nicht aufgehört. Kurz vor der Pause gelang ein
            Angriff, der zeigt, wie der eigene Fußball aussehen soll: Marco
            Miuli spielte einen starken Pass auf Mathias Resch. Nach einem
            Doppelpass auf der Außenbahn mit Oskar Ciula brachte Resch den Ball
            in den Strafraum. Daniel Rezai wurde dort zu Fall gebracht.
            Kapitän Marco Miuli verwandelte den fälligen Elfmeter sicher flach
            ins linke Eck. Mit dem 1:3 ging es in die Halbzeit.
          </p>

          <div className="article-quote">
            <p>
              „Wir müssen das Ganze ruhiger angehen. Mit dem Ball hatten viele
              Spieler zu viel Stress und wussten nicht immer, was der nächste
              Schritt sein soll. Da war viel Panik und zu wenig Ruhe drin.“
            </p>
            <span>Trainerteam FC Mello Wien</span>
          </div>

          <h2>
            Ehrliche Analyse, <span>klare Aufgaben</span>
          </h2>

          <p>
            Nach dem Seitenwechsel gelang es Mello nicht, den Rückstand
            nachhaltig zu verkürzen. Polska blieb dominant und bestrafte weitere
            Fehler. Das Trainerteam nimmt dabei auch sich selbst in die
            Verantwortung: Der Matchplan und die Lösungen im Spielaufbau haben
            nicht ausreichend funktioniert. Das ist kein Thema, das auf einzelne
            Spieler geschoben wird, sondern ein Auftrag an die gesamte
            Mannschaft und an das Trainerteam.
          </p>

          <p>
            Seit dem Auftakt wurde die Partie mehrfach vollständig analysiert.
            Dabei wurden klare Ansatzpunkte gefunden: ein strukturierterer
            Aufbau von hinten, bessere Absicherung nach Ballverlusten, ruhigere
            Entscheidungen am Ball und eine verständlichere Verteilung von
            Aufgaben und Räumen. Genau diese Themen werden im Training
            aufgearbeitet, gemeinsam mit der Mannschaft besprochen und Schritt
            für Schritt verbessert.
          </p>

          <p>
            Hervorzuheben ist trotz der Niederlage Torhüter Enis Polentas. Mit
            mehreren starken Paraden verhinderte er ein noch höheres Ergebnis
            und hielt Mello in schwierigen Phasen im Spiel.
          </p>

          <h2>
            Peñarol: Eine <span>besondere Aufgabe</span>
          </h2>

          <p>
            Schon der zweite Spieltag stellt den FC Mello Wien vor eine
            außergewöhnliche Aufgabe. Die Partie bei Peñarol Wien wurde
            kurzfristig verlegt: Weil der Kunstrasenplatz des Gegners derzeit
            neu gebaut wird, findet das Spiel nicht wie ursprünglich geplant am
            Samstagabend statt, sondern am Sonntag um 14:00 Uhr am
            Wienerbergplatz.
          </p>

          <p>
            Die Verschiebung trifft Mello personell besonders hart. Mehrere
            Spieler können den neuen Termin nicht wahrnehmen, dazu kommen
            Verletzungen und offene Registrierungen. Beide etatmäßigen
            Torhüter fallen aus. Deshalb wird Innenverteidiger Martin Drewes am
            Sonntag im Tor stehen.
          </p>

          <p>
            Mello reist mit einem Kader von genau elf Spielern an. Wechsel wird
            es keine geben. Das sind keine einfachen Voraussetzungen. Trotzdem
            verändert es nicht den Anspruch an die Mannschaft: ruhig bleiben,
            Verantwortung übernehmen, miteinander sprechen und sich gegenseitig
            unterstützen. Gerade wenn es eng wird, zeigt sich, was eine
            Mannschaft ausmacht.
          </p>

          <div className="article-quote">
            <p>
              „Wir reisen mit elf Spielern an und wissen, dass es eine besondere
              Aufgabe wird. Aber wir fahren nicht hin, um uns zu verstecken. Wir
              wollen es ruhiger, klarer und als Team besser machen.“
            </p>
            <span>FC Mello Wien · Vor dem 2. Spieltag</span>
          </div>

          <h2>
            Der Blick <span>nach vorne</span>
          </h2>

          <p>
            Nicht alles wird innerhalb einer Trainingswoche perfekt
            funktionieren. Aber die Mannschaft soll beim Wienerbergplatz mit
            mehr Ruhe am Ball, klareren Entscheidungen im Aufbau und einer
            geschlosseneren Defensive auftreten. Der Auftakt hat offen gezeigt,
            woran Mello arbeiten muss. Gegen Peñarol zählt deshalb vor allem
            die Reaktion: weniger Hektik, mehr Kommunikation und der Mut, den
            eigenen Weg auch unter Druck weiterzugehen.
          </p>

          <p>
            Der FC Mello Wien will zeigen, dass aus dem ersten Spiel die
            richtigen Lehren gezogen wurden — und trotz der schwierigen
            Ausgangslage ein besseres Ergebnis mit nach Hause nehmen.
          </p>

          <MatchPanel label="Nächstes Spiel" match={PENAROL_MATCH} />
        </article>

        <aside className="article-aside">
          <div>
            <p className="article-aside-label">Ergebnis Auftakt</p>
            <p className="article-aside-value">
              FC Mello Wien
              <br />
              <strong>1 : 5</strong>
              <br />
              FC Polska
            </p>
          </div>

          <div>
            <p className="article-aside-label">Halbzeit</p>
            <p className="article-aside-value">{POLSKA_MATCH.halfTime}</p>
          </div>

          <div>
            <p className="article-aside-label">Nächstes Spiel</p>
            <p className="article-aside-value">
              Sonntag, 13.09.2026
              <br />
              14:00 Uhr
              <br />
              Wienerbergplatz
            </p>
          </div>

          <div>
            <p className="article-aside-label">Im Tor</p>
            <p className="article-aside-value">Martin Drewes</p>
          </div>

          <div className="article-squad-card">
            <div className="article-squad-card-head">
              <p className="article-squad-card-title">Kader-Update</p>
              <p className="article-squad-card-subtitle">
                11 Spieler · keine Wechseloption
              </p>
            </div>

            <ul className="article-squad-list">
              <li>
                <strong>Verletzt:</strong> Michael Ganhör, Robert Mihalca
              </li>

              {UNAVAILABLE_PLAYERS.slice(2).map((player) => (
                <li key={player}>{player}</li>
              ))}

              <li>
                <strong>Registrierung offen:</strong> {REGISTRATION_PENDING[0]}
              </li>

              <li>{REGISTRATION_PENDING[1]}</li>
            </ul>

            <p className="article-squad-note">
              Die Registrierungen von Felix Reiffen und Vito Bruno Dicic wurden
              durch den Verband zurückgestellt.
            </p>
          </div>

          <div className="article-cta">
            <div className="article-meta" style={{ margin: 0 }}>
              Spielplan
            </div>

            <p>
              Alle Termine, Ergebnisse und Spielorte der Saison auf einen Blick.
            </p>

            <Link className="article-cta-link" href="/spielplan">
              Zum Spielplan <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}