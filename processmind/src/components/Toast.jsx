import React from 'react'
import { CheckCircle2, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-ink-900 px-4 py-3 text-sm text-white shadow-popover">
      <CheckCircle2 size={18} className="text-green-400" />
      <span>{message}</span>
      <button onClick={onClose} className="text-ink-300 hover:text-white">
        <X size={15} />
      </button>
    </div>
  )
}
