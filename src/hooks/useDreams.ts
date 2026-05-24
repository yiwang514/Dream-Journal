import { useCallback, useRef } from 'react'
import useLocalStorage from './useLocalStorage'
import type { Dream } from '../types'

const DREAMS_KEY = 'dream-journal-dreams'

const PRESET_DREAMS: Dream[] = []

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
  const [dreams, setDreams] = useLocalStorage<Dream[]>(DREAMS_KEY, PRESET_DREAMS)
  const colorIdxRef = useRef(0)
  const deletedRef = useRef<Dream | null>(null)

  const addDream = useCallback((name: string, target: number) => {
    const color = COLOR_PALETTE[colorIdxRef.current % COLOR_PALETTE.length]
    colorIdxRef.current += 1

    const dream: Dream = {
      id: Date.now(),
      name,
      target,
      saved: 0,
      ...color,
    }
    setDreams(prev => [...prev, dream])
    return dream
  }, [setDreams])

  const editDream = useCallback((id: number, updates: Partial<Pick<Dream, 'name' | 'target'>>) => {
    setDreams(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
  }, [setDreams])

  const deleteDream = useCallback((id: number) => {
    setDreams(prev => {
      const dream = prev.find(d => d.id === id)
      deletedRef.current = dream || null
      return prev.filter(d => d.id !== id)
    })
  }, [setDreams])

  const undoDeleteDream = useCallback(() => {
    if (!deletedRef.current) return
    const dream = deletedRef.current
    deletedRef.current = null
    setDreams(prev => [...prev, dream])
  }, [setDreams])

  const deposit = useCallback((dreamId: number, amount: number) => {
    if (!amount || amount <= 0) return
    setDreams(prev =>
      prev.map(d =>
        d.id === dreamId ? { ...d, saved: Math.min(d.saved + amount, d.target) } : d
      )
    )
  }, [setDreams])

  const importDreams = useCallback((data: Dream[]) => {
    setDreams(data)
  }, [setDreams])

  return { dreams, addDream, editDream, deleteDream, undoDeleteDream, deposit, importDreams }
}
