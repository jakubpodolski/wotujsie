import React, { useState, useEffect } from 'react'
import { getUsers, getTrainings, getAnalytics } from '../services/api'

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrainings: 0,
    activeUsers: 0,
    completedTrainings: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, trainingsRes] = await Promise.all([
          getUsers(),
          getTrainings()
        ])
        
        setStats({
          totalUsers: usersRes.data.data?.length || 0,
          totalTrainings: trainingsRes.data.data?.length || 0,
          activeUsers: usersRes.data.data?.filter((u: any) => u.status === 'active').length || 0,
          completedTrainings: 0 // Mock data for now
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: '✅',
      color: 'bg-green-500'
    },
    {
      title: 'Total Trainings',
      value: stats.totalTrainings,
      icon: '🎯',
      color: 'bg-purple-500'
    },
    {
      title: 'Completed Trainings',
      value: stats.completedTrainings,
      icon: '🏆',
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your military management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="font-medium">Add New User</div>
              <div className="text-sm text-gray-500">Register a new soldier</div>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📢</div>
              <div className="font-medium">Send Alert</div>
              <div className="text-sm text-gray-500">Broadcast notification</div>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium">Assign Training</div>
              <div className="text-sm text-gray-500">Schedule training</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
