import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface Certificate {
  id: string
  title: string
  description: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  modules: string[]
  duration: number
  daysLeft: number
  progress?: number
  userId: string
}

export interface CertificateProgress {
  completed: number
  inProgress: number
  notStarted: number
  total: number
  certificates: Certificate[]
}

// API Functions
export const certificatesApi = {
  // Get user's certificates
  getUserCertificates: async (userId: string): Promise<Certificate[]> => {
    try {
      const response = await api.get(`/certificates/user/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get certificate progress statistics
  getProgress: async (userId: string): Promise<CertificateProgress> => {
    try {
      const response = await api.get(`/certificates/progress/${userId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Update certificate progress
  updateProgress: async (certificateId: string, userId: string, progress: number): Promise<Certificate> => {
    try {
      const response = await api.put(`/certificates/${certificateId}/progress`, {
        userId,
        progress
      })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Start a certificate program
  start: async (certificateId: string, userId: string): Promise<Certificate> => {
    try {
      const response = await api.post(`/certificates/${certificateId}/start`, { userId })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Complete a certificate
  complete: async (certificateId: string, userId: string): Promise<Certificate> => {
    try {
      const response = await api.post(`/certificates/${certificateId}/complete`, { userId })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
