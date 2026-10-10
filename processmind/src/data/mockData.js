// Centralized demo data. Replace these exports with real API calls when a backend is connected.

export const currentUser = {
  student: { name: 'Ananya Rao', id: 'STU-2291', role: 'student', dept: 'Computer Science' },
  faculty: { name: 'Dr. Kiran Mehta', id: 'FAC-0114', role: 'faculty', dept: 'Electronics' },
  admin: { name: 'Rahul Verma', id: 'ADM-0007', role: 'administrator', dept: 'Dean of Students' },
}

export const feedbackCategories = [
  'Course', 'Faculty', 'Infrastructure', 'Library', 'Wi-Fi', 'Hostel', 'Canteen', 'Events', 'Other',
]

export const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Business School', 'Library Services', 'Hostel Admin', 'IT Department', 'Canteen Services']

export const sentimentTrend = [
  { month: 'Apr', positive: 62, neutral: 24, negative: 14 },
  { month: 'May', positive: 58, neutral: 25, negative: 17 },
  { month: 'Jun', positive: 55, neutral: 24, negative: 21 },
  { month: 'Jul', positive: 60, neutral: 22, negative: 18 },
  { month: 'Aug', positive: 65, neutral: 21, negative: 14 },
  { month: 'Sep', positive: 70, neutral: 19, negative: 11 },
]

export const feedbackVolumeTrend = [
  { day: 'Mon', feedback: 42 },
  { day: 'Tue', feedback: 58 },
  { day: 'Wed', feedback: 51 },
  { day: 'Thu', feedback: 73 },
  { day: 'Fri', feedback: 64 },
  { day: 'Sat', feedback: 29 },
  { day: 'Sun', feedback: 18 },
]

export const sentimentBreakdown = [
  { name: 'Positive', value: 58, color: '#22c55e' },
  { name: 'Neutral', value: 24, color: '#a6a5bd' },
  { name: 'Negative', value: 18, color: '#ef4444' },
]

export const topicVolume = [
  { topic: 'Wi-Fi', mentions: 1245, sentimentNegative: 72, trend: 'up', priority: 'High' },
  { topic: 'Faculty', mentions: 980, sentimentNegative: 18, trend: 'down', priority: 'Low' },
  { topic: 'Infrastructure', mentions: 874, sentimentNegative: 46, trend: 'up', priority: 'Medium' },
  { topic: 'Exams', mentions: 760, sentimentNegative: 38, trend: 'flat', priority: 'Medium' },
  { topic: 'Assignments', mentions: 640, sentimentNegative: 30, trend: 'down', priority: 'Low' },
  { topic: 'Library', mentions: 520, sentimentNegative: 22, trend: 'down', priority: 'Low' },
  { topic: 'Hostel', mentions: 812, sentimentNegative: 64, trend: 'up', priority: 'High' },
  { topic: 'Canteen', mentions: 690, sentimentNegative: 58, trend: 'up', priority: 'High' },
  { topic: 'Events', mentions: 455, sentimentNegative: 12, trend: 'down', priority: 'Low' },
]

export const aiInsights = [
  { id: 1, text: 'Many students mentioned Wi-Fi problems during evening hours.', tag: 'Infrastructure', severity: 'high' },
  { id: 2, text: 'Students showed positive sentiment toward the recent technical workshop.', tag: 'Events', severity: 'positive' },
  { id: 3, text: 'Repeated complaints about canteen waiting time were detected.', tag: 'Canteen', severity: 'medium' },
  { id: 4, text: 'Hostel maintenance issues require attention in Block C.', tag: 'Hostel', severity: 'high' },
  { id: 5, text: 'Faculty feedback for the Data Structures course improved 20% this month.', tag: 'Faculty', severity: 'positive' },
]

