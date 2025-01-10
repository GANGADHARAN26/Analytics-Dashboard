import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function UserActivityDashboard() {
  const [timeRange, setTimeRange] = useState('day') // 'day', 'month', 'year'
  const [activityData, setActivityData] = useState([])

  // Sample data - Replace this with your actual API call
  useEffect(() => {
    // Simulate different data based on selected time range
    const generateData = () => {
      if (timeRange === 'day') {
        return Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          activeUsers: Math.floor(Math.random() * 1000),
        }))
      } else if (timeRange === 'month') {
        return Array.from({ length: 30 }, (_, i) => ({
          time: `Day ${i + 1}`,
          activeUsers: Math.floor(Math.random() * 5000),
        }))
      } else {
        return Array.from({ length: 12 }, (_, i) => ({
          time: `Month ${i + 1}`,
          activeUsers: Math.floor(Math.random() * 10000),
        }))
      }
    }

    setActivityData(generateData())
  }, [timeRange])

  return (
    <div className="user-activity-dashboard">
      <div className="dashboard-controls">
        <h2>User Activity Dashboard</h2>
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

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="#8884d8"
              name="Active Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default UserActivityDashboard 