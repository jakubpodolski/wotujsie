import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface Training {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  status: 'required' | 'optional'
  level: 'Początkujący' | 'Średni' | 'Zaawansowany'
  action: 'signup' | 'registered'
  isMandatory: boolean
}

export interface CalendarData {
  [month: string]: Training[]
}

export interface MonthlyCalendar {
  year: number
  month: number
  monthName: string
  trainings: Training[]
  count: number
}

export interface PlannedTraining {
  id: string
  title: string
  date: string
  location: string
  status: 'planned'
  userId: string
  createdAt: string
}

// API Functions
export const calendarApi = {
  // Get user's calendar view
  getCalendar: async (userId: string, view: 'yours' | 'all' = 'yours'): Promise<CalendarData> => {
    try {
      const response = await api.get(`/calendar/${userId}`, {
        params: { view }
      })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get monthly calendar
  getMonthlyCalendar: async (
    userId: string, 
    year: number, 
    month: number, 
    view: 'yours' | 'all' = 'yours'
  ): Promise<MonthlyCalendar> => {
    try {
      const response = await api.get(`/calendar/month/${userId}/${year}/${month}`, {
        params: { view }
      })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Plan new training (future feature)
  planTraining: async (userId: string, trainingData: any): Promise<PlannedTraining> => {
    try {
      const response = await api.post('/calendar/plan-training', {
        userId,
        trainingData
      })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