export const events = [
  {
    id: 'evt-1', name: 'Tech Fest 2026', date: '2026-08-12', attendees: 1240, avgRating: 4.5,
    participationRate: 82, positivePct: 88, negativePct: 6,
    satisfaction: [{ label: 'Content', score: 4.6 }, { label: 'Organization', score: 4.2 }, { label: 'Venue', score: 4.4 }, { label: 'Networking', score: 4.1 }],
    sentiment: [{ name: 'Positive', value: 88, color: '#22c55e' }, { name: 'Neutral', value: 6, color: '#a6a5bd' }, { name: 'Negative', value: 6, color: '#ef4444' }],
    categories: [{ name: 'Content', mentions: 320 }, { name: 'Logistics', mentions: 180 }, { name: 'Speakers', mentions: 260 }, { name: 'Food', mentions: 90 }],
  },
  {
    id: 'evt-2', name: 'Cultural Fest', date: '2026-07-05', attendees: 2100, avgRating: 4.7,
    participationRate: 91, positivePct: 92, negativePct: 3,
    satisfaction: [{ label: 'Content', score: 4.8 }, { label: 'Organization', score: 4.5 }, { label: 'Venue', score: 4.6 }, { label: 'Networking', score: 4.3 }],
    sentiment: [{ name: 'Positive', value: 92, color: '#22c55e' }, { name: 'Neutral', value: 5, color: '#a6a5bd' }, { name: 'Negative', value: 3, color: '#ef4444' }],
    categories: [{ name: 'Performances', mentions: 410 }, { name: 'Logistics', mentions: 150 }, { name: 'Food Stalls', mentions: 300 }, { name: 'Crowd Mgmt', mentions: 120 }],
  },
  {
    id: 'evt-3', name: 'Hackathon', date: '2026-06-20', attendees: 380, avgRating: 4.1,
    participationRate: 74, positivePct: 71, negativePct: 18,
    satisfaction: [{ label: 'Content', score: 4.3 }, { label: 'Organization', score: 3.6 }, { label: 'Venue', score: 3.9 }, { label: 'Mentorship', score: 4.0 }],
    sentiment: [{ name: 'Positive', value: 71, color: '#22c55e' }, { name: 'Neutral', value: 11, color: '#a6a5bd' }, { name: 'Negative', value: 18, color: '#ef4444' }],
    categories: [{ name: 'Wi-Fi', mentions: 140 }, { name: 'Mentorship', mentions: 110 }, { name: 'Prizes', mentions: 90 }, { name: 'Food', mentions: 60 }],
  },
  {
    id: 'evt-4', name: 'Sports Meet', date: '2026-05-14', attendees: 1560, avgRating: 4.3,
    participationRate: 78, positivePct: 80, negativePct: 9,
    satisfaction: [{ label: 'Content', score: 4.4 }, { label: 'Organization', score: 4.0 }, { label: 'Venue', score: 4.5 }, { label: 'Refreshments', score: 3.8 }],
    sentiment: [{ name: 'Positive', value: 80, color: '#22c55e' }, { name: 'Neutral', value: 11, color: '#a6a5bd' }, { name: 'Negative', value: 9, color: '#ef4444' }],
    categories: [{ name: 'Scheduling', mentions: 200 }, { name: 'Facilities', mentions: 170 }, { name: 'Refreshments', mentions: 130 }, { name: 'Umpiring', mentions: 80 }],
  },
  {
    id: 'evt-5', name: 'AI Workshop', date: '2026-04-02', attendees: 210, avgRating: 4.6,
    participationRate: 85, positivePct: 89, negativePct: 5,
    satisfaction: [{ label: 'Content', score: 4.8 }, { label: 'Organization', score: 4.4 }, { label: 'Venue', score: 4.2 }, { label: 'Q&A', score: 4.5 }],
    sentiment: [{ name: 'Positive', value: 89, color: '#22c55e' }, { name: 'Neutral', value: 6, color: '#a6a5bd' }, { name: 'Negative', value: 5, color: '#ef4444' }],
    categories: [{ name: 'Content Depth', mentions: 150 }, { name: 'Pace', mentions: 60 }, { name: 'Hands-on Labs', mentions: 120 }, { name: 'Venue', mentions: 40 }],
  },
]

export const sentimentTable = [
  { id: 1, feedback: 'Library facilities are good and well maintained.', sentiment: 'Positive', confidence: 94, department: 'Library Services', category: 'Library', date: '2026-09-14' },
  { id: 2, feedback: 'Wi-Fi is very slow in the hostel after 8 PM.', sentiment: 'Negative', confidence: 91, department: 'IT Department', category: 'Wi-Fi', date: '2026-09-13' },
  { id: 3, feedback: 'Classes are okay, nothing special this week.', sentiment: 'Neutral', confidence: 86, department: 'Computer Science', category: 'Course', date: '2026-09-13' },
  { id: 4, feedback: 'The canteen queue took over 30 minutes at lunch.', sentiment: 'Negative', confidence: 89, department: 'Canteen Services', category: 'Canteen', date: '2026-09-12' },
  { id: 5, feedback: 'Professor explained the topic very clearly today.', sentiment: 'Positive', confidence: 96, department: 'Electronics', category: 'Faculty', date: '2026-09-12' },
  { id: 6, feedback: 'Hostel room needs urgent plumbing repair.', sentiment: 'Negative', confidence: 93, department: 'Hostel Admin', category: 'Hostel', date: '2026-09-11' },
  { id: 7, feedback: 'The tech fest was well organized and fun.', sentiment: 'Positive', confidence: 92, department: 'Business School', category: 'Events', date: '2026-09-10' },
  { id: 8, feedback: 'Assignment deadlines feel a bit tight this semester.', sentiment: 'Neutral', confidence: 81, department: 'Mechanical', category: 'Course', date: '2026-09-09' },
]

