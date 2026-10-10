import React from 'react'
import { MessageSquareText, CalendarCheck2, Clock3, AlertCircle, ArrowRight } from 'lucide-react'
import { Card, StatCard, PageHeader, SectionTitle, StatusPill } from '../components/ui.jsx'
import { studentActivity, feedbackTable } from '../data/mockData.js'

export default function StudentDashboard({ user, setPage }) {
  const myFeedback = feedbackTable.slice(0, 4)

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user.name.split(' ')[0]} 👋`}
        description="Here's a snapshot of your feedback activity and campus events."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Feedback Submitted" value="14" sub="+3 this month" icon={MessageSquareText} tone="brand" />
        <StatCard label="Events Attended" value="5" sub="Last: AI Workshop" icon={CalendarCheck2} tone="violet" />
        <StatCard label="Pending Review" value="2" sub="Avg. 3 day response" icon={Clock3} tone="amber" />
        <StatCard label="Issues Reported" value="3" sub="1 resolved" icon={AlertCircle} tone="red" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle sub="Jump straight into common actions">Quick Actions</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Give Feedback', page: 'feedback-form', icon: MessageSquareText },
              { label: 'Event Feedback', page: 'feedback-form', icon: CalendarCheck2 },
              { label: 'View My Feedback', page: 'student-my-feedback', icon: Clock3 },
              { label: 'Report an Issue', page: 'feedback-form', icon: AlertCircle },
            ].map((a) => {
              const Icon = a.icon
              return (
                <button
                  key={a.label}
                  onClick={() => setPage(a.page)}
                  className="flex flex-col items-center gap-2 rounded-xl border border-ink-100 p-4 text-center text-xs font-semibold text-ink-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon size={20} />
                  {a.label}
                </button>
              )
            })}
          </div>

          <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-4">
            <p className="text-sm font-semibold text-brand-700">How ProcessMind uses your feedback</p>
            <p className="mt-1 text-sm text-brand-700/80">
              Your feedback is analyzed for sentiment and topic, grouped with similar responses from other
              students, and routed to the right department so real action gets taken.
            </p>
          </div>
        </Card>

        <Card>
          <SectionTitle>Recent Activity</SectionTitle>
          <ul className="space-y-4">
            {studentActivity.map((a) => (
              <li key={a.id} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                <div>
                  <p className="text-ink-700">{a.text}</p>
                  <p className="text-xs text-ink-300">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <SectionTitle sub="Status of your most recent submissions">My Recent Feedback</SectionTitle>
          <button onClick={() => setPage('student-my-feedback')} className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {myFeedback.map((f) => (
            <div key={f.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-900">{f.feedback}</p>
                <p className="text-xs text-ink-300">{f.category} • {f.date}</p>
              </div>
              <StatusPill status={f.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
