import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // css: {
  // 	preprocessorOptions: {
  // 		scss: {
  // 			additionalData: `@import "@/app/styles/variables/global";`
  // 		}
  // 	}
  // },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  server: {
    host: '127.0.0.1'
  },
  define: {
    _DEV_MODE_: JSON.stringify(true),
    _BASE_URL_: JSON.stringify('http://localhost:3000'),
  }
})
