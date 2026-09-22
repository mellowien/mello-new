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

type FinalStatus =
  | "pending"
  | "approved"
  | "replacement_required"
  | "replacement_submitted"
  | "rejected"
  | "excused";

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
  absence_reason: string | null;
  player_note: string | null;
  responded_at: string | null;
  response_is_late: boolean;
  final_status: FinalStatus;
  approved_at: string | null;
  admin_note: string | null;
};

type FineItem = {
  rule: string;
  amount: string;
  note: string;
};

const weekdayLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const eventTypeDetails: Record<
  EventType,
  { label: string; className: string }
> = {
  training: {
    label: "Training",
    className: "event-training",
  },
  group_run: {
    label: "Gemeinsamer Lauf",
    className: "event-group-run",
  },
  individual_run: {
    label: "Laufplan",
    className: "event-individual-run",
  },
  match: {
    label: "Spiel",
    className: "event-match",
  },
  team_event: {
    label: "Teamtermin",
    className: "event-team-event",
  },
};

const attendanceDetails: Record<
  AttendanceStatus,
  { label: string; className: string }
> = {
  open: {
    label: "Noch keine Rückmeldung",
    className: "attendance-status-open",
  },
  attending: {
    label: "Du kommst",
    className: "attendance-status-attending",
  },
  absent: {
    label: "Du kommst nicht",
    className: "attendance-status-absent",
  },
  injured: {
    label: "Verletzt gemeldet",
    className: "attendance-status-injured",
  },
  submitted: {
    label: "Lauf gemeldet · Prüfung offen",
    className: "attendance-status-submitted",
  },
};

const fineItems: FineItem[] = [
  {
    rule: "Unentschuldigte Verspätung beim Training",
    amount: "1,00 € pro Minute",
    note: "Bitte rechtzeitig Bescheid geben, falls du dich verspätetst.",
  },
  {
    rule: "Unentschuldigt zu spät beim Spiel / Treffpunkt",
    amount: "2,50 € pro Minute",
    note: "Gilt ab der vereinbarten Treffpunktzeit.",
  },
  {
    rule: "Unentschuldigtes Fehlen beim Training",
    amount: "10,00 €",
    note: "Gilt bei fehlender oder nicht rechtzeitiger Abmeldung.",
  },
  {
    rule: "Unentschuldigtes Fehlen beim Spiel",
    amount: "50,00 €",
    note: "Gilt bei fehlender oder nicht rechtzeitiger Absage.",
  },
  {
    rule: "Am Abend vor dem Spiel fortgehen",
    amount: "25,00 €",
    note: "Spielvorbereitung und Regeneration haben Vorrang.",
  },
  {
    rule: "Nicht im Trainingstrikot beim Training",
    amount: "5,00 €",
    note: "Das Trainingstrikot gehört zur gemeinsamen Teamkleidung.",
  },
  {
    rule: "Trainingstrikot vor dem Spiel beim Aufwärmen nicht an",
    amount: "10,00 €",
    note: "Einheitliches Auftreten vor dem Spiel ist verpflichtend.",
  },
  {
    rule: "Gelbe Karte wegen Meckern",
    amount: "3,00 €",
    note: "Respekt gegenüber Schiedsrichter und Gegnern ist Pflicht.",
  },
  {
    rule: "Gelbe Karte wegen Unsportlichkeit",
    amount: "5,00 €",
    note: "Fair Play gilt für alle Spieler.",
  },
  {
    rule: "Rote Karte wegen Meckern / Unsportlichkeit / Tätlichkeit",
    amount: "20,00 €",
    note: "Zusätzlich können sportliche Konsequenzen folgen.",
  },
  {
    rule: "Handy klingelt während der Besprechung",
    amount: "2,00 €",
    note: "Handys vor der Ansprache lautlos schalten.",
  },
  {
    rule: "Am Handy während der Besprechung / Ansprache",
    amount: "3,00 €",
    note: "Volle Aufmerksamkeit für das Team.",
  },
  {
    rule: "Lauftraining unentschuldigt ausgelassen",
    amount: "10,00 €",
    note: "Der absolvierte Lauf ist über Strava nachzuweisen.",
  },
];

function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);

  return result;
}

function getWeekStart(date: Date) {
  const result = getStartOfDay(date);
  const mondayBasedDay = (result.getDay() + 6) % 7;

  result.setDate(result.getDate() - mondayBasedDay);

  return result;
}

function getEndOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);

  return result;
}

function formatTime(dateValue: string) {
  return new Intl.DateTimeFormat("de-AT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("de-AT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date(dateValue));
}

