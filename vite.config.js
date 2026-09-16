import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/JelajahEkonomi/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:20128',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
