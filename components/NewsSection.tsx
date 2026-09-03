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
          --line: rgba(247,247,244,.12);
          --muted: rgba(247,247,244,.60);
          background:
            radial-gradient(
              ellipse 42% 72% at 100% 54%,
              rgba(13,148,136,.10),
              transparent 72%
            ),
            var(--ink);
          border-top: 1px solid var(--line);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
          padding: 6.2rem 0;
          position: relative;
        }

        .news-section * {
          box-sizing: border-box;
        }

        .news-shell {
          margin: 0 auto;
          width: min(100% - 6rem, 1440px);
        }

        .news-header {
          align-items: end;
          display: flex;
          gap: 2rem;
          justify-content: space-between;
          margin-bottom: 2.8rem;
        }

        .news-eyebrow,
        .news-kicker {
          align-items: center;
          color: var(--teal);
          display: inline-flex;
          font-size: .67rem;
          font-weight: 800;
          gap: .55rem;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .news-eyebrow::before,
        .news-kicker::before {
          background: var(--teal);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(13,148,136,.7);
          content: "";
          height: .4rem;
          width: .4rem;
        }

        .news-title {
          font-size: clamp(2.7rem, 5.2vw, 5.7rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .83;
          margin: 1.1rem 0 0;
          text-transform: uppercase;
        }

        .news-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1px rgba(247,247,244,.72);
        }

        .news-title span em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .news-all-link {
          align-items: center;
          border: 1px solid rgba(13,148,136,.52);
          border-radius: 99px;
          color: var(--teal);
          display: inline-flex;
          font-size: .66rem;
          font-weight: 900;
          gap: .55rem;
          justify-content: center;
          letter-spacing: .13em;
          min-height: 3rem;
          padding: 0 1.25rem;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            border-color .2s ease,
            background .2s ease,
            color .2s ease,
            transform .2s ease;
          white-space: nowrap;
        }

        .news-all-link:hover {
          background: var(--teal);
          border-color: var(--teal);
          color: var(--ink);
          transform: translateY(-1px);
        }

        .news-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .news-card,
        .news-cta-card {
          background:
            linear-gradient(
              145deg,
              rgba(247,247,244,.052),
              rgba(247,247,244,.018) 56%,
              rgba(13,148,136,.035)
            );
          border: 1px solid rgba(247,247,244,.11);
          border-radius: 1.15rem;
          display: flex;
          flex-direction: column;
          min-height: 25rem;
          overflow: hidden;
          padding: 1.75rem;
          position: relative;
        }

        .news-card {
          color: inherit;
          text-decoration: none;
          transition:
            transform .28s cubic-bezier(.22,1,.36,1),
            border-color .28s ease,
            background .28s ease,
            box-shadow .28s ease;
        }

        .news-card::after {
          border: 1px solid rgba(13,148,136,.15);
          border-radius: 50%;
          content: "";
          height: 12rem;
          position: absolute;
          right: -5.5rem;
          top: -5.5rem;
          transition: transform .35s cubic-bezier(.22,1,.36,1);
          width: 12rem;
        }

        .news-card:hover {
          background:
            linear-gradient(
              145deg,
              rgba(247,247,244,.075),
              rgba(247,247,244,.025) 56%,
              rgba(13,148,136,.075)
            );
          border-color: rgba(13,148,136,.64);
          box-shadow:
            0 1.3rem 3rem rgba(0,0,0,.45),
            0 0 2rem rgba(13,148,136,.09);
          transform: translateY(-5px);
        }

        .news-card:hover::after {
          transform: scale(1.18);
        }

        .news-card-head {
          align-items: center;
          display: flex;
          gap: .8rem;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .news-tag {
          align-items: center;
          background: rgba(13,148,136,.09);
          border: 1px solid rgba(13,148,136,.38);
          border-radius: 99px;
          color: var(--teal);
          display: inline-flex;
          font-size: .55rem;
          font-weight: 900;
          letter-spacing: .12em;
          min-height: 1.45rem;
          padding: 0 .65rem;
          text-transform: uppercase;
        }

        .news-meta {
          color: rgba(247,247,244,.40);
          font-size: .61rem;
          font-weight: 700;
          letter-spacing: .03em;
          white-space: nowrap;
        }

        .news-card-title {
          color: var(--paper);
          font-size: clamp(1.4rem, 2.1vw, 1.85rem);
          font-weight: 900;
          letter-spacing: -.045em;
          line-height: .98;
          margin: 4.4rem 0 1rem;
          max-width: 15ch;
          position: relative;
          text-transform: uppercase;
          z-index: 1;
        }

        .news-card-text {
          color: var(--muted);
          font-size: .87rem;
          line-height: 1.72;
          margin: 0;
          max-width: 33ch;
          position: relative;
          z-index: 1;
        }

        .news-read {
          align-items: center;
          color: var(--teal);
          display: inline-flex;
          font-size: .66rem;
          font-weight: 900;
          gap: .45rem;
          letter-spacing: .13em;
          margin-top: auto;
          padding-top: 2rem;
          position: relative;
          text-transform: uppercase;
          z-index: 1;
        }

        .news-cta-card {
          background:
            radial-gradient(
              circle at 92% 8%,
              rgba(13,148,136,.22),
              transparent 38%
            ),
            linear-gradient(
              145deg,
              rgba(13,148,136,.13),
              rgba(8,8,8,.96) 74%
            );
          border-color: rgba(13,148,136,.55);
          justify-content: space-between;
        }

        .news-cta-card::before {
          border: 1px solid rgba(13,148,136,.20);
          border-radius: 50%;
          bottom: -7rem;
          content: "";
          height: 18rem;
          pointer-events: none;
          position: absolute;
          right: -7rem;
          width: 18rem;
        }

        .news-cta-title {
          font-size: clamp(1.75rem, 2.5vw, 2.3rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .92;
          margin: 1.15rem 0 1rem;
          max-width: 11ch;
          position: relative;
          text-transform: uppercase;
          z-index: 1;
        }

        .news-cta-text {
          color: rgba(247,247,244,.68);
          font-size: .88rem;
          line-height: 1.72;
          margin: 0;
          max-width: 30ch;
          position: relative;
          z-index: 1;
        }

        .news-cta-link {
          align-items: center;
          background: var(--teal);
          border: 1px solid var(--teal);
          border-radius: 99px;
          color: var(--ink);
          display: inline-flex;
          font-size: .68rem;
          font-weight: 900;
          gap: .55rem;
          justify-content: center;
          letter-spacing: .13em;
          margin-top: 2rem;
          min-height: 3.2rem;
          position: relative;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            background .2s ease,
            border-color .2s ease,
            transform .2s ease;
          width: 100%;
          z-index: 1;
        }

        .news-cta-link:hover {
          background: var(--teal-bright);
          border-color: var(--teal-bright);
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
          .news-section {
            padding: 4.5rem 0;
          }

          .news-shell {
            width: min(100% - 2.5rem, 1440px);
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
          .news-section {
            background:
              radial-gradient(
                ellipse 95% 42% at 100% 8%,
                rgba(13,148,136,.09),
                transparent 72%
              ),
              var(--ink);
            padding: 3.5rem 0 3.75rem;
          }

          .news-shell {
            width: min(100% - 2.25rem, 40rem);
          }

          .news-header {
            gap: 1.35rem;
            margin-bottom: 1.85rem;
          }

          .news-eyebrow,
          .news-kicker {
            font-size: .61rem;
            gap: .45rem;
            letter-spacing: .15em;
          }

          .news-eyebrow::before,
          .news-kicker::before {
            height: .34rem;
            width: .34rem;
          }

          .news-title {
            font-size: clamp(2.55rem, 12vw, 3.8rem);
            letter-spacing: -.07em;
            line-height: .86;
            margin-top: .9rem;
          }

          .news-title span {
            -webkit-text-stroke-width: 1px;
          }

          .news-all-link {
            box-sizing: border-box;
            font-size: .64rem;
            letter-spacing: .11em;
            min-height: 50px;
            padding: .85rem 1rem;
            width: 100%;
          }

          .news-grid {
            gap: .9rem;
            grid-template-columns: 1fr;
          }

          .news-card,
          .news-cta-card {
            border-radius: .9rem;
            min-height: 0;
            padding: 1.25rem;
          }

          .news-card::after {
            height: 8.5rem;
            right: -3.9rem;
            top: -3.9rem;
            width: 8.5rem;
          }

          .news-card-head {
            align-items: flex-start;
            gap: .5rem;
          }

          .news-tag {
            font-size: .48rem;
            letter-spacing: .1em;
            min-height: 1.55rem;
            padding: 0 .55rem;
          }

          .news-meta {
            font-size: .56rem;
            line-height: 1.3;
            max-width: 10.5ch;
            text-align: right;
            white-space: normal;
          }

          .news-card-title {
            font-size: clamp(1.45rem, 7vw, 1.9rem);
            line-height: 1;
            margin: 2.25rem 0 .85rem;
            max-width: 18ch;
          }

          .news-card-text {
            font-size: .9rem;
            line-height: 1.65;
            max-width: 35ch;
          }

          .news-read {
            font-size: .63rem;
            min-height: 44px;
            padding-top: 1.25rem;
          }

          .news-cta-card {
            background:
              radial-gradient(
                circle at 92% 6%,
                rgba(13,148,136,.22),
                transparent 38%
              ),
              linear-gradient(
                145deg,
                rgba(13,148,136,.13),
                rgba(8,8,8,.96) 74%
              );
            min-height: 19rem;
          }

          .news-cta-card::before {
            bottom: -5.5rem;
            height: 14rem;
            right: -5.5rem;
            width: 14rem;
          }

          .news-cta-title {
            font-size: clamp(1.75rem, 8.2vw, 2.2rem);
            line-height: .96;
            margin: 1rem 0 .85rem;
            max-width: 13ch;
          }

          .news-cta-text {
            font-size: .9rem;
            line-height: 1.65;
            max-width: 33ch;
          }

          .news-cta-link {
            font-size: .64rem;
            letter-spacing: .11em;
            margin-top: 1.45rem;
            min-height: 50px;
          }
        }

        @media (max-width: 360px) {
          .news-shell {
            width: min(100% - 2rem, 40rem);
          }

          .news-card,
          .news-cta-card {
            padding: 1.1rem;
          }

          .news-title {
            font-size: 2.4rem;
          }

          .news-card-title {
            font-size: 1.35rem;
          }

          .news-card-text,
          .news-cta-text {
            font-size: .86rem;
          }
        }
      `}</style>

      <div className="news-shell">
        <header className="news-header">
          <div>
            <div className="news-eyebrow">Stimmen &amp; Berichte</div>

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