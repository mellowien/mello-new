import Link from "next/link";
import LogoHero from "@/components/LogoHero";
import Countdown from "@/components/Countdown";
import ConvergingText from "@/components/ConvergingText";
import NewsSection from "@/components/NewsSection";

const SKYLINE_PATH = `M3116 3019 c-33 -39 -34 -88 -3 -124 l22 -27 -17 -116 c-10 -65 -33
-234 -53 -377 -19 -143 -39 -289 -44 -325 -5 -36 -17 -152 -27 -258 -17 -189
-18 -192 -30 -145 -7 26 -23 102 -34 168 -12 66 -25 130 -30 143 -12 29 -36
28 -44 -1 -14 -58 -47 -366 -52 -487 -2 -74 -7 -163 -10 -197 l-6 -63 -433 0
-434 0 -18 -24 c-10 -12 -45 -71 -78 -129 l-60 -107 -80 -31 c-44 -18 -97 -41
-117 -51 l-38 -18 0 560 0 560 -70 0 -70 0 0 85 0 85 -330 0 -330 0 0 -85 0
-85 -70 0 -70 0 0 -695 0 -695 -100 0 -100 0 0 200 0 200 -195 0 -195 0 0
-490 0 -490 2335 0 2335 0 0 195 0 195 -185 0 -185 0 0 -125 0 -125 -85 0 -85
0 0 238 c-1 252 1 240 -70 616 -22 117 -38 180 -48 183 -28 11 -24 27 -101
-387 -19 -99 -32 -145 -40 -145 -8 0 -42 45 -78 100 -35 55 -96 150 -136 210
l-72 110 3 238 c3 259 -6 385 -38 523 -25 108 -38 144 -55 144 -18 0 -21 -11
-46 -167 -12 -76 -24 -140 -26 -142 -12 -16 -21 46 -58 394 -14 132 -28 247
-30 255 -2 8 -20 123 -40 255 -20 132 -40 254 -46 272 -8 25 -6 37 11 65 47
77 6 148 -85 148 -25 0 -40 -8 -59 -31z`;

const font = "Arial, Helvetica, sans-serif";

const outlineStyle = {
  display: "block",
  color: "transparent",
  WebkitTextStroke: "1.4px rgba(247,247,244,.72)",
  paintOrder: "stroke fill" as const,
};

