import React from 'react'
import { AlertCircle } from 'lucide-react'

interface TrainingPrerequisitesProps {
  prerequisites: string[]
}

export const TrainingPrerequisites: React.FC<TrainingPrerequisitesProps> = ({ prerequisites }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
        <h3 className="text-xl font-semibold text-white">Wymagania wstępne</h3>
      </div>
      
      {/* Prerequisites List */}
      <ul className="space-y-3">
        {prerequisites.map((prerequisite, index) => (
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-white">{prerequisite}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
