import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Vant UI 按需引入
    // 自动引入 API
    AutoImport({
      resolvers: [VantResolver()],
    }),
    // 按需引入组件
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
  // 后端跨域了
  // server: {
  //   proxy: {
  //     // 匹配请求路径前缀为 `/api` 的请求
  //     '/api': {
  //       target: 'http://localhost:8080', // 后端服务器地址
  //       changeOrigin: true, // 是否修改请求的源头为 target URL
  //     }
  //   }
  // }
})
