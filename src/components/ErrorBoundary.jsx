import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
            <p className="text-4xl mb-4">😵</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">页面出了点问题</h2>
            <p className="text-gray-500 text-sm mb-6">
              别担心，刷新页面通常可以解决
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-2xl font-semibold text-white text-sm bg-gradient-to-r from-amber-400 to-orange hover:shadow-lg transition-all"
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
