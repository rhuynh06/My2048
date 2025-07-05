import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/My2048/",
  build: {
    outDir: "../docs",
    emptyOutDir: true
  }
})
