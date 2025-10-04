import React, { useState } from 'react'
import { Input } from '../components/ui/Input'
import { ProcedureCard } from '../components/ui/ProcedureCard'
import { LoadingList } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useProcedures, useProcedureSearch } from '../hooks/useApi'

export const Learn: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const searchIcon = (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )

  // Use search API if there's a query, otherwise use all procedures
  const { procedures: allProcedures, error: allError, isLoading: allLoading } = useProcedures()
  const { procedures: searchResults, error: searchError, isLoading: searchLoading } = useProcedureSearch(searchQuery)

  // Determine which data to use
  const isLoading = searchQuery ? searchLoading : allLoading
  const error = searchQuery ? searchError : allError
  const procedures = searchQuery ? searchResults : allProcedures

  // Filter categories that have matching procedures
  const filteredCategories = procedures?.filter(category => {
    if (!searchQuery) return true
    const hasMatchingProcedures = category.procedures.some(procedure =>
      procedure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      procedure.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      procedure.steps.some(step => 
        step.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    return hasMatchingProcedures
  }) || []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header className="bg-transparent px-4 py-6 -mx-4 -mt-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Wiedza z Pierwszej Pomocy
          </h1>
          <p className="text-base text-gray-300 mt-1">
            Procedury i protokoły medycyny bojowej
          </p>
          
          {/* Search Input */}
          <div className="mt-6">
            <Input
              type="text"
              variant="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj procedur pierwszej pomocy..."
              icon={searchIcon}
              className="py-3"
            />
          </div>
        </div>
      </header>
      
      {/* Procedure Cards */}
      <div className="space-y-6">
        {isLoading ? (
          <LoadingList count={3} />
        ) : error ? (
          <ErrorMessage 
            error={error} 
            onRetry={() => window.location.reload()} 
          />
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <ProcedureCard
              key={category.id}
              category={category}
              searchQuery={searchQuery}
            />
          ))
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-white">Nie znaleziono procedur</h3>
              <p className="mt-1 text-sm text-gray-400">
                Spróbuj zmienić kryteria wyszukiwania
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-lg border" style={{ 
        backgroundColor: '#2D2121', 
        borderColor: '#4A2C2C' 
      }}>
        <p className="text-sm leading-relaxed" style={{ color: '#E0E0E0' }}>
          <span className="font-bold" style={{ color: '#E57373' }}>Ważne:</span> 
          {' '}Te informacje służą celom szkoleniowym. W prawdziwych sytuacjach awaryjnych, 
          gdy to możliwe, natychmiast skontaktuj się z profesjonalną pomocą medyczną.
        </p>
      </div>
    </div>
  )
}
