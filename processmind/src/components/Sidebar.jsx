import React from 'react'
import {
  LayoutDashboard, MessageSquareText, CalendarRange, SmilePlus, Tags,
  ListOrdered, Workflow, TrendingUp, FileBarChart2, Cpu, Settings as SettingsIcon,
  LogOut, X, Brain,
} from 'lucide-react'

const studentNav = [
  { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'feedback-form', label: 'Give Feedback', icon: MessageSquareText },
  { id: 'student-my-feedback', label: 'My Feedback', icon: ListOrdered },
]

const adminNav = [
  { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'feedback-management', label: 'Student Feedback', icon: MessageSquareText },
  { id: 'event-intelligence', label: 'Event Intelligence', icon: CalendarRange },
  { id: 'sentiment-analysis', label: 'Sentiment Analysis', icon: SmilePlus },
  { id: 'topic-analysis', label: 'Topic Analysis', icon: Tags },
  { id: 'priority-issues', label: 'Priority & Issues', icon: ListOrdered },
  { id: 'action-tracking', label: 'Action Tracking', icon: Workflow },
  { id: 'measure-improvement', label: 'Measure Improvement', icon: TrendingUp },
  { id: 'reports', label: 'Reports', icon: FileBarChart2 },
  { id: 'ai-processing', label: 'AI Processing', icon: Brain },
  { id: 'task-manager', label: 'ProcessMind Task Manager', icon: Cpu },
]

export default function Sidebar({ role, page, setPage, user, onLogout, mobileOpen, setMobileOpen }) {
  const nav = role === 'administrator' ? adminNav : studentNav

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-sm">
          <Brain size={18} />
        </div>
        <div>
          <p className="font-display text-base font-extrabold leading-none text-ink-900">ProcessMind</p>
          <p className="text-[11px] font-medium text-ink-300">Listen · Understand · Act</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {nav.map((item) => {
          const Icon = item.icon
          const active = page === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id)
                setMobileOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              <Icon size={17} className={active ? 'text-white' : 'text-ink-300'} />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
        <button
          onClick={() => {
            setPage('settings')
            setMobileOpen(false)
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
            page === 'settings' ? 'bg-brand-600 text-white shadow-sm' : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700'
          }`}
        >
          <SettingsIcon size={17} className={page === 'settings' ? 'text-white' : 'text-ink-300'} />
          Settings
        </button>
      </nav>

      <div className="border-t border-ink-100 p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600">
            {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink-900">{user.name}</p>
            <p className="truncate text-xs capitalize text-ink-300">{user.role}</p>
          </div>
          <button onClick={onLogout} title="Logout" className="rounded-lg p-2 text-ink-300 hover:bg-red-50 hover:text-red-500">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-ink-100 bg-white lg:block">{content}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-popover">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-2 text-ink-500 hover:bg-ink-100"
            >
              <X size={18} />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}
