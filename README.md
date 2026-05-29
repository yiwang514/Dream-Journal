<div align="center">

# Energy Space

**记录成长，为梦想储蓄**

A personal success journal & dream savings tracker built with React + TypeScript.

[![Deploy](https://github.com/yiwang514/Dream-Journal/actions/workflows/deploy.yml/badge.svg)](https://github.com/yiwang514/Dream-Journal/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## About

Energy Space is a web app that helps you build confidence by recording small daily successes, while tracking progress toward your dreams with a visual savings goal system. All data stays in your browser — no backend, no sign-up.

## Features

### Success Journal

- Record 3 little things you succeeded at each day
- Inline editing — click any entry to modify it
- Undo delete via toast notifications
- Confetti celebration on each new entry

### Dream Savings

- Create dreams with a target amount (CNY)
- Deposit money and watch the progress bar fill up
- Achieved dreams get a celebratory badge
- Edit or delete dreams with undo support

### Statistics Dashboard

- Total entries, dream completion rate, savings overview
- Recharts pie chart showing savings distribution
- Per-dream progress bars
- Recent journal entries timeline

### General

- **Dark / Light theme** — toggle and persisted to localStorage
- **Data export / import** — backup and restore all data as JSON
- **PWA support** — installable as a standalone app with offline capabilities
- **Responsive design** — side-by-side layout on desktop, stacked on mobile
- **Glassmorphism UI** — warm gradients, floating particles, subtle grain texture

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| PWA | vite-plugin-pwa (Workbox) |
| Testing | Vitest + Testing Library |
| Linting | ESLint 9 (flat config) + Prettier |
| Deployment | GitHub Actions + GitHub Pages |

## Getting Started

### Prerequisites

- Node.js >= 20
- npm

### Installation

```bash
git clone https://github.com/yiwang514/Dream-Journal.git
cd Dream-Journal
npm ci
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build & Preview

```bash
npm run build
npm run preview
```

### Testing

```bash
npm run test          # single run
npm run test:watch    # watch mode
```

### Lint & Format

```bash
npm run lint          # check
npm run lint:fix      # auto-fix
npm run format        # prettier
```

## Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.tsx     # Main page with journal + dream board
│   ├── StatsPage.tsx    # Statistics dashboard
│   ├── SuccessJournal.tsx
│   ├── DreamBoard.tsx
│   ├── DreamCard.tsx
│   ├── ThemeToggle.tsx
│   ├── DataExportImport.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useEntries.ts    # Journal entries CRUD
│   ├── useDreams.ts     # Dreams CRUD + deposit
│   ├── useLocalStorage.ts
│   └── useTheme.ts
├── utils/               # Utilities
│   └── confetti.ts      # Confetti animation
├── __tests__/           # Unit tests
├── types.ts             # TypeScript interfaces
├── App.tsx              # Router setup
└── main.tsx             # Entry point
```

## Deployment

The app is automatically deployed to GitHub Pages on every push to `main` via GitHub Actions. You can also deploy manually:

```bash
npm run deploy
```

## License

[MIT](LICENSE) &copy; 2026 [yiwang514](https://github.com/yiwang514)
