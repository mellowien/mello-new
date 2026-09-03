"use client";

import Link from "next/link";
import { useState } from "react";

const FACTS = [
  { label: "Gründungsdatum", value: "08.10.2025" },
  { label: "Liga", value: "1. Klasse A (7. Liga Österreichs)" },
  {
    label: "Heimstätte",
    value: "Polizei-Sportanlage, Dampfschiffhaufen 2, 1220 Wien",
  },
];

function MobileInterview() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const questions = [
    {
      question: "Wie kam es zu dem Namen FC Mello Wien?",
      answer:
        '„Das ist tatsächlich eine persönliche und etwas witzige Story. Ich komme ursprünglich aus dem Salzburger Land und war dort mit meinen iranischen Wurzeln weit und breit der Einzige mit dünklerer Hautfarbe. Mein Spitzname in der Jugend war deshalb schnell „Karamello“, woraus mit der Zeit einfach „Mello“ wurde. Als es um den Namen für den Verein ging, war klar: Mello steht für Herkunft, Selbstironie und eine offene Tür für jeden.“',
    },
    {
      question: "Was unterscheidet Mello von anderen Wiener Vereinen?",
      answer:
        "„Wir denken Amateurfußball so professionell und zeitgemäß wie möglich: Jede Partie und auch manche Trainingseinheiten werden mit einer KI-Kamera begleitet, taktisch analysiert und im Re-Live auf unserem Twitch-Kanal gestreamt. Aber genauso wichtig ist uns das Leben abseits der 90 Minuten: Ob gemeinsame Regeneration am Kaiserwasser, Volleyballmatches auf der Polizei-Sportanlage oder taktische Vorbereitung am Wochenende. Mello ist kein anonymer Club, sondern eine echte, eng verbundene Community.“",
    },
  ];

  return (
    <div className="about-mobile-interview">
      {questions.map((item, index) => {
        const isOpen = openQuestion === index;

        return (
          <div
            className={`about-mobile-question ${isOpen ? "is-open" : ""}`}
            key={item.question}
          >
            <button
              type="button"
              className="about-mobile-question-button"
              aria-expanded={isOpen}
              onClick={() =>
                setOpenQuestion((current) =>
                  current === index ? null : index,
                )
              }
            >
              <span>{item.question}</span>
              <span className="about-mobile-question-icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div className="about-mobile-question-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main
      className="about-page"
      style={{
        background: "var(--mello-black, #080808)",
        color: "#f7f7f4",
        fontFamily: "var(--font-body), Arial, sans-serif",
        minHeight: "100vh",
        paddingTop: "88px",
      }}
    >
      <style>{`
        .about-mobile-only {
          display: none;
        }

        .about-desktop-only {
          display: block;
        }

        .qa-bubble {
          border-left: 2px solid #0d9488;
          margin-bottom: 2.2rem;
          padding-left: 1.5rem;
        }

        .about-img {
          border: 1px solid rgba(247, 247, 244, 0.12);
          border-radius: 1rem;
          display: block;
          object-fit: cover;
          width: 100%;
        }

        @media (max-width: 900px) {
          .about-facts-grid,
          .about-two-col {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }

          .about-container {
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: min(100% - 2.5rem, 1440px) !important;
          }
        }

        @media (max-width: 768px) {
          .about-page {
            padding-top: 68px !important;
          }

          .about-desktop-only {
            display: none !important;
          }

          .about-mobile-only {
            display: block !important;
          }

          .about-container {
            width: min(100% - 2.25rem, 40rem) !important;
          }

          .about-hero {
            padding: 2.65rem 0 2.3rem !important;
          }

          .about-hero-kicker {
            font-size: .62rem !important;
            letter-spacing: .17em !important;
            margin-bottom: .75rem !important;
          }

          .about-hero-title {
            font-size: clamp(2.35rem, 11vw, 3.4rem) !important;
            letter-spacing: -.045em !important;
            line-height: .95 !important;
            margin-bottom: 1.1rem !important;
          }

          .about-hero-intro {
            color: rgba(247,247,244,.68) !important;
            font-size: .96rem !important;
            line-height: 1.65 !important;
            margin-bottom: 1.55rem !important;
          }

          .about-facts-grid {
            border-top: 0 !important;
            gap: .7rem !important;
            padding-top: 0 !important;
          }

          .about-fact {
            background: rgba(247,247,244,.035);
            border: 1px solid rgba(247,247,244,.1);
            border-left: 2px solid #0d9488 !important;
            border-radius: .75rem;
            box-sizing: border-box;
            min-height: 4.85rem;
            padding: .78rem .85rem !important;
          }

          .about-fact-label {
            font-size: .52rem !important;
            letter-spacing: .13em !important;
            margin-bottom: .3rem !important;
          }

          .about-fact-value {
            font-size: .86rem !important;
            line-height: 1.32 !important;
          }

          .about-story-section {
            padding: 3.5rem 0 !important;
          }

          .about-story-grid {
            gap: 1.65rem !important;
          }

          .about-story-kicker {
            font-size: .61rem !important;
            letter-spacing: .15em !important;
            margin-bottom: .7rem !important;
          }

          .about-story-title {
            font-size: clamp(1.9rem, 9vw, 2.65rem) !important;
            line-height: 1 !important;
            margin-bottom: 1.3rem !important;
          }

          .about-founder-image {
            height: 225px !important;
          }

          .about-image-caption {
            font-size: .62rem !important;
            line-height: 1.45 !important;
            margin-top: .55rem !important;
          }

          .about-story-text {
            color: rgba(247,247,244,.72) !important;
            font-size: .94rem !important;
            line-height: 1.72 !important;
          }

          .about-story-text p {
            margin-bottom: 1.15rem !important;
          }

          .about-interview-section {
            padding: 3.5rem 0 !important;
          }

          .about-interview-heading {
            margin-bottom: 1.6rem !important;
            text-align: left !important;
          }

          .about-interview-badge {
            font-size: .47rem !important;
            letter-spacing: .11em !important;
            margin-bottom: .65rem !important;
            padding: .24rem .68rem !important;
          }

          .about-interview-title {
            font-size: clamp(1.7rem, 8vw, 2.25rem) !important;
            line-height: 1.04 !important;
          }

          .about-mobile-question {
            background: rgba(247,247,244,.03);
            border: 1px solid rgba(247,247,244,.12);
            border-radius: .75rem;
            margin-bottom: .65rem;
            overflow: hidden;
          }

          .about-mobile-question.is-open {
            border-color: rgba(13,148,136,.56);
          }

          .about-mobile-question-button {
            align-items: center;
            background: transparent;
            border: 0;
            color: #f7f7f4;
            cursor: pointer;
            display: flex;
            font-family: Arial, Helvetica, sans-serif;
            font-size: .75rem;
            font-weight: 800;
            gap: 1rem;
            justify-content: space-between;
            letter-spacing: .055em;
            line-height: 1.35;
            padding: 1rem .9rem;
            text-align: left;
            text-transform: uppercase;
            width: 100%;
          }

          .about-mobile-question-icon {
            align-items: center;
            color: #0d9488;
            display: inline-flex;
            flex: 0 0 auto;
            font-size: 1.35rem;
            font-weight: 400;
            height: 1.4rem;
            justify-content: center;
            line-height: 1;
            width: 1.4rem;
          }

          .about-mobile-question-answer {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows .25s ease;
          }

          .about-mobile-question.is-open .about-mobile-question-answer {
            grid-template-rows: 1fr;
          }

          .about-mobile-question-answer p {
            color: rgba(247,247,244,.72);
            font-size: .91rem;
            line-height: 1.7;
            margin: 0;
            min-height: 0;
            overflow: hidden;
            padding: 0 .9rem;
            transition: padding .25s ease;
          }

          .about-mobile-question.is-open .about-mobile-question-answer p {
            padding: 0 .9rem 1rem;
          }

          .about-venue-wrap {
            margin-top: 1.75rem !important;
          }

          .about-venue-image {
            height: 225px !important;
          }

          .about-venue-caption {
            font-size: .62rem !important;
            line-height: 1.45 !important;
            margin: .55rem auto 0 !important;
            max-width: 34ch;
          }

          .about-cta-section {
            padding: 3.6rem 0 3.9rem !important;
          }

          .about-cta-wrap {
            align-items: stretch !important;
            display: block !important;
          }

          .about-cta-title {
            font-size: clamp(1.85rem, 8.8vw, 2.65rem) !important;
            line-height: 1 !important;
            margin-bottom: .9rem !important;
          }

          .about-cta-intro {
            font-size: .95rem !important;
            line-height: 1.65 !important;
            margin-bottom: .9rem !important;
          }

          .about-cta-note {
            font-size: .84rem !important;
            line-height: 1.58 !important;
          }

          .about-cta-actions {
            display: flex !important;
            flex-direction: column !important;
            gap: .7rem !important;
            margin-top: 1.55rem !important;
            width: 100% !important;
          }

          .about-cta-actions a {
            box-sizing: border-box !important;
            justify-content: center !important;
            min-height: 51px !important;
            padding: .95rem 1rem !important;
            text-align: center !important;
            width: 100% !important;
          }
        }

        @media (max-width: 360px) {
          .about-container {
            width: min(100% - 2rem, 40rem) !important;
          }

          .about-hero-title {
            font-size: 2.2rem !important;
          }

          .about-founder-image,
          .about-venue-image {
            height: 205px !important;
          }

          .about-mobile-question-button {
            font-size: .69rem !important;
          }

          .about-mobile-question-answer p {
            font-size: .86rem !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        className="about-hero"
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
            className="about-hero-kicker"
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
            className="about-hero-title"
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
            className="about-hero-intro"
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
            sportliche Ambition, moderne Technologie und echte Wiener
            Gemeinschaft.
          </p>

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
            {FACTS.map((fact) => (
              <div
                className="about-fact"
                key={fact.label}
                style={{
                  borderLeft: "2px solid rgba(13, 148, 136, 0.5)",
                  paddingLeft: "1.2rem",
                }}
              >
                <div
                  className="about-fact-label"
                  style={{
                    color: "rgba(247, 247, 244, 0.45)",
                    fontSize: ".62rem",
                    fontWeight: 800,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    marginBottom: ".35rem",
                  }}
                >
                  {fact.label}
                </div>

                <div
                  className="about-fact-value"
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "#f7f7f4",
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section
        className="about-story-section"
        style={{
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "5.5rem 0",
        }}
      >
        <div
          className="about-container about-two-col about-story-grid"
          style={{
            width: "min(100% - 6rem, 1440px)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: "5.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="about-story-kicker"
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
              className="about-story-title"
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

            <div style={{ position: "relative" }}>
              <img
                src="/dani-lorenz.PNG"
                alt="Lorenz Predcechtel und Daniel Rezai – FC Mello Wien"
                className="about-img about-founder-image"
                style={{ height: "300px" }}
              />

              <div
                className="about-image-caption"
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

          <div
            className="about-story-text"
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
              Vorstand des Wiener Fußballverbands akzeptierte die Aufnahme des
              Vereins.
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

      {/* INTERVIEW + VENUE */}
      <section
        className="about-interview-section"
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
          <div
            className="about-interview-heading"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span
              className="about-interview-badge"
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
              className="about-interview-title"
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

          <div className="about-desktop-only">
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
                  „Das ist tatsächlich eine persönliche und etwas witzige Story.
                  Ich komme ursprünglich aus dem Salzburger Land und war dort mit
                  meinen iranischen Wurzeln weit und breit der Einzige mit
                  dünklerer Hautfarbe. Mein Spitzname in der Jugend war deshalb
                  schnell „Karamello“, woraus mit der Zeit einfach „Mello“ wurde.
                  Als es um den Namen für den Verein ging, war klar: Mello steht
                  für Herkunft, Selbstironie und eine offene Tür für jeden.“
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
                  möglich: Jede Partie und auch manche Trainingseinheiten werden
                  mit einer KI-Kamera begleitet, taktisch analysiert und im
                  Re-Live auf unserem Twitch-Kanal gestreamt. Aber genauso wichtig
                  ist uns das Leben abseits der 90 Minuten: Ob gemeinsame
                  Regeneration am Kaiserwasser, Volleyballmatches auf der
                  Polizei-Sportanlage oder taktische Vorbereitung am Wochenende.
                  Mello ist kein anonymer Club, sondern eine echte, eng
                  verbundene Community.“
                </em>
              </p>
            </div>
          </div>

          <div className="about-mobile-only">
            <MobileInterview />
          </div>

          <div
            className="about-venue-wrap"
            style={{ position: "relative" }}
          >
            <img
              src="/Polizeisportanlage-3.jpg"
              alt="Polizei-Sportanlage am Kaiserwasser, 1220 Wien"
              className="about-img about-venue-image"
              style={{ height: "380px" }}
            />

            <div
              className="about-venue-caption"
              style={{
                color: "rgba(247, 247, 244, 0.45)",
                fontSize: ".7rem",
                marginTop: ".65rem",
                textAlign: "center",
              }}
            >
              Unsere Heimstätte: Die Polizei-Sportanlage direkt am Kaiserwasser
              (Dampfschiffhaufen 2, 1220 Wien)
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="about-cta-section"
        style={{
          padding: "5.5rem 0",
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(13,148,136,0.08) 100%)",
        }}
      >
        <div
          className="about-container about-cta-wrap"
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
              className="about-cta-title"
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
              className="about-cta-intro"
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
              className="about-cta-note"
              style={{
                color: "rgba(247, 247, 244, 0.6)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                margin: 0,
                borderLeft: "2px solid rgba(13, 148, 136, 0.5)",
                paddingLeft: "1rem",
              }}
            >
              Und falls du nicht selbst spielen willst, dich aber für das Projekt
              begeisterst und in einer anderen Rolle mitwirken möchtest (Content,
              Organisation oder etwas völlig Eigenes): Melde dich genauso gern.
              Wir bauen gerade alles auf und sind offen für deine Ideen.
            </p>
          </div>

          <div
            className="about-cta-actions"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
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
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = "#0d9488";
                event.currentTarget.style.color = "#0d9488";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor =
                  "rgba(247, 247, 244, 0.25)";
                event.currentTarget.style.color = "#f7f7f4";
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
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#14b8a6";
                event.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "#0d9488";
                event.currentTarget.style.transform = "translateY(0)";
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