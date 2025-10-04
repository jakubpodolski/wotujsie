import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { LoadingCard } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useUser } from '../hooks/useApi'

export const Account: React.FC = () => {
  const navigate = useNavigate()
  const { user, error, isLoading, mutate } = useUser()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 space-y-6">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 space-y-6">
        <ErrorMessage 
          error={error} 
          onRetry={() => mutate()} 
        />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 space-y-6">
        <div className="text-center py-12">
          <p className="text-gray-400">Brak danych użytkownika</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 space-y-6">
      {/* User Profile Section */}
      <Card>
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">JK</span>
          </div>
          
          {/* Name and Title */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{user.name}</h2>
            <p className="text-gray-300 text-sm">{user.rank}</p>
            
            {/* Status Indicator */}
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-500">
              <svg className="w-4 h-4 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm font-medium">Status Aktywny</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Training & Certifications Section */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Szkolenia i Certyfikaty</h3>
        
        <button 
          onClick={() => navigate('/certificates')}
          className="w-full bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">Wymagania Szkoleniowe</span>
            </div>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </Card>

      {/* Service Information Section */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Informacje o Służbie</h3>
        
        <div className="space-y-4">
          {/* Unit */}
          <div className="flex items-start space-x-3 pb-4 border-b border-gray-700">
            <svg className="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Jednostka</p>
              <p className="text-white font-medium">{user.serviceInfo.unit}</p>
            </div>
          </div>

          {/* Rank */}
          <div className="flex items-start space-x-3 pb-4 border-b border-gray-700">
            <svg className="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Stopień</p>
              <p className="text-white font-medium">{user.serviceInfo.rank}</p>
            </div>
          </div>

          {/* Base Location */}
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Lokalizacja Bazy</p>
              <p className="text-white font-medium">{user.serviceInfo.baseLocation}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact Information Section */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Informacje Kontaktowe</h3>
        
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start space-x-3 pb-4 border-b border-gray-700">
            <svg className="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Telefon</p>
              <p className="text-white font-medium">{user.phone}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings Section */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Ustawienia</h3>
        
        <div className="space-y-4">
          {/* Account Settings */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">Ustawienia Konta</span>
            </div>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="text-white font-medium">Powiadomienia</span>
            </div>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Edit Profile */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">Edytuj Profil</span>
            </div>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Card>

      {/* Sign Out Button */}
        <button className="border border-red-500 p-0 w-full flex items-center justify-center space-x-2 py-3 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Wyloguj</span>
        </button>
    </div>
  )
}
