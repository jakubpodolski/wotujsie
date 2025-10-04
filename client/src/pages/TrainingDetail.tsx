import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { TrainingDetailHeader } from '../components/sections/TrainingDetailHeader'
import { TrainingOverview } from '../components/sections/TrainingOverview'
import { TrainingObjectives } from '../components/sections/TrainingObjectives'
import { TrainingPrerequisites } from '../components/sections/TrainingPrerequisites'
import { TrainingSchedule } from '../components/sections/TrainingSchedule'
import { RequiredEquipment } from '../components/sections/RequiredEquipment'
import { TrainingRegistrationButton } from '../components/sections/TrainingRegistrationButton'
import { RegistrationStatus } from '../components/sections/RegistrationStatus'
import { LoadingCard } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorBoundary'
import { useTraining } from '../hooks/useApi'
import { trainingsApi } from '../services/api'

interface TrainingDetail {
  id: string
  title: string
  description: string
  longDescription: string
  date: string
  time: string
  duration: string
  dateRange: string
  location: string
  address: string
  participants: number
  maxParticipants: number
  status: 'required' | 'optional'
  level: 'Początkujący' | 'Średni' | 'Zaawansowany'
  action: 'signup' | 'registered'
  requirements: string[]
  equipment: string[]
  instructor: {
    name: string
    rank: string
    unit: string
    experience: string
  }
  objectives: string[]
  schedule: {
    day: string
    activities: {
      time: string
      activity: string
    }[]
  }[]
}

