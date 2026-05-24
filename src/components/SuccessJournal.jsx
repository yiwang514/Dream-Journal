import { useState, useCallback } from 'react'
import { fireConfetti } from '../utils/confetti'
import JournalEntry from './JournalEntry'

export default function SuccessJournal({ entries, onAdd, onDelete }) {
  const [newEntry, setNewEntry] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddEntry = useCallback(() => {
    const text = newEntry.trim()
    if (!text || isSubmitting) return

    setIsSubmitting(true)
    fireConfetti()
    onAdd(text)
    setNewEntry('')
    setTimeout(() => setIsSubmitting(false), 100)
  }, [newEntry, isSubmitting, onAdd])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddEntry()
    }
  }

  return (
    <section className="bg-white rounded-[2rem] shadow-lg shadow-orange/10 p-8 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        今天的成功日记
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        每一天都是独特的一天，记录让你发光的小事
      </p>

      <div className="bg-cream rounded-2xl p-5 mb-6 border-2 border-dashed border-orange/20 transition-all hover:border-orange/40">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="写下今天做成功的 3 件小事，哪怕再小也值得骄傲！"
          rows={4}
          className="w-full bg-transparent resize-none outline-none text-gray-700 placeholder-gray-400 text-base leading-relaxed"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">
            Ctrl + Enter 快速记录
          </span>
          <button
            onClick={handleAddEntry}
            disabled={!newEntry.trim() || isSubmitting}
            className={`px-6 py-3 rounded-2xl font-semibold text-white text-sm shadow-lg transition-all duration-200 active:scale-95
              ${!newEntry.trim()
                ? 'bg-gray-300 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-amber-400 to-orange hover:from-amber-500 hover:to-orange-500 hover:shadow-xl hover:shadow-orange/30 active:scale-95'
              }
            `}
          >
            记录我的闪光点 ✨
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '500px' }}>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          历史记录
        </h3>
        <div className="relative pl-6 border-l-2 border-orange/20 space-y-6">
          {entries.map((entry, idx) => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              index={idx}
              onDelete={onDelete}
            />
          ))}
          {entries.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-8">
              还没有记录，写下你的第一件成功小事吧 🌱
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
