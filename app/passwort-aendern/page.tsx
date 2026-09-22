"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PasswortAendernPage() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (!session) {
        router.replace("/login?next=/passwort-aendern");
        return;
      }

      setIsCheckingSession(false);
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    if (newPassword.length < 10) {
      setMessage("Dein neues Passwort muss mindestens 10 Zeichen lang sein.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setMessage("Die neuen Passwörter stimmen nicht überein.");
      return;
    }

    if (newPassword === "Mello1") {
      setMessage("Bitte wähle ein anderes Passwort als dein Startpasswort.");
      return;
    }

    setLoading(true);

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (passwordError) {
      setMessage(
        "Das Passwort konnte nicht geändert werden. Bitte versuche es erneut.",
      );
      setLoading(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage(
        "Deine Anmeldung konnte nicht bestätigt werden. Bitte melde dich erneut an.",
      );
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ password_changed: true })
      .eq("id", user.id);

    if (profileError) {
      setMessage(
        "Das Passwort wurde geändert, aber dein Erstlogin konnte nicht gespeichert werden. Bitte melde dich erneut an.",
      );
      setLoading(false);
      return;
    }

    router.replace("/spielerbereich");
    router.refresh();
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-500">
          Anmeldung wird geprüft …
        </p>
      </main>
    );
  }

  return (
    <main className="password-page">
      <style>{`
        .password-page {
          --mello-black: #080808;
          --mello-white: #f7f7f4;
          --mello-teal: #0d9488;

          align-items: center;
          background:
            radial-gradient(
              ellipse 55% 75% at 76% 28%,
              rgba(13, 148, 136, .12) 0%,
              transparent 70%
            ),
            var(--mello-black);
          color: var(--mello-white);
          display: flex;
          font-family: Arial, Helvetica, sans-serif;
          justify-content: center;
          min-height: 100vh;
          padding: 7.5rem 1.25rem 3rem;
        }

        .password-box {
          border-top: 1px solid var(--mello-teal);
          max-width: 30rem;
          padding-top: 1.4rem;
          width: 100%;
        }

        .password-kicker {
          color: var(--mello-teal);
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .18em;
          margin: 0 0 .9rem;
          text-transform: uppercase;
        }

        .password-title {
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.35rem, 5.8vw, 3.8rem);
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: .9;
          margin: 0 0 1.1rem;
          text-transform: uppercase;
        }

        .password-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.2px var(--mello-teal);
        }

        .password-text {
          color: rgba(247, 247, 244, .64);
          font-size: .97rem;
          line-height: 1.65;
          margin: 0 0 2rem;
          max-width: 43ch;
        }

        .password-form {
          display: grid;
          gap: 1rem;
        }

        .password-label {
          color: rgba(247, 247, 244, .58);
          display: block;
          font-size: .64rem;
          font-weight: 800;
          letter-spacing: .13em;
          margin-bottom: .48rem;
          text-transform: uppercase;
        }

        .password-input {
          background: rgba(247, 247, 244, .035);
          border: 1px solid rgba(247, 247, 244, .18);
          border-radius: 0;
          color: var(--mello-white);
          font: inherit;
          font-size: 1rem;
          outline: none;
          padding: .93rem 1rem;
          transition: border-color .2s ease, background .2s ease;
          width: 100%;
        }

        .password-input:focus {
          background: rgba(13, 148, 136, .06);
          border-color: var(--mello-teal);
        }

        .password-button {
          background: var(--mello-teal);
          border: 1px solid var(--mello-teal);
          color: #ffffff;
          cursor: pointer;
          font: inherit;
          font-size: .72rem;
          font-weight: 800;
          letter-spacing: .12em;
          margin-top: .5rem;
          min-height: 52px;
          padding: .95rem 1rem;
          text-transform: uppercase;
          transition: background .2s ease, color .2s ease;
          width: 100%;
        }

        .password-button:hover:not(:disabled) {
          background: transparent;
          color: var(--mello-teal);
        }

        .password-button:disabled {
          cursor: wait;
          opacity: .65;
        }

        .password-message {
          color: #f5a5a5;
          font-size: .88rem;
          line-height: 1.5;
          margin: .2rem 0 0;
        }

        @media (max-width: 768px) {
          .password-page {
            padding-top: 6.5rem;
          }
        }
      `}</style>

      <section className="password-box">
        <p className="password-kicker">FC Mello Wien · Sicherheit</p>

        <h1 className="password-title">
          Passwort
          <span>ändern.</span>
        </h1>

        <p className="password-text">
          Du verwendest noch dein vorgegebenes Startpasswort. Bitte lege jetzt
          ein persönliches Passwort fest, bevor du den Spielerbereich öffnest.
        </p>

        <form className="password-form" onSubmit={handlePasswordChange}>
          <div>
            <label className="password-label" htmlFor="new-password">
              Neues Passwort
            </label>

            <input
              className="password-input"
              id="new-password"
              type="password"
              autoComplete="new-password"
              minLength={10}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="password-label" htmlFor="repeat-password">
              Neues Passwort wiederholen
            </label>

            <input
              className="password-input"
              id="repeat-password"
              type="password"
              autoComplete="new-password"
              minLength={10}
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              required
            />
          </div>

          <button className="password-button" type="submit" disabled={loading}>
            {loading ? "Passwort wird gespeichert ..." : "Passwort speichern"}
          </button>

          {message ? <p className="password-message">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}