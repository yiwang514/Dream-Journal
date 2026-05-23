import { useState, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'

const ENTRIES_KEY = 'dream-journal-entries'
const DREAMS_KEY = 'dream-journal-dreams'

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch { /* quota exceeded, ignore */ }
}

const PRESET_DREAMS = [
  {
    id: 1,
    name: '买一把吉他 🎸',
    target: 3000,
    saved: 1200,
    barColor: 'from-amber-400 to-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    id: 2,
    name: '去大理旅行 ✈️',
    target: 5000,
    saved: 3500,
    barColor: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 3,
    name: '换一台新电脑 💻',
    target: 8000,
    saved: 6400,
    barColor: 'from-violet-400 to-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
]

const COLOR_PALETTE = [
  { barColor: 'from-rose-400 to-pink-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' },
  { barColor: 'from-sky-400 to-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { barColor: 'from-cyan-400 to-teal-500', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
  { barColor: 'from-amber-400 to-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { barColor: 'from-emerald-400 to-teal-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  { barColor: 'from-violet-400 to-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { barColor: 'from-indigo-400 to-blue-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  { barColor: 'from-fuchsia-400 to-purple-500', bgColor: 'bg-fuchsia-50', borderColor: 'border-fuchsia-200' },
]

const PRESET_ENTRIES = [
  { id: 1, text: '今天坚持晨跑 30 分钟，流汗的感觉真好！🏃', time: '2026-05-18 07:30' },
  { id: 2, text: '完成了一直拖延的工作汇报 PPT，迈出了第一步！📝', time: '2026-05-17 21:15' },
  { id: 3, text: '给妈妈打了一通电话，她笑得很开心。📞', time: '2026-05-17 18:00' },
  { id: 4, text: '今天学会了做一道新菜——番茄牛腩，超好吃！🍲', time: '2026-05-16 19:20' },
  { id: 5, text: '主动帮助同事解决了一个技术问题，被感谢了。🤝', time: '2026-05-15 14:00' },
]

function fireConfetti() {
  const duration = 2500
  const end = Date.now() + duration
  const colors = ['#FFD93D', '#FF8C42', '#6BCB77', '#FFB3A7', '#A78BFA', '#F472B6']

  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
      gravity: 0.8,
      scalar: 1.2,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
      gravity: 0.8,
      scalar: 1.2,
    })
    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }())

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 0.5, y: 0.4 },
      colors,
      gravity: 0.5,
      scalar: 1.5,
      ticks: 150,
      startVelocity: 30,
    })
  }, 300)
}

