/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          recharts: ['recharts'],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: '能量空间 — 成功日记 & 梦想储蓄',
        short_name: '能量空间',
        description: '记录成长，储蓄梦想',
        theme_color: '#FFFAF0',
        background_color: '#FFFAF0',
        display: 'standalone',
        start_url: '/Dream-Journal/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  base: '/Dream-Journal/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest/setup.ts',
  },
})
