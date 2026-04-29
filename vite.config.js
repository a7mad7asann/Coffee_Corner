import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Minify JavaScript
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: true,
      output: {
        comments: false,
      },
    },
    
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
          'icons': ['lucide-react', 'react-icons'],
          'ui-utils': ['react-hot-toast'],
        },
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Source maps
    sourcemap: false, // Disable in production
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-icons',
      'react-hot-toast',
    ],
  },
  
  // Server options
  server: {
    middlewareMode: false,
  },
})