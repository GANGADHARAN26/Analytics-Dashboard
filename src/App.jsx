import { useState } from 'react'
import './App.css'
import UserActivityDashboard from './components/UserActivityDashboard'
import PageAnalyticsDashboard from './components/PageAnalyticsDashboard'
import UserFlowAnalytics from './components/UserFlowAnalytics'
import StudentInteractions from './components/StudentInteractions'
import StudentAnalytics from './components/StudentAnalytics'
import ErrorAnalytics from './components/ErrorAnalytics'
import CustomEventsAnalytics from './components/CustomEventsAnalytics'
import UserSegmentationAnalytics from './components/UserSegmentationAnalytics'
import ConversionAnalytics from './components/ConversionAnalytics'
import SessionReplayAndFeedback from './components/SessionReplayAndFeedback'

function App() {
  return (
    <div className="dashboard-container">
      <UserActivityDashboard />
      <div className="dashboard-spacer"></div>
      <PageAnalyticsDashboard />
      <div className="dashboard-spacer"></div>
      <UserFlowAnalytics />
      <div className="dashboard-spacer"></div>
      <StudentInteractions />
      <div className="dashboard-spacer"></div>
      <StudentAnalytics />
      <div className="dashboard-spacer"></div>
      <ErrorAnalytics />
      <div className="dashboard-spacer"></div>
      <CustomEventsAnalytics />
      <div className="dashboard-spacer"></div>
      <UserSegmentationAnalytics />
      <div className="dashboard-spacer"></div>
      <ConversionAnalytics />
      <div className="dashboard-spacer"></div>
      <SessionReplayAndFeedback />
    </div>
  )
}

export default App
