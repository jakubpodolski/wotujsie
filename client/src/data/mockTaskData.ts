export interface Task {
  id: string
  title: string
  description: string
  duration: string
  category: string
  completed: boolean
}

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Bieg Poranny',
    description: '5km bieg w umiarkowanym tempie',
    duration: '30 min',
    category: 'Cardio',
    completed: true
  },
  {
    id: '2',
    title: 'Pompki',
    description: 'Standardowe pompki wojskowe z prawidłową techniką',
    duration: '3 serie x 20 powtórzeń',
    category: 'Siła',
    completed: false
  },
  {
    id: '3',
    title: 'Brzuszki',
    description: 'Ćwiczenie wzmacniające mięśnie brzucha',
    duration: '3 serie x 25 powtórzeń',
    category: 'Siła',
    completed: false
  },
  {
    id: '4',
    title: 'Przegląd Taktyczny',
    description: 'Nauka formacji ruchu drużyny',
    duration: '15 min',
    category: 'Wiedza',
    completed: false
  },
  {
    id: '5',
    title: 'Kontrola Sprzętu',
    description: 'Sprawdzenie i czyszczenie osobistego wyposażenia',
    duration: '10 min',
    category: 'Konserwacja',
    completed: false
  }
]
