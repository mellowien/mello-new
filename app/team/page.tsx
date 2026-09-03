"use client";

import { useState } from "react";
import Link from "next/link";

type SectionKey = "Alle" | "Tor" | "Abwehr" | "Mittelfeld" | "Angriff";

interface Player {
  number?: number;
  firstName: string;
  lastName: string;
  position: "Tor" | "Abwehr" | "Mittelfeld" | "Angriff";
  posDetail: string;
  customImage?: string;
}

const GOALKEEPERS: Player[] = [
  {
    number: 1,
    firstName: "Lasthenis",
    lastName: "Polentas",
    position: "Tor",
    posDetail: "Torwart",
  },
  {
    number: 13,
    firstName: "Damian",
    lastName: "Gugler",
    position: "Tor",
    posDetail: "Torwart",
  },
];

const DEFENDERS: Player[] = [
  {
    number: 2,
    firstName: "Mathias",
    lastName: "Resch",
    position: "Abwehr",
    posDetail: "Verteidigung",
  },
  {
    number: 4,
    firstName: "Erich",
    lastName: "Rausch",
    position: "Abwehr",
    posDetail: "Verteidigung",
  },
  {
    number: 5,
    firstName: "Michael",
    lastName: "Ganhör",
    position: "Abwehr",
    posDetail: "Verteidigung",
  },
  {
    number: 6,
    firstName: "Antoni",
    lastName: "Marzoch",
    position: "Abwehr",
    posDetail: "Verteidigung",
  },
  {
    number: 14,
    firstName: "Martin",
    lastName: "Drewes",
    position: "Abwehr",
    posDetail: "Verteidigung",
  },
  {
    number: 21,
    firstName: "Mario",
    lastName: "Dirr",
    position: "Abwehr",
    posDetail: "Verteidigung",
  },
];

const MIDFIELDERS: Player[] = [
  {
    number: 7,
    firstName: "Marco",
    lastName: "Miuli",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    number: 8,
    firstName: "Ermal",
    lastName: "Eshrefi",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    number: 11,
    firstName: "Felix",
    lastName: "Reiffen",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    number: 16,
    firstName: "David",
    lastName: "Kocsis",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    number: 17,
    firstName: "Robert",
    lastName: "Mihalca",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    firstName: "Philip",
    lastName: "Molzer",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    firstName: "Jamil",
    lastName: "Harrati",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    firstName: "Ayhan",
    lastName: "Hussien",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
  {
    firstName: "Vito Bruno",
    lastName: "Dicic",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
    customImage: "/Vito.PNG",
  },
  {
    firstName: "Lorenz",
    lastName: "Predcechtel",
    position: "Mittelfeld",
    posDetail: "Mittelfeld",
  },
];

const FORWARDS: Player[] = [
  {
    number: 9,
    firstName: "Oskar",
    lastName: "Ciula",
    position: "Angriff",
    posDetail: "Sturm",
  },
  {
    number: 10,
    firstName: "Shar",
    lastName: "Deraki",
    position: "Angriff",
    posDetail: "Sturm",
  },
  {
    number: 22,
    firstName: "Daniel",
    lastName: "Rezai",
    position: "Angriff",
    posDetail: "Sturm",
  },
  {
    firstName: "Seybane",
    lastName: "Cisse",
    position: "Angriff",
    posDetail: "Sturm",
  },
  {
    firstName: "Zakariya",
    lastName: "Nuur",
    position: "Angriff",
    posDetail: "Sturm",
  },
];

function getPlayerImage(player: Player): string {
  if (player.customImage) return player.customImage;

  const cleanName = player.firstName.replace(/\s+/g, "");
  return `/${cleanName}.PNG`;
}

function MelloPlayerCard({ player }: { player: Player }) {
  const imageSrc = getPlayerImage(player);

  return (
    <article className="mello-card">
      <div className="mello-card-header">
        {player.number ? (
          <span className="mello-number-tag">#{player.number}</span>
        ) : (
          <span aria-hidden="true" />
        )}

        <span className="mello-pos-badge">{player.posDetail}</span>
      </div>

      {player.number && (
        <span className="mello-bg-num" aria-hidden="true">
          {player.number}
        </span>
      )}

      <div className="mello-img-stage">
        <img
          src={imageSrc}
          alt={`${player.firstName} ${player.lastName}`}
          className="mello-card-photo"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = "/mello-wien.png";
            event.currentTarget.classList.add("mello-card-photo--fallback");
          }}
        />
        <div className="mello-card-gradient" />
      </div>

      <div className="mello-card-body">
        <div className="mello-card-pretitle">{player.position}</div>

        <div className="mello-card-name">
          <span className="mello-card-fn">{player.firstName}</span>
          <span className="mello-card-ln">{player.lastName}</span>
        </div>
      </div>
    </article>
  );
}

