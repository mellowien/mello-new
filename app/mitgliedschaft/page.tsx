"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function MitgliedschaftContent() {
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    beitrag: "",
  });

  const searchParams = useSearchParams();

  // Popup nach erfolgreichem Stripe Checkout
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }
  }, [searchParams]);

  // Form Inputs ändern
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Formular absenden
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanValue = formData.beitrag.replace(/[^\d.,]/g, "");
    const beitragNum = cleanValue ? parseFloat(cleanValue) : null;

    // In Supabase speichern
    const { error } = await supabase.from("mitglieder").insert([
      {
        name: formData.name,
        email: formData.email,
        beitrag: beitragNum,
      },
    ]);

    if (error) {
      alert("Fehler beim Speichern, bitte erneut versuchen.");
      console.error(error);
      return;
    }

    // Stripe Checkout Session erstellen
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: beitragNum ?? 0,
        email: formData.email,
        name: formData.name,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }

    setShowForm(false);
    setFormData({ name: "", email: "", beitrag: "" });
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-black text-white flex flex-col items-center px-6 pt-24 pb-20"
    >
      {/* Titel */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold text-center mb-6"
      >
        Werde Teil von <span className="text-mello">Mello</span>
      </motion.h1>

      {/* Beschreibung */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-gray-400 text-center max-w-2xl mb-12"
      >
        Egal ob Spieler, Supporter oder Partner – unser Verein lebt von Menschen,
        die gemeinsam etwas Großes aufbauen wollen.
      </motion.p>

      {/* ====== KARTEN (Spieler, Supporter, Sponsoren) ====== */}
      {!showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
        >
          {/* Spieler */}
          <div className="bg-black/70 border border-mello/30 rounded-2xl p-6 text-center
            shadow-[0_0_20px_rgba(13,148,136,0.25)] hover:shadow-[0_0_30px_rgba(13,148,136,0.45)]
            transition-all duration-300">
            <h2 className="text-2xl font-semibold text-mello mb-2">Spieler</h2>
            <p className="text-gray-300 mb-4">
              Jeder ist willkommen – egal ob Anfänger oder erfahren.
            </p>
            <a
              href="/kontakt"
              className="inline-block bg-mello text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Bewerben
            </a>
          </div>

          {/* Supporter */}
          <div className="bg-black/70 border border-mello/30 rounded-2xl p-6 text-center
            shadow-[0_0_20px_rgba(13,148,136,0.25)] hover:shadow-[0_0_30px_rgba(13,148,136,0.45)]
            transition-all duration-300">
            <h2 className="text-2xl font-semibold text-mello mb-2">Supporter</h2>
            <p className="text-gray-300 mb-4">
              Hilf mit bei Events, Projekten oder Organisation.
              <br />
              <span className="text-mello font-medium">Wir sind offen für alles.</span>
            </p>
            <a
              href="/kontakt"
              className="inline-block bg-mello text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Mitmachen
            </a>
          </div>

          {/* Sponsoren */}
          <div className="bg-black/70 border border-mello/30 rounded-2xl p-6 text-center
            shadow-[0_0_20px_rgba(13,148,136,0.25)] hover:shadow-[0_0_30px_rgba(13,148,136,0.45)]
            transition-all duration-300">
            <h2 className="text-2xl font-semibold text-mello mb-2">Sponsoren</h2>
            <p className="text-gray-300 mb-4">
              Unterstütze unsere Vision langfristig als Partner.
            </p>
            <a
              href="/kontakt"
              className="inline-block bg-mello text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Kontakt
            </a>
          </div>
        </motion.div>
      )}

      {/* ====== Button "Jetzt Mitglied werden" ====== */}
      {!showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4 max-w-lg mx-auto">
            Unterstütze den Verein mit einem Betrag deiner Wahl – jeder Beitrag hilft.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="bg-mello text-black font-semibold px-8 py-3 rounded-full text-lg
              hover:bg-[#0b7d71] hover:scale-105 transition-all"
          >
            Jetzt Mitglied werden
          </button>

          <p className="text-gray-500 text-sm mt-6">
            Der FC Mello Wien ist ein eingetragener gemeinnütziger Verein.
          </p>
        </motion.div>
      )}

      {/* ====== FORMULAR ====== */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-black/70 border border-mello/30 rounded-2xl p-8 max-w-md w-full
            shadow-[0_0_20px_rgba(13,148,136,0.35)]"
        >
          {/* Name */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-mello/30 rounded-lg text-gray-100
                focus:outline-none focus:border-mello transition"
            />
          </div>

          {/* E-Mail */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">E-Mail</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-mello/30 rounded-lg text-gray-100
                focus:outline-none focus:border-mello transition"
            />
          </div>

          {/* Betrag */}
          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Einmaliger Beitrag (optional)</label>
            <input
              type="text"
              name="beitrag"
              placeholder="z. B. 10 €"
              value={
                formData.beitrag ? formData.beitrag.replace(/[^\d.,]/g, "") + " €" : ""
              }
              onChange={(e) => {
                const clean = e.target.value.replace(/[^\d.,]/g, "");
                setFormData({ ...formData, beitrag: clean });
              }}
              className="w-full px-4 py-2 bg-black border border-mello/30 rounded-lg text-gray-100
                focus:outline-none focus:border-mello transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-mello text-black font-bold py-3 rounded-full text-lg
              hover:bg-[#0b7d71] hover:scale-105 transition-all"
          >
            Beitritt abschicken
          </button>
        </motion.form>
      )}

      {/* Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-mello text-black px-6 py-3 rounded-lg shadow-lg"
        >
          Willkommen beim FC Mello Wien! 🎉
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
