import React, { useEffect, useState } from 'react'
import { Activity, Cpu, Database, Gauge, LockKeyhole, Network, Play, ServerCog, Timer, Users } from 'lucide-react'
import { api } from '../services/api.js'
import { Card, PageHeader, SectionTitle, StatusPill, PriorityPill } from '../components/ui.jsx'

const conceptCards = [
  { key: 'process_management', label: 'Process creation', icon: Play, detail: (data) => `${data.creation} starts isolated Linux workers.` },
  { key: 'scheduler', label: 'Scheduling / priority', icon: Timer, detail: (data) => `${data.algorithm} via ${data.queue_type}.` },
  { key: 'synchronization', label: 'Synchronization', icon: LockKeyhole, detail: (data) => `${data.primitive} protects ${data.protected_state}.` },
  { key: 'background_processing', label: 'Background processing', icon: Activity, detail: () => 'A dispatcher thread feeds workers without blocking API requests.' },
]

export default function OSConcepts() {
  const [snapshot, setSnapshot] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const refresh = () => api.osConcepts().then(setSnapshot).catch(() => setError('Connect the WSL backend to show live OS evidence.'))
    refresh()
    const timer = window.setInterval(refresh, 1500)
    return () => window.clearInterval(timer)
  }, [])

  const stats = snapshot?.snapshot
  const resource = snapshot?.resource_monitoring

  return (
    <div>
      <PageHeader eyebrow="Operating Systems Lab" title="OS Concepts in ProcessMind" description="Live evidence of Linux process creation, priority scheduling, synchronization, concurrency, and resource monitoring." />
      {error && <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">{error}</p>}

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="text-center"><ServerCog className="mx-auto mb-2 text-brand-500" size={20} /><p className="text-xs text-ink-500">Platform</p><p className="font-bold text-ink-900">{snapshot?.platform || 'Connecting...'}</p></Card>
        <Card className="text-center"><Users className="mx-auto mb-2 text-violet-500" size={20} /><p className="text-xs text-ink-500">Worker processes</p><p className="font-bold text-ink-900">{stats?.worker_limit ?? '—'}</p></Card>
        <Card className="text-center"><Cpu className="mx-auto mb-2 text-amber-500" size={20} /><p className="text-xs text-ink-500">CPU usage</p><p className="font-bold text-ink-900">{resource ? `${resource.cpu_percent}%` : '—'}</p></Card>
        <Card className="text-center"><Gauge className="mx-auto mb-2 text-green-500" size={20} /><p className="text-xs text-ink-500">Memory usage</p><p className="font-bold text-ink-900">{resource ? `${resource.memory_percent}%` : '—'}</p></Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card><SectionTitle sub="The implementation used by the WSL backend">OS mechanisms</SectionTitle><div className="space-y-3">{conceptCards.map(({ key, label, icon: Icon, detail }) => { const data = snapshot?.[key]; return <div key={key} className="flex items-start gap-3 rounded-xl border border-ink-100 p-3"><Icon className="mt-0.5 shrink-0 text-brand-600" size={18} /><div><p className="text-sm font-semibold text-ink-900">{label}</p><p className="mt-1 text-xs text-ink-500">{data ? detail(data) : 'Waiting for backend evidence...'}</p></div></div> })}</div></Card>
        <Card><SectionTitle sub="Counters are maintained by the process manager">Scheduler evidence</SectionTitle><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-brand-50 p-3"><p className="text-xs text-brand-700">Created processes</p><p className="mt-1 text-2xl font-bold text-brand-900">{stats?.processes_created ?? 0}</p></div><div className="rounded-xl bg-green-50 p-3"><p className="text-xs text-green-700">Completed processes</p><p className="mt-1 text-2xl font-bold text-green-900">{stats?.processes_completed ?? 0}</p></div><div className="rounded-xl bg-amber-50 p-3"><p className="text-xs text-amber-700">Queued tasks</p><p className="mt-1 text-2xl font-bold text-amber-900">{stats?.queue_items ?? 0}</p></div><div className="rounded-xl bg-violet-50 p-3"><p className="text-xs text-violet-700">Active workers</p><p className="mt-1 text-2xl font-bold text-violet-900">{stats?.active_workers ?? 0}</p></div></div><p className="mt-4 text-xs text-ink-500">Priority order: Critical → High → Medium → Low</p></Card>
      </div>

      <Card className="mt-6 overflow-x-auto p-0"><div className="p-4 pb-2"><SectionTitle sub="Actual child PIDs returned by psutil while analysis is running">Live Linux processes</SectionTitle></div><table className="w-full min-w-[700px] text-left text-sm"><thead className="border-y border-ink-100 bg-ink-100/30 text-xs font-semibold uppercase tracking-wide text-ink-500"><tr><th className="px-4 py-3">PID</th><th className="px-4 py-3">Task</th><th className="px-4 py-3">Priority</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">CPU</th><th className="px-4 py-3">Memory</th></tr></thead><tbody className="divide-y divide-ink-100">{snapshot?.processes?.length ? snapshot.processes.map((process) => <tr key={process.pid}><td className="px-4 py-3 font-mono text-ink-900">{process.pid}</td><td className="px-4 py-3">{process.task}</td><td className="px-4 py-3"><PriorityPill priority={process.priority} /></td><td className="px-4 py-3"><StatusPill status={process.status} /></td><td className="px-4 py-3">{process.cpu_usage}%</td><td className="px-4 py-3">{process.memory_usage_mb} MB</td></tr>) : <tr><td colSpan="6" className="px-4 py-8 text-center text-ink-300">Submit feedback to create a real Linux worker process.</td></tr>}</tbody></table></Card>

      <Card className="mt-6"><SectionTitle sub="How to explain the demo">Review flow</SectionTitle><div className="flex flex-wrap items-center gap-2 text-xs">{['POST feedback', 'PriorityQueue', 'multiprocessing.Process', 'threading.Lock', 'psutil metrics', 'SQLite result', 'Dashboard'].map((step, index) => <React.Fragment key={step}><span className="rounded-full bg-brand-50 px-3 py-1.5 font-semibold text-brand-700">{step}</span>{index < 6 && <span className="text-ink-300">→</span>}</React.Fragment>)}</div></Card>
    </div>
  )
}