import Header from './Header'
import Footer from './Footer'
import SuccessJournal from './SuccessJournal'
import DreamBoard from './DreamBoard'
import Toast from './Toast'
import DataExportImport from './DataExportImport'
import useEntries from '../hooks/useEntries'
import useDreams from '../hooks/useDreams'
import useToast from '../hooks/useToast'
import useTheme from '../hooks/useTheme'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  const { entries, addEntry, editEntry, deleteEntry, undoDeleteEntry, importEntries } = useEntries()
  const { dreams, addDream, editDream, deleteDream, undoDeleteDream, deposit, importDreams } = useDreams()
  const { toast, showToast, dismissToast } = useToast()
  const { theme, toggleTheme } = useTheme()

  const handleDeleteEntry = (id: number) => {
    deleteEntry(id)
    showToast('已删除日记条目', () => {
      undoDeleteEntry()
      dismissToast()
    })
  }

  const handleDeleteDream = (id: number) => {
    deleteDream(id)
    showToast('已删除梦想', () => {
      undoDeleteDream()
      dismissToast()
    })
  }

  const handleImport = (entriesData: Parameters<typeof importEntries>[0], dreamsData: Parameters<typeof importDreams>[0]) => {
    importEntries(entriesData)
    importDreams(dreamsData)
    showToast('数据导入成功')
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-[#1a1a2e] px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <div className="max-w-7xl mx-auto mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/stats')}
          className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
          数据统计
        </button>
        <DataExportImport onImport={handleImport} />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SuccessJournal
          entries={entries}
          onAdd={addEntry}
          onDelete={handleDeleteEntry}
          onEdit={editEntry}
        />
        <DreamBoard
          dreams={dreams}
          onAdd={addDream}
          onDelete={handleDeleteDream}
          onDeposit={deposit}
          onEdit={editDream}
        />
      </div>
      <Footer />
      {toast && (
        <Toast
          message={toast.message}
          onUndo={toast.onUndo}
          onDismiss={dismissToast}
        />
      )}
    </div>
  )
}
