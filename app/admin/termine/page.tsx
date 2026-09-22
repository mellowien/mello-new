"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
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

type VenueType = "home" | "away";

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

type EventAttendance = {
  id: string;
  event_id: string;
  player_id: string;
  response_status: AttendanceStatus;
  absence_reason: string | null;
  player_note: string | null;
  responded_at: string | null;
  response_is_late: boolean;
  player_name: string;
};

const weekdayLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const eventTypeDetails: Record<
  EventType,
  {
    label: string;
    className: string;
  }
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

function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const mondayBasedOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();
  const totalCells = Math.ceil((mondayBasedOffset + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - mondayBasedOffset + 1;

    if (dayNumber < 1 || dayNumber > daysInMonth) {
      return null;
    }

    return new Date(year, month, dayNumber);
  });
}

function getDateInputValue(dateValue: string) {
  const date = new Date(dateValue);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTimeInputValue(dateValue: string) {
  const date = new Date(dateValue);

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${hour}:${minute}`;
}

function buildLocalDateTime(date: string, time: string) {
  const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const timeMatch = time.match(/^(\d{2}):(\d{2})$/);

  if (!dateMatch || !timeMatch) {
    return null;
  }

  const [, yearString, monthString, dayString] = dateMatch;
  const [, hourString, minuteString] = timeMatch;

  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const hour = Number(hourString);
  const minute = Number(minuteString);

  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);

  if (
    Number.isNaN(localDate.getTime()) ||
    localDate.getFullYear() !== year ||
    localDate.getMonth() !== month - 1 ||
    localDate.getDate() !== day ||
    localDate.getHours() !== hour ||
    localDate.getMinutes() !== minute
  ) {
    return null;
  }

  return localDate.toISOString();
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
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("de-AT", {
    month: "long",
    year: "numeric",
  }).format(date);
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

function getEventDateKey(event: TeamEvent) {
  return getDateKey(new Date(event.starts_at));
}

function getEventLocation(event: TeamEvent) {
  if (event.location_name) {
    return event.location_name;
  }

  if (event.address) {
    return event.address;
  }

  if (event.event_type === "individual_run") {
    return "Nach dem Lauf in Strava posten.";
  }

  return "";
}

function getEventTimeLabel(event: TeamEvent) {
  return event.all_day ? "Ganztägig" : `${formatTime(event.starts_at)} Uhr`;
}

function isAttendanceEvent(event: TeamEvent) {
  return (
    event.event_type === "training" ||
    event.event_type === "match" ||
    event.event_type === "group_run" ||
    event.event_type === "individual_run"
  );
}

function getPlayerName(attendance: EventAttendance) {
  return attendance.player_name || "Unbekannter Spieler";
}

function getAttendanceNote(attendance: EventAttendance) {
  return (
    attendance.player_note?.trim() ||
    attendance.absence_reason?.trim() ||
    ""
  );
}

function getMatchDetails(event: TeamEvent) {
  const title = event.title ?? "";
  const homePrefix = "FC Mello Wien vs. ";
  const awaySuffix = " vs. FC Mello Wien";

  if (title.startsWith(homePrefix)) {
    return {
      venueType: "home" as VenueType,
      opponent: title.slice(homePrefix.length).trim(),
    };
  }

  if (title.endsWith(awaySuffix)) {
    return {
      venueType: "away" as VenueType,
      opponent: title.slice(0, -awaySuffix.length).trim(),
    };
  }

  return {
    venueType: "home" as VenueType,
    opponent: title,
  };
}

function getMatchMeetingTime(event: TeamEvent) {
  const description = event.description ?? "";
  const match = description.match(/Treffzeit:\s*(\d{1,2}:\d{2})\s*Uhr/i);

  return match ? match[1].padStart(5, "0") : "";
}

function removeMatchMetaFromDescription(description: string | null) {
  if (!description) {
    return "";
  }

  return description
    .split("\n")
    .filter((line) => {
      const normalizedLine = line.trim();

      return (
        normalizedLine !== "Heimspiel" &&
        normalizedLine !== "Auswärtsspiel" &&
        !/^Treffzeit:\s*\d{1,2}:\d{2}\s*Uhr$/i.test(normalizedLine) &&
        !/^Anpfiff:\s*\d{1,2}:\d{2}\s*Uhr$/i.test(normalizedLine)
      );
    })
    .join("\n")
    .trim();
}

export default function AdminTerminePage() {
  const router = useRouter();

  const [events, setEvents] = useState<TeamEvent[]>([]);
  const [attendances, setAttendances] = useState<EventAttendance[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<TeamEvent | null>(null);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [eventsError, setEventsError] = useState("");
  const [attendanceError, setAttendanceError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [required, setRequired] = useState(true);
  const [responseDeadlineDate, setResponseDeadlineDate] = useState("");
  const [responseDeadlineTime, setResponseDeadlineTime] = useState("");

  const [venueType, setVenueType] = useState<VenueType>("home");
  const [opponent, setOpponent] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  const today = useMemo(() => getStartOfDay(new Date()), []);
  const currentMonth = useMemo(() => getMonthStart(today), [today]);
  const nextMonth = useMemo(
    () => addMonths(currentMonth, 1),
    [currentMonth],
  );

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

  const attendanceGroups = useMemo(() => {
    return {
      attending: attendances.filter(
        (attendance) => attendance.response_status === "attending",
      ),
      absent: attendances.filter(
        (attendance) => attendance.response_status === "absent",
      ),
      injured: attendances.filter(
        (attendance) => attendance.response_status === "injured",
      ),
      open: attendances.filter(
        (attendance) =>
          attendance.response_status === "open" ||
          attendance.response_status === "submitted",
      ),
    };
  }, [attendances]);

  const isMatch = selectedEvent?.event_type === "match";

  const hasEndTime =
    selectedEvent?.event_type === "training" ||
    selectedEvent?.event_type === "group_run";

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
        router.replace("/login?next=/admin/termine");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!isMounted) {
        return;
      }

      if (error || !profile || profile.role !== "admin") {
        router.replace("/spielerbereich");
        return;
      }

      setIsCheckingSession(false);
    }

    checkAdminSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      const calendarStart = getMonthStart(currentMonth);
      const calendarEnd = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth() + 1,
        1,
      );

      setIsLoadingEvents(true);
      setEventsError("");

      const { data, error } = await supabase
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

      if (error) {
        setEventsError(
          "Die Termine konnten nicht geladen werden. Bitte versuche es später erneut.",
        );
        setIsLoadingEvents(false);
        return;
      }

      setEvents((data ?? []) as TeamEvent[]);
      setIsLoadingEvents(false);
    }

    if (!isCheckingSession) {
      loadEvents();
    }

    return () => {
      isMounted = false;
    };
  }, [currentMonth, isCheckingSession, nextMonth]);

  useEffect(() => {
    if (selectedEvent || events.length === 0) {
      return;
    }

    const firstUpcomingEvent =
      events.find(
        (event) => new Date(event.starts_at).getTime() >= today.getTime(),
      ) ?? events[0];

    selectEvent(firstUpcomingEvent);
  }, [events, selectedEvent, today]);

  async function loadAttendanceForEvent(eventId: string) {
  setIsLoadingAttendance(true);
  setAttendanceError("");
  setAttendances([]);

  const { data, error } = await supabase
    .from("admin_event_attendance_overview")
    .select(
      "id, event_id, player_id, response_status, absence_reason, player_note, responded_at, response_is_late, player_name",
    )
    .eq("event_id", eventId)
    .order("response_status", { ascending: true })
    .order("player_name", { ascending: true });

  if (error) {
    setAttendanceError(
      `Teilnahmeübersicht konnte nicht geladen werden: ${error.message}`,
    );
    setIsLoadingAttendance(false);
    return;
  }

  setAttendances((data ?? []) as unknown as EventAttendance[]);
  setIsLoadingAttendance(false);
}

  function selectEvent(event: TeamEvent) {
    setSelectedEvent(event);
    setSelectedDateKey(getEventDateKey(event));
    setFormError("");
    setSuccessMessage("");

    setTitle(event.title);
    setEventDate(getDateInputValue(event.starts_at));
    setStartTime(getTimeInputValue(event.starts_at));
    setEndTime(event.ends_at ? getTimeInputValue(event.ends_at) : "");
    setLocationName(event.location_name ?? "");
    setAddress(event.address ?? "");
    setRequired(event.required);

    if (event.response_deadline) {
      setResponseDeadlineDate(getDateInputValue(event.response_deadline));
      setResponseDeadlineTime(getTimeInputValue(event.response_deadline));
    } else {
      setResponseDeadlineDate("");
      setResponseDeadlineTime("");
    }

    if (event.event_type === "match") {
      const matchDetails = getMatchDetails(event);

      setVenueType(matchDetails.venueType);
      setOpponent(matchDetails.opponent);
      setMeetingTime(getMatchMeetingTime(event));
      setDescription(removeMatchMetaFromDescription(event.description));
    } else {
      setVenueType("home");
      setOpponent("");
      setMeetingTime("");
      setDescription(event.description ?? "");
    }

    if (isAttendanceEvent(event)) {
      loadAttendanceForEvent(event.id);
    } else {
      setAttendances([]);
      setAttendanceError("");
      setIsLoadingAttendance(false);
    }
  }

  function handleDayClick(dateKey: string, dayEvents: TeamEvent[]) {
    setSelectedDateKey(dateKey);
    setFormError("");
    setSuccessMessage("");

    if (dayEvents.length > 0) {
      selectEvent(dayEvents[0]);
    }
  }

  function clearSelection() {
    setSelectedEvent(null);
    setSelectedDateKey(null);
    setAttendances([]);
    setAttendanceError("");
    setFormError("");
    setSuccessMessage("");
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedEvent) {
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedLocationName = locationName.trim();
    const trimmedAddress = address.trim();
    const trimmedDescription = description.trim();
    const trimmedOpponent = opponent.trim();

    setFormError("");
    setSuccessMessage("");

    if (!eventDate || !startTime) {
      setFormError("Bitte gib Datum und Startzeit an.");
      return;
    }

    if (!trimmedLocationName) {
      setFormError("Bitte gib einen Ort an.");
      return;
    }

    if (isMatch && !trimmedOpponent) {
      setFormError("Bitte gib den Gegner ein.");
      return;
    }

    if (!isMatch && !trimmedTitle) {
      setFormError("Bitte gib einen Titel ein.");
      return;
    }

    const startsAt = buildLocalDateTime(eventDate, startTime);

    if (!startsAt) {
      setFormError("Datum oder Startzeit ist ungültig.");
      return;
    }

    let endsAt: string | null = null;

    if (hasEndTime && endTime) {
      const calculatedEnd = buildLocalDateTime(eventDate, endTime);

      if (!calculatedEnd) {
        setFormError("Die Endzeit ist ungültig.");
        return;
      }

      if (new Date(calculatedEnd).getTime() <= new Date(startsAt).getTime()) {
        setFormError("Die Endzeit muss nach der Startzeit liegen.");
        return;
      }

      endsAt = calculatedEnd;
    }

    let responseDeadline: string | null = null;

    if (isMatch) {
      const deadlineBase = new Date(
        Number(eventDate.slice(0, 4)),
        Number(eventDate.slice(5, 7)) - 1,
        Number(eventDate.slice(8, 10)),
        20,
        0,
        0,
        0,
      );

      deadlineBase.setDate(deadlineBase.getDate() - 1);
      responseDeadline = deadlineBase.toISOString();
    } else if (responseDeadlineDate || responseDeadlineTime) {
      if (!responseDeadlineDate || !responseDeadlineTime) {
        setFormError(
          "Bitte gib bei einer Rückmeldefrist Datum und Uhrzeit vollständig an.",
        );
        return;
      }

      const calculatedDeadline = buildLocalDateTime(
        responseDeadlineDate,
        responseDeadlineTime,
      );

      if (!calculatedDeadline) {
        setFormError("Die Rückmeldefrist ist ungültig.");
        return;
      }

      if (
        new Date(calculatedDeadline).getTime() >= new Date(startsAt).getTime()
      ) {
        setFormError(
          "Die Rückmeldefrist muss vor dem Terminbeginn liegen.",
        );
        return;
      }

      responseDeadline = calculatedDeadline;
    }

    let nextTitle = trimmedTitle;
    let nextDescription = trimmedDescription;

    if (isMatch) {
      nextTitle =
        venueType === "home"
          ? `FC Mello Wien vs. ${trimmedOpponent}`
          : `${trimmedOpponent} vs. FC Mello Wien`;

      const matchDescriptionParts = [
        venueType === "home" ? "Heimspiel" : "Auswärtsspiel",
        meetingTime ? `Treffzeit: ${meetingTime} Uhr` : null,
        `Anpfiff: ${startTime} Uhr`,
        trimmedDescription || null,
      ].filter(Boolean);

      nextDescription = matchDescriptionParts.join("\n\n");
    }

    setIsSaving(true);

    const { data, error } = await supabase
      .from("events")
      .update({
        title: nextTitle,
        starts_at: startsAt,
        ends_at: endsAt,
        location_name: trimmedLocationName,
        address: trimmedAddress || null,
        description: nextDescription || null,
        required,
        response_deadline: responseDeadline,
      })
      .eq("id", selectedEvent.id)
      .select(
        "id, title, event_type, starts_at, ends_at, location_name, address, description, required, response_deadline, all_day",
      )
      .single();

    if (error || !data) {
      setFormError(
        error?.message ||
          "Der Termin konnte nicht gespeichert werden. Bitte versuche es erneut.",
      );
      setIsSaving(false);
      return;
    }

    const updatedEvent = data as TeamEvent;

    setEvents((currentEvents) =>
      currentEvents.map((currentEvent) =>
        currentEvent.id === updatedEvent.id ? updatedEvent : currentEvent,
      ),
    );

    selectEvent(updatedEvent);
    setSuccessMessage("Die Änderungen wurden gespeichert.");
    setIsSaving(false);
  }

  async function handleDelete() {
    if (!selectedEvent) {
      return;
    }

    const confirmed = window.confirm(
      `Termin wirklich löschen?\n\n${selectedEvent.title}\n\nAuch alle zugehörigen Teilnahme-Rückmeldungen werden entfernt. Dieser Schritt kann nicht rückgängig gemacht werden.`,
    );

    if (!confirmed) {
      return;
    }

    setFormError("");
    setSuccessMessage("");
    setIsDeleting(true);

    const deletedEventId = selectedEvent.id;

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", deletedEventId);

    if (error) {
      setFormError(
        error.message ||
          "Der Termin konnte nicht gelöscht werden. Bitte versuche es erneut.",
      );
      setIsDeleting(false);
      return;
    }

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== deletedEventId),
    );

    setSelectedEvent(null);
    setSelectedDateKey(null);
    setAttendances([]);
    setSuccessMessage("Der Termin wurde gelöscht.");
    setIsDeleting(false);
  }

  function renderCalendarMonth(month: Date, days: Array<Date | null>) {
    return (
      <section className="admin-calendar-month" key={getDateKey(month)}>
        <h3 className="admin-calendar-month-title">{formatMonth(month)}</h3>

        <div className="admin-calendar-weekdays">
          {weekdayLabels.map((weekday) => (
            <span key={weekday}>{weekday}</span>
          ))}
        </div>

        <div className="admin-calendar-grid">
          {days.map((day, index) => {
            if (!day) {
              return (
                <div
                  className="admin-calendar-day admin-calendar-day-empty"
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
                className={`admin-calendar-day ${
                  isToday ? "admin-calendar-day-today" : ""
                } ${isSelectedDay ? "admin-calendar-day-selected" : ""}`}
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
                <span className="admin-calendar-day-number">
                  {day.getDate()}
                </span>

                <div className="admin-calendar-events">
                  {dayEvents.slice(0, 3).map((event) => {
                    const eventDetails = eventTypeDetails[event.event_type];
                    const isSelectedEvent = selectedEvent?.id === event.id;

                    return (
                      <button
                        className={`admin-calendar-event ${
                          eventDetails.className
                        } ${
                          isSelectedEvent
                            ? "admin-calendar-event-selected"
                            : ""
                        }`}
                        key={event.id}
                        onClick={(clickEvent) => {
                          clickEvent.stopPropagation();
                          selectEvent(event);
                        }}
                        type="button"
                      >
                        {!event.all_day ? (
                          <span className="admin-calendar-event-time">
                            {formatTime(event.starts_at)}
                          </span>
                        ) : null}

                        <span className="admin-calendar-event-title">
                          {event.title}
                        </span>
                      </button>
                    );
                  })}

                  {dayEvents.length > 3 ? (
                    <span className="admin-calendar-more">
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

  function renderAttendanceOverview() {
    if (!selectedEvent || !isAttendanceEvent(selectedEvent)) {
      return null;
    }

    const groups = [
      {
        key: "attending" as const,
        title: "Kommt",
        items: attendanceGroups.attending,
      },
      {
        key: "absent" as const,
        title: "Kommt nicht",
        items: attendanceGroups.absent,
      },
      {
        key: "injured" as const,
        title: "Verletzt",
        items: attendanceGroups.injured,
      },
      {
        key: "open" as const,
        title: "Noch offen",
        items: attendanceGroups.open,
      },
    ];

    return (
      <section className="admin-attendance">
        <div className="admin-attendance-heading">
          <div>
            <p className="admin-attendance-kicker">Teilnahmeübersicht</p>

            <h3 className="admin-attendance-title">Wer ist dabei?</h3>
          </div>

          <p className="admin-attendance-total">
            {attendances.length} Spieler
          </p>
        </div>

        {isLoadingAttendance ? (
          <p className="admin-attendance-loading">
            Rückmeldungen werden geladen …
          </p>
        ) : null}

        {attendanceError ? (
          <p className="admin-attendance-error">{attendanceError}</p>
        ) : null}

        {!isLoadingAttendance && !attendanceError ? (
          <>
            <div className="admin-attendance-summary">
              {groups.map((group) => (
                <div
                  className={`admin-attendance-stat attendance-${group.key}`}
                  key={group.key}
                >
                  <span className="admin-attendance-stat-number">
                    {group.items.length}
                  </span>

                  <span className="admin-attendance-stat-label">
                    {group.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="admin-attendance-groups">
              {groups.map((group) => (
                <section
                  className={`admin-attendance-group attendance-${group.key}`}
                  key={group.key}
                >
                  <div className="admin-attendance-group-heading">
                    <h4>{group.title}</h4>
                    <span>{group.items.length}</span>
                  </div>

                  {group.items.length === 0 ? (
                    <p className="admin-attendance-empty">
                      Derzeit niemand.
                    </p>
                  ) : (
                    <ul className="admin-attendance-list">
                      {group.items.map((attendance) => {
                        const note = getAttendanceNote(attendance);

                        return (
                          <li key={attendance.id}>
                            <div>
                              <p className="admin-attendance-player-name">
                                {getPlayerName(attendance)}
                              </p>

                              {note ? (
                                <p className="admin-attendance-player-note">
                                  {note}
                                </p>
                              ) : null}
                            </div>

                            {attendance.response_is_late ? (
                              <span className="admin-attendance-late">
                                verspätet
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </>
        ) : null}
      </section>
    );
  }

  if (isCheckingSession) {
    return (
      <main className="admin-calendar-page admin-calendar-loading">
        <p>Administration wird geladen …</p>
      </main>
    );
  }

  return (
    <main className="admin-calendar-page">
      <style>{`
        .admin-calendar-page {
          --black: #080808;
          --white: #f7f7f4;
          --teal: #0d9488;
          --yellow: #f59e0b;
          --pink: #f472b6;
          --blue: #38bdf8;
          --purple: #a78bfa;
          --line: #292929;
          --muted: rgba(247, 247, 244, .58);

          background:
            radial-gradient(
              ellipse 52% 55% at 94% 5%,
              rgba(13, 148, 136, .14) 0%,
              transparent 72%
            ),
            var(--black);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          min-height: 100vh;
          padding: 7rem 0 5rem;
        }

        .admin-calendar-page *,
        .admin-calendar-page *::before,
        .admin-calendar-page *::after {
          box-sizing: border-box;
        }

        .admin-calendar-loading {
          align-items: center;
          display: flex;
          justify-content: center;
        }

        .admin-calendar-loading p {
          color: var(--teal);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .admin-calendar-container {
          margin: 0 auto;
          width: min(100% - 4rem, 1440px);
        }

        .admin-calendar-back {
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

        .admin-calendar-back:hover {
          color: var(--white);
        }

        .admin-calendar-header {
          align-items: end;
          border-bottom: 1px solid var(--line);
          display: flex;
          gap: 2rem;
          justify-content: space-between;
          margin: 1.6rem 0 2rem;
          padding-bottom: 2rem;
        }

        .admin-calendar-kicker {
          color: var(--teal);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .16em;
          margin: 0 0 .8rem;
          text-transform: uppercase;
        }

        .admin-calendar-title {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.7rem, 5vw, 5rem);
          font-weight: 900;
          letter-spacing: -.07em;
          line-height: .86;
          margin: 0;
          text-transform: uppercase;
        }

        .admin-calendar-title span {
          color: transparent;
          display: block;
          -webkit-text-stroke: 1.3px var(--teal);
        }

        .admin-calendar-intro {
          color: var(--muted);
          font-size: .88rem;
          line-height: 1.6;
          margin: 0;
          max-width: 37ch;
          text-align: right;
        }

        .admin-calendar-legend {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: .55rem 1.1rem;
          margin: 0 0 1.6rem;
        }

        .admin-calendar-legend-item {
          align-items: center;
          color: rgba(247, 247, 244, .58);
          display: inline-flex;
          font-size: .66rem;
          font-weight: 900;
          gap: .45rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .admin-calendar-legend-dot {
          border-radius: 999px;
          height: 8px;
          width: 8px;
        }

        .admin-calendar-months {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .admin-calendar-month {
          border: 1px solid rgba(247, 247, 244, .14);
          overflow: hidden;
        }

        .admin-calendar-month-title {
          border-bottom: 1px solid rgba(247, 247, 244, .14);
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: -.025em;
          margin: 0;
          padding: 1.15rem 1.25rem;
          text-transform: uppercase;
        }

        .admin-calendar-weekdays,
        .admin-calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
        }

        .admin-calendar-weekdays {
          border-bottom: 1px solid rgba(247, 247, 244, .1);
        }

        .admin-calendar-weekdays span {
          color: rgba(247, 247, 244, .38);
          font-size: .58rem;
          font-weight: 800;
          letter-spacing: .07em;
          padding: .75rem .45rem;
          text-align: right;
          text-transform: uppercase;
        }

        .admin-calendar-day {
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

        .admin-calendar-day:nth-child(7n) {
          border-right: 0;
        }

        .admin-calendar-day:hover,
        .admin-calendar-day:focus-visible {
          background: rgba(247, 247, 244, .035);
          outline: none;
        }

        .admin-calendar-day-empty {
          background: rgba(247, 247, 244, .012);
          cursor: default;
        }

        .admin-calendar-day-number {
          color: rgba(247, 247, 244, .5);
          display: block;
          font-size: .66rem;
          font-weight: 800;
          margin-bottom: .45rem;
          text-align: right;
        }

        .admin-calendar-day-today {
          background: rgba(13, 148, 136, .07);
          box-shadow: inset 0 0 0 1px rgba(13, 148, 136, .55);
        }

        .admin-calendar-day-today .admin-calendar-day-number {
          color: var(--teal);
        }

        .admin-calendar-day-selected {
          background: rgba(247, 247, 244, .065);
          box-shadow: inset 0 0 0 1px rgba(247, 247, 244, .28);
        }

        .admin-calendar-events {
          display: grid;
          gap: .28rem;
        }

        .admin-calendar-event {
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

        .admin-calendar-event:hover,
        .admin-calendar-event-selected {
          filter: brightness(1.3);
          transform: translateX(2px);
        }

        .admin-calendar-event-time {
          font-weight: 900;
          margin-right: .22rem;
        }

        .admin-calendar-event-title {
          color: rgba(247, 247, 244, .9);
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

        .admin-calendar-more {
          color: rgba(247, 247, 244, .48);
          font-size: .57rem;
          font-weight: 800;
          letter-spacing: .03em;
        }

        .admin-calendar-loading-text,
        .admin-calendar-error {
          border: 1px solid rgba(247, 247, 244, .14);
          color: var(--muted);
          font-size: .95rem;
          line-height: 1.6;
          margin: 0;
          padding: 1.25rem;
        }

        .admin-calendar-error {
          color: #fca5a5;
        }

        .admin-attendance {
          background:
            radial-gradient(
              ellipse 58% 150% at 100% 50%,
              rgba(13, 148, 136, .1) 0%,
              transparent 68%
            ),
            rgba(247, 247, 244, .018);
          border: 1px solid rgba(13, 148, 136, .34);
          margin-top: 2rem;
          padding: 1.7rem;
        }

        .admin-attendance-heading {
          align-items: flex-start;
          border-bottom: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          margin-bottom: 1.3rem;
          padding-bottom: 1rem;
        }

        .admin-attendance-kicker {
          color: var(--teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .14em;
          margin: 0 0 .55rem;
          text-transform: uppercase;
        }

        .admin-attendance-title {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.9rem, 3vw, 3.1rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .9;
          margin: 0;
          text-transform: uppercase;
        }

        .admin-attendance-total {
          color: rgba(247, 247, 244, .52);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .08em;
          margin: .2rem 0 0;
          text-transform: uppercase;
        }

        .admin-attendance-summary {
          display: grid;
          gap: .8rem;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          margin-bottom: 1.25rem;
        }

        .admin-attendance-stat {
          background: rgba(0, 0, 0, .24);
          border: 1px solid rgba(247, 247, 244, .13);
          display: grid;
          gap: .25rem;
          min-height: 90px;
          padding: .9rem;
        }

        .admin-attendance-stat-number {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -.06em;
          line-height: .9;
        }

        .admin-attendance-stat-label {
          color: rgba(247, 247, 244, .58);
          font-size: .63rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .admin-attendance-groups {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .admin-attendance-group {
          background: rgba(0, 0, 0, .2);
          border: 1px solid rgba(247, 247, 244, .13);
          overflow: hidden;
        }

        .admin-attendance-group-heading {
          align-items: center;
          border-bottom: 1px solid rgba(247, 247, 244, .1);
          display: flex;
          justify-content: space-between;
          padding: .85rem 1rem;
        }

        .admin-attendance-group-heading h4 {
          color: var(--white);
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .08em;
          margin: 0;
          text-transform: uppercase;
        }

        .admin-attendance-group-heading span {
          border-radius: 999px;
          color: var(--white);
          font-size: .7rem;
          font-weight: 900;
          min-width: 25px;
          padding: .22rem .45rem;
          text-align: center;
        }

        .admin-attendance-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .admin-attendance-list li {
          align-items: flex-start;
          border-bottom: 1px solid rgba(247, 247, 244, .08);
          display: flex;
          gap: .8rem;
          justify-content: space-between;
          padding: .82rem 1rem;
        }

        .admin-attendance-list li:last-child {
          border-bottom: 0;
        }

        .admin-attendance-player-name {
          color: var(--white);
          font-size: .86rem;
          font-weight: 800;
          line-height: 1.35;
          margin: 0;
        }

        .admin-attendance-player-note {
          color: rgba(247, 247, 244, .5);
          font-size: .72rem;
          line-height: 1.45;
          margin: .25rem 0 0;
        }

        .admin-attendance-empty,
        .admin-attendance-loading,
        .admin-attendance-error {
          color: rgba(247, 247, 244, .48);
          font-size: .8rem;
          line-height: 1.5;
          margin: 0;
          padding: 1rem;
        }

        .admin-attendance-error {
          color: #fca5a5;
        }

        .admin-attendance-late {
          border: 1px solid rgba(245, 158, 11, .45);
          color: #fcd34d;
          font-size: .57rem;
          font-weight: 900;
          letter-spacing: .06em;
          padding: .25rem .4rem;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .attendance-attending {
          border-color: rgba(13, 148, 136, .45);
        }

        .attendance-attending .admin-attendance-group-heading h4,
        .attendance-attending .admin-attendance-stat-number {
          color: #5eead4;
        }

        .attendance-attending .admin-attendance-group-heading span {
          background: rgba(13, 148, 136, .22);
          color: #5eead4;
        }

        .attendance-absent {
          border-color: rgba(245, 158, 11, .44);
        }

        .attendance-absent .admin-attendance-group-heading h4,
        .attendance-absent .admin-attendance-stat-number {
          color: #fcd34d;
        }

        .attendance-absent .admin-attendance-group-heading span {
          background: rgba(245, 158, 11, .18);
          color: #fcd34d;
        }

        .attendance-injured {
          border-color: rgba(244, 114, 182, .45);
        }

        .attendance-injured .admin-attendance-group-heading h4,
        .attendance-injured .admin-attendance-stat-number {
          color: #f9a8d4;
        }

        .attendance-injured .admin-attendance-group-heading span {
          background: rgba(244, 114, 182, .17);
          color: #f9a8d4;
        }

        .attendance-open {
          border-color: rgba(247, 247, 244, .22);
        }

        .attendance-open .admin-attendance-group-heading h4,
        .attendance-open .admin-attendance-stat-number {
          color: rgba(247, 247, 244, .75);
        }

        .attendance-open .admin-attendance-group-heading span {
          background: rgba(247, 247, 244, .1);
          color: rgba(247, 247, 244, .8);
        }

        .admin-editor {
          background:
            radial-gradient(
              ellipse 58% 130% at 100% 50%,
              rgba(13, 148, 136, .1) 0%,
              transparent 68%
            ),
            rgba(247, 247, 244, .018);
          border: 1px solid rgba(247, 247, 244, .14);
          margin-top: 2rem;
          min-height: 250px;
          padding: 1.7rem;
        }

        .admin-editor-empty {
          align-items: center;
          color: var(--muted);
          display: flex;
          font-size: .96rem;
          justify-content: center;
          min-height: 210px;
          text-align: center;
        }

        .admin-editor-head {
          align-items: start;
          border-bottom: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          margin-bottom: 1.35rem;
          padding-bottom: 1.1rem;
        }

        .admin-editor-kicker {
          color: var(--teal);
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .14em;
          margin: 0 0 .6rem;
          text-transform: uppercase;
        }

        .admin-editor-title {
          color: var(--white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.9rem, 3vw, 3.1rem);
          font-weight: 900;
          letter-spacing: -.055em;
          line-height: .9;
          margin: 0;
          text-transform: uppercase;
        }

        .admin-editor-meta {
          color: rgba(247, 247, 244, .55);
          font-size: .78rem;
          font-weight: 700;
          line-height: 1.55;
          margin: .9rem 0 0;
        }

        .admin-editor-close {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .22);
          color: var(--white);
          cursor: pointer;
          font-family: inherit;
          font-size: .66rem;
          font-weight: 900;
          letter-spacing: .08em;
          padding: .6rem .75rem;
          text-transform: uppercase;
        }

        .admin-editor-close:hover {
          border-color: var(--white);
        }

        .admin-editor-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .admin-editor-field {
          display: grid;
          gap: .48rem;
        }

        .admin-editor-field-wide {
          grid-column: 1 / -1;
        }

        .admin-editor-label {
          color: rgba(247, 247, 244, .73);
          font-size: .7rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .admin-editor-label span {
          color: rgba(247, 247, 244, .38);
          font-weight: 700;
          letter-spacing: 0;
          text-transform: none;
        }

        .admin-editor-input,
        .admin-editor-select,
        .admin-editor-textarea {
          background: rgba(0, 0, 0, .3);
          border: 1px solid rgba(247, 247, 244, .18);
          color: var(--white);
          font-family: inherit;
          font-size: .92rem;
          padding: .8rem .85rem;
          width: 100%;
        }

        .admin-editor-input:focus,
        .admin-editor-select:focus,
        .admin-editor-textarea:focus {
          border-color: var(--teal);
          outline: none;
        }

        .admin-editor-select option {
          background: #111;
          color: #fff;
        }

        .admin-editor-textarea {
          line-height: 1.55;
          min-height: 125px;
          resize: vertical;
        }

        .admin-editor-required {
          align-items: center;
          display: flex;
          gap: .7rem;
          padding-top: .4rem;
        }

        .admin-editor-required input {
          accent-color: var(--teal);
          height: 17px;
          width: 17px;
        }

        .admin-editor-required label {
          color: rgba(247, 247, 244, .72);
          font-size: .83rem;
          font-weight: 800;
        }

        .admin-editor-match-note {
          background: rgba(245, 158, 11, .08);
          border-left: 3px solid var(--yellow);
          color: #fde68a;
          font-size: .8rem;
          line-height: 1.55;
          margin: 1.25rem 0 0;
          padding: .85rem .95rem;
        }

        .admin-editor-error,
        .admin-editor-success {
          font-size: .84rem;
          line-height: 1.5;
          margin: 1rem 0 0;
          padding: .85rem .95rem;
        }

        .admin-editor-error {
          background: rgba(248, 113, 113, .08);
          border: 1px solid rgba(248, 113, 113, .45);
          color: #fca5a5;
        }

        .admin-editor-success {
          background: rgba(13, 148, 136, .08);
          border: 1px solid rgba(13, 148, 136, .4);
          color: #5eead4;
        }

        .admin-editor-actions {
          border-top: 1px solid rgba(247, 247, 244, .12);
          display: flex;
          flex-wrap: wrap;
          gap: .75rem;
          justify-content: space-between;
          margin-top: 1.4rem;
          padding-top: 1.25rem;
        }

        .admin-editor-actions-right {
          display: flex;
          flex-wrap: wrap;
          gap: .75rem;
        }

        .admin-editor-button {
          background: transparent;
          border: 1px solid rgba(247, 247, 244, .24);
          color: var(--white);
          cursor: pointer;
          font-family: inherit;
          font-size: .69rem;
          font-weight: 900;
          letter-spacing: .07em;
          min-height: 43px;
          padding: .7rem .9rem;
          text-transform: uppercase;
        }

        .admin-editor-button:hover:not(:disabled) {
          background: rgba(247, 247, 244, .08);
          border-color: var(--white);
        }

        .admin-editor-button-save {
          background: var(--teal);
          border-color: var(--teal);
          color: #001b18;
        }

        .admin-editor-button-save:hover:not(:disabled) {
          background: #14b8a6;
          border-color: #14b8a6;
        }

        .admin-editor-button-delete {
          border-color: rgba(248, 113, 113, .55);
          color: #fca5a5;
        }

        .admin-editor-button-delete:hover:not(:disabled) {
          background: rgba(248, 113, 113, .12);
          border-color: #f87171;
        }

        .admin-editor-button:disabled {
          cursor: not-allowed;
          opacity: .5;
        }

        @media (max-width: 900px) {
          .admin-calendar-months {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .admin-calendar-page {
            padding-top: 5.5rem;
          }

          .admin-calendar-container {
            width: min(100% - 2.25rem, 46rem);
          }

          .admin-calendar-header {
            align-items: start;
            display: block;
          }

          .admin-calendar-intro {
            margin-top: 1.25rem;
            text-align: left;
          }

          .admin-calendar-month-title {
            font-size: 1.15rem;
            padding: 1rem;
          }

          .admin-calendar-day {
            min-height: 86px;
            padding: .35rem;
          }

          .admin-calendar-weekdays span {
            font-size: .53rem;
            padding: .58rem .25rem;
          }

          .admin-calendar-event {
            border-left-width: 2px;
            font-size: .49rem;
            padding: .18rem .2rem;
          }

          .admin-calendar-event-time {
            display: none;
          }

          .admin-calendar-more {
            font-size: .5rem;
          }

          .admin-attendance {
            margin-top: 1.25rem;
            padding: 1.2rem;
          }

          .admin-attendance-summary {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .admin-attendance-groups {
            grid-template-columns: 1fr;
          }

          .admin-attendance-heading {
            display: block;
          }

          .admin-attendance-total {
            margin-top: .7rem;
          }

          .admin-editor {
            margin-top: 1.25rem;
            padding: 1.2rem;
          }

          .admin-editor-head {
            display: block;
          }

          .admin-editor-close {
            margin-top: 1rem;
            width: 100%;
          }

          .admin-editor-grid {
            grid-template-columns: 1fr;
          }

          .admin-editor-field-wide {
            grid-column: auto;
          }

          .admin-editor-actions,
          .admin-editor-actions-right {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
          }

          .admin-editor-button {
            width: 100%;
          }
        }

        @media (max-width: 360px) {
          .admin-calendar-container {
            width: min(100% - 2rem, 46rem);
          }

          .admin-calendar-day {
            min-height: 74px;
          }
        }
      `}</style>

      <div className="admin-calendar-container">
        <button
          className="admin-calendar-back"
          onClick={() => router.push("/admin")}
          type="button"
        >
          ← Zur Admin-Übersicht
        </button>

        <header className="admin-calendar-header">
          <div>
            <p className="admin-calendar-kicker">FC Mello Wien · Admin</p>

            <h1 className="admin-calendar-title">
              Kalender
              <span>verwalten.</span>
            </h1>
          </div>

          <p className="admin-calendar-intro">
            Klicke auf ein Training, einen Lauf oder ein Spiel. Du siehst
            sofort alle Zusagen, Absagen, Verletztenmeldungen und offenen
            Rückmeldungen.
          </p>
        </header>

        <div className="admin-calendar-legend">
          {Object.entries(eventTypeDetails).map(
            ([eventType, eventDetails]) => (
              <span className="admin-calendar-legend-item" key={eventType}>
                <span
                  className={`admin-calendar-legend-dot ${eventDetails.className}`}
                />
                {eventDetails.label}
              </span>
            ),
          )}
        </div>

        {isLoadingEvents ? (
          <p className="admin-calendar-loading-text">
            Kalender wird geladen …
          </p>
        ) : null}

        {eventsError ? (
          <p className="admin-calendar-error">{eventsError}</p>
        ) : null}

        {!isLoadingEvents && !eventsError ? (
          <div className="admin-calendar-months">
            {renderCalendarMonth(currentMonth, currentMonthDays)}
            {renderCalendarMonth(nextMonth, nextMonthDays)}
          </div>
        ) : null}

        {renderAttendanceOverview()}

        <section className="admin-editor">
          {!selectedEvent ? (
            <div className="admin-editor-empty">
              Klicke auf einen farbigen Termin im Kalender, um die
              Teilnehmerliste zu sehen sowie den Termin zu bearbeiten oder zu
              löschen.
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="admin-editor-head">
                <div>
                  <p className="admin-editor-kicker">
                    {eventTypeDetails[selectedEvent.event_type].label} ·{" "}
                    {formatDate(selectedEvent.starts_at)}
                  </p>

                  <h2 className="admin-editor-title">
                    {selectedEvent.title}
                  </h2>

                  <p className="admin-editor-meta">
                    {getEventTimeLabel(selectedEvent)}
                    {getEventLocation(selectedEvent)
                      ? ` · ${getEventLocation(selectedEvent)}`
                      : ""}
                    {selectedEvent.response_deadline
                      ? ` · Frist: ${formatDeadline(
                          selectedEvent.response_deadline,
                        )} Uhr`
                      : ""}
                  </p>
                </div>

                <button
                  className="admin-editor-close"
                  onClick={clearSelection}
                  type="button"
                >
                  Schließen
                </button>
              </div>

              <div className="admin-editor-grid">
                {isMatch ? (
                  <>
                    <label className="admin-editor-field">
                      <span className="admin-editor-label">Spielart</span>

                      <select
                        className="admin-editor-select"
                        onChange={(event) =>
                          setVenueType(event.target.value as VenueType)
                        }
                        value={venueType}
                      >
                        <option value="home">Heimspiel</option>
                        <option value="away">Auswärtsspiel</option>
                      </select>
                    </label>

                    <label className="admin-editor-field">
                      <span className="admin-editor-label">Gegner</span>

                      <input
                        className="admin-editor-input"
                        maxLength={120}
                        onChange={(event) => setOpponent(event.target.value)}
                        required
                        value={opponent}
                      />
                    </label>
                  </>
                ) : (
                  <label className="admin-editor-field admin-editor-field-wide">
                    <span className="admin-editor-label">Titel</span>

                    <input
                      className="admin-editor-input"
                      maxLength={120}
                      onChange={(event) => setTitle(event.target.value)}
                      required
                      value={title}
                    />
                  </label>
                )}

                <label className="admin-editor-field">
                  <span className="admin-editor-label">Datum</span>

                  <input
                    className="admin-editor-input"
                    onChange={(event) => setEventDate(event.target.value)}
                    required
                    type="date"
                    value={eventDate}
                  />
                </label>

                <label className="admin-editor-field">
                  <span className="admin-editor-label">
                    {isMatch ? "Anpfiff" : "Startzeit"}
                  </span>

                  <input
                    className="admin-editor-input"
                    onChange={(event) => setStartTime(event.target.value)}
                    required
                    type="time"
                    value={startTime}
                  />
                </label>

                {hasEndTime ? (
                  <label className="admin-editor-field">
                    <span className="admin-editor-label">
                      Endzeit <span>optional</span>
                    </span>

                    <input
                      className="admin-editor-input"
                      onChange={(event) => setEndTime(event.target.value)}
                      type="time"
                      value={endTime}
                    />
                  </label>
                ) : null}

                {isMatch ? (
                  <label className="admin-editor-field">
                    <span className="admin-editor-label">
                      Treffzeit <span>optional</span>
                    </span>

                    <input
                      className="admin-editor-input"
                      onChange={(event) => setMeetingTime(event.target.value)}
                      type="time"
                      value={meetingTime}
                    />
                  </label>
                ) : null}

                <label className="admin-editor-field admin-editor-field-wide">
                  <span className="admin-editor-label">Ort</span>

                  <input
                    className="admin-editor-input"
                    maxLength={160}
                    onChange={(event) => setLocationName(event.target.value)}
                    required
                    value={locationName}
                  />
                </label>

                <label className="admin-editor-field admin-editor-field-wide">
                  <span className="admin-editor-label">
                    Adresse <span>optional</span>
                  </span>

                  <input
                    className="admin-editor-input"
                    maxLength={220}
                    onChange={(event) => setAddress(event.target.value)}
                    value={address}
                  />
                </label>

                {!isMatch ? (
                  <>
                    <label className="admin-editor-field">
                      <span className="admin-editor-label">
                        Rückmeldefrist – Datum <span>optional</span>
                      </span>

                      <input
                        className="admin-editor-input"
                        onChange={(event) =>
                          setResponseDeadlineDate(event.target.value)
                        }
                        type="date"
                        value={responseDeadlineDate}
                      />
                    </label>

                    <label className="admin-editor-field">
                      <span className="admin-editor-label">
                        Rückmeldefrist – Uhrzeit <span>optional</span>
                      </span>

                      <input
                        className="admin-editor-input"
                        onChange={(event) =>
                          setResponseDeadlineTime(event.target.value)
                        }
                        type="time"
                        value={responseDeadlineTime}
                      />
                    </label>
                  </>
                ) : null}

                <label className="admin-editor-field admin-editor-field-wide">
                  <span className="admin-editor-label">
                    Hinweise / Beschreibung <span>optional</span>
                  </span>

                  <textarea
                    className="admin-editor-textarea"
                    maxLength={2000}
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                  />
                </label>

                <div className="admin-editor-field admin-editor-field-wide">
                  <div className="admin-editor-required">
                    <input
                      checked={required}
                      id="admin-event-required"
                      onChange={(event) => setRequired(event.target.checked)}
                      type="checkbox"
                    />

                    <label htmlFor="admin-event-required">
                      Teilnahme ist erforderlich
                    </label>
                  </div>
                </div>
              </div>

              {isMatch ? (
                <p className="admin-editor-match-note">
                  Für Spiele wird die Rückmeldefrist automatisch auf 20:00 Uhr
                  am Vortag gesetzt.
                </p>
              ) : null}

              {formError ? (
                <p className="admin-editor-error">{formError}</p>
              ) : null}

              {successMessage ? (
                <p className="admin-editor-success">{successMessage}</p>
              ) : null}

              <div className="admin-editor-actions">
                <button
                  className="admin-editor-button admin-editor-button-delete"
                  disabled={isSaving || isDeleting}
                  onClick={handleDelete}
                  type="button"
                >
                  {isDeleting ? "Wird gelöscht …" : "Termin löschen"}
                </button>

                <div className="admin-editor-actions-right">
                  <button
                    className="admin-editor-button"
                    disabled={isSaving || isDeleting}
                    onClick={() => selectEvent(selectedEvent)}
                    type="button"
                  >
                    Änderungen verwerfen
                  </button>

                  <button
                    className="admin-editor-button admin-editor-button-save"
                    disabled={isSaving || isDeleting}
                    type="submit"
                  >
                    {isSaving
                      ? "Wird gespeichert …"
                      : "Änderungen speichern"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}