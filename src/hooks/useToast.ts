import { useState, useCallback } from 'react'
import type { ToastData } from '../types'

export default function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null)

  const showToast = useCallback((message: string, onUndo?: () => void) => {
    setToast({ message, onUndo })
  }, [])

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  return { toast, showToast, dismissToast }
}
