import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Сборка библиотеки `@collapse/ui`: ES-модуль + единый style.css. React и иконки берутся из приложения. */
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'style' },
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'] },
  },
})
