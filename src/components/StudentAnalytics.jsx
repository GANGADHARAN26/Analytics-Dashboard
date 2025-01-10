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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart
} from 'recharts'

function StudentAnalytics() {
  const [timeRange, setTimeRange] = useState('day')
  const [selectedStudent, setSelectedStudent] = useState('all')
  const [studentList, setStudentList] = useState([])
  const [performanceData, setPerformanceData] = useState([])
  const [timeSpentData, setTimeSpentData] = useState([])
  const [improvementData, setImprovementData] = useState([])
  const [strengthsData, setStrengthsData] = useState([])

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateStudentList = () => {
      return Array.from({ length: 10 }, (_, i) => ({
        id: `STU${i + 1}`,
        name: `Student ${i + 1}`,
        grade: Math.random() > 0.5 ? '11th' : '12th'
      }))
    }

    const generatePerformanceData = () => {
      const subjects = ['Physics', 'Chemistry', 'Mathematics']
      return studentList.map(student => ({
        studentId: student.id,
        name: student.name,
        physics: Math.floor(Math.random() * 40) + 60,
        chemistry: Math.floor(Math.random() * 40) + 60,
        mathematics: Math.floor(Math.random() * 40) + 60,
        avgScore: Math.floor(Math.random() * 30) + 70,
        improvement: Math.floor(Math.random() * 20) - 10,
        studyHours: Math.floor(Math.random() * 40) + 20
      }))
    }

    const generateTimeSpentData = () => {
      return Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        physics: Math.floor(Math.random() * 3) + 1,
        chemistry: Math.floor(Math.random() * 3) + 1,
        mathematics: Math.floor(Math.random() * 3) + 1,
        total: Math.floor(Math.random() * 5) + 4
      }))
    }

    const generateImprovementData = () => {
      return Array.from({ length: 6 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        physics: Math.floor(Math.random() * 20) + 70,
        chemistry: Math.floor(Math.random() * 20) + 70,
        mathematics: Math.floor(Math.random() * 20) + 70
      }))
    }

    const generateStrengthsData = () => {
      return [
        { subject: 'Problem Solving', score: Math.random() * 100 },
        { subject: 'Concept Understanding', score: Math.random() * 100 },
        { subject: 'Lab Work', score: Math.random() * 100 },
        { subject: 'Assignment Completion', score: Math.random() * 100 },
        { subject: 'Test Performance', score: Math.random() * 100 },
        { subject: 'Doubt Clarification', score: Math.random() * 100 }
      ]
    }

    const students = generateStudentList()
    setStudentList(students)
    setPerformanceData(generatePerformanceData())
    setTimeSpentData(generateTimeSpentData())
    setImprovementData(generateImprovementData())
    setStrengthsData(generateStrengthsData())
  }, [timeRange])

  return (
    <div className="student-analytics-dashboard">
      <div className="dashboard-controls">
        <h2>Student Performance Analytics</h2>
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
          <div className="student-selector">
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="all">All Students</option>
              {studentList.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.grade})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Performance Overview */}
        <div className="chart-container">
          <h3>Subject Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="physics" fill="#8884d8" name="Physics" />
              <Bar dataKey="chemistry" fill="#82ca9d" name="Chemistry" />
              <Bar dataKey="mathematics" fill="#ffc658" name="Mathematics" />
              <Line type="monotone" dataKey="avgScore" stroke="#ff7300" name="Average Score" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Time Spent Analysis */}
        <div className="chart-container">
          <h3>Daily Study Hours Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeSpentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="physics" stackId="a" fill="#8884d8" name="Physics" />
              <Bar dataKey="chemistry" stackId="a" fill="#82ca9d" name="Chemistry" />
              <Bar dataKey="mathematics" stackId="a" fill="#ffc658" name="Mathematics" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Tracking */}
        <div className="chart-container">
          <h3>Subject-wise Progress Tracking</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={improvementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="physics" stroke="#8884d8" name="Physics" />
              <Line type="monotone" dataKey="chemistry" stroke="#82ca9d" name="Chemistry" />
              <Line type="monotone" dataKey="mathematics" stroke="#ffc658" name="Mathematics" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Student Strengths */}
        <div className="chart-container">
          <h3>Student Strength Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strengthsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Student" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Student Metrics */}
      <div className="metrics-table">
        <h3>Detailed Student Performance Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Physics Score</th>
              <th>Chemistry Score</th>
              <th>Mathematics Score</th>
              <th>Average Score</th>
              <th>Improvement</th>
              <th>Study Hours/Week</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.physics}%</td>
                <td>{student.chemistry}%</td>
                <td>{student.mathematics}%</td>
                <td>{student.avgScore}%</td>
                <td className={student.improvement >= 0 ? 'positive' : 'negative'}>
                  {student.improvement > 0 ? '+' : ''}{student.improvement}%
                </td>
                <td>{student.studyHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentAnalytics 