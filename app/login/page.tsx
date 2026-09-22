"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function normalizeLastName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "-");
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const identifier = loginIdentifier.trim().toLowerCase();

    if (!identifier) {
      setMessage("Bitte gib deinen Nachnamen oder deine E-Mail-Adresse ein.");
      setLoading(false);
      return;
    }

    const email = identifier.includes("@")
      ? identifier
      : `${normalizeLastName(identifier)}@mellowien.player`;

    const loginRequest = supabase.auth.signInWithPassword({
      email,
      password,
    });

    const timeout = new Promise<never>((_, reject) => {
      window.setTimeout(() => {
        reject(new Error("Die Anmeldung hat zu lange gedauert."));
      }, 10000);
    });

    try {
      const { data, error } = await Promise.race([
        loginRequest,
        timeout,
      ]);

      if (error || !data.user) {
        setMessage(
          "Nachname beziehungsweise E-Mail-Adresse oder Passwort ist nicht korrekt.",
        );
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("password_changed, role")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        setMessage(
          "Dein Benutzerprofil konnte nicht geladen werden. Bitte versuche es später erneut.",
        );
        setLoading(false);
        return;
      }

      if (!profile.password_changed) {
        router.replace("/passwort-aendern");
        router.refresh();
        return;
      }

      const next = searchParams.get("next");

      if (next?.startsWith("/") && !next.startsWith("//")) {
        router.replace(next);
      } else if (profile.role === "admin") {
        router.replace("/admin");
      } else if (profile.role === "coach") {
        router.replace("/trainer");
      } else {
        router.replace("/spielerbereich");
      }

      router.refresh();
    } catch {
      setMessage(
        "Die Anmeldung konnte nicht erreicht werden. Bitte lade die Seite neu und versuche es erneut.",
      );
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <style>{`
        .login-page {
          --mello-black: #080808;
          --mello-white: #f7f7f4;
          --mello-teal: #0d9488;

          align-items: center;
          background:
            radial-gradient(
              ellipse 50% 70% at 75% 30%,
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

        .login-box {
          border-top: 1px solid var(--mello-teal);
          max-width: 29rem;
          padding-top: 1.4rem;
          width: 100%;
        }

        .login-kicker {
          color: var(--mello-teal);
          font-size: .67rem;
          font-weight: 800;
          letter-spacing: .18em;
          margin: 0 0 .9rem;
          text-transform: uppercase;
        }

        .login-title {
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: .9;
          margin: 0 0 1.1rem;
          text-transform: uppercase;
        }

        .login-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.2px var(--mello-teal);
        }

        .login-text {
          color: rgba(247, 247, 244, .64);
          font-size: .97rem;
          line-height: 1.65;
          margin: 0 0 2rem;
          max-width: 41ch;
        }

        .login-form {
          display: grid;
          gap: 1rem;
        }

        .login-label {
          color: rgba(247, 247, 244, .58);
          display: block;
          font-size: .64rem;
          font-weight: 800;
          letter-spacing: .13em;
          margin-bottom: .48rem;
          text-transform: uppercase;
        }

        .login-input {
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

        .login-input:focus {
          background: rgba(13, 148, 136, .06);
          border-color: var(--mello-teal);
        }

        .login-button {
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

        .login-button:hover:not(:disabled) {
          background: transparent;
          color: var(--mello-teal);
        }

        .login-button:disabled {
          cursor: wait;
          opacity: .65;
        }

        .login-message {
          color: #f5a5a5;
          font-size: .88rem;
          line-height: 1.5;
          margin: .2rem 0 0;
        }

        .login-hint {
          color: rgba(247, 247, 244, .44);
          font-size: .78rem;
          line-height: 1.5;
          margin: .15rem 0 0;
        }

        @media (max-width: 768px) {
          .login-page {
            padding-top: 6.5rem;
          }
        }
      `}</style>

      <section className="login-box">
        <p className="login-kicker">FC Mello Wien · Intern</p>

        <h1 className="login-title">
          Intern
          <span>Login.</span>
        </h1>

        <p className="login-text">
          Spieler melden sich mit ihrem Nachnamen an. Admins und Trainer
          verwenden ihre E-Mail-Adresse. Nach der Anmeldung wirst du
          automatisch in den passenden Bereich weitergeleitet.
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label className="login-label" htmlFor="login-identifier">
              Nachname oder E-Mail-Adresse
            </label>

            <input
              className="login-input"
              id="login-identifier"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              value={loginIdentifier}
              onChange={(event) => setLoginIdentifier(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="login-label" htmlFor="password">
              Passwort
            </label>

            <input
              className="login-input"
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Anmeldung läuft ..." : "Einloggen"}
          </button>

          <p className="login-hint">
            Beispiel Spieler: <code>Rezai</code> · Beispiel Admin:
            <code> daniel@mellowien.at</code>
          </p>

          {message ? <p className="login-message">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}