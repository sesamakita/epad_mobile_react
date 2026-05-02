import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi khusus untuk pengembangan Lokal
export default defineConfig({
  plugins: [react()],
  // base dihapus agar berjalan di http://localhost:5173/
})
