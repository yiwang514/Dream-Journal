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

function FloatingParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="particle particle-warm w-[400px] h-[400px] animate-float-slow opacity-60"
        style={{ top: '-5%', left: '-8%' }}
      />
      <div
        className="particle particle-gold w-[300px] h-[300px] animate-float-medium opacity-50"
        style={{ top: '25%', right: '-6%' }}
      />
      <div
        className="particle particle-violet w-[350px] h-[350px] animate-float-slow opacity-40"
        style={{ bottom: '5%', left: '20%' }}
      />
      <div
        className="particle particle-mint w-[250px] h-[250px] animate-float-fast opacity-45"
        style={{ top: '60%', right: '15%' }}
      />
      <div
        className="particle particle-warm w-[200px] h-[200px] animate-float-medium opacity-30"
        style={{ top: '10%', left: '50%' }}
      />
      <div
        className="particle particle-violet w-[180px] h-[180px] animate-float-fast opacity-25"
        style={{ bottom: '25%', right: '5%' }}
      />
    </div>
  )
}

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
    <>
      <FloatingParticles />
      <div className="relative z-10 min-h-screen px-4 py-8 md:px-8 lg:px-12">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <div className="max-w-7xl mx-auto mb-5 flex items-center justify-between">
          <button
            onClick={() => navigate('/stats')}
            className="glass-subtle px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-white/60 dark:hover:bg-dusk-950/60 transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
    </>
  )
}
