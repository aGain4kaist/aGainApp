// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 개발 서버 시작 시 브라우저 자동으로 열림
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // @를 src 디렉토리로 설정
    },
  },
});
