import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:4400',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()],
})
