import { useState, useCallback } from 'react'
import { fireConfetti } from '../utils/confetti'
import JournalEntry from './JournalEntry'
import type { Entry } from '../types'

export default function SuccessJournal({ entries, onAdd, onDelete, onEdit }: { entries: Entry[]; onAdd: (text: string) => void; onDelete: (id: number) => void; onEdit: (id: number, text: string) => void }) {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddEntry()
    }
  }

  return (
    <section className="glass rounded-3xl shadow-xl shadow-orange/5 dark:shadow-dusk-900/20 p-6 sm:p-8 flex flex-col transition-all duration-300">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange to-rose-400 flex items-center justify-center shadow-md shadow-orange/25">
          <span className="text-sm">📝</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          今天的成功日记
        </h2>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-6 ml-11">
        每一天都是独特的一天，记录让你发光的小事
      </p>

      <div className="bg-gradient-to-br from-orange/5 to-peach/10 dark:from-dusk-800/30 dark:to-dusk-900/20 rounded-2xl p-5 mb-6 border border-dashed border-orange/20 dark:border-dusk-500/20 transition-all duration-300 hover:border-orange/40 dark:hover:border-dusk-400/30">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="写下今天做成功的 3 件小事，哪怕再小也值得骄傲！"
          rows={4}
          className="w-full bg-transparent resize-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-base leading-relaxed"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Ctrl + Enter 快速记录
          </span>
          <button
            onClick={handleAddEntry}
            disabled={!newEntry.trim() || isSubmitting}
            className={`px-6 py-3 rounded-2xl font-semibold text-white text-sm shadow-lg transition-all duration-300 active:scale-95
              ${!newEntry.trim()
                ? 'bg-gray-300 dark:bg-dusk-700 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-amber-400 to-orange hover:from-amber-500 hover:to-orange-500 hover:shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5'
              }
            `}
          >
            记录我的闪光点
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '500px' }}>
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-gray-300 dark:bg-dusk-600" />
          历史记录
          <span className="w-8 h-px bg-gray-300 dark:bg-dusk-600" />
        </h3>
        <div className="relative pl-6 border-l-2 border-orange/15 dark:border-dusk-500/25 space-y-5">
          {entries.map((entry, idx) => (
            <JournalEntry
              key={entry.id}
              entry={entry}
              index={idx}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          {entries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-5xl mb-4 opacity-60">📝</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                还没有记录
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">
                写下你的第一件成功小事，开始记录闪光时刻吧
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
