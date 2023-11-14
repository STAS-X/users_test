import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), viteStaticCopy({
    targets: [{
      src: ['src/shared/assets/nodata.jpg'],
      dest: 'public-data'
    }]
  })],
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
    host: 'localhost',
    cors: false
  },
  define: {
    _DEV_MODE_: JSON.stringify(false),
    _BASE_URL_: JSON.stringify('https://users-json-8rx86jrpq-stas-x.vercel.app'),
  },
  publicDir: resolve(__dirname, 'public'),
  assetsInclude: ['**/*.gltf'],
  build: {
    target: 'esnext',
    minify: true,
    cssCodeSplit: true,
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
