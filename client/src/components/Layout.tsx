import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Calendar, 
  Dumbbell, 
  BookOpen,
  User,
  // Shield
} from 'lucide-react'
// import { FormModal } from './FormModal'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Główna', href: '/', icon: Home },
  { name: 'Kalendarz', href: '/calendar', icon: Calendar },
  { name: 'Trening', href: '/training', icon: Dumbbell },
  { name: 'Wiedza', href: '/learn', icon: BookOpen },
  { name: 'Konto', href: '/account', icon: User },
]

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  // const [isModalOpen, setIsModalOpen] = useState(false)

  // const handleFabClick = () => {
  //   setIsModalOpen(true)
  // }

  // const handleCloseModal = () => {
  //   setIsModalOpen(false)
  // }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Main content */}
      <main className="flex-1 pb-20">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <item.icon size={20} className="mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Floating Action Button
      <button 
        onClick={handleFabClick}
        className="fixed bottom-20 right-4 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors"
      >
        <Shield size={24} />
      </button>

      {/* Form Modal *
      <FormModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </div>
  )
}
