import React from 'react'

export interface Training {
  id: string
  title: string
  description: string
  time: string
  location: string
  participants: number
  isMandatory: boolean
  isSignedUp?: boolean
}

interface TrainingCardProps {
  training: Training
  onTrainingClick: (trainingId: string) => void
}

export const TrainingCard: React.FC<TrainingCardProps> = ({ training, onTrainingClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-4 cursor-pointer hover:border-gray-600 transition-colors"
      onClick={() => onTrainingClick(training.id)}
    >
      {/* Header with title and tags */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-white">{training.title}</h3>
        <div className="flex items-center space-x-2">
          {training.isSignedUp && (
            <span className="px-3 py-1 rounded text-sm font-medium bg-green-600 text-white flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Zapisano
            </span>
          )}
          <span
            className={`
              px-3 py-1 rounded text-sm font-medium
              ${training.isMandatory 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-600 text-white'
              }
            `}
          >
            {training.isMandatory ? 'Obowiązkowe' : 'Opcjonalne'}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm">{training.description}</p>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {training.time}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {training.location}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {training.participants} uczestników oczekiwanych
        </div>
      </div>
    </div>
  )
}
