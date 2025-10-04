import { Router } from 'express'
import { mockProcedureData } from '../data/mockProcedureData'

const router = Router()

// Get all procedure categories
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockProcedureData,
      count: mockProcedureData.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch procedure categories'
    })
  }
})

// Search procedures by query
router.get('/search', (req, res) => {
  try {
    const { q } = req.query
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      })
    }
    
    const searchQuery = q.toLowerCase()
    
    // Filter categories that have matching procedures
    const filteredCategories = mockProcedureData.filter(category => {
      const hasMatchingProcedures = category.procedures.some(procedure =>
        procedure.title.toLowerCase().includes(searchQuery) ||
        procedure.description.toLowerCase().includes(searchQuery) ||
        procedure.steps.some(step => 
          step.text.toLowerCase().includes(searchQuery)
        )
      )
      return hasMatchingProcedures
    })
    
    res.json({
      success: true,
      data: filteredCategories,
      count: filteredCategories.length,
      query: q
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search procedures'
    })
  }
})

// Get procedures by category
router.get('/category/:categoryId', (req, res) => {
  try {
    const { categoryId } = req.params
    const category = mockProcedureData.find(cat => cat.id === categoryId)
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      })
    }
    
    res.json({
      success: true,
      data: category,
      procedures: category.procedures,
      count: category.procedures.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category procedures'
    })
  }
})

// Get specific procedure details
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    
    // Find procedure across all categories
    let foundProcedure = null
    let foundCategory = null
    
    for (const category of mockProcedureData) {
      const procedure = category.procedures.find(proc => proc.id === id)
      if (procedure) {
        foundProcedure = procedure
        foundCategory = category
        break
      }
    }
    
    if (!foundProcedure) {
      return res.status(404).json({
        success: false,
        error: 'Procedure not found'
      })
    }
    
    res.json({
      success: true,
      data: {
        ...foundProcedure,
        category: {
          id: foundCategory!.id,
          title: foundCategory!.title,
          icon: foundCategory!.icon
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch procedure details'
    })
  }
})

export { router as procedureRoutes }
