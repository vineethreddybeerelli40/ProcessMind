import React from 'react'
import { Menu, Bell, Search } from 'lucide-react'

const titles = {
  'student-dashboard': 'Student Dashboard',
  'feedback-form': 'Give Feedback',
  'student-my-feedback': 'My Feedback',
  'admin-dashboard': 'Admin Dashboard',
  'feedback-management': 'Student Feedback',
  'event-intelligence': 'Event Intelligence',
  'sentiment-analysis': 'Sentiment Analysis',
  'topic-analysis': 'Topic Analysis',
  'priority-issues': 'Priority & Issues',
  'action-tracking': 'Action Tracking',
  'measure-improvement': 'Measure Improvement',
  reports: 'Reports',
  'ai-processing': 'AI Processing',
  'task-manager': 'ProcessMind Task Manager',
  settings: 'Settings',
}

export default function Topbar({ page, setMobileOpen, user }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-ink-100 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
      <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 lg:hidden" onClick={() => setMobileOpen(true)}>
        <Menu size={20} />
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink-900 sm:text-base">{titles[page] || 'ProcessMind'}</p>
      </div>
      <div className="hidden items-center gap-2 rounded-xl border border-ink-100 bg-ink-100/40 px-3 py-2 text-sm text-ink-300 md:flex">
        <Search size={15} />
        <span>Search feedback, issues, events…</span>
      </div>
      <button className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-100">
        <Bell size={19} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>
      <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 sm:flex">
        {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
      </div>
    </header>
  )
}
