import React from 'react'
import {
  MessageSquareText, Cpu, SmilePlus, Tags, RefreshCcw, AlertTriangle,
  ListOrdered, Sparkles, Building2, TrendingUp,
} from 'lucide-react'
import { Card, PageHeader, SectionTitle } from '../components/ui.jsx'
import { aiPipelineSteps } from '../data/mockData.js'

const icons = [MessageSquareText, Cpu, SmilePlus, Tags, RefreshCcw, AlertTriangle, ListOrdered, Sparkles, Building2, TrendingUp]

export default function AIProcessing() {
  return (
    <div>
      <PageHeader
        eyebrow="Capture → Connect → Understand → Prioritize → Act → Measure"
        title="How ProcessMind Processes Feedback"
        description="Every piece of feedback moves through this pipeline, from raw text to measurable improvement."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {aiPipelineSteps.map((step, idx) => {
          const Icon = icons[idx]
          return (
            <Card key={step.title} className="relative">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
                <Icon size={18} />
              </div>
              <p className="text-xs font-semibold text-ink-300">Step {idx + 1}</p>
              <h3 className="font-display font-bold text-ink-900">{step.title}</h3>
              <p className="mt-1 text-xs text-ink-500">{step.desc}</p>
              {idx < aiPipelineSteps.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-ink-100 lg:block" />
              )}
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <SectionTitle sub="One example, start to finish">Example: Wi-Fi Complaint</SectionTitle>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {['"Wi-Fi is very slow in the hostel after 8 PM"', 'Sentiment: Negative (91%)', 'Topic: Wi-Fi', '31 similar reports this week', 'Severity: High', 'Priority: High', 'Assigned: IT Department', 'Action: New access points ordered', 'Re-measured: 28% negative (was 72%)'].map((s, i) => (
            <React.Fragment key={s}>
              <span className="rounded-full bg-ink-100/60 px-3 py-1.5 font-medium text-ink-700">{s}</span>
              {i < 8 && <span className="text-ink-300">→</span>}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </div>
  )
}
