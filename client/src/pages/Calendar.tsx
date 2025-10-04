import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { CalendarViewButton } from '../components/ui/CalendarViewButton'
import { PlanTrainingButton } from '../components/ui/PlanTrainingButton'
import { MonthlyTrainingGroup } from '../components/ui/MonthlyTrainingGroup'
import { mockTrainings, yourTrainings, getTrainingsByMonth } from '../data/mockTrainingData'

export const Calendar: React.FC = () => {
  const navigate = useNavigate()
  const [selectedView, setSelectedView] = useState('yours')

  const viewOptions = [
    { value: 'yours', label: 'Twoje Szkolenia' },
    { value: 'all', label: 'Wszystkie Szkolenia' },
  ]

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

  // Filter trainings based on selected view
  const filteredTrainings = selectedView === 'all' 
    ? mockTrainings 
    : yourTrainings

  // Group trainings by month
  const trainingsByMonth = getTrainingsByMonth(filteredTrainings)

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
        onChange={setSelectedView}
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
      {Object.keys(trainingsByMonth).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(trainingsByMonth).map(([month, trainings]) => (
            <MonthlyTrainingGroup
              key={month}
              month={month}
              trainings={trainings.map(training => ({
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
