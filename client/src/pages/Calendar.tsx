import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { CalendarViewButton } from '../components/ui/CalendarViewButton'
import { PlanTrainingButton } from '../components/ui/PlanTrainingButton'
import { MonthlyTrainingGroup } from '../components/ui/MonthlyTrainingGroup'
import { LoadingList } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useTrainings, useUserTrainings, useTrainingsGrouped } from '../hooks/useApi'

export const Calendar: React.FC = () => {
  const navigate = useNavigate()
  const [selectedView, setSelectedView] = useState<'yours' | 'all'>('yours')

  const viewOptions = [
    { value: 'yours', label: 'Twoje Szkolenia' },
    { value: 'all', label: 'Wszystkie Szkolenia' },
  ]

  // Fetch data based on selected view
  const { trainings: allTrainings, error: allError, isLoading: allLoading } = useTrainings()
  const { trainings: userTrainings, error: userError, isLoading: userLoading } = useUserTrainings()
  const { trainingsByMonth } = useTrainingsGrouped()

  const handleCalendarView = () => {
    // TODO: Implement calendar view functionality
    console.log('Show calendar view')
  }

  const handlePlanTraining = () => {
    // TODO: Implement plan training functionality
    alert('Funkcja dostępna wkrótce!')
    console.log('Plan new training')
  }

  const handleTrainingClick = (trainingId: string) => {
    navigate(`/training/${trainingId}`)
  }

  // Determine which data to use based on selected view
  const isLoading = selectedView === 'all' ? allLoading : userLoading
  const error = selectedView === 'all' ? allError : userError
  const trainings = selectedView === 'all' ? allTrainings : userTrainings

  // Helper function to group trainings by month
  const groupTrainingsByMonth = (trainings: any[]) => {
    const grouped = trainings.reduce((acc, training) => {
      let month: string
      
      if (training.id === 'field-training') {
        month = 'Październik'
      } else if (training.id === 'weapon-qualification') {
        month = 'Listopad'
      } else if (training.id === 'navigation-training') {
        month = 'Listopad'
      } else if (training.id === 'medical-training') {
        month = 'Październik'
      } else if (training.id === 'communication-training') {
        month = 'Listopad'
      } else if (training.id === 'night-training') {
        month = 'Listopad'
      } else {
        month = Math.random() > 0.5 ? 'Październik' : 'Listopad'
      }
      
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(training)
      return acc
    }, {} as Record<string, any[]>)

    return grouped
  }

  // Use grouped data if available, otherwise group manually
  const displayData = selectedView === 'all' && trainingsByMonth 
    ? trainingsByMonth 
    : trainings ? groupTrainingsByMonth(trainings) : {}

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header className="bg-transparent px-4 py-6 -mx-4 -mt-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white">Kalendarz Ćwiczeń</h1>
            <p className="text-base text-gray-300 mt-1">Nadchodzące szkolenia</p>
          </div>
        </header>
        <LoadingList count={3} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <header className="bg-transparent px-4 py-6 -mx-4 -mt-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white">Kalendarz Ćwiczeń</h1>
            <p className="text-base text-gray-300 mt-1">Nadchodzące szkolenia</p>
          </div>
        </header>
        <ErrorMessage 
          error={error} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header className="bg-transparent px-4 py-6 -mx-4 -mt-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Kalendarz Ćwiczeń
          </h1>
          <p className="text-base text-gray-300 mt-1">
            Nadchodzące szkolenia
          </p>
        </div>
      </header>
      
      {/* Segmented Control */}
        <SegmentedControl
          options={viewOptions}
          value={selectedView}
          onChange={(value) => setSelectedView(value as 'yours' | 'all')}
        />
      
      {/* Action Button */}
      <div className="mt-4">
        {selectedView === 'all' ? (
          <CalendarViewButton onClick={handleCalendarView} />
        ) : (
          <PlanTrainingButton onClick={handlePlanTraining} />
        )}
      </div>
      
      {/* Training Content */}
      {displayData && Object.keys(displayData).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(displayData).map(([month, trainings]) => (
            <MonthlyTrainingGroup
              key={month}
              month={month}
              trainings={(trainings as any[]).map((training: any) => ({
                ...training,
              }))}
              onTrainingClick={handleTrainingClick}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-white">Brak wydarzeń w kalendarzu</h3>
            <p className="mt-1 text-sm text-gray-400">Zacznij od zaplanowania pierwszego szkolenia.</p>
          </div>
        </div>
      )}
    </div>
  )
}
