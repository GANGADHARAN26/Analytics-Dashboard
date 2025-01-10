import { useState, useEffect } from 'react'
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts'

function UserFlowAnalytics() {
  const [timeRange, setTimeRange] = useState('day')
  const [entryPoints, setEntryPoints] = useState([])
  const [learningFunnel, setLearningFunnel] = useState([])
  const [pathData, setPathData] = useState([])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff7300']

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateEntryPoints = () => {
      const sources = [
        'Dashboard',
        'Course Catalog',
        'Direct Link',
        'Notifications',
        'Calendar',
        'Discussion Forum'
      ]

      return sources.map(source => ({
        source,
        students: Math.floor(Math.random() * 1000),
        completionRate: Math.floor(Math.random() * 100),
        avgEngagement: Math.floor(Math.random() * 60) // minutes
      }))
    }

    const generateLearningFunnel = () => {
      return [
        { step: 'Course Overview', students: 1000, rate: 100 },
        { step: 'Lecture Materials', students: 850, rate: 85 },
        { step: 'Lab Exercises', students: 600, rate: 60 },
        { step: 'Voice Chat Support', students: 400, rate: 40 },
        { step: 'Assignment Submission', students: 300, rate: 30 }
      ]
    }

    const generatePathData = () => {
      return [
        { path: 'Dashboard → Lecture → Lab', count: Math.floor(Math.random() * 500) },
        { path: 'Lecture → Voice Chat → Lab', count: Math.floor(Math.random() * 400) },
        { path: 'Dashboard → Calendar → Lecture', count: Math.floor(Math.random() * 300) },
        { path: 'Lab → Voice Chat → Dashboard', count: Math.floor(Math.random() * 200) },
        { path: 'Calendar → Lecture → Assignment', count: Math.floor(Math.random() * 350) }
      ]
    }

    setEntryPoints(generateEntryPoints())
    setLearningFunnel(generateLearningFunnel())
    setPathData(generatePathData())
  }, [timeRange])

  return (
    <div className="user-flow-dashboard">
      <div className="dashboard-controls">
        <h2>Student Learning Flow Analysis</h2>
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
        {/* Entry Points Chart */}
        <div className="chart-container">
          <h3>Student Access Points Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={entryPoints}
                dataKey="students"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {entryPoints.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Progress Funnel */}
        <div className="chart-container">
          <h3>Learning Progress Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={learningFunnel}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="step" type="category" />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="students" 
                fill="#8884d8" 
                name="Active Students"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Common Learning Paths */}
        <div className="chart-container">
          <h3>Most Common Learning Paths</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={pathData}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="path" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="#82ca9d" 
                name="Students Following Path"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Learning Analytics Table */}
      <div className="metrics-table">
        <h3>Learning Access Points Details</h3>
        <table>
          <thead>
            <tr>
              <th>Access Point</th>
              <th>Active Students</th>
              <th>Completion Rate</th>
              <th>Avg. Engagement Time (min)</th>
            </tr>
          </thead>
          <tbody>
            {entryPoints.map((point, index) => (
              <tr key={index}>
                <td>{point.source}</td>
                <td>{point.students}</td>
                <td>{point.completionRate}%</td>
                <td>{point.avgEngagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserFlowAnalytics 