import React from 'react'
import { cn } from '../../lib/utils'

interface UnifiedAlertProps {
  mobilizationStatus?: 'WYSOKI' | 'ŚREDNI' | 'NISKI'
  incident?: {
    id: string
    type: 'flood' | 'fire' | 'medical' | 'security' | 'other'
    severity: 'KRYTYCZNY' | 'WYSOKI' | 'ŚREDNI' | 'NISKI'
    title: string
    description: string
    nearestStation: {
      name: string
      address: string
      distance: string
    }
  }
  className?: string
}

export const UnifiedAlert: React.FC<UnifiedAlertProps> = ({
  mobilizationStatus = 'WYSOKI',
  incident,
  className
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WYSOKI':
        return 'bg-red-600 hover:bg-red-700'
      case 'ŚREDNI':
        return 'bg-yellow-600 hover:bg-yellow-700'
      case 'NISKI':
        return 'bg-green-600 hover:bg-green-700'
      default:
        return 'bg-red-600 hover:bg-red-700'
    }
  }

  return (
    <div
      className={cn(
        'rounded-lg px-6 py-4 bg-[#3C2A2A] border border-[#8B2C2C]',
        className
      )}
    >
      {/* Mobilization Alert Section */}
      <div className="flex items-center justify-between mb-4">
        {/* Left section with icon and text */}
        <div className="flex items-center space-x-3">
          {/* Shield Icon */}
          <div className="flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#8B2C2C]"
            >
              <path
                d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-white">
              Tryb Mobilizacyjny
            </h3>
            <p className="text-sm text-gray-300">
              Aktualny status gotowości
            </p>
          </div>
        </div>

        {/* Right section with status button */}
        <div className="flex-shrink-0">
          <button
            className={cn(
              'px-4 py-2 rounded font-bold text-white text-sm transition-colors',
              getStatusColor(mobilizationStatus.toUpperCase())
            )}
          >
            {mobilizationStatus.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Incident Alert Section - only show if incident exists */}
      {incident && (
        <>
          {/* Separator line */}
          <div className="h-px bg-[#8B2C2C] mb-4"></div>

          {/* Header with warning icon and title */}
          <div className="flex items-center space-x-3 mb-3">
            {/* Warning Triangle Icon */}
            <div className="flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#8B2C2C]"
              >
                <path
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">
              Ostrzeżenie: {incident.title}
            </h3>
          </div>

          {/* Main message */}
          <p className="text-sm text-gray-300 mb-4">
            {incident.description}
          </p>

          {/* Station information card */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">
                  Najbliższa Jednostka
                </p>
                <p className="text-sm font-bold text-white mb-1">
                  {incident.nearestStation.name}
                </p>
                <p className="text-sm text-gray-300">
                  {incident.nearestStation.address}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">
                  Odległość
                </p>
                <p className="text-sm font-bold text-red-500">
                  {incident.nearestStation.distance}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