// Mock data for training details (removed - now using API)
/*
const mockTrainingDetails: Record<string, TrainingDetail> = {
  'field-training': {
    id: 'field-training',
    title: 'Ćwiczenia polowe',
    description: 'Całodniowe ćwiczenia polowe skupiające się na manewrach taktycznych i koordynacji zespołowej.',
    longDescription: 'Kompleksowe ćwiczenia polowe skupiające się na manewrach taktycznych, nawigacji terenowej i operacjach na poziomie drużyny. To intensywne szkolenie przetestuje Twoją gotowość bojową i umiejętności pracy zespołowej w realistycznych warunkach polowych.',
    date: '12 października 2025',
    time: '08:00',
    duration: '3 dni',
    dateRange: '12-14 października 2025',
    location: 'Poligon Alfa, Drawsko Pomorskie',
    address: 'Poligon Wojskowy Alfa, 32-123 Kraków',
    participants: 42,
    maxParticipants: 60,
    status: 'required',
    level: 'Średni',
    action: 'signup',
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Certyfikat pierwszej pomocy bojowej',
      'Osobisty sprzęt ochronny (OSO)',
      'Standard sprawności fizycznej: Poziom 2+',
      'Certyfikat bezpieczeństwa broni'
    ],
    equipment: [
      'Pełne umundurowanie polowe (MultiCam)',
      'System broni osobistej',
      'Wyposażenie nośne (WN)',
      'Plecak taktyczny z systemem nawadniania',
      'Hełm i kamizelka ochronna',
      'Sprzęt noktowizyjny (wydawany na miejscu)',
      'Racje polowe i woda (zapas na 3 dni)',
      'Indywidualny zestaw pierwszej pomocy (IFAK)'
    ],
    instructor: {
      name: 'mjr. Kowalski',
      rank: 'Major',
      unit: '18. Batalion WOT',
      experience: '15 lat doświadczenia w jednostkach specjalnych'
    },
    objectives: [
      'Opanowanie taktycznych manewrów w zróżnicowanym terenie',
      'Wykonanie skoordynowanych manewrów drużyny',
      'Demonstracja biegłości w komunikacji polowej',
      'Zastosowanie pierwszej pomocy bojowej pod presją',
      'Ukończenie ćwiczenia nawigacji nocnej'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '06:00', activity: 'Zbiórka i kontrola sprzętu' },
          { time: '07:00', activity: 'Odprawa taktyczna i przegląd misji' },
          { time: '09:00', activity: 'Ćwiczenia manewrowe w terenie (Ruchy drużyny)' },
          { time: '12:00', activity: 'Racje polowe i odpoczynek taktyczny' },
          { time: '13:00', activity: 'Ćwiczenia komunikacji i koordynacji' },
          { time: '16:00', activity: 'Scenariusze bojowe i ćwiczenia na żywo' },
          { time: '19:00', activity: 'Analiza poakcyjna i debriefing' },
          { time: '21:00', activity: 'Przygotowanie do operacji nocnych' }
        ]
      },
      {
        day: 'Dzień 2',
        activities: [
          { time: '06:00', activity: 'Pobudka i poranna zaprawa' },
          { time: '07:00', activity: 'Śniadanie i przygotowanie do działań' },
          { time: '08:00', activity: 'Symulacja ataku na obiekt' },
          { time: '11:00', activity: 'Ewakuacja medyczna i transport rannego' },
          { time: '13:00', activity: 'Obiad i podsumowanie ćwiczeń' },
          { time: '15:00', activity: 'Rozformowanie i zdanie sprzętu' }
        ]
      }
    ]
  },
  'urban-combat': {
    id: 'urban-combat',
    title: 'Symulacja walki miejskiej',
    description: 'Szkolenie z taktyki walki w terenie zurbanizowanym.',
    longDescription: 'Specjalistyczne szkolenie z taktyki walki w terenie zurbanizowanym. Uczestnicy nauczą się poruszać się w budynkach, prowadzić działania w wąskich przestrzeniach miejskich oraz koordynować działania w złożonym środowisku miejskim. Szkolenie obejmuje zarówno aspekty taktyczne jak i techniczne walki miejskiej.',
    date: '18 października 2025',
    time: '14:00',
    duration: '2 dni',
    dateRange: '18-19 października 2025',
    location: 'Centrum Szkoleniowe Beta',
    address: 'Centrum Szkoleniowe Beta, ul. Wojskowa 15, 30-001 Kraków',
    participants: 20,
    maxParticipants: 25,
    status: 'optional',
    level: 'Zaawansowany',
    action: 'registered',
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Certyfikat pierwszej pomocy bojowej',
      'Osobisty sprzęt ochronny (OSO)',
      'Standard sprawności fizycznej: Poziom 3+',
      'Certyfikat bezpieczeństwa broni i walki miejskiej'
    ],
    equipment: [
      'Pełne umundurowanie taktyczne (czarny)',
      'System broni osobistej',
      'Wyposażenie nośne (WN)',
      'Plecak taktyczny z systemem komunikacji',
      'Hełm i kamizelka balistyczna',
      'Sprzęt noktowizyjny (wydawany na miejscu)',
      'Latarka taktyczna',
      'Ochraniacze na kolana i łokcie',
      'Indywidualny zestaw pierwszej pomocy (IFAK)'
    ],
    instructor: {
      name: 'mjr. Anna Nowak',
      rank: 'Major',
      unit: 'Jednostka Specjalna',
      experience: '12 lat w jednostkach specjalnych, ekspert walki miejskiej'
    },
    objectives: [
      'Opanowanie taktyki walki w terenie zurbanizowanym',
      'Nauka poruszania się w budynkach i wąskich przestrzeniach',
      'Koordynacja działań w złożonym środowisku miejskim',
      'Demonstracja umiejętności walki w pomieszczeniach',
      'Przygotowanie do operacji specjalnych w miastach'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '14:00', activity: 'Zbiórka i sprawdzenie sprzętu' },
          { time: '14:30', activity: 'Teoria walki miejskiej' },
          { time: '15:00', activity: 'Ćwiczenia w budynkach' },
          { time: '17:00', activity: 'Przerwa' },
          { time: '17:30', activity: 'Symulacja walki miejskiej' },
          { time: '19:30', activity: 'Podsumowanie i omówienie' },
          { time: '20:00', activity: 'Zakończenie szkolenia' }
        ]
      }
    ]
  },
  'navigation-training': {
    id: 'navigation-training',
    title: 'Szkolenie z Nawigacji',
    description: 'Nawigacja terenowa z wykorzystaniem mapy i kompasu.',
    longDescription: 'Specjalistyczne szkolenie z nawigacji terenowej, które obejmuje pracę z mapą topograficzną, kompasem oraz nowoczesnymi systemami GPS. Uczestnicy nauczą się orientacji w terenie, planowania tras marszu oraz nawigacji w warunkach ograniczonej widoczności.',
    date: '15 listopada 2025',
    time: '14:00',
    duration: '1 dzień',
    dateRange: '15 listopada 2025',
    location: 'Obszar Leśny C',
    address: 'Obszar Leśny C, 32-123 Kraków',
    participants: 12,
    maxParticipants: 20,
    status: 'optional',
    level: 'Początkujący',
    action: 'signup',
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Podstawowa kondycja fizyczna',
      'Umiejętność czytania mapy'
    ],
    equipment: [
      'Mapa topograficzna (wydawana na miejscu)',
      'Kompas magnetyczny',
      'Ołówek i gumka',
      'Plecak z wodą i prowiantem',
      'Odpowiednie obuwie terenowe',
      'Latarka z zapasowymi bateriami'
    ],
    instructor: {
      name: 'kpt. Jan Kowalski',
      rank: 'Kapitan',
      unit: '18. Batalion WOT',
      experience: '8 lat doświadczenia w nawigacji terenowej'
    },
    objectives: [
      'Opanowanie podstaw nawigacji z mapą i kompasem',
      'Nauka orientacji w terenie leśnym',
      'Planowanie i wytyczanie tras marszu',
      'Nawigacja w warunkach ograniczonej widoczności',
      'Praktyczne zastosowanie systemów GPS'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '14:00', activity: 'Zbiórka i sprawdzenie sprzętu' },
          { time: '14:30', activity: 'Teoria nawigacji - mapy i kompasy' },
          { time: '15:30', activity: 'Ćwiczenia praktyczne z kompasem' },
          { time: '16:30', activity: 'Marsz nawigacyjny po wyznaczonej trasie' },
          { time: '18:00', activity: 'Podsumowanie i omówienie błędów' },
          { time: '18:30', activity: 'Zakończenie szkolenia' }
        ]
      }
    ]
  },
  'medical-training': {
    id: 'medical-training',
    title: 'Ćwiczenia Medyczne',
    description: 'Szkolenie z pierwszej pomocy i reagowania w sytuacjach kryzysowych.',
    longDescription: 'Kompleksowe szkolenie z pierwszej pomocy bojowej i medycyny taktycznej. Uczestnicy nauczą się udzielania pierwszej pomocy w warunkach bojowych, ewakuacji rannych oraz podstawowych procedur medycznych w sytuacjach kryzysowych.',
    date: '20 października 2025',
    time: '09:00',
    duration: '2 dni',
    dateRange: '20-21 października 2025',
    location: 'Centrum Szkoleniowe Beta',
    address: 'Centrum Szkoleniowe Beta, ul. Wojskowa 15, 30-001 Kraków',
    participants: 22,
    maxParticipants: 30,
    status: 'optional',
    level: 'Średni',
    action: 'signup',
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Podstawowa wiedza z anatomii',
      'Odpowiednia kondycja fizyczna'
    ],
    equipment: [
      'Indywidualny zestaw pierwszej pomocy (IFAK)',
      'Rękawice medyczne',
      'Maska do resuscytacji',
      'Opaski uciskowe',
      'Koce termiczne',
      'Latarka medyczna'
    ],
    instructor: {
      name: 'mjr. lek. Maria Nowak',
      rank: 'Major lekarz',
      unit: 'Wojskowy Instytut Medyczny',
      experience: '12 lat doświadczenia w medycynie taktycznej'
    },
    objectives: [
      'Opanowanie podstaw pierwszej pomocy bojowej',
      'Nauka ewakuacji rannych z pola walki',
      'Zastosowanie technik opatrywania ran',
      'Resuscytacja w warunkach bojowych',
      'Organizacja punktu medycznego'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '09:00', activity: 'Zbiórka i sprawdzenie sprzętu medycznego' },
          { time: '09:30', activity: 'Teoria pierwszej pomocy bojowej' },
          { time: '11:00', activity: 'Ćwiczenia z opatrywania ran' },
          { time: '13:00', activity: 'Przerwa na obiad' },
          { time: '14:00', activity: 'Symulacja ewakuacji rannych' },
          { time: '16:00', activity: 'Ćwiczenia z resuscytacji' },
          { time: '17:30', activity: 'Podsumowanie dnia' }
        ]
      },
      {
        day: 'Dzień 2',
        activities: [
          { time: '09:00', activity: 'Pobudka i poranna zaprawa' },
          { time: '09:30', activity: 'Organizacja punktu medycznego' },
          { time: '11:00', activity: 'Symulacja masowych wypadków' },
          { time: '13:00', activity: 'Obiad i odpoczynek' },
          { time: '14:00', activity: 'Egzamin praktyczny' },
          { time: '16:00', activity: 'Podsumowanie i wręczenie certyfikatów' }
        ]
      }
    ]
  },
  'communication-training': {
    id: 'communication-training',
    title: 'Szkolenie z Komunikacji',
    description: 'Nauka efektywnej komunikacji radiowej i sygnalizacji.',
    longDescription: 'Specjalistyczne szkolenie z komunikacji radiowej i sygnalizacji w warunkach bojowych. Uczestnicy nauczą się prawidłowego używania sprzętu radiowego, procedur komunikacyjnych oraz sygnalizacji wizualnej i dźwiękowej.',
    date: '25 listopada 2025',
    time: '10:00',
    duration: '1 dzień',
    dateRange: '25 listopada 2025',
    location: 'Baza Główna',
    address: 'Baza Główna, ul. Wojskowa 1, 30-001 Kraków',
    participants: 28,
    maxParticipants: 35,
    status: 'required',
    level: 'Początkujący',
    action: 'signup',
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Podstawowa znajomość języka polskiego',
      'Umiejętność pracy w zespole'
    ],
    equipment: [
      'Radiotelefon (wydawany na miejscu)',
      'Zestaw słuchawkowy',
      'Antena przenośna',
      'Zestaw sygnalizacyjny',
      'Latarka sygnalizacyjna',
      'Gwizdek'
    ],
    instructor: {
      name: 'ppor. Tomasz Wiśniewski',
      rank: 'Podporucznik',
      unit: '18. Batalion WOT',
      experience: '6 lat doświadczenia w łączności wojskowej'
    },
    objectives: [
      'Opanowanie podstaw komunikacji radiowej',
      'Nauka procedur łączności wojskowej',
      'Zastosowanie sygnalizacji wizualnej',
      'Praca z różnymi typami radiotelefonów',
      'Organizacja sieci łączności'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '10:00', activity: 'Zbiórka i sprawdzenie sprzętu radiowego' },
          { time: '10:30', activity: 'Teoria komunikacji radiowej' },
          { time: '12:00', activity: 'Ćwiczenia z radiotelefonami' },
          { time: '13:00', activity: 'Przerwa na obiad' },
          { time: '14:00', activity: 'Sygnalizacja wizualna i dźwiękowa' },
          { time: '15:30', activity: 'Symulacja komunikacji w akcji' },
          { time: '16:30', activity: 'Podsumowanie i egzamin' }
        ]
      }
    ]
  },
  'night-training': {
    id: 'night-training',
    title: 'Ćwiczenia Nocne',
    description: 'Szkolenie z operacji prowadzonych w warunkach ograniczonej widoczności.',
    longDescription: 'Specjalistyczne szkolenie z operacji nocnych i działań w warunkach ograniczonej widoczności. Uczestnicy nauczą się poruszania się w ciemności, używania sprzętu noktowizyjnego oraz prowadzenia działań bojowych w nocy.',
    date: '30 listopada 2025',
    time: '20:00',
    duration: '1 dzień',
    dateRange: '30 listopada 2025',
    location: 'Poligon Delta',
    address: 'Poligon Delta, 32-123 Kraków',
    participants: 18,
    maxParticipants: 25,
    status: 'optional',
    level: 'Zaawansowany',
    action: 'signup',
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Standard sprawności fizycznej: Poziom 2+',
      'Certyfikat bezpieczeństwa broni',
      'Doświadczenie w operacjach dziennych'
    ],
    equipment: [
      'Sprzęt noktowizyjny (wydawany na miejscu)',
      'Latarka taktyczna z filtrem czerwonym',
      'Pełne umundurowanie polowe',
      'System broni osobistej',
      'Hełm i kamizelka ochronna',
      'Plecak z wodą i prowiantem'
    ],
    instructor: {
      name: 'mjr. Piotr Kowalczyk',
      rank: 'Major',
      unit: 'Jednostka Specjalna',
      experience: '10 lat doświadczenia w operacjach nocnych'
    },
    objectives: [
      'Opanowanie poruszania się w ciemności',
      'Nauka używania sprzętu noktowizyjnego',
      'Prowadzenie działań bojowych w nocy',
      'Komunikacja w warunkach ograniczonej widoczności',
      'Nawigacja nocna i orientacja w terenie'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '20:00', activity: 'Zbiórka i sprawdzenie sprzętu noktowizyjnego' },
          { time: '20:30', activity: 'Teoria operacji nocnych' },
          { time: '21:30', activity: 'Ćwiczenia z noktowizją' },
          { time: '23:00', activity: 'Marsz nocny po wyznaczonej trasie' },
          { time: '01:00', activity: 'Symulacja działań bojowych' },
          { time: '02:00', activity: 'Podsumowanie i zakończenie' }
        ]
      }
    ]
  },
  'weapon-qualification': {
    id: 'weapon-qualification',
    title: 'Kwalifikacja Broni',
    description: 'Roczna kwalifikacja broni i certyfikacja bezpieczeństwa.',
    longDescription: 'Obligatoryjne szkolenie z kwalifikacji broni i certyfikacji bezpieczeństwa. Uczestnicy przejdą testy teoretyczne i praktyczne z obsługi broni, zasad bezpieczeństwa oraz strzelania na różnych dystansach.',
    date: '10 listopada 2025',
    time: '09:00',
    duration: '1 dzień',
    dateRange: '10 listopada 2025',
    location: 'Strzelnica B',
    address: 'Strzelnica B, ul. Strzelecka 5, 30-001 Kraków',
    participants: 28,
    maxParticipants: 35,
    status: 'required',
    level: 'Średni',
    action: 'registered',
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Certyfikat bezpieczeństwa broni (ważny)',
      'Standard sprawności fizycznej: Poziom 2+',
      'Wcześniejsze doświadczenie z bronią'
    ],
    equipment: [
      'Broń osobista (wydawana na miejscu)',
      'Ochraniacze słuchu',
      'Okulary ochronne',
      'Rękawice strzeleckie',
      'Kamizelka z kieszeniami na magazynki',
      'Plecak z wodą i prowiantem'
    ],
    instructor: {
      name: 'kpt. Andrzej Zieliński',
      rank: 'Kapitan',
      unit: '18. Batalion WOT',
      experience: '15 lat doświadczenia w szkoleniu strzeleckim'
    },
    objectives: [
      'Przypomnienie zasad bezpieczeństwa broni',
      'Test teoretyczny z obsługi broni',
      'Strzelanie na dystansie 25m',
      'Strzelanie na dystansie 100m',
      'Strzelanie w ruchu i z różnych pozycji',
      'Ocena celności i szybkości strzelania'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '09:00', activity: 'Zbiórka i sprawdzenie broni' },
          { time: '09:30', activity: 'Test teoretyczny z bezpieczeństwa' },
          { time: '10:30', activity: 'Strzelanie na dystansie 25m' },
          { time: '12:00', activity: 'Przerwa na obiad' },
          { time: '13:00', activity: 'Strzelanie na dystansie 100m' },
          { time: '14:30', activity: 'Strzelanie w ruchu' },
          { time: '16:00', activity: 'Podsumowanie i wręczenie certyfikatów' }
        ]
      }
    ]
  }
}
*/

