import { 
  Training, 
  Task, 
  ProcedureCategory, 
  WeeklyPlanDay, 
  Certificate, 
  User, 
  Incident,
  TrainingRegistration 
} from './models'

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@wot.mil.pl',
    phone: '+48 123 456 789',
    rank: 'Kapral',
    unit: '15. Brygada Obrony Terytorialnej',
    location: 'Warszawa, Polska',
    status: 'active',
    serviceInfo: {
      unit: '15. Brygada Obrony Terytorialnej',
      rank: 'Kapral (Corporal)',
      baseLocation: 'Warszawa, Polska'
    },
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  }
]

// Mock Trainings
export const mockTrainings: Training[] = [
  {
    id: 'field-training',
    title: 'Ćwiczenia Polowe',
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
    isMandatory: true,
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
  {
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
    isMandatory: false,
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
  {
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
    isMandatory: false,
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
  {
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
    isMandatory: true,
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
  {
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
    isMandatory: false,
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
  {
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
    isMandatory: true,
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
  },
  {
    id: 'tactical-driving',
    title: 'Szkolenie z Jazdy Taktycznej',
    description: 'Nauka bezpiecznej jazdy w warunkach bojowych i sytuacjach kryzysowych.',
    longDescription: 'Specjalistyczne szkolenie z jazdy taktycznej obejmujące techniki bezpiecznej jazdy w warunkach bojowych, unikania zagrożeń oraz prowadzenia pojazdów w sytuacjach kryzysowych. Uczestnicy nauczą się manewrów obronnych i ofensywnych.',
    date: '5 grudnia 2025',
    time: '09:00',
    duration: '2 dni',
    dateRange: '5-6 grudnia 2025',
    location: 'Centrum Szkolenia Kierowców',
    address: 'Centrum Szkolenia Kierowców, ul. Motoryzacyjna 10, 30-001 Kraków',
    participants: 15,
    maxParticipants: 20,
    status: 'optional',
    level: 'Średni',
    action: 'signup',
    isMandatory: false,
    requirements: [
      'Ważne prawo jazdy kategorii B',
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Minimum 2 lata doświadczenia w prowadzeniu pojazdów',
      'Podstawowa kondycja fizyczna'
    ],
    equipment: [
      'Pojazd szkoleniowy (wydawany na miejscu)',
      'Kask ochronny',
      'Rękawice kierownicze',
      'Odzież robocza',
      'Woda i prowiant'
    ],
    instructor: {
      name: 'kpt. Marek Kowalczyk',
      rank: 'Kapitan',
      unit: 'Jednostka Szkolenia Kierowców',
      experience: '10 lat doświadczenia w szkoleniu kierowców wojskowych'
    },
    objectives: [
      'Opanowanie technik jazdy taktycznej',
      'Nauka manewrów obronnych i ofensywnych',
      'Prowadzenie pojazdów w warunkach ograniczonej widoczności',
      'Techniki unikania zagrożeń',
      'Współpraca z zespołem podczas jazdy'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '09:00', activity: 'Zbiórka i sprawdzenie dokumentów' },
          { time: '09:30', activity: 'Teoria jazdy taktycznej' },
          { time: '11:00', activity: 'Ćwiczenia na torze szkoleniowym' },
          { time: '13:00', activity: 'Przerwa na obiad' },
          { time: '14:00', activity: 'Jazda w warunkach miejskich' },
          { time: '16:00', activity: 'Manewry obronne' },
          { time: '17:30', activity: 'Podsumowanie dnia' }
        ]
      },
      {
        day: 'Dzień 2',
        activities: [
          { time: '09:00', activity: 'Pobudka i poranna zaprawa' },
          { time: '09:30', activity: 'Jazda w terenie' },
          { time: '11:00', activity: 'Ćwiczenia nocne' },
          { time: '13:00', activity: 'Obiad i odpoczynek' },
          { time: '14:00', activity: 'Egzamin praktyczny' },
          { time: '16:00', activity: 'Podsumowanie i wręczenie certyfikatów' }
        ]
      }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Szkolenie z Cyberbezpieczeństwa',
    description: 'Podstawy cyberbezpieczeństwa i obrony przed zagrożeniami cyfrowymi.',
    longDescription: 'Nowoczesne szkolenie z cyberbezpieczeństwa skupiające się na obronie przed zagrożeniami cyfrowymi, bezpiecznym korzystaniu z technologii oraz podstawach cyberwojny. Uczestnicy nauczą się identyfikować i przeciwdziałać cyberatakom.',
    date: '15 grudnia 2025',
    time: '10:00',
    duration: '1 dzień',
    dateRange: '15 grudnia 2025',
    location: 'Centrum Cybernetyczne',
    address: 'Centrum Cybernetyczne, ul. Cyfrowa 5, 30-001 Kraków',
    participants: 25,
    maxParticipants: 30,
    status: 'optional',
    level: 'Początkujący',
    action: 'signup',
    isMandatory: false,
    requirements: [
      'Podstawowa znajomość obsługi komputera',
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Umiejętność pracy w zespole'
    ],
    equipment: [
      'Laptop (wydawany na miejscu)',
      'Zestaw słuchawkowy',
      'Notatnik i długopis',
      'Woda i prowiant'
    ],
    instructor: {
      name: 'mjr. Anna Cyberska',
      rank: 'Major',
      unit: 'Centrum Cybernetyczne',
      experience: '8 lat doświadczenia w cyberbezpieczeństwie'
    },
    objectives: [
      'Poznanie podstaw cyberbezpieczeństwa',
      'Identyfikacja zagrożeń cyfrowych',
      'Techniki obrony przed cyberatakami',
      'Bezpieczne korzystanie z internetu',
      'Współpraca w zespole cyberobrony'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '10:00', activity: 'Zbiórka i sprawdzenie sprzętu' },
          { time: '10:30', activity: 'Wprowadzenie do cyberbezpieczeństwa' },
          { time: '12:00', activity: 'Identyfikacja zagrożeń' },
          { time: '13:00', activity: 'Przerwa na obiad' },
          { time: '14:00', activity: 'Ćwiczenia praktyczne' },
          { time: '15:30', activity: 'Symulacja cyberataku' },
          { time: '16:30', activity: 'Podsumowanie i egzamin' }
        ]
      }
    ]
  },
  {
    id: 'survival-training',
    title: 'Szkolenie z Przetrwania',
    description: 'Nauka technik przetrwania w warunkach ekstremalnych.',
    longDescription: 'Intensywne szkolenie z technik przetrwania w warunkach ekstremalnych, obejmujące budowę schronień, pozyskiwanie wody i pożywienia, rozpalanie ognia oraz nawigację w terenie. Uczestnicy nauczą się radzić sobie w sytuacjach kryzysowych.',
    date: '20 grudnia 2025',
    time: '08:00',
    duration: '3 dni',
    dateRange: '20-22 grudnia 2025',
    location: 'Las Białowieski',
    address: 'Las Białowieski, 17-230 Białowieża',
    participants: 12,
    maxParticipants: 15,
    status: 'optional',
    level: 'Zaawansowany',
    action: 'signup',
    isMandatory: false,
    requirements: [
      'Ważne zaświadczenie lekarskie (w ciągu 12 miesięcy)',
      'Dobra kondycja fizyczna',
      'Odpowiednia odzież na warunki zimowe',
      'Podstawowa wiedza o terenie'
    ],
    equipment: [
      'Nóż survivalowy',
      'Latarka z zapasowymi bateriami',
      'Kompas',
      'Koc termiczny',
      'Zapałki wodoodporne',
      'Plecak z wodą i prowiantem',
      'Odpowiednia odzież zimowa'
    ],
    instructor: {
      name: 'kpt. Leszek Leśny',
      rank: 'Kapitan',
      unit: 'Jednostka Specjalna',
      experience: '12 lat doświadczenia w szkoleniu survivalowym'
    },
    objectives: [
      'Opanowanie podstawowych technik przetrwania',
      'Budowa schronień w warunkach zimowych',
      'Pozyskiwanie wody i pożywienia',
      'Rozpalanie ognia w trudnych warunkach',
      'Nawigacja w terenie leśnym'
    ],
    schedule: [
      {
        day: 'Dzień 1',
        activities: [
          { time: '08:00', activity: 'Zbiórka i sprawdzenie sprzętu' },
          { time: '08:30', activity: 'Marsz do bazy terenowej' },
          { time: '10:00', activity: 'Teoria przetrwania' },
          { time: '12:00', activity: 'Budowa schronienia' },
          { time: '14:00', activity: 'Przygotowanie posiłku' },
          { time: '16:00', activity: 'Ćwiczenia z ogniem' },
          { time: '18:00', activity: 'Nocleg w terenie' }
        ]
      },
      {
        day: 'Dzień 2',
        activities: [
          { time: '06:00', activity: 'Pobudka i poranna zaprawa' },
          { time: '07:00', activity: 'Śniadanie terenowe' },
          { time: '08:00', activity: 'Nawigacja w terenie' },
          { time: '10:00', activity: 'Pozyskiwanie wody' },
          { time: '12:00', activity: 'Obiad terenowy' },
          { time: '14:00', activity: 'Ćwiczenia z nożem' },
          { time: '16:00', activity: 'Budowa pułapek' },
          { time: '18:00', activity: 'Nocleg w terenie' }
        ]
      },
      {
        day: 'Dzień 3',
        activities: [
          { time: '06:00', activity: 'Pobudka i poranna zaprawa' },
          { time: '07:00', activity: 'Śniadanie terenowe' },
          { time: '08:00', activity: 'Marsz powrotny' },
          { time: '10:00', activity: 'Podsumowanie szkolenia' },
          { time: '11:00', activity: 'Egzamin praktyczny' },
          { time: '12:00', activity: 'Wręczenie certyfikatów' }
        ]
      }
    ]
  }
]

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Bieg Poranny',
    description: '5km bieg w umiarkowanym tempie',
    duration: '30 min',
    category: 'Cardio',
    completed: true,
    userId: '1'
  },
  {
    id: '2',
    title: 'Pompki',
    description: 'Standardowe pompki wojskowe z prawidłową techniką',
    duration: '3 serie x 20 powtórzeń',
    category: 'Siła',
    completed: false,
    userId: '1'
  },
  {
    id: '3',
    title: 'Brzuszki',
    description: 'Ćwiczenie wzmacniające mięśnie brzucha',
    duration: '3 serie x 25 powtórzeń',
    category: 'Siła',
    completed: false,
    userId: '1'
  },
  {
    id: '4',
    title: 'Przegląd Taktyczny',
    description: 'Nauka formacji ruchu drużyny',
    duration: '15 min',
    category: 'Wiedza',
    completed: false,
    userId: '1'
  },
  {
    id: '5',
    title: 'Kontrola Sprzętu',
    description: 'Sprawdzenie i czyszczenie osobistego wyposażenia',
    duration: '10 min',
    category: 'Konserwacja',
    completed: false,
    userId: '1'
  }
]

