import { Router } from 'express'
import { mockUsers, mockTrainings, mockTrainingRegistrations, mockNotifications, mockSystemState, updateMobilizationStatus } from '../data/mockData'

const router = Router()

// Get all users for admin
router.get('/users', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockUsers
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    })
  }
})

// Create new user
router.post('/users', (req, res) => {
  try {
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    mockUsers.push(newUser)
    
    res.json({
      success: true,
      data: newUser
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    })
  }
})

// Assign training to a user
router.post('/assign-training', (req, res) => {
  try {
    const { userId, trainingId } = req.body
    if (!userId || !trainingId) {
      return res.status(400).json({ 
        success: false, 
        error: 'User ID and Training ID are required' 
      })
    }

    const user = mockUsers.find(u => u.id === userId)
    const training = mockTrainings.find(t => t.id === trainingId)

    if (!user || !training) {
      return res.status(404).json({ 
        success: false, 
        error: 'User or Training not found' 
      })
    }

    // Check if already assigned
    const existingAssignment = mockTrainingRegistrations.find(
      reg => reg.userId === userId && reg.trainingId === trainingId
    )

    if (existingAssignment) {
      return res.status(409).json({ 
        success: false, 
        error: 'Training already assigned to this user' 
      })
    }

    const newRegistration = {
      id: `reg-${Date.now()}`,
      userId: userId,
      trainingId: trainingId,
      registeredAt: new Date().toISOString(),
      status: 'registered' as const
    }
    mockTrainingRegistrations.push(newRegistration)

    res.json({ 
      success: true, 
      message: 'Training assigned successfully', 
      data: newRegistration 
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to assign training'
    })
  }
})

// Send notification
router.post('/send-notification', (req, res) => {
  try {
    const { title, message, priority, userIds } = req.body
    
    // Create notifications for each user
    const newNotifications = userIds.map((userId: string) => ({
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: userId,
      title,
      message,
      priority,
      sentAt: new Date().toISOString(),
      read: false
    }))
    
    // Add to mock notifications array
    mockNotifications.push(...newNotifications)
    
    // Update mobilization status based on notification priority
    updateMobilizationStatus(priority, title)
    
    console.log('Sending notification:', {
      title,
      message,
      priority,
      recipients: userIds.length
    })
    
    res.json({
      success: true,
      message: `Notification sent to ${userIds.length} users`,
      data: newNotifications
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to send notification'
    })
  }
})

// Get notifications history
router.get('/notifications', (req, res) => {
  try {
    // Mock notifications history
    const notifications = [
      {
        id: '1',
        title: 'Training Assignment',
        message: 'New training assigned to all soldiers',
        priority: 'normal',
        sentAt: '2024-01-15T10:00:00Z',
        recipients: 5
      },
      {
        id: '2',
        title: 'Emergency Alert',
        message: 'Immediate action required',
        priority: 'urgent',
        sentAt: '2024-01-14T15:30:00Z',
        recipients: 3
      }
    ]
    
    res.json({
      success: true,
      data: notifications
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notifications'
    })
  }
})

// Get analytics
router.get('/analytics', (req, res) => {
  try {
    const analytics = {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      totalTrainings: mockTrainings.length,
      completedTrainings: mockTrainingRegistrations.filter(r => r.status === 'completed').length,
      trainingAssignments: mockTrainingRegistrations.length
    }
    
    res.json({
      success: true,
      data: analytics
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    })
  }
})

// Get current mobilization status
router.get('/mobilization-status', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockSystemState
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mobilization status'
    })
  }
})

// Manually set mobilization status
router.put('/mobilization-status', (req, res) => {
  try {
    const { status, reason } = req.body
    
    if (!status || !['WYSOKI', 'ŚREDNI', 'NISKI'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be WYSOKI, ŚREDNI, or NISKI'
      })
    }
    
    mockSystemState.mobilizationStatus = status
    mockSystemState.lastStatusChange = new Date().toISOString()
    mockSystemState.statusChangeReason = reason || 'Manually updated by admin'
    
    res.json({
      success: true,
      data: mockSystemState,
      message: 'Mobilization status updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update mobilization status'
    })
  }
})

export { router as adminRoutes }
