import React from 'react'
import { TrainingCard, Training } from './TrainingCard'

interface MonthlyTrainingGroupProps {
  month: string
  trainings: Training[]
  onTrainingClick: (trainingId: string) => void
}

export const MonthlyTrainingGroup: React.FC<MonthlyTrainingGroupProps> = ({
  month,
  trainings,
  onTrainingClick
}) => {
  return (
    <div className="space-y-4">
      {/* Month header */}
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-bold text-white">{month}</h2>
        <span className="text-sm text-gray-400">({trainings.length} szkoleń)</span>
      </div>
      
      {/* Training cards */}
      <div className="space-y-4">
        {trainings.map((training) => (
          <TrainingCard
            key={training.id}
            training={training}
            onTrainingClick={onTrainingClick}
          />
        ))}
      </div>
    </div>
  )
}
