import { useCallback, useRef } from 'react'
import useLocalStorage from './useLocalStorage'
import type { Entry } from '../types'

const ENTRIES_KEY = 'dream-journal-entries'

const PRESET_ENTRIES: Entry[] = []

export default function useEntries() {
  const [entries, setEntries] = useLocalStorage<Entry[]>(ENTRIES_KEY, PRESET_ENTRIES)
  const deletedRef = useRef<Entry | null>(null)

  const addEntry = useCallback((text: string) => {
    const entry: Entry = {
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
    setEntries(prev => [entry, ...prev])
    return entry
  }, [setEntries])

  const editEntry = useCallback((id: number, newText: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, text: newText } : e))
  }, [setEntries])

  const deleteEntry = useCallback((id: number) => {
    setEntries(prev => {
      const entry = prev.find(e => e.id === id)
      deletedRef.current = entry || null
      return prev.filter(e => e.id !== id)
    })
  }, [setEntries])

  const undoDeleteEntry = useCallback(() => {
    if (!deletedRef.current) return
    const entry = deletedRef.current
    deletedRef.current = null
    setEntries(prev => [entry, ...prev])
  }, [setEntries])

  const importEntries = useCallback((data: Entry[]) => {
    setEntries(data)
  }, [setEntries])

  return { entries, addEntry, editEntry, deleteEntry, undoDeleteEntry, importEntries }
}
