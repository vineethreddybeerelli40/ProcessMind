import React from 'react'
import { ListTree, PlayCircle, CheckCircle2, Flag, Users, Timer } from 'lucide-react'
import { Card, PageHeader, SectionTitle, StatusPill, PriorityPill } from '../components/ui.jsx'
import { taskQueue, taskManagerStats } from '../data/mockData.js'

export default function TaskManager() {
  return (
    <div>
      <PageHeader
        eyebrow="System"
        title="ProcessMind Task Manager"
        description="A behind-the-scenes look at how the AI processing engine schedules and runs feedback-analysis tasks."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <Card className="text-center">
          <ListTree className="mx-auto mb-2 text-brand-500" size={20} />
          <p className="font-display text-xl font-bold text-ink-900">{taskManagerStats.queueLength}</p>
          <p className="text-xs text-ink-500">Queue Length</p>
        </Card>
        <Card className="text-center">
          <PlayCircle className="mx-auto mb-2 text-amber-500" size={20} />
          <p className="font-display text-xl font-bold text-ink-900">{taskManagerStats.running}</p>
          <p className="text-xs text-ink-500">Running Tasks</p>
        </Card>
        <Card className="text-center">
          <CheckCircle2 className="mx-auto mb-2 text-green-500" size={20} />
          <p className="font-display text-xl font-bold text-ink-900">{taskManagerStats.completed}</p>
          <p className="text-xs text-ink-500">Completed Tasks</p>
        </Card>
        <Card className="text-center">
          <Flag className="mx-auto mb-2 text-red-500" size={20} />
          <p className="font-display text-xl font-bold text-ink-900">{taskManagerStats.priorityTasks}</p>
          <p className="text-xs text-ink-500">Priority Tasks</p>
        </Card>
        <Card className="text-center">
          <Users className="mx-auto mb-2 text-violet-500" size={20} />
          <p className="font-display text-xl font-bold text-ink-900">{taskManagerStats.workers}</p>
          <p className="text-xs text-ink-500">Workers</p>
        </Card>
        <Card className="text-center">
          <Timer className="mx-auto mb-2 text-brand-500" size={20} />
          <p className="font-display text-xl font-bold text-ink-900">{taskManagerStats.avgProcessingTime}</p>
          <p className="text-xs text-ink-500">Avg Processing Time</p>
        </Card>
      </div>

      <Card className="mt-6">
        <SectionTitle sub="Live scheduler view of feedback-processing jobs">Processing Queue</SectionTitle>
        <div className="space-y-3">
          {taskQueue.map((t) => (
            <div key={t.task} className="rounded-xl border border-ink-100 p-3">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink-900">{t.task}</p>
                <div className="flex items-center gap-2">
                  <PriorityPill priority={t.priority} />
                  <StatusPill status={t.status} />
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className={`h-full rounded-full ${t.status === 'Completed' ? 'bg-green-500' : t.status === 'Running' ? 'bg-amber-500' : 'bg-ink-300'}`}
                  style={{ width: `${t.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead className="border-b border-ink-100 bg-ink-100/30 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {taskQueue.map((t) => (
              <tr key={t.task} className="hover:bg-ink-100/20">
                <td className="px-4 py-3 text-ink-900">{t.task}</td>
                <td className="px-4 py-3"><PriorityPill priority={t.priority} /></td>
                <td className="px-4 py-3"><StatusPill status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
