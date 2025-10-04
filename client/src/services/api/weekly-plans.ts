import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface WeeklyPlanDay {
  id: string
  day: string
  description: string
  exercisesCount: number
  duration: number // in minutes
  isToday: boolean
  userId: string
}

// API Functions
export const weeklyPlansApi = {
  // Get user's weekly training plan
  getUserWeeklyPlan: async (userId: string): Promise<WeeklyPlanDay[]> => {
    try {
      const response = await api.get(`/weekly-plans/user/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Update weekly plan
  updateWeeklyPlan: async (userId: string, weeklyPlan: Omit<WeeklyPlanDay, 'userId'>[]): Promise<WeeklyPlanDay[]> => {
    try {
      const response = await api.put(`/weekly-plans/user/${userId}`, {
        weeklyPlan
      })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get today's plan details
  getTodayPlan: async (userId: string): Promise<WeeklyPlanDay> => {
    try {
      const response = await api.get(`/weekly-plans/today/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
