import { Router } from 'express'
import { mockWeeklyPlans } from '../data/mockData'

const router = Router()

// Get user's weekly training plan
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const userWeeklyPlan = mockWeeklyPlans.filter(plan => plan.userId === userId)
    
    res.json({
      success: true,
      data: userWeeklyPlan,
      count: userWeeklyPlan.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weekly plan'
    })
  }
})

// Update weekly plan
router.put('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const { weeklyPlan } = req.body
    
    if (!weeklyPlan || !Array.isArray(weeklyPlan)) {
      return res.status(400).json({
        success: false,
        error: 'Weekly plan data is required'
      })
    }
    
    // Remove existing plans for user
    const filteredPlans = mockWeeklyPlans.filter(plan => plan.userId !== userId)
    
    // Add new plans
    const newPlans = weeklyPlan.map((plan: any) => ({
      ...plan,
      userId
    }))
    
    // Update the mock data
    mockWeeklyPlans.splice(0, mockWeeklyPlans.length, ...filteredPlans, ...newPlans)
    
    res.json({
      success: true,
      data: newPlans,
      message: 'Weekly plan updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update weekly plan'
    })
  }
})

// Get today's plan details
router.get('/today/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const todayPlan = mockWeeklyPlans.find(plan => plan.userId === userId && plan.isToday)
    
    if (!todayPlan) {
      return res.status(404).json({
        success: false,
        error: 'No plan found for today'
      })
    }
    
    res.json({
      success: true,
      data: todayPlan
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch today\'s plan'
    })
  }
})

export { router as weeklyPlanRoutes }
