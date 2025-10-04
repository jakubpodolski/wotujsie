export interface ProcedureStep {
  id: number
  text: string
}

export interface Procedure {
  id: string
  title: string
  description: string
  steps: ProcedureStep[]
  priority: 'Critical' | 'Important' | 'Standard'
}

export interface ProcedureCategory {
  id: string
  title: string
  icon: string
  procedureCount: number
  procedures: Procedure[]
}

export const mockProcedureData: ProcedureCategory[] = [
  {
    id: 'bleeding-control',
    title: 'Kontrola Krwawienia',
    icon: 'heart',
    procedureCount: 3,
    procedures: [
      {
        id: 'tourniquet',
        title: 'Zakładanie Opaski Zaciskowej',
        description: 'Szybka kontrola krwawienia z kończyn',
        priority: 'Critical',
        steps: [
          { id: 1, text: 'Umieść opaskę 5-7 cm powyżej rany' },
          { id: 2, text: 'Zaciśnij opaskę do zatrzymania krwawienia' },
          { id: 3, text: 'Zanotuj czas założenia opaski' },
          { id: 4, text: 'Nie zdejmuj opaski - tylko lekarz' },
          { id: 5, text: 'Monitoruj stan poszkodowanego' }
        ]
      },
      {
        id: 'wound-packing',
        title: 'Tamponowanie Ran',
        description: 'Używane do głębokich ran w miejscach gdzie nie można założyć opaski',
        priority: 'Critical',
        steps: [
          { id: 1, text: 'Odsłoń ranę i zlokalizuj źródło krwawienia' },
          { id: 2, text: 'Wpchnij gazę bezpośrednio do jamy rany' },
          { id: 3, text: 'Zastosuj silny ucisk przez co najmniej 3 minuty' },
          { id: 4, text: 'Załóż opatrunek uciskowy na zatamowaną ranę' },
          { id: 5, text: 'Monitoruj czy krwawienie nie powraca' }
        ]
      },
      {
        id: 'pressure-points',
        title: 'Punkty Ucisku',
        description: 'Ucisk na główne tętnice w celu zatamowania krwawienia',
        priority: 'Important',
        steps: [
          { id: 1, text: 'Zidentyfikuj najbliższy punkt ucisku' },
          { id: 2, text: 'Zastosuj silny ucisk dwoma palcami' },
          { id: 3, text: 'Utrzymuj ucisk do zatrzymania krwawienia' },
          { id: 4, text: 'Nie zwalniaj ucisku przed przybyciem pomocy' }
        ]
      }
    ]
  },
  {
    id: 'airway-management',
    title: 'Zarządzanie Drogami Oddechowymi',
    icon: 'ecg',
    procedureCount: 2,
    procedures: [
      {
        id: 'nasopharyngeal-airway',
        title: 'Rurka Nosowo-Gardłowa (NPA)',
        description: 'Zabezpieczanie dróg oddechowych u nieprzytomnych',
        priority: 'Critical',
        steps: [
          { id: 1, text: 'Wybierz odpowiedni rozmiar rurki NPA' },
          { id: 2, text: 'Zastosuj żel lub wazelinę do smarowania' },
          { id: 3, text: 'Wprowadź rurkę przez nos do gardła' },
          { id: 4, text: 'Sprawdź czy drogi oddechowe są drożne' },
          { id: 5, text: 'Zabezpiecz rurkę taśmą' }
        ]
      },
      {
        id: 'recovery-position',
        title: 'Pozycja Boczna Ustabilizowana',
        description: 'Bezpieczna pozycja dla nieprzytomnego oddychającego',
        priority: 'Important',
        steps: [
          { id: 1, text: 'Uklęknij obok poszkodowanego' },
          { id: 2, text: 'Wyprostuj jego nogę po stronie, na którą będziesz go obracać' },
          { id: 3, text: 'Przełóż jego ramię przez klatkę piersiową' },
          { id: 4, text: 'Delikatnie obróć na bok' },
          { id: 5, text: 'Ustaw głowę tak, aby drogi oddechowe były drożne' }
        ]
      }
    ]
  },
  {
    id: 'trauma-care',
    title: 'Opieka Urazowa',
    icon: 'shield',
    procedureCount: 2,
    procedures: [
      {
        id: 'tension-pneumothorax',
        title: 'Odma Prężna',
        description: 'Nagły przypadek zagrażający życiu wymagający natychmiastowej interwencji',
        priority: 'Critical',
        steps: [
          { id: 1, text: 'Rozpoznaj objawy: duszność, ból w klatce piersiowej, asymetria' },
          { id: 2, text: 'Zastosuj igłę do dekompresji w drugiej przestrzeni międzyżebrowej' },
          { id: 3, text: 'Wprowadź igłę w linii środkowo-obojczykowej' },
          { id: 4, text: 'Słuchaj syczenia powietrza uciekającego z klatki piersiowej' },
          { id: 5, text: 'Zabezpiecz igłę i monitoruj stan poszkodowanego' }
        ]
      },
      {
        id: 'chest-seals',
        title: 'Opatrunki Klatki Piersiowej',
        description: 'Zabezpieczanie ran penetrujących klatki piersiowej',
        priority: 'Critical',
        steps: [
          { id: 1, text: 'Oceń ranę i sprawdź czy jest przelotowa' },
          { id: 2, text: 'Oczyść okolicę rany z ciał obcych' },
          { id: 3, text: 'Zastosuj opatrunek trójstronny (3 strony zamknięte)' },
          { id: 4, text: 'Zabezpiecz opatrunek taśmą medyczną' },
          { id: 5, text: 'Monitoruj czy opatrunek nie odkleja się' }
        ]
      }
    ]
  },
  {
    id: 'shock-management',
    title: 'Zarządzanie Wstrząsem',
    icon: 'warning',
    procedureCount: 1,
    procedures: [
      {
        id: 'recognizing-shock',
        title: 'Rozpoznawanie Wstrząsu',
        description: 'Identyfikacja wstrząsu i podstawowe postępowanie przeciwwstrząsowe',
        priority: 'Critical',
        steps: [
          { id: 1, text: 'Sprawdź tętno - szybkie i słabe może wskazywać na wstrząs' },
          { id: 2, text: 'Oceń skórę - blada, zimna, spocona' },
          { id: 3, text: 'Sprawdź stan świadomości - splątanie, niepokój' },
          { id: 4, text: 'Zastosuj pozycję przeciwwstrząsową (nogi uniesione)' },
          { id: 5, text: 'Okryj poszkodowanego i monitoruj funkcje życiowe' }
        ]
      }
    ]
  },
  {
    id: 'combat-medications',
    title: 'Leki Bojowe',
    icon: 'pill',
    procedureCount: 2,
    procedures: [
      {
        id: 'pain-management',
        title: 'Zarządzanie Bólem',
        description: 'Podstawowe leki przeciwbólowe w warunkach bojowych',
        priority: 'Important',
        steps: [
          { id: 1, text: 'Oceń poziom bólu poszkodowanego (skala 1-10)' },
          { id: 2, text: 'Sprawdź czy poszkodowany jest przytomny' },
          { id: 3, text: 'Podaj morfinę 5-10mg domięśniowo jeśli dostępna' },
          { id: 4, text: 'Alternatywnie: paracetamol 1000mg doustnie' },
          { id: 5, text: 'Monitoruj oddech i stan świadomości' }
        ]
      },
      {
        id: 'txa-tranexamic-acid',
        title: 'TXA (Kwas Traneksamowy)',
        description: 'Lek przeciwkrwotoczny stosowany w ciężkich krwotokach',
        priority: 'Critical',
        steps: [
          { id: 1, text: 'Rozpoznaj ciężki krwotok zagrażający życiu' },
          { id: 2, text: 'Podaj TXA 1g dożylnie w ciągu 10 minut' },
          { id: 3, text: 'Następnie 1g w infuzji przez 8 godzin' },
          { id: 4, text: 'Nie podawaj po 3 godzinach od urazu' },
          { id: 5, text: 'Monitoruj czy krwawienie się zmniejsza' }
        ]
      }
    ]
  }
]
