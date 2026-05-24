import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { loadFromStorage } from '../hooks/useLocalStorage'
import type { Dream, Entry } from '../types'

const ENTRIES_KEY = 'dream-journal-entries'
const DREAMS_KEY = 'dream-journal-dreams'
const PRESET_DREAMS: Dream[] = []
const PRESET_ENTRIES: Entry[] = []

const COLORS = ['#FF8C42', '#6BCB77', '#A78BFA', '#F472B6', '#38BDF8', '#FBBF24']

export default function StatsPage() {
  const navigate = useNavigate()
  const entries = loadFromStorage<Entry[]>(ENTRIES_KEY, PRESET_ENTRIES)
  const dreams = loadFromStorage<Dream[]>(DREAMS_KEY, PRESET_DREAMS)

  const totalEntries = entries.length
  const completedDreams = dreams.filter(d => d.saved >= d.target).length
  const totalDreams = dreams.length
  const completionRate = totalDreams > 0 ? Math.round((completedDreams / totalDreams) * 100) : 0
  const totalSaved = dreams.reduce((sum, d) => sum + d.saved, 0)
  const totalTarget = dreams.reduce((sum, d) => sum + d.target, 0)

  const dreamProgressData = useMemo(() =>
    dreams.map((d, i) => ({
      name: d.name.replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim(),
      value: d.saved,
      color: COLORS[i % COLORS.length],
    })),
    [dreams],
  )

  const recentEntries = useMemo(() => {
    const sorted = [...entries].sort((a, b) => b.id - a.id)
    return sorted.slice(0, 7)
  }, [entries])

  return (
    <div className="min-h-screen bg-cream dark:bg-[#1a1a2e] px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            数据统计 📊
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">日记总数</p>
            <p className="text-3xl font-extrabold text-orange">{totalEntries}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">梦想完成率</p>
            <p className="text-3xl font-extrabold text-mint">{completionRate}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">已储蓄</p>
            <p className="text-3xl font-extrabold text-amber-500">¥{totalSaved.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">目标总额</p>
            <p className="text-3xl font-extrabold text-violet-500">¥{totalTarget.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dream Progress Pie */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">梦想储蓄分布</h2>
            {dreamProgressData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dreamProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {dreamProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `¥${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-12">暂无梦想数据</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {dreamProgressData.map((item, i) => (
                <div key={i} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          {/* Dream List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">梦想进度</h2>
            <div className="space-y-4">
              {dreams.map(dream => {
                const progress = Math.round((dream.saved / dream.target) * 100)
                return (
                  <div key={dream.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium truncate pr-2">{dream.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${dream.barColor} transition-all duration-500`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {dreams.length === 0 && (
                <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-8">暂无梦想</p>
              )}
            </div>
          </div>

          {/* Recent Entries */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm md:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">最近日记</h2>
            {recentEntries.length > 0 ? (
              <div className="space-y-3">
                {recentEntries.map(entry => (
                  <div key={entry.id} className="flex items-start gap-3 p-3 bg-cream dark:bg-gray-700/50 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-orange mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{entry.text}</p>
                      <time className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{entry.time}</time>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-8">暂无日记</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
