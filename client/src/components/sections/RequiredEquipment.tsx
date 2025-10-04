import React from 'react'
import { FileText } from 'lucide-react'

interface RequiredEquipmentProps {
  equipment: string[]
}

export const RequiredEquipment: React.FC<RequiredEquipmentProps> = ({ equipment }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 text-white mr-3" />
        <h3 className="text-xl font-semibold text-white">Wymagany sprzęt</h3>
      </div>
      
      {/* Equipment List */}
      <ul className="space-y-3">
        {equipment.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
            <span className="text-white">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
