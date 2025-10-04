import { Router } from 'express'
import { userRoutes } from './users'
import { dashboardRoutes } from './dashboard'
import { settingsRoutes } from './settings'
import { trainingRoutes } from './trainings'
import { taskRoutes } from './tasks'
import { weeklyPlanRoutes } from './weekly-plans'
import { procedureRoutes } from './procedures'
import { certificateRoutes } from './certificates'
import { calendarRoutes } from './calendar'
import { systemRoutes } from './system'

export const apiRoutes = Router()

// Mount route modules
apiRoutes.use('/users', userRoutes)
apiRoutes.use('/dashboard', dashboardRoutes)
apiRoutes.use('/settings', settingsRoutes)
apiRoutes.use('/trainings', trainingRoutes)
apiRoutes.use('/tasks', taskRoutes)
apiRoutes.use('/weekly-plans', weeklyPlanRoutes)
apiRoutes.use('/procedures', procedureRoutes)
apiRoutes.use('/certificates', certificateRoutes)
apiRoutes.use('/calendar', calendarRoutes)
apiRoutes.use('/system', systemRoutes)

// API info endpoint
apiRoutes.get('/', (req, res) => {
  res.json({
    message: 'WotujSie API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      dashboard: '/api/dashboard',
      settings: '/api/settings',
      trainings: '/api/trainings',
      tasks: '/api/tasks',
      weeklyPlans: '/api/weekly-plans',
      procedures: '/api/procedures',
      certificates: '/api/certificates',
      calendar: '/api/calendar',
      system: '/api/system'
    }
  })
})
