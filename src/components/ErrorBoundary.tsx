import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="glass rounded-3xl shadow-2xl p-8 max-w-md text-center">
            <p className="text-4xl mb-4 opacity-70">😵</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">页面出了点问题</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-light">
              别担心，刷新页面通常可以解决
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-2xl font-semibold text-white text-sm bg-gradient-to-r from-amber-400 to-orange hover:shadow-lg hover:shadow-orange/25 transition-all duration-300 active:scale-95 hover:-translate-y-0.5"
            >
              刷新页面
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
