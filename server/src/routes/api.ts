import { Router } from 'express'
import { userRoutes } from './users'
import { dashboardRoutes } from './dashboard'
import { settingsRoutes } from './settings'

export const apiRoutes = Router()

// Mount route modules
apiRoutes.use('/users', userRoutes)
apiRoutes.use('/dashboard', dashboardRoutes)
apiRoutes.use('/settings', settingsRoutes)

// API info endpoint
apiRoutes.get('/', (req, res) => {
  res.json({
    message: 'WotujSie API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      dashboard: '/api/dashboard',
      settings: '/api/settings'
    }
  })
})
