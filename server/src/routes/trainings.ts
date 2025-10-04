import { Router } from 'express'
import { 
  mockTrainings, 
  mockTrainingRegistrations, 
  getUserTrainings, 
  getTrainingsByMonth 
} from '../data/mockData'

const router = Router()

// Get all available trainings
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockTrainings,
      count: mockTrainings.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trainings'
    })
  }
})

// Get specific training details
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const training = mockTrainings.find(t => t.id === id)
    
    if (!training) {
      return res.status(404).json({
        success: false,
        error: 'Training not found'
      })
    }
    
    res.json({
      success: true,
      data: training
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch training details'
    })
  }
})

// Get user's registered trainings
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const userTrainings = getUserTrainings(userId)
    
    res.json({
      success: true,
      data: userTrainings,
      count: userTrainings.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user trainings'
    })
  }
})

// Register for a training
router.post('/:id/register', (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }
    
    const training = mockTrainings.find(t => t.id === id)
    if (!training) {
      return res.status(404).json({
        success: false,
        error: 'Training not found'
      })
    }
    
    // Check if already registered
    const existingRegistration = mockTrainingRegistrations.find(
      reg => reg.trainingId === id && reg.userId === userId && reg.status === 'registered'
    )
    
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        error: 'Already registered for this training'
      })
    }
    
    // Check capacity
    if (training.participants >= training.maxParticipants) {
      return res.status(400).json({
        success: false,
        error: 'Training is full'
      })
    }
    
    // Create registration
    const newRegistration = {
      id: (mockTrainingRegistrations.length + 1).toString(),
      trainingId: id,
      userId,
      registeredAt: new Date().toISOString(),
      status: 'registered' as const
    }
    
    mockTrainingRegistrations.push(newRegistration)
    
    // Update training participants count
    training.participants += 1
    training.action = 'registered'
    
    res.json({
      success: true,
      data: newRegistration,
      message: 'Successfully registered for training'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to register for training'
    })
  }
})

// Cancel training registration
router.delete('/:id/register', (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }
    
    const registrationIndex = mockTrainingRegistrations.findIndex(
      reg => reg.trainingId === id && reg.userId === userId && reg.status === 'registered'
    )
    
    if (registrationIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Registration not found'
      })
    }
    
    // Update registration status
    mockTrainingRegistrations[registrationIndex].status = 'cancelled'
    
    // Update training participants count
    const training = mockTrainings.find(t => t.id === id)
    if (training) {
      training.participants = Math.max(0, training.participants - 1)
      training.action = 'signup'
    }
    
    res.json({
      success: true,
      message: 'Successfully cancelled training registration'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to cancel training registration'
    })
  }
})

// Get trainings grouped by month
router.get('/calendar/grouped', (req, res) => {
  try {
    const groupedTrainings = getTrainingsByMonth(mockTrainings)
    
    res.json({
      success: true,
      data: groupedTrainings
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch grouped trainings'
    })
  }
})

// Get available trainings for current month
router.get('/available/current-month', (req, res) => {
  try {
    const currentMonth = new Date().toLocaleDateString('pl-PL', { month: 'long' })
    const groupedTrainings = getTrainingsByMonth(mockTrainings)
    const currentMonthTrainings = groupedTrainings[currentMonth] || []
    
    res.json({
      success: true,
      data: currentMonthTrainings,
      count: currentMonthTrainings.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current month trainings'
    })
  }
})

export { router as trainingRoutes }
