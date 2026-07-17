import type { PluginOption } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import { registerSvgIcons } from './svg-icons-plugin'
import { registerElectronPlugin } from './electron-plugin'
import { registerAutoImport, registerAutoComponents } from './auto-import-plugin'

export function setupVitePlugins(isBuild: boolean) {
  console.log('isBuild: ', isBuild)

  const plugins: PluginOption[] = []

  /** 提供 Vue 3 单文件组件支持 */
  plugins.push(vue({ include: [/\.vue$/] }))

  /** 即时按需的原子化 CSS 引擎 UnoCSS */
  plugins.push(UnoCSS({ inspector: false }))

  /** 提供 Element Plus 组件库的自动导入 */
  plugins.push(ElementPlus({ useSource: true }))

  /** 自动跟踪依赖并导入所需的内容，避免手动导入的繁琐步骤 */
  plugins.push(registerAutoImport())

  /** 提供组件自动按需导入及类型声明功能 */
  plugins.push(registerAutoComponents())

  /** 提供 SvgIcon 的使用支持 */
  plugins.push(registerSvgIcons())

  // 始终挂载 Electron 插件（纯 Electron 模式）
  plugins.push(registerElectronPlugin())

  return plugins
}
