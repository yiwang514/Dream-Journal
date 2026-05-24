import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="text-center mb-10 animate-fade-in-up relative">
      <div className="absolute right-0 top-0">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-500 via-orange to-mint bg-clip-text text-transparent">
        能量空间 ✨
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
        记录成长，储蓄梦想
      </p>
    </header>
  )
}
