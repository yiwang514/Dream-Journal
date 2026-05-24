import { useState, useRef, useEffect } from 'react'

export default function DreamCard({ dream, index, onDeposit, onDelete, onEdit }) {
  const [depositAmount, setDepositAmount] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(dream.name)
  const [editTarget, setEditTarget] = useState(String(dream.target))
  const nameRef = useRef(null)

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

  return (
    <div
      className={`${dream.bgColor} ${dream.borderColor} border rounded-2xl p-5 animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group relative`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <button
        onClick={() => setShowDeleteConfirm(prev => !prev)}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 text-gray-400 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
        title="删除梦想"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {showDeleteConfirm && (
        <div className="absolute top-10 right-3 z-10 bg-white rounded-xl shadow-xl border border-gray-100 p-3 animate-bounce-in">
          <p className="text-xs text-gray-600 mb-2">确定删除这个梦想吗？</p>
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(dream.id)}
              className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              删除
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
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
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none focus:border-orange/50 mb-2"
            placeholder="梦想名称"
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">¥</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={editTarget}
              onChange={(e) => setEditTarget(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none focus:border-orange/50"
              placeholder="目标金额"
            />
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 text-xs font-semibold bg-orange text-white rounded-lg hover:opacity-90 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-3 pr-8">
          <h3
            className="font-bold text-gray-800 text-lg cursor-pointer hover:text-gray-600"
            onClick={() => setIsEditing(true)}
            title="点击编辑"
          >
            {dream.name}
          </h3>
          {isComplete && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-bounce-in">
              已达成 🎉
            </span>
          )}
        </div>
      )}

      <div className="flex justify-between items-baseline mb-3">
        <div>
          <span className="text-2xl font-extrabold text-gray-800">
            ¥{dream.saved.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm ml-1">
            / ¥{dream.target.toLocaleString()}
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          {progress}%
        </span>
      </div>

      <div className="w-full h-5 bg-white/60 rounded-full overflow-hidden mb-4 shadow-inner">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${dream.barColor} transition-all duration-700 ease-out relative overflow-hidden`}
          style={{ width: progressWidth }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">¥</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="输入存入金额"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none transition-all focus:border-orange/50 focus:ring-2 focus:ring-orange/10 placeholder-gray-400"
          />
        </div>
        <button
          onClick={handleDeposit}
          disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isComplete}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 active:scale-95
            ${!depositAmount || parseFloat(depositAmount) <= 0 || isComplete
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 to-orange text-white hover:shadow-lg hover:shadow-orange/20 hover:from-amber-500 hover:to-orange-500'
            }
          `}
        >
          + 存入一笔
        </button>
      </div>
    </div>
  )
}
