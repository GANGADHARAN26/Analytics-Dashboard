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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

function UserSegmentationAnalytics() {
  const [timeRange, setTimeRange] = useState('month')
  const [userTypeData, setUserTypeData] = useState([])
  const [locationData, setLocationData] = useState([])
  const [deviceData, setDeviceData] = useState([])
  const [cohortData, setCohortData] = useState([])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c43', '#a4de6c', '#d0ed57']

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateUserTypeData = () => {
      return [
        {
          type: 'New Students',
          physics: Math.floor(Math.random() * 50) + 50,
          chemistry: Math.floor(Math.random() * 50) + 50,
          mathematics: Math.floor(Math.random() * 50) + 50,
          avgTimeSpent: Math.floor(Math.random() * 60) + 30,
          completionRate: Math.floor(Math.random() * 30) + 40
        },
        {
          type: 'Returning Students',
          physics: Math.floor(Math.random() * 50) + 70,
          chemistry: Math.floor(Math.random() * 50) + 70,
          mathematics: Math.floor(Math.random() * 50) + 70,
          avgTimeSpent: Math.floor(Math.random() * 60) + 60,
          completionRate: Math.floor(Math.random() * 30) + 60
        }
      ]
    }

    const generateLocationData = () => {
      const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad']
      return cities.map(city => ({
        city,
        studentCount: Math.floor(Math.random() * 1000) + 500,
        avgPerformance: Math.floor(Math.random() * 20) + 70,
        subjects: {
          physics: Math.floor(Math.random() * 100),
          chemistry: Math.floor(Math.random() * 100),
          mathematics: Math.floor(Math.random() * 100)
        }
      }))
    }

    const generateDeviceData = () => {
      return [
        { name: 'Desktop', value: Math.floor(Math.random() * 1000) + 2000 },
        { name: 'Mobile', value: Math.floor(Math.random() * 1000) + 1500 },
        { name: 'Tablet', value: Math.floor(Math.random() * 500) + 500 },
        { 
          name: 'Browser Distribution',
          chrome: Math.floor(Math.random() * 1000) + 2000,
          firefox: Math.floor(Math.random() * 500) + 1000,
          safari: Math.floor(Math.random() * 500) + 800,
          other: Math.floor(Math.random() * 300) + 200
        }
      ]
    }

    const generateCohortData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      return months.map(month => ({
        month,
        retentionRate: Math.floor(Math.random() * 30) + 70,
        activeUsers: Math.floor(Math.random() * 500) + 500,
        performance: {
          physics: Math.floor(Math.random() * 20) + 70,
          chemistry: Math.floor(Math.random() * 20) + 70,
          mathematics: Math.floor(Math.random() * 20) + 70
        }
      }))
    }

    setUserTypeData(generateUserTypeData())
    setLocationData(generateLocationData())
    setDeviceData(generateDeviceData())
    setCohortData(generateCohortData())
  }, [timeRange])

  return (
    <div className="segmentation-dashboard">
      <div className="dashboard-controls">
        <h2>Student Segmentation Analysis</h2>
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
        {/* New vs Returning Students Performance */}
        <div className="chart-container">
          <h3>New vs Returning Students Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={userTypeData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="type" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Physics" dataKey="physics" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Chemistry" dataKey="chemistry" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Radar name="Mathematics" dataKey="mathematics" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic Distribution */}
        <div className="chart-container">
          <h3>Geographic Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="studentCount" name="Total Students" />
              <YAxis dataKey="avgPerformance" name="Average Performance" />
              <ZAxis dataKey="city" name="City" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter
                name="Cities"
                data={locationData}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Device Usage Distribution */}
        <div className="chart-container">
          <h3>Device & Browser Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData.slice(0, 3)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {deviceData.slice(0, 3).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cohort Analysis */}
        <div className="chart-container">
          <h3>Cohort Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="retentionRate" 
                stroke="#8884d8" 
                name="Retention Rate" 
              />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#82ca9d" 
                name="Active Users" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="metrics-table">
        <h3>Detailed Segmentation Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Total Students</th>
              <th>Physics Performance</th>
              <th>Chemistry Performance</th>
              <th>Mathematics Performance</th>
              <th>Device Preference</th>
              <th>Retention Rate</th>
            </tr>
          </thead>
          <tbody>
            {locationData.map((location, index) => (
              <tr key={index}>
                <td>{location.city}</td>
                <td>{location.studentCount}</td>
                <td>{location.subjects.physics}%</td>
                <td>{location.subjects.chemistry}%</td>
                <td>{location.subjects.mathematics}%</td>
                <td>
                  {deviceData[0].value > deviceData[1].value ? 'Desktop' : 'Mobile'}
                </td>
                <td>{Math.floor(Math.random() * 30) + 70}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserSegmentationAnalytics 