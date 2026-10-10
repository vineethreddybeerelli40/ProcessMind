import React, { useMemo, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Filter } from 'lucide-react'
import { Card, PageHeader, SectionTitle, SentimentPill } from '../components/ui.jsx'
import { sentimentBreakdown, sentimentTable, feedbackCategories, departments } from '../data/mockData.js'

export default function SentimentAnalysis() {
  const [department, setDepartment] = useState('All')
  const [category, setCategory] = useState('All')
  const [sentiment, setSentiment] = useState('All')

  const filtered = useMemo(() => {
    return sentimentTable.filter((r) => {
      return (
        (department === 'All' || r.department === department) &&
        (category === 'All' || r.category === category) &&
        (sentiment === 'All' || r.sentiment === sentiment)
      )
    })
  }, [department, category, sentiment])

  return (
    <div>
      <PageHeader
        eyebrow="Understand"
        title="Sentiment Analysis"
        description="See how students feel across every category, department and course."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <SectionTitle sub="Overall sentiment across filtered feedback">Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sentimentBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {sentimentBreakdown.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex justify-center gap-4 text-xs">
            {sentimentBreakdown.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-ink-500">{s.name} {s.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle sub="Narrow down feedback before reviewing details">Filters</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-500">Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} className="pm-input">
                <option>All</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-500">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="pm-input">
                <option>All</option>
                {feedbackCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-500">Sentiment</label>
              <select value={sentiment} onChange={(e) => setSentiment(e.target.value)} className="pm-input">
                <option>All</option>
                <option>Positive</option>
                <option>Neutral</option>
                <option>Negative</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-500">Date range</label>
              <select className="pm-input" defaultValue="30">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-300">
            <Filter size={13} /> Showing {filtered.length} of {sentimentTable.length} feedback entries
          </p>
        </Card>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink-100 bg-ink-100/30 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Sentiment</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-ink-100/20">
                <td className="max-w-md px-4 py-3 text-ink-900">{r.feedback}</td>
                <td className="px-4 py-3"><SentimentPill sentiment={r.sentiment} /></td>
                <td className="px-4 py-3 text-ink-700">{r.confidence}%</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{r.department}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-500">{r.date}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-ink-300">No feedback matches these filters.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
