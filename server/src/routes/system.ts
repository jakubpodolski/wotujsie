import { Router } from 'express'
import { mockIncidents } from '../data/mockData'

const router = Router()

// Get current system incidents/alerts
router.get('/incidents', (req, res) => {
  try {
    // Get current incidents (last 24 hours)
    const currentIncidents = mockIncidents.filter(incident => 
      new Date(incident.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    )
    
    res.json({
      success: true,
      data: currentIncidents,
      count: currentIncidents.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system incidents'
    })
  }
})

// Get current mobilization status
router.get('/mobilization-status', (req, res) => {
  try {
    // Mock mobilization status
    const mobilizationStatus = {
      level: 'WYSOKI',
      description: 'Zwiększona gotowość bojowa',
      lastUpdated: new Date().toISOString(),
      affectedUnits: [
        '15. Brygada Obrony Terytorialnej',
        '18. Batalion WOT',
        'Jednostka Specjalna'
      ]
    }
    
    res.json({
      success: true,
      data: mobilizationStatus
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mobilization status'
    })
  }
})

// Get nearest military stations
router.get('/nearest-stations', (req, res) => {
  try {
    const { lat, lng } = req.query
    
    // Mock nearest stations data
    const nearestStations = [
      {
        id: '1',
        name: '18. Batalion WOT',
        address: 'ul. Kościuszki 45, Kraków',
        distance: '3.2 km',
        coordinates: {
          lat: 50.0647,
          lng: 19.9450
        },
        contact: {
          phone: '+48 12 123 4567',
          email: '18bwot@wot.mil.pl'
        },
        services: ['Szkolenia', 'Kwalifikacje', 'Sprzęt']
      },
      {
        id: '2',
        name: 'Centrum Szkoleniowe Beta',
        address: 'ul. Wojskowa 15, 30-001 Kraków',
        distance: '5.8 km',
        coordinates: {
          lat: 50.0755,
          lng: 19.9025
        },
        contact: {
          phone: '+48 12 234 5678',
          email: 'csbeta@wot.mil.pl'
        },
        services: ['Szkolenia Medyczne', 'Ćwiczenia Polowe', 'Certyfikacje']
      },
      {
        id: '3',
        name: 'Strzelnica B',
        address: 'ul. Strzelecka 5, 30-001 Kraków',
        distance: '7.1 km',
        coordinates: {
          lat: 50.0555,
          lng: 19.9125
        },
        contact: {
          phone: '+48 12 345 6789',
          email: 'strzelnica@wot.mil.pl'
        },
        services: ['Kwalifikacje Broni', 'Szkolenia Strzeleckie']
      }
    ]
    
    res.json({
      success: true,
      data: nearestStations,
      count: nearestStations.length,
      userLocation: lat && lng ? { lat: parseFloat(lat as string), lng: parseFloat(lng as string) } : null
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearest stations'
    })
  }
})

export { router as systemRoutes }
