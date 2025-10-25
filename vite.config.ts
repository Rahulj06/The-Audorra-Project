import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    // Ensure proper output for production
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for debugging (optional)
    sourcemap: false,
    // Ensure proper module format
    target: 'es2015',
    minify: 'esbuild',
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Ensure proper file extensions
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 5173,
  },
})

