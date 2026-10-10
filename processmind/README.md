# ProcessMind

AI-Powered Student Voice, Event Intelligence & College Improvement Platform — frontend.

Built with **React + Vite + Tailwind CSS**, using **Recharts** for charts and **lucide-react** for icons.
All data in `src/data/mockData.js` is realistic demo data — no backend is wired up yet, but every
component reads from that one file, so swapping in real API calls later is a matter of replacing
those exports with fetched data.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/       Reusable UI: Sidebar, Topbar, Toast, and shared primitives (Card, StatCard, pills…)
  pages/            One file per screen (Login, dashboards, Sentiment Analysis, Topic Analysis, etc.)
  data/mockData.js  All demo/mock data used across the app — replace with real API calls later
  App.jsx           Auth/session state + client-side page routing (no react-router, just state)
  main.jsx          React entry point
  index.css         Tailwind directives + small reusable utility classes (pm-card, pm-btn-primary…)
```

## Concept

The app demonstrates the ProcessMind workflow:

**Capture → Connect → Understand → Prioritize → Act → Measure**

- **Students** submit feedback and event feedback (Feedback Form, My Feedback).
- **Administrators** see AI-generated sentiment, topics, priority issues, action tracking and
  before/after improvement measurement, plus a Reports page and a small "OS-style" Task Manager
  view representing the backend processing queue.

## Roles

The login screen lets you pick Student, Faculty or Administrator, or use "Demo Login" to skip
straight in — no real authentication is implemented, since this is a frontend-only preview.

## Connecting a real backend later

Every page imports its data from `src/data/mockData.js`. To connect a backend:
1. Replace the static exports with `fetch`/API calls (e.g. inside `useEffect` + `useState`, or a
   data-fetching library of your choice).
2. Keep the same shape of objects/arrays so components don't need to change.
3. Wire the Feedback Form's `onSubmit` and Action Tracking's action buttons to real API calls.
