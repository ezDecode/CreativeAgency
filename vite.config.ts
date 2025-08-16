import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Performance optimizations
  optimizeDeps: {
    include: ['framer-motion', 'lenis'],
  },
  server: {
    // Improve HMR performance
    hmr: {
      overlay: false
    }
  },
  build: {
    // Code splitting optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'gsap'],
          utils: ['lenis']
        }
      }
    },
    // Improve build performance
    target: 'esnext',
    minify: 'esbuild'
  }
})
