import Link from "next/link";
import { notFound } from "next/navigation";

type Member = {
  id: string;
  name: string;
  status: "Founding Member" | "Member";
  season: string;
  validUntil: string;
};

const MEMBERS: Record<string, Member> = {
  "MELLO-0001": {
    id: "MELLO-0001",
    name: "Daniel Rezai",
    status: "Founding Member",
    season: "2026 / 27",
    validUntil: "30. Juni 2027",
  },
};

type PageProps = {
  params: Promise<{
    memberId: string;
  }>;
};

export default async function MemberVerificationPage({ params }: PageProps) {
  const { memberId } = await params;
  const normalizedId = decodeURIComponent(memberId).toUpperCase().trim();
  const member = MEMBERS[normalizedId];

  if (!member) {
    notFound();
  }

  const nameParts = member.name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        paddingTop: "88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .verify-container {
          width: min(100% - 3rem, 860px);
          margin: 0 auto;
        }

        .verify-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(247, 247, 244, .12);
          border-radius: 1.25rem;
          background:
            radial-gradient(
              ellipse 70% 90% at 100% 0%,
              rgba(13, 148, 136, .13) 0%,
              transparent 65%
            ),
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .045) 0%,
              rgba(247, 247, 244, .018) 62%,
              rgba(13, 148, 136, .035) 100%
            );
          box-shadow:
            0 2rem 5rem rgba(0, 0, 0, .35),
            inset 0 1px 0 rgba(255, 255, 255, .055);
        }

        .verify-card::after {
          content: "";
          position: absolute;
          width: 32rem;
          height: 32rem;
          right: -19rem;
          top: -19rem;
          border-radius: 50%;
          border: 1px solid rgba(13, 148, 136, .15);
          box-shadow:
            0 0 0 3rem rgba(13, 148, 136, .018),
            0 0 0 7rem rgba(13, 148, 136, .012);
          pointer-events: none;
        }

        .verify-badge {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          padding: .42rem .9rem;
          border: 1px solid rgba(13, 148, 136, .55);
          border-radius: 99px;
          background: rgba(13, 148, 136, .09);
          color: #0d9488;
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .verify-badge-dot {
          width: .45rem;
          height: .45rem;
          flex-shrink: 0;
          border-radius: 50%;
          background: #0d9488;
          box-shadow: 0 0 12px rgba(13, 148, 136, .72);
        }

        .verify-logo-wrap {
          width: 5rem;
          height: 5rem;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          padding: .18rem;
          background: linear-gradient(
            145deg,
            rgba(94, 234, 212, .78),
            rgba(13, 148, 136, .14)
          );
          box-shadow:
            0 0 1.4rem rgba(13, 148, 136, .13),
            0 .7rem 1.6rem rgba(0, 0, 0, .38);
        }

        .verify-logo {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          border-radius: 50%;
          background: #080808;
        }

        .verify-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding-top: 1.4rem;
          border-top: 1px solid rgba(247, 247, 244, .1);
        }

        .verify-info-item {
          display: flex;
          flex-direction: column;
          gap: .35rem;
        }

        .verify-info-label {
          color: rgba(247, 247, 244, .42);
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .verify-info-value {
          color: rgba(247, 247, 244, .88);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: .9rem;
          font-weight: 800;
          letter-spacing: .02em;
        }

        .verify-info-value--teal {
          color: #0d9488;
        }

        .verify-home-link {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          border: 1px solid rgba(13, 148, 136, .52);
          border-radius: 99px;
          color: #0d9488;
          font-size: .7rem;
          font-weight: 800;
          letter-spacing: .12em;
          padding: .82rem 1.35rem;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            background .2s ease,
            color .2s ease,
            transform .2s ease;
        }

        .verify-home-link:hover {
          background: #0d9488;
          color: #080808;
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .verify-container {
            width: min(100% - 2.5rem, 860px);
          }

          .verify-info-row {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }

          .verify-card-inner {
            padding: 2rem 1.45rem !important;
          }

          .verify-name {
            font-size: clamp(2.6rem, 14vw, 4rem) !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 50% 55% at 80% 18%, rgba(13, 148, 136, .08) 0%, transparent 72%)",
        }}
      />

      <section
        style={{
          padding: "clamp(4rem, 10vw, 7rem) 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="verify-container">
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                color: "rgba(247, 247, 244, .48)",
                fontSize: ".68rem",
                fontWeight: 800,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                marginBottom: ".8rem",
              }}
            >
              FC Mello Wien · Member Verification
            </div>

            <h1
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Mitgliedschaft prüfen.
            </h1>
          </div>

          <article className="verify-card">
            <div
              className="verify-card-inner"
              style={{
                padding: "clamp(2.3rem, 5vw, 3.6rem)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  marginBottom: "3rem",
                }}
              >
                <div className="verify-badge">
                  <span className="verify-badge-dot" />
                  Mitgliedschaft aktiv
                </div>

                <div className="verify-logo-wrap">
                  <img
                    src="/mello-wien.png"
                    alt="FC Mello Wien"
                    className="verify-logo"
                  />
                </div>
              </div>

              <div
                style={{
                  color: "#0d9488",
                  fontSize: ".66rem",
                  fontWeight: 800,
                  letterSpacing: ".16em",
                  marginBottom: ".75rem",
                  textTransform: "uppercase",
                }}
              >
                Verifiziertes Mitglied
              </div>

              <div
                className="verify-name"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: "clamp(3rem, 7vw, 5.1rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.06em",
                  lineHeight: ".84",
                  marginBottom: "2.5rem",
                  textTransform: "uppercase",
                }}
              >
                <span>{firstName}</span>
                {lastName && <span style={{ color: "#0d9488" }}>{lastName}</span>}
              </div>

              <div className="verify-info-row">
                <div className="verify-info-item">
                  <span className="verify-info-label">Member ID</span>
                  <span className="verify-info-value">{member.id}</span>
                </div>

                <div className="verify-info-item">
                  <span className="verify-info-label">Status</span>
                  <span className="verify-info-value verify-info-value--teal">
                    {member.status}
                  </span>
                </div>

                <div className="verify-info-item">
                  <span className="verify-info-label">Gültig bis</span>
                  <span className="verify-info-value">{member.validUntil}</span>
                </div>
              </div>
            </div>
          </article>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Link href="/" className="verify-home-link">
              Zur Mello Website <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p
            style={{
              color: "rgba(247, 247, 244, .34)",
              fontSize: ".72rem",
              lineHeight: 1.6,
              margin: "1.5rem auto 0",
              maxWidth: "62ch",
              textAlign: "center",
            }}
          >
            Diese Seite bestätigt den aktuellen Mitgliedsstatus zum Zeitpunkt
            der Abfrage.
          </p>
        </div>
      </section>
    </main>
  );
}