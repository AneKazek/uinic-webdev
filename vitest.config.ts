import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'resources/js/components'),
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
})