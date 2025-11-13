"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function MitgliedschaftContent() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    beitrag: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const searchParams = useSearchParams();

  // Popup nach erfolgreichem Stripe Checkout
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanBeitrag = formData.beitrag.replace(/[^\d.,]/g, "");
    const beitragNumber = cleanBeitrag ? parseFloat(cleanBeitrag) : null;

    const { error } = await supabase.from("mitglieder").insert([
      {
        name: formData.name,
        email: formData.email,
        beitrag: beitragNumber,
      },
    ]);

    if (error) {
      alert("Fehler beim Absenden. Bitte versuche es erneut.");
      console.error(error);
      return;
    }

    // Stripe Checkout Weiterleitung
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: beitragNumber ?? 0,
        email: formData.email,
        name: formData.name,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-start min-h-screen bg-black text-white px-6 pt-6 pb-16"
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
      >
        Werde Teil von <span className="text-[#0d9488]">Mello</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 mb-10 text-center max-w-2xl"
      >
        Egal ob Spieler, Supporter oder Partner – unser Verein lebt von Menschen,
        die gemeinsam etwas Großes aufbauen wollen.
      </motion.p>

      {/* Drei Boxen */}
      {!showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        >
          {/* Spieler */}
          <div className="bg-black/70 border border-[#0d9488]/30 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.2)] hover:shadow-[0_0_25px_rgba(13,148,136,0.4)] transition-all duration-300">
            <h2 className="text-2xl font-semibold text-[#0d9488] mb-2">Spieler</h2>
            <p className="text-gray-400 mb-4">
              Jeder ist willkommen – egal ob Anfänger oder erfahren.
            </p>
            <a
              href="/kontakt"
              className="
                inline-block rounded-full px-5 py-2 font-semibold text-black
                bg-[#0d9488]
                shadow-[0_0_15px_rgba(13,148,136,0.5)]
                hover:shadow-[0_0_25px_rgba(13,148,136,0.7)]
                hover:scale-105
                transition-all duration-300
              "
            >
              Bewerben
            </a>
          </div>

          {/* Supporter */}
          <div className="bg-black/70 border border-[#0d9488]/30 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.2)] hover:shadow-[0_0_25px_rgba(13,148,136,0.4)] transition-all duration-300">
            <h2 className="text-2xl font-semibold text-[#0d9488] mb-2">Supporter</h2>
            <p className="text-gray-400 mb-4">
              Hilf mit bei Events, Projekten oder Organisation. <br /> Wir sind offen für alles.
            </p>
            <a
              href="/kontakt"
              className="
                inline-block rounded-full px-5 py-2 font-semibold text-black
                bg-[#0d9488]
                shadow-[0_0_15px_rgba(13,148,136,0.5)]
                hover:shadow-[0_0_25px_rgba(13,148,136,0.7)]
                hover:scale-105
                transition-all duration-300
              "
            >
              Mitmachen
            </a>
          </div>

          {/* Sponsoren */}
          <div className="bg-black/70 border border-[#0d9488]/30 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(13,148,136,0.2)] hover:shadow-[0_0_25px_rgba(13,148,136,0.4)] transition-all duration-300">
            <h2 className="text-2xl font-semibold text-[#0d9488] mb-2">Sponsoren</h2>
            <p className="text-gray-400 mb-4">
              Unterstütze unsere Vision langfristig als Partner.
            </p>
            <a
              href="/kontakt"
              className="
                inline-block rounded-full px-5 py-2 font-semibold text-black
                bg-[#0d9488]
                shadow-[0_0_15px_rgba(13,148,136,0.5)]
                hover:shadow-[0_0_25px_rgba(13,148,136,0.7)]
                hover:scale-105
                transition-all duration-300
              "
            >
              Kontakt
            </a>
          </div>
        </motion.div>
      )}

      {/* Jetzt Mitglied werden */}
      {!showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-14 text-center"
        >
          <p className="text-gray-400 mb-4 max-w-lg mx-auto">
            Unterstütze den Verein mit einem Beitrag deiner Wahl – jeder Betrag hilft.
          </p>

          {/* Glow Button */}
          <button
            onClick={() => setShowForm(true)}
            className="
              relative inline-block rounded-full px-8 py-3 text-lg font-semibold text-black
              bg-[#0d9488]
              shadow-[0_0_20px_4px_rgba(13,148,136,0.6)]
              hover:shadow-[0_0_30px_6px_rgba(13,148,136,0.8)]
              hover:scale-105
              transition-all duration-300
            "
          >
            Jetzt Mitglied werden
          </button>

          <p className="text-gray-500 mt-6 text-sm">
            Der FC Mello Wien ist ein eingetragener{" "}
            <strong>gemeinnütziger</strong> Verein.
          </p>
        </motion.div>
      )}

      {/* Formular */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-black/70 border border-[#0d9488]/30 rounded-2xl p-6 w-full max-w-md shadow-[0_0_20px_rgba(13,148,136,0.2)]"
        >
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-[#0d9488]/30 rounded-lg text-gray-200 focus:outline-none focus:border-[#0d9488] transition"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-300 mb-2">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-[#0d9488]/30 rounded-lg text-gray-200 focus:outline-none focus:border-[#0d9488] transition"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="beitrag" className="block text-gray-300 mb-2">
              Einmaliger Beitrag (optional)
            </label>
            <input
              type="text"
              id="beitrag"
              name="beitrag"
              placeholder="z. B. 10 €"
              value={
                formData.beitrag
                  ? formData.beitrag.replace(/[^\d.,]/g, "") + " €"
                  : ""
              }
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/[^\d.,]/g, "");
                setFormData({ ...formData, beitrag: cleanValue });
              }}
              className="w-full px-4 py-2 bg-black border border-[#0d9488]/30 rounded-lg text-gray-200 focus:outline-none focus:border-[#0d9488] transition"
            />
          </div>

          <button
            type="submit"
            className="
              relative inline-block rounded-full w-full py-2 text-lg font-semibold text-black
              bg-[#0d9488]
              shadow-[0_0_20px_4px_rgba(13,148,136,0.6)]
              hover:shadow-[0_0_30px_6px_rgba(13,148,136,0.8)]
              hover:scale-105
              transition-all duration-300
            "
          >
            Beitritt abschicken
          </button>
        </motion.form>
      )}

      {/* Erfolg Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 bg-[#0d9488] text-black px-6 py-3 rounded-lg shadow-lg font-medium"
        >
          ✅ Beitritt erfolgreich! Willkommen bei Mello.
        </motion.div>
      )}
    </motion.main>
  );
}

export default function MitgliedschaftPage() {
  return (
    <Suspense fallback={<div className="text-center pt-20">Lade...</div>}>
      <MitgliedschaftContent />
    </Suspense>
  );
}
