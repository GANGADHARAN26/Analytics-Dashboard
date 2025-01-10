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
  AreaChart,
  Area,
  ComposedChart
} from 'recharts'

function ConversionAnalytics() {
  const [timeRange, setTimeRange] = useState('month')
  const [registrationData, setRegistrationData] = useState([])
  const [courseCompletionData, setCourseCompletionData] = useState([])
  const [retentionData, setRetentionData] = useState([])
  const [conversionFunnelData, setConversionFunnelData] = useState([])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c43', '#a4de6c']

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateRegistrationData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      return months.map(month => ({
        month,
        'Class 11': Math.floor(Math.random() * 100) + 50,
        'Class 12': Math.floor(Math.random() * 100) + 50,
        totalRegistrations: Math.floor(Math.random() * 200) + 100,
        conversionRate: Math.floor(Math.random() * 20) + 60
      }))
    }

    const generateCourseCompletionData = () => {
      return [
        {
          subject: 'Physics',
          enrolled: Math.floor(Math.random() * 500) + 1000,
          completed: Math.floor(Math.random() * 300) + 500,
          inProgress: Math.floor(Math.random() * 200) + 300,
          dropped: Math.floor(Math.random() * 100) + 100
        },
        {
          subject: 'Chemistry',
          enrolled: Math.floor(Math.random() * 500) + 1000,
          completed: Math.floor(Math.random() * 300) + 500,
          inProgress: Math.floor(Math.random() * 200) + 300,
          dropped: Math.floor(Math.random() * 100) + 100
        },
        {
          subject: 'Mathematics',
          enrolled: Math.floor(Math.random() * 500) + 1000,
          completed: Math.floor(Math.random() * 300) + 500,
          inProgress: Math.floor(Math.random() * 200) + 300,
          dropped: Math.floor(Math.random() * 100) + 100
        }
      ]
    }

    const generateRetentionData = () => {
      const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`)
      return weeks.map(week => ({
        week,
        'Active Students': Math.floor(Math.random() * 200) + 800,
        'Returning Students': Math.floor(Math.random() * 150) + 600,
        'Engagement Score': Math.floor(Math.random() * 20) + 70
      }))
    }

    const generateConversionFunnelData = () => {
      return [
        { stage: 'Website Visits', count: 10000, rate: 100 },
        { stage: 'Demo Registration', count: 5000, rate: 50 },
        { stage: 'Course Enrollment', count: 2000, rate: 20 },
        { stage: 'Active Learning', count: 1500, rate: 15 },
        { stage: 'Course Completion', count: 1000, rate: 10 }
      ]
    }

    setRegistrationData(generateRegistrationData())
    setCourseCompletionData(generateCourseCompletionData())
    setRetentionData(generateRetentionData())
    setConversionFunnelData(generateConversionFunnelData())
  }, [timeRange])

  return (
    <div className="conversion-dashboard">
      <div className="dashboard-controls">
        <h2>Student Conversion & Retention Analysis</h2>
        <div className="time-range-selector">
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
          <button
            className={timeRange === 'quarter' ? 'active' : ''}
            onClick={() => setTimeRange('quarter')}
          >
            Quarterly
          </button>
        </div>
      </div>

      <div className="charts-grid">
        {/* Registration Trends */}
        <div className="chart-container">
          <h3>Student Registration Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="Class 11" fill="#8884d8" name="Class 11" />
              <Bar yAxisId="left" dataKey="Class 12" fill="#82ca9d" name="Class 12" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversionRate"
                stroke="#ff7300"
                name="Conversion Rate %"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Course Completion Status */}
        <div className="chart-container">
          <h3>Subject-wise Course Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#82ca9d" name="Completed" />
              <Bar dataKey="inProgress" stackId="a" fill="#8884d8" name="In Progress" />
              <Bar dataKey="dropped" stackId="a" fill="#ff7c43" name="Dropped" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Retention */}
        <div className="chart-container">
          <h3>Student Retention Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Active Students"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Returning Students"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Engagement Score"
                stroke="#ffc658"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="chart-container">
          <h3>Student Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversionFunnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
                name="Student Count"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="metrics-table">
        <h3>Conversion & Retention Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Total Enrolled</th>
              <th>Completion Rate</th>
              <th>Retention Rate</th>
              <th>Avg. Engagement</th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {courseCompletionData.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subject}</td>
                <td>{subject.enrolled}</td>
                <td>
                  {((subject.completed / subject.enrolled) * 100).toFixed(1)}%
                </td>
                <td>
                  {((1 - subject.dropped / subject.enrolled) * 100).toFixed(1)}%
                </td>
                <td>{Math.floor(Math.random() * 20) + 70}%</td>
                <td>
                  <span className={`status-badge ${
                    subject.completed > subject.enrolled * 0.7 ? 'success' : 
                    subject.completed > subject.enrolled * 0.5 ? 'warning' : 'danger'
                  }`}>
                    {subject.completed > subject.enrolled * 0.7 ? 'High' :
                     subject.completed > subject.enrolled * 0.5 ? 'Medium' : 'Low'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ConversionAnalytics 