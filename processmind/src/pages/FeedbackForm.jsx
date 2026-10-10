import React, { useState } from 'react'
import { Star, CheckCircle2, Send } from 'lucide-react'
import { Card, PageHeader } from '../components/ui.jsx'
import { feedbackCategories, events } from '../data/mockData.js'

export default function FeedbackForm({ setPage }) {
  const [category, setCategory] = useState('Course')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [text, setText] = useState('')
  const [related, setRelated] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || rating === 0) return
    setSubmitted(true)
  }

  const resetForm = () => {
    setCategory('Course')
    setRating(0)
    setText('')
    setRelated('')
    setAnonymous(false)
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="font-display text-xl font-bold text-ink-900">
          Thank you! Your feedback has been submitted successfully.
        </h2>
        <p className="mt-2 text-sm text-ink-500">
          ProcessMind's AI will analyze your response for sentiment and topic within moments,
          and route it to the right department if action is needed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={resetForm} className="pm-btn-secondary">Submit Another</button>
          <button onClick={() => setPage('student-dashboard')} className="pm-btn-primary">Back to Dashboard</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Give Feedback"
        description="Your voice helps improve courses, faculty, facilities and campus life."
      />
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Feedback category</label>
            <div className="flex flex-wrap gap-2">
              {feedbackCategories.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    category === c
                      ? 'border-brand-500 bg-brand-600 text-white'
                      : 'border-ink-100 text-ink-500 hover:border-brand-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(n)}
                >
                  <Star
                    size={28}
                    className={
                      (hoverRating || rating) >= n
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-ink-100'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {(category === 'Events' || category === 'Course') && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">
                Related {category === 'Events' ? 'event' : 'course'} (optional)
              </label>
              <select value={related} onChange={(e) => setRelated(e.target.value)} className="pm-input">
                <option value="">Select {category === 'Events' ? 'an event' : 'a course'}</option>
                {category === 'Events'
                  ? events.map((ev) => <option key={ev.id} value={ev.name}>{ev.name}</option>)
                  : ['Data Structures', 'Digital Electronics', 'Thermodynamics', 'Business Analytics'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Your feedback</label>
            <textarea
              required
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell us what happened, what worked well, or what needs improvement..."
              className="pm-input resize-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 rounded border-ink-100 text-brand-600 focus:ring-brand-300"
            />
            Submit this feedback anonymously
          </label>

          <button type="submit" className="pm-btn-primary w-full py-3">
            <Send size={16} />
            Submit Feedback
          </button>
        </form>
      </Card>
    </div>
  )
}
