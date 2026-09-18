// well...might as well die....


import React from "react";

export default function Dashboard() {
  // Temporary mock role.
  // Later this will come from the authenticated user.
  //fuck me
  const role = "admin";

  const stats = [
    {
      label: "Upcoming Events",
      value: "24",
    },
    {
      label: "Negotiations",
      value: "5",
    },
    {
      label: "Pending Users",
      value: "8",
    },
    {
      label: "Departments",
      value: "6",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6">

        <div>
          <h1 className="text-xl font-bold">
            UniPlanner
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <span className="px-3 py-1 rounded-full bg-indigo-500/10
                           text-indigo-400 text-xs font-medium capitalize">
            {role}
          </span>

          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
            B
          </div>

        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm text-indigo-400 mb-2">
            Administration
          </p>

          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="text-slate-400 mt-2">
            Manage your department and monitor the planner.
          </p>
        </div>

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900 border border-slate-800
                         rounded-2xl p-6"
            >
              <p className="text-sm text-slate-400">
                {stat.label}
              </p>

              <p className="text-3xl font-bold mt-2">
                {stat.value}
              </p>
            </div>
          ))}

        </section>

        {/* Management */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* User management */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h3 className="text-lg font-semibold">
                  User Management
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Review and manage department users.
                </p>
              </div>

              <button className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm">
                View all
              </button>

            </div>

            <div className="space-y-3">

              <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl">
                <div>
                  <p className="font-medium">
                    Professor verification
                  </p>

                  <p className="text-xs text-slate-500">
                    3 pending requests
                  </p>
                </div>

                <button className="text-sm text-indigo-400">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl">
                <div>
                  <p className="font-medium">
                    Account requests
                  </p>

                  <p className="text-xs text-slate-500">
                    5 pending requests
                  </p>
                </div>

                <button className="text-sm text-indigo-400">
                  Review
                </button>
              </div>

            </div>
          </div>

          {/* Department */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="mb-5">
              <h3 className="text-lg font-semibold">
                Department
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Manage your department's planner.
              </p>
            </div>

            <div className="space-y-3">

              <button className="w-full text-left p-4 rounded-xl bg-slate-950 hover:bg-slate-800 transition">
                <p className="font-medium">
                  Manage events
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Create, edit or remove department events.
                </p>
              </button>

              <button className="w-full text-left p-4 rounded-xl bg-slate-950 hover:bg-slate-800 transition">
                <p className="font-medium">
                  Room availability
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Check for scheduling conflicts.
                </p>
              </button>

              <button className="w-full text-left p-4 rounded-xl bg-slate-950 hover:bg-slate-800 transition">
                <p className="font-medium">
                  Department settings
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Configure department information.
                </p>
              </button>

            </div>
          </div>

        </section>

        {/* Superadmin section */}
        {role === "superadmin" && (
          <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-lg font-semibold">
              System Administration
            </h3>

            <p className="text-sm text-slate-400 mt-1 mb-5">
              Global controls available to the superadmin.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              <button className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-left">
                Manage universities
              </button>

              <button className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-left">
                Manage departments
              </button>

              <button className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-left">
                System settings
              </button>

            </div>

          </section>
        )}

      </main>
    </div>
  );
}

