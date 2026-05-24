import { useState, useCallback } from 'react'

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch { /* quota exceeded, ignore */ }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => loadFromStorage(key, initialValue))

  const setStoredValue = useCallback((updater) => {
    setValue(prev => {
      const nextValue = typeof updater === 'function' ? updater(prev) : updater
      saveToStorage(key, nextValue)
      return nextValue
    })
  }, [key])

  return [value, setStoredValue]
}
