import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { Card, PageHeader, SectionTitle, PriorityPill, TrendIcon } from '../components/ui.jsx'
import { topicVolume } from '../data/mockData.js'

const priorityBar = { High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e' }

export default function TopicAnalysis() {
  return (
    <div>
      <PageHeader
        eyebrow="Understand"
        title="Topic Analysis"
        description="Topics automatically discovered by clustering student feedback with NLP."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {topicVolume.map((t) => (
          <Card key={t.topic}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-ink-900">{t.topic}</h3>
              <PriorityPill priority={t.priority} />
            </div>
            <p className="text-2xl font-bold text-ink-900">{t.mentions.toLocaleString()}
              <span className="ml-1 text-sm font-medium text-ink-300">mentions</span>
            </p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-ink-500">Negative sentiment</span>
              <span className="font-semibold text-red-500">{t.sentimentNegative}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-red-400" style={{ width: `${t.sentimentNegative}%` }} />
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-ink-500">
              <TrendIcon trend={t.trend} />
              {t.trend === 'up' ? 'Rising mentions vs last month' : t.trend === 'down' ? 'Falling mentions vs last month' : 'Stable vs last month'}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <SectionTitle sub="Ranked by volume of mentions across all feedback">Most Discussed Topics</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topicVolume}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e6f3" vertical={false} />
            <XAxis dataKey="topic" tick={{ fontSize: 11, fill: '#6b6a85' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6b6a85' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e6f3' }} />
            <Bar dataKey="mentions" radius={[6, 6, 0, 0]}>
              {topicVolume.map((t) => <Cell key={t.topic} fill={priorityBar[t.priority]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
