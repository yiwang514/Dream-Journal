import { useState, useRef, useEffect } from 'react'
import type { Dream } from '../types'

export default function DreamCard({ dream, index, onDeposit, onDelete, onEdit }: { dream: Dream; index: number; onDeposit: (id: number, amount: number) => void; onDelete: (id: number) => void; onEdit: (id: number, updates: Partial<Dream>) => void }) {
  const [depositAmount, setDepositAmount] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(dream.name)
  const [editTarget, setEditTarget] = useState(String(dream.target))
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && nameRef.current) {
      nameRef.current.focus()
    }
  }, [isEditing])

  const progress = Math.round((dream.saved / dream.target) * 100)
  const isComplete = progress >= 100
  const progressWidth = `${Math.min(progress, 100)}%`

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (!amount || amount <= 0 || isComplete) return
    onDeposit(dream.id, amount)
    setDepositAmount('')
  }

  const handleSaveEdit = () => {
    const name = editName.trim()
    const target = parseFloat(editTarget)
    if (!name || !target || target <= 0) return
    onEdit(dream.id, { name, target })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditName(dream.name)
    setEditTarget(String(dream.target))
    setIsEditing(false)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveEdit()
    if (e.key === 'Escape') handleCancelEdit()
  }

  return (
    <div
      className="glass-subtle rounded-2xl p-4 sm:p-5 animate-fade-in-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Subtle gradient accent at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dream.barColor} opacity-60`} />

      <button
        onClick={() => setShowDeleteConfirm(prev => !prev)}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 dark:bg-dusk-800/80 text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
        title="删除梦想"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {showDeleteConfirm && (
        <div className="absolute top-10 right-3 z-20 glass rounded-xl shadow-xl p-3 animate-bounce-in">
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">确定删除这个梦想吗？</p>
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(dream.id)}
              className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              删除
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-dusk-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dusk-600 transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="mb-3 pr-8">
          <input
            ref={nameRef}
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dusk-600 bg-white/80 dark:bg-dusk-800/60 text-gray-700 dark:text-gray-200 text-sm outline-none focus:border-orange/50 dark:focus:border-dusk-400/50 mb-2 transition-colors"
            placeholder="梦想名称"
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-400 dark:text-gray-500 text-sm">¥</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={editTarget}
              onChange={(e) => setEditTarget(e.target.value)}
              onKeyDown={handleEditKeyDown}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-dusk-600 bg-white/80 dark:bg-dusk-800/60 text-gray-700 dark:text-gray-200 text-sm outline-none focus:border-orange/50 dark:focus:border-dusk-400/50 transition-colors"
              placeholder="目标金额"
            />
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1.5 text-xs font-semibold bg-gray-100/80 dark:bg-dusk-700/80 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-dusk-600 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-orange to-rose-400 text-white rounded-xl hover:shadow-md hover:shadow-orange/20 transition-all"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-3 pr-8">
          <h3
            className="font-bold text-gray-800 dark:text-gray-100 text-base sm:text-lg cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsEditing(true)}
            title="点击编辑"
          >
            {dream.name}
          </h3>
          {isComplete && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full animate-bounce-in backdrop-blur-sm">
              已达成
            </span>
          )}
        </div>
      )}

      <div className="flex justify-between items-baseline mb-3">
        <div>
          <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-100" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            ¥{dream.saved.toLocaleString()}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-sm ml-1">
            / ¥{dream.target.toLocaleString()}
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
          {progress}%
        </span>
      </div>

      <div className="w-full h-5 bg-white/50 dark:bg-dusk-800/50 rounded-full overflow-hidden mb-4 shadow-inner">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${dream.barColor} transition-all duration-700 ease-out relative overflow-hidden`}
          style={{ width: progressWidth }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium">¥</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="输入存入金额"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dusk-600 bg-white/80 dark:bg-dusk-800/60 text-gray-700 dark:text-gray-200 text-sm outline-none transition-all focus:border-orange/50 focus:ring-2 focus:ring-orange/10 dark:focus:border-dusk-400/50 dark:focus:ring-dusk-400/10 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <button
          onClick={handleDeposit}
          disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isComplete}
          className={`px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 active:scale-95
            ${!depositAmount || parseFloat(depositAmount) <= 0 || isComplete
              ? 'bg-gray-200/80 dark:bg-dusk-700/80 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 to-orange text-white hover:shadow-lg hover:shadow-orange/25 hover:from-amber-500 hover:to-orange-500 hover:-translate-y-0.5'
            }
          `}
        >
          + 存入一笔
        </button>
      </div>
    </div>
  )
}
