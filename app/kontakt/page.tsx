"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Anliegen = "allgemein" | "spieler" | "community";

type AnliegenContent = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  label: string;
  formTitle: string;
  messageLabel: string;
  placeholder: string;
  infoTitle: string;
  infoText: string;
  submitText: string;
};

const CONTENT: Record<Anliegen, AnliegenContent> = {
  allgemein: {
    eyebrow: "Kontakt",
    title: "Lass uns",
    accent: "sprechen.",
    intro:
      "Fragen, Ideen, Kooperationen oder ein erstes Kennenlernen: Schreib uns, worum es geht. Wir melden uns persönlich bei dir.",
    label: "Direkter Draht zu Mello",
    formTitle: "Deine Nachricht",
    messageLabel: "Worum geht es?",
    placeholder: "Erzähl uns kurz, worum es geht …",
    infoTitle: "Mello lebt vom Austausch.",
    infoText:
      "Wir bauen einen Verein, der offen ist für neue Menschen, gute Ideen und echte Zusammenarbeit. Deine Nachricht landet direkt bei uns.",
    submitText: "Nachricht senden",
  },
  spieler: {
    eyebrow: "Spieleranfrage",
    title: "Komm ins",
    accent: "Team.",
    intro:
      "Du willst bei FC Mello Wien mittrainieren oder dich für unseren Kader vorstellen? Erzähl uns kurz, wer du bist und was du mitbringst.",
    label: "Aktiv am Platz",
    formTitle: "Deine Spieleranfrage",
    messageLabel: "Dein Fußballprofil",
    placeholder:
      "Alter, Position, bisherige Vereine, Spielerfahrung und mögliche Termine für ein Probetraining …",
    infoTitle: "Zeig, was in dir steckt.",
    infoText:
      "Ob Talent, Rückkehrer oder erfahrener Kicker: Entscheidend sind Einsatz, Verlässlichkeit und Lust auf ein Team, das gemeinsam wachsen will.",
    submitText: "Spieleranfrage senden",
  },
  community: {
    eyebrow: "Community & Orga",
    title: "Gestalte",
    accent: "Mello mit.",
    intro:
      "Ein Verein wächst nicht nur auf dem Platz. Wenn du Ideen, Zeit oder Fähigkeiten einbringen möchtest, freuen wir uns, von dir zu hören.",
    label: "Verein mitgestalten",
    formTitle: "Dein Beitrag für Mello",
    messageLabel: "Wie möchtest du mitgestalten?",
    placeholder:
      "Zum Beispiel Spieltag, Events, Social Media, Foto/Video, Mello TV, Sponsoring, Organisation oder Vereinsarbeit …",
    infoTitle: "Der Verein entsteht gemeinsam.",
    infoText:
      "Spieltag, Event, Social Media, Mello TV, Sponsoring oder Organisation: Jede Fähigkeit und jede helfende Hand bringt Mello weiter.",
    submitText: "Mitgestalten",
  },
};

function resolveAnliegen(value: string | null): Anliegen {
  if (value === "spieler") return "spieler";
  if (value === "community") return "community";
  return "allgemein";
}

