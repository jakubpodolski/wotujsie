import React from 'react'
import { MapPin, Clock, Users, Shield } from 'lucide-react'

interface TrainingOverviewProps {
  description: string
  location: string
  duration: string
  dateRange: string
  enrolled: number
  capacity: number
  instructor: {
    name: string
    rank: string
    unit: string
  }
}

export const TrainingOverview: React.FC<TrainingOverviewProps> = ({
  description,
  location,
  duration,
  dateRange,
  enrolled,
  capacity,
  instructor
}) => {
  const enrollmentPercentage = (enrolled / capacity) * 100

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-white mb-4">Przegląd</h2>
      
      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Divider */}
      <div className="border-b border-gray-700 mb-6"></div>
      
      {/* Details Grid */}
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-400 mb-1">Lokalizacja</p>
            <p className="text-white font-medium">{location}</p>
          </div>
        </div>
        
        {/* Duration */}
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-400 mb-1">Czas trwania</p>
            <p className="text-white font-medium">{duration} ({dateRange})</p>
          </div>
        </div>
        
        {/* Capacity */}
        <div className="flex items-start space-x-3">
          <Users className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Pojemność</p>
            <p className="text-white font-medium mb-2">{enrolled} / {capacity} zapisanych</p>
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${enrollmentPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Lead Instructor */}
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-400 mb-1">Główny instruktor</p>
            <p className="text-white font-medium">{instructor.name}</p>
            <p className="text-sm text-gray-400">{instructor.rank}, {instructor.unit}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
