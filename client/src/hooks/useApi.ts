import useSWR from 'swr'
import { swrKeys, swrConfig } from '../lib/swr'
import { USER_ID } from '../lib/api'
import {
  trainingsApi,
  tasksApi,
  proceduresApi,
  certificatesApi,
  usersApi,
  dashboardApi,
  calendarApi,
  weeklyPlansApi,
  systemApi,
  type Training,
  type Task,
  type TaskProgress,
  type ProcedureCategory,
  type Certificate,
  type CertificateProgress,
  type User,
  type DashboardData,
  type CalendarData,
  type WeeklyPlanDay,
  type Incident,
  type MobilizationStatus,
  type NearestStation
} from '../services/api'

// Global fetcher function
const fetcher = (url: string) => fetch(url).then(res => res.json())

// Training hooks
export const useTrainings = () => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.trainings(),
    () => trainingsApi.getAll(),
    swrConfig
  )
  return { trainings: data, error, isLoading, mutate }
}

export const useTraining = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.training(id),
    () => trainingsApi.getById(id),
    swrConfig
  )
  return { training: data, error, isLoading, mutate }
}

export const useUserTrainings = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.userTrainings(userId),
    () => trainingsApi.getUserTrainings(userId),
    swrConfig
  )
  return { trainings: data, error, isLoading, mutate }
}

export const useTrainingsGrouped = () => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.trainingsGrouped(),
    () => trainingsApi.getGroupedByMonth(),
    swrConfig
  )
  return { trainingsByMonth: data, error, isLoading, mutate }
}

export const useCurrentMonthTrainings = () => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.trainingsCurrentMonth(),
    () => trainingsApi.getCurrentMonth(),
    swrConfig
  )
  return { trainings: data, error, isLoading, mutate }
}

// Task hooks
export const useUserTasks = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.userTasks(userId),
    () => tasksApi.getUserTasks(userId),
    swrConfig
  )
  return { tasks: data, error, isLoading, mutate }
}

export const useTaskProgress = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.taskProgress(userId),
    () => tasksApi.getProgress(userId),
    swrConfig
  )
  return { progress: data, error, isLoading, mutate }
}

// Weekly plan hooks
export const useUserWeeklyPlan = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.userWeeklyPlan(userId),
    () => weeklyPlansApi.getUserWeeklyPlan(userId),
    swrConfig
  )
  return { weeklyPlan: data, error, isLoading, mutate }
}

export const useTodayPlan = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.todayPlan(userId),
    () => weeklyPlansApi.getTodayPlan(userId),
    swrConfig
  )
  return { todayPlan: data, error, isLoading, mutate }
}

// Procedure hooks
export const useProcedures = () => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.procedures(),
    () => proceduresApi.getAll(),
    swrConfig
  )
  return { procedures: data, error, isLoading, mutate }
}

export const useProcedure = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.procedure(id),
    () => proceduresApi.getById(id),
    swrConfig
  )
  return { procedure: data, error, isLoading, mutate }
}

export const useProcedureSearch = (query: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    query ? swrKeys.procedureSearch(query) : null,
    () => proceduresApi.search(query),
    swrConfig
  )
  return { procedures: data, error, isLoading, mutate }
}

// Certificate hooks
export const useUserCertificates = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.userCertificates(userId),
    () => certificatesApi.getUserCertificates(userId),
    swrConfig
  )
  return { certificates: data, error, isLoading, mutate }
}

export const useCertificateProgress = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.certificateProgress(userId),
    () => certificatesApi.getProgress(userId),
    swrConfig
  )
  return { progress: data, error, isLoading, mutate }
}

// User hooks
export const useUser = (id: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.user(id),
    () => usersApi.getProfile(id),
    swrConfig
  )
  return { user: data, error, isLoading, mutate }
}

export const useUserServiceInfo = (id: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.userServiceInfo(id),
    () => usersApi.getServiceInfo(id),
    swrConfig
  )
  return { serviceInfo: data, error, isLoading, mutate }
}

export const useUserNotifications = (id: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.userNotifications(id),
    () => usersApi.getNotifications(id),
    swrConfig
  )
  return { notifications: data, error, isLoading, mutate }
}

// Dashboard hooks
export const useDashboard = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.dashboard(userId),
    () => dashboardApi.getDashboard(userId),
    swrConfig
  )
  return { dashboard: data, error, isLoading, mutate }
}

export const useDashboardAlerts = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.dashboardAlerts(userId),
    () => dashboardApi.getAlerts(userId),
    swrConfig
  )
  return { alerts: data, error, isLoading, mutate }
}

export const useDashboardUpcoming = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.dashboardUpcoming(userId),
    () => dashboardApi.getUpcoming(userId),
    swrConfig
  )
  return { upcoming: data, error, isLoading, mutate }
}

export const useDashboardCertifications = (userId: string = USER_ID) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.dashboardCertifications(userId),
    () => dashboardApi.getCertifications(userId),
    swrConfig
  )
  return { certifications: data, error, isLoading, mutate }
}

// Calendar hooks
export const useCalendar = (userId: string = USER_ID, view: 'yours' | 'all' = 'yours') => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.calendar(userId),
    () => calendarApi.getCalendar(userId, view),
    swrConfig
  )
  return { calendar: data, error, isLoading, mutate }
}

export const useMonthlyCalendar = (userId: string = USER_ID, year: number, month: number, view: 'yours' | 'all' = 'yours') => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.calendarMonth(userId, year, month),
    () => calendarApi.getMonthlyCalendar(userId, year, month, view),
    swrConfig
  )
  return { monthlyCalendar: data, error, isLoading, mutate }
}

// System hooks
export const useSystemIncidents = () => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.systemIncidents(),
    () => systemApi.getIncidents(),
    swrConfig
  )
  return { incidents: data, error, isLoading, mutate }
}

export const useMobilizationStatus = () => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.mobilizationStatus(),
    () => systemApi.getMobilizationStatus(),
    swrConfig
  )
  return { status: data, error, isLoading, mutate }
}

export const useNearestStations = (lat?: number, lng?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    swrKeys.nearestStations(),
    () => systemApi.getNearestStations(lat, lng),
    swrConfig
  )
  return { stations: data, error, isLoading, mutate }
}
