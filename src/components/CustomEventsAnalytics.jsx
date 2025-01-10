import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts'

function CustomEventsAnalytics() {
  const [timeRange, setTimeRange] = useState('day')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [quizData, setQuizData] = useState([])
  const [practiceData, setPracticeData] = useState([])
  const [doubtSessionData, setDoubtSessionData] = useState([])
  const [engagementScores, setEngagementScores] = useState([])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c43', '#a4de6c', '#d0ed57']
  const subjects = ['All Subjects', 'Physics', 'Chemistry', 'Mathematics']

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateQuizData = () => {
      return [
        { 
          subject: 'Physics',
          attempted: Math.floor(Math.random() * 200),
          completed: Math.floor(Math.random() * 150),
          avgScore: Math.floor(Math.random() * 40) + 60,
          retakes: Math.floor(Math.random() * 50)
        },
        { 
          subject: 'Chemistry',
          attempted: Math.floor(Math.random() * 200),
          completed: Math.floor(Math.random() * 150),
          avgScore: Math.floor(Math.random() * 40) + 60,
          retakes: Math.floor(Math.random() * 50)
        },
        { 
          subject: 'Mathematics',
          attempted: Math.floor(Math.random() * 200),
          completed: Math.floor(Math.random() * 150),
          avgScore: Math.floor(Math.random() * 40) + 60,
          retakes: Math.floor(Math.random() * 50)
        }
      ]
    }

    const generatePracticeData = () => {
      return Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        problemsSolved: Math.floor(Math.random() * 100),
        uniqueStudents: Math.floor(Math.random() * 50),
        avgAttempts: Math.floor(Math.random() * 3) + 1
      }))
    }

    const generateDoubtSessionData = () => {
      return [
        { category: 'Concept Clarification', count: Math.floor(Math.random() * 100) },
        { category: 'Problem Solving', count: Math.floor(Math.random() * 80) },
        { category: 'Lab Related', count: Math.floor(Math.random() * 60) },
        { category: 'Exam Preparation', count: Math.floor(Math.random() * 90) },
        { category: 'Assignment Help', count: Math.floor(Math.random() * 70) }
      ]
    }

    const generateEngagementScores = () => {
      return Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        physics: Math.floor(Math.random() * 50) + 50,
        chemistry: Math.floor(Math.random() * 50) + 50,
        mathematics: Math.floor(Math.random() * 50) + 50
      }))
    }

    setQuizData(generateQuizData())
    setPracticeData(generatePracticeData())
    setDoubtSessionData(generateDoubtSessionData())
    setEngagementScores(generateEngagementScores())
  }, [timeRange, selectedSubject])

  return (
    <div className="custom-events-dashboard">
      <div className="dashboard-controls">
        <h2>Learning Activities Analysis</h2>
        <div className="control-row">
          <div className="time-range-selector">
            <button
              className={timeRange === 'day' ? 'active' : ''}
              onClick={() => setTimeRange('day')}
            >
              24 Hours
            </button>
            <button
              className={timeRange === 'week' ? 'active' : ''}
              onClick={() => setTimeRange('week')}
            >
              Weekly
            </button>
            <button
              className={timeRange === 'month' ? 'active' : ''}
              onClick={() => setTimeRange('month')}
            >
              Monthly
            </button>
          </div>
          <div className="subject-selector">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject.toLowerCase()}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Quiz Performance Analysis */}
        <div className="chart-container">
          <h3>Quiz Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={quizData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="attempted" fill="#8884d8" name="Attempted" />
              <Bar yAxisId="left" dataKey="completed" fill="#82ca9d" name="Completed" />
              <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#ff7300" name="Avg Score" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Practice Problems Engagement */}
        <div className="chart-container">
          <h3>Daily Practice Problems Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={practiceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="problemsSolved" fill="#8884d8" name="Problems Solved" />
              <Bar dataKey="uniqueStudents" fill="#82ca9d" name="Unique Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Doubt Session Categories */}
        <div className="chart-container">
          <h3>Doubt Session Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={doubtSessionData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {doubtSessionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Engagement Scores */}
        <div className="chart-container">
          <h3>Subject-wise Engagement Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="physics" stroke="#8884d8" name="Physics" />
              <Line type="monotone" dataKey="chemistry" stroke="#82ca9d" name="Chemistry" />
              <Line type="monotone" dataKey="mathematics" stroke="#ffc658" name="Mathematics" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="metrics-table">
        <h3>Subject-wise Learning Activities</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Quizzes Attempted</th>
              <th>Completion Rate</th>
              <th>Avg Score</th>
              <th>Practice Problems</th>
              <th>Doubt Sessions</th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subject}</td>
                <td>{subject.attempted}</td>
                <td>{((subject.completed / subject.attempted) * 100).toFixed(1)}%</td>
                <td>{subject.avgScore}%</td>
                <td>{Math.floor(Math.random() * 200)}</td>
                <td>{Math.floor(Math.random() * 50)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomEventsAnalytics 