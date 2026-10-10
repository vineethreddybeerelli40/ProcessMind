import React from 'react'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`pm-card p-5 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-sm font-semibold text-brand-600">{eyebrow}</p>}
        <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-ink-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function StatCard({ label, value, sub, icon: Icon, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600',
    violet: 'bg-violet-50 text-violet-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
  }
  return (
    <Card className="flex items-center gap-4">
      {Icon && (
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm text-ink-500">{label}</p>
        <p className="font-display text-xl font-bold text-ink-900">{value}</p>
        {sub && <p className="text-xs text-ink-300">{sub}</p>}
      </div>
    </Card>
  )
}

export function SentimentPill({ sentiment }) {
  const map = {
    Positive: 'bg-green-50 text-green-600',
    Neutral: 'bg-ink-100 text-ink-500',
    Negative: 'bg-red-50 text-red-600',
    positive: 'bg-green-50 text-green-600',
  }
  return <span className={`pm-badge ${map[sentiment] || 'bg-ink-100 text-ink-500'}`}>{sentiment}</span>
}

export function PriorityPill({ priority }) {
  const map = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-amber-100 text-amber-700',
    Medium: 'bg-brand-100 text-brand-700',
    Low: 'bg-ink-100 text-ink-500',
  }
  return <span className={`pm-badge ${map[priority] || 'bg-ink-100 text-ink-500'}`}>{priority}</span>
}

export function StatusPill({ status }) {
  const map = {
    Detected: 'bg-ink-100 text-ink-500',
    Assigned: 'bg-brand-100 text-brand-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    Resolved: 'bg-green-100 text-green-700',
    Verified: 'bg-violet-100 text-violet-600',
    Reviewed: 'bg-green-100 text-green-700',
    Running: 'bg-amber-100 text-amber-700',
    Completed: 'bg-green-100 text-green-700',
    Waiting: 'bg-ink-100 text-ink-500',
  }
  return <span className={`pm-badge ${map[status] || 'bg-ink-100 text-ink-500'}`}>{status}</span>
}

export function TrendIcon({ trend }) {
  if (trend === 'up') return <ArrowUpRight size={14} className="text-red-500" />
  if (trend === 'down') return <ArrowDownRight size={14} className="text-green-500" />
  return <Minus size={14} className="text-ink-300" />
}

export function SectionTitle({ children, sub }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-lg font-bold text-ink-900">{children}</h2>
      {sub && <p className="text-sm text-ink-500">{sub}</p>}
    </div>
  )
}

export function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-100 py-12 text-center">
      <p className="font-semibold text-ink-700">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-500">{description}</p>}
    </div>
  )
}
