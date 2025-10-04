import React, { useState } from 'react'
import { ProcedureCategory, Procedure } from '../../data/mockProcedureData'

interface ProcedureCardProps {
  category: ProcedureCategory
  searchQuery: string
}

const PriorityTag: React.FC<{ priority: string }> = ({ priority }) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-600 text-white'
      case 'Important':
        return 'bg-gray-600 text-white'
      case 'Standard':
        return 'bg-blue-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityStyles(priority)}`}>
      {priority === 'Critical' ? 'Krytyczne' : 
       priority === 'Important' ? 'Ważne' : 'Standardowe'}
    </span>
  )
}

const ProcedureItem: React.FC<{ 
  procedure: Procedure
  isExpanded: boolean
  onToggle: () => void
}> = ({ procedure, isExpanded, onToggle }) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full px-6 py-3 text-left hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h4 className={`font-medium text-white ${isExpanded ? 'underline' : ''}`}>
              {procedure.title}
            </h4>
            <PriorityTag priority={procedure.priority} />
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-4 bg-gray-800">
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Cel:</h5>
              <p className="text-sm text-gray-300">{procedure.description}</p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Procedura:</h5>
              <ol className="space-y-1">
                {procedure.steps.map((step) => (
                  <li key={step.id} className="text-sm text-gray-300 flex">
                    <span className="font-medium text-gray-400 mr-2">{step.id}.</span>
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const getCategoryIcon = (iconType: string) => {
  switch (iconType) {
    case 'heart':
      return (
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    case 'ecg':
      return (
        <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'warning':
      return (
        <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    case 'pill':
      return (
        <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    default:
      return null
  }
}

export const ProcedureCard: React.FC<ProcedureCardProps> = ({ category, searchQuery }) => {
  const [expandedProcedures, setExpandedProcedures] = useState<Set<string>>(new Set())

  const toggleProcedure = (procedureId: string) => {
    const newExpanded = new Set(expandedProcedures)
    if (newExpanded.has(procedureId)) {
      newExpanded.delete(procedureId)
    } else {
      newExpanded.add(procedureId)
    }
    setExpandedProcedures(newExpanded)
  }

  // Filter procedures based on search query
  const filteredProcedures = category.procedures.filter(procedure =>
    procedure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    procedure.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    procedure.steps.some(step => 
      step.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  // Don't render the card if no procedures match the search
  if (filteredProcedures.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div>{getCategoryIcon(category.icon)}</div>
          <div>
            <h3 className="text-lg font-bold text-white">{category.title}</h3>
            <p className="text-sm text-gray-400">
              {filteredProcedures.length} {filteredProcedures.length === 1 ? 'procedura' : 'procedur'}
            </p>
          </div>
        </div>
      </div>

      {/* Procedures List */}
      <div>
        {filteredProcedures.map((procedure, index) => (
          <div key={procedure.id}>
            <ProcedureItem
              procedure={procedure}
              isExpanded={expandedProcedures.has(procedure.id)}
              onToggle={() => toggleProcedure(procedure.id)}
            />
            {index < filteredProcedures.length - 1 && (
              <div className="mx-6 border-b border-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
