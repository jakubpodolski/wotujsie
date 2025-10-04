import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Accordion } from '../ui/Accordion'
import { Button } from '../ui/Button'
import { Calendar } from 'lucide-react'

interface TrainingExercise {
  id: string
  title: string
  date: string
  status: 'required' | 'optional'
  action: 'signup' | 'registered'
}

interface AvailableTrainingSectionProps {
  exercisesInThisMonth: TrainingExercise[];
  remainingExercises: number;
}

export const AvailableTrainingSection: React.FC<AvailableTrainingSectionProps> = ({
  exercisesInThisMonth,
  remainingExercises
}) => {
  const navigate = useNavigate()
  const openCount = exercisesInThisMonth.filter(ex => ex.action === 'signup').length

  const handleTrainingClick = (exerciseId: string) => {
    navigate(`/training/${exerciseId}`)
  }

  const handleViewAll = () => {
    navigate('/calendar')
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'required':
        return { borderColor: "#C53030", borderWidth: "1px", borderStyle: "solid", color: "#C53030" }
      case 'optional':
        return { borderColor: "#757575", borderWidth: "1px", borderStyle: "solid", color: "#757575" }
      default:
        return { borderColor: "#4A4A4A", borderWidth: "1px", borderStyle: "solid", color: "#4A4A4A" }
    }
  }

  const getActionStyle = (action: string) => {
    switch (action) {
      case 'signup':
        return { backgroundColor: '#5A6F4F' }
      case 'registered':
        return { backgroundColor: '#3E4A59' }
      default:
        return { backgroundColor: '#4A4A4A' }
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'required':
        return 'Wymagane'
      case 'optional':
        return 'Opcjonalne'
      default:
        return 'Nieznany'
    }
  }

  const getActionText = (action: string) => {
    switch (action) {
      case 'signup':
        return 'Zapisz się'
      case 'registered':
        return 'Zarejestrowany'
      default:
        return 'Nieznany'
    }
  }

  return (
    <Accordion
      title="Szkolenia"
      description="Zapisz się na nadchodzące ćwiczenia i operacje"
      icon={<Calendar className="text-green-400" size={20} strokeWidth={2} />}
      badge={{
        text: `${openCount} Dostępne`,
        style: { backgroundColor: '#4A4A4A' }
      }}
      cardStyle={{ backgroundColor: '#282c34' }}
    >
      {/* Training Exercises List */}
      <div className="space-y-4 mb-6">
        {exercisesInThisMonth.map((exercise) => (
          <div 
            key={exercise.id} 
            className="rounded-lg p-4 border border-gray-600 cursor-pointer hover:border-gray-500 transition-colors" 
            style={{ backgroundColor: '#343a40' }}
            onClick={() => handleTrainingClick(exercise.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-white mb-1 hover:text-blue-300 transition-colors">
                  {exercise.title}
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                  {exercise.date}
                </p>
                <span className="text-white text-xs font-medium px-2 py-2 mt-2 rounded" style={getStatusStyle(exercise.status)}>
                  {getStatusText(exercise.status)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {exercise.action === 'signup' ? (
                  <Button 
                    onClick={() => handleTrainingClick(exercise.id)}
                    className="text-white text-xs font-medium px-3 py-1 rounded"
                    style={getActionStyle(exercise.action)}
                  >
                    {getActionText(exercise.action)}
                  </Button>
                ) : (
                  <span className="text-white text-xs font-medium px-3 py-1 rounded" style={getActionStyle(exercise.action)}>
                    {getActionText(exercise.action)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Button */}
      <Button 
        onClick={handleViewAll}
        className="w-full text-white font-medium py-3 px-4 rounded-lg transition-colors border border-gray-600"
        style={{ backgroundColor: '#0F1419' }}
      >
        Zobacz wszystkie szkolenia ({remainingExercises})
      </Button>
    </Accordion>
  )
}
