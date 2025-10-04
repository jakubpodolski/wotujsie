import React from 'react'

interface TrainingRegistrationButtonProps {
  isRegistered: boolean
  onRegister: () => void
}

export const TrainingRegistrationButton: React.FC<TrainingRegistrationButtonProps> = ({
  isRegistered,
  onRegister
}) => {
  if (isRegistered) {
    return null // Don't show button if already registered
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40">
      <div className="flex justify-center p-2">
        <button
          onClick={onRegister}
          className="px-8 py-4 rounded-lg font-bold text-white transition-colors hover:opacity-90"
          style={{ 
            backgroundColor: '#6B8E6B',
            width: '100%'
          }}
        >
          Zarejestruj się na szkolenie
        </button>
      </div>
    </div>
  )
}
