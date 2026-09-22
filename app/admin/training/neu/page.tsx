"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function getTodayInputValue() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function buildLocalDateTime(date: string, time: string) {
  const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const timeMatch = time.match(/^(\d{2}):(\d{2})$/);

  if (!dateMatch || !timeMatch) {
    return null;
  }

  const [, yearString, monthString, dayString] = dateMatch;
  const [, hourString, minuteString] = timeMatch;

  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const hour = Number(hourString);
  const minute = Number(minuteString);

  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);

  if (Number.isNaN(localDate.getTime())) {
    return null;
  }

  if (
    localDate.getFullYear() !== year ||
    localDate.getMonth() !== month - 1 ||
    localDate.getDate() !== day ||
    localDate.getHours() !== hour ||
    localDate.getMinutes() !== minute
  ) {
    return null;
  }

  return localDate.toISOString();
}

export default function NeuesTrainingPage() {
  const router = useRouter();

  const [title, setTitle] = useState("Mannschaftstraining");
  const [trainingDate, setTrainingDate] = useState(getTodayInputValue());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [focus, setFocus] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

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
        router.replace("/login?next=/admin/training/neu");
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
    const trimmedLocationName = locationName.trim();
    const trimmedAddress = address.trim();
    const trimmedFocus = focus.trim();

    setErrorMessage("");

    if (!trimmedTitle) {
      setErrorMessage("Bitte gib einen Trainingstitel ein.");
      return;
    }

    if (!trainingDate) {
      setErrorMessage("Bitte wähle das Trainingsdatum.");
      return;
    }

    if (!startTime) {
      setErrorMessage("Bitte gib die Startzeit ein.");
      return;
    }

    if (!endTime) {
      setErrorMessage("Bitte gib die Endzeit ein.");
      return;
    }

    if (!trimmedLocationName) {
      setErrorMessage("Bitte gib den Trainingsort ein.");
      return;
    }

    const startsAt = buildLocalDateTime(trainingDate, startTime);
    const endsAt = buildLocalDateTime(trainingDate, endTime);

    if (!startsAt || !endsAt) {
      setErrorMessage(
        "Datum oder Uhrzeit ist ungültig. Bitte prüfe Trainingsdatum, Startzeit und Endzeit.",
      );
      return;
    }

    if (new Date(endsAt).getTime() <= new Date(startsAt).getTime()) {
      setErrorMessage("Die Endzeit muss nach der Startzeit liegen.");
      return;
    }

    let responseDeadline: string | null = null;

    if (deadlineDate || deadlineTime) {
      if (!deadlineDate || !deadlineTime) {
        setErrorMessage(
          "Bitte gib für die Rückmeldefrist Datum und Uhrzeit ein.",
        );
        return;
      }

      const calculatedDeadline = buildLocalDateTime(
        deadlineDate,
        deadlineTime,
      );

      if (!calculatedDeadline) {
        setErrorMessage(
          "Die Rückmeldefrist enthält ein ungültiges Datum oder eine ungültige Uhrzeit.",
        );
        return;
      }

      responseDeadline = calculatedDeadline;

      if (
        new Date(responseDeadline).getTime() >= new Date(startsAt).getTime()
      ) {
        setErrorMessage(
          "Die Rückmeldefrist muss vor dem Trainingsbeginn liegen.",
        );
        return;
      }
    }

    setIsSaving(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login?next=/admin/training/neu");
      return;
    }

    const { error: trainingError } = await supabase.from("events").insert({
      title: trimmedTitle,
      event_type: "training",
      starts_at: startsAt,
      ends_at: endsAt,
      location_name: trimmedLocationName,
      address: trimmedAddress || null,
      description: trimmedFocus || null,
      required: true,
      response_deadline: responseDeadline,
      all_day: false,
      created_by: session.user.id,
    });

    if (trainingError) {
      setErrorMessage(
        trainingError.message ||
          "Das Training konnte nicht angelegt werden. Bitte versuche es erneut.",
      );
      setIsSaving(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (isCheckingSession) {
    return (
      <main className="training-create-page training-create-loading">
        <p>Formular wird geladen …</p>
      </main>
    );
  }

  return (
    <main className="training-create-page">
      <style>{`
        .training-create-page {
          --black: #080808;
          --white: #f7f7f4;
          --teal: #0d9488;
          --line: #292929;
          --muted: rgba(247, 247, 244, .58);

          background:
            radial-gradient(
              ellipse 46% 54% at 90% 6%,
              rgba(13, 148, 136, .14) 0%,
              transparent 72%
            ),
            var(--black);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding: 7rem 0 5rem;
        }

        .training-create-loading {
          align-items: center;
          display: flex;
          justify-content: center;
        }

        .training-create-loading p {
          color: var(--teal);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .training-create-page *,
        .training-create-page *::before,
        .training-create-page *::after {
          box-sizing: border-box;
        }

        .training-create-container {
          margin: 0 auto;
          width: min(100% - 4rem, 860px);
        }

        .training-create-back {
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

        .training-create-back:hover {
          color: var(--white);
        }

        .training-create-header {
          border-bottom: 1px solid var(--line);
          margin: 1.6rem 0 2rem;
          padding-bottom: 2rem;
        }

        .training-create-kicker {
          color: var(--teal);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .training-create-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.7rem, 6vw, 5.2rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .86;
          margin: 0;
          text-transform: uppercase;
        }

        .training-create-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.3px var(--teal);
        }

        .training-create-intro {
          color: var(--muted);
          font-size: .96rem;
          line-height: 1.65;
          margin: 1.3rem 0 0;
          max-width: 65ch;
        }

        .training-create-form {
          background: rgba(247, 247, 244, .025);
          border: 1px solid rgba(247, 247, 244, .15);
          padding: 1.6rem;
        }

        .training-create-grid {
          display: grid;
          gap: 1.1rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .training-create-field {
          display: grid;
          gap: .5rem;
        }

        .training-create-field-wide {
          grid-column: 1 / -1;
        }

        .training-create-label {
          color: rgba(247, 247, 244, .76);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .training-create-label span {
          color: rgba(247, 247, 244, .38);
          font-weight: 700;
          letter-spacing: 0;
          text-transform: none;
        }

        .training-create-input,
        .training-create-textarea {
          background: rgba(0, 0, 0, .3);
          border: 1px solid rgba(247, 247, 244, .18);
          color: var(--white);
          font-family: inherit;
          font-size: .94rem;
          padding: .82rem .9rem;
          width: 100%;
        }

        .training-create-input:focus,
        .training-create-textarea:focus {
          border-color: var(--teal);
          outline: none;
        }

        .training-create-textarea {
          line-height: 1.55;
          min-height: 145px;
          resize: vertical;
        }

        .training-create-note {
          background: rgba(13, 148, 136, .09);
          border-left: 3px solid var(--teal);
          color: #99f6e4;
          font-size: .82rem;
          line-height: 1.55;
          margin: 1.5rem 0;
          padding: .9rem 1rem;
        }

        .training-create-error {
          background: rgba(248, 113, 113, .08);
          border: 1px solid rgba(248, 113, 113, .45);
          color: #fca5a5;
          font-size: .85rem;
          line-height: 1.5;
          margin: 1.25rem 0 0;
          padding: .85rem 1rem;
        }

        .training-create-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .8rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        .training-create-button {
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

        .training-create-button:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .training-create-button-primary {
          background: var(--teal);
          border-color: var(--teal);
          color: #001b18;
        }

        .training-create-button-primary:hover:not(:disabled) {
          background: #14b8a6;
          border-color: #14b8a6;
        }

        .training-create-button:disabled {
          cursor: not-allowed;
          opacity: .5;
        }

        @media (max-width: 640px) {
          .training-create-page {
            padding-top: 5.5rem;
          }

          .training-create-container {
            width: min(100% - 2rem, 860px);
          }

          .training-create-grid {
            grid-template-columns: 1fr;
          }

          .training-create-field-wide {
            grid-column: auto;
          }

          .training-create-form {
            padding: 1.1rem;
          }

          .training-create-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .training-create-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="training-create-container">
        <button
          className="training-create-back"
          onClick={() => router.push("/admin")}
          type="button"
        >
          ← Zur Übersicht
        </button>

        <header className="training-create-header">
          <p className="training-create-kicker">FC Mello Wien · Admin</p>

          <h1 className="training-create-title">
            Neues Training
            <span>anlegen.</span>
          </h1>

          <p className="training-create-intro">
            Plane das nächste Mannschaftstraining inklusive Uhrzeit, Ort,
            Trainingsschwerpunkten und optionaler Rückmeldefrist.
          </p>
        </header>

        <form className="training-create-form" onSubmit={handleSubmit}>
          <div className="training-create-grid">
            <label className="training-create-field training-create-field-wide">
              <span className="training-create-label">Trainingstitel</span>

              <input
                className="training-create-input"
                maxLength={120}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Zum Beispiel: Mannschaftstraining"
                required
                value={title}
              />
            </label>

            <label className="training-create-field">
              <span className="training-create-label">Trainingsdatum</span>

              <input
                className="training-create-input"
                onChange={(event) => setTrainingDate(event.target.value)}
                required
                type="date"
                value={trainingDate}
              />
            </label>

            <label className="training-create-field">
              <span className="training-create-label">Startzeit</span>

              <input
                className="training-create-input"
                onChange={(event) => setStartTime(event.target.value)}
                required
                type="time"
                value={startTime}
              />
            </label>

            <label className="training-create-field">
              <span className="training-create-label">Endzeit</span>

              <input
                className="training-create-input"
                onChange={(event) => setEndTime(event.target.value)}
                required
                type="time"
                value={endTime}
              />
            </label>

            <label className="training-create-field">
              <span className="training-create-label">Trainingsort</span>

              <input
                className="training-create-input"
                maxLength={160}
                onChange={(event) => setLocationName(event.target.value)}
                placeholder="Zum Beispiel: Polizeisportanlage"
                required
                value={locationName}
              />
            </label>

            <label className="training-create-field training-create-field-wide">
              <span className="training-create-label">
                Adresse <span>optional</span>
              </span>

              <input
                className="training-create-input"
                maxLength={220}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Zum Beispiel: Dampfschiffhaufen 2 · 1220 Wien"
                value={address}
              />
            </label>

            <label className="training-create-field training-create-field-wide">
              <span className="training-create-label">
                Trainingsschwerpunkte / Hinweise <span>optional</span>
              </span>

              <textarea
                className="training-create-textarea"
                maxLength={2000}
                onChange={(event) => setFocus(event.target.value)}
                placeholder="Zum Beispiel: Passformen, Umschaltspiel, Standards. Bitte Hallenschuhe und Trinkflasche mitnehmen."
                value={focus}
              />
            </label>

            <label className="training-create-field">
              <span className="training-create-label">
                Rückmeldefrist – Datum <span>optional</span>
              </span>

              <input
                className="training-create-input"
                onChange={(event) => setDeadlineDate(event.target.value)}
                type="date"
                value={deadlineDate}
              />
            </label>

            <label className="training-create-field">
              <span className="training-create-label">
                Rückmeldefrist – Uhrzeit <span>optional</span>
              </span>

              <input
                className="training-create-input"
                onChange={(event) => setDeadlineTime(event.target.value)}
                type="time"
                value={deadlineTime}
              />
            </label>
          </div>

          <div className="training-create-note">
            Pflichttermin · Teilnahmezeilen werden automatisch für alle aktiven
            Spieler angelegt. Eine Rückmeldefrist ist beim Training optional.
          </div>

          {errorMessage ? (
            <p className="training-create-error">{errorMessage}</p>
          ) : null}

          <div className="training-create-actions">
            <button
              className="training-create-button"
              disabled={isSaving}
              onClick={() => router.push("/admin")}
              type="button"
            >
              Abbrechen
            </button>

            <button
              className="training-create-button training-create-button-primary"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Training wird angelegt …" : "Training anlegen"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}