import { Router } from 'express'
import { mockSettings } from '../data/mockData'

const router = Router()

// Get user settings
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  
  res.json({
    success: true,
    data: {
      userId,
      ...mockSettings
    }
  })
})

// Update user settings
router.put('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  
  // In a real app, you would save to database
  const updatedSettings = {
    ...mockSettings,
    ...req.body,
    updatedAt: new Date().toISOString()
  }
  
  res.json({
    success: true,
    data: updatedSettings,
    message: 'Settings updated successfully'
  })
})

// Reset settings to default
router.post('/:userId/reset', (req, res) => {
  const userId = parseInt(req.params.userId)
  
  res.json({
    success: true,
    data: mockSettings,
    message: 'Settings reset to default'
  })
})

export { router as settingsRoutes }
