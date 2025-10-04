import { Router } from 'express'
import { 
  mockTrainings, 
  getUserTrainings, 
  getTrainingsByMonth 
} from '../data/mockData'

const router = Router()

// Get user's calendar view
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const { view = 'yours' } = req.query
    
    let trainings
    if (view === 'all') {
      trainings = mockTrainings
    } else {
      trainings = getUserTrainings(userId)
    }
    
    // Group trainings by month
    const trainingsByMonth = getTrainingsByMonth(trainings)
    
    res.json({
      success: true,
      data: trainingsByMonth,
      view: view as string
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch calendar data'
    })
  }
})

// Get monthly calendar
router.get('/month/:userId/:year/:month', (req, res) => {
  try {
    const { userId, year, month } = req.params
    const { view = 'yours' } = req.query
    
    let trainings
    if (view === 'all') {
      trainings = mockTrainings
    } else {
      trainings = getUserTrainings(userId)
    }
    
    // Filter trainings for specific month (simplified - in real app, filter by actual dates)
    const monthNames = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ]
    const monthName = monthNames[parseInt(month) - 1]
    
    const groupedTrainings = getTrainingsByMonth(trainings)
    const monthTrainings = groupedTrainings[monthName] || []
    
    res.json({
      success: true,
      data: {
        year: parseInt(year),
        month: parseInt(month),
        monthName,
        trainings: monthTrainings,
        count: monthTrainings.length
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch monthly calendar'
    })
  }
})

// Plan new training (future feature)
router.post('/plan-training', (req, res) => {
  try {
    const { userId, trainingData } = req.body
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }
    
    if (!trainingData) {
      return res.status(400).json({
        success: false,
        error: 'Training data is required'
      })
    }
    
    // This is a placeholder for future implementation
    // In a real app, you would create a new training and add it to the database
    
    res.json({
      success: true,
      message: 'Training planning feature coming soon',
      data: {
        id: 'planned-' + Date.now(),
        ...trainingData,
        userId,
        status: 'planned',
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to plan training'
    })
  }
})

export { router as calendarRoutes }
