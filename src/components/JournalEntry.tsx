import { useState, useRef, useEffect } from 'react'
import type { Entry } from '../types'

export default function JournalEntry({ entry, index, onDelete, onEdit }: { entry: Entry; index: number; onDelete: (id: number) => void; onEdit: (id: number, text: string) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(entry.text)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    const text = editText.trim()
    if (text && text !== entry.text) {
      onEdit(entry.id, text)
    } else {
      setEditText(entry.text)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave()
    }
    if (e.key === 'Escape') {
      setEditText(entry.text)
      setIsEditing(false)
    }
  }

  return (
    <div
      className="relative animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`absolute -left-[25px] top-2 w-3 h-3 rounded-full border-2 border-white dark:border-dusk-950 shadow-sm
        ${index === 0
          ? 'bg-gradient-to-br from-orange to-rose-400 shadow-orange/30'
          : 'bg-gradient-to-br from-amber-300 to-orange/60'
        }
      `} />
      <div className="glass-subtle rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative">
        {isEditing ? (
          <div>
            <textarea
              ref={textareaRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              className="w-full bg-white/80 dark:bg-dusk-900/60 resize-none outline-none text-gray-700 dark:text-gray-200 text-sm leading-relaxed rounded-xl p-3 border border-orange/30 dark:border-dusk-400/30 focus:border-orange/50 dark:focus:border-dusk-400/50 transition-colors"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button
                onClick={() => { setEditText(entry.text); setIsEditing(false) }}
                className="px-3 py-1.5 text-xs font-semibold bg-gray-100/80 dark:bg-dusk-800/60 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-dusk-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-orange to-rose-400 text-white rounded-xl hover:shadow-md hover:shadow-orange/20 transition-all"
              >
                保存
              </button>
            </div>
          </div>
        ) : (
          <>
            <p
              className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed pr-6 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              onClick={() => setIsEditing(true)}
              title="点击编辑"
            >
              {entry.text}
            </p>
            <time className="text-xs text-gray-400 dark:text-gray-500 mt-2 block font-light">{entry.time}</time>
            <button
              onClick={() => onDelete(entry.id)}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 dark:bg-dusk-800/80 text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all duration-200"
              title="删除"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
