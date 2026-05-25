import { useRef } from 'react'
import { loadFromStorage } from '../hooks/useLocalStorage'

const ENTRIES_KEY = 'dream-journal-entries'
const DREAMS_KEY = 'dream-journal-dreams'

export default function DataExportImport({ onImport }: { onImport: (entries: any[], dreams: any[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      entries: loadFromStorage(ENTRIES_KEY, []),
      dreams: loadFromStorage(DREAMS_KEY, []),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `能量空间备份_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (data.entries && data.dreams) {
          onImport(data.entries, data.dreams)
        }
      } catch {
        alert('导入失败：文件格式不正确')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="glass-subtle px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-white/60 dark:hover:bg-dusk-950/60 transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95"
        title="导出数据为 JSON 文件"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        导出
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="glass-subtle px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-white/60 dark:hover:bg-dusk-950/60 transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95"
        title="从 JSON 文件导入数据"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        导入
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  )
}
