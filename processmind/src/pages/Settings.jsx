import React, { useState } from 'react'
import { Card, PageHeader, SectionTitle } from '../components/ui.jsx'

export default function Settings({ user }) {
  const [notifications, setNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [anonymousDefault, setAnonymousDefault] = useState(false)

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Settings" description="Manage your ProcessMind profile and preferences." />

      <Card className="mb-6">
        <SectionTitle>Profile</SectionTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-500">Full Name</label>
            <input defaultValue={user.name} className="pm-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-500">Role</label>
            <input defaultValue={user.role} disabled className="pm-input capitalize opacity-70" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-500">Department</label>
            <input defaultValue={user.dept} className="pm-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-500">ID</label>
            <input defaultValue={user.id} disabled className="pm-input opacity-70" />
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Preferences</SectionTitle>
        <div className="space-y-4">
          {[
            { label: 'Email notifications for status updates', value: notifications, set: setNotifications },
            { label: 'Weekly digest of new insights', value: weeklyDigest, set: setWeeklyDigest },
            { label: 'Submit feedback anonymously by default', value: anonymousDefault, set: setAnonymousDefault },
          ].map((p) => (
            <label key={p.label} className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3 text-sm text-ink-700">
              {p.label}
              <input
                type="checkbox"
                checked={p.value}
                onChange={(e) => p.set(e.target.checked)}
                className="h-4 w-4 rounded border-ink-100 text-brand-600 focus:ring-brand-300"
              />
            </label>
          ))}
        </div>
        <button className="pm-btn-primary mt-6">Save Changes</button>
      </Card>
    </div>
  )
}
