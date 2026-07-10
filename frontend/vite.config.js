import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  server: {
    port: 3000,                 // Port change karo 3000 pe
    host: true,                 // Allow external connections
    open: true,                 // Automatically browser open karega
    hmr: {
      overlay: true,           // Error overlay show karega
      clientPort: 3000         // WebSocket ke liye same port
    }
  },
  
  // Agar build ke time bhi issues ho
  build: {
    sourcemap: false,           // Set to false to prevent OOM and reduce build size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})