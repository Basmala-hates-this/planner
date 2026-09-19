
import React, { useState } from "react";

const events = [
  {
    id: 1,
    title: "Web Engineering",
    date: "2026-09-21",
    start: "09:00",
    end: "11:00",
    place: "Room B12",
    type: "Fixed",
  },
  {
    id: 2,
    title: "Database Systems",
    date: "2026-09-23",
    start: "13:00",
    end: "15:00",
    place: "Lab 3",
    type: "Negotiable",
  },
  {
    id: 3,
    title: "Department Meeting",
    date: "2026-09-25",
    start: "16:00",
    end: "17:00",
    place: "Conference Room",
    type: "Fixed",
  },
  {
    id: 4,
    title: "Operating Systems",
    date: "2026-09-24",
    start: "10:00",
    end: "12:00",
    place: "Room A4",
    type: "Fixed",
  },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const hours = Array.from({ length: 10 }, (_, i) => i + 8);

function getWeekDates() {
  return [
    "2026-09-21",
    "2026-09-22",
    "2026-09-23",
    "2026-09-24",
    "2026-09-25",
    "2026-09-26",
    "2026-09-27",
  ];
}

function EventCard({ event, compact = false }) {
  const negotiable = event.type === "Negotiable";

  return (
    <button
      onClick={() => console.log("Open event:", event)}
      className={`w-full text-left rounded-lg transition
        ${
          negotiable
            ? "bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30"
            : "bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30"
        }
        ${compact ? "p-2" : "p-3"}
      `}
    >
      <p className="font-semibold text-sm truncate">
        {event.title}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        {event.start} – {event.end}
      </p>

      {!compact && (
        <>
          <p className="text-xs text-slate-500 mt-1">
            {event.place}
          </p>

          {negotiable && (
            <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-300">
              Negotiable
            </span>
          )}
        </>
      )}
    </button>
  );
}

/* ---------------- DAY VIEW ---------------- */

function DayView() {
  const selectedDate = "2026-09-21";

  const dayEvents = events.filter(
    (event) => event.date === selectedDate
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      <div className="p-4 border-b border-slate-800">
        <p className="text-sm text-slate-400">
          Monday
        </p>

        <h3 className="text-xl font-semibold">
          September 21, 2026
        </h3>
      </div>

      <div className="relative">

        {hours.map((hour) => (
          <div
            key={hour}
            className="flex h-20 border-b border-slate-800"
          >
            <div className="w-20 shrink-0 px-4 pt-2 text-xs text-slate-500">
              {hour}:00
            </div>

            <div
              onDoubleClick={() =>
                console.log("Create event at", hour)
              }
              className="flex-1 border-l border-slate-800 hover:bg-slate-800/30"
            />
          </div>
        ))}

        {/* Events */}
        <div className="absolute left-20 right-4 top-20">
          {dayEvents.map((event) => (
            <div key={event.id} className="mb-2">
              <EventCard event={event} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ---------------- WEEK VIEW ---------------- */

function WeekView() {
  const dates = getWeekDates();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="grid grid-cols-8 border-b border-slate-800">

        <div className="w-16" />

        {weekDays.map((day, index) => (
          <div
            key={day}
            className="p-3 text-center border-l border-slate-800"
          >
            <p className="text-xs text-slate-500">
              {day}
            </p>

            <p className="text-sm font-semibold mt-1">
              {21 + index}
            </p>
          </div>
        ))}

      </div>

      {/* Timeline */}
      <div className="overflow-x-auto">

        <div className="min-w-[900px]">

          {hours.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 h-20 border-b border-slate-800"
            >

              {/* Time */}
              <div className="px-3 pt-2 text-xs text-slate-500">
                {hour}:00
              </div>

              {/* Days */}
              {dates.map((date) => (
                <div
                  key={date}
                  onDoubleClick={() =>
                    console.log("Create event:", date, hour)
                  }
                  className="relative border-l border-slate-800 hover:bg-slate-800/30"
                >

                  {/* Event positioned roughly inside its day */}
                  {events
                    .filter(
                      (event) =>
                        event.date === date &&
                        parseInt(event.start) === hour
                    )
                    .map((event) => (
                      <div
                        key={event.id}
                        className="absolute top-1 left-1 right-1 z-10"
                      >
                        <EventCard
                          event={event}
                          compact
                        />
                      </div>
                    ))}

                </div>
              ))}

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

/* ---------------- MONTH VIEW ---------------- */

function MonthView() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-slate-800">

        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-xs text-slate-500 border-r border-slate-800 last:border-r-0"
          >
            {day}
          </div>
        ))}

      </div>

      {/* Month grid */}
      <div className="grid grid-cols-7">

        {/* September 2026 starts on Tuesday */}
        <div className="border-r border-b border-slate-800 min-h-32" />

        {days.map((day) => {

          const date = `2026-09-${String(day).padStart(2, "0")}`;

          const dayEvents = events.filter(
            (event) => event.date === date
          );

          return (
            <div
              key={day}
              onDoubleClick={() =>
                console.log("Create event:", date)
              }
              className="min-h-32 border-r border-b border-slate-800
                         p-2 hover:bg-slate-800/30 transition"
            >

              <div className="text-xs text-slate-500 mb-2">
                {day}
              </div>

              <div className="space-y-1">

                {dayEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    compact
                  />
                ))}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

/* ---------------- MAIN PLANNER ---------------- */

export default function Planner() {
  const [view, setView] = useState("week");

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6">

        <h1 className="text-xl font-bold">
          UniPlanner
        </h1>

        <div className="flex items-center gap-4">

          <span className="text-sm text-slate-400 hidden sm:block">
            Computer Science
          </span>

          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
            B
          </div>

        </div>
      </header>

      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-4rem)]
                          border-r border-slate-800 p-5 hidden md:block">

          <nav className="space-y-2">

            <button className="w-full text-left px-4 py-3 rounded-xl bg-indigo-600">
              Planner
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900">
              Deliberations
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900">
              All Events
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900">
              Notes
            </button>

            <div className="border-t border-slate-800 my-5" />

            <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900">
              My Events
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900">
              Profile
            </button>

          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 p-6">

          {/* Top controls */}
          <div className="flex flex-col lg:flex-row lg:items-center
                          justify-between gap-4 mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                September 2026
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Computer Science Department
              </p>
            </div>

            <div className="flex items-center gap-2">

              {["day", "week", "month"].map((item) => (

                <button
                  key={item}
                  onClick={() => setView(item)}
                  className={`px-4 py-2 rounded-lg text-sm
                              capitalize transition ${
                    view === item
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-900 text-slate-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Calendar */}
          {view === "day" && <DayView />}

          {view === "week" && <WeekView />}

          {view === "month" && <MonthView />}

        </main>

      </div>

      {/* Floating create button */}
      <button
        onClick={() => console.log("Create event")}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full
                   bg-indigo-600 hover:bg-indigo-500 shadow-xl
                   text-3xl transition"
        title="Create event"
      >
        +
      </button>

    </div>
  );
}

