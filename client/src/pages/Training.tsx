import React, { useState } from 'react'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { TaskCard } from '../components/ui/TaskCard'
import { DayCard } from '../components/ui/DayCard'
import { LoadingCard, LoadingList } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useUserTasks, useTaskProgress, useUserWeeklyPlan } from '../hooks/useApi'
import { tasksApi } from '../services/api'

export const Training: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('today')
  
  const { tasks, error: tasksError, isLoading: tasksLoading, mutate: mutateTasks } = useUserTasks()
  const { progress, error: progressError, isLoading: progressLoading } = useTaskProgress()
  const { weeklyPlan, error: weeklyError, isLoading: weeklyLoading } = useUserWeeklyPlan()

  const tabOptions = [
    { value: 'today', label: 'Dzisiaj' },
    { value: 'weekly', label: 'Plan Tygodniowy' }
  ]

  // Calculate progress from API data
  const completedTasks = progress?.completedTasks || 0
  const totalTasks = progress?.totalTasks || 0
  const progressPercentage = progress?.progressPercentage || 0
  const totalMinutes = progress?.totalMinutes || 0
  const streak = progress?.streak || 0

  const handleTaskToggle = async (taskId: string) => {
    try {
      await tasksApi.toggleTask(taskId, '1')
      mutateTasks() // Refresh tasks data
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }

  const handleMarkAllCompleted = async () => {
    try {
      await tasksApi.completeAllTasks('1')
      mutateTasks() // Refresh tasks data
    } catch (error) {
      console.error('Failed to complete all tasks:', error)
    }
  }

  if (tasksLoading || progressLoading) {
    return (
      <div className="space-y-6">
        <header className="bg-transparent px-4 py-6 -mx-4 -mt-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white">Trening Dzienny</h1>
            <p className="text-base text-gray-300 mt-1">Bądź gotowy bojowo każdego dnia</p>
          </div>
        </header>
        <LoadingCard />
        <LoadingList count={5} />
      </div>
    )
  }

  if (tasksError || progressError) {
    return (
      <div className="space-y-6">
        <header className="bg-transparent px-4 py-6 -mx-4 -mt-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white">Trening Dzienny</h1>
            <p className="text-base text-gray-300 mt-1">Bądź gotowy bojowo każdego dnia</p>
          </div>
        </header>
        <ErrorMessage 
          error={tasksError || progressError} 
          onRetry={() => {
            mutateTasks()
            window.location.reload()
          }} 
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
            Trening Dzienny
          </h1>
          <p className="text-base text-gray-300 mt-1">
            Bądź gotowy bojowo każdego dnia
          </p>
        </div>
      </header>

      {/* Today's Progress Card */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Postęp Dzisiaj</h2>
          <span className="text-gray-400 text-sm">{completedTasks}/{totalTasks}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 text-orange-500">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-white text-sm">{streak} dni z rzędu</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-white text-sm">{totalMinutes} min łącznie</span>
          </div>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="flex justify-center">
        <SegmentedControl
          options={tabOptions}
          value={selectedTab}
          onChange={setSelectedTab}
        />
      </div>
      
      {/* Content Area */}
      {selectedTab === 'today' ? (
        <div className="space-y-4">
          {/* Task Cards */}
          <div className="space-y-3">
            {tasks?.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                duration={task.duration}
                category={task.category}
                completed={task.completed}
                onToggle={handleTaskToggle}
              />
            ))}
          </div>
          
          {/* Mark All Button */}
          {completedTasks < totalTasks && (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleMarkAllCompleted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Oznacz wszystkie jako ukończone</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {weeklyLoading ? (
            <LoadingList count={7} />
          ) : weeklyError ? (
            <ErrorMessage error={weeklyError} onRetry={() => window.location.reload()} />
          ) : (
            weeklyPlan?.map((day) => (
              <DayCard
                key={day.id}
                day={day.day}
                description={day.description}
                exercisesCount={day.exercisesCount}
                duration={day.duration}
                isToday={day.isToday}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
