import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Substitui 'annakostenkoo' pelo nome do teu repositório no GitHub
export default defineConfig({
  base: '/annakostenkoo/',
  plugins: [react()],
});
