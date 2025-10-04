import React, { useState } from 'react'
import { Card } from './Card'
import { ChevronUp } from 'lucide-react'

interface AccordionProps {
  title: string
  description?: string
  icon?: React.ReactNode
  badge?: {
    text: string
    style?: React.CSSProperties
  }
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  cardStyle?: React.CSSProperties
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  description,
  icon,
  badge,
  children,
  defaultOpen = false,
  className = '',
  cardStyle = {}
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Card className={`text-white ${className}`} style={cardStyle}>
      {/* Header - Always visible */}
      <div 
        className="flex items-center justify-between cursor-pointer gap-2"
        onClick={toggleAccordion}
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <div className="flex justify-between items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-white">
                {title}
              </h2>
              {badge && (
                <span 
                  className="text-white text-sm font-medium px-3 py-1 rounded text-center text-nowrap" 
                  style={badge.style || { backgroundColor: '#4A4A4A' }}
                >
                  {badge.text}
                </span>
              )}
            </div>
            {description && (
              <p className="text-gray-300 text-sm mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ChevronUp 
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? '' : 'rotate-180'
            }`} 
            size={20} 
          />
        </div>
      </div>
      
      {/* Collapsible Content */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-4">
          {children}
        </div>
      </div>
    </Card>
  )
}
