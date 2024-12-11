import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: './',
  publicDir: 'public',
  plugins: [react(), tsConfigPaths()],
});
