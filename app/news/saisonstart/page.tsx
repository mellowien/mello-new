import Link from "next/link";

export default function SaisonstartPage() {
  return (
    <main className="article-page">
      <style>{`
        .article-page {
          --ink: #080808;
          --paper: #f7f7f4;
          --teal: #0d9488;
          --line: rgba(247,247,244,.12);
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse 50% 58% at 100% 8%,
              rgba(13,148,136,.12),
              transparent 72%
            ),
            var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          padding: 8.5rem 0 6rem;
        }

        .article-page * {
          box-sizing: border-box;
        }

        .article-shell {
          width: min(100% - 3rem, 900px);
          margin: 0 auto;
        }

        .article-back {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          min-height: 2.65rem;
          padding: 0 1rem;
          border: 1px solid rgba(247,247,244,.17);
          border-radius: 999px;
          color: rgba(247,247,244,.72);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .12em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .2s ease, border-color .2s ease, color .2s ease;
        }

        .article-back:hover {
          border-color: var(--teal);
          background: rgba(13,148,136,.08);
          color: var(--teal);
        }

        .article-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: .7rem;
          margin-top: 3.4rem;
        }

        .article-tag {
          display: inline-flex;
          align-items: center;
          min-height: 1.65rem;
          padding: 0 .72rem;
          border: 1px solid rgba(13,148,136,.42);
          border-radius: 999px;
          background: rgba(13,148,136,.10);
          color: var(--teal);
          font-size: .56rem;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .article-date {
          color: rgba(247,247,244,.48);
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .04em;
        }

        .article-title {
          max-width: 13ch;
          margin: 1.4rem 0 1.7rem;
          color: var(--paper);
          font-size: clamp(3rem, 7.2vw, 6.8rem);
          font-weight: 900;
          letter-spacing: -.085em;
          line-height: .84;
          text-transform: uppercase;
        }

        .article-lead {
          max-width: 62ch;
          margin: 0;
          color: rgba(247,247,244,.72);
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          line-height: 1.8;
        }

        .score-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          overflow: hidden;
          margin: 3.4rem 0;
          border: 1px solid rgba(13,148,136,.4);
          border-radius: 1.1rem;
          background: rgba(13,148,136,.4);
        }

        .score-item {
          padding: 1.45rem 1.25rem;
          background:
            linear-gradient(
              145deg,
              rgba(13,148,136,.12),
              rgba(8,8,8,.98)
            );
        }

        .score-label {
          display: block;
          margin-bottom: .7rem;
          color: var(--teal);
          font-size: .57rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .score-match {
          display: block;
          color: rgba(247,247,244,.70);
          font-size: .76rem;
          font-weight: 800;
          line-height: 1.35;
          text-transform: uppercase;
        }

        .score-result {
          display: block;
          margin-top: .55rem;
          color: var(--paper);
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: -.05em;
        }

        .article-body {
          max-width: 680px;
        }

        .article-body h2 {
          margin: 3.2rem 0 1rem;
          color: var(--paper);
          font-size: clamp(1.6rem, 3vw, 2.35rem);
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: .95;
          text-transform: uppercase;
        }

        .article-body p {
          margin: 0 0 1.35rem;
          color: rgba(247,247,244,.72);
          font-size: 1.02rem;
          line-height: 1.85;
        }

        .article-body strong {
          color: var(--paper);
        }

        .article-quote {
          margin: 2.8rem 0;
          padding: 1.35rem 0 1.35rem 1.4rem;
          border-left: 2px solid var(--teal);
          color: var(--paper);
          font-size: clamp(1.25rem, 2.5vw, 1.8rem);
          font-weight: 800;
          letter-spacing: -.04em;
          line-height: 1.25;
        }

        .article-next {
          margin-top: 4rem;
          padding: 1.55rem;
          border: 1px solid rgba(13,148,136,.48);
          border-radius: 1rem;
          background:
            radial-gradient(
              circle at 90% 10%,
              rgba(13,148,136,.20),
              transparent 40%
            ),
            rgba(13,148,136,.06);
        }

        .article-next-label {
          margin: 0 0 .75rem;
          color: var(--teal);
          font-size: .61rem;
          font-weight: 900;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .article-next-title {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1.35rem, 2.8vw, 2rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .95;
          text-transform: uppercase;
        }

        .article-next-text {
          margin: .9rem 0 0;
          color: rgba(247,247,244,.64);
          font-size: .9rem;
          line-height: 1.65;
        }

        .article-next-link {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          margin-top: 1.4rem;
          color: var(--teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .12em;
          text-decoration: none;
          text-transform: uppercase;
        }

        .article-next-link:hover {
          color: var(--paper);
        }

        @media (max-width: 640px) {
          .article-page {
            padding: 6.5rem 0 4.5rem;
          }

          .article-shell {
            width: min(100% - 2.25rem, 900px);
          }

          .article-meta {
            margin-top: 2.5rem;
          }

          .article-title {
            max-width: 14ch;
            margin: 1.1rem 0 1.35rem;
            font-size: clamp(2.7rem, 13vw, 4.4rem);
          }

          .score-summary {
            grid-template-columns: 1fr;
            margin: 2.6rem 0;
          }

          .score-item {
            padding: 1.15rem;
          }

          .article-body p {
            font-size: .97rem;
            line-height: 1.78;
          }

          .article-body h2 {
            margin-top: 2.6rem;
          }

          .article-quote {
            margin: 2.2rem 0;
            font-size: 1.22rem;
          }
        }
      `}</style>

      <article className="article-shell">
        <Link className="article-back" href="/news">
          <span aria-hidden="true">←</span>
          Alle Berichte
        </Link>

        <div className="article-meta">
          <span className="article-tag">
            Zwischenfazit · Kampfmannschaft
          </span>
          <span className="article-date">26. September 2026 · 5 Min. Lesezeit</span>
        </div>

        <h1 className="article-title">
          Drei Spiele. Ein harter Start. Jetzt beginnt unsere Antwort.
        </h1>

        <p className="article-lead">
          Der Beginn unserer ersten Saison ist desaströs verlaufen. Drei
          Niederlagen, ein Torverhältnis von 5:28 und viele offene Fragen.
          Trotzdem schauen wir nicht weg — denn genau jetzt zeigt sich, was
          ein neuer Verein wirklich ausmacht.
        </p>

        <section className="score-summary" aria-label="Ergebnisse der ersten drei Spiele">
          <div className="score-item">
            <span className="score-label">Runde 01</span>
            <span className="score-match">FC Mello Wien · FC Polska</span>
            <strong className="score-result">1 : 5</strong>
          </div>

          <div className="score-item">
            <span className="score-label">Runde 02</span>
            <span className="score-match">Peñarol Wien · FC Mello Wien</span>
            <strong className="score-result">4 : 1</strong>
          </div>

          <div className="score-item">
            <span className="score-label">Runde 03</span>
            <span className="score-match">FC Mello Wien · Yellow Star</span>
            <strong className="score-result">0 : 19</strong>
          </div>
        </section>

        <div className="article-body">
          <h2>Die Realität anerkennen</h2>

          <p>
            Drei Spiele liegen hinter uns — und sie haben uns mit voller Wucht
            gezeigt, wie hoch die Anforderungen in der 1. Klasse A sind. Auf
            das 1:5 gegen FC Polska folgte ein 1:4 bei Peñarol Wien. Das 0:19
            gegen Yellow Star war schließlich ein Ergebnis, das niemand im
            Verein schönreden kann und will.
          </p>

          <p>
            Es wäre leicht, nach solchen Resultaten Ausreden zu suchen. Ein
            neuer Verein, ein neuer Kader, wenig gemeinsame Zeit. All das gehört
            zur Realität. Aber es erklärt nicht alles. Wir müssen in jeder
            Einheit konsequenter arbeiten, als Mannschaft klarer auftreten und
            füreinander Verantwortung übernehmen.
          </p>

          <div className="article-quote">
            Wir sind nicht dort, wo wir sein wollen. Aber wir entscheiden
            selbst, wie wir auf diesen Start reagieren.
          </div>

          <h2>Was jetzt zählt</h2>

          <p>
            Ein schwieriger Saisonbeginn definiert keine Mannschaft dauerhaft.
            Er kann aber sichtbar machen, worauf es ankommt: Verlässlichkeit,
            Kommunikation, Einsatz und der Wille, auch nach einem Rückschlag
            wieder aufzustehen. Mello wurde nicht gegründet, um nur dann
            zusammenzuhalten, wenn alles leichtfällt.
          </p>

          <p>
            Jetzt geht es darum, aus den ersten drei Spielen konkrete Lehren zu
            ziehen. Defensiv müssen wir geschlossener agieren. Mit Ball brauchen
            wir mehr Ruhe und klarere Entscheidungen. Und vor allem brauchen wir
            in jeder Minute die Bereitschaft, für den Mitspieler den zusätzlichen
            Meter zu machen.
          </p>

          <h2>Der Blick geht nach vorn</h2>

          <p>
            Die nächste Aufgabe wartet bereits: auswärts beim Penzinger SV. Wir
            fahren nicht dorthin, um den bisherigen Start zu verdrängen. Wir
            fahren dorthin, um eine Antwort zu geben — als Team, als Verein und
            als Mello.
          </p>

          <p>
            Danke an alle, die trotz dieser ersten Wochen an unserer Seite
            stehen: an Spieler, Trainerteam, Mitglieder, Freunde und
            Unterstützerinnen und Unterstützer. Der Weg ist gerade schwer. Aber
            er ist unserer.
          </p>
        </div>

        <aside className="article-next">
          <p className="article-next-label">Nächste Aufgabe</p>

          <h2 className="article-next-title">
            Penzinger SV gegen FC Mello Wien
          </h2>

          <p className="article-next-text">
            Samstag, 26. September 2026 · 18:00 Uhr · Kinkplatz, 1140 Wien.
            Jede Unterstützung zählt.
          </p>

          <Link className="article-next-link" href="/spielplan">
            Zum Spielplan <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </article>
    </main>
  );
}