export default function Home() {
  return (
    <main
      style={{
        background: "#080808",
        color: "#f7f7f4",
        fontFamily: font,
      }}
    >
      <style>{`
        .wwp-statement {
          --mello-black: #080808;
          --mello-line: #222222;
        }

        .home-page-offset {
          margin-top: 90px;
        }

        .hero-section {
          align-items: center;
          display: grid;
          gap: 4rem;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100dvh - 390px);
          overflow: hidden;
          padding: 1.5rem 3rem 2rem;
          position: relative;
        }

        .hero-copy {
          position: relative;
          z-index: 1;
        }

        .hero-eyebrow {
          color: #0d9488;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(1rem, 1.55vw, 1.35rem);
          font-weight: 700;
          letter-spacing: .11em;
          margin-bottom: 1.2rem;
          text-transform: uppercase;
        }

        .hero-title {
          color: #f7f7f4;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(3.5rem, 7vw, 7rem);
          font-weight: 700;
          letter-spacing: -.065em;
          line-height: .84;
          margin: 0 0 1.8rem;
          text-transform: uppercase;
        }

        .hero-title-small {
          display: block;
          font-size: .69em;
        }

        .hero-title-outline {
          display: block;
          color: transparent;
          font-size: .69em;
          white-space: nowrap;
          -webkit-text-stroke: 1.4px rgba(247,247,244,.72);
          paint-order: stroke fill;
        }

        .hero-description {
          color: #888888;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 38ch;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .hero-action {
          display: inline-block;
          font-family: Arial, Helvetica, sans-serif;
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: .1em;
          padding: .95rem 2rem;
          text-decoration: none;
          text-transform: uppercase;
        }

        .hero-action-primary {
          background: #0d9488;
          color: #ffffff;
        }

        .hero-action-secondary {
          border: 1px solid rgba(13,148,136,.5);
          color: #0d9488;
        }

        @media (max-width: 768px) {
          .home-page-offset {
            margin-top: 72px !important;
          }

          .hero-section {
            display: block !important;
            min-height: 0 !important;
            padding: 2.25rem 1.25rem 2.5rem !important;
          }

          .hero-logohero {
            display: none !important;
          }

          .hero-copy {
            max-width: none !important;
          }

          .hero-eyebrow {
            font-size: .67rem !important;
            letter-spacing: .16em !important;
            margin-bottom: 1rem !important;
          }

          .hero-title {
            font-size: clamp(2.8rem, 14vw, 4.25rem) !important;
            letter-spacing: -.07em !important;
            line-height: .86 !important;
            margin-bottom: 1.35rem !important;
          }

          .hero-title-small,
          .hero-title-outline {
            font-size: .72em !important;
          }

          .hero-title-outline {
            white-space: normal !important;
            -webkit-text-stroke: 1px rgba(247,247,244,.72) !important;
          }

          .hero-description {
            color: rgba(247,247,244,.62) !important;
            font-size: .97rem !important;
            line-height: 1.65 !important;
            margin-bottom: 1.75rem !important;
            max-width: 34ch !important;
          }

          .hero-actions {
            align-items: stretch !important;
            flex-direction: column !important;
            gap: .75rem !important;
            width: 100% !important;
          }

          .hero-action {
            box-sizing: border-box !important;
            min-height: 50px !important;
            padding: 1rem 1.15rem !important;
            text-align: center !important;
            width: 100% !important;
          }

          .hero-section svg {
            bottom: -2.5rem !important;
            height: 45% !important;
            left: auto !important;
            opacity: .1 !important;
            right: -45% !important;
            width: 150% !important;
          }
        }

        @media (max-width: 380px) {
          .hero-section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .hero-title {
            font-size: 2.65rem !important;
          }

          .hero-action {
            font-size: .68rem !important;
          }
        }
      `}</style>

      <div className="home-page-offset">
        <section className="hero-section">
          <div
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 70% 40%, rgba(13,148,136,.08) 0%, transparent 70%)",
              inset: 0,
              pointerEvents: "none",
              position: "absolute",
            }}
          />

          <svg
            viewBox="0 9880 470 360"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden
            style={{
              bottom: 0,
              height: "80%",
              left: 0,
              opacity: 0.15,
              pointerEvents: "none",
              position: "absolute",
              width: "100%",
              zIndex: 0,
            }}
          >
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="1" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            <g transform="translate(0,10240) scale(0.1,-0.1)">
              <path d={SKYLINE_PATH} fill="url(#skyGrad)" />
              <path
                d={SKYLINE_PATH}
                fill="none"
                stroke="#0d9488"
                strokeWidth="15"
              />
            </g>
          </svg>

          <div className="hero-copy">
            <div className="hero-eyebrow">Wir sind Mello</div>

            <h1 className="hero-title">
              <span className="hero-title-small">Mehr als</span>

              <span
                className="hero-title-outline"
                style={outlineStyle}
              >
                nur Fußball
              </span>
            </h1>

            <p className="hero-description">
              Mello verbindet sportlichen Anspruch mit echter Gemeinschaft. Ein
              Verein für Menschen, die Verantwortung übernehmen,
              zusammenhalten und das Spiel gemeinsam leben.
            </p>

            <div className="hero-actions">
              <Link
                href="/mitgliedschaft"
                className="hero-action hero-action-primary"
              >
                Jetzt Mitglied werden
              </Link>

              <Link
                href="/ueber-uns"
                className="hero-action hero-action-secondary"
              >
                Mehr über uns
              </Link>
            </div>
          </div>

          <div className="hero-logohero">
            <LogoHero />
          </div>
        </section>

        <Countdown />
      </div>

      <ConvergingText />
      <NewsSection />
    </main>
  );
}