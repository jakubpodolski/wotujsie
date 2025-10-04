export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer with 5+ years of experience building modern web applications.',
    joinDate: 'January 2023',
    lastActive: '2 hours ago',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'UI/UX Designer passionate about creating beautiful and functional user experiences.',
    joinDate: 'February 2023',
    lastActive: '1 hour ago',
    createdAt: '2023-02-10T09:15:00Z',
    updatedAt: '2024-01-15T13:45:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'DevOps engineer focused on cloud infrastructure and automation.',
    joinDate: 'March 2023',
    lastActive: '30 minutes ago',
    createdAt: '2023-03-05T16:20:00Z',
    updatedAt: '2024-01-15T15:00:00Z'
  }
]

export const mockDashboardData = {
  metrics: {
    totalRevenue: 45678,
    totalUsers: 2840,
    conversionRate: 12.5,
    activeUsers: 1234,
    revenueChange: 8.2,
    usersChange: -2.1,
    conversionChange: 0.3,
    activeUsersChange: 5.7
  },
  revenue: [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 15000 },
    { month: 'Mar', value: 18000 },
    { month: 'Apr', value: 22000 },
    { month: 'May', value: 25000 },
    { month: 'Jun', value: 28000 },
    { month: 'Jul', value: 32000 },
    { month: 'Aug', value: 35000 },
    { month: 'Sep', value: 38000 },
    { month: 'Oct', value: 41000 },
    { month: 'Nov', value: 44000 },
    { month: 'Dec', value: 45678 }
  ],
  activity: [
    { day: 'Mon', users: 1200 },
    { day: 'Tue', users: 1350 },
    { day: 'Wed', users: 1100 },
    { day: 'Thu', users: 1400 },
    { day: 'Fri', users: 1600 },
    { day: 'Sat', users: 800 },
    { day: 'Sun', users: 600 }
  ],
  recentActivity: [
    { 
      id: 1,
      action: 'New user registered', 
      time: '2 minutes ago', 
      type: 'user',
      user: 'Alice Johnson'
    },
    { 
      id: 2,
      action: 'Payment processed', 
      time: '5 minutes ago', 
      type: 'payment',
      amount: '$299.00'
    },
    { 
      id: 3,
      action: 'System backup completed', 
      time: '1 hour ago', 
      type: 'system',
      status: 'success'
    },
    { 
      id: 4,
      action: 'User profile updated', 
      time: '2 hours ago', 
      type: 'user',
      user: 'Bob Smith'
    },
    { 
      id: 5,
      action: 'New order placed', 
      time: '3 hours ago', 
      type: 'order',
      orderId: '#12345'
    }
  ]
}

export const mockSettings = {
  notifications: {
    email: true,
    push: false,
    sms: true,
    marketing: false
  },
  privacy: {
    profileVisibility: 'public',
    dataSharing: false,
    analytics: true
  },
  appearance: {
    theme: 'light',
    language: 'en',
    fontSize: 'medium'
  },
  security: {
    twoFactor: false,
    sessionTimeout: 30,
    loginAlerts: true
  },
  updatedAt: '2024-01-15T10:30:00Z'
}
