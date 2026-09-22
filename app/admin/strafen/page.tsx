"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Filter = "all" | "open" | "paid";

type PlayerProfile = {
  id: string;
  full_name: string | null;
  email: string;
  role: string | null;
};

type PlayerFine = {
  id: string;
  player_id: string;
  rule: string;
  amount: number | string;
  note: string | null;
  issued_at: string;
  paid_at: string | null;
  created_by: string | null;
  created_at: string;
  profiles: PlayerProfile | null;
};

const fineRules = [
  { label: "Unentschuldigte Verspätung beim Training", amount: "1.00" },
  { label: "Unentschuldigt zu spät beim Spiel / Treffpunkt", amount: "2.50" },
  { label: "Unentschuldigtes Fehlen beim Training", amount: "10.00" },
  { label: "Unentschuldigtes Fehlen beim Spiel", amount: "50.00" },
  { label: "Am Abend vor dem Spiel fortgehen", amount: "25.00" },
  { label: "Nicht im Trainingstrikot beim Training", amount: "5.00" },
  {
    label: "Trainingstrikot vor dem Spiel beim Aufwärmen nicht an",
    amount: "10.00",
  },
  { label: "Gelbe Karte wegen Meckern", amount: "3.00" },
  { label: "Gelbe Karte wegen Unsportlichkeit", amount: "5.00" },
  {
    label: "Rote Karte wegen Meckern / Unsportlichkeit / Tätlichkeit",
    amount: "20.00",
  },
  { label: "Handy klingelt während der Besprechung", amount: "2.00" },
  {
    label: "Am Handy während der Besprechung / Ansprache",
    amount: "3.00",
  },
  { label: "Lauftraining unentschuldigt ausgelassen", amount: "10.00" },
  { label: "Sonstige Strafe", amount: "" },
];

