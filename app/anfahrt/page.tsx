import Link from "next/link";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Polizei-Sportanlage%2C+Dampfschiffhaufen+2%2C+1220+Wien";

const directions = [
  {
    number: "01",
    title: "Mit den Öffis",
    text: "Mit der U1 bis Kaisermühlen – Vienna International Center (VIC). Von dort bringt dich der Bus 92A in Richtung Dampfschiffhaufen; von der Haltestelle ist es nur noch ein kurzer Fußweg zur Anlage.",
  },
  {
    number: "02",
    title: "Mit dem Fahrrad",
    text: "Die Anlage liegt direkt beim Kaiserwasser und ist über die Radwege entlang der Alten Donau gut erreichbar. Plane bei Spieltagen etwas Zeit für die Zufahrt ein.",
  },
  {
    number: "03",
    title: "Mit dem Auto",
    text: "Gib Dampfschiffhaufen 2, 1220 Wien in dein Navigationssystem ein. Bitte beachte bei Heimspielen die örtliche Parkplatzsituation und reise möglichst frühzeitig an.",
  },
];

export default function DirectionsPage() {
  return (
    <main
      className="directions-page"
      style={{
        background: "var(--mello-black, #080808)",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        minHeight: "100vh",
        paddingTop: "88px",
      }}
    >
      <style>{`
        .directions-page {
          --directions-ink: #080808;
          --directions-paper: #f7f7f4;
          --directions-teal: #0d9488;
          --directions-teal-bright: #14b8a6;
          --directions-line: rgba(247,247,244,.12);
          --directions-muted: rgba(247,247,244,.66);
        }

        .directions-page * {
          box-sizing: border-box;
        }

        .directions-shell {
          margin: 0 auto;
          width: min(100% - 6rem, 1440px);
        }

        .directions-hero {
          background:
            radial-gradient(
              ellipse 48% 105% at 95% 42%,
              rgba(13,148,136,.14),
              transparent 73%
            ),
            linear-gradient(118deg, #080808 0%, #080808 56%, #0a1311 100%);
          border-bottom: 1px solid var(--directions-line);
          overflow: hidden;
          padding: 4.6rem 0 4rem;
          position: relative;
        }

        .directions-hero::after {
          border: 1px solid rgba(13,148,136,.13);
          border-radius: 50%;
          bottom: -16rem;
          content: "";
          height: 36rem;
          pointer-events: none;
          position: absolute;
          right: -12rem;
          width: 36rem;
        }

        .directions-hero-inner {
          max-width: 70rem;
          position: relative;
          z-index: 1;
        }

        .directions-kicker {
          color: var(--directions-teal);
          font-family: Arial, Helvetica, sans-serif;
          font-size: .66rem;
          font-weight: 800;
          letter-spacing: .17em;
          margin: 0 0 .9rem;
          text-transform: uppercase;
        }

        .directions-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(3rem, 6vw, 6.6rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .84;
          margin: 0;
          max-width: 10ch;
          text-transform: uppercase;
        }

        .directions-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.2px rgba(247,247,244,.74);
        }

        .directions-title span em {
          color: var(--directions-teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .directions-lead {
          color: rgba(247,247,244,.74);
          font-size: clamp(1rem, 1.25vw, 1.15rem);
          line-height: 1.72;
          margin: 2rem 0 0;
          max-width: 57ch;
        }

        .directions-place-section {
          border-bottom: 1px solid var(--directions-line);
          padding: 4.5rem 0;
        }

        .directions-place-grid {
          align-items: center;
          display: grid;
          gap: clamp(2.5rem, 6vw, 7rem);
          grid-template-columns: minmax(0, 1.25fr) minmax(18rem, .75fr);
        }

        .directions-image-wrap {
          background: #101010;
          border: 1px solid rgba(13,148,136,.38);
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
        }

        .directions-image {
          display: block;
          filter: saturate(.86) contrast(1.04);
          height: clamp(18rem, 36vw, 31rem);
          object-fit: cover;
          opacity: .88;
          width: 100%;
        }

        .directions-image-wrap::after {
          background:
            linear-gradient(
              0deg,
              rgba(8,8,8,.72) 0%,
              transparent 52%
            ),
            linear-gradient(
              90deg,
              rgba(8,8,8,.18) 0%,
              rgba(13,148,136,.08) 100%
            );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .directions-image-label {
          bottom: 1.25rem;
          color: rgba(247,247,244,.72);
          font-family: Arial, Helvetica, sans-serif;
          font-size: .59rem;
          font-weight: 800;
          left: 1.3rem;
          letter-spacing: .12em;
          position: absolute;
          text-transform: uppercase;
          z-index: 1;
        }

        .directions-address-card {
          border-left: 2px solid var(--directions-teal);
          padding-left: 1.35rem;
        }

        .directions-address-label {
          color: var(--directions-teal);
          font-family: Arial, Helvetica, sans-serif;
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .75rem;
          text-transform: uppercase;
        }

        .directions-address-title {
          color: var(--directions-paper);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.7rem, 3.2vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .92;
          margin: 0;
          text-transform: uppercase;
        }

        .directions-address {
          color: rgba(247,247,244,.72);
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.6;
          margin: 1.1rem 0 1.55rem;
        }

        .directions-map-link {
          align-items: center;
          background: var(--directions-teal);
          border: 1px solid var(--directions-teal);
          border-radius: 99px;
          color: var(--directions-ink);
          display: inline-flex;
          font-family: Arial, Helvetica, sans-serif;
          font-size: .66rem;
          font-weight: 900;
          gap: .55rem;
          justify-content: center;
          letter-spacing: .13em;
          min-height: 3rem;
          padding: 0 1.2rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: background .2s ease, transform .2s ease;
        }

        .directions-map-link:hover {
          background: var(--directions-teal-bright);
          transform: translateY(-1px);
        }

        .directions-map-note {
          color: rgba(247,247,244,.45);
          font-size: .72rem;
          line-height: 1.55;
          margin: 1rem 0 0;
          max-width: 32ch;
        }

        .directions-routes-section {
          background: rgba(247,247,244,.012);
          border-bottom: 1px solid var(--directions-line);
          padding: 5rem 0;
        }

        .directions-section-heading {
          margin-bottom: 2.4rem;
          max-width: 46rem;
        }

        .directions-section-kicker {
          color: var(--directions-teal);
          font-family: Arial, Helvetica, sans-serif;
          font-size: .63rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .directions-section-title {
          color: var(--directions-paper);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2rem, 4vw, 3.8rem);
          font-weight: 900;
          letter-spacing: -.065em;
          line-height: .9;
          margin: 0;
          text-transform: uppercase;
        }

        .directions-section-title span {
          color: var(--directions-teal);
        }

        .directions-routes-grid {
          display: grid;
          gap: 1.1rem;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .directions-route {
          background:
            linear-gradient(
              145deg,
              rgba(247,247,244,.045),
              rgba(247,247,244,.014)
            );
          border: 1px solid rgba(247,247,244,.1);
          border-radius: .95rem;
          min-height: 15rem;
          padding: 1.35rem;
          position: relative;
        }

        .directions-route-number {
          color: rgba(13,148,136,.32);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 3.6rem;
          font-weight: 900;
          letter-spacing: -.08em;
          line-height: .75;
          margin-bottom: 2.5rem;
        }

        .directions-route-title {
          color: var(--directions-paper);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: -.04em;
          line-height: 1;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .directions-route-text {
          color: var(--directions-muted);
          font-size: .88rem;
          line-height: 1.68;
          margin: 0;
        }

        .directions-game-day {
          background:
            radial-gradient(
              ellipse 40% 100% at 100% 50%,
              rgba(13,148,136,.13),
              transparent 76%
            ),
            #090a0a;
          border-bottom: 1px solid var(--directions-line);
          padding: 4.7rem 0;
        }

        .directions-game-day-wrap {
          align-items: center;
          display: flex;
          gap: 2.5rem;
          justify-content: space-between;
        }

        .directions-game-day-content {
          max-width: 48rem;
        }

        .directions-game-day-title {
          color: var(--directions-paper);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .95;
          margin: 0 0 .85rem;
          text-transform: uppercase;
        }

        .directions-game-day-title span {
          color: var(--directions-teal);
        }

        .directions-game-day-copy {
          color: rgba(247,247,244,.68);
          font-size: .96rem;
          line-height: 1.7;
          margin: 0;
          max-width: 57ch;
        }

        .directions-contact-link {
          align-items: center;
          border: 1px solid rgba(247,247,244,.24);
          border-radius: 99px;
          color: var(--directions-paper);
          display: inline-flex;
          flex: 0 0 auto;
          font-family: Arial, Helvetica, sans-serif;
          font-size: .66rem;
          font-weight: 900;
          gap: .55rem;
          justify-content: center;
          letter-spacing: .12em;
          min-height: 3rem;
          padding: 0 1.2rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: border-color .2s ease, color .2s ease;
        }

        .directions-contact-link:hover {
          border-color: var(--directions-teal);
          color: var(--directions-teal);
        }

        @media (max-width: 900px) {
          .directions-shell {
            width: min(100% - 2.5rem, 1440px);
          }

          .directions-place-grid {
            grid-template-columns: 1fr;
          }

          .directions-address-card {
            max-width: 35rem;
          }

          .directions-routes-grid {
            grid-template-columns: 1fr;
          }

          .directions-route {
            min-height: auto;
          }

          .directions-route-number {
            margin-bottom: 1.7rem;
          }
        }

        @media (max-width: 620px) {
          .directions-page {
            padding-top: 68px !important;
          }

          .directions-shell {
            width: min(100% - 2.25rem, 40rem);
          }

          .directions-hero {
            padding: 2.55rem 0 2.85rem;
          }

          .directions-kicker {
            font-size: .61rem;
            letter-spacing: .16em;
            margin-bottom: .7rem;
          }

          .directions-title {
            font-size: clamp(2.7rem, 13vw, 3.9rem);
            letter-spacing: -.075em;
            line-height: .86;
            max-width: 9ch;
          }

          .directions-title span {
            -webkit-text-stroke-width: 1px;
          }

          .directions-lead {
            font-size: 1rem;
            line-height: 1.68;
            margin-top: 1.45rem;
            max-width: 35ch;
          }

          .directions-place-section {
            padding: 2.8rem 0 3.4rem;
          }

          .directions-place-grid {
            gap: 2rem;
          }

          .directions-image-wrap {
            border-radius: .9rem;
          }

          .directions-image {
            height: 15.5rem;
          }

          .directions-image-label {
            bottom: .9rem;
            font-size: .48rem;
            left: .95rem;
            letter-spacing: .1em;
          }

          .directions-address-card {
            padding-left: 1rem;
          }

          .directions-address-label {
            font-size: .55rem;
            letter-spacing: .14em;
            margin-bottom: .55rem;
          }

          .directions-address-title {
            font-size: clamp(1.75rem, 8.5vw, 2.45rem);
            line-height: .96;
          }

          .directions-address {
            font-size: .93rem;
            line-height: 1.55;
            margin: .8rem 0 1.25rem;
          }

          .directions-map-link {
            box-sizing: border-box;
            font-size: .62rem;
            min-height: 50px;
            padding: .85rem 1rem;
            width: 100%;
          }

          .directions-map-note {
            font-size: .68rem;
            margin-top: .8rem;
          }

          .directions-routes-section {
            padding: 3.75rem 0;
          }

          .directions-section-heading {
            margin-bottom: 1.55rem;
          }

          .directions-section-kicker {
            font-size: .55rem;
            letter-spacing: .14em;
            margin-bottom: .65rem;
          }

          .directions-section-title {
            font-size: clamp(1.9rem, 9vw, 2.7rem);
            line-height: .95;
          }

          .directions-routes-grid {
            gap: .8rem;
          }

          .directions-route {
            border-radius: .8rem;
            min-height: auto;
            padding: 1.05rem;
          }

          .directions-route-number {
            font-size: 2.6rem;
            margin-bottom: 1rem;
          }

          .directions-route-title {
            font-size: 1.18rem;
            margin-bottom: .55rem;
          }

          .directions-route-text {
            font-size: .87rem;
            line-height: 1.62;
          }

          .directions-game-day {
            padding: 3.75rem 0 calc(4rem + env(safe-area-inset-bottom));
          }

          .directions-game-day-wrap {
            align-items: stretch;
            display: block;
          }

          .directions-game-day-title {
            font-size: clamp(1.9rem, 9vw, 2.65rem);
            line-height: 1;
            margin-bottom: .75rem;
          }

          .directions-game-day-copy {
            font-size: .94rem;
            line-height: 1.65;
          }

          .directions-contact-link {
            box-sizing: border-box;
            font-size: .62rem;
            margin-top: 1.45rem;
            min-height: 50px;
            padding: .85rem 1rem;
            width: 100%;
          }
        }

        @media (max-width: 360px) {
          .directions-shell {
            width: min(100% - 2rem, 40rem);
          }

          .directions-title {
            font-size: 2.5rem;
          }

          .directions-image {
            height: 14rem;
          }

          .directions-route-text {
            font-size: .83rem;
          }
        }
      `}</style>

      <section className="directions-hero">
        <div className="directions-shell directions-hero-inner">
          <p className="directions-kicker">Heimstätte FC Mello Wien</p>

          <h1 className="directions-title">
            Anfahrt
            <span>
              &amp; <em>Platz.</em>
            </span>
          </h1>

          <p className="directions-lead">
            Unsere Heimspiele und Teile des Trainings finden auf der
            Polizei-Sportanlage direkt am Kaiserwasser statt. Hier findest du
            Adresse, Route und die wichtigsten Hinweise für deinen Besuch.
          </p>
        </div>
      </section>

      <section className="directions-place-section">
        <div className="directions-shell directions-place-grid">
          <figure className="directions-image-wrap">
            <img
              className="directions-image"
              src="/Polizeisportanlage.jpg"
              alt="Polizei-Sportanlage am Kaiserwasser in Wien"
            />

            <figcaption className="directions-image-label">
              Unsere Heimstätte am Kaiserwasser
            </figcaption>
          </figure>

          <div className="directions-address-card">
            <p className="directions-address-label">Adresse</p>

            <h2 className="directions-address-title">
              Polizei-
              <br />
              Sportanlage.
            </h2>

            <p className="directions-address">
              Dampfschiffhaufen 2
              <br />
              1220 Wien
            </p>

            <a
              className="directions-map-link"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Route in Google Maps <span aria-hidden="true">↗</span>
            </a>

            <p className="directions-map-note">
              Der Routenlink öffnet Google Maps in einem neuen Tab.
            </p>
          </div>
        </div>
      </section>

      <section className="directions-routes-section">
        <div className="directions-shell">
          <div className="directions-section-heading">
            <p className="directions-section-kicker">So kommst du zu uns</p>

            <h2 className="directions-section-title">
              Direkt zum <span>Kaiserwasser.</span>
            </h2>
          </div>

          <div className="directions-routes-grid">
            {directions.map((direction) => (
              <article className="directions-route" key={direction.number}>
                <div className="directions-route-number">{direction.number}</div>

                <h3 className="directions-route-title">{direction.title}</h3>

                <p className="directions-route-text">{direction.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="directions-game-day">
        <div className="directions-shell directions-game-day-wrap">
          <div className="directions-game-day-content">
            <h2 className="directions-game-day-title">
              Rechtzeitig da. <span>Gemeinsam laut.</span>
            </h2>

            <p className="directions-game-day-copy">
              Komm bei Heimspielen bitte rechtzeitig zur Anlage. Hinweise zu
              Anpfiff, Treffpunkt und möglichen Änderungen findest du jeweils
              im Spielplan und in unseren News.
            </p>
          </div>

          <Link className="directions-contact-link" href="/spielplan">
            Zum Spielplan <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}