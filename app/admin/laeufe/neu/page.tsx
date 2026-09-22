"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function getTodayInputValue() {
  const now = new Date();
  const localOffset = now.getTimezoneOffset() * 60_000;

  return new Date(now.getTime() - localOffset).toISOString().slice(0, 10);
}

export default function NeuerLaufPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [runDate, setRunDate] = useState(getTodayInputValue());
  const [instructions, setInstructions] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [stravaHint, setStravaHint] = useState(
    "Nach dem Lauf in der FC-Mello-Strava-Gruppe posten.",
  );

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function checkAdminSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (!session) {
        router.replace("/login?next=/admin/laeufe/neu");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!isMounted) {
        return;
      }

      if (error || !profile || profile.role !== "admin") {
        router.replace("/spielerbereich");
        return;
      }

      setIsCheckingSession(false);
    }

    checkAdminSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedInstructions = instructions.trim();
    const trimmedStravaHint = stravaHint.trim();

    if (!trimmedTitle) {
      setErrorMessage("Bitte gib einen Titel für den Lauf ein.");
      return;
    }

    if (!runDate) {
      setErrorMessage("Bitte wähle das Datum für den Lauf.");
      return;
    }

    if (!trimmedInstructions) {
      setErrorMessage("Bitte beschreibe die Laufeinheit.");
      return;
    }

    const parsedDuration = durationMinutes
      ? Number.parseInt(durationMinutes, 10)
      : null;

    const parsedDistance = distanceKm
      ? Number.parseFloat(distanceKm.replace(",", "."))
      : null;

    if (
      parsedDuration !== null &&
      (!Number.isFinite(parsedDuration) || parsedDuration <= 0)
    ) {
      setErrorMessage("Die Dauer muss größer als 0 Minuten sein.");
      return;
    }

    if (
      parsedDistance !== null &&
      (!Number.isFinite(parsedDistance) || parsedDistance <= 0)
    ) {
      setErrorMessage("Die Distanz muss größer als 0 km sein.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login?next=/admin/laeufe/neu");
      return;
    }

    const startsAt = new Date(`${runDate}T00:00:00+02:00`).toISOString();
    const descriptionParts = [trimmedInstructions];

    if (parsedDuration) {
      descriptionParts.push(`Zielzeit: ca. ${parsedDuration} Minuten.`);
    }

    if (parsedDistance) {
      descriptionParts.push(`Zieldistanz: ca. ${parsedDistance} km.`);
    }

    if (trimmedStravaHint) {
      descriptionParts.push(trimmedStravaHint);
    }

    const { error: eventError } = await supabase.from("events").insert({
      title: trimmedTitle,
      event_type: "individual_run",
      starts_at: startsAt,
      ends_at: null,
      location_name: null,
      address: null,
      description: descriptionParts.join("\n\n"),
      required: true,
      response_deadline: null,
      all_day: true,
      created_by: session.user.id,
    });

    if (eventError) {
      setErrorMessage(
        eventError.message ||
          "Der Lauf konnte nicht angelegt werden. Bitte versuche es erneut.",
      );
      setIsSaving(false);
      return;
    }

    router.push("/admin/laeufe");
    router.refresh();
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#080808]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-500">
          Formular wird geladen …
        </p>
      </main>
    );
  }

  return (
    <main className="run-create-page">
      <style>{`
        .run-create-page {
          --black: #080808;
          --white: #f7f7f4;
          --teal: #0d9488;
          --purple: #a78bfa;
          --line: #292929;
          --muted: rgba(247, 247, 244, .58);

          background:
            radial-gradient(
              ellipse 46% 54% at 90% 6%,
              rgba(167, 139, 250, .14) 0%,
              transparent 72%
            ),
            var(--black);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding: 7rem 0 5rem;
        }

        .run-create-page *,
        .run-create-page *::before,
        .run-create-page *::after {
          box-sizing: border-box;
        }

        .run-create-container {
          margin: 0 auto;
          width: min(100% - 4rem, 860px);
        }

        .run-create-back {
          background: transparent;
          border: 0;
          color: var(--teal);
          cursor: pointer;
          font-family: inherit;
          font-size: .7rem;
          font-weight: 900;
          letter-spacing: .12em;
          padding: 0;
          text-transform: uppercase;
        }

        .run-create-back:hover {
          color: var(--white);
        }

        .run-create-header {
          border-bottom: 1px solid var(--line);
          margin: 1.6rem 0 2rem;
          padding-bottom: 2rem;
        }

        .run-create-kicker {
          color: var(--teal);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .run-create-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.7rem, 6vw, 5.2rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .86;
          margin: 0;
          text-transform: uppercase;
        }

        .run-create-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.3px var(--purple);
        }

        .run-create-intro {
          color: var(--muted);
          font-size: .96rem;
          line-height: 1.65;
          margin: 1.3rem 0 0;
          max-width: 65ch;
        }

        .run-create-form {
          background: rgba(247, 247, 244, .025);
          border: 1px solid rgba(247, 247, 244, .15);
          padding: 1.6rem;
        }

        .run-create-grid {
          display: grid;
          gap: 1.1rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .run-create-field {
          display: grid;
          gap: .5rem;
        }

        .run-create-field-wide {
          grid-column: 1 / -1;
        }

        .run-create-label {
          color: rgba(247, 247, 244, .76);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .run-create-label span {
          color: rgba(247, 247, 244, .38);
          font-weight: 700;
          letter-spacing: 0;
          text-transform: none;
        }

        .run-create-input,
        .run-create-textarea {
          background: rgba(0, 0, 0, .3);
          border: 1px solid rgba(247, 247, 244, .18);
          color: var(--white);
          font-family: inherit;
          font-size: .94rem;
          padding: .82rem .9rem;
          width: 100%;
        }

        .run-create-input:focus,
        .run-create-textarea:focus {
          border-color: var(--purple);
          outline: none;
        }

        .run-create-textarea {
          line-height: 1.55;
          min-height: 160px;
          resize: vertical;
        }

        .run-create-note {
          background: rgba(167, 139, 250, .08);
          border-left: 3px solid var(--purple);
          color: #ddd6fe;
          font-size: .82rem;
          line-height: 1.55;
          margin: 1.5rem 0;
          padding: .9rem 1rem;
        }

        .run-create-error {
          background: rgba(248, 113, 113, .08);
          border: 1px solid rgba(248, 113, 113, .45);
          color: #fca5a5;
          font-size: .85rem;
          line-height: 1.5;
          margin: 1.25rem 0 0;
          padding: .85rem 1rem;
        }

        .run-create-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .8rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        .run-create-button {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .26);
          color: var(--white);
          cursor: pointer;
          font-family: inherit;
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .06em;
          min-height: 45px;
          padding: .75rem 1rem;
          text-transform: uppercase;
        }

        .run-create-button:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .run-create-button-primary {
          background: var(--teal);
          border-color: var(--teal);
          color: #03100f;
        }

        .run-create-button-primary:hover:not(:disabled) {
          background: #2dd4bf;
          border-color: #2dd4bf;
        }

        .run-create-button:disabled {
          cursor: not-allowed;
          opacity: .5;
        }

        @media (max-width: 640px) {
          .run-create-page {
            padding-top: 5.5rem;
          }

          .run-create-container {
            width: min(100% - 2rem, 860px);
          }

          .run-create-grid {
            grid-template-columns: 1fr;
          }

          .run-create-field-wide {
            grid-column: auto;
          }

          .run-create-form {
            padding: 1.1rem;
          }

          .run-create-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .run-create-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="run-create-container">
        <button
          className="run-create-back"
          onClick={() => router.push("/admin/laeufe")}
          type="button"
        >
          ← Zu Läufen
        </button>

        <header className="run-create-header">
          <p className="run-create-kicker">FC Mello Wien · Admin</p>

          <h1 className="run-create-title">
            Neuen Lauf
            <span>anlegen.</span>
          </h1>

          <p className="run-create-intro">
            Dieser Lauf wird als individuelle, verpflichtende Tagesaufgabe für
            alle aktiven Spieler erstellt. Nach dem Lauf meldet der Spieler ihn
            in Mello und postet ihn anschließend in der Strava-Gruppe.
          </p>
        </header>

        <form className="run-create-form" onSubmit={handleSubmit}>
          <div className="run-create-grid">
            <label className="run-create-field run-create-field-wide">
              <span className="run-create-label">Titel</span>

              <input
                className="run-create-input"
                maxLength={120}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Zum Beispiel: Intervalltraining"
                required
                value={title}
              />
            </label>

            <label className="run-create-field">
              <span className="run-create-label">Datum</span>

              <input
                className="run-create-input"
                onChange={(event) => setRunDate(event.target.value)}
                required
                type="date"
                value={runDate}
              />
            </label>

            <label className="run-create-field">
              <span className="run-create-label">
                Zieldauer <span>optional</span>
              </span>

              <input
                className="run-create-input"
                inputMode="numeric"
                min="1"
                onChange={(event) => setDurationMinutes(event.target.value)}
                placeholder="Zum Beispiel: 45"
                type="number"
                value={durationMinutes}
              />
            </label>

            <label className="run-create-field">
              <span className="run-create-label">
                Zieldistanz in km <span>optional</span>
              </span>

              <input
                className="run-create-input"
                inputMode="decimal"
                min="0.1"
                onChange={(event) => setDistanceKm(event.target.value)}
                placeholder="Zum Beispiel: 7.5"
                step="0.1"
                type="number"
                value={distanceKm}
              />
            </label>

            <label className="run-create-field run-create-field-wide">
              <span className="run-create-label">Laufanweisung</span>

              <textarea
                className="run-create-textarea"
                maxLength={2000}
                onChange={(event) => setInstructions(event.target.value)}
                placeholder="Zum Beispiel: 15 Minuten locker einlaufen. Danach 6 × 4 Minuten zügig bis hart laufen, jeweils 2 Minuten locker joggen. Zum Abschluss 10 Minuten locker auslaufen."
                required
                value={instructions}
              />
            </label>

            <label className="run-create-field run-create-field-wide">
              <span className="run-create-label">
                Strava-Hinweis <span>optional</span>
              </span>

              <input
                className="run-create-input"
                maxLength={300}
                onChange={(event) => setStravaHint(event.target.value)}
                value={stravaHint}
              />
            </label>
          </div>

          <div className="run-create-note">
            Pflichtlauf · ganztägig · Teilnahmezeilen werden automatisch für
            alle aktiven Spieler angelegt.
          </div>

          {errorMessage ? (
            <p className="run-create-error">{errorMessage}</p>
          ) : null}

          <div className="run-create-actions">
            <button
              className="run-create-button"
              disabled={isSaving}
              onClick={() => router.push("/admin/laeufe")}
              type="button"
            >
              Abbrechen
            </button>

            <button
              className="run-create-button run-create-button-primary"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Lauf wird angelegt …" : "Lauf anlegen"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}