import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScheduleActivity {
  time: string
  activity: string
}

interface ScheduleDay {
  day: string
  activities: ScheduleActivity[]
}

interface TrainingScheduleProps {
  schedule: ScheduleDay[]
}

export const TrainingSchedule: React.FC<TrainingScheduleProps> = ({ schedule }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const isMultiDay = schedule.length > 1
  const currentDay = schedule[currentDayIndex]

  const goToPreviousDay = () => {
    setCurrentDayIndex(prev => prev > 0 ? prev - 1 : schedule.length - 1)
  }

  const goToNextDay = () => {
    setCurrentDayIndex(prev => prev < schedule.length - 1 ? prev + 1 : 0)
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">
          {isMultiDay ? 'Harmonogram Szkolenia' : 'Harmonogram Dnia'}
        </h3>
        
        {/* Day Navigation - only show for multi-day */}
        {isMultiDay && (
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousDay}
              className="p-1 rounded hover:bg-gray-700 transition-colors"
              aria-label="Poprzedni dzień"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </button>
            
            <span className="text-sm text-gray-300 min-w-[80px] text-center">
              {currentDay.day}
            </span>
            
            <button
              onClick={goToNextDay}
              className="p-1 rounded hover:bg-gray-700 transition-colors"
              aria-label="Następny dzień"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        )}
      </div>

      {/* Day Indicator Dots - only show for multi-day */}
      {isMultiDay && (
        <div className="flex justify-center space-x-2 mb-4">
          {schedule.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDayIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentDayIndex 
                  ? 'bg-blue-500' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Dzień ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Activities List */}
      <ul className="space-y-3">
        {currentDay.activities.map((item, activityIndex) => (
          <li key={activityIndex} className="flex items-start">
            <span className="text-white font-medium w-16 flex-shrink-0">{item.time}</span>
            <span className="text-gray-300 ml-4">{item.activity}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
