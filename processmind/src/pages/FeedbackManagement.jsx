import React, { useMemo, useState } from 'react'
import { Search, ChevronLeft, ChevronRight, X, ArrowUpDown } from 'lucide-react'
import { Card, PageHeader, SentimentPill, PriorityPill, StatusPill } from '../components/ui.jsx'
import { feedbackTable, feedbackCategories } from '../data/mockData.js'

const PAGE_SIZE = 5

export default function FeedbackManagement() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    let rows = feedbackTable.filter((r) => {
      const matchesQuery = r.feedback.toLowerCase().includes(query.toLowerCase()) || r.id.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || r.category === category
      return matchesQuery && matchesCategory
    })
    rows = rows.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (a[sortKey] < b[sortKey]) return -1 * dir
      if (a[sortKey] > b[sortKey]) return 1 * dir
      return 0
    })
    return rows
  }, [query, category, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const Th = ({ label, sortField }) => (
    <th className="cursor-pointer select-none px-4 py-3" onClick={() => { toggleSort(sortField); setPage(1) }}>
      <span className="inline-flex items-center gap-1">{label} <ArrowUpDown size={12} className="text-ink-300" /></span>
    </th>
  )

  return (
    <div>
      <PageHeader
        title="Student Feedback"
        description="Every feedback entry captured by ProcessMind, searchable and filterable."
      />

      <Card className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search feedback text or ID..."
            className="pm-input pl-9"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1) }}
          className="pm-input sm:w-48"
        >
          <option>All</option>
          {feedbackCategories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-ink-100 bg-ink-100/30 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              <Th label="Student" sortField="student" />
              <Th label="Date" sortField="date" />
              <Th label="Category" sortField="category" />
              <th className="px-4 py-3">Feedback</th>
              <Th label="Sentiment" sortField="sentiment" />
              <th className="px-4 py-3">Topic</th>
              <Th label="Priority" sortField="priority" />
              <Th label="Status" sortField="status" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {pageRows.map((r) => (
              <tr key={r.id} onClick={() => setSelected(r)} className="cursor-pointer hover:bg-ink-100/20">
                <td className="whitespace-nowrap px-4 py-3 text-ink-700">{r.student}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{r.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-700">{r.category}</td>
                <td className="max-w-xs truncate px-4 py-3 text-ink-900">{r.feedback}</td>
                <td className="px-4 py-3"><SentimentPill sentiment={r.sentiment} /></td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{r.topic}</td>
                <td className="px-4 py-3"><PriorityPill priority={r.priority} /></td>
                <td className="px-4 py-3"><StatusPill status={r.status} /></td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-ink-300">No feedback found.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      <div className="mt-4 flex items-center justify-between text-sm text-ink-500">
        <span>Page {page} of {totalPages} • {filtered.length} results</span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded-lg border border-ink-100 px-3 py-1.5 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1 rounded-lg border border-ink-100 px-3 py-1.5 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-popover" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-brand-600">{selected.id}</p>
                <h3 className="font-display text-lg font-bold text-ink-900">Feedback Detail</h3>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 text-ink-300 hover:bg-ink-100">
                <X size={18} />
              </button>
            </div>
            <p className="rounded-xl bg-ink-100/40 p-3 text-sm text-ink-900">{selected.feedback}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-ink-300">Student</p><p className="font-medium text-ink-900">{selected.student}</p></div>
              <div><p className="text-xs text-ink-300">Date</p><p className="font-medium text-ink-900">{selected.date}</p></div>
              <div><p className="text-xs text-ink-300">Category</p><p className="font-medium text-ink-900">{selected.category}</p></div>
              <div><p className="text-xs text-ink-300">Topic</p><p className="font-medium text-ink-900">{selected.topic}</p></div>
              <div><p className="text-xs text-ink-300">Sentiment</p><SentimentPill sentiment={selected.sentiment} /></div>
              <div><p className="text-xs text-ink-300">Priority</p><PriorityPill priority={selected.priority} /></div>
              <div><p className="text-xs text-ink-300">Status</p><StatusPill status={selected.status} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