export const TrainingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isRegistered, setIsRegistered] = useState(false)
  
  const { training, error, isLoading, mutate } = useTraining(id || '')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <LoadingCard />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
            <div className="space-y-6">
              <LoadingCard />
              <LoadingCard />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Błąd ładowania</h1>
          <p className="text-gray-400 mb-4">Nie udało się załadować danych szkolenia.</p>
          <ErrorMessage error={error} onRetry={() => mutate()} />
          <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 mt-4">
            Powrót do strony głównej
          </Button>
        </div>
      </div>
    )
  }

  if (!training) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Szkolenie nie znalezione</h1>
          <p className="text-gray-400 mb-4">Szkolenie o podanym ID nie istnieje.</p>
          <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
            Powrót do strony głównej
          </Button>
        </div>
      </div>
    )
  }



  const getStatusText = (status: 'required' | 'optional') => {
    switch (status) {
      case 'required':
        return 'Wymagane'
      case 'optional':
        return 'Opcjonalne'
    }
  }

  const getPolishDate = (date: string) => {
    // Convert the date format to match the design
    return date
  }

  const handleRegister = async () => {
    try {
      await trainingsApi.register(training.id, '1')
      setIsRegistered(true)
      mutate() // Refresh training data
    } catch (error) {
      console.error('Failed to register for training:', error)
    }
  }

  const handleCancelRegistration = async () => {
    try {
      await trainingsApi.cancelRegistration(training.id, '1')
      setIsRegistered(false)
      mutate() // Refresh training data
    } catch (error) {
      console.error('Failed to cancel training registration:', error)
    }
  }

  // Check if user is already registered based on training data
  const userIsRegistered = training?.action === 'registered' || isRegistered


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sticky Header */}
      <TrainingDetailHeader
        title={training.title}
        date={getPolishDate(training.date)}
        level={training.level}
        status={getStatusText(training.status)}
        onBack={() => navigate(-1)}
      />

      <div className={`container mx-auto px-4 py-8 ${!userIsRegistered ? 'pb-20' : ''}`}>
        {/* Registration Status - Top of Page */}
        {userIsRegistered && (
          <div className="mb-6">
            <RegistrationStatus onCancel={handleCancelRegistration} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Component */}
            <TrainingOverview
              description={training.longDescription || training.description}
              location={training.location}
              duration={training.duration}
              dateRange={training.dateRange}
              enrolled={training.participants}
              capacity={training.maxParticipants}
              instructor={{
                name: training.instructor.name,
                rank: training.instructor.rank,
                unit: training.instructor.unit
              }}
            />


            {/* Training Objectives */}
            <TrainingObjectives objectives={training.objectives} />

            {/* Training Schedule */}
            <TrainingSchedule schedule={training.schedule} />

          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Training Prerequisites */}
            <TrainingPrerequisites prerequisites={training.requirements} />

            {/* Required Equipment */}
            <RequiredEquipment equipment={training.equipment} />
          </div>
        </div>
      </div>

      {/* Registration Button - Only show if not registered */}
      {!userIsRegistered && (
        <TrainingRegistrationButton
          isRegistered={userIsRegistered}
          onRegister={handleRegister}
        />
      )}
    </div>
  )
}
