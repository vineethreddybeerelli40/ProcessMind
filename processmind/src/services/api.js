const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `API request failed: ${response.status}`)
  }
  return response.json()
}

export const api = {
  feedback: () => apiFetch('/api/feedback'),
  submitFeedback: (payload) => apiFetch('/api/feedback', { method: 'POST', body: JSON.stringify(payload) }),
  dashboard: () => apiFetch('/api/dashboard'),
  issues: () => apiFetch('/api/issues'),
  processes: () => apiFetch('/api/processes'),
  systemStatus: () => apiFetch('/api/system-status'),
  osConcepts: () => apiFetch('/api/os-concepts'),
  events: () => apiFetch('/api/events'),
  actions: () => apiFetch('/api/actions'),
  updateAction: (payload) => apiFetch('/api/actions', { method: 'POST', body: JSON.stringify(payload) }),
  updateActionById: (id, payload) => apiFetch(`/api/actions/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
}