function PlayerSection({
  title,
  players,
}: {
  title: string;
  players: Player[];
}) {
  return (
    <section className="team-player-section">
      <div className="part-header">
        <h2 className="part-title">{title}</h2>
        <div className="part-line" />
        <span className="part-count">{players.length}</span>
      </div>

      <div
        className="team-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.6rem",
        }}
      >
        {players.map((player) => (
          <MelloPlayerCard
            key={`${player.firstName}-${player.lastName}`}
            player={player}
          />
        ))}
      </div>
    </section>
  );
}

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<SectionKey>("Alle");

  const showGK = activeFilter === "Alle" || activeFilter === "Tor";
  const showDef = activeFilter === "Alle" || activeFilter === "Abwehr";
  const showMid = activeFilter === "Alle" || activeFilter === "Mittelfeld";
  const showFwd = activeFilter === "Alle" || activeFilter === "Angriff";

  const filters: SectionKey[] = [
    "Alle",
    "Tor",
    "Abwehr",
    "Mittelfeld",
    "Angriff",
  ];

  return (
    <main
      className="team-page"
      style={{
        background: "var(--mello-black, #080808)",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        minHeight: "100vh",
        paddingTop: "88px",
      }}
    >
      <style>{`
        .mello-card {
          background: rgba(247,247,244,.035);
          border: 1px solid rgba(247,247,244,.1);
          border-radius: 1.1rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          transition:
            transform .35s cubic-bezier(.22,1,.36,1),
            border-color .35s ease,
            box-shadow .35s ease,
            background .35s ease;
        }

        .mello-card:hover {
          background: rgba(247,247,244,.055);
          border-color: rgba(13,148,136,.75);
          box-shadow: 0 16px 36px rgba(0,0,0,.6), 0 0 24px rgba(13,148,136,.15);
          transform: translateY(-6px);
        }

        .mello-card-header {
          align-items: center;
          display: flex;
          justify-content: space-between;
          left: .9rem;
          position: absolute;
          right: .9rem;
          top: .9rem;
          z-index: 4;
        }

        .mello-number-tag {
          backdrop-filter: blur(8px);
          background: rgba(8,8,8,.85);
          border: 1px solid rgba(13,148,136,.4);
          border-radius: 6px;
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .75rem;
          font-weight: 800;
          letter-spacing: .04em;
          padding: .22rem .6rem;
        }

        .mello-pos-badge {
          backdrop-filter: blur(6px);
          background: rgba(8,8,8,.75);
          border: 1px solid rgba(247,247,244,.1);
          border-radius: 99px;
          color: rgba(247,247,244,.6);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .58rem;
          font-weight: 800;
          letter-spacing: .14em;
          padding: .22rem .55rem;
          text-transform: uppercase;
        }

        .mello-bg-num {
          color: rgba(247,247,244,.028);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 9.5rem;
          font-weight: 900;
          letter-spacing: -.05em;
          line-height: .85;
          pointer-events: none;
          position: absolute;
          right: .2rem;
          top: -.5rem;
          user-select: none;
          z-index: 0;
        }

        .mello-img-stage {
          align-items: flex-start;
          background: radial-gradient(circle at 50% 12%, rgba(247,247,244,.06) 0%, transparent 70%);
          display: flex;
          height: 380px;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .mello-card-photo {
          height: 100%;
          object-fit: cover;
          object-position: center top;
          position: relative;
          transform: translateY(-8px);
          transition: transform .4s cubic-bezier(.22,1,.36,1);
          width: 100%;
          z-index: 1;
        }

        .mello-card:hover .mello-card-photo:not(.mello-card-photo--fallback) {
          transform: translateY(-8px) scale(1.03);
        }

        .mello-card-photo--fallback {
          height: 76px !important;
          margin-top: 6.5rem;
          object-fit: contain !important;
          opacity: .22;
          transform: none !important;
          width: 76px !important;
        }

        .mello-card-gradient {
          background: linear-gradient(180deg, transparent 55%, rgba(8,8,8,.75) 82%, rgba(8,8,8,.98) 100%);
          inset: 0;
          pointer-events: none;
          position: absolute;
          z-index: 2;
        }

        .mello-card-body {
          background: rgba(8,8,8,.95);
          border-top: 1px solid rgba(247,247,244,.08);
          padding: 1.1rem 1.35rem 1.35rem;
          position: relative;
          z-index: 3;
        }

        .mello-card-pretitle {
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .6rem;
          font-weight: 800;
          letter-spacing: .16em;
          margin-bottom: .25rem;
          text-transform: uppercase;
        }

        .mello-card-name {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .mello-card-fn {
          color: rgba(247,247,244,.6);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .05em;
          line-height: 1.15;
          overflow-wrap: anywhere;
          text-transform: uppercase;
        }

        .mello-card-ln {
          color: #f7f7f4;
          font-family: var(--font-body), "Helvetica Neue", Arial, sans-serif;
          font-size: 1.18rem;
          font-weight: 800;
          letter-spacing: .04em;
          line-height: 1.15;
          overflow-wrap: anywhere;
          text-transform: uppercase;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(247,247,244,.15);
          border-radius: 99px;
          color: rgba(247,247,244,.65);
          cursor: pointer;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .14em;
          padding: .55rem 1.25rem;
          text-transform: uppercase;
          transition: all .2s ease;
          white-space: nowrap;
        }

        .filter-btn:hover {
          border-color: rgba(13,148,136,.5);
          color: #f7f7f4;
        }

        .filter-btn.active {
          background: #0d9488;
          border-color: #0d9488;
          color: #080808;
        }

        .part-header {
          align-items: center;
          display: flex;
          gap: 1.2rem;
          margin-bottom: 2.2rem;
        }

        .part-title {
          color: #f7f7f4;
          font-family: var(--font-body), "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 800;
          letter-spacing: .06em;
          margin: 0;
          text-transform: uppercase;
        }

        .part-line {
          background: rgba(247,247,244,.1);
          flex: 1;
          height: 1px;
        }

        .part-count {
          align-items: center;
          background: rgba(13,148,136,.12);
          border: 1px solid rgba(13,148,136,.3);
          border-radius: 99px;
          color: #0d9488;
          display: inline-flex;
          font-family: Arial, Helvetica, sans-serif;
          font-size: .58rem;
          font-weight: 800;
          height: 1.55rem;
          justify-content: center;
          min-width: 1.55rem;
        }

        .team-player-section {
          margin-bottom: 5.5rem;
        }

        @media (max-width: 1120px) {
          .team-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .team-page {
            padding-top: 68px !important;
          }

          .team-container {
            width: min(100% - 2.25rem, 40rem) !important;
          }

          .team-hero {
            padding: 2.6rem 0 2.25rem !important;
          }

          .team-hero-kicker {
            font-size: .62rem !important;
            letter-spacing: .16em !important;
            margin-bottom: .75rem !important;
          }

          .team-hero-title {
            font-size: clamp(2.35rem, 11vw, 3.4rem) !important;
            letter-spacing: -.045em !important;
            line-height: .95 !important;
          }

          .team-filter-section {
            padding: .75rem 0 !important;
            top: 68px !important;
          }

          .team-filter-row {
            gap: .55rem !important;
            margin-left: -1.125rem;
            margin-right: -1.125rem;
            padding: 0 1.125rem .25rem !important;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }

          .team-filter-row::-webkit-scrollbar {
            display: none;
          }

          .filter-btn {
            flex: 0 0 auto;
            font-size: .61rem !important;
            min-height: 44px;
            padding: .65rem 1rem !important;
            scroll-snap-align: start;
          }

          .team-roster {
            padding: 3rem 0 .5rem !important;
          }

          .team-player-section {
            margin-bottom: 3.35rem !important;
          }

          .part-header {
            gap: .75rem !important;
            margin-bottom: 1.2rem !important;
          }

          .part-title {
            font-size: 1.3rem !important;
            letter-spacing: .045em !important;
          }

          .part-count {
            font-size: .54rem !important;
            height: 1.45rem !important;
            min-width: 1.45rem !important;
          }

          .team-grid {
            gap: .85rem !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .mello-card {
            border-radius: .8rem !important;
          }

          .mello-card:hover {
            box-shadow: none;
            transform: none;
          }

          .mello-card-header {
            left: .55rem !important;
            right: .55rem !important;
            top: .55rem !important;
          }

          .mello-number-tag {
            border-radius: 5px !important;
            font-size: .61rem !important;
            padding: .18rem .42rem !important;
          }

          .mello-pos-badge {
            font-size: .43rem !important;
            letter-spacing: .08em !important;
            max-width: 53%;
            overflow: hidden;
            padding: .18rem .36rem !important;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .mello-bg-num {
            font-size: 6.25rem !important;
            right: -.08rem !important;
            top: -.25rem !important;
          }

          .mello-img-stage {
            height: clamp(172px, 52vw, 245px) !important;
          }

          .mello-card-photo {
            transform: translateY(-4px) !important;
          }

          .mello-card-gradient {
            background: linear-gradient(180deg, transparent 48%, rgba(8,8,8,.62) 78%, rgba(8,8,8,.96) 100%) !important;
          }

          .mello-card-body {
            min-height: 5.6rem;
            padding: .7rem .72rem .82rem !important;
          }

          .mello-card-pretitle {
            font-size: .46rem !important;
            letter-spacing: .11em !important;
            margin-bottom: .2rem !important;
          }

          .mello-card-fn {
            font-size: .61rem !important;
            letter-spacing: .03em !important;
            line-height: 1.12 !important;
          }

          .mello-card-ln {
            font-size: clamp(.88rem, 4.25vw, 1.08rem) !important;
            letter-spacing: .015em !important;
            line-height: 1.08 !important;
          }

          .mello-card-photo--fallback {
            height: 58px !important;
            margin-top: 4.2rem !important;
            width: 58px !important;
          }

          .team-cta {
            padding: 3.6rem 0 calc(3.75rem + env(safe-area-inset-bottom)) !important;
          }

          .team-cta-wrap {
            align-items: stretch !important;
            display: block !important;
          }

          .team-cta-title {
            font-size: clamp(1.9rem, 9vw, 2.65rem) !important;
            line-height: 1 !important;
            margin-bottom: .85rem !important;
          }

          .team-cta-copy {
            font-size: .95rem !important;
            line-height: 1.65 !important;
          }

          .team-cta-action {
            box-sizing: border-box !important;
            justify-content: center !important;
            margin-top: 1.55rem !important;
            min-height: 52px !important;
            padding: 1rem 1.1rem !important;
            text-align: center;
            width: 100% !important;
          }
        }

        @media (max-width: 360px) {
          .team-container {
            width: min(100% - 2rem, 40rem) !important;
          }

          .team-grid {
            gap: .65rem !important;
          }

          .mello-img-stage {
            height: 166px !important;
          }

          .mello-card-body {
            min-height: 5.35rem !important;
            padding-left: .6rem !important;
            padding-right: .6rem !important;
          }

          .mello-card-ln {
            font-size: .84rem !important;
          }

          .mello-pos-badge {
            display: none !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        className="team-hero"
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "4.5rem 0 3.2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 55% 70% at 85% 40%, rgba(13, 148, 136, 0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className="team-container"
          style={{
            width: "min(100% - 6rem, 1440px)",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="team-hero-kicker"
            style={{
              color: "#0d9488",
              fontSize: ".68rem",
              fontWeight: 800,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              marginBottom: ".9rem",
            }}
          >
            Saison 2026/27 · 1. Klasse A
          </div>

          <h1
            className="team-hero-title"
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Die Mannschaft
            <br />
            <span style={{ color: "#0d9488" }}>Kader 2026/27</span>
          </h1>
        </div>
      </section>

      {/* FILTER */}
      <section
        className="team-filter-section"
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          background: "rgba(8, 8, 8, 0.92)",
          padding: "1.2rem 0",
          position: "sticky",
          top: "88px",
          zIndex: 20,
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          className="team-container team-filter-row"
          style={{
            width: "min(100% - 6rem, 1440px)",
            margin: "0 auto",
            display: "flex",
            gap: ".65rem",
            overflowX: "auto",
            paddingBottom: ".2rem",
          }}
        >
          {filters.map((position) => (
            <button
              key={position}
              type="button"
              className={`filter-btn ${
                activeFilter === position ? "active" : ""
              }`}
              onClick={() => setActiveFilter(position)}
            >
              {position}
            </button>
          ))}
        </div>
      </section>

      {/* ROSTER */}
      <div
        className="team-container team-roster"
        style={{
          width: "min(100% - 6rem, 1440px)",
          margin: "0 auto",
          padding: "4.5rem 0 2rem",
        }}
      >
        {showGK && <PlayerSection title="Torhüter" players={GOALKEEPERS} />}

        {showDef && <PlayerSection title="Abwehr" players={DEFENDERS} />}

        {showMid && <PlayerSection title="Mittelfeld" players={MIDFIELDERS} />}

        {showFwd && <PlayerSection title="Angriff" players={FORWARDS} />}
      </div>

      {/* CTA */}
      <section
        className="team-cta"
        style={{
          borderTop: "1px solid var(--mello-line, #222222)",
          padding: "5.5rem 0",
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(13,148,136,0.08) 100%)",
        }}
      >
        <div
          className="team-container team-cta-wrap"
          style={{
            width: "min(100% - 6rem, 1440px)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2.5rem",
          }}
        >
          <div style={{ maxWidth: "44rem" }}>
            <h2
              className="team-cta-title"
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: "0 0 1rem",
                textTransform: "uppercase",
              }}
            >
              Du willst für Mello spielen?
            </h2>

            <p
              className="team-cta-copy"
              style={{
                color: "rgba(247, 247, 244, 0.75)",
                fontSize: "0.98rem",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Wir suchen motivierte Spieler, die sportliche Ambition mitbringen
              und Teil unseres Kaders in der 1. Klasse werden wollen. Melde dich
              für ein Probetraining auf der Polizei-Sportanlage.
            </p>
          </div>

          <div>
            <Link
              href="/kontakt"
              className="team-cta-action"
              style={{
                background: "#0d9488",
                color: "#080808",
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: ".75rem",
                fontWeight: 800,
                letterSpacing: ".14em",
                textDecoration: "none",
                textTransform: "uppercase",
                padding: "1rem 2.4rem",
                borderRadius: "99px",
                display: "inline-flex",
                alignItems: "center",
                gap: ".4rem",
                transition: "background .2s ease, transform .2s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#14b8a6";
                event.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "#0d9488";
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Zum Probetraining anmelden&nbsp;→
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}