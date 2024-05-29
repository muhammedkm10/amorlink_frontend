import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), reactRefresh()],
  server: {
    open: true, // Automatically open the app in the browser
    hmr: {
      overlay: false, // Disable error overlay for HMR if needed
    },
  },
});