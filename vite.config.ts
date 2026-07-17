import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { setupVitePlugins } from './build/plugins'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const runtimeConfig = loadEnv(mode, process.cwd())
  const isBuild = command === 'build' // 当前是否是生产模式

  return {
    // 项目根目录（默认当前目录，无需修改，规范路径）
    root: process.cwd(),

    resolve: {
      alias: {
        /** 设置 `@` 指向 `src` 目录 */
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    plugins: setupVitePlugins(isBuild),

    build: {
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              // 是否移除 console 语句（环境变量不为 'false' 时启用，默认启用）
              dropConsole: runtimeConfig.VITE_DROP_CONSOLE !== 'false',
              // 是否移除 debugger 调试语句（环境变量不为 'false' 时启用，默认启用）
              dropDebugger: runtimeConfig.VITE_DROP_DEBUGGER !== 'false',
            },
          },
        },
      },
    },

    css: {
      /**
       * 如果启用了这个选项，那么 CSS 预处理器会尽可能在 worker 线程中运行；即通过多线程运行 CSS 预处理器，从而极大提高其处理速度
       * https://cn.vitejs.dev/config/shared-options#css-preprocessormaxworkers
       */
      preprocessorMaxWorkers: true,
      /**
       * 建议只用来嵌入 SCSS 的变量声明文件，嵌入后全局可用
       * 该选项可以用来为每一段样式内容添加额外的代码。但是要注意，如果你添加的是实际的样式而不仅仅是变量，那这些样式在最终的产物中会重复。
       * https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions-extension-additionaldata
       */
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/element-plus/el-theme-light.scss";`,
        },
      },
    },
  }
})
