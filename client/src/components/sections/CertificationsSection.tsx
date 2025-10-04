import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Accordion } from '../ui/Accordion'
import { Button } from '../ui/Button'
import { Award, Check } from 'lucide-react'

interface Certification {
  id: string
  title: string
  expiresAt: string
  status: 'expiring' | 'in-progress' | 'current' | 'recently-renewed'
  progress?: number
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications
}) => {
  const navigate = useNavigate()
  const expiringCount = certifications.filter(c => c.status === 'expiring').length
  const totalCount = certifications.length
  const recentlyRenewed = certifications.filter(c => c.status === 'recently-renewed')
  const activeCertifications = certifications.filter(c => c.status !== 'recently-renewed')

  const handleViewAll = () => {
    navigate('/certificates')
  }

  const getCertificationStyle = () => {
    return 'rounded-lg p-4 border border-gray-600'
  }

  const getButtonStyle = (status: string) => {
    switch (status) {
      case 'expiring':
        return 'text-white text-xs font-medium px-3 py-1 rounded'
      case 'in-progress':
        return 'text-white text-xs font-medium px-3 py-1 rounded'
      case 'current':
        return 'text-white text-xs font-medium px-3 py-1 rounded'
      case 'recently-renewed':
        return 'text-white text-xs font-medium px-3 py-1 rounded'
      default:
        return 'text-white text-xs font-medium px-3 py-1 rounded'
    }
  }

  const getButtonBackgroundStyle = (status: string) => {
    switch (status) {
      case 'expiring':
        return { backgroundColor: '#0F1419' }
      case 'in-progress':
        return { backgroundColor: '#5A6F4F' }
      case 'current':
        return { backgroundColor: '#3E4A59' }
      case 'recently-renewed':
        return { backgroundColor: '#3E4A59' }
      default:
        return { backgroundColor: '#4A4A4A' }
    }
  }

  const getButtonText = (status: string) => {
    switch (status) {
      case 'expiring':
        return 'Odnów'
      case 'in-progress':
        return 'Kontynuuj'
      case 'current':
        return '✓ Aktualny'
      case 'recently-renewed':
        return '✓ Aktualny'
      default:
        return 'Akcja'
    }
  }

  return (
    <Accordion
      title="Certyfikaty"
      description="Utrzymuj wymagane certyfikaty i odnawiaj przed wygaśnięciem."
      icon={<Award className="text-red-500" size={20} strokeWidth={2} />}
      badge={expiringCount > 0 ? { text: `${expiringCount} Wygasające`, style: { backgroundColor: '#DC2626' } } : undefined}
      cardStyle={{ backgroundColor: '#282c34' }}
    >
      {/* Active Certifications */}
      <div className="space-y-4 mb-6">
        {activeCertifications.map((certification) => (
          <div key={certification.id} className={getCertificationStyle()} style={{ backgroundColor: '#343a40' }}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-white mb-1">
                  {certification.title}
                </h3>
                <p className="text-sm text-gray-300">
                  Wygasa: {certification.expiresAt}
                  {certification.status === 'in-progress' && certification.progress !== undefined && 
                    ` • ${certification.progress}% ukończone`
                  }
                </p>
              </div>
              <button className={getButtonStyle(certification.status)} style={getButtonBackgroundStyle(certification.status)}>
                {getButtonText(certification.status)}
              </button>
            </div>
            
            {/* Progress Bar for in-progress items */}
            {certification.status === 'in-progress' && certification.progress !== undefined && (
              <div className="w-full rounded-full h-2 mt-3" style={{ backgroundColor: '#4A4A4A' }}>
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${certification.progress}%` }}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recently Renewed Section */}
      {recentlyRenewed.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm text-gray-300 mb-3">Ostatnio Odnowione</h4>
          <div className="space-y-4">
            {recentlyRenewed.map((certification) => (
              <div key={certification.id} className={getCertificationStyle()} style={{ backgroundColor: '#343a40' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">
                      {certification.title}
                    </h3>
                  </div>
                  <button className={getButtonStyle(certification.status)} style={getButtonBackgroundStyle(certification.status)}>
                    <Check className="inline w-4 h-4 mr-1" />
                    Aktualny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Button */}
      <Button 
        onClick={handleViewAll}
        className="w-full text-white font-medium py-3 px-4 rounded-lg transition-colors border border-gray-600"
        style={{ backgroundColor: '#0F1419' }}
      >
        Zobacz wszystkie certyfikaty ({totalCount})
      </Button>
    </Accordion>
  )
}
