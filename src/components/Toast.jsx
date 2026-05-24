import { useEffect } from 'react'

export default function Toast({ message, onUndo, onDismiss, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-gray-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-4">
        <span className="text-sm">{message}</span>
        {onUndo && (
          <button
            onClick={onUndo}
            className="text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors"
          >
            撤销
          </button>
        )}
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-white transition-colors ml-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
