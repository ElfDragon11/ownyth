import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/ownyth/admin/', // absolute path for assets
  build: {
    outDir: 'dist',     // index.html and assets will be in the "waitlist" folder
    assetsDir: 'assets'
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});