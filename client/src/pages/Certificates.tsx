import React from 'react'
import { OverallProgress } from '../components/sections/OverallProgress'
import { CertificateCard } from '../components/sections/CertificateCard'

export const Certificates: React.FC = () => {
  // Mock data for certificate counts
  const certificateStats = {
    completed: 1,
    inProgress: 1,
    notStarted: 4
  }

  // Mock certificate data
  const certificates = [
    {
      id: '1',
      title: 'Certyfikat Pierwszej Pomocy Bojowej',
      description: 'Naucz się podstawowych procedur medycznych na polu walki, w tym zakładania opasek uciskowych, opatrywania ran i protokołów ewakuacji rannych.',
      status: 'NOT_STARTED' as const,
      modules: ['Zakładanie Opasek', 'Opatrywanie Ran', 'Ewakuacja Rannych', 'Zarządzanie Szokiem'],
      duration: 4,
      daysLeft: 16,
      onActionClick: () => console.log('Rozpocznij certyfikat pierwszej pomocy')
    },
    {
      id: '2',
      title: 'Przegląd Bezpieczeństwa Broni',
      description: 'Przejrzyj kompleksowe protokoły bezpieczeństwa dotyczące obsługi, przechowywania i konserwacji broni wojskowej i amunicji.',
      status: 'IN_PROGRESS' as const,
      modules: ['Bezpieczna Obsługa', 'Bezpieczeństwo na Strzelnicy', 'Konserwacja', 'Protokoły Przechowywania'],
      duration: 2.5,
      daysLeft: 8, // Below 10 days threshold - will be red
      progress: 60,
      onActionClick: () => console.log('Kontynuuj przegląd bezpieczeństwa broni')
    },
    {
      id: '3',
      title: 'Szkolenie Taktyczne',
      description: 'Zaawansowane szkolenie z taktyki wojskowej, współpracy w zespole i strategii bojowych.',
      status: 'COMPLETED' as const,
      modules: ['Taktyka Piechoty', 'Współpraca Zespołowa', 'Strategia Bojowa', 'Komunikacja Taktyczna'],
      duration: 8,
      daysLeft: 0,
      onActionClick: () => console.log('Zobacz certyfikat szkolenia taktycznego')
    }
  ]

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
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            title={certificate.title}
            description={certificate.description}
            status={certificate.status}
            modules={certificate.modules}
            duration={certificate.duration}
            daysLeft={certificate.daysLeft}
            progress={certificate.progress}
            onActionClick={certificate.onActionClick}
          />
        ))}
      </div>
    </div>
  )
}
