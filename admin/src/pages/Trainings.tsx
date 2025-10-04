import React, { useState, useEffect } from 'react'
import { getTrainings, getUsers, assignTraining } from '../services/api'

interface Training {
  id: string
  title: string
  description: string
  date: string
  status: string
  level: string
}

interface User {
  id: string
  name: string
  rank: string
}

const Trainings: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedTraining, setSelectedTraining] = useState<string>('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainingsRes, usersRes] = await Promise.all([
          getTrainings(),
          getUsers()
        ])
        setTrainings(trainingsRes.data.data || [])
        setUsers(usersRes.data.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleAssignTraining = async () => {
    if (!selectedTraining || selectedUsers.length === 0) {
      alert('Please select a training and at least one user')
      return
    }

    try {
      for (const userId of selectedUsers) {
        await assignTraining(userId, selectedTraining)
      }
      alert(`Training assigned to ${selectedUsers.length} users successfully!`)
      setSelectedUsers([])
      setSelectedTraining('')
    } catch (error) {
      console.error('Error assigning training:', error)
      alert('Error assigning training')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading trainings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Training Management</h1>
        <p className="text-gray-600">Assign trainings to soldiers</p>
      </div>

      {/* Assignment Panel */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assign Training</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Training Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Training
            </label>
            <select
              value={selectedTraining}
              onChange={(e) => setSelectedTraining(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a training...</option>
              {trainings.map((training) => (
                <option key={training.id} value={training.id}>
                  {training.title} - {training.date}
                </option>
              ))}
            </select>
          </div>

          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Users ({selectedUsers.length} selected)
            </label>
            <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2">
              {users.map((user) => (
                <label key={user.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserToggle(user.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">
                    {user.name} ({user.rank})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAssignTraining}
            disabled={!selectedTraining || selectedUsers.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Assign Training
          </button>
        </div>
      </div>

      {/* Trainings List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Trainings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {trainings.map((training) => (
            <div key={training.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{training.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">📅 {training.date}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      training.status === 'required' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {training.status}
                    </span>
                    <span className="text-sm text-gray-500">📊 {training.level}</span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trainings
