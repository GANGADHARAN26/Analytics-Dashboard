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
  Area
} from 'recharts'

function ErrorAnalytics() {
  const [timeRange, setTimeRange] = useState('day')
  const [errorData, setErrorData] = useState([])
  const [rageClickData, setRageClickData] = useState([])
  const [sessionCrashes, setSessionCrashes] = useState([])
  const [deadClickAreas, setDeadClickAreas] = useState([])

  const COLORS = ['#ff4d4f', '#ffa39e', '#ff7875', '#ff9c6e', '#ffc069', '#ffd666']

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateErrorData = () => {
      return [
        { 
          type: 'Video Player Error',
          count: Math.floor(Math.random() * 50),
          subject: 'Physics',
          impact: 'High'
        },
        { 
          type: 'Lab Simulation Crash',
          count: Math.floor(Math.random() * 40),
          subject: 'Chemistry',
          impact: 'High'
        },
        { 
          type: 'Assignment Upload Failed',
          count: Math.floor(Math.random() * 30),
          subject: 'Mathematics',
          impact: 'Medium'
        },
        { 
          type: 'Voice Chat Connection',
          count: Math.floor(Math.random() * 45),
          subject: 'All',
          impact: 'High'
        },
        { 
          type: 'Resource Download Error',
          count: Math.floor(Math.random() * 25),
          subject: 'All',
          impact: 'Medium'
        }
      ]
    }

    const generateRageClickData = () => {
      return [
        { area: 'Submit Button', subject: 'Physics Lab', incidents: Math.floor(Math.random() * 100) },
        { area: 'Next Lecture', subject: 'Chemistry', incidents: Math.floor(Math.random() * 80) },
        { area: 'Practice Questions', subject: 'Mathematics', incidents: Math.floor(Math.random() * 90) },
        { area: 'Voice Chat Join', subject: 'All', incidents: Math.floor(Math.random() * 70) },
        { area: 'Download Notes', subject: 'All', incidents: Math.floor(Math.random() * 60) }
      ]
    }

    const generateSessionCrashData = () => {
      return Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        physics: Math.floor(Math.random() * 10),
        chemistry: Math.floor(Math.random() * 10),
        mathematics: Math.floor(Math.random() * 10)
      }))
    }

    const generateDeadClickData = () => {
      return [
        { area: 'Lecture Navigation', percentage: 35 },
        { area: 'Lab Interface', percentage: 25 },
        { area: 'Study Materials', percentage: 20 },
        { area: 'Progress Tracking', percentage: 15 },
        { area: 'Other Areas', percentage: 5 }
      ]
    }

    setErrorData(generateErrorData())
    setRageClickData(generateRageClickData())
    setSessionCrashes(generateSessionCrashData())
    setDeadClickAreas(generateDeadClickData())
  }, [timeRange])

  return (
    <div className="error-analytics-dashboard">
      <div className="dashboard-controls">
        <h2>Error & User Frustration Analysis</h2>
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
      </div>

      <div className="charts-grid">
        {/* Error Distribution */}
        <div className="chart-container">
          <h3>Error Distribution by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={errorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff4d4f" name="Error Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rage Clicks */}
        <div className="chart-container">
          <h3>Rage Click Incidents</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rageClickData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="area" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="incidents" fill="#ffa39e" name="Rage Click Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Session Crashes */}
        <div className="chart-container">
          <h3>Session Crashes by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sessionCrashes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="physics" 
                stackId="1"
                stroke="#ff7875" 
                fill="#ff7875" 
                name="Physics"
              />
              <Area 
                type="monotone" 
                dataKey="chemistry" 
                stackId="1"
                stroke="#ff9c6e" 
                fill="#ff9c6e" 
                name="Chemistry"
              />
              <Area 
                type="monotone" 
                dataKey="mathematics" 
                stackId="1"
                stroke="#ffc069" 
                fill="#ffc069" 
                name="Mathematics"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dead Click Areas */}
        <div className="chart-container">
          <h3>Dead Click Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deadClickAreas}
                dataKey="percentage"
                nameKey="area"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {deadClickAreas.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Error Details Table */}
      <div className="metrics-table">
        <h3>Detailed Error Analysis</h3>
        <table>
          <thead>
            <tr>
              <th>Error Type</th>
              <th>Subject</th>
              <th>Occurrences</th>
              <th>Impact Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {errorData.map((error, index) => (
              <tr key={index}>
                <td>{error.type}</td>
                <td>{error.subject}</td>
                <td>{error.count}</td>
                <td>
                  <span className={`impact-badge ${error.impact.toLowerCase()}`}>
                    {error.impact}
                  </span>
                </td>
                <td>
                  <span className="status-badge">
                    {error.count > 40 ? 'Critical' : error.count > 20 ? 'Warning' : 'Normal'}
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

export default ErrorAnalytics 