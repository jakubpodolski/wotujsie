import { Router } from 'express'
import { mockDashboardData } from '../data/mockData'

const router = Router()

// Get dashboard metrics
router.get('/metrics', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData.metrics
  })
})

// Get revenue data
router.get('/revenue', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData.revenue
  })
})

// Get user activity data
router.get('/activity', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData.activity
  })
})

// Get recent activity
router.get('/recent-activity', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData.recentActivity
  })
})

// Get all dashboard data
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData
  })
})

export { router as dashboardRoutes }
