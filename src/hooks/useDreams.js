import { useCallback, useRef } from 'react'
import useLocalStorage from './useLocalStorage'

const DREAMS_KEY = 'dream-journal-dreams'

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

export default function useDreams() {
  const [dreams, setDreams] = useLocalStorage(DREAMS_KEY, PRESET_DREAMS)
  const colorIdxRef = useRef(0)
  const deletedRef = useRef(null)

  const addDream = useCallback((name, target) => {
    const color = COLOR_PALETTE[colorIdxRef.current % COLOR_PALETTE.length]
    colorIdxRef.current += 1

    const dream = {
      id: Date.now(),
      name,
      target,
      saved: 0,
      ...color,
    }
    setDreams(prev => [...prev, dream])
    return dream
  }, [setDreams])

  const editDream = useCallback((id, updates) => {
    setDreams(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
  }, [setDreams])

  const deleteDream = useCallback((id) => {
    setDreams(prev => {
      const dream = prev.find(d => d.id === id)
      deletedRef.current = dream
      return prev.filter(d => d.id !== id)
    })
  }, [setDreams])

  const undoDeleteDream = useCallback(() => {
    if (!deletedRef.current) return
    const dream = deletedRef.current
    deletedRef.current = null
    setDreams(prev => [...prev, dream])
  }, [setDreams])

  const deposit = useCallback((dreamId, amount) => {
    if (!amount || amount <= 0) return
    setDreams(prev =>
      prev.map(d =>
        d.id === dreamId ? { ...d, saved: Math.min(d.saved + amount, d.target) } : d
      )
    )
  }, [setDreams])

  const importDreams = useCallback((data) => {
    setDreams(data)
  }, [setDreams])

  return { dreams, addDream, editDream, deleteDream, undoDeleteDream, deposit, importDreams }
}
