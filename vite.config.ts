import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/epidemic/map': {
        target: 'https://interface.sina.cn',
        changeOrigin: true,
        rewrite: () => '/news/wap/fymap2020_data.d.json',
      },
      '/api': {
        target: 'http://192.168.166.228:18080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
