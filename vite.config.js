import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Two pages, served from the root of https://hamzahap.dev by Cloudflare
// (see wrangler.jsonc): the homepage at / and the terminal at /terminal/.
// The terminal keeps its hash deep links, so /terminal/#open/breakline still
// runs `open breakline` on load.
export default defineConfig({
  base: '/',
  // No single-page fallback: an unknown path should 404 in dev the way it
  // does in production, instead of quietly rendering the homepage.
  appType: 'mpa',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        terminal: resolve(root, 'terminal/index.html'),
      },
      output: {
        // React gets its own chunk: both pages share it, and it rarely changes
        // between deploys, so browsers keep it cached.
        manualChunks: { react: ['react', 'react-dom'] },
      },
    },
  },
})
