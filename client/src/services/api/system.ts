import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
export interface Incident {
  id: string
  type: 'flood' | 'fire' | 'earthquake' | 'other'
  severity: 'KRYTYCZNY' | 'WYSOKI' | 'ŚREDNI' | 'NISKI'
  title: string
  description: string
  nearestStation: {
    name: string
    address: string
    distance: string
  }
  createdAt: string
}

export interface MobilizationStatus {
  level: string
  description: string
  lastUpdated: string
  affectedUnits: string[]
}

export interface NearestStation {
  id: string
  name: string
  address: string
  distance: string
  coordinates: {
    lat: number
    lng: number
  }
  contact: {
    phone: string
    email: string
  }
  services: string[]
}

// API Functions
export const systemApi = {
  // Get current system incidents/alerts
  getIncidents: async (): Promise<Incident[]> => {
    try {
      const response = await api.get('/system/incidents')
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get current mobilization status
  getMobilizationStatus: async (): Promise<MobilizationStatus> => {
    try {
      const response = await api.get('/system/mobilization-status')
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get nearest military stations
  getNearestStations: async (lat?: number, lng?: number): Promise<NearestStation[]> => {
    try {
      const params: any = {}
      if (lat !== undefined && lng !== undefined) {
        params.lat = lat
        params.lng = lng
      }
      
      const response = await api.get('/system/nearest-stations', { params })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
