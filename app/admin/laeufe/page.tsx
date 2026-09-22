"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type RunStatus = "open" | "submitted";
type FinalStatus = "pending" | "approved" | "rejected";
type Filter = "review" | "open" | "approved" | "rejected";

type RunEvent = {
  id: string;
  title: string;
  starts_at: string;
  description: string | null;
  all_day: boolean;
};

type PlayerProfile = {
  id: string;
  full_name: string | null;
  email: string;
};

type RunAttendance = {
  id: string;
  event_id: string;
  player_id: string;
  response_status: RunStatus;
  final_status: FinalStatus;
  player_note: string | null;
  responded_at: string | null;
  approved_at: string | null;
  admin_note: string | null;
  profiles: PlayerProfile | null;
};

const filterLabels: Record<Filter, string> = {
  review: "Zu prüfen",
  open: "Noch offen",
  approved: "Bestätigt",
  rejected: "Abgelehnt",
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("de-AT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatDateTime(dateValue: string | null) {
  if (!dateValue) {
    return "—";
  }

  return new Intl.DateTimeFormat("de-AT", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function getPlayerName(attendance: RunAttendance) {
  const fullName = attendance.profiles?.full_name?.trim();

  if (fullName) {
    const nameParts = fullName.split(/\s+/);

    return nameParts[nameParts.length - 1];
  }

  const emailPrefix = attendance.profiles?.email?.split("@")[0];

  if (emailPrefix) {
    return emailPrefix
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  return "Unbekannter Spieler";
}

function isReviewAttendance(attendance: RunAttendance) {
  return (
    attendance.response_status === "submitted" &&
    attendance.final_status === "pending"
  );
}

function isOpenAttendance(attendance: RunAttendance) {
  return attendance.response_status === "open";
}

function isApprovedAttendance(attendance: RunAttendance) {
  return attendance.final_status === "approved";
}

function isRejectedAttendance(attendance: RunAttendance) {
  return attendance.final_status === "rejected";
}

export default function AdminLaeufePage() {
  const router = useRouter();

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [events, setEvents] = useState<RunEvent[]>([]);
  const [attendances, setAttendances] = useState<RunAttendance[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>("review");
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [pageSuccess, setPageSuccess] = useState("");
  const [savingAttendanceId, setSavingAttendanceId] = useState<string | null>(
    null,
  );
  const [rejectingAttendanceId, setRejectingAttendanceId] = useState<
    string | null
  >(null);
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});

  const eventsById = useMemo(() => {
    return events.reduce<Record<string, RunEvent>>((result, event) => {
      result[event.id] = event;
      return result;
    }, {});
  }, [events]);

  const counts = useMemo(() => {
    return {
      review: attendances.filter(isReviewAttendance).length,
      open: attendances.filter(isOpenAttendance).length,
      approved: attendances.filter(isApprovedAttendance).length,
      rejected: attendances.filter(isRejectedAttendance).length,
    };
  }, [attendances]);

  const filteredAttendances = useMemo(() => {
    const nextAttendances = attendances.filter((attendance) => {
      if (activeFilter === "review") {
        return isReviewAttendance(attendance);
      }

      if (activeFilter === "open") {
        return isOpenAttendance(attendance);
      }

      if (activeFilter === "approved") {
        return isApprovedAttendance(attendance);
      }

      return isRejectedAttendance(attendance);
    });

    return [...nextAttendances].sort((first, second) => {
      const firstEvent = eventsById[first.event_id];
      const secondEvent = eventsById[second.event_id];

      return (
        new Date(secondEvent?.starts_at ?? 0).getTime() -
        new Date(firstEvent?.starts_at ?? 0).getTime()
      );
    });
  }, [activeFilter, attendances, eventsById]);

  const groupedAttendances = useMemo(() => {
    return filteredAttendances.reduce<Record<string, RunAttendance[]>>(
      (result, attendance) => {
        if (!result[attendance.event_id]) {
          result[attendance.event_id] = [];
        }

        result[attendance.event_id].push(attendance);
        return result;
      },
      {},
    );
  }, [filteredAttendances]);

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
        router.replace("/login?next=/admin/läufe");
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

      if (error || !profile || (profile.role !== "admin" && profile.role !== "coach")) {
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

    async function loadRunReviewData() {
      setIsLoading(true);
      setPageError("");

      const { data: runEvents, error: eventError } = await supabase
        .from("events")
        .select("id, title, starts_at, description, all_day")
        .eq("event_type", "individual_run")
        .order("starts_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (eventError) {
        setPageError(
          "Die Lauftermine konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
        );
        setIsLoading(false);
        return;
      }

      const typedEvents = (runEvents ?? []) as RunEvent[];
      setEvents(typedEvents);

      const eventIds = typedEvents.map((event) => event.id);

      if (eventIds.length === 0) {
        setAttendances([]);
        setIsLoading(false);
        return;
      }

      const { data: runAttendances, error: attendanceError } = await supabase
        .from("event_attendance")
        .select(
          "id, event_id, player_id, response_status, final_status, player_note, responded_at, approved_at, admin_note, profiles!event_attendance_player_id_fkey(id, full_name, email)",
        )
        .in("event_id", eventIds);

      if (!isMounted) {
        return;
      }

      if (attendanceError) {
        setPageError(
          "Die Laufmeldungen konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
        );
        setIsLoading(false);
        return;
      }

      setAttendances((runAttendances ?? []) as unknown as RunAttendance[]);
      setIsLoading(false);
    }

    loadRunReviewData();

    return () => {
      isMounted = false;
    };
  }, [adminId]);

  async function approveRun(attendance: RunAttendance) {
    if (!adminId) {
      return;
    }

    setSavingAttendanceId(attendance.id);
    setPageError("");
    setPageSuccess("");

    const { data, error } = await supabase
      .from("event_attendance")
      .update({
        final_status: "approved",
        approved_by: adminId,
        approved_at: new Date().toISOString(),
        admin_note: null,
      })
      .eq("id", attendance.id)
      .select(
        "id, event_id, player_id, response_status, final_status, player_note, responded_at, approved_at, admin_note, profiles!event_attendance_player_id_fkey(id, full_name, email)",
      )
      .single();

    if (error) {
      setPageError(
        "Der Lauf konnte nicht bestätigt werden. Bitte versuche es erneut.",
      );
      setSavingAttendanceId(null);
      return;
    }

    const updatedAttendance = data as unknown as RunAttendance;

    setAttendances((currentAttendances) =>
      currentAttendances.map((currentAttendance) =>
        currentAttendance.id === attendance.id
          ? updatedAttendance
          : currentAttendance,
      ),
    );

    setRejectingAttendanceId(null);
    setPageSuccess(`${getPlayerName(attendance)}: Lauf bestätigt.`);
    setSavingAttendanceId(null);
  }

  async function rejectRun(attendance: RunAttendance) {
    if (!adminId) {
      return;
    }

    const note = rejectNotes[attendance.id]?.trim() ?? "";

    if (!note) {
      setPageError(
        "Bitte schreibe einen kurzen Hinweis, bevor du den Lauf ablehnst.",
      );
      return;
    }

    setSavingAttendanceId(attendance.id);
    setPageError("");
    setPageSuccess("");

    const { data, error } = await supabase
      .from("event_attendance")
      .update({
        final_status: "rejected",
        approved_by: adminId,
        approved_at: new Date().toISOString(),
        admin_note: note,
      })
      .eq("id", attendance.id)
      .select(
        "id, event_id, player_id, response_status, final_status, player_note, responded_at, approved_at, admin_note, profiles!event_attendance_player_id_fkey(id, full_name, email)",
      )
      .single();

    if (error) {
      setPageError(
        "Der Lauf konnte nicht abgelehnt werden. Bitte versuche es erneut.",
      );
      setSavingAttendanceId(null);
      return;
    }

    const updatedAttendance = data as unknown as RunAttendance;

    setAttendances((currentAttendances) =>
      currentAttendances.map((currentAttendance) =>
        currentAttendance.id === attendance.id
          ? updatedAttendance
          : currentAttendance,
      ),
    );

    setRejectNotes((currentNotes) => ({
      ...currentNotes,
      [attendance.id]: "",
    }));
    setRejectingAttendanceId(null);
    setPageSuccess(`${getPlayerName(attendance)}: Lauf abgelehnt.`);
    setSavingAttendanceId(null);
  }

  function openStrava() {
    window.open("https://www.strava.com/clubs", "_blank", "noopener,noreferrer");
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-500">
          Adminbereich wird geladen …
        </p>
      </main>
    );
  }

  return (
    <main className="run-review-page">
      <style>{`
        .run-review-page {
          --black: #080808;
          --white: #f7f7f4;
          --teal: #0d9488;
          --line: #262626;
          --muted: rgba(247, 247, 244, .58);
          --purple: #a78bfa;
          --yellow: #f59e0b;
          --red: #f87171;

          background:
            radial-gradient(
              ellipse 46% 48% at 88% 8%,
              rgba(13, 148, 136, .12) 0%,
              transparent 70%
            ),
            var(--black);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding: 7.2rem 0 5rem;
        }

        .run-review-page *,
        .run-review-page *::before,
        .run-review-page *::after {
          box-sizing: border-box;
        }

        .run-review-container {
          margin: 0 auto;
          width: min(100% - 4rem, 1240px);
        }

        .run-review-back {
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

        .run-review-back:hover {
          color: var(--white);
        }

        .run-review-header {
          align-items: end;
          border-bottom: 1px solid var(--line);
          display: flex;
          gap: 2rem;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-bottom: 2rem;
        }

        .run-review-kicker {
          color: var(--teal);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .17em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .run-review-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.5rem, 5vw, 4.6rem);
          font-weight: 900;
          letter-spacing: -.065em;
          line-height: .9;
          margin: 0;
          text-transform: uppercase;
        }

        .run-review-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.2px var(--teal);
        }

        .run-review-intro {
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.6;
          margin: 1.25rem 0 0;
          max-width: 62ch;
        }

        .run-review-strava-button {
          align-items: center;
          background: transparent;
          border: 1px solid rgba(167, 139, 250, .62);
          color: #ddd6fe;
          cursor: pointer;
          display: inline-flex;
          flex: 0 0 auto;
          font-family: inherit;
          font-size: .7rem;
          font-weight: 900;
          gap: .55rem;
          letter-spacing: .08em;
          min-height: 44px;
          padding: .7rem 1rem;
          text-transform: uppercase;
        }

        .run-review-strava-button:hover {
          background: rgba(167, 139, 250, .16);
          border-color: var(--purple);
          color: var(--white);
        }

        .run-review-summary {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          margin: 2rem 0;
        }

        .run-review-summary-card {
          background: rgba(247, 247, 244, .025);
          border: 1px solid rgba(247, 247, 244, .13);
          padding: 1.1rem 1.2rem;
        }

        .run-review-summary-label {
          color: rgba(247, 247, 244, .5);
          display: block;
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .1em;
          margin-bottom: .55rem;
          text-transform: uppercase;
        }

        .run-review-summary-value {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: 1;
        }

        .run-review-summary-card-review .run-review-summary-value {
          color: #c4b5fd;
        }

        .run-review-summary-card-open .run-review-summary-value {
          color: #fcd34d;
        }

        .run-review-summary-card-approved .run-review-summary-value {
          color: #5eead4;
        }

        .run-review-summary-card-rejected .run-review-summary-value {
          color: #fca5a5;
        }

        .run-review-filters {
          border-bottom: 1px solid var(--line);
          display: flex;
          gap: .6rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding-bottom: 1.4rem;
        }

        .run-review-filter {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .17);
          color: rgba(247, 247, 244, .62);
          cursor: pointer;
          flex: 0 0 auto;
          font-family: inherit;
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .08em;
          padding: .65rem .85rem;
          text-transform: uppercase;
        }

        .run-review-filter:hover,
        .run-review-filter-active {
          background: rgba(13, 148, 136, .14);
          border-color: var(--teal);
          color: #5eead4;
        }

        .run-review-filter-count {
          color: inherit;
          margin-left: .45rem;
          opacity: .7;
        }

        .run-review-message {
          border: 1px solid rgba(247, 247, 244, .15);
          color: var(--muted);
          font-size: .9rem;
          line-height: 1.6;
          margin: 1rem 0;
          padding: 1rem 1.1rem;
        }

        .run-review-message-error {
          border-color: rgba(248, 113, 113, .45);
          color: #fca5a5;
        }

        .run-review-message-success {
          border-color: rgba(94, 234, 212, .4);
          color: #5eead4;
        }

        .run-review-groups {
          display: grid;
          gap: 1.5rem;
        }

        .run-review-group {
          border: 1px solid rgba(247, 247, 244, .14);
          overflow: hidden;
        }

        .run-review-group-header {
          align-items: flex-start;
          background: rgba(247, 247, 244, .025);
          border-bottom: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          padding: 1.2rem 1.25rem;
        }

        .run-review-group-kicker {
          color: var(--purple);
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .11em;
          margin: 0 0 .5rem;
          text-transform: uppercase;
        }

        .run-review-group-title {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: -.035em;
          line-height: 1;
          margin: 0;
          text-transform: uppercase;
        }

        .run-review-group-description {
          color: var(--muted);
          font-size: .78rem;
          line-height: 1.5;
          margin: .7rem 0 0;
          max-width: 74ch;
        }

        .run-review-group-count {
          color: rgba(247, 247, 244, .56);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .08em;
          padding-top: .2rem;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .run-review-list {
          display: grid;
        }

        .run-review-row {
          border-bottom: 1px solid rgba(247, 247, 244, .1);
          display: grid;
          gap: 1rem;
          grid-template-columns: minmax(12rem, .85fr) minmax(15rem, 1.2fr) minmax(14rem, 1fr);
          padding: 1.2rem 1.25rem;
        }

        .run-review-row:last-child {
          border-bottom: 0;
        }

        .run-review-player-name {
          color: var(--white);
          font-size: .95rem;
          font-weight: 900;
          line-height: 1.35;
          margin: 0;
        }

        .run-review-player-email {
          color: rgba(247, 247, 244, .43);
          font-size: .72rem;
          line-height: 1.4;
          margin: .25rem 0 0;
        }

        .run-review-detail-label {
          color: rgba(247, 247, 244, .42);
          display: block;
          font-size: .6rem;
          font-weight: 900;
          letter-spacing: .09em;
          margin-bottom: .35rem;
          text-transform: uppercase;
        }

        .run-review-detail-value {
          color: rgba(247, 247, 244, .82);
          font-size: .78rem;
          line-height: 1.5;
          margin: 0;
          white-space: pre-wrap;
        }

        .run-review-note {
          color: #ddd6fe;
        }

        .run-review-actions {
          align-items: flex-start;
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
          justify-content: flex-end;
        }

        .run-review-action {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .22);
          color: var(--white);
          cursor: pointer;
          font-family: inherit;
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .06em;
          min-height: 38px;
          padding: .55rem .68rem;
          text-transform: uppercase;
        }

        .run-review-action:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .run-review-action-approve {
          border-color: rgba(13, 148, 136, .7);
          color: #5eead4;
        }

        .run-review-action-approve:hover:not(:disabled) {
          background: rgba(13, 148, 136, .18);
          border-color: var(--teal);
        }

        .run-review-action-reject {
          border-color: rgba(248, 113, 113, .6);
          color: #fca5a5;
        }

        .run-review-action-reject:hover:not(:disabled) {
          background: rgba(248, 113, 113, .13);
          border-color: var(--red);
        }

        .run-review-action:disabled {
          cursor: not-allowed;
          opacity: .45;
        }

        .run-review-reject-box {
          background: rgba(248, 113, 113, .055);
          border: 1px solid rgba(248, 113, 113, .32);
          grid-column: 1 / -1;
          padding: .85rem;
        }

        .run-review-reject-label {
          color: #fca5a5;
          display: block;
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .08em;
          margin-bottom: .5rem;
          text-transform: uppercase;
        }

        .run-review-reject-input {
          background: rgba(0, 0, 0, .24);
          border: 1px solid rgba(247, 247, 244, .18);
          color: var(--white);
          font-family: inherit;
          font-size: .8rem;
          min-height: 74px;
          padding: .65rem .7rem;
          resize: vertical;
          width: 100%;
        }

        .run-review-reject-input:focus {
          border-color: var(--red);
          outline: none;
        }

        .run-review-reject-actions {
          display: flex;
          gap: .5rem;
          justify-content: flex-end;
          margin-top: .65rem;
        }

        .run-review-empty {
          border: 1px solid rgba(247, 247, 244, .14);
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.65;
          padding: 2rem;
        }

        @media (max-width: 900px) {
          .run-review-container {
            width: min(100% - 2.5rem, 760px);
          }

          .run-review-header {
            align-items: flex-start;
            display: grid;
          }

          .run-review-strava-button {
            width: 100%;
          }

          .run-review-summary {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .run-review-row {
            grid-template-columns: 1fr;
          }

          .run-review-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 560px) {
          .run-review-page {
            padding-top: 5.5rem;
          }

          .run-review-container {
            width: min(100% - 2rem, 760px);
          }

          .run-review-title {
            font-size: clamp(2.55rem, 15vw, 4rem);
          }

          .run-review-summary {
            grid-template-columns: 1fr 1fr;
            gap: .7rem;
          }

          .run-review-summary-card {
            padding: .9rem;
          }

          .run-review-group-header {
            display: block;
          }

          .run-review-group-count {
            display: block;
            margin-top: .6rem;
          }
        }
      `}</style>

      <div className="run-review-container">
        <button
          className="run-review-back"
          onClick={() => router.push("/admin")}
          type="button"
        >
          ← Zur Übersicht
        </button>

        <header className="run-review-header">
          <div>
            <p className="run-review-kicker">FC Mello Wien · Admin</p>

            <h1 className="run-review-title">
              Läufe
              <span>prüfen.</span>
            </h1>

            <p className="run-review-intro">
              Prüfe gemeldete individuelle Läufe in der Strava-Gruppe und
              bestätige oder lehne den Nachweis anschließend ab.
            </p>
          </div>

          <button
            className="run-review-strava-button"
            onClick={openStrava}
            type="button"
          >
            ↗ Strava öffnen
          </button>
        </header>

        <section className="run-review-summary" aria-label="Laufübersicht">
          <article className="run-review-summary-card run-review-summary-card-review">
            <span className="run-review-summary-label">Zu prüfen</span>
            <strong className="run-review-summary-value">{counts.review}</strong>
          </article>

          <article className="run-review-summary-card run-review-summary-card-open">
            <span className="run-review-summary-label">Noch offen</span>
            <strong className="run-review-summary-value">{counts.open}</strong>
          </article>

          <article className="run-review-summary-card run-review-summary-card-approved">
            <span className="run-review-summary-label">Bestätigt</span>
            <strong className="run-review-summary-value">{counts.approved}</strong>
          </article>

          <article className="run-review-summary-card run-review-summary-card-rejected">
            <span className="run-review-summary-label">Abgelehnt</span>
            <strong className="run-review-summary-value">{counts.rejected}</strong>
          </article>
        </section>

        <nav className="run-review-filters" aria-label="Laufstatus filtern">
          {(Object.keys(filterLabels) as Filter[]).map((filter) => (
            <button
              className={`run-review-filter ${
                activeFilter === filter ? "run-review-filter-active" : ""
              }`}
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setPageError("");
                setPageSuccess("");
              }}
              type="button"
            >
              {filterLabels[filter]}
              <span className="run-review-filter-count">{counts[filter]}</span>
            </button>
          ))}
        </nav>

        {pageError ? (
          <p className="run-review-message run-review-message-error">
            {pageError}
          </p>
        ) : null}

        {pageSuccess ? (
          <p className="run-review-message run-review-message-success">
            {pageSuccess}
          </p>
        ) : null}

        {isLoading ? (
          <p className="run-review-message">Laufmeldungen werden geladen …</p>
        ) : filteredAttendances.length === 0 ? (
          <p className="run-review-empty">
            {activeFilter === "review"
              ? "Aktuell warten keine gemeldeten Läufe auf deine Prüfung."
              : `In der Ansicht „${filterLabels[activeFilter]}“ gibt es derzeit keine Läufe.`}
          </p>
        ) : (
          <section className="run-review-groups">
            {Object.entries(groupedAttendances).map(
              ([eventId, eventAttendances]) => {
                const event = eventsById[eventId];

                if (!event) {
                  return null;
                }

                return (
                  <article className="run-review-group" key={eventId}>
                    <header className="run-review-group-header">
                      <div>
                        <p className="run-review-group-kicker">
                          Laufplan · {formatDate(event.starts_at)}
                        </p>

                        <h2 className="run-review-group-title">{event.title}</h2>

                        {event.description ? (
                          <p className="run-review-group-description">
                            {event.description}
                          </p>
                        ) : null}
                      </div>

                      <span className="run-review-group-count">
                        {eventAttendances.length} Spieler
                      </span>
                    </header>

                    <div className="run-review-list">
                      {eventAttendances.map((attendance) => {
                        const isSaving =
                          savingAttendanceId === attendance.id;
                        const isRejecting =
                          rejectingAttendanceId === attendance.id;

                        return (
                          <article className="run-review-row" key={attendance.id}>
                            <div>
                              <p className="run-review-player-name">
                                {getPlayerName(attendance)}
                              </p>

                              {attendance.profiles?.email ? (
                                <p className="run-review-player-email">
                                  {attendance.profiles.email}
                                </p>
                              ) : null}
                            </div>

                            <div>
                              <span className="run-review-detail-label">
                                {activeFilter === "open"
                                  ? "Status"
                                  : activeFilter === "approved"
                                    ? "Bestätigt"
                                    : activeFilter === "rejected"
                                      ? "Abgelehnt"
                                      : "Gemeldet"}
                              </span>

                              <p className="run-review-detail-value">
                                {activeFilter === "open"
                                  ? "Noch nicht als erledigt gemeldet"
                                  : activeFilter === "approved"
                                    ? formatDateTime(attendance.approved_at)
                                    : activeFilter === "rejected"
                                      ? formatDateTime(attendance.approved_at)
                                      : formatDateTime(attendance.responded_at)}
                              </p>

                              {attendance.player_note ? (
                                <>
                                  <span className="run-review-detail-label" style={{ marginTop: ".75rem" }}>
                                    Spielerhinweis
                                  </span>

                                  <p className="run-review-detail-value run-review-note">
                                    {attendance.player_note}
                                  </p>
                                </>
                              ) : null}

                              {attendance.admin_note ? (
                                <>
                                  <span className="run-review-detail-label" style={{ marginTop: ".75rem" }}>
                                    Trainerhinweis
                                  </span>

                                  <p className="run-review-detail-value">
                                    {attendance.admin_note}
                                  </p>
                                </>
                              ) : null}
                            </div>

                            <div className="run-review-actions">
                              {activeFilter === "review" ? (
                                <>
                                  <button
                                    className="run-review-action"
                                    onClick={openStrava}
                                    type="button"
                                  >
                                    ↗ Strava
                                  </button>

                                  <button
                                    className="run-review-action run-review-action-approve"
                                    disabled={isSaving}
                                    onClick={() => approveRun(attendance)}
                                    type="button"
                                  >
                                    {isSaving ? "Speichert …" : "✓ Bestätigen"}
                                  </button>

                                  <button
                                    className="run-review-action run-review-action-reject"
                                    disabled={isSaving}
                                    onClick={() => {
                                      setRejectingAttendanceId(
                                        isRejecting ? null : attendance.id,
                                      );
                                      setPageError("");
                                      setPageSuccess("");
                                    }}
                                    type="button"
                                  >
                                    Ablehnen
                                  </button>
                                </>
                              ) : null}
                            </div>

                            {isRejecting ? (
                              <div className="run-review-reject-box">
                                <label
                                  className="run-review-reject-label"
                                  htmlFor={`reject-note-${attendance.id}`}
                                >
                                  Hinweis für {getPlayerName(attendance)}
                                </label>

                                <textarea
                                  className="run-review-reject-input"
                                  id={`reject-note-${attendance.id}`}
                                  maxLength={300}
                                  onChange={(changeEvent) => {
                                    const value = changeEvent.target.value;

                                    setRejectNotes((currentNotes) => ({
                                      ...currentNotes,
                                      [attendance.id]: value,
                                    }));
                                  }}
                                  placeholder="Zum Beispiel: Kein passender Strava-Post für diesen Lauf sichtbar."
                                  value={rejectNotes[attendance.id] ?? ""}
                                />

                                <div className="run-review-reject-actions">
                                  <button
                                    className="run-review-action"
                                    disabled={isSaving}
                                    onClick={() =>
                                      setRejectingAttendanceId(null)
                                    }
                                    type="button"
                                  >
                                    Abbrechen
                                  </button>

                                  <button
                                    className="run-review-action run-review-action-reject"
                                    disabled={isSaving}
                                    onClick={() => rejectRun(attendance)}
                                    type="button"
                                  >
                                    {isSaving ? "Speichert …" : "Ablehnung speichern"}
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </article>
                        );
                      })}
                    </div>
                  </article>
                );
              },
            )}
          </section>
        )}
      </div>
    </main>
  );
}