import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'thursday-differences-modern-dod.trycloudflare.com',
      'herein-validation-dependence-favorite.trycloudflare.com',
      '70ddf6f39117a54c-158-69-221-225.serveousercontent.com',
      'structural-primary-university-assuming.trycloudflare.com',
      'tooth-counties-activists-regarding.trycloudflare.com',
    ],
  },
})