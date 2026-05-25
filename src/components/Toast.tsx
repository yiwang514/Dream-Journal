import { useEffect } from 'react'

export default function Toast({ message, onUndo, onDismiss, duration = 5000 }: { message: string; onUndo?: () => void; onDismiss: () => void; duration?: number }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="glass px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20 dark:border-dusk-600/20">
        <span className="text-sm text-gray-700 dark:text-gray-200">{message}</span>
        {onUndo && (
          <button
            onClick={onUndo}
            className="text-orange dark:text-dusk-300 font-semibold text-sm hover:text-orange/80 dark:hover:text-dusk-200 transition-colors"
          >
            撤销
          </button>
        )}
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors ml-1"
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
