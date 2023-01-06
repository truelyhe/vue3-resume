import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

process.env.VUE_APP_BASE_API = '/prod-api'
let target = 'http://localhost:8888'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': {
      VUE_APP_BASE_API:process.env.VUE_APP_BASE_API,
      fileBaseUrl: process.env.VUE_APP_BASE_API + '/file/getImage/'
    }
  },

  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "@/assets/style/mixin.scss";'
      }
    }
  },
  
  server: {
    port: 3000,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]:{
        target,
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/prod-api/,'')
      }
    }
  }
})
