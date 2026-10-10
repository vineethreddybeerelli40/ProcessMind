import React from 'react'
import { Card, PageHeader, StatusPill, SentimentPill } from '../components/ui.jsx'
import { feedbackTable } from '../data/mockData.js'

export default function StudentMyFeedback({ setPage }) {
  const mine = feedbackTable.slice(0, 7)

  return (
    <div>
      <PageHeader
        title="My Feedback"
        description="Track the status of everything you've submitted to ProcessMind."
        actions={[
          <button key="new" onClick={() => setPage('feedback-form')} className="pm-btn-primary">
            + New Feedback
          </button>,
        ]}
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink-100 bg-ink-100/30 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Sentiment</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {mine.map((f) => (
              <tr key={f.id} className="hover:bg-ink-100/20">
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{f.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-700">{f.category}</td>
                <td className="max-w-xs px-4 py-3 text-ink-900">{f.feedback}</td>
                <td className="px-4 py-3"><SentimentPill sentiment={f.sentiment} /></td>
                <td className="px-4 py-3"><StatusPill status={f.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
