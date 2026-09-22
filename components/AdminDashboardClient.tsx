"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type EventType =
  | "training"
  | "group_run"
  | "individual_run"
  | "match"
  | "team_event";

type AttendanceStatus =
  | "open"
  | "attending"
  | "absent"
  | "injured"
  | "submitted";

type TeamEvent = {
  id: string;
  title: string;
  event_type: EventType;
  starts_at: string;
  ends_at: string | null;
  location_name: string | null;
  address: string | null;
  description: string | null;
  required: boolean;
  response_deadline: string | null;
  all_day: boolean;
};

type Attendance = {
  id: string;
  event_id: string;
  player_id: string;
  response_status: AttendanceStatus;
  final_status:
    | "pending"
    | "approved"
    | "replacement_required"
    | "replacement_submitted"
    | "rejected"
    | "excused";
};

type View =
  | "overview"
  | "calendar"
  | "training"
  | "matches"
  | "runs"
  | "responses"
  | "replacement";

const weekdayShort = new Intl.DateTimeFormat("de-AT", {
  weekday: "short",
  timeZone: "Europe/Vienna",
});

const dayMonth = new Intl.DateTimeFormat("de-AT", {
  day: "2-digit",
  month: "short",
  timeZone: "Europe/Vienna",
});

const longDate = new Intl.DateTimeFormat("de-AT", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "Europe/Vienna",
});

const time = new Intl.DateTimeFormat("de-AT", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/Vienna",
});

function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function formatTimeRange(event: TeamEvent) {
  if (event.all_day) {
    return "Ganztägig";
  }

  const start = time.format(new Date(event.starts_at));
  const end = event.ends_at ? time.format(new Date(event.ends_at)) : null;

  return end ? `${start}–${end} Uhr` : `${start} Uhr`;
}

function formatLocation(event: TeamEvent) {
  if (event.location_name && event.address) {
    return `${event.location_name} · ${event.address}`;
  }

  if (event.location_name) {
    return event.location_name;
  }

  if (event.address) {
    return event.address;
  }

  if (event.event_type === "individual_run") {
    return "Nach dem Lauf in Strava posten";
  }

  return "Ort folgt";
}

function attendanceSummary(event: TeamEvent, attendances: Attendance[]) {
  const entries = attendances.filter(
    (attendance) => attendance.event_id === event.id,
  );

  const attending = entries.filter(
    (attendance) => attendance.response_status === "attending",
  ).length;

  const absent = entries.filter(
    (attendance) =>
      attendance.response_status === "absent" ||
      attendance.response_status === "injured",
  ).length;

  const open = entries.filter(
    (attendance) => attendance.response_status === "open",
  ).length;

  return {
    total: entries.length,
    attending,
    absent,
    open,
  };
}

function EventTag({
  event,
  attendances,
}: {
  event: TeamEvent;
  attendances: Attendance[];
}) {
  const summary = attendanceSummary(event, attendances);

  if (event.event_type === "match") {
    return <span className="tag match">MATCH</span>;
  }

  if (
    event.event_type === "group_run" ||
    event.event_type === "individual_run"
  ) {
    return (
      <span className="tag run">
        {summary.attending} / {summary.total}
      </span>
    );
  }

  return (
    <span className="tag">
      {summary.attending} / {summary.total}
    </span>
  );
}

