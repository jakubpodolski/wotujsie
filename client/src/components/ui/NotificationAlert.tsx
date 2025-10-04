import React from 'react'
import { cn } from '../../lib/utils'
import { Notification } from '../../services/api/dashboard'

interface NotificationAlertProps {
  notification: Notification
  onMarkAsRead?: (notificationId: string) => void
  onClose?: (notificationId: string) => void
  className?: string
}

export const NotificationAlert: React.FC<NotificationAlertProps> = ({
  notification,
  onMarkAsRead,
  onClose,
  className
}) => {
  const getNotificationColor = (priority: string) => {
    if (priority === 'urgent') {
      return 'bg-red-600 hover:bg-red-700'
    }
    if (priority === 'high') {
      return 'bg-orange-600 hover:bg-orange-700'
    }
    if (priority === 'normal') {
      return 'bg-blue-600 hover:bg-blue-700'
    }
    return 'bg-gray-600 hover:bg-gray-700'
  }

  const getNotificationBackground = (priority: string) => {
    if (priority === 'urgent') {
      return 'bg-red-900/20 border-red-500/50'
    }
    if (priority === 'high') {
      return 'bg-orange-900/20 border-orange-500/50'
    }
    if (priority === 'normal') {
      return 'bg-blue-900/20 border-blue-500/50'
    }
    return 'bg-gray-900/20 border-gray-500/50'
  }

  const getNotificationIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
            <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'high':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'normal':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleMarkAsRead = () => {
    if (onMarkAsRead && !notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClose) {
      onClose(notification.id)
    }
  }

  return (
    <div
      className={cn(
        'rounded-lg px-6 py-4 cursor-pointer transition-all relative group',
        getNotificationBackground(notification.priority),
        !notification.read && 'ring-2 ring-blue-500 ring-opacity-50',
        className
      )}
      onClick={handleMarkAsRead}
    >
      <div className="flex items-start justify-between">
        {/* Left section with icon and content */}
        <div className="flex items-start space-x-3 flex-1">
          {/* Notification Icon */}
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon(notification.priority)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-white truncate">
                {notification.title}
              </h3>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              )}
            </div>
            <p className="text-sm text-gray-300 mb-2">
              {notification.message}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span>{formatDate(notification.sentAt)}</span>
              <span className="capitalize">{notification.priority}</span>
            </div>
          </div>
        </div>

        {/* Right section with priority badge and close button */}
        <div className="flex-shrink-0 ml-4 flex items-center space-x-2">
          <span
            className={cn(
              'px-2 py-1 rounded text-xs font-bold text-white',
              getNotificationColor(notification.priority)
            )}
          >
            {notification.priority.toUpperCase()}
          </span>
          {onClose && (
            <button
              onClick={handleClose}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              aria-label="Close notification"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