function formatDeadline(dateValue: string) {
  return new Intl.DateTimeFormat("de-AT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("de-AT", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getEventDateKey(event: TeamEvent) {
  return getDateKey(new Date(event.starts_at));
}

function getEventEndDate(event: TeamEvent) {
  if (event.all_day) {
    return getEndOfDay(new Date(event.starts_at));
  }

  if (event.ends_at) {
    return new Date(event.ends_at);
  }

  return new Date(event.starts_at);
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const mondayBasedOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();
  const totalCells =
    Math.ceil((mondayBasedOffset + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - mondayBasedOffset + 1;

    if (dayNumber < 1 || dayNumber > daysInMonth) {
      return null;
    }

    return new Date(year, month, dayNumber);
  });
}

function getEventLocation(event: TeamEvent) {
  if (event.location_name) {
    return `${event.location_name}${
      event.address ? ` · ${event.address}` : ""
    }`;
  }

  if (event.event_type === "individual_run") {
    return "Nach dem Lauf in Strava posten.";
  }

  return "";
}

function getEventTimeLabel(event: TeamEvent) {
  return event.all_day ? "Ganztägig" : `${formatTime(event.starts_at)} Uhr`;
}

function getCurrentOrNextEvent(events: TeamEvent[], now: Date) {
  return (
    events.find((event) => {
      const eventEnd = getEventEndDate(event);

      return eventEnd >= now;
    }) ?? null
  );
}

function isAttendanceEvent(event: TeamEvent) {
  return (
    event.event_type === "training" ||
    event.event_type === "match" ||
    event.event_type === "group_run" ||
    event.event_type === "individual_run"
  );
}

export default function SpielerbereichPage() {
  const router = useRouter();

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [events, setEvents] = useState<TeamEvent[]>([]);
  const [attendances, setAttendances] = useState<
    Record<string, Attendance>
  >({});
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingAttendances, setIsLoadingAttendances] = useState(true);
  const [eventsError, setEventsError] = useState("");
  const [attendanceError, setAttendanceError] = useState("");
  const [attendanceSuccess, setAttendanceSuccess] = useState("");
  const [savingAttendanceFor, setSavingAttendanceFor] = useState<
    string | null
  >(null);
  const [attendanceNotes, setAttendanceNotes] = useState<
    Record<string, string>
  >({});
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TeamEvent | null>(null);

  const today = useMemo(() => getStartOfDay(currentTime), [currentTime]);
  const currentMonth = useMemo(() => getMonthStart(today), [today]);
  const nextMonth = useMemo(() => addMonths(currentMonth, 1), [currentMonth]);

  const currentMonthDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth],
  );

  const nextMonthDays = useMemo(
    () => getCalendarDays(nextMonth),
    [nextMonth],
  );

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, TeamEvent[]>>((result, event) => {
      const key = getEventDateKey(event);

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(event);

      return result;
    }, {});
  }, [events]);

  const currentOrNextEvent = useMemo(() => {
    return getCurrentOrNextEvent(events, currentTime);
  }, [currentTime, events]);

  const weekStart = useMemo(() => {
    const referenceDate = currentOrNextEvent
      ? new Date(currentOrNextEvent.starts_at)
      : today;

    return getWeekStart(referenceDate);
  }, [currentOrNextEvent, today]);

  const weekEnd = useMemo(() => addDays(weekStart, 7), [weekStart]);

  const weekEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.starts_at);

      return eventDate >= weekStart && eventDate < weekEnd;
    });
  }, [events, weekEnd, weekStart]);

  const primaryWeekEvent = useMemo(() => {
    if (!currentOrNextEvent) {
      return null;
    }

    const isInCurrentWeek = weekEvents.some(
      (event) => event.id === currentOrNextEvent.id,
    );

    return isInCurrentWeek ? currentOrNextEvent : weekEvents[0] ?? null;
  }, [currentOrNextEvent, weekEvents]);

  const followingWeekEvents = useMemo(() => {
    if (!primaryWeekEvent) {
      return [];
    }

    return weekEvents.filter((event) => event.id !== primaryWeekEvent.id);
  }, [primaryWeekEvent, weekEvents]);

  const selectedDayEvents = useMemo(() => {
    if (!selectedDateKey) {
      return [];
    }

    return eventsByDate[selectedDateKey] ?? [];
  }, [eventsByDate, selectedDateKey]);

  const highlightedEventType = selectedEvent?.event_type ?? null;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (!session) {
        router.replace("/login?next=/spielerbereich");
        return;
      }

      setPlayerId(session.user.id);
      setIsCheckingSession(false);
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      const calendarStart = getMonthStart(today);
      const calendarEnd = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth() + 1,
        1,
      );

      const { data, error } = await supabase
        .from("events")
        .select(
          "id, title, event_type, starts_at, ends_at, location_name, address, description, required, response_deadline, all_day",
        )
        .gte("starts_at", calendarStart.toISOString())
        .lt("starts_at", calendarEnd.toISOString())
        .order("starts_at", { ascending: true });

      if (!isMounted) return;

      if (error) {
        setEventsError(
          "Die Teamtermine konnten gerade nicht geladen werden. Bitte versuche es später erneut.",
        );
        setIsLoadingEvents(false);
        return;
      }

      setEvents((data ?? []) as TeamEvent[]);
      setIsLoadingEvents(false);
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [nextMonth, today]);

  useEffect(() => {
    let isMounted = true;

    async function loadAttendances() {
      if (!playerId || events.length === 0) {
        setIsLoadingAttendances(false);
        return;
      }

      const attendanceEventIds = events
        .filter(isAttendanceEvent)
        .map((event) => event.id);

      if (attendanceEventIds.length === 0) {
        setAttendances({});
        setIsLoadingAttendances(false);
        return;
      }

      setIsLoadingAttendances(true);

      const { data, error } = await supabase
        .from("event_attendance")
        .select(
          "id, event_id, player_id, response_status, absence_reason, player_note, responded_at, response_is_late, final_status, approved_at, admin_note",
        )
        .eq("player_id", playerId)
        .in("event_id", attendanceEventIds);

      if (!isMounted) return;

      if (error) {
        setAttendanceError(
          "Deine Rückmeldungen konnten gerade nicht geladen werden.",
        );
        setIsLoadingAttendances(false);
        return;
      }

      const nextAttendances = (data ?? []).reduce<
        Record<string, Attendance>
      >((result, attendance) => {
        const typedAttendance = attendance as Attendance;
        result[typedAttendance.event_id] = typedAttendance;
        return result;
      }, {});

      const nextNotes = (data ?? []).reduce<Record<string, string>>(
        (result, attendance) => {
          const typedAttendance = attendance as Attendance;
          result[typedAttendance.event_id] =
            typedAttendance.player_note ??
            typedAttendance.absence_reason ??
            "";
          return result;
        },
        {},
      );

      setAttendances(nextAttendances);
      setAttendanceNotes(nextNotes);
      setIsLoadingAttendances(false);
    }

    loadAttendances();

    return () => {
      isMounted = false;
    };
  }, [events, playerId]);

  useEffect(() => {
    if (selectedEvent || events.length === 0) {
      return;
    }

    const automaticEvent = getCurrentOrNextEvent(events, currentTime);

    if (automaticEvent) {
      setSelectedDateKey(getEventDateKey(automaticEvent));
      setSelectedEvent(automaticEvent);
    }
  }, [currentTime, events, selectedEvent]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function handleDayClick(dateKey: string, dayEvents: TeamEvent[]) {
    setSelectedDateKey(dateKey);
    setSelectedEvent(dayEvents[0] ?? null);
    setAttendanceError("");
    setAttendanceSuccess("");
  }

  function handleEventClick(event: TeamEvent) {
    setSelectedDateKey(getEventDateKey(event));
    setSelectedEvent(event);
    setAttendanceError("");
    setAttendanceSuccess("");
  }

  function isDeadlinePassed(event: TeamEvent) {
    if (!event.response_deadline) {
      return false;
    }

    return currentTime.getTime() > new Date(event.response_deadline).getTime();
  }

  async function saveAttendance(
    event: TeamEvent,
    responseStatus: Exclude<AttendanceStatus, "open" | "submitted">,
  ) {
    if (
      !playerId ||
      (event.event_type !== "training" &&
        event.event_type !== "match" &&
        event.event_type !== "group_run")
    ) {
      return;
    }

    if (isDeadlinePassed(event)) {
      setAttendanceError(
        "Die Rückmeldefrist für diesen Termin ist bereits abgelaufen.",
      );
      return;
    }

    const attendance = attendances[event.id];

    if (!attendance) {
      setAttendanceError(
        "Für diesen Termin wurde noch keine Teilnahmezeile gefunden. Bitte aktualisiere die Seite kurz.",
      );
      return;
    }

    setSavingAttendanceFor(event.id);
    setAttendanceError("");
    setAttendanceSuccess("");

    const note = attendanceNotes[event.id]?.trim() ?? "";
    const absenceReason =
      responseStatus === "absent" || responseStatus === "injured"
        ? note || null
        : null;

    const { data, error } = await supabase
      .from("event_attendance")
      .update({
        response_status: responseStatus,
        absence_reason: absenceReason,
        player_note: note || null,
        responded_at: new Date().toISOString(),
      })
      .eq("id", attendance.id)
      .eq("player_id", playerId)
      .select(
        "id, event_id, player_id, response_status, absence_reason, player_note, responded_at, response_is_late, final_status, approved_at, admin_note",
      )
      .single();

    if (error) {
      setAttendanceError(
        "Deine Rückmeldung konnte nicht gespeichert werden. Bitte versuche es erneut.",
      );
      setSavingAttendanceFor(null);
      return;
    }

    const updatedAttendance = data as Attendance;

    setAttendances((currentAttendances) => ({
      ...currentAttendances,
      [event.id]: updatedAttendance,
    }));

    setAttendanceNotes((currentNotes) => ({
      ...currentNotes,
      [event.id]:
        updatedAttendance.player_note ??
        updatedAttendance.absence_reason ??
        "",
    }));

    setAttendanceSuccess("Deine Rückmeldung wurde gespeichert.");
    setSavingAttendanceFor(null);
  }

  async function submitRun(event: TeamEvent) {
    if (!playerId || event.event_type !== "individual_run") {
      return;
    }

    const attendance = attendances[event.id];

    if (!attendance) {
      setAttendanceError(
        "Für diesen Lauf wurde noch keine Teilnahmezeile gefunden. Bitte aktualisiere die Seite kurz.",
      );
      return;
    }

    if (attendance.response_status === "submitted") {
      return;
    }

    setSavingAttendanceFor(event.id);
    setAttendanceError("");
    setAttendanceSuccess("");

    const note = attendanceNotes[event.id]?.trim() ?? "";

    const { data, error } = await supabase
      .from("event_attendance")
      .update({
        response_status: "submitted",
        absence_reason: null,
        player_note: note || null,
        responded_at: new Date().toISOString(),
        final_status: "pending",
      })
      .eq("id", attendance.id)
      .eq("player_id", playerId)
      .select(
        "id, event_id, player_id, response_status, absence_reason, player_note, responded_at, response_is_late, final_status, approved_at, admin_note",
      )
      .single();

    if (error) {
      setAttendanceError(
        "Dein Lauf konnte nicht als erledigt gemeldet werden. Bitte versuche es erneut.",
      );
      setSavingAttendanceFor(null);
      return;
    }

    const updatedAttendance = data as Attendance;

    setAttendances((currentAttendances) => ({
      ...currentAttendances,
      [event.id]: updatedAttendance,
    }));

    setAttendanceNotes((currentNotes) => ({
      ...currentNotes,
      [event.id]: updatedAttendance.player_note ?? "",
    }));

    setAttendanceSuccess(
      "Lauf gemeldet. Bitte poste ihn jetzt in der FC-Mello-Strava-Gruppe. Der Trainer prüft deinen Nachweis anschließend.",
    );
    setSavingAttendanceFor(null);
  }

  function renderAttendanceCard(event: TeamEvent) {
    if (!isAttendanceEvent(event)) {
      return null;
    }

    const attendance = attendances[event.id];
    const status = attendance?.response_status ?? "open";
    const statusDetails = attendanceDetails[status];
    const deadlinePassed = isDeadlinePassed(event);
    const isSaving = savingAttendanceFor === event.id;
    const currentNote = attendanceNotes[event.id] ?? "";

    if (event.event_type === "individual_run") {
      const isSubmitted = status === "submitted";
      const isApproved = attendance?.final_status === "approved";
      const isRejected = attendance?.final_status === "rejected";
      const canSubmit = Boolean(attendance) && !isSaving && !isSubmitted;

      return (
        <section className="attendance-card run-attendance-card" aria-live="polite">
          <div className="attendance-card-heading">
            <div>
              <p className="attendance-kicker">Dein Laufnachweis</p>

              <p
                className={`attendance-status ${
                  isApproved
                    ? "attendance-status-approved"
                    : isRejected
                      ? "attendance-status-rejected"
                      : statusDetails.className
                }`}
              >
                {isApproved
                  ? "Lauf vom Trainer bestätigt"
                  : isRejected
                    ? "Lauf abgelehnt"
                    : statusDetails.label}
              </p>
            </div>

            <p className="attendance-deadline">
              Nach dem Lauf in der FC-Mello-Strava-Gruppe posten.
            </p>
          </div>

          {isLoadingAttendances ? (
            <p className="attendance-hint">
              Dein Laufstatus wird geladen …
            </p>
          ) : !attendance ? (
            <p className="attendance-hint attendance-hint-error">
              Für diesen Lauf ist noch keine Teilnahmezeile vorhanden. Bitte
              aktualisiere die Seite kurz.
            </p>
          ) : isApproved ? (
            <p className="attendance-hint attendance-hint-approved">
              ✓ Dein Strava-Nachweis wurde geprüft und dein Lauf bestätigt.
            </p>
          ) : isRejected ? (
            <>
              <p className="attendance-hint attendance-hint-error">
                Dein Lauf wurde noch nicht bestätigt.
                {attendance.admin_note
                  ? ` Hinweis vom Trainer: ${attendance.admin_note}`
                  : ""}
              </p>

              <p className="attendance-hint">
                Prüfe deinen Strava-Post und melde dich bei Bedarf beim Trainer.
              </p>
            </>
          ) : isSubmitted ? (
            <>
              <p className="attendance-hint attendance-hint-submitted">
                ✓ Als erledigt gemeldet. Poste deinen Lauf jetzt in der
                FC-Mello-Strava-Gruppe. Anschließend prüft ihn der Trainer.
              </p>

              {attendance.responded_at ? (
                <p className="attendance-hint">
                  Gemeldet am {formatDeadline(attendance.responded_at)} Uhr.
                </p>
              ) : null}
            </>
          ) : (
            <>
              <label
                className="attendance-note-label"
                htmlFor={`run-note-${event.id}`}
              >
                Nachricht zum Lauf
                <span> optional</span>
              </label>

              <textarea
                className="attendance-note"
                disabled={!canSubmit}
                id={`run-note-${event.id}`}
                maxLength={300}
                onChange={(changeEvent) => {
                  const value = changeEvent.target.value;

                  setAttendanceNotes((currentNotes) => ({
                    ...currentNotes,
                    [event.id]: value,
                  }));
                }}
                placeholder="Zum Beispiel: Lauf erledigt, leichte Beschwerden oder eine kurze Anmerkung …"
                value={currentNote}
              />

              <button
                className="attendance-action attendance-action-run-submit"
                disabled={!canSubmit}
                type="button"
                onClick={() => submitRun(event)}
              >
                {isSaving ? "Wird gemeldet …" : "✓ Lauf erledigt melden"}
              </button>

              <p className="attendance-hint">
                Mit der Meldung bestätigst du, dass du den Lauf absolviert
                hast. Poste ihn danach in der FC-Mello-Strava-Gruppe.
              </p>
            </>
          )}

          {attendanceSuccess && selectedEvent?.id === event.id ? (
            <p className="attendance-feedback attendance-feedback-success">
              {attendanceSuccess}
            </p>
          ) : null}

          {attendanceError && selectedEvent?.id === event.id ? (
            <p className="attendance-feedback attendance-feedback-error">
              {attendanceError}
            </p>
          ) : null}
        </section>
      );
    }

    const canRespond = Boolean(attendance) && !deadlinePassed && !isSaving;

    return (
      <section className="attendance-card" aria-live="polite">
        <div className="attendance-card-heading">
          <div>
            <p className="attendance-kicker">Deine Teilnahme</p>

            <p className={`attendance-status ${statusDetails.className}`}>
              {statusDetails.label}
              {attendance?.response_is_late ? " · verspätet" : ""}
            </p>
          </div>

          {event.response_deadline ? (
            <p className="attendance-deadline">
              Frist: {formatDeadline(event.response_deadline)} Uhr
            </p>
          ) : (
            <p className="attendance-deadline">
              Keine Rückmeldefrist hinterlegt
            </p>
          )}
        </div>

        {isLoadingAttendances ? (
          <p className="attendance-hint">Deine Rückmeldung wird geladen …</p>
        ) : !attendance ? (
          <p className="attendance-hint attendance-hint-error">
            Für diesen Termin ist noch keine Teilnahmezeile vorhanden. Bitte
            aktualisiere die Seite kurz.
          </p>
        ) : deadlinePassed ? (
          <p className="attendance-hint attendance-hint-closed">
            Die Rückmeldefrist ist abgelaufen. Änderungen sind nicht mehr
            möglich.
          </p>
        ) : (
          <>
            <div className="attendance-actions">
              <button
                className={`attendance-action attendance-action-attending ${
                  status === "attending" ? "attendance-action-active" : ""
                }`}
                disabled={!canRespond}
                type="button"
                onClick={() => saveAttendance(event, "attending")}
              >
                {isSaving ? "Wird gespeichert …" : "✓ Ich komme"}
              </button>

              <button
                className={`attendance-action attendance-action-absent ${
                  status === "absent" ? "attendance-action-active" : ""
                }`}
                disabled={!canRespond}
                type="button"
                onClick={() => saveAttendance(event, "absent")}
              >
                Ich komme nicht
              </button>

              <button
                className={`attendance-action attendance-action-injured ${
                  status === "injured" ? "attendance-action-active" : ""
                }`}
                disabled={!canRespond}
                type="button"
                onClick={() => saveAttendance(event, "injured")}
              >
                Verletzt
              </button>
            </div>

            <label className="attendance-note-label" htmlFor={`note-${event.id}`}>
              Kurze Nachricht oder Absagegrund
              <span> optional</span>
            </label>

            <textarea
              className="attendance-note"
              disabled={!canRespond}
              id={`note-${event.id}`}
              maxLength={300}
              onChange={(changeEvent) => {
                const value = changeEvent.target.value;

                setAttendanceNotes((currentNotes) => ({
                  ...currentNotes,
                  [event.id]: value,
                }));
              }}
              placeholder="Zum Beispiel: Arbeit, verletzt, privat …"
              value={currentNote}
            />

            <p className="attendance-hint">
              Du kannst deine Rückmeldung bis zur Frist jederzeit ändern.
            </p>
          </>
        )}

        {attendanceSuccess && selectedEvent?.id === event.id ? (
          <p className="attendance-feedback attendance-feedback-success">
            {attendanceSuccess}
          </p>
        ) : null}

        {attendanceError && selectedEvent?.id === event.id ? (
          <p className="attendance-feedback attendance-feedback-error">
            {attendanceError}
          </p>
        ) : null}
      </section>
    );
  }

  function renderCalendarMonth(month: Date, days: Array<Date | null>) {
    return (
      <section className="calendar-month" key={getDateKey(month)}>
        <h3 className="calendar-month-title">{formatMonth(month)}</h3>

        <div className="calendar-weekdays">
          {weekdayLabels.map((weekday) => (
            <span key={weekday}>{weekday}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, index) => {
            if (!day) {
              return (
                <div
                  className="calendar-day calendar-day-empty"
                  key={`empty-${index}`}
                />
              );
            }

            const dateKey = getDateKey(day);
            const dayEvents = eventsByDate[dateKey] ?? [];
            const isToday = dateKey === getDateKey(today);
            const isSelectedDay = dateKey === selectedDateKey;

            return (
              <div
                className={`calendar-day ${
                  isToday ? "calendar-day-today" : ""
                } ${isSelectedDay ? "calendar-day-selected" : ""}`}
                key={dateKey}
                onClick={() => handleDayClick(dateKey, dayEvents)}
                onKeyDown={(keyboardEvent) => {
                  if (
                    keyboardEvent.key === "Enter" ||
                    keyboardEvent.key === " "
                  ) {
                    keyboardEvent.preventDefault();
                    handleDayClick(dateKey, dayEvents);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span className="calendar-day-number">{day.getDate()}</span>

                <div className="calendar-events">
                  {dayEvents.slice(0, 3).map((event) => {
                    const eventDetails = eventTypeDetails[event.event_type];
                    const isSelectedEvent = selectedEvent?.id === event.id;

                    return (
                      <button
                        className={`calendar-event ${eventDetails.className} ${
                          isSelectedEvent ? "calendar-event-selected" : ""
                        }`}
                        key={event.id}
                        type="button"
                        onClick={(clickEvent) => {
                          clickEvent.stopPropagation();
                          handleEventClick(event);
                        }}
                      >
                        {!event.all_day ? (
                          <span className="calendar-event-time">
                            {formatTime(event.starts_at)}
                          </span>
                        ) : null}

                        <span className="calendar-event-title">
                          {event.title}
                        </span>
                      </button>
                    );
                  })}

                  {dayEvents.length > 3 ? (
                    <span className="calendar-more">
                      +{dayEvents.length - 3} weitere
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-500">
          Spielerbereich wird geladen …
        </p>
      </main>
    );
  }

  return (
    <main className="player-page">
      <style>{`
        .player-page {
          --mello-black: #080808;
          --mello-white: #f7f7f4;
          --mello-teal: #0d9488;
          --mello-line: #222222;
          --mello-muted: rgba(247, 247, 244, .62);

          background: var(--mello-black);
          color: var(--mello-white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding-top: 88px;
        }

        .player-page *,
        .player-page *::before,
        .player-page *::after {
          box-sizing: border-box;
        }

        .player-container {
          margin: 0 auto;
          width: min(100% - 6rem, 1440px);
        }

        .player-hero {
          border-bottom: 1px solid var(--mello-line);
          overflow: hidden;
          padding: 4.5rem 0 3.8rem;
          position: relative;
        }

        .player-hero-glow {
          background:
            radial-gradient(
              ellipse 55% 85% at 88% 42%,
              rgba(13, 148, 136, .12) 0%,
              transparent 70%
            );
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .player-hero-content {
          position: relative;
          z-index: 1;
        }

        .player-hero-top {
          align-items: flex-start;
          display: flex;
          gap: 2rem;
          justify-content: space-between;
        }

        .player-kicker,
        .section-kicker {
          color: var(--mello-teal);
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .18em;
          margin: 0 0 .9rem;
          text-transform: uppercase;
        }

        .player-title {
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.7rem, 5vw, 4.8rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .91;
          margin: 0 0 1.45rem;
          text-transform: uppercase;
        }

        .player-title-accent {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.4px rgba(13, 148, 136, .95);
          paint-order: stroke fill;
        }

        .player-intro {
          color: rgba(247, 247, 244, .7);
          font-size: clamp(1rem, 1.25vw, 1.13rem);
          line-height: 1.65;
          margin: 0;
          max-width: 58ch;
        }

        .player-logout {
          background: transparent;
          border: 1px solid rgba(13, 148, 136, .5);
          color: var(--mello-teal);
          cursor: pointer;
          flex: 0 0 auto;
          font-family: Arial, Helvetica, sans-serif;
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .11em;
          min-height: 42px;
          padding: .75rem 1rem;
          text-transform: uppercase;
          transition: background .2s ease, color .2s ease;
        }

        .player-logout:hover {
          background: var(--mello-teal);
          color: #ffffff;
        }

        .next-unit-section,
        .calendar-section,
        .fines-section {
          border-bottom: 1px solid var(--mello-line);
          padding: 4.8rem 0;
        }

        .section-heading {
          align-items: end;
          border-bottom: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          gap: 2rem;
          justify-content: space-between;
          margin-bottom: 2.25rem;
          padding-bottom: 1.35rem;
        }

        .section-kicker {
          margin-bottom: .65rem;
        }

        .section-title {
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -.04em;
          line-height: 1;
          margin: 0;
          text-transform: uppercase;
        }

        .section-note {
          color: rgba(247, 247, 244, .42);
          font-size: .76rem;
          line-height: 1.55;
          margin: 0;
          max-width: 30ch;
          text-align: right;
        }

        .week-layout {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: minmax(0, 1.55fr) minmax(17rem, .7fr);
        }

        .next-unit-card {
          background:
            radial-gradient(
              ellipse 62% 150% at 100% 50%,
              rgba(13, 148, 136, .13) 0%,
              transparent 67%
            ),
            rgba(247, 247, 244, .015);
          border: 1px solid rgba(247, 247, 244, .14);
          display: grid;
          grid-template-columns: minmax(10.5rem, .48fr) minmax(0, 1.7fr);
          min-height: 248px;
          overflow: hidden;
        }

        .next-unit-date-panel {
          align-items: flex-start;
          background: rgba(13, 148, 136, .055);
          border-right: 1px solid rgba(247, 247, 244, .14);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .next-unit-date-panel::after {
          background: var(--mello-teal);
          content: "";
          height: 1px;
          left: 2rem;
          opacity: .8;
          position: absolute;
          top: 1.35rem;
          width: 3.2rem;
        }

        .next-unit-date-day {
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(4.7rem, 7vw, 7rem);
          font-weight: 900;
          letter-spacing: -.09em;
          line-height: .75;
          margin-top: 1rem;
        }

        .next-unit-date-month {
          color: var(--mello-teal);
          font-size: .78rem;
          font-weight: 900;
          letter-spacing: .17em;
          margin-top: .9rem;
        }

        .next-unit-date-weekday {
          color: rgba(247, 247, 244, .48);
          font-size: .72rem;
          font-weight: 800;
          letter-spacing: .08em;
          margin-top: .38rem;
          text-transform: uppercase;
        }

        .next-unit-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
          padding: 2rem 2.2rem 1.5rem;
        }

        .next-unit-content-top {
          align-items: flex-start;
          display: flex;
          gap: 1rem;
          justify-content: space-between;
        }

        .next-unit-badge {
          color: var(--mello-teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .13em;
          margin: 0;
          text-transform: uppercase;
        }

        .next-unit-time {
          color: var(--mello-white);
          flex: 0 0 auto;
          font-size: .78rem;
          font-weight: 800;
          letter-spacing: .04em;
          margin: 0;
        }

        .next-unit-title {
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.2rem, 4vw, 4.2rem);
          font-weight: 900;
          letter-spacing: -.065em;
          line-height: .85;
          margin: 1.8rem 0 .9rem;
          text-transform: uppercase;
        }

        .next-unit-description {
          color: var(--mello-muted);
          font-size: .96rem;
          line-height: 1.6;
          margin: 0;
          max-width: 60ch;
        }

        .next-unit-footer {
          align-items: end;
          border-top: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          gap: 1.5rem;
          justify-content: space-between;
          margin-top: 1.7rem;
          padding-top: 1rem;
        }

        .next-unit-location {
          color: rgba(247, 247, 244, .57);
          font-size: .78rem;
          line-height: 1.45;
          margin: 0;
        }

        .next-unit-required {
          align-items: center;
          color: var(--mello-teal);
          display: flex;
          flex: 0 0 auto;
          font-size: .64rem;
          font-weight: 900;
          gap: .6rem;
          letter-spacing: .09em;
          margin: 0;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .next-unit-dot {
          background: var(--mello-teal);
          border-radius: 999px;
          box-shadow: 0 0 0 4px rgba(13, 148, 136, .12);
          height: 7px;
          width: 7px;
        }

        .week-following {
          border: 1px solid rgba(247, 247, 244, .14);
          display: flex;
          flex-direction: column;
          min-height: 248px;
        }

        .week-following-heading {
          border-bottom: 1px solid rgba(247, 247, 244, .12);
          color: rgba(247, 247, 244, .55);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .13em;
          margin: 0;
          padding: 1.2rem 1.25rem;
          text-transform: uppercase;
        }

        .week-following-list {
          display: grid;
        }

        .week-following-event {
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(247, 247, 244, .1);
          color: inherit;
          cursor: pointer;
          display: grid;
          gap: .35rem;
          padding: 1rem 1.25rem;
          text-align: left;
          transition: background .2s ease;
          width: 100%;
        }

        .week-following-event:last-child {
          border-bottom: 0;
        }

        .week-following-event:hover {
          background: rgba(247, 247, 244, .035);
        }

        .week-following-date {
          color: var(--mello-teal);
          font-size: .62rem;
          font-weight: 900;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .week-following-title {
          color: var(--mello-white);
          font-size: .9rem;
          font-weight: 800;
          line-height: 1.3;
        }

        .week-following-meta {
          color: rgba(247, 247, 244, .46);
          font-size: .71rem;
          line-height: 1.35;
        }

        .week-following-empty,
        .empty-unit {
          color: var(--mello-muted);
          font-size: .9rem;
          line-height: 1.6;
          margin: 0;
          padding: 1.25rem;
        }

        .empty-unit {
          border: 1px solid rgba(247, 247, 244, .14);
          font-size: 1rem;
          padding: 2rem;
        }

        .calendar-legend {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: .65rem 1.2rem;
          margin: -1rem 0 2rem;
        }

        .calendar-legend-item {
          align-items: center;
          background: transparent;
          border: 0;
          border-radius: 999px;
          color: rgba(247, 247, 244, .56);
          cursor: default;
          display: inline-flex;
          font-family: inherit;
          font-size: .68rem;
          font-weight: 800;
          gap: .45rem;
          letter-spacing: .08em;
          padding: .32rem .45rem;
          text-transform: uppercase;
          transition: background .2s ease, color .2s ease;
        }

        .calendar-legend-item-active {
          background: rgba(247, 247, 244, .08);
          color: var(--mello-white);
        }

        .calendar-legend-dot {
          border-radius: 999px;
          height: 8px;
          width: 8px;
        }

        .calendar-months {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .calendar-month {
          border: 1px solid rgba(247, 247, 244, .14);
          overflow: hidden;
        }

        .calendar-month-title {
          border-bottom: 1px solid rgba(247, 247, 244, .14);
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: -.025em;
          margin: 0;
          padding: 1.15rem 1.25rem;
          text-transform: uppercase;
        }

        .calendar-weekdays,
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
        }

        .calendar-weekdays {
          border-bottom: 1px solid rgba(247, 247, 244, .1);
        }

        .calendar-weekdays span {
          color: rgba(247, 247, 244, .38);
          font-size: .58rem;
          font-weight: 800;
          letter-spacing: .07em;
          padding: .75rem .45rem;
          text-align: right;
          text-transform: uppercase;
        }

        .calendar-day {
          background: transparent;
          border-bottom: 1px solid rgba(247, 247, 244, .09);
          border-right: 1px solid rgba(247, 247, 244, .09);
          color: inherit;
          cursor: pointer;
          min-height: 112px;
          padding: .5rem;
          position: relative;
          text-align: left;
          transition: background .2s ease;
        }

        .calendar-day:nth-child(7n) {
          border-right: 0;
        }

        .calendar-day:hover,
        .calendar-day:focus-visible {
          background: rgba(247, 247, 244, .035);
          outline: none;
        }

        .calendar-day-empty {
          background: rgba(247, 247, 244, .012);
          cursor: default;
        }

        .calendar-day-number {
          color: rgba(247, 247, 244, .5);
          display: block;
          font-size: .66rem;
          font-weight: 800;
          margin-bottom: .45rem;
          text-align: right;
        }

        .calendar-day-today {
          background: rgba(13, 148, 136, .07);
          box-shadow: inset 0 0 0 1px rgba(13, 148, 136, .55);
        }

        .calendar-day-today .calendar-day-number {
          color: var(--mello-teal);
        }

        .calendar-day-selected {
          background: rgba(247, 247, 244, .065);
          box-shadow: inset 0 0 0 1px rgba(247, 247, 244, .28);
        }

        .calendar-events {
          display: grid;
          gap: .28rem;
        }

        .calendar-event {
          appearance: none;
          background: transparent;
          border: 0;
          border-left: 3px solid;
          color: inherit;
          cursor: pointer;
          font-family: inherit;
          font-size: .58rem;
          line-height: 1.25;
          overflow: hidden;
          padding: .24rem .28rem;
          text-align: left;
          text-overflow: ellipsis;
          transition: filter .2s ease, transform .2s ease;
          white-space: nowrap;
          width: 100%;
        }

        .calendar-event:hover,
        .calendar-event-selected {
          filter: brightness(1.3);
          transform: translateX(2px);
        }

        .calendar-event-time {
          font-weight: 800;
          margin-right: .22rem;
        }

        .calendar-event-title {
          color: rgba(247, 247, 244, .88);
        }

        .event-training {
          background: rgba(13, 148, 136, .14);
          border-color: #0d9488;
          color: #5eead4;
        }

        .event-group-run {
          background: rgba(56, 189, 248, .13);
          border-color: #38bdf8;
          color: #7dd3fc;
        }

        .event-individual-run {
          background: rgba(167, 139, 250, .13);
          border-color: #a78bfa;
          color: #c4b5fd;
        }

        .event-match {
          background: rgba(245, 158, 11, .13);
          border-color: #f59e0b;
          color: #fcd34d;
        }

        .event-team-event {
          background: rgba(244, 114, 182, .13);
          border-color: #f472b6;
          color: #f9a8d4;
        }

        .calendar-more {
          color: rgba(247, 247, 244, .48);
          font-size: .57rem;
          font-weight: 800;
          letter-spacing: .03em;
        }

        .calendar-detail {
          background:
            radial-gradient(
              ellipse 60% 130% at 100% 50%,
              rgba(13, 148, 136, .1) 0%,
              transparent 68%
            ),
            rgba(247, 247, 244, .015);
          border: 1px solid rgba(247, 247, 244, .14);
          margin-top: 2rem;
          min-height: 245px;
          padding: 1.8rem;
        }

        .calendar-detail-kicker {
          color: var(--mello-teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .14em;
          margin: 0 0 .75rem;
          text-transform: uppercase;
        }

        .calendar-detail-title {
          color: var(--mello-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2rem, 3vw, 3.4rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .9;
          margin: 0 0 1rem;
          text-transform: uppercase;
        }

        .calendar-detail-meta {
          align-items: center;
          color: rgba(247, 247, 244, .58);
          display: flex;
          flex-wrap: wrap;
          font-size: .82rem;
          font-weight: 700;
          gap: .65rem;
          line-height: 1.45;
          margin: 0 0 1rem;
        }

        .calendar-detail-separator {
          color: var(--mello-teal);
        }

        .calendar-detail-description {
          color: var(--mello-muted);
          font-size: .98rem;
          line-height: 1.65;
          margin: 0;
          max-width: 78ch;
        }

        .attendance-card {
          background: rgba(13, 148, 136, .055);
          border: 1px solid rgba(13, 148, 136, .35);
          margin-top: 1.6rem;
          padding: 1.2rem;
        }

        .run-attendance-card {
          background: rgba(167, 139, 250, .07);
          border-color: rgba(167, 139, 250, .48);
        }

        .attendance-card-heading {
          align-items: flex-start;
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .attendance-kicker {
          color: var(--mello-teal);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .13em;
          margin: 0 0 .35rem;
          text-transform: uppercase;
        }

        .attendance-status {
          font-size: .95rem;
          font-weight: 900;
          margin: 0;
        }

        .attendance-status-open {
          color: rgba(247, 247, 244, .72);
        }

        .attendance-status-attending {
          color: #5eead4;
        }

        .attendance-status-absent {
          color: #fcd34d;
        }

        .attendance-status-injured {
          color: #f9a8d4;
        }

        .attendance-status-submitted {
          color: #c4b5fd;
        }

        .attendance-status-approved {
          color: #5eead4;
        }

        .attendance-status-rejected {
          color: #f5a5a5;
        }

        .attendance-deadline {
          color: rgba(247, 247, 244, .58);
          font-size: .72rem;
          font-weight: 700;
          line-height: 1.45;
          margin: 0;
          max-width: 27ch;
          text-align: right;
        }

        .attendance-actions {
          display: grid;
          gap: .65rem;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .attendance-action {
          appearance: none;
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .22);
          color: var(--mello-white);
          cursor: pointer;
          font-family: inherit;
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .04em;
          min-height: 44px;
          padding: .7rem .75rem;
          text-transform: uppercase;
          transition: background .2s ease, border-color .2s ease, color .2s ease;
        }

        .attendance-action:hover:not(:disabled),
        .attendance-action-active {
          background: rgba(247, 247, 244, .09);
          border-color: var(--mello-white);
        }

        .attendance-action-attending:hover:not(:disabled),
        .attendance-action-attending.attendance-action-active {
          background: rgba(13, 148, 136, .22);
          border-color: #0d9488;
          color: #5eead4;
        }

        .attendance-action-absent:hover:not(:disabled),
        .attendance-action-absent.attendance-action-active {
          background: rgba(245, 158, 11, .18);
          border-color: #f59e0b;
          color: #fcd34d;
        }

        .attendance-action-injured:hover:not(:disabled),
        .attendance-action-injured.attendance-action-active {
          background: rgba(244, 114, 182, .16);
          border-color: #f472b6;
          color: #f9a8d4;
        }

        .attendance-action-run-submit {
          background: rgba(167, 139, 250, .16);
          border-color: #a78bfa;
          color: #ddd6fe;
          margin-top: 1.1rem;
          width: 100%;
        }

        .attendance-action-run-submit:hover:not(:disabled) {
          background: rgba(167, 139, 250, .28);
          border-color: #c4b5fd;
          color: #ffffff;
        }

        .attendance-action:disabled {
          cursor: not-allowed;
          opacity: .45;
        }

        .attendance-note-label {
          color: rgba(247, 247, 244, .72);
          display: block;
          font-size: .74rem;
          font-weight: 800;
          margin: 1.1rem 0 .45rem;
        }

        .attendance-note-label span {
          color: rgba(247, 247, 244, .4);
          font-weight: 700;
        }

        .attendance-note {
          background: rgba(0, 0, 0, .2);
          border: 1px solid rgba(247, 247, 244, .16);
          color: var(--mello-white);
          font-family: inherit;
          font-size: .84rem;
          line-height: 1.5;
          min-height: 76px;
          padding: .7rem .8rem;
          resize: vertical;
          width: 100%;
        }

        .attendance-note:focus {
          border-color: var(--mello-teal);
          outline: none;
        }

        .attendance-note:disabled {
          cursor: not-allowed;
          opacity: .55;
        }

        .attendance-hint,
        .attendance-feedback {
          font-size: .75rem;
          line-height: 1.5;
          margin: .85rem 0 0;
        }

        .attendance-hint {
          color: rgba(247, 247, 244, .55);
        }

        .attendance-hint-closed {
          color: #fcd34d;
        }

        .attendance-hint-submitted {
          color: #ddd6fe;
          font-weight: 700;
        }

        .attendance-hint-approved {
          color: #5eead4;
          font-weight: 700;
        }

        .attendance-hint-error,
        .attendance-feedback-error {
          color: #f5a5a5;
        }

        .attendance-feedback-success {
          color: #5eead4;
          font-weight: 800;
        }

        .calendar-detail-day-list {
          display: grid;
          gap: .75rem;
        }

        .calendar-detail-day-button {
          align-items: center;
          background: rgba(247, 247, 244, .03);
          border: 1px solid rgba(247, 247, 244, .12);
          color: var(--mello-white);
          cursor: pointer;
          display: flex;
          font-family: inherit;
          gap: .8rem;
          justify-content: space-between;
          padding: .85rem 1rem;
          text-align: left;
          width: 100%;
        }

        .calendar-detail-day-button:hover {
          background: rgba(247, 247, 244, .065);
        }

        .calendar-detail-day-button-type {
          color: var(--mello-teal);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .calendar-detail-day-button-title {
          font-size: .9rem;
          font-weight: 800;
        }

        .calendar-detail-empty {
          color: var(--mello-muted);
          font-size: .95rem;
          line-height: 1.6;
          margin: 0;
        }

        .calendar-loading,
        .calendar-error {
          border: 1px solid rgba(247, 247, 244, .14);
          color: var(--mello-muted);
          font-size: .95rem;
          line-height: 1.6;
          margin: 0;
          padding: 1.25rem;
        }

        .calendar-error {
          color: #f5a5a5;
        }

        .fines-table-wrap {
          border: 1px solid rgba(247, 247, 244, .16);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .fines-table {
          border-collapse: collapse;
          min-width: 660px;
          table-layout: fixed;
          width: 100%;
        }

        .fines-table th {
          background: rgba(247, 247, 244, .035);
          border-bottom: 1px solid rgba(247, 247, 244, .16);
          color: rgba(247, 247, 244, .5);
          font-size: .64rem;
          font-weight: 900;
          letter-spacing: .13em;
          padding: .95rem 1.15rem;
          text-align: left;
          text-transform: uppercase;
        }

        .fines-table th + th,
        .fines-table td + td {
          border-left: 1px solid rgba(247, 247, 244, .12);
        }

        .fines-table th:first-child,
        .fines-table td:first-child {
          width: 7rem;
        }

        .fines-table th:last-child,
        .fines-table td:last-child {
          width: 11rem;
        }

        .fines-table tbody tr {
          transition: background .2s ease;
        }

        .fines-table tbody tr:hover {
          background: rgba(13, 148, 136, .055);
        }

        .fines-table td {
          border-bottom: 1px solid rgba(247, 247, 244, .1);
          padding: 1rem 1.15rem;
          vertical-align: middle;
        }

        .fines-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .fines-number-heading,
        .fines-number-cell {
          color: var(--mello-teal);
        }

        .fines-number-cell {
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .1em;
          vertical-align: top !important;
        }

        .fines-rule-cell {
          display: grid;
          gap: .35rem;
        }

        .fines-rule-name {
          color: var(--mello-white);
          font-size: .94rem;
          font-weight: 800;
          line-height: 1.35;
        }

        .fines-rule-note {
          color: rgba(247, 247, 244, .48);
          font-size: .78rem;
          line-height: 1.45;
        }

        .fines-amount-heading {
          text-align: right !important;
        }

        .fines-amount-cell {
          color: var(--mello-teal);
          font-size: .95rem;
          font-weight: 900;
          text-align: right;
          white-space: nowrap;
        }

        .fines-footer-note {
          color: rgba(247, 247, 244, .4);
          font-size: .72rem;
          line-height: 1.55;
          margin: 1rem 0 0;
        }

        @media (max-width: 1050px) {
          .week-layout {
            grid-template-columns: 1fr;
          }

          .week-following {
            min-height: 0;
          }

          .week-following-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .week-following-event {
            border-bottom: 0;
            border-right: 1px solid rgba(247, 247, 244, .1);
          }

          .week-following-event:last-child {
            border-right: 0;
          }
        }

        @media (max-width: 900px) {
          .player-container {
            width: min(100% - 3rem, 960px);
          }

          .calendar-months {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .player-page {
            padding-top: 68px;
          }

          .player-container {
            width: min(100% - 2.25rem, 40rem);
          }

          .player-hero {
            padding: 2.7rem 0 2.8rem;
          }

          .player-hero-top {
            display: block;
          }

          .player-logout {
            margin-top: 1.6rem;
            width: 100%;
          }

          .player-kicker,
          .section-kicker {
            font-size: .61rem;
            letter-spacing: .16em;
          }

          .player-title {
            font-size: clamp(2.7rem, 14vw, 4.15rem);
            letter-spacing: -.07em;
            line-height: .86;
            margin-bottom: 1.3rem;
          }

          .player-title-accent {
            -webkit-text-stroke-width: 1px;
          }

          .player-intro {
            color: rgba(247, 247, 244, .67);
            font-size: .96rem;
            line-height: 1.65;
          }

          .next-unit-section,
          .calendar-section,
          .fines-section {
            padding: 3.6rem 0;
          }

          .section-heading {
            align-items: start;
            display: block;
            margin-bottom: 1.25rem;
            padding-bottom: 1.2rem;
          }

          .section-title {
            font-size: clamp(1.9rem, 9vw, 2.6rem);
          }

          .section-note {
            display: none;
          }

          .next-unit-card {
            display: block;
            min-height: 0;
          }

          .next-unit-date-panel {
            border-bottom: 1px solid rgba(247, 247, 244, .14);
            border-right: 0;
            min-height: 152px;
            padding: 1.5rem;
          }

          .next-unit-date-panel::after {
            left: 1.5rem;
            top: 1rem;
          }

          .next-unit-date-day {
            font-size: 5rem;
            margin-top: .65rem;
          }

          .next-unit-content {
            padding: 1.5rem;
          }

          .next-unit-content-top {
            align-items: flex-start;
          }

          .next-unit-time {
            font-size: .7rem;
          }

          .next-unit-title {
            font-size: clamp(2.2rem, 12vw, 3.6rem);
            margin: 1.45rem 0 .85rem;
          }

          .next-unit-footer {
            align-items: flex-start;
            display: block;
            margin-top: 1.4rem;
          }

          .next-unit-required {
            margin-top: 1rem;
            white-space: normal;
          }

          .week-following-list {
            grid-template-columns: 1fr;
          }

          .week-following-event {
            border-bottom: 1px solid rgba(247, 247, 244, .1);
            border-right: 0;
          }

          .calendar-legend {
            gap: .35rem .55rem;
            margin: 0 0 1.5rem;
          }

          .calendar-legend-item {
            font-size: .58rem;
            padding: .25rem .3rem;
          }

          .calendar-month-title {
            font-size: 1.15rem;
            padding: 1rem;
          }

          .calendar-day {
            min-height: 86px;
            padding: .35rem;
          }

          .calendar-weekdays span {
            font-size: .53rem;
            padding: .58rem .25rem;
          }

          .calendar-event {
            border-left-width: 2px;
            font-size: .49rem;
            padding: .18rem .2rem;
          }

          .calendar-event-time {
            display: none;
          }

          .calendar-more {
            font-size: .5rem;
          }

          .calendar-detail {
            margin-top: 1.25rem;
            min-height: 0;
            padding: 1.35rem;
          }

          .calendar-detail-title {
            font-size: clamp(1.8rem, 10vw, 2.7rem);
          }

          .attendance-card {
            margin-top: 1.2rem;
            padding: 1rem;
          }

          .attendance-card-heading {
            display: block;
          }

          .attendance-deadline {
            margin-top: .55rem;
            max-width: none;
            text-align: left;
          }

          .attendance-actions {
            grid-template-columns: 1fr;
          }

          .calendar-detail-day-button {
            align-items: flex-start;
            display: grid;
            gap: .35rem;
          }

          .fines-table-wrap {
            border-left: 0;
            border-right: 0;
            margin-left: -1.125rem;
            margin-right: -1.125rem;
          }

          .fines-table {
            min-width: 560px;
          }

          .fines-table th {
            font-size: .58rem;
            padding: .8rem .85rem;
          }

          .fines-table th:first-child,
          .fines-table td:first-child {
            width: 3.7rem;
          }

          .fines-table th:last-child,
          .fines-table td:last-child {
            width: 8.6rem;
          }

          .fines-table td {
            padding: .85rem;
          }

          .fines-rule-name {
            font-size: .84rem;
          }

          .fines-rule-note {
            font-size: .7rem;
            line-height: 1.4;
          }

          .fines-amount-cell {
            font-size: .82rem;
          }

          .fines-footer-note {
            font-size: .68rem;
          }
        }

        @media (max-width: 360px) {
          .player-container {
            width: min(100% - 2rem, 40rem);
          }

          .player-title {
            font-size: 2.55rem;
          }

          .calendar-day {
            min-height: 74px;
          }
        }
      `}</style>

      <section className="player-hero">
        <div className="player-hero-glow" />

        <div className="player-container player-hero-content">
          <div className="player-hero-top">
            <div>
              <p className="player-kicker">FC Mello Wien · Intern</p>

              <h1 className="player-title">
                Spieler
                <span className="player-title-accent">bereich.</span>
              </h1>

              <p className="player-intro">
                Dein zentraler Bereich für Laufplan, Trainings, Spiele und
                aktuelle Team-Informationen.
              </p>
            </div>

            <button
              className="player-logout"
              type="button"
              onClick={handleLogout}
            >
              Ausloggen
            </button>
          </div>
        </div>
      </section>

      <section className="next-unit-section">
        <div className="player-container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Deine Woche</p>
              <h2 className="section-title">Einheiten im Blick.</h2>
            </div>

            <p className="section-note">
              Die aktuelle oder nächste Einheit groß, alle folgenden Termine
              dieser Woche kompakt daneben.
            </p>
          </div>

          {isLoadingEvents ? (
            <p className="empty-unit">Einheiten werden geladen …</p>
          ) : primaryWeekEvent ? (
            <div className="week-layout">
              <article className="next-unit-card">
                <div className="next-unit-date-panel">
                  <span className="next-unit-date-day">
                    {new Intl.DateTimeFormat("de-AT", {
                      day: "2-digit",
                    }).format(new Date(primaryWeekEvent.starts_at))}
                  </span>

                  <span className="next-unit-date-month">
                    {new Intl.DateTimeFormat("de-AT", {
                      month: "short",
                    })
                      .format(new Date(primaryWeekEvent.starts_at))
                      .replace(".", "")
                      .toUpperCase()}
                  </span>

                  <span className="next-unit-date-weekday">
                    {new Intl.DateTimeFormat("de-AT", {
                      weekday: "long",
                    }).format(new Date(primaryWeekEvent.starts_at))}
                  </span>
                </div>

                <div className="next-unit-content">
                  <div className="next-unit-content-top">
                    <p className="next-unit-badge">
                      {eventTypeDetails[primaryWeekEvent.event_type].label} ·
                      Aktuelle / nächste Einheit
                    </p>

                    <p className="next-unit-time">
                      {getEventTimeLabel(primaryWeekEvent)}
                    </p>
                  </div>

                  <h3 className="next-unit-title">
                    {primaryWeekEvent.title}
                  </h3>

                  <p className="next-unit-description">
                    {primaryWeekEvent.description ||
                      "Weitere Details zu dieser Einheit findest du im Teamkalender."}
                  </p>

                  <div className="next-unit-footer">
                    <p className="next-unit-location">
                      {getEventLocation(primaryWeekEvent)}
                    </p>

                    <p className="next-unit-required">
                      <span className="next-unit-dot" />
                      {primaryWeekEvent.required
                        ? "Teilnahme erforderlich"
                        : "Optional"}
                    </p>
                  </div>
                </div>
              </article>

              <aside className="week-following">
                <p className="week-following-heading">
                  Danach diese Woche
                </p>

                {followingWeekEvents.length > 0 ? (
                  <div className="week-following-list">
                    {followingWeekEvents.map((event) => (
                      <button
                        className="week-following-event"
                        key={event.id}
                        type="button"
                        onClick={() => handleEventClick(event)}
                      >
                        <span className="week-following-date">
                          {formatDate(event.starts_at)} ·{" "}
                          {getEventTimeLabel(event)}
                        </span>

                        <span className="week-following-title">
                          {event.title}
                        </span>

                        <span className="week-following-meta">
                          {eventTypeDetails[event.event_type].label}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="week-following-empty">
                    Für den Rest dieser Woche sind keine weiteren Termine
                    eingetragen.
                  </p>
                )}
              </aside>
            </div>
          ) : (
            <p className="empty-unit">
              Es sind derzeit keine kommenden Einheiten oder Teamtermine
              eingetragen.
            </p>
          )}
        </div>
      </section>

      <section className="calendar-section">
        <div className="player-container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Teamkalender</p>
              <h2 className="section-title">Termine im Blick.</h2>
            </div>

            <p className="section-note">
              Klicke auf einen Kalendertag oder Termin, um die Details groß
              anzuzeigen.
            </p>
          </div>

          <div className="calendar-legend">
            {Object.entries(eventTypeDetails).map(
              ([eventType, eventDetails]) => (
                <span
                  className={`calendar-legend-item ${
                    highlightedEventType === eventType
                      ? "calendar-legend-item-active"
                      : ""
                  }`}
                  key={eventType}
                >
                  <span
                    className={`calendar-legend-dot ${eventDetails.className}`}
                  />
                  {eventDetails.label}
                </span>
              ),
            )}
          </div>

          {isLoadingEvents ? (
            <p className="calendar-loading">Kalender wird geladen …</p>
          ) : eventsError ? (
            <p className="calendar-error">{eventsError}</p>
          ) : (
            <>
              <div className="calendar-months">
                {renderCalendarMonth(currentMonth, currentMonthDays)}
                {renderCalendarMonth(nextMonth, nextMonthDays)}
              </div>

              <section className="calendar-detail">
                {selectedEvent ? (
                  <>
                    <p className="calendar-detail-kicker">
                      {eventTypeDetails[selectedEvent.event_type].label} ·{" "}
                      {formatDate(selectedEvent.starts_at)}
                    </p>

                    <h3 className="calendar-detail-title">
                      {selectedEvent.title}
                    </h3>

                    <p className="calendar-detail-meta">
                      <span>{getEventTimeLabel(selectedEvent)}</span>

                      {getEventLocation(selectedEvent) ? (
                        <>
                          <span className="calendar-detail-separator">•</span>
                          <span>{getEventLocation(selectedEvent)}</span>
                        </>
                      ) : null}

                      <span className="calendar-detail-separator">•</span>

                      <span>
                        {selectedEvent.required
                          ? "Teilnahme erforderlich"
                          : "Optional"}
                      </span>
                    </p>

                    <p className="calendar-detail-description">
                      {selectedEvent.description ||
                        "Für diesen Termin wurden noch keine weiteren Details hinterlegt."}
                    </p>

                    {renderAttendanceCard(selectedEvent)}
                  </>
                ) : selectedDateKey && selectedDayEvents.length > 0 ? (
                  <>
                    <p className="calendar-detail-kicker">
                      Termine am {selectedDateKey}
                    </p>

                    <h3 className="calendar-detail-title">
                      {selectedDayEvents.length} Termine
                    </h3>

                    <div className="calendar-detail-day-list">
                      {selectedDayEvents.map((event) => (
                        <button
                          className="calendar-detail-day-button"
                          key={event.id}
                          type="button"
                          onClick={() => handleEventClick(event)}
                        >
                          <span className="calendar-detail-day-button-type">
                            {eventTypeDetails[event.event_type].label}
                          </span>

                          <span className="calendar-detail-day-button-title">
                            {event.title}
                          </span>

                          <span>{getEventTimeLabel(event)}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="calendar-detail-kicker">Tagesansicht</p>

                    <h3 className="calendar-detail-title">
                      Kein Termin ausgewählt.
                    </h3>

                    <p className="calendar-detail-empty">
                      Klicke auf einen Tag oder auf einen Eintrag im Kalender,
                      um die geplante Einheit, das Spiel oder den Teamtermin
                      groß anzuzeigen.
                    </p>
                  </>
                )}
              </section>
            </>
          )}
        </div>
      </section>

      <section className="fines-section">
        <div className="player-container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Teamregeln</p>
              <h2 className="section-title">Strafenkatalog.</h2>
            </div>

            <p className="section-note">
              Verlässlichkeit, rechtzeitige Kommunikation und Einsatz für das
              Team zählen.
            </p>
          </div>

          <div className="fines-table-wrap">
            <table className="fines-table">
              <thead>
                <tr>
                  <th className="fines-number-heading">Nr.</th>
                  <th>Verstoß</th>
                  <th className="fines-amount-heading">Strafe</th>
                </tr>
              </thead>

              <tbody>
                {fineItems.map((item, index) => (
                  <tr key={item.rule}>
                    <td className="fines-number-cell">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="fines-rule-cell">
                      <span className="fines-rule-name">{item.rule}</span>
                      <span className="fines-rule-note">{item.note}</span>
                    </td>

                    <td className="fines-amount-cell">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="fines-footer-note">
            Alle Beträge beziehen sich auf die geltenden Teamregeln des FC
            Mello Wien.
          </p>
        </div>
      </section>
    </main>
  );
}