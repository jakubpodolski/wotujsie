import React from 'react'

interface DayCardProps {
  day: string
  description: string
  exercisesCount: number
  duration: number
  isToday: boolean
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  description,
  exercisesCount,
  duration,
  isToday
}) => {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
  }

  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${
      isToday ? 'border-2 border-green-500' : 'border border-gray-700'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-white font-medium text-lg">{day}</h3>
            {isToday && (
              <span className="text-green-400 text-sm font-medium">(Dzisiaj)</span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="text-right">
          <div className="text-gray-400 text-sm">
            {exercisesCount} ćwiczeń
          </div>
          <div className="text-gray-400 text-sm">
            {formatDuration(duration)}
          </div>
        </div>
      </div>
    </div>
  )
}
