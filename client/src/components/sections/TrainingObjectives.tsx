import React from 'react'
import { CheckCircle } from 'lucide-react'

interface TrainingObjectivesProps {
  objectives: string[]
}

export const TrainingObjectives: React.FC<TrainingObjectivesProps> = ({ objectives }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      {/* Header */}
      <h3 className="text-xl font-semibold text-white mb-4">Cele szkolenia</h3>
      
      {/* Objectives List */}
      <ul className="space-y-3">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-white">{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
