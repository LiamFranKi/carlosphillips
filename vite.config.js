import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages del repo: https://liamfranki.github.io/carlosphillips/
export default defineConfig({
  base: '/carlosphillips/',
  plugins: [react(), tailwindcss()],
})
