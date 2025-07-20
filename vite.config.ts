/// <reference types="vitest" />
/// <reference types="vite/client" />
import {defineConfig} from 'vite'
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,      // <- включает глобальные describe/it/expect
    environment: 'jsdom' // <- если нужно тестировать React компоненты
  }
})
