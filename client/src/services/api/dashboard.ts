import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface AvailableExercise {
  id: string
  title: string
  date: string
  status: 'required' | 'optional'
  action: 'signup' | 'registered'
}

export interface Certification {
  id: string
  title: string
  expiresAt: string
  status: 'expiring' | 'in-progress' | 'recently-renewed'
  progress?: number
}

export interface Incident {
  id: string
  type: 'flood' | 'fire' | 'earthquake' | 'other'
  severity: 'KRYTYCZNY' | 'WYSOKI' | 'ŚREDNI' | 'NISKI'
  title: string
  description: string
  nearestStation: {
    name: string
    address: string
    distance: string
  }
}

export interface DashboardData {
  availableExercises: AvailableExercise[]
  remainingExercises: number
  certifications: Certification[]
  currentIncident: Incident | null
  mobilizationStatus: string
}

export interface UpcomingTraining {
  id: string
  title: string
  date: string
  time: string
  location: string
  status: 'required' | 'optional'
}

export interface CertificateProgress {
  completed: number
  inProgress: number
  notStarted: number
  total: number
  certificates: Array<{
    id: string
    title: string
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
    progress?: number
  }>
}

// API Functions
export const dashboardApi = {
  // Get home dashboard data
  getDashboard: async (userId: string): Promise<DashboardData> => {
    try {
      const response = await api.get(`/dashboard/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get current alerts/incidents
  getAlerts: async (userId: string): Promise<Incident[]> => {
    try {
      const response = await api.get(`/dashboard/alerts/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get upcoming trainings
  getUpcoming: async (userId: string): Promise<UpcomingTraining[]> => {
    try {
      const response = await api.get(`/dashboard/upcoming/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get certification status
  getCertifications: async (userId: string): Promise<CertificateProgress> => {
    try {
      const response = await api.get(`/dashboard/certifications/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
