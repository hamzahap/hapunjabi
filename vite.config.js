import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages at https://hamzahap.github.io/hapunjabi/
// The root domain (hamzahap.github.io) is reserved for the hkinggames dev site
// and its AdMob compliance files, so this project must stay in its subpath.
export default defineConfig({
  base: '/hapunjabi/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
