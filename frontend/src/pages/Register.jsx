
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl">

        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            Create your account
          </h1>

          <p className="text-slate-400 mt-2">
            Join your university's planning system.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

          <form className="space-y-6">

       
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  First name
                </label>

                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                             focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Last name
                </label>

                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                             focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

           
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="you@university.edu"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                           focus:outline-none focus:border-indigo-500"
              />
            </div>

          
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                           focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Account type
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                           focus:outline-none focus:border-indigo-500"
              >
                <option value="student">Student</option>
                <option value="professor">Professor</option>
                <option value="admin">Department Admin</option>
              </select>
            </div>

        
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                University
              </label>

              <select
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                           focus:outline-none focus:border-indigo-500"
              >
                <option>Select university</option>
                <option>USTO MB</option>
              </select>
            </div>

           
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Department
              </label>

              <select
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                           focus:outline-none focus:border-indigo-500"
              >
                <option>Select department</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Biology</option>
                <option>Chemistry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                University ID
              </label>

              <input
                type="text"
                placeholder="Your university ID"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                           focus:outline-none focus:border-indigo-500"
              />
            </div>

       
            {role !== "admin" && (
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Verification document
                </label>

                <div className="border border-dashed border-slate-700 rounded-xl p-6 text-center">
                  <p className="text-slate-400 text-sm">
                    Upload your {role === "student" ? "student ID" : "professor proof"}
                  </p>

                  <button
                    type="button"
                    className="mt-3 px-4 py-2 rounded-lg bg-slate-800
                               hover:bg-slate-700 text-sm transition"
                  >
                    Choose file
                  </button>
                </div>
              </div>
            )}

          
            {role === "admin" && (
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Invitation / Admin code
                </label>

                <input
                  type="text"
                  placeholder="Enter the code provided by the superadmin"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700
                             focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500
                         font-medium transition"
            >
              Create account
            </button>

          </form>

          <div className="text-center mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

