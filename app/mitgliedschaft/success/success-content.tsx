"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");

  useEffect(() => {
    const n = searchParams.get("name");
    if (n) setName(n);
  }, [searchParams]);

  return (
    <main style={{
      background: "#080808",
      color: "#f5f5f5",
      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      minHeight: "100vh",
      paddingTop: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Teal glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(13,148,136,.07) 0%, transparent 70%)",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        textAlign: "center",
        padding: "0 3rem",
        maxWidth: "600px",
      }}>
        <p style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          letterSpacing: ".2em", color: "#0d9488",
          marginBottom: "1rem",
        }}>Willkommen</p>

        <h1 style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          lineHeight: .9, letterSpacing: ".02em",
          color: "#f5f5f5", marginBottom: "2rem",
        }}>
          Danke{name ? `, ${name}` : ""}
        </h1>

        <div style={{
          width: "3rem", height: "1px",
          background: "#0d9488",
          margin: "0 auto 2rem",
        }} />

        <p style={{
          fontSize: "1.05rem", color: "#888888",
          lineHeight: 1.8, marginBottom: ".8rem",
        }}>
          Deine Unterstützung bedeutet uns enorm viel.
        </p>
        <p style={{
          fontSize: "1.05rem", color: "#888888",
          lineHeight: 1.8, marginBottom: "3rem",
        }}>
          Du bist jetzt offizielles Mitglied des{" "}
          <span style={{ color: "#0d9488", fontWeight: 600 }}>FC Mello Wien</span>.
          Gemeinsam bauen wir etwas Neues auf.
        </p>

        <Link href="/" style={{
          background: "#0d9488", color: "#ffffff",
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontWeight: 600, fontSize: ".85rem",
          letterSpacing: ".1em", textTransform: "uppercase",
          padding: "1rem 2.5rem", textDecoration: "none",
          display: "inline-block",
        }}>
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}