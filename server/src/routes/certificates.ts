import { Router } from 'express'
import { mockCertificates } from '../data/mockData'

const router = Router()

// Get user's certificates
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const userCertificates = mockCertificates.filter(cert => cert.userId === userId)
    
    res.json({
      success: true,
      data: userCertificates,
      count: userCertificates.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user certificates'
    })
  }
})

// Get certificate progress statistics
router.get('/progress/:userId', (req, res) => {
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
      error: 'Failed to fetch certificate progress'
    })
  }
})

// Update certificate progress
router.put('/:id/progress', (req, res) => {
  try {
    const { id } = req.params
    const { userId, progress } = req.body
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }
    
    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        error: 'Progress must be between 0 and 100'
      })
    }
    
    const certificateIndex = mockCertificates.findIndex(
      cert => cert.id === id && cert.userId === userId
    )
    
    if (certificateIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Certificate not found'
      })
    }
    
    // Update progress
    mockCertificates[certificateIndex].progress = progress
    
    // Update status based on progress
    if (progress === 100) {
      mockCertificates[certificateIndex].status = 'COMPLETED'
    } else if (progress > 0) {
      mockCertificates[certificateIndex].status = 'IN_PROGRESS'
    }
    
    res.json({
      success: true,
      data: mockCertificates[certificateIndex],
      message: 'Certificate progress updated'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update certificate progress'
    })
  }
})

// Start a certificate program
router.post('/:id/start', (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }
    
    const certificateIndex = mockCertificates.findIndex(
      cert => cert.id === id && cert.userId === userId
    )
    
    if (certificateIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Certificate not found'
      })
    }
    
    const certificate = mockCertificates[certificateIndex]
    
    if (certificate.status !== 'NOT_STARTED') {
      return res.status(400).json({
        success: false,
        error: 'Certificate already started or completed'
      })
    }
    
    // Start the certificate
    certificate.status = 'IN_PROGRESS'
    certificate.progress = 0
    
    res.json({
      success: true,
      data: certificate,
      message: 'Certificate program started'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to start certificate program'
    })
  }
})

// Complete a certificate
router.post('/:id/complete', (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      })
    }
    
    const certificateIndex = mockCertificates.findIndex(
      cert => cert.id === id && cert.userId === userId
    )
    
    if (certificateIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Certificate not found'
      })
    }
    
    const certificate = mockCertificates[certificateIndex]
    
    if (certificate.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        error: 'Certificate already completed'
      })
    }
    
    // Complete the certificate
    certificate.status = 'COMPLETED'
    certificate.progress = 100
    certificate.daysLeft = 0
    
    res.json({
      success: true,
      data: certificate,
      message: 'Certificate completed successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to complete certificate'
    })
  }
})

export { router as certificateRoutes }
