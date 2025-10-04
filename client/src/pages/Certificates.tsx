import React from 'react'
import { OverallProgress } from '../components/sections/OverallProgress'
import { CertificateCard } from '../components/sections/CertificateCard'
import { LoadingCard, LoadingList } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useUserCertificates, useCertificateProgress } from '../hooks/useApi'

export const Certificates: React.FC = () => {
  const { certificates, error: certificatesError, isLoading: certificatesLoading, mutate: mutateCertificates } = useUserCertificates()
  const { progress, error: progressError, isLoading: progressLoading } = useCertificateProgress()

  const isLoading = certificatesLoading || progressLoading
  const error = certificatesError || progressError

  // Certificate stats from API
  const certificateStats = {
    completed: progress?.completed || 0,
    inProgress: progress?.inProgress || 0,
    notStarted: progress?.notStarted || 0
  }

  const handleActionClick = (certificateId: string, action: string) => {
    console.log(`${action} certyfikat ${certificateId}`)
    // TODO: Implement certificate actions
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Certyfikaty i Wymagania</h1>
          <p className="text-gray-300">Zarządzaj swoimi certyfikatami i wymaganiami szkoleniowymi</p>
        </div>
        <LoadingCard />
        <LoadingList count={3} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Certyfikaty i Wymagania</h1>
          <p className="text-gray-300">Zarządzaj swoimi certyfikatami i wymaganiami szkoleniowymi</p>
        </div>
        <ErrorMessage 
          error={error} 
          onRetry={() => {
            mutateCertificates()
            window.location.reload()
          }} 
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Certyfikaty i Wymagania</h1>
        <p className="text-gray-300">Zarządzaj swoimi certyfikatami i wymaganiami szkoleniowymi</p>
      </div>

      {/* Overall Progress Section */}
      <OverallProgress 
        completed={certificateStats.completed}
        inProgress={certificateStats.inProgress}
        notStarted={certificateStats.notStarted}
      />

      {/* Certificates List */}
      <div className="space-y-6">
        {certificates?.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            title={certificate.title}
            description={certificate.description}
            status={certificate.status}
            modules={certificate.modules}
            duration={certificate.duration}
            daysLeft={certificate.daysLeft}
            progress={certificate.progress}
            onActionClick={() => handleActionClick(certificate.id, 'Akcja')}
          />
        ))}
      </div>
    </div>
  )
}
