import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

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
    _DEV_MODE_: JSON.stringify(false),
    _BASE_URL_: JSON.stringify('https://users-json-8rx86jrpq-stas-x.vercel.app'),
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        dir: resolve(__dirname, 'build'),

      }
    }
  }
})
