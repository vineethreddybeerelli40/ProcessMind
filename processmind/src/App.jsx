import React, { useState } from 'react'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import FeedbackForm from './pages/FeedbackForm.jsx'
import StudentMyFeedback from './pages/StudentMyFeedback.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EventIntelligence from './pages/EventIntelligence.jsx'
import SentimentAnalysis from './pages/SentimentAnalysis.jsx'
import TopicAnalysis from './pages/TopicAnalysis.jsx'
import PriorityIssues from './pages/PriorityIssues.jsx'
import ActionTracking from './pages/ActionTracking.jsx'
import MeasureImprovement from './pages/MeasureImprovement.jsx'
import FeedbackManagement from './pages/FeedbackManagement.jsx'
import AIProcessing from './pages/AIProcessing.jsx'
import TaskManager from './pages/TaskManager.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import { currentUser } from './data/mockData.js'

export default function App() {
  const [session, setSession] = useState(null) // 'student' | 'faculty' | 'administrator'
  const [page, setPage] = useState('student-dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogin = (role) => {
    setSession(role)
    setPage(role === 'administrator' || role === 'faculty' ? 'admin-dashboard' : 'student-dashboard')
  }

  const handleLogout = () => {
    setSession(null)
    setPage('student-dashboard')
  }

  if (!session) {
    return <Login onLogin={handleLogin} />
  }

  const user = currentUser[session === 'faculty' ? 'faculty' : session === 'administrator' ? 'admin' : 'student']
  const role = session === 'faculty' ? 'administrator' : session // faculty sees admin-style intelligence views

  const renderPage = () => {
    switch (page) {
      case 'student-dashboard':
        return <StudentDashboard user={user} setPage={setPage} />
      case 'feedback-form':
        return <FeedbackForm setPage={setPage} />
      case 'student-my-feedback':
        return <StudentMyFeedback setPage={setPage} />
      case 'admin-dashboard':
        return <AdminDashboard setPage={setPage} />
      case 'feedback-management':
        return <FeedbackManagement />
      case 'event-intelligence':
        return <EventIntelligence />
      case 'sentiment-analysis':
        return <SentimentAnalysis />
      case 'topic-analysis':
        return <TopicAnalysis />
      case 'priority-issues':
        return <PriorityIssues />
      case 'action-tracking':
        return <ActionTracking />
      case 'measure-improvement':
        return <MeasureImprovement />
      case 'reports':
        return <Reports />
      case 'ai-processing':
        return <AIProcessing />
      case 'task-manager':
        return <TaskManager />
      case 'settings':
        return <Settings user={user} />
      default:
        return <AdminDashboard setPage={setPage} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6fc]">
      <Sidebar
        role={role}
        page={page}
        setPage={setPage}
        user={user}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar page={page} setMobileOpen={setMobileOpen} user={user} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">{renderPage()}</main>
      </div>
    </div>
  )
}
