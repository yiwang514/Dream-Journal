import { useState, useCallback } from 'react'

export default function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, onUndo) => {
    setToast({ message, onUndo })
  }, [])

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  return { toast, showToast, dismissToast }
}
