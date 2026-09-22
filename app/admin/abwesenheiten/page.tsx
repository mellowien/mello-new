"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type EventType = "training" | "match";

type AbsenceStatus = "absent" | "injured";

type FinalStatus = "pending" | "approved" | "rejected";

type Filter = "review" | "approved" | "rejected";

type TeamEvent = {
  id: string;
  title: string;
  event_type: EventType;
  starts_at: string;
  ends_at: string | null;
  location_name: string | null;
  address: string | null;
  description: string | null;
};

type PlayerProfile = {
  id: string;
  full_name: string | null;
  email: string;
};

type AbsenceAttendance = {
  id: string;
  event_id: string;
  player_id: string;
  response_status: AbsenceStatus;
  final_status: FinalStatus;
  absence_reason: string | null;
  player_note: string | null;
  responded_at: string | null;
  approved_at: string | null;
  admin_note: string | null;
  profiles: PlayerProfile | null;
};

const filterLabels: Record<Filter, string> = {
  review: "Zu prüfen",
  approved: "Entschuldigt",
  rejected: "Abgelehnt",
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("de-AT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Vienna",
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
    timeZone: "Europe/Vienna",
  }).format(new Date(dateValue));
}

function formatEventTime(event: TeamEvent) {
  const start = new Date(event.starts_at);

  const startTime = new Intl.DateTimeFormat("de-AT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Vienna",
  }).format(start);

  if (!event.ends_at) {
    return `${startTime} Uhr`;
  }

  const endTime = new Intl.DateTimeFormat("de-AT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Vienna",
  }).format(new Date(event.ends_at));

  return `${startTime}–${endTime} Uhr`;
}

function getEventLocation(event: TeamEvent) {
  if (event.location_name && event.address) {
    return `${event.location_name} · ${event.address}`;
  }

  if (event.location_name) {
    return event.location_name;
  }

  if (event.address) {
    return event.address;
  }

  return "Ort folgt";
}

