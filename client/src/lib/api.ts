import axios from 'axios'

// API Configuration
const API_BASE_URL = 'http://localhost:3333/api'

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.data)
    
    // Handle common error cases
    if (error.response?.status === 404) {
      console.warn('Resource not found')
    } else if (error.response?.status >= 500) {
      console.error('Server error')
    }
    
    return Promise.reject(error)
  }
)

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  count?: number
  message?: string
  error?: string
}

// API Error Type
export interface ApiError {
  success: false
  error: string
  message?: string
}

// Helper function to handle API responses
export const handleApiResponse = <T>(response: { data: ApiResponse<T> }): T => {
  if (response.data.success) {
    return response.data.data
  }
  throw new Error(response.data.error || 'API request failed')
}

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

// Constants
export const USER_ID = '1' // Hardcoded for single user assumption
