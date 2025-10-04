import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface Task {
  id: string
  title: string
  description: string
  duration: string
  category: string
  completed: boolean
  userId: string
}

export interface TaskProgress {
  completedTasks: number
  totalTasks: number
  progressPercentage: number
  totalMinutes: number
  streak: number
  tasks: Task[]
}

// API Functions
export const tasksApi = {
  // Get user's daily tasks
  getUserTasks: async (userId: string): Promise<Task[]> => {
    try {
      const response = await api.get(`/tasks/user/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Toggle task completion status
  toggleTask: async (taskId: string, userId: string): Promise<Task> => {
    try {
      const response = await api.put(`/tasks/${taskId}/toggle`, { userId })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Mark all tasks as completed
  completeAllTasks: async (userId: string): Promise<Task[]> => {
    try {
      const response = await api.put(`/tasks/user/${userId}/complete-all`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get user's task progress statistics
  getProgress: async (userId: string): Promise<TaskProgress> => {
    try {
      const response = await api.get(`/tasks/progress/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
