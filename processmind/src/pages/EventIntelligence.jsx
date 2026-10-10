import React, { useState } from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts'
import { Users, Star, TrendingUp, ThumbsUp, ThumbsDown, CalendarDays } from 'lucide-react'
import { Card, PageHeader, StatCard, SectionTitle } from '../components/ui.jsx'
import { events } from '../data/mockData.js'

export default function EventIntelligence() {
  const [selectedId, setSelectedId] = useState(events[0].id)
  const event = events.find((e) => e.id === selectedId)

  return (
    <div>
      <PageHeader
        eyebrow="Capture → Understand"
        title="Event Intelligence"
        description="Analyze attendance, satisfaction and sentiment for every campus event."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {events.map((e) => (
          <button
            key={e.id}
            onClick={() => setSelectedId(e.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedId === e.id
                ? 'border-brand-500 bg-brand-600 text-white'
                : 'border-ink-100 bg-white text-ink-500 hover:border-brand-200'
            }`}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Attendees" value={event.attendees.toLocaleString()} icon={Users} tone="brand" />
        <StatCard label="Avg Rating" value={`${event.avgRating} / 5`} icon={Star} tone="amber" />
        <StatCard label="Participation Rate" value={`${event.participationRate}%`} icon={TrendingUp} tone="violet" />
        <StatCard label="Positive Feedback" value={`${event.positivePct}%`} icon={ThumbsUp} tone="green" />
        <StatCard label="Negative Feedback" value={`${event.negativePct}%`} icon={ThumbsDown} tone="red" />
      </div>

      <Card className="mt-6 flex flex-wrap items-center gap-3">
        <CalendarDays size={18} className="text-brand-500" />
        <p className="text-sm text-ink-700">
          <span className="font-semibold text-ink-900">{event.name}</span> — held on{' '}
          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <SectionTitle sub="Attendance across recent events">Attendance</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={events}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e6f3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b6a85' }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 12, fill: '#6b6a85' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e6f3' }} />
              <Bar dataKey="attendees" radius={[6, 6, 0, 0]}>
                {events.map((e) => <Cell key={e.id} fill={e.id === selectedId ? '#5b63e6' : '#c3caf9'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle sub="Sentiment split for this event">Sentiment</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={event.sentiment} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {event.sentiment.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle sub="Satisfaction across key dimensions">Event Satisfaction</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={event.satisfaction}>
              <PolarGrid stroke="#e7e6f3" />
              <PolarAngleAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b6a85' }} />
              <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#a6a5bd' }} />
              <Radar dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="mt-6">
        <SectionTitle sub="What attendees talked about most">Feedback Categories</SectionTitle>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={event.categories}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e6f3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b6a85' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6b6a85' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e6f3' }} />
            <Bar dataKey="mentions" fill="#5b63e6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
