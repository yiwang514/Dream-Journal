export interface Dream {
  id: number
  name: string
  target: number
  saved: number
  barColor: string
  bgColor: string
  borderColor: string
}

export interface Entry {
  id: number
  text: string
  time: string
}

export interface ToastData {
  message: string
  onUndo?: () => void
}
