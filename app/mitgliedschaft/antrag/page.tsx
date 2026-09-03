"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ContributionPlan = "monthly" | "annual";

const PLAN_DETAILS: Record<
  ContributionPlan,
  {
    eyebrow: string;
    price: string;
    interval: string;
    description: string;
  }
> = {
  monthly: {
    eyebrow: "Flexibel unterstützen",
    price: "10 €",
    interval: "monatlich",
    description:
      "Dein regelmäßiger Beitrag unterstützt Training, Spielbetrieb und den langfristigen Aufbau von FC Mello Wien.",
  },
  annual: {
    eyebrow: "Einmalig dabei sein",
    price: "100 €",
    interval: "jährlich",
    description:
      "Eine direkte Jahresunterstützung für alle, die von Anfang an Teil der Mello-Geschichte sein möchten.",
  },
};

export default function MitgliedschaftAntragPage() {
  const searchParams = useSearchParams();

  const [plan, setPlan] = useState<ContributionPlan>("annual");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    termsAccepted: false,
    privacyAccepted: false,
    newsletterOptIn: false,
    website: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const beitrag = searchParams.get("beitrag");

    if (beitrag === "monatlich") {
      setPlan("monthly");
    }

    if (beitrag === "jaehrlich") {
      setPlan("annual");
    }
  }, [searchParams]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.termsAccepted || !formData.privacyAccepted || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          contributionPlan: plan,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(
          result?.error ??
            "Der Antrag konnte nicht gesendet werden. Bitte versuche es erneut.",
        );
        return;
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
        termsAccepted: false,
        privacyAccepted: false,
        newsletterOptIn: false,
        website: "",
      });

      setShowSuccess(true);
    } catch {
      setSubmitError(
        "Netzwerkfehler. Bitte prüfe deine Verbindung und versuche es erneut.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const activePlan = PLAN_DETAILS[plan];

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
        .application-container {
          width: min(100% - 6rem, 1160px);
          margin: 0 auto;
        }

        .application-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(310px, .72fr);
          align-items: start;
          gap: 4.5rem;
        }

        .application-plan {
          position: sticky;
          top: 7.5rem;
          overflow: hidden;
          border: 1px solid rgba(13, 148, 136, .42);
          border-radius: 1.2rem;
          background:
            radial-gradient(
              ellipse 100% 90% at 84% 8%,
              rgba(13, 148, 136, .14) 0%,
              transparent 67%
            ),
            linear-gradient(
              145deg,
              rgba(247, 247, 244, .045),
              rgba(247, 247, 244, .018)
            );
          padding: 2rem;
        }

        .application-plan::after {
          content: "";
          position: absolute;
          width: 18rem;
          height: 18rem;
          right: -11rem;
          bottom: -12rem;
          border-radius: 50%;
          border: 1px solid rgba(13, 148, 136, .15);
          box-shadow:
            0 0 0 2.4rem rgba(13, 148, 136, .02),
            0 0 0 5rem rgba(13, 148, 136, .012);
          pointer-events: none;
        }

        .plan-selector {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: .7rem;
          margin-bottom: 1.8rem;
        }

        .plan-choice {
          border: 1px solid rgba(247, 247, 244, .12);
          border-radius: .8rem;
          background: rgba(247, 247, 244, .018);
          color: rgba(247, 247, 244, .62);
          cursor: pointer;
          padding: .85rem .65rem;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          transition:
            border-color .2s ease,
            background .2s ease,
            color .2s ease;
        }

        .plan-choice:hover {
          border-color: rgba(13, 148, 136, .45);
          color: #f7f7f4;
        }

        .plan-choice.is-active {
          border-color: #0d9488;
          background: rgba(13, 148, 136, .13);
          color: #5eead4;
        }

        .application-field {
          display: flex;
          flex-direction: column;
          gap: .55rem;
        }

        .application-field label,
        .application-checkbox-label {
          color: rgba(247, 247, 244, .58);
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .application-field input,
        .application-field textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(247, 247, 244, .13);
          border-radius: .7rem;
          outline: none;
          background: rgba(247, 247, 244, .025);
          color: #f7f7f4;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .95rem;
          line-height: 1.5;
          padding: .9rem 1rem;
          transition:
            border-color .2s ease,
            background .2s ease,
            box-shadow .2s ease;
        }

        .application-field input:focus,
        .application-field textarea:focus {
          border-color: rgba(13, 148, 136, .78);
          background: rgba(13, 148, 136, .045);
          box-shadow: 0 0 0 3px rgba(13, 148, 136, .08);
        }

        .application-field textarea {
          min-height: 8rem;
          resize: vertical;
        }

        .application-checkbox {
          display: flex;
          align-items: flex-start;
          gap: .8rem;
        }

        .application-checkbox input {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
          margin: .13rem 0 0;
          accent-color: #0d9488;
          cursor: pointer;
        }

        .application-checkbox p {
          color: rgba(247, 247, 244, .55);
          font-size: .84rem;
          line-height: 1.55;
          margin: 0;
        }

        .application-checkbox a {
          color: #0d9488;
          text-decoration: underline;
          text-underline-offset: .18rem;
        }

        .application-submit {
          width: 100%;
          border: 0;
          border-radius: 99px;
          background: #0d9488;
          color: #080808;
          cursor: pointer;
          font-family: var(--font-body), Arial, sans-serif;
          font-size: .75rem;
          font-weight: 900;
          letter-spacing: .14em;
          padding: 1rem 1.4rem;
          text-transform: uppercase;
          transition:
            background .2s ease,
            transform .2s ease,
            opacity .2s ease;
        }

        .application-submit:hover:not(:disabled) {
          background: #14b8a6;
          transform: translateY(-1px);
        }

        .application-submit:disabled {
          cursor: not-allowed;
          opacity: .6;
          transform: none;
        }

        .application-back-link {
          display: inline-flex;
          color: rgba(247, 247, 244, .55);
          font-size: .7rem;
          font-weight: 800;
          letter-spacing: .12em;
          margin-bottom: 2rem;
          text-decoration: none;
          text-transform: uppercase;
          transition: color .2s ease;
        }

        .application-back-link:hover {
          color: #0d9488;
        }

        .application-success-layer {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          background: rgba(0, 0, 0, .78);
          backdrop-filter: blur(10px);
        }

        .application-success-modal {
          width: min(100%, 33rem);
          border: 1px solid rgba(13, 148, 136, .45);
          border-radius: 1.1rem;
          background:
            radial-gradient(
              ellipse 90% 90% at 50% 0%,
              rgba(13, 148, 136, .13),
              transparent 68%
            ),
            #0b0c0c;
          box-shadow: 0 2rem 5rem rgba(0, 0, 0, .55);
          padding: 2.6rem 2rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .application-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }

          .application-plan {
            position: relative;
            top: auto;
            order: -1;
          }
        }

        @media (max-width: 760px) {
          .application-container {
            width: min(100% - 2.5rem, 1160px) !important;
          }

          .application-hero {
            padding: 3.5rem 0 3rem !important;
          }

          .application-form-section {
            padding: 3.5rem 0 5rem !important;
          }
        }

        @media (max-width: 520px) {
          .application-name-grid {
            grid-template-columns: 1fr !important;
          }

          .plan-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        className="application-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--mello-line, #222222)",
          padding: "4.5rem 0 3.8rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 55% 70% at 85% 40%, rgba(13,148,136,.1) 0%, transparent 70%)",
          }}
        />

        <div
          className="application-container"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link href="/mitgliedschaft/vorteile" className="application-back-link">
            ← Zur Mitgliedschaft
          </Link>

          <div
            style={{
              color: "#0d9488",
              fontSize: ".68rem",
              fontWeight: 800,
              letterSpacing: ".18em",
              marginBottom: ".9rem",
              textTransform: "uppercase",
            }}
          >
            Mitglied &amp; Unterstützer
          </div>

          <h1
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: "clamp(2.5rem, 4.8vw, 4.4rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              margin: "0 0 1.25rem",
              textTransform: "uppercase",
            }}
          >
            Starte deine
            <br />
            <span style={{ color: "#0d9488" }}>Mitgliedschaft.</span>
          </h1>

          <p
            style={{
              color: "rgba(247, 247, 244, .68)",
              fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "60ch",
            }}
          >
            Werde Teil der ersten offiziellen Mello-Community. Nach deinem Antrag
            melden wir uns persönlich mit den nächsten Schritten bei dir.
          </p>
        </div>
      </section>

      {/* ANTRAGSFORMULAR */}
      <section
        className="application-form-section"
        style={{
          padding: "5rem 0 6rem",
        }}
      >
        <div className="application-container">
          <div className="application-layout">
            <form onSubmit={handleSubmit}>
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
                Mitgliedschaft beantragen
              </div>

              <h2
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: "clamp(1.8rem, 3.2vw, 2.75rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  margin: "0 0 2.2rem",
                  textTransform: "uppercase",
                }}
              >
                Deine Angaben.
              </h2>

              {/* Honeypot gegen einfache Bots */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleTextChange}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ display: "none" }}
              />

              <div
                className="application-name-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "1.1rem",
                  marginBottom: "1.1rem",
                }}
              >
                <div className="application-field">
                  <label htmlFor="firstName">Vorname *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    disabled={isSubmitting}
                    value={formData.firstName}
                    onChange={handleTextChange}
                  />
                </div>

                <div className="application-field">
                  <label htmlFor="lastName">Nachname *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    disabled={isSubmitting}
                    value={formData.lastName}
                    onChange={handleTextChange}
                  />
                </div>
              </div>

              <div
                className="application-field"
                style={{ marginBottom: "1.1rem" }}
              >
                <label htmlFor="email">E-Mail-Adresse *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={handleTextChange}
                />
              </div>

              <div
                className="application-field"
                style={{ marginBottom: "1.1rem" }}
              >
                <label htmlFor="company">
                  Firma / Organisation (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  disabled={isSubmitting}
                  value={formData.company}
                  onChange={handleTextChange}
                />
              </div>

              <div
                className="application-field"
                style={{ marginBottom: "2rem" }}
              >
                <label htmlFor="message">Nachricht (optional)</label>
                <textarea
                  id="message"
                  name="message"
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={handleTextChange}
                  placeholder="Warum möchtest du Teil von Mello werden?"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <label className="application-checkbox">
                  <input
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                    required
                  />
                  <p>
                    Ich beantrage die außerordentliche Mitgliedschaft bei
                    Fußballclub Mello Wien (FC Mello Wien). Ich habe die{" "}
                    <a
                      href="/dokumente/Statuten.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Vereinsstatuten
                    </a>{" "}
                    gelesen und akzeptiere sie im Fall meiner Aufnahme. *
                  </p>
                </label>

                <label className="application-checkbox">
                  <input
                    name="privacyAccepted"
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                    required
                  />
                  <p>
                    Ich habe die{" "}
                    <Link href="/datenschutz">Datenschutzerklärung</Link>{" "}
                    gelesen und akzeptiere die Verarbeitung meiner Angaben zur
                    Bearbeitung meines Mitgliedschaftsantrags. *
                  </p>
                </label>

                <label className="application-checkbox">
                  <input
                    name="newsletterOptIn"
                    type="checkbox"
                    checked={formData.newsletterOptIn}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                  />
                  <p>
                    Ich möchte gelegentlich Neuigkeiten und Updates von FC Mello
                    Wien per E-Mail erhalten. <em>(freiwillig)</em>
                  </p>
                </label>
              </div>

              <button
                type="submit"
                className="application-submit"
                disabled={
                  !formData.termsAccepted ||
                  !formData.privacyAccepted ||
                  isSubmitting
                }
              >
                {isSubmitting
                  ? "Antrag wird gesendet …"
                  : "Mitgliedschaft beantragen →"}
              </button>

              {submitError && (
                <p
                  role="alert"
                  style={{
                    color: "#fca5a5",
                    fontSize: ".82rem",
                    lineHeight: 1.55,
                    margin: "1rem 0 0",
                  }}
                >
                  {submitError}
                </p>
              )}

              <p
                style={{
                  color: "rgba(247, 247, 244, .38)",
                  fontSize: ".75rem",
                  lineHeight: 1.55,
                  margin: "1.15rem 0 0",
                }}
              >
                Nach dem Absenden prüfen wir deinen Antrag und melden uns
                persönlich mit den weiteren Schritten sowie den Zahlungsdetails.
              </p>
            </form>

            {/* BEITRAGSZUSAMMENFASSUNG */}
            <aside className="application-plan">
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    color: "#0d9488",
                    fontSize: ".65rem",
                    fontWeight: 800,
                    letterSpacing: ".15em",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  Dein Beitrag
                </div>

                <div className="plan-selector">
                  <button
                    type="button"
                    className={`plan-choice ${
                      plan === "monthly" ? "is-active" : ""
                    }`}
                    onClick={() => setPlan("monthly")}
                    disabled={isSubmitting}
                  >
                    10 € / Monat
                  </button>

                  <button
                    type="button"
                    className={`plan-choice ${
                      plan === "annual" ? "is-active" : ""
                    }`}
                    onClick={() => setPlan("annual")}
                    disabled={isSubmitting}
                  >
                    100 € / Jahr
                  </button>
                </div>

                <div
                  style={{
                    color: "rgba(247, 247, 244, .52)",
                    fontSize: ".66rem",
                    fontWeight: 800,
                    letterSpacing: ".14em",
                    marginBottom: ".7rem",
                    textTransform: "uppercase",
                  }}
                >
                  {activePlan.eyebrow}
                </div>

                {/* PREIS */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    columnGap: ".7rem",
                    rowGap: ".2rem",
                    marginBottom: ".85rem",
                  }}
                >
                  <span
                    style={{
                      color: "#f7f7f4",
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      fontSize: "clamp(2.7rem, 4vw, 3.8rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.9,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {activePlan.price}
                  </span>

                  <span
                    style={{
                      color: "#0d9488",
                      fontFamily: "var(--font-body), Arial, sans-serif",
                      fontSize: ".74rem",
                      fontWeight: 800,
                      letterSpacing: ".11em",
                      lineHeight: 1,
                      paddingBottom: ".2rem",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {activePlan.interval}
                  </span>
                </div>

                <p
                  style={{
                    color: "rgba(247, 247, 244, .68)",
                    fontSize: ".92rem",
                    lineHeight: 1.7,
                    margin: "0 0 1.8rem",
                  }}
                >
                  {activePlan.description}
                </p>

                <div
                  style={{
                    borderTop: "1px solid rgba(247, 247, 244, .1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: ".8rem",
                    paddingTop: "1.3rem",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(247, 247, 244, .58)",
                      fontSize: ".82rem",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    ✓ Digitale Mello Member Card
                  </p>

                  <p
                    style={{
                      color: "rgba(247, 247, 244, .58)",
                      fontSize: ".82rem",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    ✓ Founding Member Status 2026/27
                  </p>

                  <p
                    style={{
                      color: "rgba(247, 247, 244, .58)",
                      fontSize: ".82rem",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    ✓ Freier Eintritt zu Heimspielen
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ERFOLGS-MODAL */}
      {showSuccess && (
        <div
          className="application-success-layer"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="application-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="membership-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              style={{
                width: ".62rem",
                height: ".62rem",
                borderRadius: "50%",
                background: "#0d9488",
                boxShadow: "0 0 15px rgba(13, 148, 136, .72)",
                margin: "0 auto 1.25rem",
              }}
            />

            <div
              style={{
                color: "#0d9488",
                fontSize: ".66rem",
                fontWeight: 800,
                letterSpacing: ".16em",
                marginBottom: ".8rem",
                textTransform: "uppercase",
              }}
            >
              Antrag erhalten
            </div>

            <h2
              id="membership-success-title"
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(2rem, 5vw, 3.3rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                margin: "0 0 1rem",
                textTransform: "uppercase",
              }}
            >
              Willkommen bei Mello.
            </h2>

            <p
              style={{
                color: "rgba(247, 247, 244, .65)",
                fontSize: ".96rem",
                lineHeight: 1.7,
                margin: "0 0 1.8rem",
              }}
            >
              Danke für deinen Antrag. Wir haben deine Angaben erhalten und
              melden uns persönlich nach der Prüfung mit den nächsten Schritten
              sowie den Zahlungsdetails bei dir.
            </p>

            <button
              type="button"
              className="application-submit"
              onClick={() => setShowSuccess(false)}
            >
              Alles klar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}