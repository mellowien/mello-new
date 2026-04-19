"use client";

import { useState } from "react";

const mobileStyles = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

  @media (max-width: 768px) {
    .kontakt-hero    { padding: 3rem 1.5rem 2.5rem !important; }
    .kontakt-hero p  { white-space: normal !important; }
    .kontakt-form    { grid-template-columns: 1fr !important; padding: 3rem 1.5rem !important; gap: 2.5rem !important; }
  }
`;

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(
          `❌ Es gab ein Problem beim Senden.${
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
      });
    } catch {
      alert("❌ Netzwerkfehler. Bitte versuch es nochmal.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: ".85rem 1.2rem",
    background: "#0a0a0a",
    border: "1px solid #222222",
    color: "#f5f5f5",
    fontSize: ".95rem",
    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color .2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: ".7rem",
    letterSpacing: ".2em",
    textTransform: "uppercase" as const,
    color: "#555555",
    marginBottom: ".5rem",
    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
  };

  return (
    <main
      style={{
        background: "#080808",
        color: "#f5f5f5",
        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
        minHeight: "100vh",
        paddingTop: "96px",
      }}
    >
      <style>{mobileStyles}</style>

      {/* HERO */}
      <section
        className="kontakt-hero"
        style={{
          padding: "6rem 3rem 5rem",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(13,148,136,.07) 0%, transparent 70%)",
          }}
        />

        <div style={{ maxWidth: "800px", position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(4rem, 9vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: ".02em",
              color: "#f5f5f5",
              marginBottom: "1.5rem",
            }}
          >
            Kontaktiere <span style={{ color: "#0d9488" }}>uns</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "#888888",
              lineHeight: 1.8,
              whiteSpace: "nowrap",
            }}
          >
            Fragen, Ideen oder Kooperationen? Wir freuen uns über jede
            Nachricht.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section
        className="kontakt-form"
        style={{
          padding: "5rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ opacity: isSubmitting ? 0.6 : 1 }}
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            style={{ display: "none" }}
          />

          <div style={{ marginBottom: "2rem" }}>
            <label htmlFor="name" style={labelStyle}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label htmlFor="email" style={labelStyle}>
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "2.5rem" }}>
            <label htmlFor="message" style={labelStyle}>
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: isSubmitting ? "#0a5c56" : "#0d9488",
              color: "#ffffff",
              border: "none",
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontWeight: 600,
              fontSize: ".85rem",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              padding: "1rem 2.5rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".6rem",
            }}
          >
            {isSubmitting && (
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,.4)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin .6s linear infinite",
                }}
              />
            )}
            {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
          </button>
        </form>

        {/* INFO */}
        <div style={{ paddingTop: "1rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              letterSpacing: ".02em",
              color: "#f5f5f5",
              marginBottom: "1.5rem",
            }}
          >
            Schreib uns
          </h2>

          <p
            style={{
              color: "#666666",
              fontSize: ".95rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Ob du mitspielen, mitgestalten oder einfach mehr erfahren
            möchtest — wir melden uns persönlich bei dir.
          </p>

          <div
            style={{
              borderTop: "1px solid #1a1a1a",
              paddingTop: "2rem",
            }}
          >
            <p
              style={{
                fontSize: ".7rem",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#555555",
                marginBottom: ".5rem",
              }}
            >
              E-Mail
            </p>

            <a
              href="mailto:kontakt@mellowien.at"
              style={{
                color: "#0d9488",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              kontakt@mellowien.at
            </a>
          </div>
        </div>
      </section>

      {/* POPUP */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f0f0f",
              border: "1px solid #222222",
              padding: "3rem",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "2.5rem",
                letterSpacing: ".05em",
                color: "#0d9488",
                marginBottom: "1rem",
              }}
            >
              Nachricht verschickt
            </h2>

            <p
              style={{
                color: "#888888",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Wir melden uns so bald wie möglich bei dir.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              style={{
                background: "#0d9488",
                color: "#ffffff",
                border: "none",
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontWeight: 600,
                fontSize: ".85rem",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                padding: ".85rem 2rem",
                cursor: "pointer",
              }}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </main>
  );
}