export const priorityIssues = {
  critical: [
    { id: 'ISS-101', title: 'Hostel Block C water supply irregular', category: 'Hostel', affected: 480, negativeSentiment: 84, date: '2026-09-10', department: 'Hostel Admin', status: 'In Progress' },
  ],
  high: [
    { id: 'ISS-102', title: 'Slow Wi-Fi in Block A', category: 'Wi-Fi', affected: 342, negativeSentiment: 78, date: '2026-09-08', department: 'IT Department', status: 'In Progress' },
    { id: 'ISS-103', title: 'Canteen waiting time during lunch hours', category: 'Canteen', affected: 290, negativeSentiment: 71, date: '2026-09-07', department: 'Canteen Services', status: 'Assigned' },
  ],
  medium: [
    { id: 'ISS-104', title: 'Projector issues in Civil Engineering block', category: 'Infrastructure', affected: 120, negativeSentiment: 52, date: '2026-09-05', department: 'Civil', status: 'Assigned' },
    { id: 'ISS-105', title: 'Exam schedule clashes for elective courses', category: 'Exams', affected: 96, negativeSentiment: 44, date: '2026-09-04', department: 'Computer Science', status: 'Detected' },
  ],
  low: [
    { id: 'ISS-106', title: 'Library extended hours request', category: 'Library', affected: 58, negativeSentiment: 20, date: '2026-09-02', department: 'Library Services', status: 'Detected' },
  ],
}

export const actionTrackingItems = [
  { id: 'ACT-01', problem: 'Slow Wi-Fi in Block A', department: 'IT Department', assignedTo: 'Sanjay Iyer', deadline: '2026-09-25', status: 'In Progress', actionTaken: 'New access points ordered; installation scheduled.', resolutionDate: null },
  { id: 'ACT-02', problem: 'Hostel Block C water supply', department: 'Hostel Admin', assignedTo: 'Meera Nair', deadline: '2026-09-20', status: 'Assigned', actionTaken: 'Plumbing team notified, inspection pending.', resolutionDate: null },
  { id: 'ACT-03', problem: 'Canteen waiting time', department: 'Canteen Services', assignedTo: 'Arjun Das', deadline: '2026-09-18', status: 'Resolved', actionTaken: 'Added a second billing counter during peak hours.', resolutionDate: '2026-09-16' },
  { id: 'ACT-04', problem: 'Projector issues in Civil block', department: 'Civil', assignedTo: 'Priya Menon', deadline: '2026-09-22', status: 'Verified', actionTaken: 'Replaced projector bulbs and cabling in 3 rooms.', resolutionDate: '2026-09-14' },
  { id: 'ACT-05', problem: 'Library extended hours request', department: 'Library Services', assignedTo: 'Unassigned', deadline: '—', status: 'Detected', actionTaken: '—', resolutionDate: null },
]

export const improvementComparison = [
  { issue: 'Wi-Fi Issue', before: 72, after: 28 },
  { issue: 'Canteen Wait', before: 58, after: 24 },
  { issue: 'Hostel Maintenance', before: 64, after: 35 },
  { issue: 'Exam Scheduling', before: 44, after: 19 },
]

export const improvementStats = {
  issuesResolved: 26,
  satisfactionImprovement: 18,
  avgResponseTime: '3.2 days',
  recurringIssues: 4,
  improvementPercentage: 42,
}

