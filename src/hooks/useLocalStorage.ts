import { useState, useCallback } from 'react'

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch { /* quota exceeded, ignore */ }
}

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (updater: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => loadFromStorage(key, initialValue))

  const setStoredValue = useCallback((updater: T | ((prev: T) => T)) => {
    setValue(prev => {
      const nextValue = typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater
      saveToStorage(key, nextValue)
      return nextValue
    })
  }, [key])

  return [value, setStoredValue]
}