export default function App() {
  const [entries, setEntries] = useState(() => {
    return loadFromStorage(ENTRIES_KEY, PRESET_ENTRIES)
  })
  const [newEntry, setNewEntry] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dreams, setDreams] = useState(() => {
    return loadFromStorage(DREAMS_KEY, PRESET_DREAMS)
  })
  const [depositAmounts, setDepositAmounts] = useState({})
  const [showAddDream, setShowAddDream] = useState(false)
  const [newDream, setNewDream] = useState({ name: '', target: '' })
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const colorIdxRef = useRef(0)

  const handleAddEntry = useCallback(() => {
    const text = newEntry.trim()
    if (!text || isSubmitting) return

    setIsSubmitting(true)
    const entry = {
      id: Date.now(),
      text,
      time: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    fireConfetti()
    const updated = [entry, ...entries]
    setEntries(updated)
    setNewEntry('')
    saveToStorage(ENTRIES_KEY, updated)

    setTimeout(() => setIsSubmitting(false), 100)
  }, [newEntry, entries, isSubmitting])

  const handleDeleteEntry = useCallback((id) => {
    const updated = entries.filter(e => e.id !== id)
    setEntries(updated)
    saveToStorage(ENTRIES_KEY, updated)
  }, [entries])

  const handleDeposit = useCallback((dreamId) => {
    const amount = parseFloat(depositAmounts[dreamId])
    if (!amount || amount <= 0) return

    setDreams(prev => {
      const updated = prev.map(d =>
        d.id === dreamId ? { ...d, saved: Math.min(d.saved + amount, d.target) } : d
      )
      saveToStorage(DREAMS_KEY, updated)
      return updated
    })
    setDepositAmounts(prev => ({ ...prev, [dreamId]: '' }))
  }, [depositAmounts])

  const handleAddDream = useCallback(() => {
    const name = newDream.name.trim()
    const target = parseFloat(newDream.target)
    if (!name || !target || target <= 0) return

    const color = COLOR_PALETTE[colorIdxRef.current % COLOR_PALETTE.length]
    colorIdxRef.current += 1

    const dream = {
      id: Date.now(),
      name,
      target,
      saved: 0,
      ...color,
    }

    setDreams(prev => {
      const updated = [...prev, dream]
      saveToStorage(DREAMS_KEY, updated)
      return updated
    })
    setNewDream({ name: '', target: '' })
    setShowAddDream(false)
  }, [newDream])

  const handleDeleteDream = useCallback((id) => {
    const updated = dreams.filter(d => d.id !== id)
    setDreams(updated)
    saveToStorage(DREAMS_KEY, updated)
    setDeleteConfirm(null)
  }, [dreams])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddEntry()
    }
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8 md:px-8 lg:px-12">
      {/* Header */}
      <header className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-500 via-orange to-mint bg-clip-text text-transparent">
          能量空间 ✨
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          记录成长，储蓄梦想
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ==================== LEFT: Success Journal ==================== */}
        <section className="bg-white rounded-[2rem] shadow-lg shadow-orange/10 p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            今天的成功日记
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            每一天都是独特的一天，记录让你发光的小事
          </p>

          {/* Input Area */}
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

          {/* Timeline */}
          <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '500px' }}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              历史记录
            </h3>
            <div className="relative pl-6 border-l-2 border-orange/20 space-y-6">
              {entries.map((entry, idx) => (
                <div
                  key={entry.id}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white shadow
                    ${idx === 0 ? 'bg-orange shadow-orange/40' : 'bg-amber-300'}
                  `} />
                  <div className="bg-cream rounded-2xl p-4 hover:shadow-md transition-shadow duration-200 group relative">
                    <p className="text-gray-700 text-sm leading-relaxed pr-6">{entry.text}</p>
                    <time className="text-xs text-gray-400 mt-2 block">{entry.time}</time>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 text-gray-400 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      title="删除"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {entries.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-8">
                  还没有记录，写下你的第一件成功小事吧 🌱
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ==================== RIGHT: Dream Jars ==================== */}
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

          {/* Add Dream Form */}
          {showAddDream && (
            <div className="mb-4 p-4 bg-cream rounded-2xl border-2 border-dashed border-mint/30 animate-fade-in-up">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="梦想名称"
                  value={newDream.name}
                  onChange={(e) => setNewDream(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-[2] px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none transition-all focus:border-mint/50 focus:ring-2 focus:ring-mint/10 placeholder-gray-400"
                />
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">¥</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="目标金额"
                    value={newDream.target}
                    onChange={(e) => setNewDream(prev => ({ ...prev, target: e.target.value }))}
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none transition-all focus:border-mint/50 focus:ring-2 focus:ring-mint/10 placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={handleAddDream}
                  disabled={!newDream.name.trim() || !newDream.target || parseFloat(newDream.target) <= 0}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 active:scale-95
                    ${!newDream.name.trim() || !newDream.target || parseFloat(newDream.target) <= 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-mint to-emerald-500 text-white hover:shadow-lg hover:shadow-mint/20'
                    }
                  `}
                >
                  创建梦想
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 space-y-5 overflow-y-auto" style={{ maxHeight: '520px' }}>
            {dreams.length === 0 && (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🐷</p>
                <p className="text-gray-400 text-sm">还没有梦想，点击 + 创建一个吧</p>
              </div>
            )}
            {dreams.map((dream, idx) => {
              const progress = Math.round((dream.saved / dream.target) * 100)
              const isComplete = progress >= 100
              const progressWidth = `${Math.min(progress, 100)}%`

              return (
                <div
                  key={dream.id}
                  className={`${dream.bgColor} ${dream.borderColor} border rounded-2xl p-5 animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group relative`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Delete button */}
                  <button
                    onClick={() => setDeleteConfirm(deleteConfirm === dream.id ? null : dream.id)}
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 text-gray-400 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="删除梦想"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  {/* Delete confirmation */}
                  {deleteConfirm === dream.id && (
                    <div className="absolute top-10 right-3 z-10 bg-white rounded-xl shadow-xl border border-gray-100 p-3 animate-bounce-in">
                      <p className="text-xs text-gray-600 mb-2">确定删除这个梦想吗？</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteDream(dream.id)}
                          className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          删除
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dream Header */}
                  <div className="flex items-center justify-between mb-3 pr-8">
                    <h3 className="font-bold text-gray-800 text-lg">{dream.name}</h3>
                    {isComplete && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-bounce-in">
                        已达成 🎉
                      </span>
                    )}
                  </div>

                  {/* Amount Info */}
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

                  {/* Progress Bar */}
                  <div className="w-full h-5 bg-white/60 rounded-full overflow-hidden mb-4 shadow-inner">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${dream.barColor} transition-all duration-700 ease-out relative overflow-hidden`}
                      style={{ width: progressWidth }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                    </div>
                  </div>

                  {/* Deposit Input */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">¥</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="输入存入金额"
                        value={depositAmounts[dream.id] || ''}
                        onChange={(e) =>
                          setDepositAmounts(prev => ({ ...prev, [dream.id]: e.target.value }))
                        }
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none transition-all focus:border-orange/50 focus:ring-2 focus:ring-orange/10 placeholder-gray-400"
                      />
                    </div>
                    <button
                      onClick={() => handleDeposit(dream.id)}
                      disabled={!depositAmounts[dream.id] || parseFloat(depositAmounts[dream.id]) <= 0 || isComplete}
                      className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 active:scale-95
                        ${!depositAmounts[dream.id] || parseFloat(depositAmounts[dream.id]) <= 0 || isComplete
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
            })}
          </div>

          {/* Motivational Footer */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-mint/20 rounded-2xl text-center">
            <p className="text-sm text-gray-600">
              每一步都在靠近梦想，今天的努力会成为明天的礼物 💪
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-xs text-gray-400 pb-4">
        能量空间 — 记录成长，储蓄梦想
      </footer>
    </div>
  )
}
