import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggleTheme }: { theme: string; onToggleTheme: () => void }) {
  return (
    <header className="text-center mb-10 animate-fade-in-up relative">
      <div className="absolute right-0 top-0">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <div className="inline-block">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
          <span className="bg-gradient-to-r from-amber-500 via-orange to-rose-400 bg-clip-text text-transparent dark:from-amber-300 dark:via-orange dark:to-rose-400">
            能量空间
          </span>
          <span className="inline-block ml-2 animate-shimmer">✨</span>
        </h1>
        <div className="h-0.5 mt-3 mx-auto w-3/4 bg-gradient-to-r from-transparent via-orange/40 to-transparent dark:via-dusk-400/40" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 mt-3 text-base tracking-widest font-light">
        记录成长，储蓄梦想
      </p>
    </header>
  )
}