// Mock Weekly Plans
export const mockWeeklyPlans: WeeklyPlanDay[] = [
  {
    id: 'monday',
    day: 'Poniedziałek',
    description: 'Cardio i Wytrzymałość',
    exercisesCount: 5,
    duration: 90,
    isToday: false,
    userId: '1'
  },
  {
    id: 'tuesday',
    day: 'Wtorek',
    description: 'Trening Siłowy',
    exercisesCount: 4,
    duration: 60,
    isToday: false,
    userId: '1'
  },
  {
    id: 'wednesday',
    day: 'Środa',
    description: 'Umiejętności Taktyczne',
    exercisesCount: 6,
    duration: 120,
    isToday: false,
    userId: '1'
  },
  {
    id: 'thursday',
    day: 'Czwartek',
    description: 'Ćwiczenia Bojowe',
    exercisesCount: 5,
    duration: 90,
    isToday: true,
    userId: '1'
  },
  {
    id: 'friday',
    day: 'Piątek',
    description: 'Trening Mieszany',
    exercisesCount: 5,
    duration: 75,
    isToday: false,
    userId: '1'
  },
  {
    id: 'saturday',
    day: 'Sobota',
    description: 'Ćwiczenia Polowe',
    exercisesCount: 3,
    duration: 180,
    isToday: false,
    userId: '1'
  },
  {
    id: 'sunday',
    day: 'Niedziela',
    description: 'Odpoczynek i Regeneracja',
    exercisesCount: 2,
    duration: 30,
    isToday: false,
    userId: '1'
  }
]

