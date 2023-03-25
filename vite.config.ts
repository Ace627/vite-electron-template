import { resolve } from 'path' // path 模块提供了一些工具函数，用于处理文件与目录的路径
import { defineConfig } from 'vite' // 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue' // 提供 Vue 3 单文件组件支持
import electron from 'vite-plugin-electron' //提供 electron 组件的支持
import electronRenderer from 'vite-plugin-electron-renderer'
import AutoImport from 'unplugin-auto-import/vite' // 自动导入配置的模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: 'electron/main.ts',
    }),
    electronRenderer(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'], // 自动导入 vue、vue-router、Pinia 相关函数
      dts: 'types/auto-import.d.ts',
      dirs: ['src/store/modules', 'src/hooks'],
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'), // 设置 `@` 指向 `src` 目录
    },
  },

  build: {
    outDir: 'dist-electron', // 指定输出路径（相对于项目根目录)
  },
})