function formatCurrency(amount: number | string) {
  const parsedAmount =
    typeof amount === "number" ? amount : Number.parseFloat(amount);

  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
  }).format(Number.isFinite(parsedAmount) ? parsedAmount : 0);
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatDateTime(dateValue: string | null) {
  if (!dateValue) {
    return "—";
  }

  return new Intl.DateTimeFormat("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function getPlayerName(profile: PlayerProfile | null) {
  const fullName = profile?.full_name?.trim();

  if (fullName) {
    return fullName;
  }

  const emailPrefix = profile?.email?.split("@")[0];

  if (emailPrefix) {
    return emailPrefix
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  return "Unbekannter Spieler";
}

export default function AdminStrafenPage() {
  const router = useRouter();

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [fines, setFines] = useState<PlayerFine[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>("open");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savingFineId, setSavingFineId] = useState<string | null>(null);
  const [pageError, setPageError] = useState("");
  const [pageSuccess, setPageSuccess] = useState("");

  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [selectedRule, setSelectedRule] = useState(fineRules[0].label);
  const [amount, setAmount] = useState(fineRules[0].amount);
  const [note, setNote] = useState("");

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
        router.replace("/login?next=/admin/strafen");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", session.user.id)
        .single();

      if (!isMounted) {
        return;
      }

      if (error || !profile || profile.role !== "admin") {
        router.replace("/spielerbereich");
        return;
      }

      setAdminId(session.user.id);
      setIsCheckingSession(false);
    }

    checkAdminSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (!adminId) {
      return;
    }

    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setPageError("");

      const { data: playerData, error: playerError } = await supabase
        .from("profiles")
        .select("id, full_name, email, role")
        .order("full_name", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (playerError) {
        setPageError(
          "Die Spielerliste konnte nicht geladen werden. Bitte versuche es später erneut.",
        );
        setIsLoading(false);
        return;
      }

      const activePlayers = ((playerData ?? []) as PlayerProfile[]).filter(
        (player) => player.role !== "admin" && player.role !== "coach",
      );

      setPlayers(activePlayers);

      const { data: fineData, error: fineError } = await supabase
        .from("player_fines")
        .select(
          "id, player_id, rule, amount, note, issued_at, paid_at, created_by, created_at, profiles!player_fines_player_id_fkey(id, full_name, email, role)",
        )
        .order("issued_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (fineError) {
        setPageError(
          `Die Strafen konnten nicht geladen werden: ${fineError.message}`,
        );
        setIsLoading(false);
        return;
      }

      setFines((fineData ?? []) as unknown as PlayerFine[]);
      setIsLoading(false);
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [adminId]);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((first, second) =>
      getPlayerName(first).localeCompare(getPlayerName(second), "de"),
    );
  }, [players]);

  const totals = useMemo(() => {
    const openFines = fines.filter((fine) => !fine.paid_at);
    const paidFines = fines.filter((fine) => fine.paid_at);

    const sumAmounts = (items: PlayerFine[]) =>
      items.reduce((sum, item) => {
        const value =
          typeof item.amount === "number"
            ? item.amount
            : Number.parseFloat(item.amount);

        return sum + (Number.isFinite(value) ? value : 0);
      }, 0);

    return {
      openCount: openFines.length,
      paidCount: paidFines.length,
      totalCount: fines.length,
      openAmount: sumAmounts(openFines),
      paidAmount: sumAmounts(paidFines),
      totalAmount: sumAmounts(fines),
    };
  }, [fines]);

  const filteredFines = useMemo(() => {
    const nextFines = fines.filter((fine) => {
      if (activeFilter === "open") {
        return !fine.paid_at;
      }

      if (activeFilter === "paid") {
        return Boolean(fine.paid_at);
      }

      return true;
    });

    return [...nextFines].sort(
      (first, second) =>
        new Date(second.issued_at).getTime() -
        new Date(first.issued_at).getTime(),
    );
  }, [activeFilter, fines]);

  function handleRuleChange(nextRule: string) {
    setSelectedRule(nextRule);

    const rule = fineRules.find((item) => item.label === nextRule);

    if (rule) {
      setAmount(rule.amount);
    }
  }

  async function handleCreateFine(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!adminId) {
      return;
    }

    const parsedAmount = Number.parseFloat(amount.replace(",", "."));
    const trimmedNote = note.trim();

    if (!selectedPlayerId) {
      setPageError("Bitte wähle einen Spieler aus.");
      return;
    }

    if (!selectedRule.trim()) {
      setPageError("Bitte wähle einen Verstoß aus.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setPageError("Bitte gib einen gültigen Betrag größer als 0 ein.");
      return;
    }

    setIsSaving(true);
    setPageError("");
    setPageSuccess("");

    const { data, error } = await supabase
      .from("player_fines")
      .insert({
        player_id: selectedPlayerId,
        rule: selectedRule.trim(),
        amount: parsedAmount,
        note: trimmedNote || null,
        created_by: adminId,
      })
      .select(
        "id, player_id, rule, amount, note, issued_at, paid_at, created_by, created_at, profiles!player_fines_player_id_fkey(id, full_name, email, role)",
      )
      .single();

    if (error || !data) {
      setPageError(
        error?.message ||
          "Die Strafe konnte nicht gespeichert werden. Bitte versuche es erneut.",
      );
      setIsSaving(false);
      return;
    }

    const createdFine = data as unknown as PlayerFine;

    setFines((currentFines) => [createdFine, ...currentFines]);
    setSelectedPlayerId("");
    setSelectedRule(fineRules[0].label);
    setAmount(fineRules[0].amount);
    setNote("");
    setPageSuccess(
      `${getPlayerName(createdFine.profiles)}: Strafe wurde angelegt.`,
    );
    setIsSaving(false);
  }

  async function togglePaidStatus(fine: PlayerFine) {
    setSavingFineId(fine.id);
    setPageError("");
    setPageSuccess("");

    const nextPaidAt = fine.paid_at ? null : new Date().toISOString();

    const { data, error } = await supabase
      .from("player_fines")
      .update({
        paid_at: nextPaidAt,
      })
      .eq("id", fine.id)
      .select(
        "id, player_id, rule, amount, note, issued_at, paid_at, created_by, created_at, profiles!player_fines_player_id_fkey(id, full_name, email, role)",
      )
      .single();

    if (error || !data) {
      setPageError(
        error?.message ||
          "Der Zahlungsstatus konnte nicht geändert werden. Bitte versuche es erneut.",
      );
      setSavingFineId(null);
      return;
    }

    const updatedFine = data as unknown as PlayerFine;

    setFines((currentFines) =>
      currentFines.map((currentFine) =>
        currentFine.id === fine.id ? updatedFine : currentFine,
      ),
    );

    setPageSuccess(
      fine.paid_at
        ? `${getPlayerName(fine.profiles)}: Strafe wieder als offen markiert.`
        : `${getPlayerName(fine.profiles)}: Zahlung als beglichen markiert.`,
    );
    setSavingFineId(null);
  }

  async function deleteFine(fine: PlayerFine) {
    const confirmed = window.confirm(
      `Strafe wirklich löschen?\n\n${getPlayerName(fine.profiles)}\n${fine.rule}\n${formatCurrency(fine.amount)}`,
    );

    if (!confirmed) {
      return;
    }

    setSavingFineId(fine.id);
    setPageError("");
    setPageSuccess("");

    const { error } = await supabase
      .from("player_fines")
      .delete()
      .eq("id", fine.id);

    if (error) {
      setPageError(
        error.message ||
          "Die Strafe konnte nicht gelöscht werden. Bitte versuche es erneut.",
      );
      setSavingFineId(null);
      return;
    }

    setFines((currentFines) =>
      currentFines.filter((currentFine) => currentFine.id !== fine.id),
    );

    setPageSuccess(
      `${getPlayerName(fine.profiles)}: Strafe wurde gelöscht.`,
    );
    setSavingFineId(null);
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#080808]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-500">
          Strafenkatalog wird geladen …
        </p>
      </main>
    );
  }

  return (
    <main className="fines-page">
      <style>{`
        .fines-page {
          --black: #080808;
          --white: #f7f7f4;
          --teal: #0d9488;
          --line: #292929;
          --muted: rgba(247, 247, 244, .58);
          --yellow: #f59e0b;
          --red: #f87171;
          --green: #34d399;

          background:
            radial-gradient(
              ellipse 48% 54% at 90% 6%,
              rgba(13, 148, 136, .14) 0%,
              transparent 72%
            ),
            var(--black);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding: 7rem 0 5rem;
        }

        .fines-page *,
        .fines-page *::before,
        .fines-page *::after {
          box-sizing: border-box;
        }

        .fines-container {
          margin: 0 auto;
          width: min(100% - 4rem, 1320px);
        }

        .fines-back {
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

        .fines-back:hover {
          color: var(--white);
        }

        .fines-header {
          align-items: end;
          border-bottom: 1px solid var(--line);
          display: flex;
          gap: 2rem;
          justify-content: space-between;
          margin: 1.6rem 0 2rem;
          padding-bottom: 2rem;
        }

        .fines-kicker {
          color: var(--teal);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .fines-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.7rem, 5vw, 5rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .86;
          margin: 0;
          text-transform: uppercase;
        }

        .fines-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.3px var(--teal);
        }

        .fines-intro {
          color: var(--muted);
          font-size: .9rem;
          line-height: 1.6;
          margin: 0;
          max-width: 38ch;
          text-align: right;
        }

        .fines-summary {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-bottom: 2rem;
        }

        .fines-summary-card {
          background: rgba(247, 247, 244, .025);
          border: 1px solid rgba(247, 247, 244, .14);
          padding: 1.15rem 1.2rem;
        }

        .fines-summary-label {
          color: rgba(247, 247, 244, .5);
          display: block;
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .1em;
          margin-bottom: .6rem;
          text-transform: uppercase;
        }

        .fines-summary-value {
          color: var(--white);
          display: block;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 900;
          letter-spacing: -.065em;
          line-height: .95;
        }

        .fines-summary-card-open .fines-summary-value {
          color: #fcd34d;
        }

        .fines-summary-card-paid .fines-summary-value {
          color: #5eead4;
        }

        .fines-summary-card-total .fines-summary-value {
          color: #c4b5fd;
        }

        .fines-summary-note {
          color: rgba(247, 247, 244, .46);
          display: block;
          font-size: .72rem;
          line-height: 1.4;
          margin-top: .5rem;
        }

        .fines-layout {
          align-items: start;
          display: grid;
          gap: 1.5rem;
          grid-template-columns: minmax(280px, .72fr) minmax(0, 1.5fr);
        }

        .fines-card {
          background:
            radial-gradient(
              ellipse 72% 150% at 100% 0%,
              rgba(13, 148, 136, .08) 0%,
              transparent 68%
            ),
            rgba(247, 247, 244, .018);
          border: 1px solid rgba(247, 247, 244, .14);
          padding: 1.35rem;
        }

        .fines-card-title {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: -.035em;
          line-height: 1;
          margin: 0;
          text-transform: uppercase;
        }

        .fines-card-intro {
          color: var(--muted);
          font-size: .78rem;
          line-height: 1.55;
          margin: .7rem 0 1.25rem;
        }

        .fines-form {
          display: grid;
          gap: 1rem;
        }

        .fines-field {
          display: grid;
          gap: .45rem;
        }

        .fines-label {
          color: rgba(247, 247, 244, .74);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .fines-label span {
          color: rgba(247, 247, 244, .38);
          font-weight: 700;
          letter-spacing: 0;
          text-transform: none;
        }

        .fines-input,
        .fines-select,
        .fines-textarea {
          background: rgba(0, 0, 0, .28);
          border: 1px solid rgba(247, 247, 244, .18);
          color: var(--white);
          font-family: inherit;
          font-size: .88rem;
          padding: .78rem .82rem;
          width: 100%;
        }

        .fines-input:focus,
        .fines-select:focus,
        .fines-textarea:focus {
          border-color: var(--teal);
          outline: none;
        }

        .fines-select option {
          background: #111;
          color: #fff;
        }

        .fines-textarea {
          line-height: 1.5;
          min-height: 100px;
          resize: vertical;
        }

        .fines-form-row {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr 120px;
        }

        .fines-button {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .24);
          color: var(--white);
          cursor: pointer;
          font-family: inherit;
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .07em;
          min-height: 44px;
          padding: .72rem .9rem;
          text-transform: uppercase;
        }

        .fines-button:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .fines-button-primary {
          background: var(--teal);
          border-color: var(--teal);
          color: #001b18;
          width: 100%;
        }

        .fines-button-primary:hover:not(:disabled) {
          background: #14b8a6;
          border-color: #14b8a6;
        }

        .fines-button:disabled {
          cursor: not-allowed;
          opacity: .5;
        }

        .fines-message {
          border: 1px solid rgba(247, 247, 244, .15);
          color: var(--muted);
          font-size: .82rem;
          line-height: 1.55;
          margin: 1rem 0 0;
          padding: .8rem .9rem;
        }

        .fines-message-error {
          border-color: rgba(248, 113, 113, .45);
          color: #fca5a5;
        }

        .fines-message-success {
          border-color: rgba(94, 234, 212, .4);
          color: #5eead4;
        }

        .fines-list-head {
          align-items: center;
          border-bottom: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
        }

        .fines-filters {
          display: flex;
          flex-wrap: wrap;
          gap: .45rem;
        }

        .fines-filter {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .17);
          color: rgba(247, 247, 244, .62);
          cursor: pointer;
          font-family: inherit;
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .06em;
          padding: .5rem .6rem;
          text-transform: uppercase;
        }

        .fines-filter:hover,
        .fines-filter-active {
          background: rgba(13, 148, 136, .14);
          border-color: var(--teal);
          color: #5eead4;
        }

        .fines-filter-count {
          margin-left: .32rem;
          opacity: .7;
        }

        .fines-list {
          display: grid;
          gap: .85rem;
        }

        .fine-row {
          background: rgba(0, 0, 0, .18);
          border: 1px solid rgba(247, 247, 244, .12);
          display: grid;
          gap: 1rem;
          grid-template-columns: minmax(10rem, .75fr) minmax(14rem, 1.25fr) minmax(9rem, .7fr);
          padding: 1rem;
        }

        .fine-player {
          min-width: 0;
        }

        .fine-player-name {
          color: var(--white);
          font-size: .9rem;
          font-weight: 900;
          line-height: 1.3;
          margin: 0;
        }

        .fine-player-email {
          color: rgba(247, 247, 244, .42);
          font-size: .68rem;
          line-height: 1.4;
          margin: .25rem 0 0;
          overflow-wrap: anywhere;
        }

        .fine-rule {
          color: var(--white);
          font-size: .85rem;
          font-weight: 800;
          line-height: 1.4;
          margin: 0;
        }

        .fine-note-label {
          color: rgba(247, 247, 244, .4);
          font-size: .57rem;
          font-weight: 900;
          letter-spacing: .08em;
          margin: .55rem 0 .18rem;
          text-transform: uppercase;
        }

        .fine-note {
          color: rgba(247, 247, 244, .58);
          font-size: .72rem;
          line-height: 1.45;
          margin: 0;
          white-space: pre-wrap;
        }

        .fine-issued {
          color: rgba(247, 247, 244, .43);
          font-size: .66rem;
          line-height: 1.4;
          margin: .55rem 0 0;
        }

        .fine-side {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          gap: .65rem;
        }

        .fine-amount {
          color: #fcd34d;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: -.045em;
          line-height: 1;
        }

        .fine-row-paid .fine-amount {
          color: #5eead4;
        }

        .fine-status {
          border: 1px solid rgba(245, 158, 11, .52);
          color: #fcd34d;
          font-size: .58rem;
          font-weight: 900;
          letter-spacing: .07em;
          padding: .3rem .42rem;
          text-transform: uppercase;
        }

        .fine-status-paid {
          border-color: rgba(52, 211, 153, .55);
          color: #5eead4;
        }

        .fine-paid-date {
          color: rgba(94, 234, 212, .62);
          font-size: .64rem;
          line-height: 1.4;
          margin: 0;
        }

        .fine-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .45rem;
          margin-top: auto;
        }

        .fine-action {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .2);
          color: var(--white);
          cursor: pointer;
          font-family: inherit;
          font-size: .58rem;
          font-weight: 900;
          letter-spacing: .05em;
          min-height: 34px;
          padding: .45rem .55rem;
          text-transform: uppercase;
        }

        .fine-action:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .fine-action-paid {
          border-color: rgba(52, 211, 153, .55);
          color: #5eead4;
        }

        .fine-action-reopen {
          border-color: rgba(245, 158, 11, .55);
          color: #fcd34d;
        }

        .fine-action-delete {
          border-color: rgba(248, 113, 113, .55);
          color: #fca5a5;
        }

        .fine-action:disabled {
          cursor: not-allowed;
          opacity: .45;
        }

        .fines-empty {
          border: 1px solid rgba(247, 247, 244, .14);
          color: var(--muted);
          font-size: .88rem;
          line-height: 1.6;
          padding: 1.5rem;
        }

        @media (max-width: 980px) {
          .fines-container {
            width: min(100% - 2.5rem, 860px);
          }

          .fines-header {
            align-items: flex-start;
            display: grid;
          }

          .fines-intro {
            text-align: left;
          }

          .fines-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 680px) {
          .fines-page {
            padding-top: 5.5rem;
          }

          .fines-container {
            width: min(100% - 2rem, 860px);
          }

          .fines-summary {
            grid-template-columns: 1fr;
            gap: .7rem;
          }

          .fines-form-row {
            grid-template-columns: 1fr;
          }

          .fines-list-head {
            align-items: flex-start;
            display: block;
          }

          .fines-filters {
            margin-top: .9rem;
          }

          .fine-row {
            grid-template-columns: 1fr;
          }

          .fine-side {
            border-top: 1px solid rgba(247, 247, 244, .1);
            padding-top: .9rem;
          }
        }
      `}</style>

      <div className="fines-container">
        <button
          className="fines-back"
          onClick={() => router.push("/admin")}
          type="button"
        >
          ← Zur Admin-Übersicht
        </button>

        <header className="fines-header">
          <div>
            <p className="fines-kicker">FC Mello Wien · Admin</p>

            <h1 className="fines-title">
              Strafen
              <span>verwalten.</span>
            </h1>
          </div>

          <p className="fines-intro">
            Erfasse Verstöße, behalte offene Beträge im Blick und markiere
            Zahlungen als beglichen.
          </p>
        </header>

        <section className="fines-summary" aria-label="Strafenübersicht">
          <article className="fines-summary-card fines-summary-card-open">
            <span className="fines-summary-label">Offen</span>
            <strong className="fines-summary-value">
              {formatCurrency(totals.openAmount)}
            </strong>
            <span className="fines-summary-note">
              {totals.openCount} offene{" "}
              {totals.openCount === 1 ? "Strafe" : "Strafen"}
            </span>
          </article>

          <article className="fines-summary-card fines-summary-card-paid">
            <span className="fines-summary-label">Beglichen</span>
            <strong className="fines-summary-value">
              {formatCurrency(totals.paidAmount)}
            </strong>
            <span className="fines-summary-note">
              {totals.paidCount} beglichene{" "}
              {totals.paidCount === 1 ? "Strafe" : "Strafen"}
            </span>
          </article>

          <article className="fines-summary-card fines-summary-card-total">
            <span className="fines-summary-label">Gesamt erfasst</span>
            <strong className="fines-summary-value">
              {formatCurrency(totals.totalAmount)}
            </strong>
            <span className="fines-summary-note">
              {totals.totalCount} Einträge insgesamt
            </span>
          </article>
        </section>

        <div className="fines-layout">
          <section className="fines-card">
            <h2 className="fines-card-title">Neue Strafe</h2>

            <p className="fines-card-intro">
              Die Strafe wird zunächst als offen angelegt und kann später als
              bezahlt markiert werden.
            </p>

            <form className="fines-form" onSubmit={handleCreateFine}>
              <label className="fines-field">
                <span className="fines-label">Spieler</span>

                <select
                  className="fines-select"
                  onChange={(event) => setSelectedPlayerId(event.target.value)}
                  required
                  value={selectedPlayerId}
                >
                  <option value="">Spieler auswählen …</option>

                  {sortedPlayers.map((player) => (
                    <option key={player.id} value={player.id}>
                      {getPlayerName(player)}
                      {player.email ? ` · ${player.email}` : ""}
                    </option>
                  ))}
                </select>
              </label>

              <label className="fines-field">
                <span className="fines-label">Verstoß</span>

                <select
                  className="fines-select"
                  onChange={(event) => handleRuleChange(event.target.value)}
                  value={selectedRule}
                >
                  {fineRules.map((rule) => (
                    <option key={rule.label} value={rule.label}>
                      {rule.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="fines-form-row">
                <label className="fines-field">
                  <span className="fines-label">Betrag in Euro</span>

                  <input
                    className="fines-input"
                    inputMode="decimal"
                    min="0.01"
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="10.00"
                    required
                    step="0.01"
                    type="number"
                    value={amount}
                  />
                </label>

                <div className="fines-field">
                  <span className="fines-label">Vorschau</span>

                  <div className="fines-input">
                    {formatCurrency(amount)}
                  </div>
                </div>
              </div>

              <label className="fines-field">
                <span className="fines-label">
                  Hinweis <span>optional</span>
                </span>

                <textarea
                  className="fines-textarea"
                  maxLength={500}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Zum Beispiel: 15 Minuten zu spät zum Training am 22.09."
                  value={note}
                />
              </label>

              <button
                className="fines-button fines-button-primary"
                disabled={isSaving || isLoading}
                type="submit"
              >
                {isSaving ? "Strafe wird angelegt …" : "+ Strafe anlegen"}
              </button>
            </form>

            {pageError ? (
              <p className="fines-message fines-message-error">
                {pageError}
              </p>
            ) : null}

            {pageSuccess ? (
              <p className="fines-message fines-message-success">
                {pageSuccess}
              </p>
            ) : null}
          </section>

          <section className="fines-card">
            <div className="fines-list-head">
              <div>
                <h2 className="fines-card-title">Strafenübersicht</h2>

                <p className="fines-card-intro">
                  Offene Beträge können nach Zahlung direkt als beglichen
                  markiert werden.
                </p>
              </div>

              <nav className="fines-filters" aria-label="Strafen filtern">
                {(
                  [
                    ["open", "Offen", totals.openCount],
                    ["paid", "Beglichen", totals.paidCount],
                    ["all", "Alle", totals.totalCount],
                  ] as const
                ).map(([filter, label, count]) => (
                  <button
                    className={`fines-filter ${
                      activeFilter === filter ? "fines-filter-active" : ""
                    }`}
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setPageError("");
                      setPageSuccess("");
                    }}
                    type="button"
                  >
                    {label}
                    <span className="fines-filter-count">{count}</span>
                  </button>
                ))}
              </nav>
            </div>

            {isLoading ? (
              <p className="fines-empty">Strafen werden geladen …</p>
            ) : filteredFines.length === 0 ? (
              <p className="fines-empty">
                {activeFilter === "open"
                  ? "Aktuell gibt es keine offenen Strafen."
                  : activeFilter === "paid"
                    ? "Aktuell gibt es keine beglichenen Strafen."
                    : "Es wurden noch keine Strafen erfasst."}
              </p>
            ) : (
              <div className="fines-list">
                {filteredFines.map((fine) => {
                  const isSavingFine = savingFineId === fine.id;

                  return (
                    <article
                      className={`fine-row ${
                        fine.paid_at ? "fine-row-paid" : ""
                      }`}
                      key={fine.id}
                    >
                      <div className="fine-player">
                        <p className="fine-player-name">
                          {getPlayerName(fine.profiles)}
                        </p>

                        {fine.profiles?.email ? (
                          <p className="fine-player-email">
                            {fine.profiles.email}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <p className="fine-rule">{fine.rule}</p>

                        {fine.note ? (
                          <>
                            <p className="fine-note-label">Hinweis</p>
                            <p className="fine-note">{fine.note}</p>
                          </>
                        ) : null}

                        <p className="fine-issued">
                          Erfasst am {formatDate(fine.issued_at)}
                        </p>
                      </div>

                      <div className="fine-side">
                        <strong className="fine-amount">
                          {formatCurrency(fine.amount)}
                        </strong>

                        <span
                          className={`fine-status ${
                            fine.paid_at ? "fine-status-paid" : ""
                          }`}
                        >
                          {fine.paid_at ? "Beglichen" : "Offen"}
                        </span>

                        {fine.paid_at ? (
                          <p className="fine-paid-date">
                            Bezahlt am {formatDateTime(fine.paid_at)}
                          </p>
                        ) : null}

                        <div className="fine-actions">
                          <button
                            className={`fine-action ${
                              fine.paid_at
                                ? "fine-action-reopen"
                                : "fine-action-paid"
                            }`}
                            disabled={isSavingFine}
                            onClick={() => togglePaidStatus(fine)}
                            type="button"
                          >
                            {isSavingFine
                              ? "Speichert …"
                              : fine.paid_at
                                ? "Wieder öffnen"
                                : "✓ Beglichen"}
                          </button>

                          <button
                            className="fine-action fine-action-delete"
                            disabled={isSavingFine}
                            onClick={() => deleteFine(fine)}
                            type="button"
                          >
                            Löschen
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}