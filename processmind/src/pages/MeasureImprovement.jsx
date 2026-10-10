import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { CheckCircle2, TrendingUp, Clock3, RefreshCcw, Percent } from 'lucide-react'
import { Card, PageHeader, SectionTitle, StatCard } from '../components/ui.jsx'
import { improvementComparison, improvementStats } from '../data/mockData.js'

export default function MeasureImprovement() {
  return (
    <div>
      <PageHeader
        eyebrow="Improve"
        title="Measure Improvement"
        description="Compare sentiment before and after action was taken, to prove real change happened."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Issues Resolved" value={improvementStats.issuesResolved} icon={CheckCircle2} tone="green" />
        <StatCard label="Satisfaction Improvement" value={`+${improvementStats.satisfactionImprovement}%`} icon={TrendingUp} tone="brand" />
        <StatCard label="Avg Response Time" value={improvementStats.avgResponseTime} icon={Clock3} tone="amber" />
        <StatCard label="Recurring Issues" value={improvementStats.recurringIssues} icon={RefreshCcw} tone="red" />
        <StatCard label="Overall Improvement" value={`${improvementStats.improvementPercentage}%`} icon={Percent} tone="violet" />
      </div>

      <Card className="mt-6">
        <SectionTitle sub="Negative sentiment percentage before vs after college action">Before vs After Action</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={improvementComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e6f3" vertical={false} />
            <XAxis dataKey="issue" tick={{ fontSize: 11, fill: '#6b6a85' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6b6a85' }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e6f3' }} />
            <Legend />
            <Bar dataKey="before" name="Before Action" fill="#ef4444" radius={[6, 6, 0, 0]} />
            <Bar dataKey="after" name="After Action" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {improvementComparison.map((c) => {
          const drop = c.before - c.after
          return (
            <Card key={c.issue}>
              <h4 className="font-semibold text-ink-900">{c.issue}</h4>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-ink-500">Before: <span className="font-semibold text-red-500">{c.before}% negative</span></span>
                <span className="text-ink-500">After: <span className="font-semibold text-green-600">{c.after}% negative</span></span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-100">
                <div className="h-full rounded-full bg-green-500" style={{ width: `${100 - c.after}%` }} />
              </div>
              <p className="mt-2 text-xs font-semibold text-green-600">Improved by {drop} percentage points</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
