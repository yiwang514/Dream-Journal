import { useState } from 'react'

export default function AddDreamForm({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')

  const canSubmit = name.trim() && target && parseFloat(target) > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    onAdd(name.trim(), parseFloat(target))
    setName('')
    setTarget('')
  }

  return (
    <div className="mb-4 p-4 bg-cream dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-mint/30 dark:border-mint/20 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="梦想名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-[2] px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm outline-none transition-all focus:border-mint/50 focus:ring-2 focus:ring-mint/10 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium">¥</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="目标金额"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm outline-none transition-all focus:border-mint/50 focus:ring-2 focus:ring-mint/10 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 active:scale-95
            ${!canSubmit
              ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-mint to-emerald-500 text-white hover:shadow-lg hover:shadow-mint/20'
            }
          `}
        >
          创建梦想
        </button>
      </div>
    </div>
  )
}
