import React from 'react'
import { AlertCircle, PlayCircle, CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react'

interface CertificateCardProps {
  title: string
  description: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  modules: string[]
  duration: number
  daysLeft: number
  progress?: number // Only for IN_PROGRESS status
  onActionClick: () => void
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  description,
  status,
  modules,
  duration,
  daysLeft,
  progress,
  onActionClick
}) => {
  // Determine icon based on status
  const getStatusIcon = () => {
    switch (status) {
      case 'NOT_STARTED':
        return <AlertCircle className="w-5 h-5 text-white" />
      case 'IN_PROGRESS':
        return <PlayCircle className="w-5 h-5 text-white" />
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-white" />
      default:
        return null
    }
  }

  // Determine status tag styling
  const getStatusTag = () => {
    switch (status) {
      case 'NOT_STARTED':
        return {
          text: 'Nie Rozpoczęto',
          className: 'bg-gray-500 text-white'
        }
      case 'IN_PROGRESS':
        return {
          text: 'W Trakcie',
          className: 'bg-blue-600 text-white'
        }
      case 'COMPLETED':
        return {
          text: 'Ukończono',
          className: 'bg-green-600 text-white'
        }
      default:
        return {
          text: '',
          className: ''
        }
    }
  }

  // Determine button styling and text
  const getButtonConfig = () => {
    switch (status) {
      case 'NOT_STARTED':
        return {
          text: 'Rozpocznij',
          className: 'bg-green-600 hover:bg-green-700 text-white',
          style: { backgroundColor: '#5A6F4F' }
        }
      case 'IN_PROGRESS':
        return {
          text: 'Kontynuuj',
          className: 'bg-gray-700 hover:bg-gray-600 text-white',
          style: { backgroundColor: '#4A4A4A' }
        }
      case 'COMPLETED':
        return {
          text: 'Certyfikat',
          className: 'bg-green-600 hover:bg-green-700 text-white',
          style: { backgroundColor: '#0F1419' }
        }
      default:
        return {
          text: '',
          className: '',
          style: { backgroundColor: '#0F1419' }
        }
    }
  }

  // Determine days left text color (red if below 10 days)
  const getDaysLeftColor = () => {
    return daysLeft < 10 ? 'text-red-500' : 'text-gray-400'
  }

  const statusTag = getStatusTag()
  const buttonConfig = getButtonConfig()

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 justify-between">
        <div className="flex justify-start gap-3 w-full">
          {getStatusIcon()}
          <h4 className="text-md text-white">{title}</h4>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded ${statusTag.className}`}>
          {statusTag.text}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm">{description}</p>

      {/* Progress Bar (only for IN_PROGRESS status) */}
      {status === 'IN_PROGRESS' && progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Postęp</span>
            <span className="text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Modules */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Moduły:</p>
        <div className="flex flex-wrap gap-2">
          {modules.map((module, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap"
            >
              {module}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        {status === 'COMPLETED' ? (
          /* Only show button for completed certificates */
          <div className="w-full flex justify-end">
            <button
              onClick={onActionClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded font-medium transition-colors ${buttonConfig.className}`}
              style={buttonConfig.style}
            >
              <span>{buttonConfig.text}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Show duration and days left for non-completed certificates */
          <>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              {/* Duration */}
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="text-nowrap">{duration} h</span>
              </div>
              
              {/* Days Left */}
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span className={getDaysLeftColor()}>
                  {daysLeft} dni
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onActionClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded font-medium transition-colors ${buttonConfig.className}`}
              style={buttonConfig.style}
            >
              <span>{buttonConfig.text}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
