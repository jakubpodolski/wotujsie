import React from 'react'
import { PageHeader } from '../components/sections/PageHeader'
import { AvailableTrainingSection } from '../components/sections/AvailableTrainingSection'
import { CertificationsSection } from '../components/sections/CertificationsSection'
import { UnifiedAlert } from '../components/ui/UnifiedAlert'
import { LoadingCard } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useDashboard } from '../hooks/useApi'

export const Home: React.FC = () => {
  const { dashboard, error, isLoading, mutate } = useDashboard()

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Witaj ponownie, Żołnierzu"
          subtitle="Bądź gotowy, bądź czujny"
        />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Witaj ponownie, Żołnierzu"
          subtitle="Bądź gotowy, bądź czujny"
        />
        
        <ErrorMessage 
          error={error} 
          onRetry={() => mutate()} 
          className="mb-6"
        />
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Witaj ponownie, Żołnierzu"
          subtitle="Bądź gotowy, bądź czujny"
        />
        
        <div className="text-center py-12">
          <p className="text-gray-400">Brak danych do wyświetlenia</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Witaj ponownie, Żołnierzu"
        subtitle="Bądź gotowy, bądź czujny"
      />

      <UnifiedAlert 
        mobilizationStatus={dashboard.mobilizationStatus as "WYSOKI" | "ŚREDNI" | "NISKI"} 
        incident={dashboard.currentIncident ? {
          ...dashboard.currentIncident,
          type: dashboard.currentIncident.type === 'earthquake' ? 'other' : dashboard.currentIncident.type as "flood" | "fire" | "medical" | "security" | "other"
        } : undefined} 
      />

      <AvailableTrainingSection
        exercisesInThisMonth={dashboard.availableExercises}
        remainingExercises={dashboard.remainingExercises}
      />

      <CertificationsSection
        certifications={dashboard.certifications}
      />
    </div>
  )
}
