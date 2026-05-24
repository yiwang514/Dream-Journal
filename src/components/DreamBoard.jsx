import { useState } from 'react'
import AddDreamForm from './AddDreamForm'
import DreamCard from './DreamCard'

export default function DreamBoard({ dreams, onAdd, onDelete, onDeposit, onEdit }) {
  const [showAddDream, setShowAddDream] = useState(false)

  const handleAddDream = (name, target) => {
    onAdd(name, target)
    setShowAddDream(false)
  }

  return (
    <section className="bg-white rounded-[2rem] shadow-lg shadow-mint/10 p-8 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold text-gray-800">
          我的梦想进度条
        </h2>
        <button
          onClick={() => setShowAddDream(v => !v)}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-200 active:scale-90
            ${showAddDream
              ? 'bg-gray-200 text-gray-500 rotate-45'
              : 'bg-gradient-to-r from-amber-400 to-orange text-white shadow-md hover:shadow-lg hover:shadow-orange/20'
            }
          `}
        >
          +
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        每一个梦想都值得被认真对待
      </p>

      {showAddDream && (
        <AddDreamForm onAdd={handleAddDream} onClose={() => setShowAddDream(false)} />
      )}

      <div className="flex-1 space-y-5 overflow-y-auto" style={{ maxHeight: '520px' }}>
        {dreams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🐷</p>
            <p className="text-gray-400 text-sm">还没有梦想，点击 + 创建一个吧</p>
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

      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-mint/20 rounded-2xl text-center">
        <p className="text-sm text-gray-600">
          每一步都在靠近梦想，今天的努力会成为明天的礼物 💪
        </p>
      </div>
    </section>
  )
}
