import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    // Ensure proper output for production
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for debugging (optional)
    sourcemap: false,
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})

