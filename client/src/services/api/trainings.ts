import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface Training {
  id: string
  title: string
  description: string
  longDescription?: string
  date: string
  time: string
  duration: string
  dateRange: string
  location: string
  address: string
  participants: number
  maxParticipants: number
  status: 'required' | 'optional'
  level: 'Początkujący' | 'Średni' | 'Zaawansowany'
  action: 'signup' | 'registered'
  requirements: string[]
  equipment: string[]
  instructor: {
    name: string
    rank: string
    unit: string
    experience: string
  }
  objectives: string[]
  schedule: {
    day: string
    activities: {
      time: string
      activity: string
    }[]
  }[]
  isMandatory: boolean
}

export interface TrainingRegistration {
  id: string
  trainingId: string
  userId: string
  registeredAt: string
  status: 'registered' | 'cancelled' | 'completed'
}

// API Functions
export const trainingsApi = {
  // Get all available trainings
  getAll: async (): Promise<Training[]> => {
    try {
      const response = await api.get('/trainings')
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get specific training details
  getById: async (id: string): Promise<Training> => {
    try {
      const response = await api.get(`/trainings/${id}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get user's registered trainings
  getUserTrainings: async (userId: string): Promise<Training[]> => {
    try {
      const response = await api.get(`/trainings/user/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Register for a training
  register: async (trainingId: string, userId: string): Promise<TrainingRegistration> => {
    try {
      const response = await api.post(`/trainings/${trainingId}/register`, { userId })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Cancel training registration
  cancelRegistration: async (trainingId: string, userId: string): Promise<void> => {
    try {
      await api.delete(`/trainings/${trainingId}/register`, { data: { userId } })
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get trainings grouped by month
  getGroupedByMonth: async (): Promise<Record<string, Training[]>> => {
    try {
      const response = await api.get('/trainings/calendar/grouped')
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get available trainings for current month
  getCurrentMonth: async (): Promise<Training[]> => {
    try {
      const response = await api.get('/trainings/available/current-month')
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
