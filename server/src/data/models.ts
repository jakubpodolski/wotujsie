// Data models for WotujSie API

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

export interface Task {
  id: string
  title: string
  description: string
  duration: string
  category: string
  completed: boolean
  userId: string
}

export interface ProcedureStep {
  id: number
  text: string
}

export interface Procedure {
  id: string
  title: string
  description: string
  steps: ProcedureStep[]
  priority: 'Critical' | 'Important' | 'Standard'
}

export interface ProcedureCategory {
  id: string
  title: string
  icon: string
  procedureCount: number
  procedures: Procedure[]
}

export interface WeeklyPlanDay {
  id: string
  day: string
  description: string
  exercisesCount: number
  duration: number // in minutes
  isToday: boolean
  userId: string
}

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
  createdAt: string
}

export interface TrainingRegistration {
  id: string
  trainingId: string
  userId: string
  registeredAt: string
  status: 'registered' | 'cancelled' | 'completed'
}

export interface Notification {
  id: string
  userId?: string // null means sent to all users
  title: string
  message: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  sentAt: string
  read: boolean
  readAt?: string
}
