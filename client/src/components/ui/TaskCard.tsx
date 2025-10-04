import React from 'react'

interface TaskCardProps {
  id: string
  title: string
  description: string
  duration: string
  category: string
  completed: boolean
  onToggle: (id: string) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  duration,
  category,
  completed,
  onToggle
}) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={() => onToggle(id)}
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-400'
          }`}>
            {completed && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className={`text-white font-medium ${
                completed ? 'line-through text-gray-400' : ''
              }`}>
                {title}
              </h3>
              <p className={`text-sm mt-1 ${
                completed ? 'line-through text-gray-500' : 'text-gray-400'
              }`}>
                {description}
              </p>
            </div>
            <span className={`text-sm ml-2 ${
              completed ? 'line-through text-gray-500' : 'text-gray-400'
            }`}>
              {duration}
            </span>
          </div>
          
          {/* Category Tag */}
          <div className="mt-3">
            <span className="inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
