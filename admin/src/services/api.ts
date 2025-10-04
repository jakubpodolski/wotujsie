import axios from 'axios'

const API_BASE_URL = 'http://localhost:3333/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// User Management - Use admin endpoints
export const getUsers = () => api.get('/admin/users')
export const createUser = (userData: any) => api.post('/admin/users', userData)

// Trainings - Use admin endpoints
export const getTrainings = () => api.get('/trainings')
export const assignTraining = (userId: string, trainingId: string) => 
  api.post(`/admin/assign-training`, { userId, trainingId })

// Notifications
export const sendNotification = (notificationData: any) => 
  api.post('/admin/send-notification', notificationData)
export const getNotifications = () => api.get('/admin/notifications')

// Analytics
export const getAnalytics = () => api.get('/admin/analytics')