export default function AdminDashboardClient() {
  const router = useRouter();

  const [view, setView] = useState<View>("overview");
  const [events, setEvents] = useState<TeamEvent[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const currentDate = useMemo(() => new Date(), []);
  const calendarStart = useMemo(
    () => getMonthStart(getStartOfDay(currentDate)),
    [currentDate],
  );
  const calendarEnd = useMemo(
    () => addMonths(calendarStart, 3),
    [calendarStart],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login?next=/admin");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        router.replace("/spielerbereich");
        return;
      }

      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select(
          "id, title, event_type, starts_at, ends_at, location_name, address, description, required, response_deadline, all_day",
        )
        .gte("starts_at", calendarStart.toISOString())
        .lt("starts_at", calendarEnd.toISOString())
        .order("starts_at", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (eventError) {
        setErrorMessage(
          `Termine konnten nicht geladen werden: ${eventError.message}`,
        );
        setLoading(false);
        return;
      }

      const typedEvents = (eventData ?? []) as TeamEvent[];
      setEvents(typedEvents);

      const attendanceEventIds = typedEvents
        .filter(
          (event) =>
            event.event_type === "training" ||
            event.event_type === "match" ||
            event.event_type === "group_run" ||
            event.event_type === "individual_run",
        )
        .map((event) => event.id);

      if (attendanceEventIds.length === 0) {
        setAttendances([]);
        setLoading(false);
        return;
      }

      const { data: attendanceData, error: attendanceError } = await supabase
        .from("event_attendance")
        .select("id, event_id, player_id, response_status, final_status")
        .in("event_id", attendanceEventIds);

      if (!isMounted) {
        return;
      }

      if (attendanceError) {
        setErrorMessage(
          `Termine wurden geladen, aber Rückmeldungen nicht: ${attendanceError.message}`,
        );
        setAttendances([]);
        setLoading(false);
        return;
      }

      setAttendances((attendanceData ?? []) as Attendance[]);
      setLoading(false);
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [calendarEnd, calendarStart, router]);

  const sortedEvents = useMemo(() => {
    return [...events].sort(
      (first, second) =>
        new Date(first.starts_at).getTime() -
        new Date(second.starts_at).getTime(),
    );
  }, [events]);

  const nextTraining = useMemo(() => {
    return (
      sortedEvents.find((event) => event.event_type === "training") ?? null
    );
  }, [sortedEvents]);

  const firstEvent = sortedEvents[0] ?? null;

  const trainingEvents = sortedEvents.filter(
    (event) => event.event_type === "training",
  );

  const matchEvents = sortedEvents.filter(
    (event) => event.event_type === "match",
  );

  const runEvents = sortedEvents.filter(
    (event) =>
      event.event_type === "group_run" ||
      event.event_type === "individual_run",
  );

  const responseEventIds = useMemo(
    () =>
      new Set(
        events
          .filter(
            (event) =>
              event.event_type === "training" ||
              event.event_type === "match",
          )
          .map((event) => event.id),
      ),
    [events],
  );

  const runEventIds = useMemo(
    () =>
      new Set(
        events
          .filter((event) => event.event_type === "individual_run")
          .map((event) => event.id),
      ),
    [events],
  );

  const allOpenResponses = attendances.filter(
    (attendance) =>
      responseEventIds.has(attendance.event_id) &&
      attendance.response_status === "open",
  ).length;

  const runsToReview = attendances.filter(
    (attendance) =>
      runEventIds.has(attendance.event_id) &&
      attendance.response_status === "submitted" &&
      attendance.final_status === "pending",
  ).length;

  const absencesToReview = attendances.filter(
    (attendance) =>
      responseEventIds.has(attendance.event_id) &&
      (attendance.response_status === "absent" ||
        attendance.response_status === "injured") &&
      attendance.final_status === "pending",
  ).length;

  const replacementsToReview = attendances.filter(
    (attendance) => attendance.final_status === "replacement_submitted",
  ).length;

  const nextTrainingSummary = nextTraining
    ? attendanceSummary(nextTraining, attendances)
    : { total: 0, attending: 0, absent: 0, open: 0 };

  const navigation: { id: View; icon: string; label: string }[] = [
    { id: "overview", icon: "◈", label: "Übersicht" },
    { id: "calendar", icon: "□", label: "Kalender" },
    { id: "training", icon: "↗", label: "Trainings" },
    { id: "matches", icon: "★", label: "Matches" },
    { id: "runs", icon: "⌁", label: "Läufe" },
    { id: "responses", icon: "✓", label: "Rückmeldungen" },
    { id: "replacement", icon: "↻", label: "Ersatzläufe" },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function handleNavigation(viewId: View) {
    if (viewId === "calendar") {
      router.push("/admin/termine");
      return;
    }

    if (viewId === "runs") {
      router.push("/admin/laeufe");
      return;
    }

    setView(viewId);
  }

  function renderEventRows(items: TeamEvent[]) {
    if (loading) {
      return <p className="empty">Termine werden geladen …</p>;
    }

    if (items.length === 0) {
      return <p className="empty">Derzeit sind keine Termine vorhanden.</p>;
    }

    return (
      <div className="week-list">
        {items.map((event) => (
          <div className="week-item" key={event.id}>
            <div className="when">
              {weekdayShort
                .format(new Date(event.starts_at))
                .replace(".", "")
                .toUpperCase()}
              {" · "}
              {dayMonth.format(new Date(event.starts_at)).toUpperCase()}
            </div>

            <div>
              <strong>{event.title}</strong>
              <div className="type">
                {formatTimeRange(event)} · {formatLocation(event)}
              </div>
            </div>

            <EventTag event={event} attendances={attendances} />
          </div>
        ))}
      </div>
    );
  }

  const currentDateText = new Intl.DateTimeFormat("de-AT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Vienna",
  }).format(new Date());

  return (
    <main className="sport-page">
      <style>{`
        .sport-page {
          --bg: #07090a;
          --line: #263033;
          --text: #f4f7f6;
          --muted: #93a09f;
          --teal: #17bbb3;
          --yellow: #f2b51d;
          --purple: #a77ad5;
          --red: #ef6b73;
          --green: #5bc58a;
          --radius: 16px;
          background:
            radial-gradient(circle at 88% 0%, rgba(23, 187, 179, .11), transparent 25%),
            var(--bg);
          color: var(--text);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
        }

        * { box-sizing: border-box; }
        button { font: inherit; }

        .sport-shell {
          display: flex;
          min-height: 100vh;
        }

        .sport-sidebar {
          background: rgba(7, 9, 10, .96);
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          height: 100vh;
          padding: 28px 18px;
          position: sticky;
          top: 0;
          width: 260px;
        }

        .sport-brand {
          align-items: center;
          display: flex;
          gap: 12px;
          padding: 0 10px 30px;
        }

        .sport-crest {
          align-items: center;
          border: 2px solid #e9f0ef;
          border-radius: 50%;
          display: flex;
          font-size: 11px;
          font-weight: 900;
          height: 38px;
          justify-content: center;
          letter-spacing: -1px;
          width: 38px;
        }

        .sport-brand strong {
          font-size: 26px;
          letter-spacing: .08em;
        }

        .sport-brand small {
          color: var(--teal);
          display: block;
          font-size: 10px;
          letter-spacing: .17em;
          margin-top: 2px;
        }

        .sport-nav-label {
          color: #687575;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .16em;
          padding: 0 10px 10px;
        }

        .sport-nav {
          display: grid;
          gap: 5px;
        }

        .sport-nav button {
          align-items: center;
          background: transparent;
          border: 0;
          border-radius: 10px;
          color: #a9b3b2;
          cursor: pointer;
          display: flex;
          font-size: 14px;
          font-weight: 700;
          gap: 11px;
          padding: 12px;
          text-align: left;
          width: 100%;
        }

        .sport-nav button:hover,
        .sport-nav button.active {
          background: #172021;
          color: #fff;
        }

        .sport-icon {
          color: var(--teal);
          text-align: center;
          width: 18px;
        }

        .sport-profile {
          border-top: 1px solid var(--line);
          color: #c8d0cf;
          font-size: 13px;
          margin-top: auto;
          padding: 15px 10px 0;
        }

        .sport-role {
          color: var(--teal);
          font-size: 11px;
          margin-top: 3px;
        }

        .logout-button {
          background: transparent;
          border: 0;
          color: #91a09f;
          cursor: pointer;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .1em;
          margin-top: 14px;
          padding: 0;
          text-align: left;
          text-transform: uppercase;
        }

        .logout-button:hover {
          color: var(--teal);
        }

        .sport-main {
          flex: 1;
          max-width: 1500px;
          padding: 38px clamp(22px, 4vw, 64px) 70px;
        }

        .sport-topbar {
          align-items: flex-start;
          display: flex;
          gap: 22px;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .sport-eyebrow {
          color: var(--teal);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .16em;
        }

        .sport-title {
          font-size: clamp(30px, 4vw, 48px);
          letter-spacing: -.055em;
          margin: 5px 0 7px;
        }

        .sport-subtitle {
          color: var(--muted);
          margin: 0;
        }

        .sport-date {
          color: #bfcbca;
          font-size: 14px;
          font-weight: 700;
          padding-top: 10px;
          text-align: right;
        }

        .sport-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }

        .sport-button {
          background: #111718;
          border: 1px solid var(--line);
          border-radius: 10px;
          color: #dce4e3;
          cursor: pointer;
          font-size: 14px;
          font-weight: 800;
          padding: 12px 16px;
        }

        .sport-button:hover {
          border-color: var(--teal);
          color: #fff;
        }

        .sport-button.primary {
          background: var(--teal);
          border-color: var(--teal);
          color: #03100f;
        }

        .sport-grid {
          display: grid;
          gap: 18px;
        }

        .sport-stats {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          margin-bottom: 18px;
        }

        .sport-dashboard {
          align-items: start;
          grid-template-columns: minmax(0, 1.55fr) minmax(320px, .85fr);
        }

        .sport-card {
          background: linear-gradient(
            145deg,
            rgba(17, 23, 24, .95),
            rgba(10, 14, 15, .95)
          );
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 22px;
        }

        .metric {
          min-height: 128px;
        }

        .metric-label,
        .sport-card-title {
          color: #aeb9b8;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .metric strong {
          display: block;
          font-size: 36px;
          letter-spacing: -.06em;
          margin-top: 15px;
        }

        .metric span {
          color: var(--muted);
          display: block;
          font-size: 13px;
          margin-top: 5px;
        }

        .teal strong { color: var(--teal); }
        .yellow strong { color: var(--yellow); }
        .purple strong { color: var(--purple); }

        .next-card {
          border-left: 4px solid var(--teal);
        }

        .sport-card-head {
          align-items: center;
          display: flex;
          gap: 10px;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .sport-link {
          background: transparent;
          border: 0;
          color: var(--teal);
          cursor: pointer;
          font-size: 13px;
          font-weight: 800;
          padding: 0;
        }

        .event-name {
          font-size: 27px;
          letter-spacing: -.04em;
          margin: 0 0 8px;
        }

        .event-meta {
          color: #9facab;
          font-size: 14px;
        }

        .progress {
          background: #243032;
          border-radius: 100px;
          height: 9px;
          margin: 22px 0 9px;
          overflow: hidden;
        }

        .progress i {
          background: linear-gradient(90deg, var(--teal), #53d1c9);
          border-radius: inherit;
          display: block;
          height: 100%;
        }

        .attendance {
          color: #aab5b4;
          display: flex;
          flex-wrap: wrap;
          font-size: 13px;
          font-weight: 700;
          gap: 14px;
        }

        .dot {
          border-radius: 50%;
          display: inline-block;
          height: 8px;
          margin-right: 5px;
          width: 8px;
        }

        .week-list,
        .task-list {
          display: grid;
          gap: 10px;
        }

        .week-item {
          align-items: center;
          border-bottom: 1px solid #20292a;
          display: grid;
          gap: 14px;
          grid-template-columns: 88px 1fr auto;
          padding: 14px 0;
        }

        .week-item:last-child {
          border-bottom: 0;
        }

        .when {
          color: #bdc7c6;
          font-size: 13px;
          font-weight: 800;
        }

        .week-item strong {
          display: block;
          font-size: 15px;
          margin-bottom: 3px;
        }

        .type {
          color: var(--muted);
          font-size: 13px;
        }

        .tag {
          border: 1px solid #314143;
          border-radius: 99px;
          color: #c0cdcc;
          font-size: 11px;
          font-weight: 800;
          padding: 5px 8px;
          white-space: nowrap;
        }

        .tag.match {
          border-color: #634f1e;
          color: #f2c95b;
        }

        .tag.run {
          border-color: #513d68;
          color: #bf9ae4;
        }

        .task {
          align-items: center;
          border-bottom: 1px solid #20292a;
          display: flex;
          gap: 16px;
          justify-content: space-between;
          padding: 14px 0;
        }

        .task:last-child {
          border-bottom: 0;
        }

        .task-left {
          align-items: center;
          color: #dbe3e2;
          display: flex;
          font-size: 14px;
          font-weight: 700;
          gap: 11px;
        }

        .badge {
          align-items: center;
          background: var(--yellow);
          border-radius: 8px;
          color: #07100f;
          display: flex;
          font-size: 12px;
          font-weight: 900;
          height: 25px;
          justify-content: center;
          min-width: 25px;
          padding: 0 7px;
        }

        .badge.red {
          background: var(--red);
        }

        .badge.purple {
          background: var(--purple);
        }

        .section-view {
          display: none;
        }

        .section-view.active {
          display: block;
        }

        .empty {
          color: var(--muted);
          padding: 32px 0;
          text-align: center;
        }

        .data-error {
          background: rgba(239, 107, 115, .08);
          border: 1px solid rgba(239, 107, 115, .4);
          border-radius: 12px;
          color: #ffc3c7;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 20px;
          padding: 14px 16px;
        }

        @media (max-width: 980px) {
          .sport-sidebar {
            padding: 20px 10px;
            width: 76px;
          }

          .sport-brand {
            justify-content: center;
            padding: 0 0 28px;
          }

          .sport-brand strong,
          .sport-brand small,
          .sport-nav-label,
          .sport-nav button span,
          .sport-profile {
            display: none;
          }

          .sport-nav button {
            justify-content: center;
            padding: 13px;
          }

          .sport-main {
            padding: 28px 20px 50px;
          }

          .sport-stats,
          .sport-dashboard {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sport-dashboard > div:first-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 620px) {
          .sport-shell {
            display: block;
          }

          .sport-sidebar {
            align-items: center;
            border-bottom: 1px solid var(--line);
            border-right: 0;
            flex-direction: row;
            height: auto;
            padding: 12px;
            position: static;
            width: 100%;
          }

          .sport-brand {
            margin-right: auto;
            padding: 0;
          }

          .sport-nav {
            display: flex;
            overflow: auto;
          }

          .sport-nav button {
            flex: none;
            width: auto;
          }

          .sport-stats,
          .sport-dashboard {
            grid-template-columns: 1fr;
          }

          .sport-dashboard > div:first-child {
            grid-column: auto;
          }

          .sport-topbar {
            display: block;
          }

          .sport-date {
            padding-top: 12px;
            text-align: left;
          }

          .week-item {
            grid-template-columns: 72px 1fr;
          }

          .week-item .tag {
            grid-column: 2;
            width: max-content;
          }
        }
      `}</style>

      <div className="sport-shell">
        <aside className="sport-sidebar">
          <div className="sport-brand">
            <div className="sport-crest">M</div>

            <div>
              <strong>MELLO</strong>
              <small>SPORTBETRIEB</small>
            </div>
          </div>

          <div className="sport-nav-label">ADMINBEREICH</div>

          <nav className="sport-nav">
            {navigation.map((item) => (
              <button
                className={view === item.id ? "active" : ""}
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                type="button"
              >
                <b className="sport-icon">{item.icon}</b>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sport-profile">
            <strong>Daniel</strong>
            <div className="sport-role">ADMIN · SPORTBETRIEB</div>

            <button
              className="logout-button"
              onClick={handleLogout}
              type="button"
            >
              Abmelden
            </button>
          </div>
        </aside>

        <section className="sport-main">
          {errorMessage ? (
            <div className="data-error">{errorMessage}</div>
          ) : null}

          <section
            className={`section-view ${view === "overview" ? "active" : ""}`}
          >
            <div className="sport-topbar">
              <div>
                <div className="sport-eyebrow">FC MELLO WIEN · ADMIN</div>
                <h1 className="sport-title">Sportbetrieb</h1>
                <p className="sport-subtitle">
                  Trainings, Matches und Läufe im Blick.
                </p>
              </div>

              <div className="sport-date">{currentDateText}</div>
            </div>

            <div className="sport-actions">
              <button
                className="sport-button primary"
                onClick={() => router.push("/admin/training/neu")}
                type="button"
              >
                + Training
              </button>

              <button
                className="sport-button"
                onClick={() => router.push("/admin/matches/neu")}
                type="button"
              >
                + Match
              </button>

              <button
                className="sport-button"
                onClick={() => router.push("/admin/laeufe/neu")}
                type="button"
              >
                + Lauf
              </button>
            </div>

            <div className="sport-grid sport-stats">
              <article className="sport-card metric teal">
                <div className="metric-label">Nächstes Training</div>
                <strong>
                  {nextTraining
                    ? dayMonth
                        .format(new Date(nextTraining.starts_at))
                        .toUpperCase()
                    : "—"}
                </strong>
                <span>
                  {nextTraining
                    ? formatTimeRange(nextTraining)
                    : "Kein Training geplant"}
                </span>
              </article>

              <article className="sport-card metric">
                <div className="metric-label">Zugesagt</div>
                <strong>{nextTrainingSummary.attending}</strong>
                <span>von {nextTrainingSummary.total} Spielern</span>
              </article>

              <article className="sport-card metric yellow">
                <div className="metric-label">Offene Antworten</div>
                <strong>{allOpenResponses}</strong>
                <span>Trainings und Matches</span>
              </article>

              <article className="sport-card metric purple">
                <div className="metric-label">Geladene Termine</div>
                <strong>{sortedEvents.length}</strong>
                <span>dieser und nächste Monate</span>
              </article>
            </div>

            <div className="sport-grid sport-dashboard">
              <div className="sport-grid" style={{ gap: "18px" }}>
                <article className="sport-card next-card">
                  <div className="sport-card-head">
                    <div className="sport-card-title">Erster Termin</div>

                    <button
                      className="sport-link"
                      onClick={() => setView("training")}
                      type="button"
                    >
                      Termin verwalten →
                    </button>
                  </div>

                  {loading ? (
                    <p className="empty">Termine werden geladen …</p>
                  ) : firstEvent ? (
                    <>
                      <h2 className="event-name">{firstEvent.title}</h2>

                      <div className="event-meta">
                        {longDate.format(new Date(firstEvent.starts_at))} ·{" "}
                        {formatTimeRange(firstEvent)} ·{" "}
                        {formatLocation(firstEvent)}
                      </div>

                      {(() => {
                        const summary = attendanceSummary(
                          firstEvent,
                          attendances,
                        );

                        const percentage =
                          summary.total > 0
                            ? Math.round(
                                (summary.attending / summary.total) * 100,
                              )
                            : 0;

                        return (
                          <>
                            <div className="progress">
                              <i style={{ width: `${percentage}%` }} />
                            </div>

                            <div className="attendance">
                              <span>
                                <i
                                  className="dot"
                                  style={{ background: "var(--green)" }}
                                />
                                {summary.attending} zugesagt
                              </span>

                              <span>
                                <i
                                  className="dot"
                                  style={{ background: "var(--yellow)" }}
                                />
                                {summary.open} offen
                              </span>

                              <span>
                                <i
                                  className="dot"
                                  style={{ background: "var(--red)" }}
                                />
                                {summary.absent} abgesagt
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    <p className="empty">
                      Es sind im aktuellen Kalenderzeitraum keine Termine
                      vorhanden.
                    </p>
                  )}
                </article>

                <article className="sport-card">
                  <div className="sport-card-head">
                    <div className="sport-card-title">Termine</div>

                    <button
                      className="sport-link"
                      onClick={() => router.push("/admin/termine")}
                      type="button"
                    >
                      Kalender →
                    </button>
                  </div>

                  {renderEventRows(sortedEvents.slice(0, 6))}
                </article>
              </div>

              <article className="sport-card">
                <div className="sport-card-head">
                  <div className="sport-card-title">Offene Aufgaben</div>

                  <button
                    className="sport-link"
                    onClick={() => router.push("/admin/laeufe")}
                    type="button"
                  >
                    Läufe →
                  </button>
                </div>

                <div className="task-list">
                  <div className="task">
                    <div className="task-left">
                      <span className="badge">{allOpenResponses}</span>
                      Rückmeldungen fehlen
                    </div>

                    <button
                      className="sport-link"
                      onClick={() => setView("responses")}
                      type="button"
                    >
                      Prüfen
                    </button>
                  </div>

                  <div className="task">
                    <div className="task-left">
                      <span className="badge red">{absencesToReview}</span>
                      Abwesenheiten prüfen
                    </div>

                    <button
                      className="sport-link"
                      onClick={() => setView("responses")}
                      type="button"
                    >
                      Öffnen
                    </button>
                  </div>

                  <div className="task">
                    <div className="task-left">
                      <span className="badge purple">{runsToReview}</span>
                      Läufe prüfen
                    </div>

                    <button
                      className="sport-link"
                      onClick={() => router.push("/admin/laeufe")}
                      type="button"
                    >
                      Öffnen
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section
            className={`section-view ${view === "calendar" ? "active" : ""}`}
          >
            <div className="sport-topbar">
              <div>
                <div className="sport-eyebrow">ADMIN · KALENDER</div>
                <h1 className="sport-title">Termine</h1>
                <p className="sport-subtitle">
                  Aktueller Monat und die zwei folgenden Monate.
                </p>
              </div>
            </div>

            <article className="sport-card">
              {renderEventRows(sortedEvents)}
            </article>
          </section>

          <section
            className={`section-view ${view === "training" ? "active" : ""}`}
          >
            <div className="sport-topbar">
              <div>
                <div className="sport-eyebrow">ADMIN · TRAININGS</div>
                <h1 className="sport-title">Trainings verwalten</h1>
                <p className="sport-subtitle">
                  Trainings im aktuellen Kalenderzeitraum.
                </p>
              </div>
            </div>

            <article className="sport-card">
              <div className="sport-card-head">
                <div className="sport-card-title">Trainings</div>

                <button
                  className="sport-button primary"
                  onClick={() => router.push("/admin/training/neu")}
                  type="button"
                >
                  + Training
                </button>
              </div>

              {renderEventRows(trainingEvents)}
            </article>
          </section>

          <section
            className={`section-view ${view === "matches" ? "active" : ""}`}
          >
            <div className="sport-topbar">
              <div>
                <div className="sport-eyebrow">ADMIN · MATCHES</div>
                <h1 className="sport-title">Matches verwalten</h1>
                <p className="sport-subtitle">
                  Matches im aktuellen Kalenderzeitraum.
                </p>
              </div>
            </div>

            <article className="sport-card">
              <div className="sport-card-head">
                <div className="sport-card-title">Matches</div>

                <button
                  className="sport-button primary"
                  onClick={() => router.push("/admin/matches/neu")}
                  type="button"
                >
                  + Match
                </button>
              </div>

              {renderEventRows(matchEvents)}
            </article>
          </section>

          <section
            className={`section-view ${view === "runs" ? "active" : ""}`}
          >
            <div className="sport-topbar">
              <div>
                <div className="sport-eyebrow">ADMIN · LÄUFE</div>
                <h1 className="sport-title">Läufe</h1>
                <p className="sport-subtitle">
                  Individuelle Läufe und Laufnachweise.
                </p>
              </div>
            </div>

            <article className="sport-card">
              <div className="sport-card-head">
                <div className="sport-card-title">Läufe</div>

                <button
                  className="sport-button primary"
                  onClick={() => router.push("/admin/laeufe/neu")}
                  type="button"
                >
                  + Lauf
                </button>
              </div>

              {renderEventRows(runEvents)}
            </article>
          </section>

          <section
            className={`section-view ${view === "responses" ? "active" : ""}`}
          >
            <div className="sport-topbar">
              <div>
                <div className="sport-eyebrow">ADMIN · RÜCKMELDUNGEN</div>
                <h1 className="sport-title">Rückmeldungen</h1>
                <p className="sport-subtitle">
                  Offene Antworten und zu prüfende Abwesenheiten für Trainings
                  und Matches.
                </p>
              </div>
            </div>

            <article className="sport-card">
              <div className="task">
                <div className="task-left">
                  <span className="badge">{allOpenResponses}</span>
                  Rückmeldungen stehen noch aus.
                </div>
              </div>

              <div className="task">
                <div className="task-left">
                  <span className="badge red">{absencesToReview}</span>
                  Abwesenheiten warten auf eine Entscheidung.
                </div>
              </div>
            </article>
          </section>

          <section
            className={`section-view ${view === "replacement" ? "active" : ""}`}
          >
            <div className="sport-topbar">
              <div>
                <div className="sport-eyebrow">ADMIN · ERSATZLÄUFE</div>
                <h1 className="sport-title">Ersatzläufe</h1>
                <p className="sport-subtitle">
                  Eingereichte Ersatzleistungen kontrollieren.
                </p>
              </div>
            </div>

            <article className="sport-card">
              <div className="task">
                <div className="task-left">
                  <span className="badge purple">
                    {replacementsToReview}
                  </span>
                  Ersatzläufe warten auf Freigabe.
                </div>
              </div>

              {replacementsToReview === 0 ? (
                <p className="empty">
                  Aktuell liegen keine Ersatzläufe zur Freigabe vor.
                </p>
              ) : null}
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}