import React from 'react'
import { CheckCircle } from 'lucide-react'

interface RegistrationStatusProps {
  onCancel: () => void
}

export const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ onCancel }) => {
  return (
    <div 
      className="flex items-center p-4 rounded-lg"
      style={{ 
        backgroundColor: '#1A1C1E',
        border: '1px solid #2D3032'
      }}
    >
        {/* Icon */}
        <div 
          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4"
          style={{ backgroundColor: '#2D3032' }}
        >
          <CheckCircle 
            className="w-6 h-6" 
            style={{ color: '#84A384' }}
          />
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-white font-medium text-base mb-1">
            Jesteś zarejestrowany
          </h3>
          <p className="text-sm" style={{ color: '#A0A3A6' }}>
            Potwierdzenie zostało wysłane na Twój email
          </p>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="flex-shrink-0 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-80"
          style={{ backgroundColor: '#2D3032' }}
        >
          Anuluj
        </button>
    </div>
  )
}
