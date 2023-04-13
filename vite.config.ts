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
    outDir: 'dist-electron', // 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整
    assetsDir: 'assets', // 指定生成静态资源的存放目录。默认值为 assets ，可根据需要进行调整
    assetsInlineLimit: 4096, // 图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式
    chunkSizeWarningLimit: 500, // 规定触发警告的 chunk 大小。（以 kbs 为单位）
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
    sourcemap: false, // 构建后是否生成 source map 文件
    copyPublicDir: true, // 是否在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中
    minify: 'terser', // 指定使用哪种混淆器。默认为 esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%
    terserOptions: {
      compress: {
        drop_console: true, // 正式环境移除 console
        drop_debugger: true, // 正式环境移除 debugger
      },
    },
  },
})
