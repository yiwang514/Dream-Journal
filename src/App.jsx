import Header from './components/Header'
import Footer from './components/Footer'
import SuccessJournal from './components/SuccessJournal'
import DreamBoard from './components/DreamBoard'
import useEntries from './hooks/useEntries'
import useDreams from './hooks/useDreams'

export default function App() {
  const { entries, addEntry, deleteEntry } = useEntries()
  const { dreams, addDream, deleteDream, deposit } = useDreams()

  return (
    <div className="min-h-screen bg-cream px-4 py-8 md:px-8 lg:px-12">
      <Header />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SuccessJournal
          entries={entries}
          onAdd={addEntry}
          onDelete={deleteEntry}
        />
        <DreamBoard
          dreams={dreams}
          onAdd={addDream}
          onDelete={deleteDream}
          onDeposit={deposit}
        />
      </div>
      <Footer />
    </div>
  )
}
