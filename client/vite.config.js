import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir: 'public'
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
    proxy:{
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }

    }
  },
});
