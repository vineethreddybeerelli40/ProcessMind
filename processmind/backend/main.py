from __future__ import annotations

import multiprocessing as mp
import os
import platform
import queue
import sqlite3
import threading
import time
import uuid
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import psutil
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "processmind.db"
PRIORITY_VALUES = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def connect_db() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH, timeout=30)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    with connect_db() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS feedback (
                id TEXT PRIMARY KEY, student_id TEXT, category TEXT NOT NULL,
                text TEXT NOT NULL, rating INTEGER NOT NULL, anonymous INTEGER NOT NULL,
                related TEXT, date TEXT NOT NULL, status TEXT NOT NULL,
                sentiment TEXT, confidence INTEGER, topic TEXT, severity TEXT,
                priority TEXT, recurring INTEGER DEFAULT 0, worker_pid INTEGER,
                started_at TEXT, completed_at TEXT
            );
            CREATE TABLE IF NOT EXISTS events (
                id TEXT PRIMARY KEY, name TEXT NOT NULL, date TEXT NOT NULL,
                attendees INTEGER NOT NULL, feedback INTEGER DEFAULT 0,
                sentiment TEXT DEFAULT 'Neutral', issues TEXT DEFAULT '', event_score REAL DEFAULT 0
            );
            CREATE TABLE IF NOT EXISTS actions (
                id TEXT PRIMARY KEY, issue TEXT NOT NULL, priority TEXT NOT NULL,
                team TEXT NOT NULL, responsible TEXT NOT NULL, status TEXT NOT NULL,
                action_taken TEXT NOT NULL, improvement_result TEXT DEFAULT ''
            );
            """
        )
        if db.execute("SELECT COUNT(*) FROM events").fetchone()[0] == 0:
            db.executemany("INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
                ("evt-1", "Tech Fest 2026", "2026-08-12", 1240, 312, "Positive", "Logistics", 88),
                ("evt-2", "Cultural Fest", "2026-07-05", 2100, 460, "Positive", "Crowd management", 92),
                ("evt-3", "Hackathon", "2026-06-20", 380, 142, "Mixed", "Wi-Fi", 71),
            ])
        if db.execute("SELECT COUNT(*) FROM actions").fetchone()[0] == 0:
            db.executemany("INSERT INTO actions VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
                ("ACT-01", "Slow Wi-Fi in Block A", "High", "IT Department", "Sanjay Iyer", "In Progress", "New access points ordered", "Awaiting installation"),
                ("ACT-02", "Hostel Block C water supply", "Critical", "Hostel Admin", "Meera Nair", "Assigned", "Plumbing team notified", "Inspection pending"),
                ("ACT-03", "Canteen waiting time", "Medium", "Canteen Services", "Arjun Das", "Resolved", "Second billing counter added", "Negative sentiment down 34%"),
            ])


def analyze_feedback(feedback_id: str, text: str, category: str, rating: int) -> None:
    """Runs in a real child process and persists the analysis result."""
    started = now()
    worker_pid = os.getpid()
    lowered = text.lower()
    negative_words = ("bad", "slow", "broken", "no ", "poor", "unsafe", "urgent", "problem", "issue", "not working")
    critical_words = ("fire", "danger", "unsafe", "harassment", "emergency", "injury", "no water")
    sentiment = "Negative" if any(word in lowered for word in negative_words) or rating <= 2 else "Positive" if rating >= 4 else "Neutral"
    topic_map = {
        "Wi-Fi": ("wifi", "wi-fi", "internet", "network"), "Hostel": ("hostel", "room", "water", "plumbing"),
        "Infrastructure": ("projector", "classroom", "building", "fan", "electricity"), "Canteen": ("canteen", "food", "queue"),
        "Faculty": ("professor", "faculty", "teacher", "lecture"), "Events": ("event", "workshop", "fest"),
    }
    topic = next((name for name, words in topic_map.items() if any(word in lowered for word in words)), category)
    severity = "Critical" if any(word in lowered for word in critical_words) else "High" if sentiment == "Negative" and rating <= 2 else "Medium" if sentiment == "Negative" else "Low"
    priority = severity if severity in PRIORITY_VALUES else "Low"
    time.sleep(0.15)
    with connect_db() as db:
        previous = db.execute("SELECT COUNT(*) FROM feedback WHERE topic = ? AND id != ?", (topic, feedback_id)).fetchone()[0]
        db.execute("""UPDATE feedback SET status='Completed', sentiment=?, confidence=?, topic=?, severity=?,
            priority=?, recurring=?, worker_pid=?, started_at=?, completed_at=? WHERE id=?""",
            (sentiment, 92 if sentiment != "Neutral" else 84, topic, severity, priority, int(previous > 0), worker_pid, started, now(), feedback_id))


class FeedbackRequest(BaseModel):
    category: str = "Other"
    text: str = Field(min_length=3)
    rating: int = Field(ge=1, le=5)
    anonymous: bool = False
    related: str = ""
    student_id: str = "STU-2291"


class EventRequest(BaseModel):
    name: str
    date: str
    attendees: int = 0
    feedback: int = 0
    sentiment: str = "Neutral"
    issues: str = ""
    event_score: float = 0


class ActionRequest(BaseModel):
    issue: str
    priority: str = "Medium"
    team: str
    responsible: str = "Unassigned"
    status: str = "Detected"
    action_taken: str = ""
    improvement_result: str = ""


class ProcessManager:
    def __init__(self, workers: int = 3):
        self.pending: queue.PriorityQueue = queue.PriorityQueue()
        self.active: dict[str, dict[str, Any]] = {}
        self.sequence = 0
        self.lock = threading.Lock()
        self.worker_limit = workers
        self.completed = 0
        self.created = 0
        self.priority_counts = Counter()
        threading.Thread(target=self._dispatch, daemon=True).start()

    def submit(self, feedback_id: str, text: str, category: str, rating: int, priority: str) -> None:
        with self.lock:
            self.sequence += 1
            self.priority_counts[priority] += 1
            self.pending.put((PRIORITY_VALUES.get(priority, 3), self.sequence, (feedback_id, text, category, rating)))

    def _dispatch(self) -> None:
        while True:
            try:
                while len(self.active) < self.worker_limit:
                    _, _, task = self.pending.get(timeout=0.2)
                    feedback_id, text, category, rating = task
                    process = mp.Process(target=analyze_feedback, args=(feedback_id, text, category, rating))
                    process.start()
                    with self.lock:
                        self.created += 1
                        self.active[feedback_id] = {"process": process, "started_at": now(), "task": "Feedback Analysis"}
                    threading.Thread(target=self._watch, args=(feedback_id, process), daemon=True).start()
            except queue.Empty:
                pass
            time.sleep(0.05)

    def _watch(self, feedback_id: str, process: mp.Process) -> None:
        process.join()
        with self.lock:
            self.completed += 1
            self.active.pop(feedback_id, None)

    def processes(self) -> list[dict[str, Any]]:
        rows = []
        with self.lock:
            active = dict(self.active)
        for feedback_id, entry in active.items():
            process = entry["process"]
            rows.append({"pid": process.pid, "task": entry["task"], "task_name": entry["task"], "feedback_id": feedback_id,
                         "status": "Running", "priority": _feedback_priority(feedback_id), "start_time": entry["started_at"],
                         "completion_time": None, **_process_metrics(process.pid)})
        return rows

    def os_snapshot(self) -> dict[str, Any]:
        with self.lock:
            return {"processes_created": self.created, "processes_completed": self.completed,
                    "priority_counts": dict(self.priority_counts), "active_workers": len(self.active),
                    "worker_limit": self.worker_limit, "queue_items": self.pending.qsize()}


def _feedback_priority(feedback_id: str) -> str:
    with connect_db() as db:
        row = db.execute("SELECT priority FROM feedback WHERE id=?", (feedback_id,)).fetchone()
    return row[0] if row and row[0] else "Medium"


def _process_metrics(pid: int | None) -> dict[str, Any]:
    if not pid:
        return {"cpu_usage": 0, "memory_usage_mb": 0}
    try:
        process = psutil.Process(pid)
        return {"cpu_usage": round(process.cpu_percent(interval=0.02), 2), "memory_usage_mb": round(process.memory_info().rss / 1024 / 1024, 2)}
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        return {"cpu_usage": 0, "memory_usage_mb": 0}


init_db()
manager = ProcessManager()
app = FastAPI(title="ProcessMind WSL API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], allow_methods=["*"], allow_headers=["*"])


@app.get("/")
def root() -> dict[str, Any]:
    return {"service": "ProcessMind WSL API", "status": "ok", "docs": "/docs", "health": "/api/health", "api_prefix": "/api"}


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "backend": "FastAPI in WSL", "database": str(DB_PATH)}


@app.post("/api/feedback", status_code=202)
def create_feedback(payload: FeedbackRequest) -> dict[str, Any]:
    feedback_id = f"FB-{uuid.uuid4().hex[:8].upper()}"
    lower = payload.text.lower()
    priority = "Critical" if any(word in lower for word in ("fire", "danger", "unsafe", "emergency", "injury")) else "High" if payload.rating <= 2 else "Medium" if payload.rating == 3 else "Low"
    with connect_db() as db:
        db.execute("INSERT INTO feedback (id, student_id, category, text, rating, anonymous, related, date, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   (feedback_id, payload.student_id, payload.category, payload.text, payload.rating, int(payload.anonymous), payload.related, now(), "Queued", priority))
    manager.submit(feedback_id, payload.text, payload.category, payload.rating, priority)
    return {"id": feedback_id, "status": "Queued", "priority": priority, "message": "Feedback queued for WSL analysis"}


@app.get("/api/feedback")
def list_feedback() -> list[dict[str, Any]]:
    with connect_db() as db:
        return [dict(row) for row in db.execute("SELECT id, student_id AS student, date, category, text AS feedback, sentiment, topic, priority, status, confidence, severity, recurring FROM feedback ORDER BY date DESC")]


@app.get("/api/feedback/{feedback_id}")
def get_feedback(feedback_id: str) -> dict[str, Any]:
    with connect_db() as db:
        row = db.execute("SELECT * FROM feedback WHERE id=?", (feedback_id,)).fetchone()
    if not row:
        raise HTTPException(404, "Feedback not found")
    return dict(row)


@app.get("/api/issues")
def issues() -> list[dict[str, Any]]:
    with connect_db() as db:
        rows = db.execute("SELECT topic, priority, COUNT(*) AS affected, SUM(CASE WHEN sentiment='Negative' THEN 1 ELSE 0 END) AS negative_count FROM feedback WHERE topic IS NOT NULL GROUP BY topic, priority ORDER BY affected DESC").fetchall()
    return [dict(row) for row in rows]


@app.get("/api/dashboard")
def dashboard() -> dict[str, Any]:
    with connect_db() as db:
        rows = [dict(row) for row in db.execute("SELECT * FROM feedback ORDER BY date DESC").fetchall()]
    sentiments = Counter(row["sentiment"] for row in rows if row["sentiment"])
    topics = Counter(row["topic"] for row in rows if row["topic"])
    return {"total_feedback": len(rows), "positive": sentiments["Positive"], "negative": sentiments["Negative"], "neutral": sentiments["Neutral"],
            "critical_issues": sum(row.get("priority") == "Critical" for row in rows), "priority_distribution": dict(Counter(row.get("priority") for row in rows)),
            "top_topics": [{"topic": topic, "mentions": count} for topic, count in topics.most_common(8)], "recent_feedback": rows[:8]}


@app.get("/api/processes")
def processes() -> list[dict[str, Any]]:
    return manager.processes()


@app.get("/api/system-status")
def system_status() -> dict[str, Any]:
    return {"platform": "Linux/WSL" if os.name == "posix" else "Windows (use WSL for OSSP demo)", "hostname": platform.node(), "cpu_percent": psutil.cpu_percent(interval=0.1), "memory_percent": psutil.virtual_memory().percent,
            "worker_count": manager.worker_limit, "queue_length": manager.pending.qsize(), "running": len(manager.active), "processes": manager.processes()}


@app.get("/api/os-concepts")
def os_concepts() -> dict[str, Any]:
    """Evidence endpoint used by the OS Concepts view and faculty demo."""
    snapshot = manager.os_snapshot()
    return {"platform": "Linux/WSL" if os.name == "posix" else "Windows (run backend in WSL for Linux evidence)",
            "scheduler": {"algorithm": "Priority scheduling", "priority_order": ["Critical", "High", "Medium", "Low"], "queue_type": "queue.PriorityQueue"},
            "process_management": {"creation": "multiprocessing.Process", "concurrency": snapshot["worker_limit"], "status_source": "psutil.Process + /proc-compatible metrics"},
            "synchronization": {"primitive": "threading.Lock", "protected_state": "queue, active workers, counters"},
            "background_processing": True, "resource_monitoring": {"cpu_percent": psutil.cpu_percent(interval=0.1), "memory_percent": psutil.virtual_memory().percent},
            "snapshot": snapshot, "processes": manager.processes()}


@app.get("/api/events")
def list_events() -> list[dict[str, Any]]:
    with connect_db() as db:
        return [dict(row) for row in db.execute("SELECT * FROM events ORDER BY date DESC")]


@app.post("/api/events", status_code=201)
def create_event(payload: EventRequest) -> dict[str, Any]:
    event_id = f"evt-{uuid.uuid4().hex[:6]}"
    with connect_db() as db:
        db.execute("INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (event_id, payload.name, payload.date, payload.attendees, payload.feedback, payload.sentiment, payload.issues, payload.event_score))
    return {"id": event_id, **payload.model_dump()}


@app.get("/api/actions")
def list_actions() -> list[dict[str, Any]]:
    with connect_db() as db:
        return [dict(row) for row in db.execute("SELECT * FROM actions ORDER BY CASE priority WHEN 'Critical' THEN 0 WHEN 'High' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END")]


@app.post("/api/actions", status_code=201)
def create_action(payload: ActionRequest) -> dict[str, Any]:
    action_id = f"ACT-{uuid.uuid4().hex[:6].upper()}"
    with connect_db() as db:
        db.execute("INSERT INTO actions VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (action_id, payload.issue, payload.priority, payload.team, payload.responsible, payload.status, payload.action_taken, payload.improvement_result))
    return {"id": action_id, **payload.model_dump()}


@app.put("/api/actions/{action_id}")
def update_action(action_id: str, payload: ActionRequest) -> dict[str, Any]:
    with connect_db() as db:
        cursor = db.execute("UPDATE actions SET issue=?, priority=?, team=?, responsible=?, status=?, action_taken=?, improvement_result=? WHERE id=?",
                            (payload.issue, payload.priority, payload.team, payload.responsible, payload.status, payload.action_taken, payload.improvement_result, action_id))
    if cursor.rowcount == 0:
        raise HTTPException(404, "Action not found")
    return {"id": action_id, **payload.model_dump()}