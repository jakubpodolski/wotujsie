import React from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'default' | 'search'
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({ 
  className, 
  label, 
  error, 
  variant = 'default',
  icon,
  ...props 
}) => {
  const baseInputClasses = "block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
  
  const variantClasses = {
    default: "border-gray-300 bg-white text-gray-900 placeholder-gray-500",
    search: "pl-10 border-gray-600 bg-gray-700 text-white placeholder-gray-400"
  }

  const inputClasses = cn(
    baseInputClasses,
    variantClasses[variant],
    error && 'border-red-500 focus-visible:ring-red-500',
    className
  )

  if (variant === 'search') {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            className={inputClasses}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
