import Link from "next/link";
import LogoHero from "@/components/LogoHero";
import Countdown from "@/components/Countdown";

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

export default function Home() {
  return (
    <main style={{ background: "#080808", color: "#f5f5f5", fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            gap: 0 !important;
          }
          .hero-logohero { display: none !important; }
          .manifesto-section {
            grid-template-columns: 1fr !important;
            padding: 4rem 1.5rem !important;
            gap: 2rem !important;
          }
        }
      `}</style>

      {/* Outer wrapper */}
      <div style={{
        marginTop: "96px",
        minHeight: "calc(100dvh - 96px)",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── HERO ── */}
        <section className="hero-section" style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          paddingLeft: "3rem",
          paddingRight: "3rem",
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          gap: "4rem",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Teal glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 80% at 70% 40%, rgba(13,148,136,.08) 0%, transparent 70%)",
          }} />

          {/* Skyline — full width, bottom-anchored */}
          <svg
            viewBox="0 9880 470 360"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0, left: 0,
              width: "100%", height: "80%",
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.15,
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
              <path d={SKYLINE_PATH} fill="none" stroke="#0d9488" strokeWidth="15" />
            </g>
          </svg>

          {/* Left content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
              letterSpacing: ".1em",
              color: "#0d9488",
              marginBottom: ".4rem",
            }}>
              Wir sind Mello
            </div>

            <h1 style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(3.5rem, 7vw, 7rem)",
              lineHeight: .95, letterSpacing: ".02em",
              color: "#f5f5f5", marginBottom: "1.8rem",
            }}>
              Der Verein<br />
              <span style={{ color: "#0d9488", display: "block" }}>für eine neue</span>
              Generation
            </h1>

            <p style={{
              fontSize: "1.05rem", color: "#888888",
              maxWidth: "38ch", marginBottom: "2rem", lineHeight: 1.7,
            }}>
              Wir sind Mello. Offen, gemeinschaftlich, ambitioniert — ein Club für alle,
              die Fußball lieben und Wiens neue Fußballkultur mitgestalten wollen.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/mitgliedschaft" style={{
                background: "#0d9488", color: "#ffffff",
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontWeight: 600, fontSize: ".85rem",
                letterSpacing: ".1em", textTransform: "uppercase",
                padding: ".9rem 2rem", textDecoration: "none",
                display: "inline-block",
              }}>
                Jetzt Mitglied werden
              </Link>
              <Link href="/ueber-uns" style={{
                border: "1px solid rgba(13,148,136,.5)",
                color: "#0d9488",
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontWeight: 500, fontSize: ".85rem",
                letterSpacing: ".1em", textTransform: "uppercase",
                padding: ".9rem 2rem", textDecoration: "none",
                display: "inline-block",
              }}>
                Mehr über uns
              </Link>
            </div>
          </div>

          <div className="hero-logohero">
            <LogoHero />
          </div>

        </section>

        {/* ── COUNTDOWN ── */}
        <Countdown />

      </div>

      {/* ── MANIFESTO ── */}
      <section className="manifesto-section" style={{
        padding: "7rem 3rem",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "6rem", alignItems: "center",
        borderTop: "1px solid #222222",
      }}>
        <div>
          <p style={{
            fontSize: ".7rem", letterSpacing: ".25em",
            textTransform: "uppercase", color: "#0d9488",
            marginBottom: "1.2rem", fontWeight: 500,
          }}>Unser Ansatz</p>
          <h2 style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(2.5rem, 4vw, 4.5rem)",
            lineHeight: 1.05, letterSpacing: ".02em", color: "#f5f5f5",
          }}>
            Fußball<br />neu gedacht
          </h2>
        </div>
        <div style={{ color: "#888888", fontSize: "1rem", lineHeight: 1.8 }}>
          <p>Bei uns findest du nicht nur ein Team, sondern eine Community, die zusammen trainiert, zusammen wächst und eine neue Fußballkultur prägt.</p>
          <p style={{ marginTop: "1rem" }}>Wir denken moderner: offen für alle, transparent in unserer Struktur, ambitioniert auf und neben dem Platz.</p>
          <p style={{ marginTop: "1rem", color: "rgba(245,245,245,.7)" }}>
            Die erste Generation schreibt Geschichte.{" "}
            <span style={{ color: "#0d9488" }}>Sei von Anfang an dabei.</span>
          </p>
        </div>
      </section>

    </main>
  );
}