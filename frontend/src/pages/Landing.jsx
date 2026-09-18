import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Plan your university schedule together
        </h1>
        <p className="mt-3 text-slate-600">
          See your department's events, and have a fucking say on them
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            className="rounded-lg bg-brand-600 px-6 py-2.5 font-medium text-white
                       hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-brand-600"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-medium
                       text-slate-800 hover:bg-slate-100 focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Create account
          </Link>
            <Link
            to="/"
            className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-medium
                       text-slate-800 hover:bg-slate-100 focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
           Fuck off
          </Link>
        </div>
      </div>
    </main>
  )
}