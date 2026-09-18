
import React, { useState } from "react";

const events = [
  {
    id: 1,
    title: "Web Engineering",
    start: "09:00",
    end: "11:00",
    place: "Room B12",
    type: "Fixed",
  },
  {
    id: 2,
    title: "Database Systems",
    start: "13:00",
    end: "15:00",
    place: "Lab 3",
    type: "Negotiable",
  },
  {
    id: 3,
    title: "Department Meeting",
    start: "16:00",
    end: "17:00",
    place: "Conference Room",
    type: "Fixed",
  },
];

export default function Planner() {
  const [view, setView] = useState("week");

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold">
            UniPlanner
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            Computer Science
          </span>

          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
            B
          </div>
        </div>
      </header>

      <div className="flex">

        <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-slate-800 p-5 hidden md:block">

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

       
        <main className="flex-1 p-6">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                September 2026
              </h2>

              <p className="text-sm text-slate-400">
                Computer Science Department
              </p>
            </div>

            <div className="flex items-center gap-2">

              {["day", "week", "month"].map((item) => (
                <button
                  key={item}
                  onClick={() => setView(item)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
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

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

            <div className="grid grid-cols-7 border-b border-slate-800">

              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-xs text-slate-500 border-r border-slate-800 last:border-r-0"
                >
                  {day}
                </div>
              ))}

            </div>

            <div className="grid grid-cols-7 min-h-[650px]">

              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="relative border-r border-slate-800 last:border-r-0"
                >

                  {Array.from({ length: 8 }).map((_, row) => (
                    <div
                      key={row}
                      className="h-20 border-b border-slate-800"
                    />
                  ))}

                  {index === 1 && (
                    <button
                      className="absolute top-20 left-2 right-2 p-3 rounded-lg
                                 bg-indigo-600/80 hover:bg-indigo-600
                                 text-left text-xs transition"
                    >
                      <p className="font-semibold">
                        Web Engineering
                      </p>

                      <p className="text-indigo-200 mt-1">
                        09:00 – 11:00
                      </p>

                      <p className="text-indigo-200">
                        Room B12
                      </p>
                    </button>
                  )}

                  {index === 3 && (
                    <button
                      className="absolute top-36 left-2 right-2 p-3 rounded-lg
                                 bg-amber-600/80 hover:bg-amber-600
                                 text-left text-xs transition"
                    >
                      <p className="font-semibold">
                        Database Systems
                      </p>

                      <p className="text-amber-200 mt-1">
                        Negotiable
                      </p>
                    </button>
                  )}

                </div>
              ))}

            </div>
          </div>

          <div className="mt-6 flex gap-3 md:hidden">
            <button className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800">
              Deliberations
            </button>

            <button className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800">
              All Events
            </button>
          </div>

        </main>
      </div>

      <button
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

