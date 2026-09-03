"use client";

import Link from "next/link";

const FACTS = [
  { label: "Gründungsdatum", value: "08.10.2025" },
  { label: "Liga", value: "1. Klasse A (7. Liga Österreichs)" },
  { label: "Heimstätte", value: "Polizei-Sportanlage (Dampfschiffhaufen 2, 1220 Wien)" },
];

export default function AboutPage() {
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
        .qa-bubble {
          border-left: 2px solid #0d9488;
          padding-left: 1.5rem;
          margin-bottom: 2.2rem;
        }

        .about-img {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(247, 247, 244, 0.12);
          display: block;
          object-fit: cover;
        }

        @media (max-width: 900px) {
          .about-facts-grid,
          .about-two-col {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }

          .about-container {
            width: min(100% - 2.5rem, 1440px) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>

      {/* ── 1. HERO ── */}
      <section
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "4.5rem 0 3.8rem",
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
          className="about-container"
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
            Über FC Mello Wien
          </div>

          <h1
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 1.5rem",
              textTransform: "uppercase",
            }}
          >
            Von der Idee zum Verein.
            <br />
            <span style={{ color: "#0d9488" }}>Unsere Geschichte.</span>
          </h1>

          <p
            style={{
              color: "rgba(247, 247, 244, 0.75)",
              fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
              lineHeight: 1.65,
              maxWidth: "54ch",
              margin: "0 0 2.5rem",
            }}
          >
            Vom Entwurf der Vereinsstatuten auf der Universität bis zum ersten
            offiziellen Meisterschaftsspiel in der 1. Klasse: Mello steht für
            sportliche Ambition, moderne Technologie und echte Wiener Gemeinschaft.
          </p>

          {/* 3 Quick Facts */}
          <div
            className="about-facts-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              borderTop: "1px solid rgba(247, 247, 244, 0.1)",
              paddingTop: "2rem",
            }}
          >
            {FACTS.map((f, i) => (
              <div
                key={i}
                style={{
                  borderLeft: "2px solid rgba(13, 148, 136, 0.5)",
                  paddingLeft: "1.2rem",
                }}
              >
                <div
                  style={{
                    color: "rgba(247, 247, 244, 0.45)",
                    fontSize: ".62rem",
                    fontWeight: 800,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    marginBottom: ".35rem",
                  }}
                >
                  {f.label}
                </div>
                <div
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "#f7f7f4",
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. WIE ALLES BEGANN & WOHIN WIR WOLLEN (MITTIG AUSGERICHTET) ── */}
      <section
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "5.5rem 0",
        }}
      >
        <div
          className="about-container about-two-col"
          style={{
            width: "min(100% - 6rem, 1440px)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: "5.5rem",
            alignItems: "center",
          }}
        >
          {/* Linke Spalte: Headline + Foto Lorenz & Dani */}
          <div>
            <div
              style={{
                color: "#0d9488",
                fontSize: ".68rem",
                fontWeight: 800,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                marginBottom: ".8rem",
              }}
            >
              Der Werdegang
            </div>
            <h2
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: "0 0 1.8rem",
                textTransform: "uppercase",
              }}
            >
              Wie alles begann &amp; wohin wir wollen.
            </h2>

            {/* Bild: Lorenz & Daniel */}
            <div style={{ position: "relative" }}>
              <img
                src="/dani-lorenz.PNG"
                alt="Lorenz Predcechtel und Daniel Rezai – FC Mello Wien"
                className="about-img"
                style={{ height: "300px" }}
              />
              <div
                style={{
                  color: "rgba(247, 247, 244, 0.45)",
                  fontSize: ".7rem",
                  marginTop: ".65rem",
                }}
              >
                Lorenz Predcechtel (Kassier) &amp; Daniel Rezai (Obmann)
              </div>
            </div>
          </div>

          {/* Rechte Spalte: Fließtext-Story */}
          <div
            style={{
              color: "rgba(247, 247, 244, 0.72)",
              fontSize: "0.98rem",
              lineHeight: 1.85,
            }}
          >
            <p style={{ margin: "0 0 1.5rem" }}>
              Alles begann zu <strong>Jahresbeginn 2025</strong> mit der Vision
              von Gründer und Obmann Daniel Rezai. Als Wirtschaftsrecht-Student
              nutzte er sein Fachwissen im Vereinsrecht, um die Statuten für
              einen zeitgemäßen Wiener Fußballclub eigenständig aufzusetzen. Am{" "}
              <strong style={{ color: "#f7f7f4" }}>08.10.2025</strong> wurde der
              FC Mello Wien offiziell rechtlich gegründet.
            </p>

            <p style={{ margin: "0 0 1.5rem" }}>
              Bereits in der Gründungsphase stieß Lorenz Predcechtel als Kassier
              dazu und unterstützt die Vision seither von Tag 1 an mit vollem
              Einsatz. Ein großer Meilenstein folgte am{" "}
              <strong style={{ color: "#f7f7f4" }}>26.05.2026</strong>: Der
              Vorstand des Wiener Fußballverbands (WFV) akzeptierte die Aufnahme
              des Vereins.
            </p>

            <p style={{ margin: 0 }}>
              Jetzt schlägt das nächste Kapitel auf: Am{" "}
              <strong style={{ color: "#0d9488" }}>06.09.2026</strong> steht das
              historische allererste Ligaspiel der Vereinsgeschichte in der 1.
              Klasse an. Wir starten ganz unten, mit klarer Richtung nach oben.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Q&A / INTERVIEW + POLIZEISPORTANLAGE BILD ── */}
      <section
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "5.5rem 0",
          background: "rgba(247, 247, 244, 0.015)",
        }}
      >
        <div
          className="about-container"
          style={{
            width: "min(100% - 6rem, 1440px)",
            margin: "0 auto",
            maxWidth: "960px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                background: "rgba(13, 148, 136, 0.15)",
                color: "#0d9488",
                border: "1px solid rgba(13, 148, 136, 0.35)",
                borderRadius: "99px",
                padding: ".25rem .85rem",
                fontSize: ".52rem",
                fontWeight: 800,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: ".8rem",
              }}
            >
              Im Gespräch mit Obmann Daniel Rezai
            </span>
            <h2
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Hinter den Kulissen von Mello
            </h2>
          </div>

          <div className="qa-bubble">
            <div
              style={{
                color: "rgba(247, 247, 244, 0.5)",
                fontSize: ".75rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                marginBottom: ".4rem",
              }}
            >
              Frage: Wie kam es zu dem Namen FC Mello Wien?
            </div>
            <p
              style={{
                fontSize: "1.02rem",
                lineHeight: 1.75,
                color: "#f7f7f4",
                margin: 0,
              }}
            >
              <em>
                „Das ist tatsächlich eine persönliche und etwas witzige Story. Ich
                komme ursprünglich aus dem Salzburger Land und war dort mit meinen
                iranischen Wurzeln weit und breit der Einzige mit dünklerer
                Hautfarbe. Mein Spitzname in der Jugend war deshalb schnell
                "Karamello", woraus mit der Zeit einfach "Mello"" wurde. Als es um
                den Namen für den Verein ging, war klar: Mello steht für Herkunft,
                Selbstironie und eine offene Tür für jeden.“
              </em>
            </p>
          </div>

          <div className="qa-bubble" style={{ marginBottom: "2.8rem" }}>
            <div
              style={{
                color: "rgba(247, 247, 244, 0.5)",
                fontSize: ".75rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                marginBottom: ".4rem",
              }}
            >
              Frage: Was unterscheidet Mello von anderen Wiener Vereinen?
            </div>
            <p
              style={{
                fontSize: "1.02rem",
                lineHeight: 1.75,
                color: "#f7f7f4",
                margin: 0,
              }}
            >
              <em>
                „Wir denken Amateurfußball so professionell und zeitgemäß wie
                möglich: Jede Partie und auch manche Trainingseinheiten werden mit einer KI-Kamera
                begleitet, taktisch analysiert und im Re-Live auf unserem Twitch-Kanal
                gestreamt. Aber genauso wichtig ist uns das Leben abseits der 90
                Minuten: Ob gemeinsame Regeneration am Kaiserwasser,
                Volleyballmatches auf der Polizei-Sportanlage oder taktische
                Vorbereitung am Wochenende. Mello ist kein anonymer Club,
                sondern eine echte, eng verbundene Community.“
              </em>
            </p>
          </div>

          {/* Bild: Polizei-Sportanlage am Kaiserwasser */}
          <div style={{ position: "relative" }}>
            <img
              src="/Polizeisportanlage.jpg"
              alt="Polizei-Sportanlage am Kaiserwasser, 1220 Wien"
              className="about-img"
              style={{ height: "380px" }}
            />
            <div
              style={{
                color: "rgba(247, 247, 244, 0.45)",
                fontSize: ".7rem",
                marginTop: ".65rem",
                textAlign: "center",
              }}
            >
              Unsere Heimstätte: Die Polizei-Sportanlage direkt am Kaiserwasser (Dampfschiffhaufen 2, 1220 Wien)
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FINAL CTA & MITWIRKEN ── */}
      <section
        style={{
          padding: "5.5rem 0",
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(13,148,136,0.08) 100%)",
        }}
      >
        <div
          className="about-container"
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
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: "0 0 1rem",
                textTransform: "uppercase",
              }}
            >
              Werde Teil von FC Mello Wien
            </h2>
            <p
              style={{
                color: "rgba(247, 247, 244, 0.75)",
                fontSize: "0.98rem",
                lineHeight: 1.65,
                margin: "0 0 1rem",
              }}
            >
              Du möchtest bei uns mittrainieren oder den Club als Mitglied
              unterstützen? Schreib uns direkt.
            </p>
            <p
              style={{
                color: "rgba(247, 247, 244, 0.6)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                margin: 0,
                borderLeft: "2px solid rgba(13, 148, 136, 0.5)",
                paddingLeft: "1rem",
              }}
            >
              Und falls du nicht selbst spielen willst, dich aber für das
              Projekt begeisterst und in einer anderen Rolle mitwirken möchtest
              (Content, Organisation oder etwas völlig Eigenes): Melde dich
              genauso gern. Wir bauen gerade alles auf und sind offen für deine
              Ideen.
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/kontakt"
              style={{
                border: "1px solid rgba(247, 247, 244, 0.25)",
                color: "#f7f7f4",
                fontFamily: "var(--font-body), Arial, sans-serif",
                fontSize: ".75rem",
                fontWeight: 800,
                letterSpacing: ".14em",
                textDecoration: "none",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                borderRadius: "99px",
                display: "inline-flex",
                alignItems: "center",
                transition: "all .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0d9488";
                e.currentTarget.style.color = "#0d9488";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(247, 247, 244, 0.25)";
                e.currentTarget.style.color = "#f7f7f4";
              }}
            >
              Kontakt aufnehmen
            </Link>

            <Link
              href="/mitgliedschaft"
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
              Mitglied werden&nbsp;→
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}