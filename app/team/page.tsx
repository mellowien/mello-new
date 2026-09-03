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
  { number: 1, firstName: "Lasthenis", lastName: "Polentas", position: "Tor", posDetail: "Torwart" },
  { number: 13, firstName: "Damian", lastName: "Gugler", position: "Tor", posDetail: "Torwart" },
];

const DEFENDERS: Player[] = [
  { number: 2, firstName: "Mathias", lastName: "Resch", position: "Abwehr", posDetail: "Verteidigung" },
  { number: 4, firstName: "Erich", lastName: "Rausch", position: "Abwehr", posDetail: "Verteidigung" },
  { number: 5, firstName: "Michael", lastName: "Ganhör", position: "Abwehr", posDetail: "Verteidigung" },
  { number: 6, firstName: "Antoni", lastName: "Marzoch", position: "Abwehr", posDetail: "Verteidigung" },
  { number: 14, firstName: "Martin", lastName: "Drewes", position: "Abwehr", posDetail: "Verteidigung" },
  { number: 21, firstName: "Mario", lastName: "Dirr", position: "Abwehr", posDetail: "Verteidigung" },
];

const MIDFIELDERS: Player[] = [
  { number: 7, firstName: "Marco", lastName: "Miuli", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { number: 8, firstName: "Ermal", lastName: "Eshrefi", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { number: 11, firstName: "Felix", lastName: "Reiffen", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { number: 16, firstName: "David", lastName: "Kocsis", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { number: 17, firstName: "Robert", lastName: "Mihalca", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { firstName: "Philip", lastName: "Molzer", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { firstName: "Jamil", lastName: "Harrati", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { firstName: "Ayhan", lastName: "Hussien", position: "Mittelfeld", posDetail: "Mittelfeld" },
  { firstName: "Vito Bruno", lastName: "Dicic", position: "Mittelfeld", posDetail: "Mittelfeld", customImage: "/Vito.PNG" },
  { firstName: "Lorenz", lastName: "Predcechtel", position: "Mittelfeld", posDetail: "Mittelfeld" },
];

const FORWARDS: Player[] = [
  { number: 9, firstName: "Oskar", lastName: "Ciula", position: "Angriff", posDetail: "Sturm" },
  { number: 10, firstName: "Shar", lastName: "Deraki", position: "Angriff", posDetail: "Sturm" },
  { number: 22, firstName: "Daniel", lastName: "Rezai", position: "Angriff", posDetail: "Sturm" },
  { firstName: "Seybane", lastName: "Cisse", position: "Angriff", posDetail: "Sturm" },
  { firstName: "Zakariya", lastName: "Nuur", position: "Angriff", posDetail: "Sturm" },
];

function getPlayerImage(player: Player): string {
  if (player.customImage) return player.customImage;
  const cleanName = player.firstName.replace(/\s+/g, "");
  return `/${cleanName}.PNG`;
}

function MelloPlayerCard({ player }: { player: Player }) {
  const imageSrc = getPlayerImage(player);

  return (
    <div className="mello-card">
      <div className="mello-card-header">
        {player.number ? (
          <span className="mello-number-tag">#{player.number}</span>
        ) : (
          <div />
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
          onError={(e) => {
            e.currentTarget.src = "/mello-wien.png";
            e.currentTarget.classList.add("mello-card-photo--fallback");
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
    </div>
  );
}

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<SectionKey>("Alle");

  const showGK = activeFilter === "Alle" || activeFilter === "Tor";
  const showDef = activeFilter === "Alle" || activeFilter === "Abwehr";
  const showMid = activeFilter === "Alle" || activeFilter === "Mittelfeld";
  const showFwd = activeFilter === "Alle" || activeFilter === "Angriff";

  return (
    <main
      style={{
        background: "var(--mello-black, #080808)",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        minHeight: "100vh",
        paddingTop: "88px",
      }}
    >
      <style>{`
        /* ── MELLO PRO CARD ── */
        .mello-card {
          background: rgba(247, 247, 244, 0.035);
          border: 1px solid rgba(247, 247, 244, 0.1);
          border-radius: 1.1rem;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease,
                      background 0.35s ease;
        }

        .mello-card:hover {
          transform: translateY(-6px);
          border-color: rgba(13, 148, 136, 0.75);
          background: rgba(247, 247, 244, 0.055);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(13, 148, 136, 0.15);
        }

        .mello-card-header {
          position: absolute;
          top: 0.9rem;
          left: 0.9rem;
          right: 0.9rem;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          z-index: 4;
        }

        .mello-number-tag {
          font-family: var(--font-body), Arial, sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          color: #0d9488;
          background: rgba(8, 8, 8, 0.85);
          padding: 0.22rem 0.6rem;
          border-radius: 6px;
          border: 1px solid rgba(13, 148, 136, 0.4);
          letter-spacing: 0.04em;
          backdrop-filter: blur(8px);
        }

        .mello-pos-badge {
          font-family: var(--font-body), Arial, sans-serif;
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(247, 247, 244, 0.6);
          background: rgba(8, 8, 8, 0.75);
          padding: 0.22rem 0.55rem;
          border-radius: 99px;
          border: 1px solid rgba(247, 247, 244, 0.1);
          backdrop-filter: blur(6px);
        }

        .mello-bg-num {
          position: absolute;
          top: -0.5rem;
          right: 0.2rem;
          font-family: '"Helvetica Neue", Arial, sans-serif';
          font-size: 9.5rem;
          font-weight: 900;
          color: rgba(247, 247, 244, 0.028);
          letter-spacing: -0.05em;
          line-height: 0.85;
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }

        .mello-img-stage {
          height: 380px;
          position: relative;
          display: flex;
          align-items: flex-start;
          justifyContent: center;
          background: radial-gradient(circle at 50% 12%, rgba(247,247,244,0.06) 0%, transparent 70%);
          overflow: hidden;
        }

        .mello-card-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transform: translateY(-8px);
          position: relative;
          z-index: 1;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mello-card:hover .mello-card-photo:not(.mello-card-photo--fallback) {
          transform: translateY(-8px) scale(1.03);
        }

        .mello-card-photo--fallback {
          width: 76px !important;
          height: 76px !important;
          object-fit: contain !important;
          opacity: 0.22;
          margin-top: 6.5rem;
          transform: none !important;
        }

        .mello-card-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(8, 8, 8, 0.75) 82%, rgba(8, 8, 8, 0.98) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* ── DAS MELLO TEXTFELD ── */
        .mello-card-body {
          padding: 1.1rem 1.35rem 1.35rem;
          background: rgba(8, 8, 8, 0.95);
          border-top: 1px solid rgba(247, 247, 244, 0.08);
          position: relative;
          z-index: 3;
        }

        .mello-card-pretitle {
          color: #0d9488;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .mello-card-name {
          display: flex;
          flex-direction: column;
        }

        .mello-card-fn {
          color: rgba(247, 247, 244, 0.6);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.15;
        }

        .mello-card-ln {
          color: #f7f7f4;
          font-family: var(--font-body), "Helvetica Neue", Arial, sans-serif;
          font-size: 1.18rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.15;
        }

        /* ── FILTER BUTTONS ── */
        .filter-btn {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, 0.15);
          color: rgba(247, 247, 244, 0.65);
          font-family: var(--font-body), Arial, sans-serif;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.55rem 1.25rem;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .filter-btn:hover {
          color: #f7f7f4;
          border-color: rgba(13, 148, 136, 0.5);
        }

        .filter-btn.active {
          background: #0d9488;
          color: #080808;
          border-color: #0d9488;
        }

        /* ── SECTION HEADERS ── */
        .part-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 2.2rem;
        }

        .part-title {
          font-family: var(--font-body), "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 800;
          letter-spacing: 0.06em;
          margin: 0;
          text-transform: uppercase;
          color: #f7f7f4;
        }

        .part-line {
          flex: 1;
          height: 1px;
          background: rgba(247, 247, 244, 0.1);
        }

        @media (max-width: 1120px) {
          .team-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }

          .mello-img-stage {
            height: 290px !important;
          }

          .team-container {
            width: min(100% - 2.5rem, 1440px) !important;
          }

          .mello-card-ln {
            font-size: 1.05rem !important;
          }
        }

        @media (max-width: 480px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ── 1. HERO (CLEAN & MINIMALISTISCH) ── */}
      <section
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

      {/* ── 2. STICKY FILTER-LEISTE ── */}
      <section
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
          className="team-container"
          style={{
            width: "min(100% - 6rem, 1440px)",
            margin: "0 auto",
            display: "flex",
            gap: ".65rem",
            overflowX: "auto",
            paddingBottom: ".2rem",
          }}
        >
          {(["Alle", "Tor", "Abwehr", "Mittelfeld", "Angriff"] as SectionKey[]).map(
            (pos) => (
              <button
                key={pos}
                type="button"
                className={`filter-btn ${activeFilter === pos ? "active" : ""}`}
                onClick={() => setActiveFilter(pos)}
              >
                {pos}
              </button>
            ),
          )}
        </div>
      </section>

      {/* ── 3. KADER IN 4 PARTS ── */}
      <div
        className="team-container"
        style={{
          width: "min(100% - 6rem, 1440px)",
          margin: "0 auto",
          padding: "4.5rem 0 2rem",
        }}
      >
        {/* TORHÜTER */}
        {showGK && (
          <section style={{ marginBottom: "5.5rem" }}>
            <div className="part-header">
              <h2 className="part-title">Torhüter</h2>
              <div className="part-line" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.6rem",
              }}
              className="team-grid"
            >
              {GOALKEEPERS.map((p) => (
                <MelloPlayerCard key={`${p.firstName}-${p.lastName}`} player={p} />
              ))}
            </div>
          </section>
        )}

        {/* ABWEHR */}
        {showDef && (
          <section style={{ marginBottom: "5.5rem" }}>
            <div className="part-header">
              <h2 className="part-title">Abwehr</h2>
              <div className="part-line" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.6rem",
              }}
              className="team-grid"
            >
              {DEFENDERS.map((p) => (
                <MelloPlayerCard key={`${p.firstName}-${p.lastName}`} player={p} />
              ))}
            </div>
          </section>
        )}

        {/* MITTELFELD */}
        {showMid && (
          <section style={{ marginBottom: "5.5rem" }}>
            <div className="part-header">
              <h2 className="part-title">Mittelfeld</h2>
              <div className="part-line" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.6rem",
              }}
              className="team-grid"
            >
              {MIDFIELDERS.map((p) => (
                <MelloPlayerCard key={`${p.firstName}-${p.lastName}`} player={p} />
              ))}
            </div>
          </section>
        )}

        {/* ANGRIFF */}
        {showFwd && (
          <section style={{ marginBottom: "5.5rem" }}>
            <div className="part-header">
              <h2 className="part-title">Angriff</h2>
              <div className="part-line" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.6rem",
              }}
              className="team-grid"
            >
              {FORWARDS.map((p) => (
                <MelloPlayerCard key={`${p.firstName}-${p.lastName}`} player={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── 4. TRYOUT CTA ── */}
      <section
        style={{
          borderTop: "1px solid var(--mello-line, #222222)",
          padding: "5.5rem 0",
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(13,148,136,0.08) 100%)",
        }}
      >
        <div
          className="team-container"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#14b8a6";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0d9488";
                e.currentTarget.style.transform = "translateY(0)";
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