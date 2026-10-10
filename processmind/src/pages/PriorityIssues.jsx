import React from 'react'
import { Users, Calendar, Building2 } from 'lucide-react'
import { Card, PageHeader, SectionTitle, PriorityPill, StatusPill } from '../components/ui.jsx'
import { priorityIssues } from '../data/mockData.js'

const groups = [
  { key: 'critical', label: 'Critical', desc: 'Issues requiring immediate attention.', color: 'border-red-200 bg-red-50/40' },
  { key: 'high', label: 'High', desc: 'Issues requiring quick action.', color: 'border-amber-200 bg-amber-50/40' },
  { key: 'medium', label: 'Medium', desc: 'Issues that should be handled soon.', color: 'border-brand-200 bg-brand-50/30' },
  { key: 'low', label: 'Low', desc: 'Issues that can be handled later.', color: 'border-ink-100 bg-ink-100/20' },
]

function IssueCard({ issue }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="font-semibold text-ink-900">{issue.title}</h4>
        <PriorityPill priority={issue.priority || issue.priorityLabel} />
      </div>
      <p className="text-xs font-medium text-brand-600">{issue.category}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink-500">
        <div className="flex items-center gap-1.5"><Users size={13} /> {issue.affected} students affected</div>
        <div className="flex items-center gap-1.5"><Calendar size={13} /> {issue.date}</div>
        <div className="flex items-center gap-1.5"><Building2 size={13} /> {issue.department}</div>
        <div className="text-red-500 font-semibold">{issue.negativeSentiment}% negative</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <StatusPill status={issue.status} />
        <button className="text-xs font-semibold text-brand-600 hover:underline">View details</button>
      </div>
    </div>
  )
}

export default function PriorityIssues() {
  return (
    <div>
      <PageHeader
        eyebrow="Prioritize"
        title="Priority & Issues"
        description="Issues ranked by how many students they affect and how negative the sentiment is."
      />

      <div className="space-y-6">
        {groups.map((g) => {
          const list = priorityIssues[g.key].map((i) => ({ ...i, priority: g.label }))
          return (
            <Card key={g.key} className={`border ${g.color}`}>
              <div className="mb-4 flex items-center justify-between">
                <SectionTitle sub={g.desc}>{g.label} <span className="text-ink-300">({list.length})</span></SectionTitle>
              </div>
              {list.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {list.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
                </div>
              ) : (
                <p className="text-sm text-ink-300">No issues in this category right now.</p>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
