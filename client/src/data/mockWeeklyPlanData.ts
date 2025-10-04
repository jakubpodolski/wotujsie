export interface WeeklyPlanDay {
  id: string
  day: string
  description: string
  exercisesCount: number
  duration: number // in minutes
  isToday: boolean
}

export const mockWeeklyPlan: WeeklyPlanDay[] = [
  {
    id: 'monday',
    day: 'Poniedziałek',
    description: 'Cardio i Wytrzymałość',
    exercisesCount: 5,
    duration: 90,
    isToday: false
  },
  {
    id: 'tuesday',
    day: 'Wtorek',
    description: 'Trening Siłowy',
    exercisesCount: 4,
    duration: 60,
    isToday: false
  },
  {
    id: 'wednesday',
    day: 'Środa',
    description: 'Umiejętności Taktyczne',
    exercisesCount: 6,
    duration: 120,
    isToday: false
  },
  {
    id: 'thursday',
    day: 'Czwartek',
    description: 'Ćwiczenia Bojowe',
    exercisesCount: 5,
    duration: 90,
    isToday: true
  },
  {
    id: 'friday',
    day: 'Piątek',
    description: 'Trening Mieszany',
    exercisesCount: 5,
    duration: 75,
    isToday: false
  },
  {
    id: 'saturday',
    day: 'Sobota',
    description: 'Ćwiczenia Polowe',
    exercisesCount: 3,
    duration: 180,
    isToday: false
  },
  {
    id: 'sunday',
    day: 'Niedziela',
    description: 'Odpoczynek i Regeneracja',
    exercisesCount: 2,
    duration: 30,
    isToday: false
  }
]
