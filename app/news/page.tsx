import Image from "next/image";
import Link from "next/link";

const STORIES = [
  {
    id: "auftakt",
    category: "Vorbericht",
    date: "06. September 2026",
    readTime: "3 Min. Lesezeit",
    title: "Der Countdown läuft: Auftakt.",
    excerpt:
      "Am Sonntag startet FC Mello Wien in die neue Saison. Gegen FC Polska wartet zum Auftakt in der 1. Klasse A die erste echte Standortbestimmung.",
    href: "/news/auftakt",
    featured: true,
    image: null,
  },
  {
    id: "training",
    category: "Trainingsbericht · Interview",
    date: "Diese Woche",
    readTime: "4 Min. Lesezeit",
    title: "Zwei Monate. Ein Team. Jetzt zählt’s.",
    excerpt:
      "Daniel Rezai blickt auf eine Vorbereitung zwischen Hitze, Gewittern, Kilometern und einer Mannschaft zurück, die in kurzer Zeit zusammengewachsen ist.",
    href: "/news/training",
    featured: false,
    image: "/Polizeisportanlage.jpg",
  },
];

export default function NewsPage() {
  const featuredStory = STORIES.find((story) => story.featured);
  const remainingStories = STORIES.filter((story) => !story.featured);

  return (
    <main className="mello-news-page">
      <style>{`
        .mello-news-page {
          --ink: #080808;
          --paper: #f7f7f4;
          --teal: #0d9488;
          --teal-bright: #14b8a6;
          --line: rgba(247, 247, 244, .12);
          --muted: rgba(247, 247, 244, .64);
          min-height: 100vh;
          overflow: hidden;
          background: var(--ink);
          color: var(--paper);
          font-family: Arial, Helvetica, sans-serif;
          padding-top: 88px;
        }

        .mello-news-page * {
          box-sizing: border-box;
        }

        .news-page-shell {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        .news-page-hero {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          padding: 4.8rem 0 5.1rem;
          background:
            radial-gradient(
              ellipse 50% 128% at 96% 42%,
              rgba(13, 148, 136, .17),
              transparent 74%
            ),
            linear-gradient(116deg, #080808 0%, #080808 55%, #091311 100%);
        }

        .news-page-hero::after {
          content: "";
          position: absolute;
          right: -13rem;
          bottom: -18rem;
          width: 44rem;
          height: 44rem;
          border: 1px solid rgba(13, 148, 136, .14);
          border-radius: 50%;
          box-shadow:
            0 0 0 3.5rem rgba(13, 148, 136, .025),
            0 0 0 7rem rgba(13, 148, 136, .015);
          pointer-events: none;
        }

        .news-page-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1050px;
        }

        .news-page-back {
          display: inline-flex;
          align-items: center;
          min-height: 2.6rem;
          gap: .55rem;
          border: 1px solid rgba(247, 247, 244, .16);
          border-radius: 999px;
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

        .news-page-back:hover {
          border-color: rgba(13, 148, 136, .7);
          background: rgba(13, 148, 136, .08);
          color: var(--teal);
        }

        .news-page-eyebrow {
          display: flex;
          align-items: center;
          gap: .65rem;
          margin: 2rem 0 1.55rem;
          color: var(--teal);
          font-size: .67rem;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .news-page-eyebrow::before {
          content: "";
          width: .42rem;
          height: .42rem;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 11px rgba(13, 148, 136, .78);
        }

        .news-page-title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: .14em;
          margin: 0;
          font-size: clamp(3.5rem, 8vw, 8.4rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .84;
          text-transform: uppercase;
        }

        .news-page-title span {
          display: block;
          line-height: .84;
        }

        .news-page-title .news-title-solid {
          color: var(--paper);
        }

        .news-page-title .news-title-outline {
          color: transparent;
          -webkit-text-stroke: 1.3px rgba(247, 247, 244, .75);
        }

        .news-page-title em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .news-page-lead {
          max-width: 60ch;
          margin: 2.3rem 0 0;
          color: rgba(247, 247, 244, .74);
          font-size: clamp(1rem, 1.35vw, 1.16rem);
          line-height: 1.78;
        }

        .news-page-main {
          padding: 5.8rem 0 6.4rem;
        }

        .section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.15rem;
        }

        .section-kicker {
          margin: 0 0 .7rem;
          color: var(--teal);
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .section-title {
          margin: 0;
          color: var(--paper);
          font-size: clamp(1.9rem, 3.5vw, 3.6rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .88;
          text-transform: uppercase;
        }

        .section-title span {
          color: var(--teal);
        }

        .section-description {
          max-width: 42ch;
          margin: 0;
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.66;
        }

        .featured-story {
          position: relative;
          display: block;
          min-height: 31rem;
          overflow: hidden;
          border: 1px solid rgba(13, 148, 136, .56);
          border-radius: 1.2rem;
          background:
            radial-gradient(
              ellipse 50% 120% at 100% 50%,
              rgba(13, 148, 136, .20),
              transparent 75%
            ),
            linear-gradient(136deg, #111 0%, #090b0b 68%, #0a1614 100%);
          color: inherit;
          text-decoration: none;
          transition:
            border-color .25s ease,
            transform .25s ease,
            box-shadow .25s ease;
        }

        .featured-story:hover {
          border-color: var(--teal-bright);
          box-shadow:
            0 1.5rem 3.8rem rgba(0, 0, 0, .42),
            0 0 2.2rem rgba(13, 148, 136, .11);
          transform: translateY(-4px);
        }

        .featured-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 31rem;
          padding: clamp(1.7rem, 4vw, 3.2rem);
        }

        .story-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: .65rem 1rem;
          color: rgba(247, 247, 244, .50);
          font-size: .62rem;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .story-category {
          display: inline-flex;
          align-items: center;
          min-height: 1.5rem;
          border: 1px solid rgba(13, 148, 136, .42);
          border-radius: 999px;
          padding: 0 .7rem;
          background: rgba(13, 148, 136, .10);
          color: var(--teal);
          font-size: .56rem;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .featured-title {
          max-width: 10ch;
          margin: 3.5rem 0 1.15rem;
          color: var(--paper);
          font-size: clamp(2.25rem, 4.5vw, 5.1rem);
          font-weight: 900;
          letter-spacing: -.085em;
          line-height: .84;
          text-transform: uppercase;
        }

        .featured-title span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1px rgba(247, 247, 244, .72);
        }

        .featured-excerpt {
          max-width: 47ch;
          margin: 0;
          color: var(--muted);
          font-size: .95rem;
          line-height: 1.72;
        }

        .story-read {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          margin-top: 2rem;
          color: var(--teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
          margin-top: 1.25rem;
        }

        .story-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 27rem;
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .11);
          border-radius: 1.1rem;
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .05),
              rgba(247, 247, 244, .015) 57%,
              rgba(13, 148, 136, .035)
            );
          color: inherit;
          text-decoration: none;
          transition:
            transform .26s cubic-bezier(.22, 1, .36, 1),
            border-color .26s ease,
            background .26s ease,
            box-shadow .26s ease;
        }

        .story-card:hover {
          border-color: rgba(13, 148, 136, .65);
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .075),
              rgba(247, 247, 244, .022) 57%,
              rgba(13, 148, 136, .075)
            );
          box-shadow:
            0 1.25rem 3rem rgba(0, 0, 0, .40),
            0 0 2rem rgba(13, 148, 136, .08);
          transform: translateY(-4px);
        }

        .story-card-image {
          position: relative;
          height: 14rem;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          background: #111;
        }

        .story-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .78;
          filter: saturate(.82) contrast(1.05);
          transition: transform .45s cubic-bezier(.22, 1, .36, 1);
        }

        .story-card:hover .story-card-image img {
          transform: scale(1.055);
        }

        .story-card-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(0deg, rgba(8, 8, 8, .67), transparent 60%),
            linear-gradient(90deg, rgba(8, 8, 8, .34), rgba(13, 148, 136, .10));
          pointer-events: none;
        }

        .story-card-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 1.6rem;
        }

        .story-card-title {
          max-width: 15ch;
          margin: 3.3rem 0 1rem;
          color: var(--paper);
          font-size: clamp(1.55rem, 2.5vw, 2.35rem);
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: .91;
          text-transform: uppercase;
        }

        .story-card-excerpt {
          max-width: 38ch;
          margin: 0;
          color: var(--muted);
          font-size: .88rem;
          line-height: 1.7;
        }

        .story-card .story-read {
          margin-top: auto;
          padding-top: 1.8rem;
        }

        .tv-note {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          margin-top: 5rem;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 2.6rem 0;
        }

        .tv-note p {
          max-width: 52ch;
          margin: 0;
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.65;
        }

        .tv-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          gap: .6rem;
          flex: 0 0 auto;
          border: 1px solid rgba(13, 148, 136, .52);
          border-radius: 999px;
          padding: 0 1.2rem;
          color: var(--teal);
          font-size: .65rem;
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

        .tv-link:hover {
          border-color: var(--teal);
          background: var(--teal);
          color: var(--ink);
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .news-page-shell {
            width: min(100% - 2.5rem, 1440px);
          }

          .news-page-hero {
            padding: 4rem 0 4.2rem;
          }

          .section-heading,
          .tv-note {
            align-items: flex-start;
            flex-direction: column;
          }

          .section-description {
            max-width: 55ch;
          }
        }

        @media (max-width: 620px) {
          .mello-news-page {
            padding-top: 72px;
          }

          .news-page-shell {
            width: min(100% - 2rem, 1440px);
          }

          .news-page-title {
            gap: .16em;
            font-size: clamp(3.2rem, 15vw, 5.1rem);
            line-height: .86;
          }

          .news-page-title span {
            line-height: .86;
          }

          .news-page-main {
            padding: 4.4rem 0 5rem;
          }

          .stories-grid {
            grid-template-columns: 1fr;
          }

          .featured-story,
          .story-card {
            border-radius: .9rem;
          }

          .featured-story,
          .featured-content {
            min-height: 28rem;
          }

          .featured-content {
            padding: 1.45rem;
          }

          .featured-title {
            margin-top: 3.3rem;
          }

          .story-card-image {
            height: 12.5rem;
          }

          .story-card-content {
            padding: 1.45rem;
          }

          .story-card-title {
            margin-top: 2.7rem;
          }

          .tv-note {
            gap: 1.4rem;
            margin-top: 3.6rem;
          }

          .tv-link {
            width: 100%;
          }
        }
      `}</style>

      <section className="news-page-hero">
        <div className="news-page-shell news-page-hero-inner">
          <Link className="news-page-back" href="/">
            <span aria-hidden="true">←</span> Zur Startseite
          </Link>

          <p className="news-page-eyebrow">FC Mello Wien · Aktuell</p>

          <h1 className="news-page-title">
            <span className="news-title-solid">Stimmen &amp;</span>
            <span className="news-title-outline">
              <em>Berichte.</em>
            </span>
          </h1>

          <p className="news-page-lead">
            Berichte, Interviews und Stimmen aus und rund um FC Mello Wien.
            Was die Mannschaft bewegt, wie der Verein wächst und was auf dem
            Platz passiert — gesammelt an einem Ort.
          </p>
        </div>
      </section>

      <section className="news-page-shell news-page-main">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Neu bei Mello</p>

            <h2 className="section-title">
              Aktuelle <span>Artikel.</span>
            </h2>
          </div>

          <p className="section-description">
            Jeder Bericht erzählt ein Stück Mello: von der Mannschaft, den
            Menschen im Verein und dem Weg durch die Saison.
          </p>
        </div>

        {featuredStory && (
          <Link className="featured-story" href={featuredStory.href}>
            <div className="featured-content">
              <div className="story-meta">
                <span className="story-category">{featuredStory.category}</span>
                <span>
                  {featuredStory.date} · {featuredStory.readTime}
                </span>
              </div>

              <div>
                <h3 className="featured-title">
                  Der Countdown
                  <span>läuft: Auftakt.</span>
                </h3>

                <p className="featured-excerpt">{featuredStory.excerpt}</p>
              </div>

              <div className="story-read">
                Bericht lesen <span aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        )}

        <div className="stories-grid">
          {remainingStories.map((story) => (
            <Link className="story-card" href={story.href} key={story.id}>
              {story.image && (
                <div className="story-card-image">
                  <Image
                    src={story.image}
                    alt="Polizeisportanlage am Dampfschiffhaufen in Wien"
                    width={1000}
                    height={600}
                  />
                </div>
              )}

              <div className="story-card-content">
                <div className="story-meta">
                  <span className="story-category">{story.category}</span>
                  <span>
                    {story.date} · {story.readTime}
                  </span>
                </div>

                <h3 className="story-card-title">{story.title}</h3>

                <p className="story-card-excerpt">{story.excerpt}</p>

                <div className="story-read">
                  Interview lesen <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="tv-note">
          <p>
            Mello TV bleibt der Ort für Videos, Highlights und bewegte Bilder.
            Hier sammeln wir Berichte, Interviews und Stimmen aus dem
            Vereinsalltag.
          </p>

          <Link className="tv-link" href="/tv">
            Zu Mello TV <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}