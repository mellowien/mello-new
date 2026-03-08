"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ── Nächstes Spiel hier eintragen ──────────────────────────────
const NEXT_MATCH = {
  date: new Date("2025-06-01T15:00:00"),
  opponent: "Gegner FC",
  
  matchLabel: "Liga · Bewerb",
  location: "Wien",
  displayDate: "TT.MM.JJJJ",
  displayTime: "HH:MM Uhr",
};
// ──────────────────────────────────────────────────────────────

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(NEXT_MATCH.date);
  const pad = (n: number) => String(n).padStart(2, "0");

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div style={{ textAlign: "center", minWidth: "3.5rem" }}>
      <div style={{
        fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
        fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
        lineHeight: 1, color: "#ffffff", letterSpacing: ".05em",
      }}>
        {pad(value)}
      </div>
      <div style={{
        fontSize: ".55rem", letterSpacing: ".2em",
        textTransform: "uppercase", color: "rgba(255,255,255,.4)",
        marginTop: ".25rem",
      }}>
        {label}
      </div>
    </div>
  );

  const Sep = () => (
    <div style={{
      fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
      fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
      color: "rgba(255,255,255,.25)", paddingBottom: "1.4rem",
    }}>:</div>
  );

  return (
    <div style={{
      background: "#080808",
      borderTop: "1px solid #1a1a1a",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem 3rem 1.2rem",
      gap: ".6rem",
    }}>

      {/* NÄCHSTES SPIEL */}
      <div style={{
        fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
        fontSize: "1rem", letterSpacing: ".35em",
        textTransform: "uppercase", color: "#0d9488",
      }}>
        Nächstes Spiel
      </div>

      {/* Countdown */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: ".4rem" }}>
        <Unit value={days}    label="Tage" />
        <Sep />
        <Unit value={hours}   label="Std." />
        <Sep />
        <Unit value={minutes} label="Min." />
        <Sep />
        <Unit value={seconds} label="Sek." />
      </div>

      {/* Logos + Klasse + Gegner */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: "1.2rem",
      }}>
        {/* Mello Logo */}
        <Image src="/logo.png" alt="FC Mello Wien" width={48} height={48}
          style={{ borderRadius: "50%", objectFit: "cover" }} />

        {/* Liga label */}
        <div style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: ".8rem", letterSpacing: ".15em",
          color: "rgba(255,255,255,.4)", textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          {NEXT_MATCH.matchLabel}
        </div>

        {/* Gegner Logo Platzhalter — kein Bild, kein 404 */}
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: "#1a1a1a", border: "1px dashed #333",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "1.2rem", color: "rgba(255,255,255,.25)",
          }}>?</span>
        </div>
      </div>

      {/* Datum & Uhrzeit */}
      <div style={{
        fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
        fontSize: ".75rem", letterSpacing: ".2em",
        color: "rgba(255,255,255,.35)",
        display: "flex", gap: "1rem",
      }}>
        <span>{NEXT_MATCH.displayDate}</span>
        <span style={{ color: "rgba(255,255,255,.15)" }}>·</span>
        <span>{NEXT_MATCH.displayTime}</span>
      </div>

    </div>
  );
}