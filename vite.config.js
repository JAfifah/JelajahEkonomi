import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/JelajahEkonomi/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/v1': {
        target: 'http://192.168.100.70:20128',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
