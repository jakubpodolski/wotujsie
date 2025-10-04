import { Router } from 'express'
import { mockUsers } from '../data/mockData'

const router = Router()

// Get all users
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockUsers,
    count: mockUsers.length
  })
})

// Get user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const user = mockUsers.find(u => u.id === userId)
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    })
  }
  
  res.json({
    success: true,
    data: user
  })
})

// Update user profile
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const userIndex = mockUsers.findIndex(u => u.id === userId)
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    })
  }
  
  const updatedUser = {
    ...mockUsers[userIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  }
  
  mockUsers[userIndex] = updatedUser
  
  res.json({
    success: true,
    data: updatedUser,
    message: 'User updated successfully'
  })
})

// Create new user
router.post('/', (req, res) => {
  const newUser = {
    id: Math.max(...mockUsers.map(u => u.id)) + 1,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  mockUsers.push(newUser)
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully'
  })
})

// Delete user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const userIndex = mockUsers.findIndex(u => u.id === userId)
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    })
  }
  
  mockUsers.splice(userIndex, 1)
  
  res.json({
    success: true,
    message: 'User deleted successfully'
  })
})

export { router as userRoutes }
