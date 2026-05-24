import Header from './components/Header'
import Footer from './components/Footer'
import SuccessJournal from './components/SuccessJournal'
import DreamBoard from './components/DreamBoard'
import Toast from './components/Toast'
import DataExportImport from './components/DataExportImport'
import useEntries from './hooks/useEntries'
import useDreams from './hooks/useDreams'
import useToast from './hooks/useToast'

export default function App() {
  const { entries, addEntry, editEntry, deleteEntry, undoDeleteEntry, importEntries } = useEntries()
  const { dreams, addDream, editDream, deleteDream, undoDeleteDream, deposit, importDreams } = useDreams()
  const { toast, showToast, dismissToast } = useToast()

  const handleDeleteEntry = (id) => {
    deleteEntry(id)
    showToast('已删除日记条目', () => {
      undoDeleteEntry()
      dismissToast()
    })
  }

  const handleDeleteDream = (id) => {
    deleteDream(id)
    showToast('已删除梦想', () => {
      undoDeleteDream()
      dismissToast()
    })
  }

  const handleImport = (entriesData, dreamsData) => {
    importEntries(entriesData)
    importDreams(dreamsData)
    showToast('数据导入成功')
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8 md:px-8 lg:px-12">
      <Header />
      <div className="max-w-7xl mx-auto mb-4 flex justify-end">
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
