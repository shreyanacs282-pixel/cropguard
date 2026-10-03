import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Requests to /api are forwarded to the Express server on port 5000,
// so the React code can just call fetch('/api/analyze') with no CORS setup.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_TARGET || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
