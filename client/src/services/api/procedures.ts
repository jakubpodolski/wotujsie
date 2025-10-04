import { api, handleApiResponse, handleApiError } from '../../lib/api'

// Types
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

export interface ProcedureWithCategory extends Procedure {
  category: {
    id: string
    title: string
    icon: string
  }
}

// API Functions
export const proceduresApi = {
  // Get all procedure categories
  getAll: async (): Promise<ProcedureCategory[]> => {
    try {
      const response = await api.get('/procedures')
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Search procedures by query
  search: async (query: string): Promise<ProcedureCategory[]> => {
    try {
      const response = await api.get('/procedures/search', {
        params: { q: query }
      })
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get procedures by category
  getByCategory: async (categoryId: string): Promise<ProcedureCategory> => {
    try {
      const response = await api.get(`/procedures/category/${categoryId}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // Get specific procedure details
  getById: async (id: string): Promise<ProcedureWithCategory> => {
    try {
      const response = await api.get(`/procedures/${id}`)
      return handleApiResponse(response)
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
