import React from 'react'

interface SegmentedControlProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={`inline-flex bg-gray-700 rounded-lg p-1 ${className} w-full `}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1
            ${
              value === option.value
                ? 'bg-gray-800 text-white shadow-sm border border-gray-600'
                : 'text-white hover:text-gray-200'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
