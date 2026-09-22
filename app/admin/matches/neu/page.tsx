"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type VenueType = "home" | "away";

function getTodayInputValue() {
  const now = new Date();
  const localOffset = now.getTimezoneOffset() * 60_000;

  return new Date(now.getTime() - localOffset).toISOString().slice(0, 10);
}

function buildLocalDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00+02:00`).toISOString();
}

export default function NeuesMatchPage() {
  const router = useRouter();

  const [opponent, setOpponent] = useState("");
  const [venueType, setVenueType] = useState<VenueType>("home");
  const [matchDate, setMatchDate] = useState(getTodayInputValue());
  const [meetingTime, setMeetingTime] = useState("");
  const [kickoffTime, setKickoffTime] = useState("");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
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
        router.replace("/login?next=/admin/matches/neu");
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

    const trimmedOpponent = opponent.trim();
    const trimmedLocationName = locationName.trim();
    const trimmedAddress = address.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedOpponent) {
      setErrorMessage("Bitte gib den Gegner ein.");
      return;
    }

    if (!matchDate) {
      setErrorMessage("Bitte wähle das Spiel-Datum.");
      return;
    }

    if (!kickoffTime) {
      setErrorMessage("Bitte gib die Anpfiffzeit ein.");
      return;
    }

    if (!trimmedLocationName) {
      setErrorMessage("Bitte gib den Spielort ein.");
      return;
    }

    if (!deadlineDate || !deadlineTime) {
      setErrorMessage(
        "Bitte lege eine Rückmeldefrist mit Datum und Uhrzeit fest.",
      );
      return;
    }

    const startsAt = buildLocalDateTime(matchDate, kickoffTime);
    const responseDeadline = buildLocalDateTime(deadlineDate, deadlineTime);

    if (new Date(responseDeadline).getTime() >= new Date(startsAt).getTime()) {
      setErrorMessage(
        "Die Rückmeldefrist muss vor dem Anpfiff liegen.",
      );
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login?next=/admin/matches/neu");
      return;
    }

    const venueLabel =
      venueType === "home" ? "Heimspiel" : "Auswärtsspiel";

    const matchTitle =
      venueType === "home"
        ? `FC Mello Wien vs. ${trimmedOpponent}`
        : `${trimmedOpponent} vs. FC Mello Wien`;

    const descriptionParts = [
      venueLabel,
      meetingTime ? `Treffzeit: ${meetingTime} Uhr` : null,
      `Anpfiff: ${kickoffTime} Uhr`,
      trimmedNotes || null,
    ].filter(Boolean);

    const { error: eventError } = await supabase.from("events").insert({
      title: matchTitle,
      event_type: "match",
      starts_at: startsAt,
      ends_at: null,
      location_name: `${venueLabel} · ${trimmedLocationName}`,
      address: trimmedAddress || null,
      description: descriptionParts.join("\n\n"),
      required: true,
      response_deadline: responseDeadline,
      all_day: false,
      created_by: session.user.id,
    });

    if (eventError) {
      setErrorMessage(
        eventError.message ||
          "Das Match konnte nicht angelegt werden. Bitte versuche es erneut.",
      );
      setIsSaving(false);
      return;
    }

    router.push("/admin");
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
    <main className="match-create-page">
      <style>{`
        .match-create-page {
          --black: #080808;
          --white: #f7f7f4;
          --teal: #0d9488;
          --yellow: #f59e0b;
          --line: #292929;
          --muted: rgba(247, 247, 244, .58);

          background:
            radial-gradient(
              ellipse 46% 54% at 90% 6%,
              rgba(245, 158, 11, .13) 0%,
              transparent 72%
            ),
            var(--black);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding: 7rem 0 5rem;
        }

        .match-create-page *,
        .match-create-page *::before,
        .match-create-page *::after {
          box-sizing: border-box;
        }

        .match-create-container {
          margin: 0 auto;
          width: min(100% - 4rem, 860px);
        }

        .match-create-back {
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

        .match-create-back:hover {
          color: var(--white);
        }

        .match-create-header {
          border-bottom: 1px solid var(--line);
          margin: 1.6rem 0 2rem;
          padding-bottom: 2rem;
        }

        .match-create-kicker {
          color: var(--teal);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .match-create-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.7rem, 6vw, 5.2rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .86;
          margin: 0;
          text-transform: uppercase;
        }

        .match-create-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.3px var(--yellow);
        }

        .match-create-intro {
          color: var(--muted);
          font-size: .96rem;
          line-height: 1.65;
          margin: 1.3rem 0 0;
          max-width: 65ch;
        }

        .match-create-form {
          background: rgba(247, 247, 244, .025);
          border: 1px solid rgba(247, 247, 244, .15);
          padding: 1.6rem;
        }

        .match-create-grid {
          display: grid;
          gap: 1.1rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .match-create-field {
          display: grid;
          gap: .5rem;
        }

        .match-create-field-wide {
          grid-column: 1 / -1;
        }

        .match-create-label {
          color: rgba(247, 247, 244, .76);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .match-create-label span {
          color: rgba(247, 247, 244, .38);
          font-weight: 700;
          letter-spacing: 0;
          text-transform: none;
        }

        .match-create-input,
        .match-create-textarea,
        .match-create-select {
          background: rgba(0, 0, 0, .3);
          border: 1px solid rgba(247, 247, 244, .18);
          color: var(--white);
          font-family: inherit;
          font-size: .94rem;
          padding: .82rem .9rem;
          width: 100%;
        }

        .match-create-input:focus,
        .match-create-textarea:focus,
        .match-create-select:focus {
          border-color: var(--yellow);
          outline: none;
        }

        .match-create-select option {
          background: #111111;
          color: #ffffff;
        }

        .match-create-textarea {
          line-height: 1.55;
          min-height: 150px;
          resize: vertical;
        }

        .match-create-note {
          background: rgba(245, 158, 11, .08);
          border-left: 3px solid var(--yellow);
          color: #fde68a;
          font-size: .82rem;
          line-height: 1.55;
          margin: 1.5rem 0;
          padding: .9rem 1rem;
        }

        .match-create-error {
          background: rgba(248, 113, 113, .08);
          border: 1px solid rgba(248, 113, 113, .45);
          color: #fca5a5;
          font-size: .85rem;
          line-height: 1.5;
          margin: 1.25rem 0 0;
          padding: .85rem 1rem;
        }

        .match-create-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .8rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        .match-create-button {
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

        .match-create-button:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .match-create-button-primary {
          background: var(--yellow);
          border-color: var(--yellow);
          color: #221600;
        }

        .match-create-button-primary:hover:not(:disabled) {
          background: #fbbf24;
          border-color: #fbbf24;
        }

        .match-create-button:disabled {
          cursor: not-allowed;
          opacity: .5;
        }

        @media (max-width: 640px) {
          .match-create-page {
            padding-top: 5.5rem;
          }

          .match-create-container {
            width: min(100% - 2rem, 860px);
          }

          .match-create-grid {
            grid-template-columns: 1fr;
          }

          .match-create-field-wide {
            grid-column: auto;
          }

          .match-create-form {
            padding: 1.1rem;
          }

          .match-create-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .match-create-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="match-create-container">
        <button
          className="match-create-back"
          onClick={() => router.push("/admin")}
          type="button"
        >
          ← Zur Übersicht
        </button>

        <header className="match-create-header">
          <p className="match-create-kicker">FC Mello Wien · Admin</p>

          <h1 className="match-create-title">
            Neues Match
            <span>anlegen.</span>
          </h1>

          <p className="match-create-intro">
            Lege Gegner, Heim- oder Auswärtsspiel, Treffzeit, Anpfiff, Ort und
            Rückmeldefrist fest. Alle aktiven Spieler erhalten automatisch eine
            Teilnahmezeile für „Ich komme“, „Ich komme nicht“ oder „Verletzt“.
          </p>
        </header>

        <form className="match-create-form" onSubmit={handleSubmit}>
          <div className="match-create-grid">
            <label className="match-create-field match-create-field-wide">
              <span className="match-create-label">Gegner</span>

              <input
                className="match-create-input"
                maxLength={120}
                onChange={(event) => setOpponent(event.target.value)}
                placeholder="Zum Beispiel: Penzinger SV"
                required
                value={opponent}
              />
            </label>

            <label className="match-create-field">
              <span className="match-create-label">Spielart</span>

              <select
                className="match-create-select"
                onChange={(event) =>
                  setVenueType(event.target.value as VenueType)
                }
                value={venueType}
              >
                <option value="home">Heimspiel</option>
                <option value="away">Auswärtsspiel</option>
              </select>
            </label>

            <label className="match-create-field">
              <span className="match-create-label">Spieltag</span>

              <input
                className="match-create-input"
                onChange={(event) => setMatchDate(event.target.value)}
                required
                type="date"
                value={matchDate}
              />
            </label>

            <label className="match-create-field">
              <span className="match-create-label">
                Treffzeit <span>optional</span>
              </span>

              <input
                className="match-create-input"
                onChange={(event) => setMeetingTime(event.target.value)}
                type="time"
                value={meetingTime}
              />
            </label>

            <label className="match-create-field">
              <span className="match-create-label">Anpfiff</span>

              <input
                className="match-create-input"
                onChange={(event) => setKickoffTime(event.target.value)}
                required
                type="time"
                value={kickoffTime}
              />
            </label>

            <label className="match-create-field match-create-field-wide">
              <span className="match-create-label">Spielort</span>

              <input
                className="match-create-input"
                maxLength={160}
                onChange={(event) => setLocationName(event.target.value)}
                placeholder="Zum Beispiel: Polizeisportanlage"
                required
                value={locationName}
              />
            </label>

            <label className="match-create-field match-create-field-wide">
              <span className="match-create-label">
                Adresse <span>optional</span>
              </span>

              <input
                className="match-create-input"
                maxLength={220}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Zum Beispiel: Dampfschiffhaufen 2 · 1220 Wien"
                value={address}
              />
            </label>

            <label className="match-create-field">
              <span className="match-create-label">
                Rückmeldefrist – Datum
              </span>

              <input
                className="match-create-input"
                onChange={(event) => setDeadlineDate(event.target.value)}
                required
                type="date"
                value={deadlineDate}
              />
            </label>

            <label className="match-create-field">
              <span className="match-create-label">
                Rückmeldefrist – Uhrzeit
              </span>

              <input
                className="match-create-input"
                onChange={(event) => setDeadlineTime(event.target.value)}
                required
                type="time"
                value={deadlineTime}
              />
            </label>

            <label className="match-create-field match-create-field-wide">
              <span className="match-create-label">
                Zusätzliche Hinweise <span>optional</span>
              </span>

              <textarea
                className="match-create-textarea"
                maxLength={2000}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Zum Beispiel: Treffpunkt pünktlich, Trainingstrikot beim Aufwärmen, schwarze Hose, Pass mitnehmen."
                value={notes}
              />
            </label>
          </div>

          <div className="match-create-note">
            Pflichttermin · Rückmeldung erforderlich · Teilnahmezeilen werden
            automatisch für alle aktiven Spieler angelegt.
          </div>

          {errorMessage ? (
            <p className="match-create-error">{errorMessage}</p>
          ) : null}

          <div className="match-create-actions">
            <button
              className="match-create-button"
              disabled={isSaving}
              onClick={() => router.push("/admin")}
              type="button"
            >
              Abbrechen
            </button>

            <button
              className="match-create-button match-create-button-primary"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Match wird angelegt …" : "Match anlegen"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}