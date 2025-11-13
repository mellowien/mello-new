"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ❗ Kein Supabase mehr – wir zeigen nur das Popup
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);
      setFormData({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 pt-28 pb-20">

      {/* Titel */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
      >
        Kontaktiere <span className="text-teal-300">Mello</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-400 mb-10 text-center max-w-xl"
      >
        Egal ob Fragen, Ideen, Bewerbungen oder Kooperationen —
        wir freuen uns über jede Nachricht.
      </motion.p>

      {/* Formular */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-xl bg-black/70 border border-teal-400/30 rounded-2xl p-6 md:p-8 shadow-[0_0_25px_rgba(45,212,191,0.25)]"
      >
        <div className="mb-5">
          <label className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-teal-400/30 rounded-lg text-gray-200 focus:border-teal-300 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-300 mb-2">E-Mail</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-teal-400/30 rounded-lg text-gray-200 focus:border-teal-300 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Nachricht</label>
          <textarea
            rows={5}
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-teal-400/30 rounded-lg text-gray-200 resize-none focus:border-teal-300 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-teal-400 text-black font-semibold py-2 text-lg shadow-[0_0_25px_rgba(45,212,191,0.85)]
            hover:bg-teal-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(45,212,191,1)]
            transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "Senden..." : "Nachricht senden"}
        </button>
      </motion.form>

      {/* Erfolgspopup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="bg-black border border-teal-300/40 rounded-2xl p-8 max-w-sm text-center shadow-[0_0_25px_rgba(45,212,191,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-teal-300 mb-3">
                Nachricht verschickt!
              </h2>
              <p className="text-gray-300 mb-6">
                Wir melden uns so schnell wie möglich bei dir.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="rounded-full bg-teal-400 text-black font-semibold px-6 py-2 hover:bg-teal-300 transition-all"
              >
                Schließen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direktkontakt */}
      <p className="text-gray-500 mt-8 text-sm">
        Oder direkt via E-Mail:{" "}
        <a href="mailto:kontakt@mellowien.at" className="text-teal-300 hover:underline">
          kontakt@mellowien.at
        </a>
      </p>
    </main>
  );
}
