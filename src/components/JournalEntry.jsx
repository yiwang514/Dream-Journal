import { useState, useRef, useEffect } from 'react'

export default function JournalEntry({ entry, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(entry.text)
  const textareaRef = useRef(null)

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

  const handleKeyDown = (e) => {
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
      <div className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 shadow
        ${index === 0 ? 'bg-orange shadow-orange/40' : 'bg-amber-300'}
      `} />
      <div className="bg-cream dark:bg-gray-700/50 rounded-2xl p-4 hover:shadow-md transition-shadow duration-200 group relative">
        {isEditing ? (
          <div>
            <textarea
              ref={textareaRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              className="w-full bg-white dark:bg-gray-700 resize-none outline-none text-gray-700 dark:text-gray-200 text-sm leading-relaxed rounded-xl p-3 border border-orange/30 dark:border-orange/40 focus:border-orange/50"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button
                onClick={() => { setEditText(entry.text); setIsEditing(false) }}
                className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-xs font-semibold bg-orange text-white rounded-lg hover:opacity-90 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        ) : (
          <>
            <p
              className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed pr-6 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
              onClick={() => setIsEditing(true)}
              title="点击编辑"
            >
              {entry.text}
            </p>
            <time className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">{entry.time}</time>
            <button
              onClick={() => onDelete(entry.id)}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-600/80 text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all duration-200"
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
