import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-transparent py-6 -mx-4 -mt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-white">
          {title}
        </h1>
        <p className="text-base text-gray-300 mt-1">
          {subtitle}
        </p>
      </div>
    </header>
  )
}
