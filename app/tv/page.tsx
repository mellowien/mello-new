"use client";

const HIGHLIGHTS = [
  {
    number: "01",
    title: "Spielclips",
    text: "Tore, Szenen und alles, was am Platz bleibt.",
  },
  {
    number: "02",
    title: "Events",
    text: "Momente rund um Mello – auch abseits des Spielfelds.",
  },
  {
    number: "03",
    title: "Interviews",
    text: "Die Menschen, Stimmen und Geschichten hinter dem Verein.",
  },
  {
    number: "04",
    title: "Behind the Scenes",
    text: "Einblicke in den Aufbau von FC Mello Wien.",
  },
];

export default function MelloTVPage() {
  return (
    <main className="mello-tv">
      <style>{`
        .mello-tv {
          --ink: #080808;
          --paper: #f7f7f4;
          --teal: #0d9488;
          --teal-bright: #14b8a6;
          --line: rgba(247, 247, 244, .12);
          --muted: rgba(247, 247, 244, .60);
          min-height: 100vh;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          padding-top: 88px;
        }

        .mello-tv * {
          box-sizing: border-box;
        }

        .tv-shell {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        .tv-hero {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          padding: 4.7rem 0 4.3rem;
          background:
            radial-gradient(ellipse 43% 120% at 94% 48%, rgba(13, 148, 136, .15), transparent 74%),
            linear-gradient(115deg, #080808 0%, #080808 56%, #0a1211 100%);
        }

        .tv-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
        }

        .tv-eyebrow,
        .tv-kicker {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: var(--teal);
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .tv-eyebrow::before,
        .tv-kicker::before {
          content: "";
          width: .4rem;
          height: .4rem;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 10px rgba(13, 148, 136, .7);
        }

        .tv-title {
          margin: 1.25rem 0 1.35rem;
          font-size: clamp(3.8rem, 7.5vw, 7.7rem);
          font-weight: 900;
          letter-spacing: -.08em;
          line-height: .81;
          text-transform: uppercase;
        }

        .tv-title span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1.25px rgba(247, 247, 244, .76);
        }

        .tv-title span em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .tv-intro {
          max-width: 57ch;
          margin: 0;
          color: rgba(247, 247, 244, .72);
          font-size: clamp(1rem, 1.25vw, 1.12rem);
          line-height: 1.72;
        }

        .tv-stream-section {
          padding: 4.6rem 0 5.5rem;
        }

        .tv-stream-topline {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.35rem;
        }

        .tv-stream-title {
          margin: .85rem 0 0;
          font-size: clamp(1.45rem, 2.2vw, 2rem);
          font-weight: 900;
          letter-spacing: -.04em;
          line-height: 1;
          text-transform: uppercase;
        }

        .tv-status {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          margin-bottom: .1rem;
          color: rgba(247, 247, 244, .55);
          font-size: .64rem;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .tv-status-dot {
          width: .45rem;
          height: .45rem;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 12px rgba(13, 148, 136, .8);
        }

        .tv-frame {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 1px solid rgba(13, 148, 136, .52);
          border-radius: 1.15rem;
          background: #000;
          box-shadow:
            0 1.5rem 4.4rem rgba(0, 0, 0, .55),
            0 0 3rem rgba(13, 148, 136, .13);
        }

        .tv-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          border: 1px solid rgba(247, 247, 244, .04);
          border-radius: inherit;
        }

        .tv-frame iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .tv-bottom {
          border-top: 1px solid var(--line);
          padding: 6rem 0;
          background:
            radial-gradient(ellipse 46% 85% at 100% 52%, rgba(13, 148, 136, .10), transparent 74%);
        }

        .tv-bottom-layout {
          display: grid;
          grid-template-columns: minmax(0, .86fr) minmax(0, 1.14fr);
          gap: clamp(2.5rem, 7vw, 8rem);
          align-items: start;
        }

        .tv-bottom-title {
          max-width: 9ch;
          margin: 1.1rem 0 1.45rem;
          font-size: clamp(2.5rem, 5vw, 5.4rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .82;
          text-transform: uppercase;
        }

        .tv-bottom-title span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1px rgba(247, 247, 244, .72);
        }

        .tv-bottom-title span em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .tv-bottom-text {
          max-width: 39ch;
          margin: 0;
          color: var(--muted);
          font-size: .98rem;
          line-height: 1.8;
        }

        .tv-highlight-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .tv-highlight-card {
          position: relative;
          min-height: 14.5rem;
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .11);
          border-radius: 1.15rem;
          padding: 1.65rem;
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .052),
              rgba(247, 247, 244, .018) 56%,
              rgba(13, 148, 136, .035)
            );
          transition:
            transform .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;
        }

        .tv-highlight-card::after {
          content: "";
          position: absolute;
          right: -4.4rem;
          top: -4.4rem;
          width: 10rem;
          height: 10rem;
          border: 1px solid rgba(13, 148, 136, .14);
          border-radius: 50%;
          transition: transform .3s ease;
        }

        .tv-highlight-card:hover {
          transform: translateY(-4px);
          border-color: rgba(13, 148, 136, .6);
          box-shadow: 0 1rem 2.4rem rgba(0, 0, 0, .35);
        }

        .tv-highlight-card:hover::after {
          transform: scale(1.18);
        }

        .tv-highlight-number {
          color: var(--teal);
          font-size: .66rem;
          font-weight: 800;
          letter-spacing: .15em;
        }

        .tv-highlight-label {
          position: absolute;
          right: 1.55rem;
          top: 1.55rem;
          color: rgba(247, 247, 244, .32);
          font-size: .6rem;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .tv-highlight-title {
          position: relative;
          z-index: 1;
          max-width: 11ch;
          margin: 4.5rem 0 1rem;
          font-size: clamp(1.25rem, 1.8vw, 1.65rem);
          font-weight: 900;
          letter-spacing: -.035em;
          line-height: .97;
          text-transform: uppercase;
        }

        .tv-highlight-text {
          position: relative;
          z-index: 1;
          max-width: 28ch;
          margin: 0;
          color: rgba(247, 247, 244, .55);
          font-size: .84rem;
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .tv-shell {
            width: min(100% - 2.5rem, 1440px);
          }

          .tv-stream-section {
            padding: 3.7rem 0 4.4rem;
          }

          .tv-bottom {
            padding: 4.5rem 0;
          }

          .tv-bottom-layout {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }

          .tv-bottom-title {
            max-width: 12ch;
          }
        }

        @media (max-width: 600px) {
          .tv-hero {
            padding: 3.6rem 0 3.25rem;
          }

          .tv-title {
            font-size: clamp(3.35rem, 16vw, 5rem);
          }

          .tv-stream-topline {
            align-items: start;
            flex-direction: column;
            gap: 1rem;
          }

          .tv-frame,
          .tv-highlight-card {
            border-radius: .9rem;
          }

          .tv-highlight-grid {
            grid-template-columns: 1fr;
          }

          .tv-highlight-card {
            min-height: 12.5rem;
          }

          .tv-highlight-title {
            margin-top: 3.5rem;
          }
        }
      `}</style>

      <section className="tv-hero">
        <div className="tv-shell tv-hero-inner">
          <div className="tv-eyebrow">FC Mello Wien · Mello TV</div>

          <h1 className="tv-title">
            Mello
            <span>
              <em>TV.</em>
            </span>
          </h1>

          <p className="tv-intro">
            Livestreams, Spielmomente und Einblicke in alles, was Mello
            ausmacht. Direkt vom Platz und aus dem Verein.
          </p>
        </div>
      </section>

      <section className="tv-shell tv-stream-section">
        <div className="tv-stream-topline">
          <div>
            <div className="tv-kicker">Live aus Wien</div>
            <h2 className="tv-stream-title">Der Mello Stream</h2>
          </div>

          <div className="tv-status">
            <span className="tv-status-dot" />
            Twitch · mellowien
          </div>
        </div>

        <div className="tv-frame">
          <iframe
            src="https://player.twitch.tv/?channel=mellowien&parent=mellowien.at&parent=www.mellowien.at&parent=localhost&parent=127.0.0.1"
            title="Mello TV Twitch Stream"
            allowFullScreen
          />
        </div>
      </section>

      <section className="tv-bottom">
        <div className="tv-shell tv-bottom-layout">
          <div>
            <div className="tv-kicker">Mello in Bewegung</div>

            <h2 className="tv-bottom-title">
              Mehr als
              <span>
                <em>90 Minuten.</em>
              </span>
            </h2>

            <p className="tv-bottom-text">
              Hier entstehen nach und nach Clips, Highlights und Geschichten
              aus Spielen, Events und unserem Vereinsalltag. Mello TV hält fest,
              was man sonst vielleicht verpasst.
            </p>
          </div>

          <div className="tv-highlight-grid">
            {HIGHLIGHTS.map((highlight) => (
              <article className="tv-highlight-card" key={highlight.number}>
                <div className="tv-highlight-number">{highlight.number}</div>
                <div className="tv-highlight-label">Bald verfügbar</div>
                <h3 className="tv-highlight-title">{highlight.title}</h3>
                <p className="tv-highlight-text">{highlight.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}