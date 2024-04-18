import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const env = loadEnv('', process.cwd())

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(env.VITE_APP_PORT) || 5173
  }
})
