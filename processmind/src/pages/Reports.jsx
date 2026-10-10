import React, { useState } from 'react'
import { FileBarChart2, Download, Loader2 } from 'lucide-react'
import { Card, PageHeader, SectionTitle } from '../components/ui.jsx'
import { reportTypes } from '../data/mockData.js'

export default function Reports() {
  const [generating, setGenerating] = useState(null)
  const [ready, setReady] = useState({})

  const generate = (id) => {
    setGenerating(id)
    setTimeout(() => {
      setGenerating(null)
      setReady((r) => ({ ...r, [id]: true }))
    }, 1200)
  }

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate ready-to-share reports summarizing feedback, sentiment and improvement."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reportTypes.map((r) => (
          <Card key={r.id} className="flex flex-col">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FileBarChart2 size={18} />
            </div>
            <h3 className="font-display font-bold text-ink-900">{r.name}</h3>
            <p className="mt-1 flex-1 text-sm text-ink-500">{r.desc}</p>
            <div className="mt-4 flex gap-2">
              {!ready[r.id] ? (
                <button onClick={() => generate(r.id)} disabled={generating === r.id} className="pm-btn-primary flex-1">
                  {generating === r.id ? <Loader2 size={16} className="animate-spin" /> : <FileBarChart2 size={16} />}
                  {generating === r.id ? 'Generating…' : 'Generate Report'}
                </button>
              ) : (
                <button className="pm-btn-secondary flex-1">
                  <Download size={16} /> Download Report
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <SectionTitle sub="Reports generated in the last 30 days">Recent Reports</SectionTitle>
        <div className="divide-y divide-ink-100">
          {[
            { name: 'Weekly Feedback Report — Sep 8–14', date: '2026-09-15' },
            { name: 'Critical Issues Report', date: '2026-09-12' },
            { name: 'Event Analysis Report — Tech Fest 2026', date: '2026-09-05' },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-ink-900">{r.name}</p>
                <p className="text-xs text-ink-300">{r.date}</p>
              </div>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
                <Download size={14} /> Download
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
