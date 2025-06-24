// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// })

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    preview: {
      host: '0.0.0.0',
      port: env.PORT ? parseInt(env.PORT) : 4173,
      allowedHosts: [
        'dealfrontend-2.onrender.com',
        'dealfrontend-3.onrender.com', // ✅ Add this line
      ],
    },
  };
});

