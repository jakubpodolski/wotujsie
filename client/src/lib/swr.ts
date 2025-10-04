import { SWRConfiguration } from 'swr'

// SWR Configuration
export const swrConfig: SWRConfiguration = {
  // Global fetcher will be set in the SWRProvider
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Disable automatic refresh by default
  dedupingInterval: 2000, // Dedupe requests within 2 seconds
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  loadingTimeout: 10000,
  onError: (error) => {
    console.error('SWR Error:', error)
  },
  onSuccess: (data, key) => {
    console.log('SWR Success:', key, data)
  },
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Don't retry on 404s
    if (error.status === 404) return
    
    // Don't retry on 401s (unauthorized)
    if (error.status === 401) return
    
    // Don't retry on 403s (forbidden)
    if (error.status === 403) return
    
    // Retry up to 3 times
    if (retryCount >= 3) return
    
    // Retry after 5 seconds
    setTimeout(() => revalidate({ retryCount }), 5000)
  },
}

// SWR Keys - Centralized key management
export const swrKeys = {
  // Training keys
  trainings: () => ['trainings'] as const,
  training: (id: string) => ['trainings', id] as const,
  userTrainings: (userId: string) => ['trainings', 'user', userId] as const,
  trainingsGrouped: () => ['trainings', 'calendar', 'grouped'] as const,
  trainingsCurrentMonth: () => ['trainings', 'available', 'current-month'] as const,
  
  // Task keys
  userTasks: (userId: string) => ['tasks', 'user', userId] as const,
  taskProgress: (userId: string) => ['tasks', 'progress', userId] as const,
  
  // Weekly plan keys
  userWeeklyPlan: (userId: string) => ['weekly-plans', 'user', userId] as const,
  todayPlan: (userId: string) => ['weekly-plans', 'today', userId] as const,
  
  // Procedure keys
  procedures: () => ['procedures'] as const,
  procedure: (id: string) => ['procedures', id] as const,
  procedureCategory: (categoryId: string) => ['procedures', 'category', categoryId] as const,
  procedureSearch: (query: string) => ['procedures', 'search', query] as const,
  
  // Certificate keys
  userCertificates: (userId: string) => ['certificates', 'user', userId] as const,
  certificateProgress: (userId: string) => ['certificates', 'progress', userId] as const,
  
  // User keys
  user: (id: string) => ['users', id] as const,
  userServiceInfo: (id: string) => ['users', id, 'service-info'] as const,
  userNotifications: (id: string) => ['users', id, 'notifications'] as const,
  
  // Dashboard keys
  dashboard: (userId: string) => ['dashboard', userId] as const,
  dashboardAlerts: (userId: string) => ['dashboard', 'alerts', userId] as const,
  dashboardUpcoming: (userId: string) => ['dashboard', 'upcoming', userId] as const,
  dashboardCertifications: (userId: string) => ['dashboard', 'certifications', userId] as const,
  
  // Calendar keys
  calendar: (userId: string) => ['calendar', userId] as const,
  calendarMonth: (userId: string, year: number, month: number) => ['calendar', 'month', userId, year, month] as const,
  
  // System keys
  systemIncidents: () => ['system', 'incidents'] as const,
  mobilizationStatus: () => ['system', 'mobilization-status'] as const,
  nearestStations: () => ['system', 'nearest-stations'] as const,
} as const

// Helper function to create SWR key with query params
export const createSwrKey = (key: string, params?: Record<string, any>) => {
  if (!params) return key
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      searchParams.set(k, String(v))
    }
  })
  const queryString = searchParams.toString()
  return queryString ? `${key}?${queryString}` : key
}