// Mock Certificates
export const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Certyfikat Pierwszej Pomocy Bojowej',
    description: 'Naucz się podstawowych procedur medycznych na polu walki, w tym zakładania opasek uciskowych, opatrywania ran i protokołów ewakuacji rannych.',
    status: 'NOT_STARTED',
    modules: ['Zakładanie Opasek', 'Opatrywanie Ran', 'Ewakuacja Rannych', 'Zarządzanie Szokiem'],
    duration: 4,
    daysLeft: 16,
    userId: '1'
  },
  {
    id: '2',
    title: 'Przegląd Bezpieczeństwa Broni',
    description: 'Przejrzyj kompleksowe protokoły bezpieczeństwa dotyczące obsługi, przechowywania i konserwacji broni wojskowej i amunicji.',
    status: 'IN_PROGRESS',
    modules: ['Bezpieczna Obsługa', 'Bezpieczeństwo na Strzelnicy', 'Konserwacja', 'Protokoły Przechowywania'],
    duration: 2.5,
    daysLeft: 8,
    progress: 60,
    userId: '1'
  },
  {
    id: '3',
    title: 'Szkolenie Taktyczne',
    description: 'Zaawansowane szkolenie z taktyki wojskowej, współpracy w zespole i strategii bojowych.',
    status: 'COMPLETED',
    modules: ['Taktyka Piechoty', 'Współpraca Zespołowa', 'Strategia Bojowa', 'Komunikacja Taktyczna'],
    duration: 8,
    daysLeft: 0,
    userId: '1'
  }
]

