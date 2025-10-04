import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hover = false,
  style = {}
}) => {
  const baseClasses = 'bg-gray-800 rounded-lg p-6'
  const hoverClasses = hover ? 'hover:bg-gray-700 transition-colors cursor-pointer' : ''
  const clickableClasses = onClick ? 'cursor-pointer' : ''
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}