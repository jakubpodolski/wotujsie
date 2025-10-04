import { Router } from 'express'
import { 
  mockTrainings, 
  mockCertificates, 
  mockIncidents, 
  getUserTrainings,
  getTrainingsByMonth 
} from '../data/mockData'

const router = Router()

// Get home dashboard data
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params
    
    // Get user's registered trainings
    const userTrainings = getUserTrainings(userId)
    
    // Get available trainings for current month
    const currentMonth = new Date().toLocaleDateString('pl-PL', { month: 'long' })
    const groupedTrainings = getTrainingsByMonth(mockTrainings)
    const currentMonthTrainings = groupedTrainings[currentMonth] || []
    
    // Get user's certificates
    const userCertificates = mockCertificates.filter(cert => cert.userId === userId)
    
    // Get current incidents
    const currentIncidents = mockIncidents.filter(incident => 
      new Date(incident.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
    )
    
    // Mock available exercises for this month - prioritize October trainings
    const octoberTrainings = mockTrainings.filter(t => 
      ['field-training', 'medical-training'].includes(t.id)
    )
    
    const availableTrainings = [
      ...octoberTrainings.slice(0, 2),
      ...currentMonthTrainings.slice(0, 1)
    ]
    
    const availableExercises = availableTrainings.map(training => ({
      id: training.id,
      title: training.title,
      date: training.date,
      status: training.status === 'required' ? 'required' : 'optional',
      action: training.action
    }))
    
    // Mock certifications data
    const certifications = userCertificates.map(cert => ({
      id: cert.id,
      title: cert.title,
      expiresAt: new Date(Date.now() + cert.daysLeft * 24 * 60 * 60 * 1000).toLocaleDateString('pl-PL'),
      status: cert.status === 'COMPLETED' ? 'recently-renewed' : 
              cert.status === 'IN_PROGRESS' ? 'in-progress' : 'expiring',
      progress: cert.progress
    }))
    
    // Mock current incident
    const currentIncident = currentIncidents.length > 0 ? {
      id: currentIncidents[0].id,
      type: currentIncidents[0].type,
      severity: currentIncidents[0].severity,
      title: currentIncidents[0].title,
      description: currentIncidents[0].description,
      nearestStation: currentIncidents[0].nearestStation
    } : null
    
    res.json({
      success: true,
      data: {
        availableExercises,
        remainingExercises: Math.max(0, 4 - availableExercises.length),
        certifications,
        currentIncident,
        mobilizationStatus: 'WYSOKI'
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    })
  }
})

// Get current alerts/incidents
router.get('/alerts/:userId', (req, res) => {
  try {
    const { userId } = req.params
    
    // Get current incidents
    const currentIncidents = mockIncidents.filter(incident => 
      new Date(incident.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
    )
    
    res.json({
      success: true,
      data: currentIncidents,
      count: currentIncidents.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alerts'
    })
  }
})

// Get upcoming trainings
router.get('/upcoming/:userId', (req, res) => {
  try {
    const { userId } = req.params
    
    // Get user's registered trainings
    const userTrainings = getUserTrainings(userId)
    
    // Filter upcoming trainings (mock - in real app, filter by date)
    const upcomingTrainings = userTrainings.slice(0, 3)
    
    res.json({
      success: true,
      data: upcomingTrainings,
      count: upcomingTrainings.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming trainings'
    })
  }
})

// Get certification status
router.get('/certifications/:userId', (req, res) => {
  try {
    const { userId } = req.params
    
    const userCertificates = mockCertificates.filter(cert => cert.userId === userId)
    
    const completed = userCertificates.filter(cert => cert.status === 'COMPLETED').length
    const inProgress = userCertificates.filter(cert => cert.status === 'IN_PROGRESS').length
    const notStarted = userCertificates.filter(cert => cert.status === 'NOT_STARTED').length
    
    res.json({
      success: true,
      data: {
        completed,
        inProgress,
        notStarted,
        total: userCertificates.length,
        certificates: userCertificates
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch certification status'
    })
  }
})

export { router as dashboardRoutes }