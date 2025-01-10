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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts'

function SessionReplayAndFeedback() {
  const [timeRange, setTimeRange] = useState('week')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [sessionData, setSessionData] = useState([])
  const [feedbackData, setFeedbackData] = useState([])
  const [npsData, setNpsData] = useState([])
  const [heatmapData, setHeatmapData] = useState([])
  const [surveyResponses, setSurveyResponses] = useState([])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c43', '#a4de6c']
  const subjects = ['All Subjects', 'Physics', 'Chemistry', 'Mathematics']

  useEffect(() => {
    // Sample data generation - Replace with actual API calls
    const generateSessionData = () => {
      return [
        {
          page: 'Lecture Videos',
          avgTime: Math.floor(Math.random() * 20) + 10,
          clicks: Math.floor(Math.random() * 500) + 300,
          scrollDepth: Math.floor(Math.random() * 30) + 70,
          exitRate: Math.floor(Math.random() * 20) + 10
        },
        {
          page: 'Practice Problems',
          avgTime: Math.floor(Math.random() * 15) + 15,
          clicks: Math.floor(Math.random() * 400) + 400,
          scrollDepth: Math.floor(Math.random() * 20) + 80,
          exitRate: Math.floor(Math.random() * 15) + 5
        },
        {
          page: 'Lab Simulations',
          avgTime: Math.floor(Math.random() * 25) + 20,
          clicks: Math.floor(Math.random() * 300) + 200,
          scrollDepth: Math.floor(Math.random() * 25) + 75,
          exitRate: Math.floor(Math.random() * 25) + 15
        },
        {
          page: 'Doubt Sessions',
          avgTime: Math.floor(Math.random() * 30) + 25,
          clicks: Math.floor(Math.random() * 200) + 150,
          scrollDepth: Math.floor(Math.random() * 15) + 85,
          exitRate: Math.floor(Math.random() * 10) + 5
        }
      ]
    }

    const generateFeedbackData = () => {
      return [
        { category: 'Content Quality', rating: Math.floor(Math.random() * 2) + 4 },
        { category: 'Teacher Effectiveness', rating: Math.floor(Math.random() * 2) + 4 },
        { category: 'Platform Usability', rating: Math.floor(Math.random() * 2) + 3 },
        { category: 'Doubt Resolution', rating: Math.floor(Math.random() * 2) + 3 },
        { category: 'Lab Experience', rating: Math.floor(Math.random() * 2) + 4 }
      ]
    }

    const generateNPSData = () => {
      return [
        { category: 'Promoters', value: Math.floor(Math.random() * 20) + 50 },
        { category: 'Passives', value: Math.floor(Math.random() * 15) + 30 },
        { category: 'Detractors', value: Math.floor(Math.random() * 10) + 10 }
      ]
    }

    const generateHeatmapData = () => {
      return Array.from({ length: 20 }, () => ({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        intensity: Math.floor(Math.random() * 100)
      }))
    }

    const generateSurveyResponses = () => {
      const aspects = ['Course Content', 'Teaching Quality', 'Platform Experience', 'Support Services', 'Learning Outcomes']
      return aspects.map(aspect => ({
        aspect,
        satisfaction: Math.floor(Math.random() * 30) + 70,
        responses: Math.floor(Math.random() * 500) + 500,
        improvement: Math.floor(Math.random() * 20) - 10
      }))
    }

    setSessionData(generateSessionData())
    setFeedbackData(generateFeedbackData())
    setNpsData(generateNPSData())
    setHeatmapData(generateHeatmapData())
    setSurveyResponses(generateSurveyResponses())
  }, [timeRange, selectedSubject])

  return (
    <div className="session-feedback-dashboard">
      <div className="dashboard-controls">
        <h2>Session Insights & Student Feedback Analysis</h2>
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
        {/* Session Replay Insights */}
        <div className="chart-container">
          <h3>Page Interaction Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgTime" fill="#8884d8" name="Avg. Time (min)" />
              <Bar dataKey="clicks" fill="#82ca9d" name="Click Count" />
              <Bar dataKey="scrollDepth" fill="#ffc658" name="Scroll Depth %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Click Heatmap */}
        <div className="chart-container">
          <h3>Interaction Heatmap</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="X Position" />
              <YAxis type="number" dataKey="y" name="Y Position" />
              <ZAxis type="number" dataKey="intensity" range={[50, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={heatmapData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Feedback Ratings */}
        <div className="chart-container">
          <h3>Student Feedback Ratings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={feedbackData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Rating"
                dataKey="rating"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* NPS Distribution */}
        <div className="chart-container">
          <h3>Net Promoter Score (NPS) Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={npsData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {npsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Survey Response Table */}
      <div className="metrics-table">
        <h3>Detailed Survey Responses</h3>
        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Satisfaction Score</th>
              <th>Total Responses</th>
              <th>MoM Improvement</th>
              <th>Key Feedback</th>
            </tr>
          </thead>
          <tbody>
            {surveyResponses.map((item, index) => (
              <tr key={index}>
                <td>{item.aspect}</td>
                <td>
                  <span className={`satisfaction-score ${
                    item.satisfaction >= 80 ? 'high' :
                    item.satisfaction >= 70 ? 'medium' : 'low'
                  }`}>
                    {item.satisfaction}%
                  </span>
                </td>
                <td>{item.responses}</td>
                <td>
                  <span className={`improvement-badge ${
                    item.improvement > 0 ? 'positive' :
                    item.improvement < 0 ? 'negative' : 'neutral'
                  }`}>
                    {item.improvement > 0 ? '+' : ''}{item.improvement}%
                  </span>
                </td>
                <td>
                  {item.satisfaction >= 80 ? 'Excellent Performance' :
                   item.satisfaction >= 70 ? 'Good, Needs Minor Improvements' :
                   'Requires Attention'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SessionReplayAndFeedback 