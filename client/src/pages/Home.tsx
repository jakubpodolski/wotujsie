import React, { useState } from 'react'
import { PageHeader } from '../components/sections/PageHeader'
import { AvailableTrainingSection } from '../components/sections/AvailableTrainingSection'
import { CertificationsSection } from '../components/sections/CertificationsSection'
import { UnifiedAlert } from '../components/ui/UnifiedAlert'
import { NotificationAlert } from '../components/ui/NotificationAlert'
import { LoadingCard } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useDashboard } from '../hooks/useApi'

export const Home: React.FC = () => {
  const { dashboard, error, isLoading, mutate } = useDashboard()
  const [closedNotifications, setClosedNotifications] = useState<Set<string>>(new Set())

  // Helper function to get HQ information based on notification priority
  const getHQInfo = (priority: string) => {
    const hqLocations = {
      urgent: {
        name: 'Dowództwo Operacyjne WOT',
        address: 'ul. Marszałkowska 100/102, 00-514 Warszawa',
        distance: '2.3 km'
      },
      high: {
        name: 'Centrum Dowodzenia WOT',
        address: 'ul. Żwirki i Wigury 9, 00-001 Warszawa',
        distance: '1.8 km'
      },
      normal: {
        name: 'Sztab Główny WOT',
        address: 'ul. Nowowiejska 2, 00-001 Warszawa',
        distance: '3.1 km'
      },
      low: {
        name: 'Biuro Koordynacji WOT',
        address: 'ul. Puławska 2, 00-001 Warszawa',
        distance: '4.2 km'
      }
    }
    
    return hqLocations[priority as keyof typeof hqLocations] || hqLocations.normal
  }

  // Helper function to filter notifications based on mobilization status
  const getFilteredNotifications = () => {
    if (!dashboard?.notifications) return []
    
    return dashboard.notifications.filter(n => {
      if (n.read || closedNotifications.has(n.id)) return false
      
      // If WYSOKI status, hide high/urgent notifications (they're shown in UnifiedAlert)
      if (dashboard.mobilizationStatus === 'WYSOKI' && (n.priority === 'urgent' || n.priority === 'high')) {
        return false
      }
      
      return true
    })
  }

  const handleMarkNotificationAsRead = async (notificationId: string) => {
    try {
      // In a real app, you'd call an API to mark as read
      // For now, we'll just update the local state
      if (dashboard?.notifications) {
        const updatedNotifications = dashboard.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true, readAt: new Date().toISOString() } : notif
        )
        mutate({ ...dashboard, notifications: updatedNotifications }, false)
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const handleCloseNotification = (notificationId: string) => {
    setClosedNotifications(prev => new Set([...prev, notificationId]))
  }

  const handleMarkAllAsRead = async () => {
    try {
      if (dashboard?.notifications) {
        const updatedNotifications = dashboard.notifications.map(notif => ({
          ...notif,
          read: true,
          readAt: new Date().toISOString()
        }))
        mutate({ ...dashboard, notifications: updatedNotifications }, false)
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Witaj ponownie, Żołnierzu"
          subtitle="Bądź gotowy, bądź czujny"
        />
        
        {/* Loading state for mobilization status - only show if we expect a status */}
        <div className="rounded-lg px-6 py-4 bg-[#3C2A2A] border border-[#8B2C2C]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white">Tryb Mobilizacyjny</h3>
                <p className="text-sm text-gray-300">Ładowanie statusu gotowości...</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="px-4 py-2 rounded font-bold text-white text-sm bg-gray-600 animate-pulse">
                ŁADOWANIE...
              </div>
            </div>
          </div>
        </div>
        
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Witaj ponownie, Żołnierzu"
          subtitle="Bądź gotowy, bądź czujny"
        />
        
        <ErrorMessage 
          error={error} 
          onRetry={() => mutate()} 
          className="mb-6"
        />
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Witaj ponownie, Żołnierzu"
          subtitle="Bądź gotowy, bądź czujny"
        />
        
        <div className="text-center py-12">
          <p className="text-gray-400">Brak danych do wyświetlenia</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Witaj ponownie, Żołnierzu"
        subtitle="Bądź gotowy, bądź czujny"
      />

      {/* Only show UnifiedAlert if we have a valid mobilization status */}
      {dashboard.mobilizationStatus && (
        <UnifiedAlert 
          mobilizationStatus={dashboard.mobilizationStatus as "WYSOKI" | "ŚREDNI" | "NISKI"} 
          incident={
            // If WYSOKI status, show the latest high/urgent notification as incident
            dashboard.mobilizationStatus === 'WYSOKI' && dashboard.notifications 
              ? (() => {
                  const highPriorityNotification = dashboard.notifications
                    .filter(n => n.priority === 'urgent' || n.priority === 'high')
                    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())[0]
                  
                  return highPriorityNotification ? {
                    id: highPriorityNotification.id,
                    type: 'other' as const,
                    severity: highPriorityNotification.priority === 'urgent' ? 'KRYTYCZNY' as const : 'WYSOKI' as const,
                    title: highPriorityNotification.title,
                    description: highPriorityNotification.message,
                    nearestStation: getHQInfo(highPriorityNotification.priority)
                  } : undefined
                })()
              // Otherwise show the regular incident
              : dashboard.currentIncident ? {
                  ...dashboard.currentIncident,
                  type: dashboard.currentIncident.type === 'earthquake' ? 'other' : dashboard.currentIncident.type as "flood" | "fire" | "medical" | "security" | "other"
                } : undefined
          } 
        />
      )}

      {/* Notifications Section - Only show if there are unread notifications */}
      {(() => {
        const filteredNotifications = getFilteredNotifications()
        return filteredNotifications.length > 0
      })() && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white mr-2">Powiadomienia</h2>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">
                ({getFilteredNotifications().length})
              </span>
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                Oznacz wszystkie jako przeczytane
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {getFilteredNotifications()
              .slice(0, 2)
              .map((notification) => (
                <NotificationAlert
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkNotificationAsRead}
                  onClose={handleCloseNotification}
                />
              ))}
            {getFilteredNotifications().length > 2 && (
              <div className="text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Zobacz wszystkie powiadomienia ({getFilteredNotifications().length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <AvailableTrainingSection
        exercisesInThisMonth={dashboard.availableExercises}
        remainingExercises={dashboard.remainingExercises}
      />

      <CertificationsSection
        certifications={dashboard.certifications}
      />
    </div>
  )
}
