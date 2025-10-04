import { Router } from 'express'
import { mockTasks } from '../data/mockData'

const router = Router()

// Get user's daily tasks
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const userTasks = mockTasks.filter(task => task.userId === userId)
    
    res.json({
      success: true,
      data: userTasks,
      count: userTasks.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user tasks'
    })
  }
})

// Toggle task completion status
router.put('/:id/toggle', (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }
    
    const taskIndex = mockTasks.findIndex(task => task.id === id && task.userId === userId)
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      })
    }
    
    // Toggle completion status
    mockTasks[taskIndex].completed = !mockTasks[taskIndex].completed
    
    res.json({
      success: true,
      data: mockTasks[taskIndex],
      message: `Task ${mockTasks[taskIndex].completed ? 'completed' : 'uncompleted'}`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to toggle task status'
    })
  }
})

// Mark all tasks as completed
router.put('/user/:userId/complete-all', (req, res) => {
  try {
    const { userId } = req.params
    
    const userTasks = mockTasks.filter(task => task.userId === userId)
    
    if (userTasks.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No tasks found for user'
      })
    }
    
    // Mark all tasks as completed
    userTasks.forEach(task => {
      task.completed = true
    })
    
    res.json({
      success: true,
      data: userTasks,
      message: 'All tasks marked as completed'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to complete all tasks'
    })
  }
})

// Get user's task progress statistics
router.get('/progress/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const userTasks = mockTasks.filter(task => task.userId === userId)
    
    const completedTasks = userTasks.filter(task => task.completed).length
    const totalTasks = userTasks.length
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    
    // Calculate total time (simplified - just counting completed tasks * 30 min)
    const totalMinutes = completedTasks * 30
    
    // Calculate streak (simplified - just return a mock value)
    const streak = 3 // Mock value for consecutive days
    
    res.json({
      success: true,
      data: {
        completedTasks,
        totalTasks,
        progressPercentage: Math.round(progressPercentage),
        totalMinutes,
        streak,
        tasks: userTasks
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task progress'
    })
  }
})

export { router as taskRoutes }
