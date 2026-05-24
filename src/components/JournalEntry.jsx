export default function JournalEntry({ entry, index, onDelete }) {
  return (
    <div
      className="relative animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white shadow
        ${index === 0 ? 'bg-orange shadow-orange/40' : 'bg-amber-300'}
      `} />
      <div className="bg-cream rounded-2xl p-4 hover:shadow-md transition-shadow duration-200 group relative">
        <p className="text-gray-700 text-sm leading-relaxed pr-6">{entry.text}</p>
        <time className="text-xs text-gray-400 mt-2 block">{entry.time}</time>
        <button
          onClick={() => onDelete(entry.id)}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 text-gray-400 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
          title="删除"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
