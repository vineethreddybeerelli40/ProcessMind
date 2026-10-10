import React, { useState } from 'react'
import { UserPlus, RefreshCcw, ClipboardList, CheckCircle2 } from 'lucide-react'
import { Card, PageHeader, SectionTitle, StatusPill } from '../components/ui.jsx'
import { actionTrackingItems as initialItems } from '../data/mockData.js'

const workflow = ['Issue Detected', 'Assigned', 'In Progress', 'Resolved', 'Verified']
const statusIndex = { Detected: 0, Assigned: 1, 'In Progress': 2, Resolved: 3, Verified: 4 }

export default function ActionTracking() {
  const [items, setItems] = useState(initialItems)
  const [toast, setToast] = useState('')

  const advance = (id) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it
        const order = ['Detected', 'Assigned', 'In Progress', 'Resolved', 'Verified']
        const idx = order.indexOf(it.status)
        const next = order[Math.min(idx + 1, order.length - 1)]
        return { ...it, status: next, resolutionDate: next === 'Resolved' ? '2026-09-17' : it.resolutionDate }
      }),
    )
    setToast('Status updated')
    setTimeout(() => setToast(''), 2000)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Act"
        title="Action Tracking"
        description="Follow every issue from detection to a verified fix, department by department."
      />

      <Card className="mb-6">
        <SectionTitle>Workflow</SectionTitle>
        <div className="flex flex-wrap items-center gap-2">
          {workflow.map((w, idx) => (
            <React.Fragment key={w}>
              <div className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs text-white">{idx + 1}</span>
                {w}
              </div>
              {idx < workflow.length - 1 && <div className="h-px w-6 bg-ink-100 sm:w-10" />}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-ink-100 bg-ink-100/30 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-4 py-3">Problem</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action Taken</th>
              <th className="px-4 py-3">Resolved</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {items.map((it) => (
              <tr key={it.id} className="hover:bg-ink-100/20">
                <td className="max-w-[220px] px-4 py-3 font-medium text-ink-900">{it.problem}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{it.department}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{it.assignedTo}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{it.deadline}</td>
                <td className="px-4 py-3"><StatusPill status={it.status} /></td>
                <td className="max-w-[220px] px-4 py-3 text-ink-500">{it.actionTaken}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{it.resolutionDate || '—'}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => advance(it.id)}
                    disabled={it.status === 'Verified'}
                    className="flex items-center gap-1.5 rounded-lg border border-ink-100 px-2.5 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <RefreshCcw size={13} /> Advance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="pm-btn-secondary"><UserPlus size={16} /> Assign</button>
        <button className="pm-btn-secondary"><RefreshCcw size={16} /> Update Status</button>
        <button className="pm-btn-secondary"><ClipboardList size={16} /> Add Action</button>
        <button className="pm-btn-primary"><CheckCircle2 size={16} /> Mark as Resolved</button>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm text-white shadow-popover">
          {toast}
        </div>
      )}
    </div>
  )
}