// Mock Training Registrations
export const mockTrainingRegistrations: TrainingRegistration[] = [
  {
    id: '1',
    trainingId: 'weapon-qualification',
    userId: '1',
    registeredAt: '2024-01-10T10:00:00Z',
    status: 'registered'
  }
]

// Mock Incidents
export const mockIncidents: Incident[] = [
  {
    id: 'flood-warning-001',
    type: 'flood',
    severity: 'KRYTYCZNY',
    title: 'Powodzie',
    description: 'Zgłoszono poważne powodzie w obszarach operacyjnych. Zgłoś się do najbliższej jednostki.',
    nearestStation: {
      name: '18. Batalion WOT',
      address: 'ul. Kościuszki 45, Kraków',
      distance: '3.2 km'
    },
    createdAt: '2024-01-15T08:00:00Z'
  }
]

// Helper functions
export const getTrainingsByMonth = (trainings: Training[]) => {
  const grouped = trainings.reduce((acc, training) => {
    let month: string
    
    if (training.id === 'field-training') {
      month = 'Październik'
    } else if (training.id === 'weapon-qualification') {
      month = 'Listopad'
    } else if (training.id === 'navigation-training') {
      month = 'Listopad'
    } else if (training.id === 'medical-training') {
      month = 'Październik'
    } else if (training.id === 'communication-training') {
      month = 'Listopad'
    } else if (training.id === 'night-training') {
      month = 'Listopad'
    } else if (training.id === 'tactical-driving') {
      month = 'Grudzień'
    } else if (training.id === 'cyber-security') {
      month = 'Grudzień'
    } else if (training.id === 'survival-training') {
      month = 'Grudzień'
    } else {
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

export const getUserTrainings = (userId: string) => {
  const userRegistrations = mockTrainingRegistrations.filter(reg => reg.userId === userId && reg.status === 'registered')
  return mockTrainings.filter(training => 
    userRegistrations.some(reg => reg.trainingId === training.id)
  )
}