import React from 'react'
import { PageHeader } from '../components/sections/PageHeader'
import { AvailableTrainingSection } from '../components/sections/AvailableTrainingSection'
import { CertificationsSection } from '../components/sections/CertificationsSection'
import { UnifiedAlert } from '../components/ui/UnifiedAlert'

export const Home: React.FC = () => {
  // Mock data for available training exercises
  const availableExercises = [
    {
      id: 'field-training',
      title: 'Ćwiczenia polowe',
      date: '12 października 2025',
      status: 'required' as const,
      action: 'signup' as const
    },
    {
      id: 'urban-combat',
      title: 'Symulacja walki miejskiej',
      date: '18 października 2025',
      status: 'optional' as const,
      action: 'registered' as const
    },
  ]

  // Mock data for certifications
  const certifications = [
    {
      id: 'first-aid',
      title: 'Certyfikat Pierwszej Pomocy Bojowej',
      expiresAt: '20 października 2025',
      status: 'expiring' as const
    },
    {
      id: 'weapons-safety',
      title: 'Certyfikat Bezpieczeństwa Broni',
      expiresAt: '15 października 2025',
      status: 'in-progress' as const,
      progress: 65
    },
    {
      id: 'nbc-defense',
      title: 'Certyfikat Obrony NBC',
      expiresAt: '1 listopada 2025',
      status: 'expiring' as const
    },
    {
      id: 'radio-communications',
      title: 'Licencja Łączności Radiowej',
      expiresAt: '15 grudnia 2025',
      status: 'recently-renewed' as const
    }
  ]

  // Mock data for current incident
  const currentIncident = {
    id: 'flood-warning-001',
    type: 'flood' as const,
    severity: 'KRYTYCZNY' as const,
    title: 'Powodzie',
    description: 'Zgłoszono poważne powodzie w obszarach operacyjnych. Zgłoś się do najbliższej jednostki.',
    nearestStation: {
      name: '18. Batalion WOT',
      address: 'ul. Kościuszki 45, Kraków',
      distance: '3.2 km'
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Witaj ponownie, Żołnierzu"
        subtitle="Bądź gotowy, bądź czujny"
      />

      <UnifiedAlert 
        mobilizationStatus="WYSOKI" 
        incident={currentIncident} 
      />

      <AvailableTrainingSection
        exercisesInThisMonth={availableExercises}
        remainingExercises={4}
      />

      <CertificationsSection
        certifications={certifications}
      />
    </div>
  )
}
