import { Router } from 'express'
import { mockUsers } from '../data/mockData'

const router = Router()

// Get user profile
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const user = mockUsers.find(u => u.id === id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile'
    })
  }
})

// Update user profile
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    
    const userIndex = mockUsers.findIndex(u => u.id === id)
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    // Update user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    }
    
    res.json({
      success: true,
      data: mockUsers[userIndex],
      message: 'User profile updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update user profile'
    })
  }
})

// Get user's service information
router.get('/:id/service-info', (req, res) => {
  try {
    const { id } = req.params
    const user = mockUsers.find(u => u.id === id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    res.json({
      success: true,
      data: user.serviceInfo
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service information'
    })
  }
})

// Update service information
router.put('/:id/service-info', (req, res) => {
  try {
    const { id } = req.params
    const serviceInfo = req.body
    
    const userIndex = mockUsers.findIndex(u => u.id === id)
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    // Update service information
    mockUsers[userIndex].serviceInfo = {
      ...mockUsers[userIndex].serviceInfo,
      ...serviceInfo
    }
    mockUsers[userIndex].updatedAt = new Date().toISOString()
    
    res.json({
      success: true,
      data: mockUsers[userIndex].serviceInfo,
      message: 'Service information updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update service information'
    })
  }
})

// Get user notification settings
router.get('/:id/notifications', (req, res) => {
  try {
    const { id } = req.params
    const user = mockUsers.find(u => u.id === id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    // Mock notification settings
    const notificationSettings = {
      email: true,
      push: false,
      sms: true,
      marketing: false,
      trainingReminders: true,
      certificateAlerts: true,
      emergencyAlerts: true
    }
    
    res.json({
      success: true,
      data: notificationSettings
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notification settings'
    })
  }
})

// Update notification settings
router.put('/:id/notifications', (req, res) => {
  try {
    const { id } = req.params
    const notificationSettings = req.body
    
    const userIndex = mockUsers.findIndex(u => u.id === id)
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    // In a real app, you'd store these in a separate table
    // For now, we'll just return success
    res.json({
      success: true,
      data: notificationSettings,
      message: 'Notification settings updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update notification settings'
    })
  }
})

export { router as userRoutes }