export const feedbackTable = [
  { id: 'FB-2291', student: 'Anonymous', date: '2026-09-14', category: 'Wi-Fi', feedback: 'Wi-Fi disconnects frequently in the library after 6 PM.', sentiment: 'Negative', topic: 'Wi-Fi', priority: 'High', status: 'In Progress' },
  { id: 'FB-2290', student: 'STU-1042', date: '2026-09-14', category: 'Faculty', feedback: 'Professor Sharma\'s lectures are very engaging.', sentiment: 'Positive', topic: 'Faculty', priority: 'Low', status: 'Reviewed' },
  { id: 'FB-2289', student: 'Anonymous', date: '2026-09-13', category: 'Hostel', feedback: 'No hot water in Block C for three days.', sentiment: 'Negative', topic: 'Hostel', priority: 'Critical', status: 'In Progress' },
  { id: 'FB-2288', student: 'STU-1187', date: '2026-09-13', category: 'Canteen', feedback: 'Food quality has improved this month.', sentiment: 'Positive', topic: 'Canteen', priority: 'Low', status: 'Reviewed' },
  { id: 'FB-2287', student: 'Anonymous', date: '2026-09-12', category: 'Infrastructure', feedback: 'Classroom projector not working in room 204.', sentiment: 'Negative', topic: 'Infrastructure', priority: 'Medium', status: 'Assigned' },
  { id: 'FB-2286', student: 'STU-1330', date: '2026-09-12', category: 'Library', feedback: 'Library needs more seating during exam week.', sentiment: 'Neutral', topic: 'Library', priority: 'Medium', status: 'Detected' },
  { id: 'FB-2285', student: 'Anonymous', date: '2026-09-11', category: 'Events', feedback: 'The AI workshop was extremely informative.', sentiment: 'Positive', topic: 'Events', priority: 'Low', status: 'Reviewed' },
  { id: 'FB-2284', student: 'STU-1098', date: '2026-09-11', category: 'Course', feedback: 'Assignment deadlines are too close to exams.', sentiment: 'Neutral', topic: 'Exams', priority: 'Medium', status: 'Detected' },
  { id: 'FB-2283', student: 'Anonymous', date: '2026-09-10', category: 'Wi-Fi', feedback: 'Wi-Fi speed in Block A is unusable in the evening.', sentiment: 'Negative', topic: 'Wi-Fi', priority: 'High', status: 'In Progress' },
  { id: 'FB-2282', student: 'STU-1256', date: '2026-09-09', category: 'Faculty', feedback: 'Would appreciate more office hours from faculty.', sentiment: 'Neutral', topic: 'Faculty', priority: 'Low', status: 'Detected' },
]

export const aiPipelineSteps = [
  { title: 'Student Feedback', desc: 'Feedback and event responses are captured from students across channels.' },
  { title: 'AI Processing', desc: 'Raw text is cleaned, normalized and queued for analysis.' },
  { title: 'Sentiment Analysis', desc: 'Each response is scored as positive, neutral or negative.' },
  { title: 'Topic Detection', desc: 'NLP models cluster feedback into topics like Wi-Fi, Hostel, Faculty.' },
  { title: 'Recurring Issue Detection', desc: 'Similar complaints are grouped to detect repeated patterns.' },
  { title: 'Severity Analysis', desc: 'Impact is scored using volume, sentiment and urgency signals.' },
  { title: 'Priority', desc: 'Issues are ranked Critical, High, Medium or Low.' },
  { title: 'Recommendation', desc: 'The system suggests likely owners and next steps.' },
  { title: 'College Action', desc: 'Departments are assigned and act on the issue.' },
  { title: 'Improvement Measurement', desc: 'Sentiment is re-measured to confirm the issue improved.' },
]

export const taskQueue = [
  { task: 'Sentiment Analysis', priority: 'High', status: 'Running', progress: 62 },
  { task: 'Topic Detection', priority: 'Medium', status: 'Completed', progress: 100 },
  { task: 'Event Analysis', priority: 'High', status: 'Running', progress: 41 },
  { task: 'Report Generation', priority: 'Low', status: 'Waiting', progress: 0 },
  { task: 'Recurring Issue Scan', priority: 'Medium', status: 'Running', progress: 78 },
  { task: 'Severity Scoring', priority: 'High', status: 'Completed', progress: 100 },
]

export const taskManagerStats = {
  queueLength: 12,
  running: 3,
  completed: 128,
  priorityTasks: 4,
  workers: 6,
  avgProcessingTime: '1.8s',
}

export const reportTypes = [
  { id: 'daily', name: 'Daily Feedback Report', desc: 'Summary of all feedback submitted in the last 24 hours.' },
  { id: 'weekly', name: 'Weekly Feedback Report', desc: 'Trends and sentiment shifts over the past 7 days.' },
  { id: 'monthly', name: 'Monthly College Improvement Report', desc: 'Full month view of issues resolved and satisfaction change.' },
  { id: 'event', name: 'Event Analysis Report', desc: 'Attendance, sentiment and satisfaction breakdown per event.' },
  { id: 'department', name: 'Department Report', desc: 'Issues and resolution performance by department.' },
  { id: 'critical', name: 'Critical Issues Report', desc: 'All critical and high priority issues with current status.' },
]

export const studentActivity = [
  { id: 1, text: 'You submitted feedback on Wi-Fi connectivity.', time: '2 hours ago' },
  { id: 2, text: 'Your feedback on the AI Workshop was marked "Reviewed".', time: '1 day ago' },
  { id: 3, text: 'You attended Tech Fest 2026.', time: '3 days ago' },
  { id: 4, text: 'You submitted feedback on canteen service.', time: '5 days ago' },
]
