import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

function PageAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('day')
  const [pageData, setPageData] = useState([])
  const [exitData, setExitData] = useState([])
  
  // Add colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff7300']

  // Sample data - Replace with your actual API call
  useEffect(() => {
    // Simulate page engagement data
    const generatePageData = () => {
      const pages = [
        '/home',
        '/products',
        '/about',
        '/contact',
        '/dashboard',
        '/settings'
      ]

      return pages.map(page => ({
        page,
        timeSpent: Math.floor(Math.random() * 300), // Average time in seconds
        visits: Math.floor(Math.random() * 1000),
        exitRate: Math.floor(Math.random() * 100),
        exitCount: Math.floor(Math.random() * 500) // Added exit count
      }))
    }

    // Simulate time-based exit data
    const generateExitData = () => {
      if (timeRange === 'day') {
        return Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          exits: Math.floor(Math.random() * 100),
        }))
      } else if (timeRange === 'month') {
        return Array.from({ length: 30 }, (_, i) => ({
          time: `Day ${i + 1}`,
          exits: Math.floor(Math.random() * 1000),
        }))
      } else {
        return Array.from({ length: 12 }, (_, i) => ({
          time: `Month ${i + 1}`,
          exits: Math.floor(Math.random() * 5000),
        }))
      }
    }

    setPageData(generatePageData())
    setExitData(generateExitData())
  }, [timeRange])

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].name}`}</p>
          <p>{`Exit Count: ${payload[0].value}`}</p>
          <p>{`Percentage: ${((payload[0].value / totalExits) * 100).toFixed(1)}%`}</p>
        </div>
      )
    }
    return null
  }

  // Calculate total exits for percentage calculation
  const totalExits = pageData.reduce((sum, item) => sum + item.exitCount, 0)

  return (
    <div className="page-analytics-dashboard">
      <div className="dashboard-controls">
        <h2>Page Analytics Dashboard</h2>
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
        {/* Page Engagement Chart */}
        <div className="chart-container">
          <h3>Page Engagement Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="timeSpent" 
                fill="#8884d8" 
                name="Avg. Time (seconds)" 
              />
              <Bar 
                dataKey="visits" 
                fill="#82ca9d" 
                name="Total Visits" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Exit Rate Chart */}
        <div className="chart-container">
          <h3>User Exit Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={exitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="exits"
                stroke="#ff7300"
                name="Exit Count"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* New Exit Distribution Pie Chart */}
        <div className="chart-container">
          <h3>Page Exit Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pageData}
                dataKey="exitCount"
                nameKey="page"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {pageData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Page Exit Rate Table */}
      <div className="page-metrics-table">
        <h3>Page-wise Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Avg. Time Spent</th>
              <th>Total Visits</th>
              <th>Exit Rate</th>
              <th>Exit Count</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((page, index) => (
              <tr key={index}>
                <td>{page.page}</td>
                <td>{page.timeSpent}s</td>
                <td>{page.visits}</td>
                <td>{page.exitRate}%</td>
                <td>{page.exitCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PageAnalyticsDashboard 