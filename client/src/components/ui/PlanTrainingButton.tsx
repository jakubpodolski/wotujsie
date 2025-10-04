import React from 'react'

interface PlanTrainingButtonProps {
  onClick: () => void
  className?: string
}

export const PlanTrainingButton: React.FC<PlanTrainingButtonProps> = ({
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full py-4 px-6 text-green-400 
        border-2 border-dashed border-gray-600 rounded-lg
        hover:border-green-400 hover:bg-gray-800
        transition-colors duration-200
        flex items-center justify-center space-x-2
        ${className}
      `}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <span className="font-medium">Zaplanuj nowy trening</span>
    </button>
  )
}
