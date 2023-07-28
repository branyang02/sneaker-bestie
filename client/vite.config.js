import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),  // Setup '@' as an alias to 'src' folder
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1234', // Replace this with your server's address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})