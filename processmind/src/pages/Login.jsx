import React, { useState } from 'react'
import { Brain, GraduationCap, UserCog, Presentation, Eye, EyeOff, Sparkles } from 'lucide-react'

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'faculty', label: 'Faculty', icon: Presentation },
  { id: 'administrator', label: 'Administrator', icon: UserCog },
]

export default function Login({ onLogin }) {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(role)
  }

  return (
    <div className="flex min-h-screen bg-ink-900">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 p-12 text-white lg:flex">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Brain size={20} />
          </div>
          <span className="font-display text-lg font-extrabold">ProcessMind</span>
        </div>

        <div className="relative max-w-md">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            <Sparkles size={13} /> AI-Powered Student Voice Platform
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight">
            Listen. Understand. Prioritize. Act. Improve.
          </h1>
          <p className="mt-4 text-sm text-brand-100">
            ProcessMind turns everyday student and event feedback into ranked, actionable
            insights — so colleges know exactly what to fix next, and can prove it improved.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-display text-2xl font-bold">12,480</p>
            <p className="text-brand-100">Feedback analyzed</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold">96%</p>
            <p className="text-brand-100">Sentiment accuracy</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold">42%</p>
            <p className="text-brand-100">Faster resolution</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center bg-[#f5f6fc] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
              <Brain size={18} />
            </div>
            <span className="font-display text-lg font-extrabold text-ink-900">ProcessMind</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-ink-900">Welcome to ProcessMind</h2>
          <p className="mt-1 text-sm text-ink-500">Sign in to continue to your dashboard.</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {roles.map((r) => {
              const Icon = r.icon
              const active = role === r.id
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition ${
                    active
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-ink-100 bg-white text-ink-500 hover:border-brand-200'
                  }`}
                >
                  <Icon size={18} />
                  {r.label}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Email address</label>
              <input
                type="email"
                required
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pm-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pm-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="mt-2 text-right">
                <button type="button" className="text-xs font-semibold text-brand-600 hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>

            <button type="submit" className="pm-btn-primary w-full py-3">
              Login as {roles.find((r) => r.id === role).label}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-100" />
            <span className="text-xs font-medium text-ink-300">or</span>
            <div className="h-px flex-1 bg-ink-100" />
          </div>

          <button onClick={() => onLogin(role)} className="pm-btn-secondary w-full py-3">
            <Sparkles size={16} className="text-brand-500" />
            Try Demo Login ({roles.find((r) => r.id === role).label})
          </button>

          <p className="mt-6 text-center text-xs text-ink-300">
            No account needed for this preview — demo login uses realistic sample data.
          </p>
        </div>
      </div>
    </div>
  )
}