function getPlayerName(attendance: AbsenceAttendance) {
  const fullName = attendance.profiles?.full_name?.trim();

  if (fullName) {
    return fullName;
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

function getEventTypeLabel(event: TeamEvent) {
  return event.event_type === "match" ? "Match" : "Training";
}

function getAbsenceLabel(attendance: AbsenceAttendance) {
  return attendance.response_status === "injured" ? "Verletzt" : "Abgesagt";
}

function isReviewAbsence(attendance: AbsenceAttendance) {
  return attendance.final_status === "pending";
}

function isApprovedAbsence(attendance: AbsenceAttendance) {
  return attendance.final_status === "approved";
}

function isRejectedAbsence(attendance: AbsenceAttendance) {
  return attendance.final_status === "rejected";
}

export default function AdminAbwesenheitenPage() {
  const router = useRouter();

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [events, setEvents] = useState<TeamEvent[]>([]);
  const [attendances, setAttendances] = useState<AbsenceAttendance[]>([]);
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
    return events.reduce<Record<string, TeamEvent>>((result, event) => {
      result[event.id] = event;
      return result;
    }, {});
  }, [events]);

  const counts = useMemo(() => {
    return {
      review: attendances.filter(isReviewAbsence).length,
      approved: attendances.filter(isApprovedAbsence).length,
      rejected: attendances.filter(isRejectedAbsence).length,
    };
  }, [attendances]);

  const filteredAttendances = useMemo(() => {
    const nextAttendances = attendances.filter((attendance) => {
      if (activeFilter === "review") {
        return isReviewAbsence(attendance);
      }

      if (activeFilter === "approved") {
        return isApprovedAbsence(attendance);
      }

      return isRejectedAbsence(attendance);
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
    return filteredAttendances.reduce<Record<string, AbsenceAttendance[]>>(
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
        router.replace("/login?next=/admin/abwesenheiten");
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

      if (
        error ||
        !profile ||
        (profile.role !== "admin" && profile.role !== "coach")
      ) {
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

    async function loadAbsenceReviewData() {
      setIsLoading(true);
      setPageError("");

      const { data: teamEvents, error: eventError } = await supabase
        .from("events")
        .select(
          "id, title, event_type, starts_at, ends_at, location_name, address, description",
        )
        .in("event_type", ["training", "match"])
        .order("starts_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (eventError) {
        setPageError(
          "Die Trainings und Matches konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
        );
        setIsLoading(false);
        return;
      }

      const typedEvents = (teamEvents ?? []) as TeamEvent[];
      setEvents(typedEvents);

      const eventIds = typedEvents.map((event) => event.id);

      if (eventIds.length === 0) {
        setAttendances([]);
        setIsLoading(false);
        return;
      }

      const { data: absenceAttendances, error: attendanceError } =
        await supabase
          .from("event_attendance")
          .select(
            "id, event_id, player_id, response_status, final_status, absence_reason, player_note, responded_at, approved_at, admin_note, profiles!event_attendance_player_id_fkey(id, full_name, email)",
          )
          .in("event_id", eventIds)
          .in("response_status", ["absent", "injured"]);

      if (!isMounted) {
        return;
      }

      if (attendanceError) {
        setPageError(
          "Die Abwesenheiten konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
        );
        setIsLoading(false);
        return;
      }

      setAttendances(
        (absenceAttendances ?? []) as unknown as AbsenceAttendance[],
      );
      setIsLoading(false);
    }

    loadAbsenceReviewData();

    return () => {
      isMounted = false;
    };
  }, [adminId]);

  async function approveAbsence(attendance: AbsenceAttendance) {
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
        "id, event_id, player_id, response_status, final_status, absence_reason, player_note, responded_at, approved_at, admin_note, profiles!event_attendance_player_id_fkey(id, full_name, email)",
      )
      .single();

    if (error) {
      setPageError(
        "Die Abwesenheit konnte nicht bestätigt werden. Bitte versuche es erneut.",
      );
      setSavingAttendanceId(null);
      return;
    }

    const updatedAttendance = data as unknown as AbsenceAttendance;

    setAttendances((currentAttendances) =>
      currentAttendances.map((currentAttendance) =>
        currentAttendance.id === attendance.id
          ? updatedAttendance
          : currentAttendance,
      ),
    );

    setRejectingAttendanceId(null);
    setPageSuccess(
      `${getPlayerName(attendance)}: Abwesenheit wurde entschuldigt.`,
    );
    setSavingAttendanceId(null);
  }

  async function rejectAbsence(attendance: AbsenceAttendance) {
    if (!adminId) {
      return;
    }

    const note = rejectNotes[attendance.id]?.trim() ?? "";

    if (!note) {
      setPageError(
        "Bitte schreibe einen kurzen Hinweis, bevor du die Abwesenheit ablehnst.",
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
        "id, event_id, player_id, response_status, final_status, absence_reason, player_note, responded_at, approved_at, admin_note, profiles!event_attendance_player_id_fkey(id, full_name, email)",
      )
      .single();

    if (error) {
      setPageError(
        "Die Abwesenheit konnte nicht abgelehnt werden. Bitte versuche es erneut.",
      );
      setSavingAttendanceId(null);
      return;
    }

    const updatedAttendance = data as unknown as AbsenceAttendance;

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
    setPageSuccess(
      `${getPlayerName(attendance)}: Abwesenheit wurde abgelehnt.`,
    );
    setSavingAttendanceId(null);
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#080808]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-500">
          Adminbereich wird geladen …
        </p>
      </main>
    );
  }

  return (
    <main className="absence-review-page">
      <style>{`
        .absence-review-page {
          --black: #080808;
          --white: #f7f7f4;
          --teal: #0d9488;
          --line: #262626;
          --muted: rgba(247, 247, 244, .58);
          --yellow: #f59e0b;
          --red: #f87171;
          --pink: #f472b6;

          background:
            radial-gradient(
              ellipse 48% 50% at 88% 8%,
              rgba(13, 148, 136, .12) 0%,
              transparent 70%
            ),
            var(--black);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding: 7.2rem 0 5rem;
        }

        .absence-review-page *,
        .absence-review-page *::before,
        .absence-review-page *::after {
          box-sizing: border-box;
        }

        .absence-review-container {
          margin: 0 auto;
          width: min(100% - 4rem, 1240px);
        }

        .absence-review-back {
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

        .absence-review-back:hover {
          color: var(--white);
        }

        .absence-review-header {
          border-bottom: 1px solid var(--line);
          margin-top: 1.5rem;
          padding-bottom: 2rem;
        }

        .absence-review-kicker {
          color: var(--teal);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .17em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .absence-review-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.5rem, 5vw, 4.6rem);
          font-weight: 900;
          letter-spacing: -.065em;
          line-height: .9;
          margin: 0;
          text-transform: uppercase;
        }

        .absence-review-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.2px var(--teal);
        }

        .absence-review-intro {
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.6;
          margin: 1.25rem 0 0;
          max-width: 68ch;
        }

        .absence-review-summary {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin: 2rem 0;
        }

        .absence-review-summary-card {
          background: rgba(247, 247, 244, .025);
          border: 1px solid rgba(247, 247, 244, .13);
          padding: 1.1rem 1.2rem;
        }

        .absence-review-summary-label {
          color: rgba(247, 247, 244, .5);
          display: block;
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .1em;
          margin-bottom: .55rem;
          text-transform: uppercase;
        }

        .absence-review-summary-value {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: 1;
        }

        .absence-review-summary-review .absence-review-summary-value {
          color: #fcd34d;
        }

        .absence-review-summary-approved .absence-review-summary-value {
          color: #5eead4;
        }

        .absence-review-summary-rejected .absence-review-summary-value {
          color: #fca5a5;
        }

        .absence-review-filters {
          border-bottom: 1px solid var(--line);
          display: flex;
          gap: .6rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding-bottom: 1.4rem;
        }

        .absence-review-filter {
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

        .absence-review-filter:hover,
        .absence-review-filter-active {
          background: rgba(13, 148, 136, .14);
          border-color: var(--teal);
          color: #5eead4;
        }

        .absence-review-filter-count {
          color: inherit;
          margin-left: .45rem;
          opacity: .7;
        }

        .absence-review-message {
          border: 1px solid rgba(247, 247, 244, .15);
          color: var(--muted);
          font-size: .9rem;
          line-height: 1.6;
          margin: 1rem 0;
          padding: 1rem 1.1rem;
        }

        .absence-review-message-error {
          border-color: rgba(248, 113, 113, .45);
          color: #fca5a5;
        }

        .absence-review-message-success {
          border-color: rgba(94, 234, 212, .4);
          color: #5eead4;
        }

        .absence-review-groups {
          display: grid;
          gap: 1.5rem;
        }

        .absence-review-group {
          border: 1px solid rgba(247, 247, 244, .14);
          overflow: hidden;
        }

        .absence-review-group-header {
          align-items: flex-start;
          background: rgba(247, 247, 244, .025);
          border-bottom: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          padding: 1.2rem 1.25rem;
        }

        .absence-review-group-kicker {
          color: var(--teal);
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .11em;
          margin: 0 0 .5rem;
          text-transform: uppercase;
        }

        .absence-review-group-title {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: -.035em;
          line-height: 1;
          margin: 0;
          text-transform: uppercase;
        }

        .absence-review-group-meta {
          color: var(--muted);
          font-size: .78rem;
          line-height: 1.5;
          margin: .7rem 0 0;
        }

        .absence-review-group-count {
          color: rgba(247, 247, 244, .56);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .08em;
          padding-top: .2rem;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .absence-review-list {
          display: grid;
        }

        .absence-review-row {
          border-bottom: 1px solid rgba(247, 247, 244, .1);
          display: grid;
          gap: 1rem;
          grid-template-columns: minmax(12rem, .85fr) minmax(17rem, 1.3fr) minmax(14rem, 1fr);
          padding: 1.2rem 1.25rem;
        }

        .absence-review-row:last-child {
          border-bottom: 0;
        }

        .absence-review-player-name {
          color: var(--white);
          font-size: .95rem;
          font-weight: 900;
          line-height: 1.35;
          margin: 0;
        }

        .absence-review-player-email {
          color: rgba(247, 247, 244, .43);
          font-size: .72rem;
          line-height: 1.4;
          margin: .25rem 0 0;
        }

        .absence-review-status {
          border: 1px solid rgba(245, 158, 11, .56);
          color: #fcd34d;
          display: inline-block;
          font-size: .6rem;
          font-weight: 900;
          letter-spacing: .08em;
          margin-top: .75rem;
          padding: .28rem .42rem;
          text-transform: uppercase;
        }

        .absence-review-status-injured {
          border-color: rgba(244, 114, 182, .65);
          color: #f9a8d4;
        }

        .absence-review-detail-label {
          color: rgba(247, 247, 244, .42);
          display: block;
          font-size: .6rem;
          font-weight: 900;
          letter-spacing: .09em;
          margin-bottom: .35rem;
          text-transform: uppercase;
        }

        .absence-review-detail-value {
          color: rgba(247, 247, 244, .82);
          font-size: .78rem;
          line-height: 1.5;
          margin: 0;
          white-space: pre-wrap;
        }

        .absence-review-reason {
          color: #fde68a;
        }

        .absence-review-actions {
          align-items: flex-start;
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
          justify-content: flex-end;
        }

        .absence-review-action {
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

        .absence-review-action:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .absence-review-action-approve {
          border-color: rgba(13, 148, 136, .7);
          color: #5eead4;
        }

        .absence-review-action-approve:hover:not(:disabled) {
          background: rgba(13, 148, 136, .18);
          border-color: var(--teal);
        }

        .absence-review-action-reject {
          border-color: rgba(248, 113, 113, .6);
          color: #fca5a5;
        }

        .absence-review-action-reject:hover:not(:disabled) {
          background: rgba(248, 113, 113, .13);
          border-color: var(--red);
        }

        .absence-review-action:disabled {
          cursor: not-allowed;
          opacity: .45;
        }

        .absence-review-reject-box {
          background: rgba(248, 113, 113, .055);
          border: 1px solid rgba(248, 113, 113, .32);
          grid-column: 1 / -1;
          padding: .85rem;
        }

        .absence-review-reject-label {
          color: #fca5a5;
          display: block;
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .08em;
          margin-bottom: .5rem;
          text-transform: uppercase;
        }

        .absence-review-reject-input {
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

        .absence-review-reject-input:focus {
          border-color: var(--red);
          outline: none;
        }

        .absence-review-reject-actions {
          display: flex;
          gap: .5rem;
          justify-content: flex-end;
          margin-top: .65rem;
        }

        .absence-review-empty {
          border: 1px solid rgba(247, 247, 244, .14);
          color: var(--muted);
          font-size: .92rem;
          line-height: 1.65;
          padding: 2rem;
        }

        @media (max-width: 900px) {
          .absence-review-container {
            width: min(100% - 2.5rem, 760px);
          }

          .absence-review-summary {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .absence-review-row {
            grid-template-columns: 1fr;
          }

          .absence-review-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 560px) {
          .absence-review-page {
            padding-top: 5.5rem;
          }

          .absence-review-container {
            width: min(100% - 2rem, 760px);
          }

          .absence-review-title {
            font-size: clamp(2.55rem, 15vw, 4rem);
          }

          .absence-review-summary {
            grid-template-columns: 1fr;
            gap: .7rem;
          }

          .absence-review-summary-card {
            padding: .9rem;
          }

          .absence-review-group-header {
            display: block;
          }

          .absence-review-group-count {
            display: block;
            margin-top: .6rem;
          }
        }
      `}</style>

      <div className="absence-review-container">
        <button
          className="absence-review-back"
          onClick={() => router.push("/admin")}
          type="button"
        >
          ← Zur Übersicht
        </button>

        <header className="absence-review-header">
          <p className="absence-review-kicker">FC Mello Wien · Admin</p>

          <h1 className="absence-review-title">
            Abwesenheiten
            <span>prüfen.</span>
          </h1>

          <p className="absence-review-intro">
            Prüfe die Absagen und Verletzungsmeldungen deiner Spieler für
            Trainings und Matches. Du kannst jede Abwesenheit entschuldigen
            oder mit einem kurzen Trainerhinweis ablehnen.
          </p>
        </header>

        <section
          className="absence-review-summary"
          aria-label="Abwesenheitsübersicht"
        >
          <article className="absence-review-summary-card absence-review-summary-review">
            <span className="absence-review-summary-label">Zu prüfen</span>
            <strong className="absence-review-summary-value">
              {counts.review}
            </strong>
          </article>

          <article className="absence-review-summary-card absence-review-summary-approved">
            <span className="absence-review-summary-label">
              Entschuldigt
            </span>
            <strong className="absence-review-summary-value">
              {counts.approved}
            </strong>
          </article>

          <article className="absence-review-summary-card absence-review-summary-rejected">
            <span className="absence-review-summary-label">Abgelehnt</span>
            <strong className="absence-review-summary-value">
              {counts.rejected}
            </strong>
          </article>
        </section>

        <nav
          className="absence-review-filters"
          aria-label="Abwesenheiten filtern"
        >
          {(Object.keys(filterLabels) as Filter[]).map((filter) => (
            <button
              className={`absence-review-filter ${
                activeFilter === filter ? "absence-review-filter-active" : ""
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
              <span className="absence-review-filter-count">
                {counts[filter]}
              </span>
            </button>
          ))}
        </nav>

        {pageError ? (
          <p className="absence-review-message absence-review-message-error">
            {pageError}
          </p>
        ) : null}

        {pageSuccess ? (
          <p className="absence-review-message absence-review-message-success">
            {pageSuccess}
          </p>
        ) : null}

        {isLoading ? (
          <p className="absence-review-message">
            Abwesenheiten werden geladen …
          </p>
        ) : filteredAttendances.length === 0 ? (
          <p className="absence-review-empty">
            {activeFilter === "review"
              ? "Aktuell warten keine Abwesenheiten auf deine Entscheidung."
              : `In der Ansicht „${filterLabels[activeFilter]}“ gibt es derzeit keine Abwesenheiten.`}
          </p>
        ) : (
          <section className="absence-review-groups">
            {Object.entries(groupedAttendances).map(
              ([eventId, eventAttendances]) => {
                const event = eventsById[eventId];

                if (!event) {
                  return null;
                }

                return (
                  <article className="absence-review-group" key={eventId}>
                    <header className="absence-review-group-header">
                      <div>
                        <p className="absence-review-group-kicker">
                          {getEventTypeLabel(event)} ·{" "}
                          {formatDate(event.starts_at)}
                        </p>

                        <h2 className="absence-review-group-title">
                          {event.title}
                        </h2>

                        <p className="absence-review-group-meta">
                          {formatEventTime(event)} · {getEventLocation(event)}
                        </p>
                      </div>

                      <span className="absence-review-group-count">
                        {eventAttendances.length} Spieler
                      </span>
                    </header>

                    <div className="absence-review-list">
                      {eventAttendances.map((attendance) => {
                        const isSaving =
                          savingAttendanceId === attendance.id;
                        const isRejecting =
                          rejectingAttendanceId === attendance.id;
                        const absenceLabel = getAbsenceLabel(attendance);

                        return (
                          <article
                            className="absence-review-row"
                            key={attendance.id}
                          >
                            <div>
                              <p className="absence-review-player-name">
                                {getPlayerName(attendance)}
                              </p>

                              {attendance.profiles?.email ? (
                                <p className="absence-review-player-email">
                                  {attendance.profiles.email}
                                </p>
                              ) : null}

                              <span
                                className={`absence-review-status ${
                                  attendance.response_status === "injured"
                                    ? "absence-review-status-injured"
                                    : ""
                                }`}
                              >
                                {absenceLabel}
                              </span>
                            </div>

                            <div>
                              <span className="absence-review-detail-label">
                                Gemeldet am
                              </span>

                              <p className="absence-review-detail-value">
                                {formatDateTime(attendance.responded_at)}
                              </p>

                              {attendance.absence_reason ? (
                                <>
                                  <span
                                    className="absence-review-detail-label"
                                    style={{ marginTop: ".75rem" }}
                                  >
                                    Absagegrund
                                  </span>

                                  <p className="absence-review-detail-value absence-review-reason">
                                    {attendance.absence_reason}
                                  </p>
                                </>
                              ) : null}

                              {attendance.player_note ? (
                                <>
                                  <span
                                    className="absence-review-detail-label"
                                    style={{ marginTop: ".75rem" }}
                                  >
                                    Spielerhinweis
                                  </span>

                                  <p className="absence-review-detail-value">
                                    {attendance.player_note}
                                  </p>
                                </>
                              ) : null}

                              {attendance.admin_note ? (
                                <>
                                  <span
                                    className="absence-review-detail-label"
                                    style={{ marginTop: ".75rem" }}
                                  >
                                    Trainerhinweis
                                  </span>

                                  <p className="absence-review-detail-value">
                                    {attendance.admin_note}
                                  </p>
                                </>
                              ) : null}

                              {activeFilter === "approved" ? (
                                <>
                                  <span
                                    className="absence-review-detail-label"
                                    style={{ marginTop: ".75rem" }}
                                  >
                                    Entschuldigt am
                                  </span>

                                  <p className="absence-review-detail-value">
                                    {formatDateTime(attendance.approved_at)}
                                  </p>
                                </>
                              ) : null}

                              {activeFilter === "rejected" ? (
                                <>
                                  <span
                                    className="absence-review-detail-label"
                                    style={{ marginTop: ".75rem" }}
                                  >
                                    Abgelehnt am
                                  </span>

                                  <p className="absence-review-detail-value">
                                    {formatDateTime(attendance.approved_at)}
                                  </p>
                                </>
                              ) : null}
                            </div>

                            <div className="absence-review-actions">
                              {activeFilter === "review" ? (
                                <>
                                  <button
                                    className="absence-review-action absence-review-action-approve"
                                    disabled={isSaving}
                                    onClick={() => approveAbsence(attendance)}
                                    type="button"
                                  >
                                    {isSaving
                                      ? "Speichert …"
                                      : "✓ Entschuldigen"}
                                  </button>

                                  <button
                                    className="absence-review-action absence-review-action-reject"
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
                              <div className="absence-review-reject-box">
                                <label
                                  className="absence-review-reject-label"
                                  htmlFor={`reject-note-${attendance.id}`}
                                >
                                  Trainerhinweis für{" "}
                                  {getPlayerName(attendance)}
                                </label>

                                <textarea
                                  className="absence-review-reject-input"
                                  id={`reject-note-${attendance.id}`}
                                  maxLength={300}
                                  onChange={(changeEvent) => {
                                    const value = changeEvent.target.value;

                                    setRejectNotes((currentNotes) => ({
                                      ...currentNotes,
                                      [attendance.id]: value,
                                    }));
                                  }}
                                  placeholder="Zum Beispiel: Bitte melde dich künftig vor Ablauf der Rückmeldefrist ab."
                                  value={rejectNotes[attendance.id] ?? ""}
                                />

                                <div className="absence-review-reject-actions">
                                  <button
                                    className="absence-review-action"
                                    disabled={isSaving}
                                    onClick={() =>
                                      setRejectingAttendanceId(null)
                                    }
                                    type="button"
                                  >
                                    Abbrechen
                                  </button>

                                  <button
                                    className="absence-review-action absence-review-action-reject"
                                    disabled={isSaving}
                                    onClick={() => rejectAbsence(attendance)}
                                    type="button"
                                  >
                                    {isSaving
                                      ? "Speichert …"
                                      : "Ablehnung speichern"}
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