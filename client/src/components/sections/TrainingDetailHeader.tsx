import React from 'react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '../ui/Button'

interface TrainingDetailHeaderProps {
  title: string
  date: string
  level: 'Początkujący' | 'Średni' | 'Zaawansowany'
  status: 'Wymagane' | 'Opcjonalne'
  onBack: () => void
}

export const TrainingDetailHeader: React.FC<TrainingDetailHeaderProps> = ({
  title,
  date,
  level,
  status,
  onBack
}) => {
  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'Początkujący':
        return { backgroundColor: '#059669', color: '#ffffff' } // green-600
      case 'Średni':
        return { backgroundColor: '#D97706', color: '#ffffff' } // amber-600
      case 'Zaawansowany':
        return { backgroundColor: '#DC2626', color: '#ffffff' } // red-600
      default:
        return { backgroundColor: '#6B7280', color: '#ffffff' } // gray-500
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Wymagane':
        return { backgroundColor: '#DC2626', color: '#ffffff' } // red-600
      case 'Opcjonalne':
        return { backgroundColor: '#6B7280', color: '#ffffff' } // gray-500
      default:
        return { backgroundColor: '#6B7280', color: '#ffffff' }
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        {/* Back Navigation */}
        <div className="flex items-center mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center text-gray-300 hover:text-white p-0"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm">Powrót do strony głównej</span>
          </Button>
        </div>

        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between items-center mb-3">
              <h1 className="text-2xl font-bold text-white">
                {title}
              </h1>
            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={getStatusStyle(status)}
              >
                {status}
              </span>
            </div>
            </div>
            
            {/* Date and Level */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{date}</span>
              </div>
              
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={getLevelStyle(level)}
              >
                {level}
              </span>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}
