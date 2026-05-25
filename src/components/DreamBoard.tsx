import { useState } from 'react'
import AddDreamForm from './AddDreamForm'
import DreamCard from './DreamCard'
import type { Dream } from '../types'

export default function DreamBoard({ dreams, onAdd, onDelete, onDeposit, onEdit }: { dreams: Dream[]; onAdd: (name: string, target: number) => void; onDelete: (id: number) => void; onDeposit: (id: number, amount: number) => void; onEdit: (id: number, updates: Partial<Dream>) => void }) {
  const [showAddDream, setShowAddDream] = useState(false)

  const handleAddDream = (name: string, target: number) => {
    onAdd(name, target)
    setShowAddDream(false)
  }

  return (
    <section className="glass rounded-3xl shadow-xl shadow-dusk-300/5 dark:shadow-dusk-900/20 p-6 sm:p-8 flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-mint to-emerald-400 flex items-center justify-center shadow-md shadow-mint/25">
            <span className="text-sm">🌟</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            我的梦想进度条
          </h2>
        </div>
        <button
          onClick={() => setShowAddDream(v => !v)}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 active:scale-90
            ${showAddDream
              ? 'bg-gray-200/80 dark:bg-dusk-700/80 text-gray-500 dark:text-gray-400 rotate-45'
              : 'bg-gradient-to-r from-amber-400 to-orange text-white shadow-md hover:shadow-lg hover:shadow-orange/25 hover:-translate-y-0.5'
            }
          `}
        >
          +
        </button>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-5 ml-11">
        每一个梦想都值得被认真对待
      </p>

      {showAddDream && (
        <AddDreamForm onAdd={handleAddDream} onClose={() => setShowAddDream(false)} />
      )}

      <div className="flex-1 space-y-5 overflow-y-auto" style={{ maxHeight: '520px' }}>
        {dreams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4 opacity-60">🌟</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
              还没有梦想
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              点击右上角 + 创建你的第一个梦想吧
            </p>
          </div>
        )}
        {dreams.map((dream, idx) => (
          <DreamCard
            key={dream.id}
            dream={dream}
            index={idx}
            onDeposit={onDeposit}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50/80 to-mint/10 dark:from-dusk-800/30 dark:to-dusk-900/20 rounded-2xl text-center border border-amber-200/20 dark:border-dusk-600/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
          每一步都在靠近梦想，今天的努力会成为明天的礼物
        </p>
      </div>
    </section>
  )
}
