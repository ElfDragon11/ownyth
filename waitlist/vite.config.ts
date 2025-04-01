import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/waitlist/', // absolute path for assets
  build: {
    outDir: 'dist',     // index.html and assets will be in the "waitlist" folder
    assetsDir: 'assets'
  },

  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});