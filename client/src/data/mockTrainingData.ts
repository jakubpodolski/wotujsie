import { Training } from '../components/ui/TrainingCard'

export const mockTrainings: Training[] = [
  {
    id: 'field-training',
    title: 'Ćwiczenia Polowe',
    description: 'Całodniowe ćwiczenia polowe skupiające się na manewrach taktycznych i koordynacji zespołowej.',
    time: '08:00 - 16:00',
    location: 'Poligon Alfa',
    participants: 45,
    isMandatory: true
  },
  {
    id: 'navigation-training',
    title: 'Szkolenie z Nawigacji',
    description: 'Nawigacja terenowa z wykorzystaniem mapy i kompasu.',
    time: '14:00 - 17:00',
    location: 'Obszar Leśny C',
    participants: 15,
    isMandatory: false
  },
  {
    id: 'medical-training',
    title: 'Ćwiczenia Medyczne',
    description: 'Szkolenie z pierwszej pomocy i reagowania w sytuacjach kryzysowych.',
    time: '09:00 - 15:00',
    location: 'Centrum Szkoleniowe Beta',
    participants: 25,
    isMandatory: false
  },
  {
    id: 'communication-training',
    title: 'Szkolenie z Komunikacji',
    description: 'Nauka efektywnej komunikacji radiowej i sygnalizacji.',
    time: '10:00 - 14:00',
    location: 'Baza Główna',
    participants: 30,
    isMandatory: true
  },
  {
    id: 'night-training',
    title: 'Ćwiczenia Nocne',
    description: 'Szkolenie z operacji prowadzonych w warunkach ograniczonej widoczności.',
    time: '20:00 - 02:00',
    location: 'Poligon Delta',
    participants: 20,
    isMandatory: false
  }
]

// Specific trainings for "Your Trainings" view from the design
export const yourTrainings: Training[] = [
  {
    id: 'field-training',
    title: 'Ćwiczenia Polowe',
    description: 'Całodniowe ćwiczenia polowe skupiające się na manewrach taktycznych i koordynacji zespołowej.',
    time: '08:00 - 16:00',
    location: 'Poligon Alfa',
    participants: 45,
    isMandatory: true
  },
  {
    id: 'weapon-qualification',
    title: 'Kwalifikacja Broni',
    description: 'Roczna kwalifikacja broni i certyfikacja bezpieczeństwa.',
    time: '09:00 - 15:00',
    location: 'Strzelnica B',
    participants: 30,
    isMandatory: true
  }
]

export const getTrainingsByMonth = (trainings: Training[]) => {
  const grouped = trainings.reduce((acc, training) => {
    // Assign specific trainings to specific months based on design
    let month: string
    
    if (training.id === 'field-training') {
      month = 'Październik'
    } else if (training.id === 'weapon-qualification') {
      month = 'Listopad'
    } else if (training.id === 'urban-combat') {
      month = 'Październik'
    } else if (training.id === 'navigation-training') {
      month = 'Listopad'
    } else if (training.id === 'medical-training') {
      month = 'Październik'
    } else if (training.id === 'communication-training') {
      month = 'Listopad'
    } else if (training.id === 'night-training') {
      month = 'Listopad'
    } else {
      // For other trainings, distribute randomly
      month = Math.random() > 0.5 ? 'Październik' : 'Listopad'
    }
    
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(training)
    return acc
  }, {} as Record<string, Training[]>)

  return grouped
}
