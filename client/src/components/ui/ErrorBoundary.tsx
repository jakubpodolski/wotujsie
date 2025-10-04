import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 text-red-500 mb-4">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Coś poszło nie tak</h1>
        <p className="text-gray-400 mb-4">
          Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
        </p>
        {error && (
          <details className="text-left bg-gray-800 p-4 rounded-lg mb-4">
            <summary className="cursor-pointer text-sm text-gray-300">
              Szczegóły błędu
            </summary>
            <pre className="mt-2 text-xs text-red-400 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Odśwież stronę
        </button>
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  error: Error | string
  onRetry?: () => void
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  onRetry, 
  className = '' 
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message

  return (
    <div className={`bg-red-900 border border-red-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-200">
            Wystąpił błąd
          </h3>
          <p className="mt-1 text-sm text-red-300">
            {errorMessage}
          </p>
        </div>
        {onRetry && (
          <div className="ml-3">
            <button
              onClick={onRetry}
              className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
            >
              Spróbuj ponownie
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface RetryButtonProps {
  onRetry: () => void
  isLoading?: boolean
  className?: string
}

export const RetryButton: React.FC<RetryButtonProps> = ({ 
  onRetry, 
  isLoading = false, 
  className = '' 
}) => {
  return (
    <button
      onClick={onRetry}
      disabled={isLoading}
      className={`bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 ${className}`}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Ładowanie...</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Spróbuj ponownie</span>
        </>
      )}
    </button>
  )
}
