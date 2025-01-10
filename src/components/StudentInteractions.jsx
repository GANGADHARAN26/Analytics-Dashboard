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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'

function StudentInteractions() {
  const [timeRange, setTimeRange] = useState('day')
  const [subjectInteractions, setSubjectInteractions] = useState([])
  const [scrollDepth, setScrollDepth] = useState([])
  const [topicSearches, setTopicSearches] = useState([])
  const [assignmentData, setAssignmentData] = useState([])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff7300']

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateSubjectData = () => {
      const subjects = [
        { subject: 'Physics', topics: ['Mechanics', 'Electromagnetism', 'Optics'] },
        { subject: 'Chemistry', topics: ['Organic', 'Inorganic', 'Physical'] },
        { subject: 'Mathematics', topics: ['Calculus', 'Algebra', 'Trigonometry'] }
      ]

      return subjects.map(({ subject, topics }) => ({
        subject,
        lectureViews: Math.floor(Math.random() * 1000),
        labAttendance: Math.floor(Math.random() * 500),
        doubtSessions: Math.floor(Math.random() * 300),
        topics
      }))
    }

    const generateScrollDepth = () => {
      return [
        { section: '0-25%', physics: 800, chemistry: 750, maths: 900 },
        { section: '26-50%', physics: 600, chemistry: 550, maths: 700 },
        { section: '51-75%', physics: 400, chemistry: 350, maths: 500 },
        { section: '76-100%', physics: 200, chemistry: 150, maths: 300 }
      ]
    }

    const generateTopicSearches = () => {
      return [
        { term: 'Physics - Mechanics', count: Math.floor(Math.random() * 200) },
        { term: 'Chemistry - Organic', count: Math.floor(Math.random() * 180) },
        { term: 'Maths - Calculus', count: Math.floor(Math.random() * 220) },
        { term: 'Physics - Optics', count: Math.floor(Math.random() * 150) },
        { term: 'Chemistry - Physical', count: Math.floor(Math.random() * 160) }
      ]
    }

    const generateAssignmentData = () => {
      return {
        submissions: [
          { subject: 'Physics', completed: 300, pending: 50 },
          { subject: 'Chemistry', completed: 280, pending: 70 },
          { subject: 'Mathematics', completed: 320, pending: 40 }
        ]
      }
    }

    setSubjectInteractions(generateSubjectData())
    setScrollDepth(generateScrollDepth())
    setTopicSearches(generateTopicSearches())
    setAssignmentData(generateAssignmentData())
  }, [timeRange])

  return (
    <div className="interactions-dashboard">
      <div className="dashboard-controls">
        <h2>11th & 12th Grade Subject Analytics</h2>
        <div className="time-range-selector">
          <button
            className={timeRange === 'day' ? 'active' : ''}
            onClick={() => setTimeRange('day')}
          >
            24 Hours
          </button>
          <button
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
          >
            Monthly
          </button>
          <button
            className={timeRange === 'year' ? 'active' : ''}
            onClick={() => setTimeRange('year')}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="charts-grid">
        {/* Subject Interaction Distribution */}
        <div className="chart-container">
          <h3>Subject Engagement Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectInteractions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="lectureViews" fill="#8884d8" name="Lecture Views" />
              <Bar dataKey="labAttendance" fill="#82ca9d" name="Lab Attendance" />
              <Bar dataKey="doubtSessions" fill="#ffc658" name="Doubt Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Content Engagement Depth */}
        <div className="chart-container">
          <h3>Subject Content Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={scrollDepth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="physics" 
                stackId="1"
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Physics"
              />
              <Area 
                type="monotone" 
                dataKey="chemistry" 
                stackId="1"
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="Chemistry"
              />
              <Area 
                type="monotone" 
                dataKey="maths" 
                stackId="1"
                stroke="#ffc658" 
                fill="#ffc658" 
                name="Mathematics"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Most Searched Topics */}
        <div className="chart-container">
          <h3>Most Searched Topics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topicSearches}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="term" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="#8884d8" 
                name="Search Count"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Assignment Completion Status */}
        <div className="chart-container">
          <h3>Assignment Status by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assignmentData.submissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
              <Bar dataKey="pending" fill="#ff8042" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Subject Metrics Table */}
      <div className="metrics-table">
        <h3>Subject-wise Interaction Details</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Lecture Views</th>
              <th>Lab Attendance</th>
              <th>Doubt Sessions</th>
              <th>Key Topics</th>
            </tr>
          </thead>
          <tbody>
            {subjectInteractions.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.lectureViews}</td>
                <td>{item.labAttendance}</td>
                <td>{item.doubtSessions}</td>
                <td>{item.topics.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentInteractions 