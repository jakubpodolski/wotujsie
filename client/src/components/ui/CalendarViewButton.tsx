import React from 'react'

interface CalendarViewButtonProps {
  onClick: () => void
  className?: string
}

export const CalendarViewButton: React.FC<CalendarViewButtonProps> = ({
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm text-gray-300 
        border border-gray-600 rounded-lg
        hover:bg-gray-700 hover:text-white
        transition-colors duration-200
        ${className}
      `}
    >
      Pokaż w widoku kalendarza
    </button>
  )
}
