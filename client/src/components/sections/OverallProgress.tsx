import React from 'react'

interface OverallProgressProps {
  completed: number
  inProgress: number
  notStarted: number
}

export const OverallProgress: React.FC<OverallProgressProps> = ({
  completed,
  inProgress,
  notStarted
}) => {
  const total = completed + inProgress + notStarted
  const completionPercentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Ogólny Postęp</h3>
        <span className="text-gray-400 text-sm">
          {completed}/{total} ukończone
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        {/* Not Started */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {notStarted}
          </div>
          <div className="text-sm text-gray-400 text-nowrap">
            Nie rozpoczęte
          </div>
        </div>

        {/* In Progress */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {inProgress}
          </div>
          <div className="text-sm text-gray-400">
            W Trakcie
          </div>
        </div>

        {/* Completed */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500 mb-1">
            {completed}
          </div>
          <div className="text-sm text-gray-400">
            Ukończone
          </div>
        </div>
      </div>
    </div>
  )
}