function KontaktContent() {
  const searchParams = useSearchParams();
  const anliegen = resolveAnliegen(searchParams.get("anliegen"));
  const content = CONTENT[anliegen];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
    anliegen,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const nextAnliegen = resolveAnliegen(searchParams.get("anliegen"));

    setFormData((current) => ({
      ...current,
      anliegen: nextAnliegen,
    }));
  }, [searchParams]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        alert(
          `Es gab ein Problem beim Senden.${
            data?.error ? `\n\n${data.error}` : ""
          }`
        );
        return;
      }

      setShowPopup(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        website: "",
        anliegen,
      });
    } catch {
      alert("Netzwerkfehler. Bitte versuche es noch einmal.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      <style>{`
        .contact-page {
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

        .contact-page * {
          box-sizing: border-box;
        }

        .contact-shell {
          width: min(100% - 6rem, 1440px);
          margin: 0 auto;
        }

        .contact-hero {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          padding: 4.7rem 0 4.3rem;
          background:
            radial-gradient(ellipse 44% 115% at 94% 48%, rgba(13, 148, 136, .14), transparent 74%),
            linear-gradient(115deg, #080808 0%, #080808 55%, #0b1211 100%);
        }

        .contact-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
        }

        .contact-eyebrow,
        .contact-kicker {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: var(--teal);
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .contact-eyebrow::before,
        .contact-kicker::before {
          content: "";
          width: .4rem;
          height: .4rem;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 10px rgba(13, 148, 136, .7);
        }

        .contact-title {
          max-width: 850px;
          margin: 1.25rem 0 1.35rem;
          font-size: clamp(3.6rem, 7vw, 7.4rem);
          font-weight: 900;
          letter-spacing: -.075em;
          line-height: .82;
          text-transform: uppercase;
        }

        .contact-title span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1.25px rgba(247, 247, 244, .78);
        }

        .contact-title span em {
          color: var(--teal);
          font-style: normal;
          -webkit-text-stroke: 0;
        }

        .contact-intro {
          max-width: 56ch;
          margin: 0;
          color: rgba(247, 247, 244, .72);
          font-size: clamp(1rem, 1.25vw, 1.12rem);
          line-height: 1.72;
        }

        .contact-body {
          display: grid;
          grid-template-columns: minmax(0, 1.16fr) minmax(280px, .84fr);
          gap: clamp(2.5rem, 7vw, 8rem);
          padding: 5.4rem 0 6rem;
        }

        .contact-form-card {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 1.15rem;
          padding: clamp(1.55rem, 3vw, 2.55rem);
          background:
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .055),
              rgba(247, 247, 244, .018) 56%,
              rgba(13, 148, 136, .045)
            );
        }

        .contact-form-card::after {
          content: "";
          position: absolute;
          width: 20rem;
          height: 20rem;
          right: -13rem;
          top: -13rem;
          border-radius: 50%;
          border: 1px solid rgba(13, 148, 136, .15);
          pointer-events: none;
        }

        .contact-form-heading {
          position: relative;
          z-index: 1;
          margin: 1.05rem 0 2.35rem;
          color: var(--paper);
          font-size: clamp(1.45rem, 2vw, 1.85rem);
          font-weight: 900;
          letter-spacing: -.035em;
          line-height: 1;
          text-transform: uppercase;
        }

        .contact-field {
          position: relative;
          z-index: 1;
          margin-bottom: 1.4rem;
        }

        .contact-label {
          display: block;
          margin-bottom: .58rem;
          color: rgba(247, 247, 244, .48);
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .contact-input {
          width: 100%;
          border: 1px solid rgba(247, 247, 244, .13);
          border-radius: .62rem;
          outline: none;
          background: rgba(0, 0, 0, .28);
          color: var(--paper);
          font: inherit;
          font-size: .95rem;
          line-height: 1.5;
          padding: .9rem 1rem;
          transition:
            border-color .2s ease,
            background .2s ease,
            box-shadow .2s ease;
        }

        .contact-input:focus {
          border-color: rgba(13, 148, 136, .82);
          background: rgba(13, 148, 136, .05);
          box-shadow: 0 0 0 3px rgba(13, 148, 136, .11);
        }

        .contact-input::placeholder {
          color: rgba(247, 247, 244, .28);
        }

        .contact-textarea {
          min-height: 11rem;
          resize: vertical;
        }

        .contact-submit {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 3.35rem;
          gap: .65rem;
          margin-top: .45rem;
          border: 1px solid var(--teal);
          border-radius: 99px;
          background: var(--teal);
          color: #080808;
          cursor: pointer;
          font: inherit;
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
          transition:
            transform .2s ease,
            background .2s ease,
            border-color .2s ease;
        }

        .contact-submit:hover:not(:disabled) {
          border-color: var(--teal-bright);
          background: var(--teal-bright);
          transform: translateY(-1px);
        }

        .contact-submit:disabled {
          cursor: not-allowed;
          opacity: .65;
        }

        .contact-spinner {
          width: .9rem;
          height: .9rem;
          border: 2px solid rgba(8, 8, 8, .35);
          border-top-color: #080808;
          border-radius: 50%;
          animation: contact-spin .7s linear infinite;
        }

        @keyframes contact-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .contact-aside {
          padding: .65rem 0;
        }

        .contact-aside-title {
          max-width: 10ch;
          margin: 1.05rem 0 1.5rem;
          font-size: clamp(2.15rem, 4vw, 4rem);
          font-weight: 900;
          letter-spacing: -.065em;
          line-height: .86;
          text-transform: uppercase;
        }

        .contact-aside-text {
          max-width: 37ch;
          margin: 0;
          color: var(--muted);
          font-size: .95rem;
          line-height: 1.78;
        }

        .contact-info {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line);
        }

        .contact-info-label {
          margin: 0 0 .55rem;
          color: rgba(247, 247, 244, .43);
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .contact-mail {
          color: var(--teal);
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
        }

        .contact-mail:hover {
          color: var(--teal-bright);
        }

        .contact-note {
          margin-top: 1.2rem;
          color: rgba(247, 247, 244, .38);
          font-size: .72rem;
          line-height: 1.55;
        }

        .contact-overlay {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: grid;
          place-items: center;
          padding: 1.5rem;
          background: rgba(0, 0, 0, .76);
          backdrop-filter: blur(10px);
        }

        .contact-popup {
          width: min(100%, 30rem);
          border: 1px solid rgba(247, 247, 244, .14);
          border-radius: 1.15rem;
          padding: 2.5rem;
          background:
            radial-gradient(
              circle at 85% 10%,
              rgba(13, 148, 136, .16),
              transparent 37%
            ),
            #0d0e0e;
          box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, .58);
        }

        .contact-popup h2 {
          margin: 1rem 0 .85rem;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: .88;
          text-transform: uppercase;
        }

        .contact-popup p {
          margin: 0 0 1.8rem;
          color: var(--muted);
          line-height: 1.7;
        }

        .contact-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.85rem;
          border: 1px solid var(--teal);
          border-radius: 99px;
          padding: 0 1.35rem;
          background: var(--teal);
          color: #080808;
          cursor: pointer;
          font: inherit;
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .contact-shell {
            width: min(100% - 2.5rem, 1440px);
          }

          .contact-body {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            padding: 4rem 0 4.5rem;
          }

          .contact-aside {
            padding: 0;
          }

          .contact-aside-title {
            max-width: 14ch;
          }
        }

        @media (max-width: 560px) {
          .contact-hero {
            padding: 3.6rem 0 3.3rem;
          }

          .contact-title {
            font-size: clamp(3.25rem, 16vw, 4.8rem);
          }

          .contact-form-card,
          .contact-popup {
            border-radius: .9rem;
            padding: 1.4rem;
          }

          .contact-textarea {
            min-height: 12.5rem;
          }
        }
      `}</style>

      <section className="contact-hero">
        <div className="contact-shell contact-hero-inner">
          <div className="contact-eyebrow">{content.eyebrow}</div>

          <h1 className="contact-title">
            {content.title}
            <span>
              <em>{content.accent}</em>
            </span>
          </h1>

          <p className="contact-intro">{content.intro}</p>
        </div>
      </section>

      <section className="contact-shell contact-body">
        <form className="contact-form-card" onSubmit={handleSubmit}>
          <div className="contact-kicker">{content.label}</div>
          <h2 className="contact-form-heading">{content.formTitle}</h2>

          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{ display: "none" }}
          />

          <input type="hidden" name="anliegen" value={formData.anliegen} />

          <div className="contact-field">
            <label className="contact-label" htmlFor="name">
              Name
            </label>
            <input
              className="contact-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="email">
              E-Mail
            </label>
            <input
              className="contact-input"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="message">
              {content.messageLabel}
            </label>
            <textarea
              className="contact-input contact-textarea"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={content.placeholder}
              required
            />
          </div>

          <button
            className="contact-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <span className="contact-spinner" />}
            {isSubmitting ? "Wird gesendet …" : content.submitText}
            {!isSubmitting && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <aside className="contact-aside">
          <div className="contact-kicker">{content.label}</div>
          <h2 className="contact-aside-title">{content.infoTitle}</h2>
          <p className="contact-aside-text">{content.infoText}</p>

          <div className="contact-info">
            <p className="contact-info-label">E-Mail</p>
            <a className="contact-mail" href="mailto:kontakt@mellowien.at">
              kontakt@mellowien.at
            </a>
            <p className="contact-note">
              Wir antworten dir persönlich und melden uns so bald wie möglich.
            </p>
          </div>
        </aside>
      </section>

      {showPopup && (
        <div
          className="contact-overlay"
          onClick={() => setShowPopup(false)}
          role="presentation"
        >
          <div
            className="contact-popup"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
          >
            <div className="contact-kicker">Danke</div>
            <h2 id="contact-popup-title">Anfrage versendet.</h2>
            <p>
              Danke für deine Nachricht. Wir melden uns so bald wie möglich bei
              dir.
            </p>
            <button
              className="contact-close"
              type="button"
              onClick={() => setShowPopup(false)}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Kontakt() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: "100vh",
            background: "#080808",
            paddingTop: "88px",
          }}
        />
      }
    >
      <KontaktContent />
    </Suspense>
  );
}