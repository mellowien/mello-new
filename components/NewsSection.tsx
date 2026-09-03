"use client";

import Link from "next/link";

const ARTICLES = [
  {
    id: 1,
    tag: "Vorbericht",
    date: "06. Sep 2026",
    title: "Der Countdown läuft: Mello vor dem ersten Spiel",
    excerpt:
      "Am Sonntag empfängt FC Mello Wien den FC Polska zum Auftakt in der 1. Klasse A. Was die Mannschaft erwartet und worauf es in der letzten Trainingswoche ankommt.",
    href: "/news/auftakt",
    readTime: "3 Min.",
  },
  {
    id: 2,
    tag: "Aus dem Training",
    date: "Diese Woche",
    title: "Fokus, Energie, Zusammenhalt: Stimmen aus der Vorbereitung",
    excerpt:
      "Die Mannschaft arbeitet konzentriert auf den Auftakt hin. Ein Blick auf die letzten Einheiten, die Entwicklung im Team und den gemeinsamen Anspruch.",
    href: "/news/training",
    readTime: "4 Min.",
  },
];

export default function NewsSection() {
  return (
    <section className="news-section">
      <style>{`
        .news-section {
          --ink: #080808;
          --paper: #f7f7f4;
          --teal: #0d9488;
          --teal-bright: #14b8a6;
          --line: rgba(247, 247, 244, .12);
          --muted: rgba(247, 247, 244, .60);
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--line);
          background:
            radial-gradient(ellipse 42% 72% at 100% 54%, rgba(13, 148, 136, .10), transparent 72%),
            var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          padding: 6.2rem 0;
        }

        .news-section * {
          box-sizing: border-box;
        }

        .news-shell {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        .news-header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.8rem;
        }

        .news-eyebrow,
        .news-kicker {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: var(--teal);
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .news-eyebrow::before,
        .news-kicker::before {
          content: "";
          width: .4rem;
          height: .4rem;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 10px rgba(13, 148, 136, .7);
        }

        .news-title {
          margin: 1.1rem 0 0;
          font-size: clamp(2.7rem, 5.2vw, 5.7rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .83;
          text-transform: uppercase;
        }

        .news-title span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1px rgba(247, 247, 244, .72);
        }

        .news-title span em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .news-all-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          gap: .55rem;
          border: 1px solid rgba(13, 148, 136, .52);
          border-radius: 99px;
          padding: 0 1.25rem;
          color: var(--teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-decoration: none;
          text-transform: uppercase;
          white-space: nowrap;
          transition:
            border-color .2s ease,
            background .2s ease,
            color .2s ease,
            transform .2s ease;
        }

        .news-all-link:hover {
          border-color: var(--teal);
          background: var(--teal);
          color: var(--ink);
          transform: translateY(-1px);
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }

        .news-card,
        .news-cta-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 25rem;
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .11);
          border-radius: 1.15rem;
          padding: 1.75rem;
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .052),
              rgba(247, 247, 244, .018) 56%,
              rgba(13, 148, 136, .035)
            );
        }

        .news-card {
          color: inherit;
          text-decoration: none;
          transition:
            transform .28s cubic-bezier(.22, 1, .36, 1),
            border-color .28s ease,
            background .28s ease,
            box-shadow .28s ease;
        }

        .news-card::after {
          content: "";
          position: absolute;
          right: -5.5rem;
          top: -5.5rem;
          width: 12rem;
          height: 12rem;
          border: 1px solid rgba(13, 148, 136, .15);
          border-radius: 50%;
          transition: transform .35s cubic-bezier(.22, 1, .36, 1);
        }

        .news-card:hover {
          transform: translateY(-5px);
          border-color: rgba(13, 148, 136, .64);
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .075),
              rgba(247, 247, 244, .025) 56%,
              rgba(13, 148, 136, .075)
            );
          box-shadow:
            0 1.3rem 3rem rgba(0, 0, 0, .45),
            0 0 2rem rgba(13, 148, 136, .09);
        }

        .news-card:hover::after {
          transform: scale(1.18);
        }

        .news-card-head {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: .8rem;
        }

        .news-tag {
          display: inline-flex;
          align-items: center;
          min-height: 1.45rem;
          border: 1px solid rgba(13, 148, 136, .38);
          border-radius: 99px;
          padding: 0 .65rem;
          color: var(--teal);
          background: rgba(13, 148, 136, .09);
          font-size: .55rem;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .news-meta {
          color: rgba(247, 247, 244, .40);
          font-size: .61rem;
          font-weight: 700;
          letter-spacing: .03em;
          white-space: nowrap;
        }

        .news-card-title {
          position: relative;
          z-index: 1;
          max-width: 15ch;
          margin: 4.4rem 0 1rem;
          color: var(--paper);
          font-size: clamp(1.4rem, 2.1vw, 1.85rem);
          font-weight: 900;
          letter-spacing: -.045em;
          line-height: .98;
          text-transform: uppercase;
        }

        .news-card-text {
          position: relative;
          z-index: 1;
          max-width: 33ch;
          margin: 0;
          color: var(--muted);
          font-size: .87rem;
          line-height: 1.72;
        }

        .news-read {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          margin-top: auto;
          padding-top: 2rem;
          color: var(--teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .news-cta-card {
          justify-content: space-between;
          border-color: rgba(13, 148, 136, .55);
          background:
            radial-gradient(circle at 92% 8%, rgba(13, 148, 136, .22), transparent 38%),
            linear-gradient(145deg, rgba(13, 148, 136, .13), rgba(8, 8, 8, .96) 74%);
        }

        .news-cta-card::before {
          content: "";
          position: absolute;
          right: -7rem;
          bottom: -7rem;
          width: 18rem;
          height: 18rem;
          border: 1px solid rgba(13, 148, 136, .20);
          border-radius: 50%;
          pointer-events: none;
        }

        .news-cta-title {
          position: relative;
          z-index: 1;
          max-width: 11ch;
          margin: 1.15rem 0 1rem;
          font-size: clamp(1.75rem, 2.5vw, 2.3rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .92;
          text-transform: uppercase;
        }

        .news-cta-text {
          position: relative;
          z-index: 1;
          max-width: 30ch;
          margin: 0;
          color: rgba(247, 247, 244, .68);
          font-size: .88rem;
          line-height: 1.72;
        }

        .news-cta-link {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 3.2rem;
          gap: .55rem;
          margin-top: 2rem;
          border: 1px solid var(--teal);
          border-radius: 99px;
          background: var(--teal);
          color: var(--ink);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            background .2s ease,
            border-color .2s ease,
            transform .2s ease;
        }

        .news-cta-link:hover {
          border-color: var(--teal-bright);
          background: var(--teal-bright);
          transform: translateY(-1px);
        }

        @media (max-width: 1050px) {
          .news-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .news-cta-card {
            min-height: 19rem;
          }
        }

        @media (max-width: 900px) {
          .news-shell {
            width: min(100% - 2.5rem, 1440px);
          }

          .news-section {
            padding: 4.5rem 0;
          }

          .news-header {
            align-items: start;
            flex-direction: column;
            margin-bottom: 2.25rem;
          }

          .news-title {
            font-size: clamp(2.6rem, 11vw, 4.5rem);
          }
        }

        @media (max-width: 620px) {
          .news-grid {
            grid-template-columns: 1fr;
          }

          .news-card,
          .news-cta-card {
            min-height: 21rem;
            border-radius: .9rem;
            padding: 1.45rem;
          }

          .news-card-title {
            margin-top: 3.5rem;
          }

          .news-all-link {
            width: 100%;
          }
        }
      `}</style>

      <div className="news-shell">
        <header className="news-header">
          <div>
            <div className="news-eyebrow">Stimmen & Berichte</div>

            <h2 className="news-title">
              Aktuell
              <span>
                bei <em>Mello.</em>
              </span>
            </h2>
          </div>

          <Link className="news-all-link" href="/news">
            Alle Stimmen &amp; Berichte <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="news-grid">
          {ARTICLES.map((article) => (
            <Link className="news-card" href={article.href} key={article.id}>
              <div className="news-card-head">
                <span className="news-tag">{article.tag}</span>
                <span className="news-meta">
                  {article.date} · {article.readTime}
                </span>
              </div>

              <h3 className="news-card-title">{article.title}</h3>

              <p className="news-card-text">{article.excerpt}</p>

              <div className="news-read">
                Weiterlesen <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}

          <article className="news-cta-card">
            <div>
              <div className="news-kicker">Mitglied werden</div>

              <h3 className="news-cta-title">
                Gestalte den Verein aktiv mit.
              </h3>

              <p className="news-cta-text">
                Werde offizieller Teil von Mello und unterstütze den Aufbau
                eines Vereins, der Fußball anders denkt.
              </p>
            </div>

            <Link className="news-cta-link" href="/mitgliedschaft">
              Jetzt Mitglied werden <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}