import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  rank: string
  unit: string
  location: string
  status: 'active' | 'inactive' | 'suspended'
  serviceInfo: {
    unit: string
    rank: string
    baseLocation: string
  }
  createdAt: string
  updatedAt: string
}

export interface ServiceInfo {
  unit: string
  rank: string
  baseLocation: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
  trainingReminders: boolean
  certificateAlerts: boolean
  emergencyAlerts: boolean
}

// API Functions
export const usersApi = {
  // Get user profile
  getProfile: async (id: string): Promise<User> => {
    try {
      const response = await api.get(`/users/${id}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Update user profile
  updateProfile: async (id: string, updates: Partial<User>): Promise<User> => {
    try {
      const response = await api.put(`/users/${id}`, updates)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get user's service information
  getServiceInfo: async (id: string): Promise<ServiceInfo> => {
    try {
      const response = await api.get(`/users/${id}/service-info`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Update service information
  updateServiceInfo: async (id: string, serviceInfo: Partial<ServiceInfo>): Promise<ServiceInfo> => {
    try {
      const response = await api.put(`/users/${id}/service-info`, serviceInfo)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get user notification settings
  getNotifications: async (id: string): Promise<NotificationSettings> => {
    try {
      const response = await api.get(`/users/${id}/notifications`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Update notification settings
  updateNotifications: async (id: string, settings: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    try {
      const response = await api.put(`/users/${id}/notifications`, settings)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
